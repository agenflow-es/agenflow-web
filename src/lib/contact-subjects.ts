// Single source of truth for what a contact/quote request is *about*.
// CTA buttons across the site pass one of these keys via ?subject=, the contact
// form pre-selects it, and the server action records it in the notification
// email. Keep keys stable (they live in URLs); add new ones at the end.
export const CONTACT_SUBJECTS = [
  "presencia",
  "consultoria",
  "automatizacion",
  "software",
  "inmobiliario",
  "legal",
  "otro",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export const DEFAULT_CONTACT_SUBJECT: ContactSubject = "otro";

// Internal labels (ES) for the notification email we receive. UI labels are
// locale-aware and live in messages/*.json under contactPage.form.subjects.
export const CONTACT_SUBJECT_EMAIL_LABELS: Record<ContactSubject, string> = {
  presencia: "Mejora de presencia online",
  consultoria: "Consultoría de IA",
  automatizacion: "Automatización de procesos",
  software: "Software por sector",
  inmobiliario: "Inmobiliario y construcción",
  legal: "Sector legal",
  otro: "Otro / sin especificar",
};

// Coerce any incoming value (URL param or form payload) to a valid subject,
// falling back to the neutral default so the field is always defined.
export function normalizeSubject(value: unknown): ContactSubject {
  return CONTACT_SUBJECTS.includes(value as ContactSubject)
    ? (value as ContactSubject)
    : DEFAULT_CONTACT_SUBJECT;
}
