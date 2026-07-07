"use server";

import { headers } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const schema = z.object({
  business: z.string().trim().min(2).max(80),
  locale: z.enum(["es", "en"]).default("es"),
});

export type AiCheckResult = {
  ok: boolean;
  answer?: string;
  error?: "invalid" | "rate_limited" | "not_configured" | "failed";
};

// Public, unauthenticated endpoint → default to a mid-tier model to keep
// cost/abuse in check. Swap to "claude-opus-4-8" (most capable) or
// "claude-haiku-4-5" as preferred — it's the only line to change.
const MODEL = "claude-sonnet-4-6";

// Fixed message returned whenever the model can't find the business, so the
// "you're invisible to AI" outcome is always the same, on-message copy (the
// hook for the presencia-online service) instead of a varying model reply.
const NOT_FOUND_MESSAGE: Record<"es" | "en", string> = {
  es: "No hemos podido encontrar tu negocio. Hoy no es rastreable por los motores de IA como ChatGPT: cuando alguien pregunta por lo que ofreces, tu negocio no aparece.",
  en: "We couldn't find your business. Right now it isn't traceable by AI engines like ChatGPT: when someone asks about what you offer, your business doesn't show up.",
};

// Basic in-memory rate limit. NOTE: per server instance only — on serverless
// (Vercel) instances don't share memory, so for production this should move to
// a durable store (Vercel KV / Upstash Redis). Good enough as a first guard.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Belt-and-suspenders: the answer is rendered in a plain <p>, so strip any
// markdown / emojis the model might slip in and collapse it to one clean
// paragraph, regardless of how well it followed the system prompt.
function toPlainText(s: string): string {
  return s
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{20E3}]/gu,
      "",
    ) // emojis & pictographs
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/^\s*>\s?/gm, "") // blockquotes
    .replace(/^\s*[-•*]\s+/gm, "") // bullet markers
    .replace(/\*\*?([^*]+)\*\*?/g, "$1") // **bold** / *italic*
    .replace(/__?([^_]+)__?/g, "$1") // __bold__ / _italic_
    .replace(/`([^`]+)`/g, "$1") // `code`
    .replace(/\s*\n\s*/g, " ") // newlines → spaces
    .replace(/\s{2,}/g, " ") // collapse runs of spaces
    .trim();
}

export async function checkAiVisibility(input: unknown): Promise<AiCheckResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { business, locale } = parsed.data;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[ai-check] ANTHROPIC_API_KEY no configurada; comprobación en vivo deshabilitada.");
    return { ok: false, error: "not_configured" };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? "unknown").trim();
  if (rateLimited(ip)) return { ok: false, error: "rate_limited" };

  const system =
    locale === "en"
      ? "The user writes what a potential customer would ask an AI assistant to find a business like theirs (for example: 'the best dental clinics in Málaga'); sometimes they may write a business name directly. Use web search and answer that query the way an AI assistant would. ALWAYS START your reply with a tag: write exactly [NO_ENCONTRADO] if there's barely any reliable information or you can't give real names; or [ENCONTRADO] if you can answer. If the tag is [NO_ENCONTRADO], add nothing after it. If the tag is [ENCONTRADO], after it write 2–3 very short sentences (about 50 words max) in plain running text —no headings, no lists, no bullets, no emojis, no bold, no markdown— naming the real businesses that actually come up or are recommended in the answer, so the user can see whether theirs is there or not. No preamble, don't comment on the query, don't end with questions or offers, and never invent data or cite URLs. Answer in English."
      : "El usuario escribe lo que preguntaría un posible cliente a un asistente de IA para encontrar un negocio como el suyo (por ejemplo: «las mejores clínicas dentales de Málaga»); a veces puede escribir directamente el nombre de un negocio. Usa la búsqueda web y responde a esa consulta como lo haría un asistente de IA. EMPIEZA SIEMPRE tu respuesta con una etiqueta: escribe exactamente [NO_ENCONTRADO] si apenas hay información fiable o no puedes dar nombres reales; o [ENCONTRADO] si sí puedes responder. Si la etiqueta es [NO_ENCONTRADO], no añadas nada después. Si la etiqueta es [ENCONTRADO], tras ella escribe 2 o 3 frases muy breves (máximo unas 50 palabras) en texto plano y corrido —sin títulos, sin listas, sin viñetas, sin emojis, sin negritas y sin ningún markdown— nombrando los negocios reales que aparecen o se recomiendan en la respuesta, para que el usuario pueda ver si el suyo está o no. No añadas introducción ni comentes la consulta, no termines con preguntas ni ofrecimientos, y nunca inventes datos ni cites URLs. Responde en español.";

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 500,
      system,
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 3 }],
      messages: [{ role: "user", content: business }],
    });

    const raw = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    const trimmed = raw.trimStart();

    // Not found → always the same fixed message (the "invisible to AI" hook),
    // never a varying model reply.
    if (/^\[?\s*NO_ENCONTRADO/i.test(trimmed)) {
      return { ok: true, answer: NOT_FOUND_MESSAGE[locale] };
    }

    // Found → strip the [ENCONTRADO] tag and return the short description.
    const answer = toPlainText(trimmed.replace(/^\[?\s*ENCONTRADO\s*\]?/i, ""));

    // Empty/unexpected → fall back to the fixed not-found message (graceful).
    if (!answer) return { ok: true, answer: NOT_FOUND_MESSAGE[locale] };
    return { ok: true, answer };
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("[ai-check] ANTHROPIC_API_KEY inválida");
    } else {
      console.error("[ai-check] fallo en la llamada a Claude", err);
    }
    return { ok: false, error: "failed" };
  }
}
