"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import {
  CONTACT_SUBJECT_EMAIL_LABELS,
  normalizeSubject,
} from "@/lib/contact-subjects";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  // What the request is about. Coerced to a valid subject so it's always set.
  subject: z.string().optional(),
  // Cap length as a basic anti-flood guard.
  message: z.string().min(10).max(5000),
  // Honeypot: hidden field that humans never see. Optional + must stay empty.
  website: z.string().optional(),
});

// Basic in-memory rate limit. NOTE: per server instance only — on serverless
// (Vercel) instances don't share memory, so for production this should move to
// a durable store (Vercel KV / Upstash Redis). Good enough as a first guard.
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

type ContactError = "validation" | "rate_limited" | "not_configured" | "failed";

// Strip CR/LF from single-line fields before composing the email (defense in
// depth against header/line injection, even though they go in the body).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendContact(
  input: unknown,
): Promise<{ ok: boolean; error?: ContactError }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const { name, email, company, subject, message, website } = parsed.data;

  // Honeypot: if the hidden field came back filled, it's a bot. Silently drop
  // and report success so the bot gets no signal that it was caught.
  if (website && website.trim() !== "") return { ok: true };

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? "unknown").trim();
  if (rateLimited(ip)) return { ok: false, error: "rate_limited" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured yet (e.g. local/dev) — don't crash, just log.
    console.warn("[contact] RESEND_API_KEY no configurada; mensaje no enviado.");
    return { ok: false, error: "not_configured" };
  }

  const safeName = oneLine(name);
  const subjectLabel = CONTACT_SUBJECT_EMAIL_LABELS[normalizeSubject(subject)];
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Agenflow Web <${process.env.CONTACT_FROM ?? "web@hola.agenflow.es"}>`,
    to: process.env.CONTACT_EMAIL ?? siteConfig.contactEmail,
    replyTo: email,
    subject: `Nuevo contacto web · ${subjectLabel} — ${safeName}`,
    text: `Asunto: ${subjectLabel}\nNombre: ${safeName}\nEmail: ${email}\nEmpresa: ${company ? oneLine(company) : "-"}\n\n${message}`,
  });

  return { ok: !error, error: error ? "failed" : undefined };
}
