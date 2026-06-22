import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/metadata";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "newsletter", path: "/recursos/newsletter" });
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsletterPage");
  const bullets = t.raw("bullets") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="border-b border-border">
        <Container className="max-w-[640px] py-[clamp(64px,9vw,120px)]">
          <Reveal>
            <ul className="space-y-3.5">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[16px] leading-[1.5] text-fg-muted"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
              <NewsletterForm />
            </div>

            <p className="mt-4 text-center text-[13px] text-fg-faint">
              {t("note")}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
