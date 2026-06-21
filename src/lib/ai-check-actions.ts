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
      ? "You check how visible a business is online and to AI assistants. The user gives a business name (and usually a city). Use web search to find what relevant public information exists about it (website, reviews, listings, presence) and summarize it in 2–4 short sentences. If you find little or nothing, say so plainly and honestly: that there's barely any information and that to AI assistants the business is nearly invisible. Be concrete, never invent data, and don't cite source URLs. Answer in English."
      : "Compruebas la visibilidad de un negocio en internet y ante asistentes de IA. El usuario te da el nombre (y normalmente la ciudad) de un negocio. Usa la búsqueda web para encontrar qué información pública relevante existe sobre él (web, reseñas, fichas, presencia) y resúmelo en 2–4 frases breves. Si encuentras poco o nada, dilo claro y con honestidad: que apenas hay información y que para los asistentes de IA es casi invisible. Sé concreto, nunca inventes datos y no cites URLs de fuentes. Responde en español.";

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system,
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 3 }],
      messages: [{ role: "user", content: business }],
    });

    const answer = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

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
