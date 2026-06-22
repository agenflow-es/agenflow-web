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
      ? "You check whether a business shows up online and to AI assistants. The user gives the business name and, usually, the city. Use web search and answer in 2–3 very short sentences (about 50 words max), in plain running text: no headings, no lists, no bullets, no emojis, no bold and no markdown of any kind. Get to the point: say whether the business appears and what is known about it; if there's barely any information, say so honestly —that to AI it's nearly invisible— and mention in a few words what shows up in its place (competitors or directories). Don't add a preamble or comment on the query, and don't end with questions or offers. Never invent data or cite URLs. Answer in English."
      : "Compruebas si un negocio aparece en internet y ante los asistentes de IA. El usuario te da el nombre del negocio y, normalmente, la ciudad. Usa la búsqueda web y responde en 2 o 3 frases muy breves (máximo unas 50 palabras), en texto plano y corrido: sin títulos, sin listas, sin viñetas, sin emojis, sin negritas y sin ningún formato markdown. Ve al grano: di si el negocio aparece y qué se sabe de él; si apenas hay información, dilo con honestidad —que para la IA es casi invisible— y menciona en pocas palabras qué aparece en su lugar (competencia o directorios). No añadas introducción ni comentes la consulta, y no termines con preguntas ni ofrecimientos. Nunca inventes datos ni cites URLs. Responde en español.";

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
    const answer = toPlainText(raw);

    if (!answer) return { ok: false, error: "failed" };
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
