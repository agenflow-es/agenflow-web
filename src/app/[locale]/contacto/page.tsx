import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/metadata";

const REASONS = ["consultoria", "presupuesto", "lanzamiento", "caso"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "contacto", path: "/contacto" });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ reason?: string }>;
}) {
  const { locale } = await params;
  const { reason } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  // The page is reached from many CTAs with different intents; the heading
  // adapts to a ?reason= hint, falling back to the neutral default.
  const variant = REASONS.includes(reason as (typeof REASONS)[number])
    ? (reason as (typeof REASONS)[number])
    : null;
  const title = variant ? t(`variants.${variant}.title`) : t("title");
  const body = variant ? t(`variants.${variant}.body`) : t("body");

  return (
    <Container className="max-w-2xl py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-[1.6] text-fg-muted">{body}</p>
      <ContactForm />
    </Container>
  );
}
