"use server";

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function sendContact(input: unknown): Promise<{ ok: boolean }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false };
  const { name, email, company, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured yet (e.g. local/dev) — don't crash, just log.
    console.warn("[contact] RESEND_API_KEY no configurada; mensaje no enviado.");
    return { ok: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Agenflow Web <${process.env.CONTACT_FROM ?? "web@agenflow.es"}>`,
    to: process.env.CONTACT_EMAIL ?? siteConfig.contactEmail,
    replyTo: email,
    subject: `Nuevo contacto web — ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company ?? "-"}\n\n${message}`,
  });

  return { ok: !error };
}
