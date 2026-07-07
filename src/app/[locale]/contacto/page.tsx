import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Clock, BadgeCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { normalizeSubject } from "@/lib/contact-subjects";

const REASONS = ["consultoria", "presupuesto", "lanzamiento", "caso"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "contacto", path: "/contacto" });
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-[var(--accent-soft)] text-accent">
        {icon}
      </span>
      <div>
        <div className="font-label text-[11px] uppercase tracking-[0.12em] text-fg-faint">
          {label}
        </div>
        <div className="mt-0.5 text-[15px] text-fg">{children}</div>
      </div>
    </div>
  );
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ reason?: string; subject?: string }>;
}) {
  const { locale } = await params;
  const { reason, subject } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  // The page is reached from many CTAs with different intents; the heading
  // adapts to a ?reason= hint, falling back to the neutral default.
  const variant = REASONS.includes(reason as (typeof REASONS)[number])
    ? (reason as (typeof REASONS)[number])
    : null;
  const title = variant ? t(`variants.${variant}.title`) : t("title");
  const body = variant ? t(`variants.${variant}.body`) : t("body");

  // What the request is *about* — pre-selects the form's subject field so the
  // visitor doesn't have to explain which service they're asking about.
  const defaultSubject = normalizeSubject(subject);

  return (
    <section className="border-b border-border">
      <Container className="py-[clamp(56px,9vw,110px)]">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2 lg:items-start">
          {/* Left — pitch + contact info */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Contacto</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.07] tracking-[-0.022em] text-balance text-fg">
              {title}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-fg-muted">
              {body}
            </p>

            <div className="mt-10 space-y-5">
              <InfoRow
                icon={<Mail className="h-4 w-4" strokeWidth={1.7} />}
                label="Email"
              >
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="transition hover:text-accent"
                >
                  {siteConfig.contactEmail}
                </a>
              </InfoRow>
              <InfoRow
                icon={<Clock className="h-4 w-4" strokeWidth={1.7} />}
                label="Respuesta"
              >
                Te respondemos en menos de 24 h
              </InfoRow>
              <InfoRow
                icon={<BadgeCheck className="h-4 w-4" strokeWidth={1.7} />}
                label="Sin compromiso"
              >
                Cuéntanos tu caso y te decimos por dónde empezar
              </InfoRow>
            </div>
          </div>

          {/* Right — form card */}
          <div className="rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-6 sm:p-8">
            <ContactForm defaultSubject={defaultSubject} />
          </div>
        </div>
      </Container>
    </section>
  );
}
