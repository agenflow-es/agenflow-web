"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  email: z.string().email(),
  // Consent must be explicitly true (GDPR opt-in for marketing email).
  consent: z.boolean().refine((v) => v === true),
  // Honeypot: hidden field that humans never see. Optional + must stay empty.
  website: z.string().optional(),
});

// Basic in-memory rate limit (same pattern as contact-actions). Per server
// instance only — on serverless this should move to a durable store.
// TODO(prod): replace with Vercel KV / Upstash Redis once deployed.
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

type NewsletterError = "validation" | "rate_limited" | "not_configured" | "failed";

export async function subscribeNewsletter(
  input: unknown,
): Promise<{ ok: boolean; error?: NewsletterError }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const { email, website } = parsed.data;

  // Honeypot: filled means a bot. Silently report success so it gets no signal.
  if (website && website.trim() !== "") return { ok: true };

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? "unknown").trim();
  if (rateLimited(ip)) return { ok: false, error: "rate_limited" };

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    // Not configured yet — don't crash, just log.
    console.warn(
      "[newsletter] RESEND_API_KEY / RESEND_AUDIENCE_ID no configuradas; suscripción no registrada.",
    );
    return { ok: false, error: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId,
  });

  return { ok: !error, error: error ? "failed" : undefined };
}
