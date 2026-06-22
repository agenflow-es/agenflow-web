import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Briefcase } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    key: "trabajaConNosotros",
    path: "/trabaja-con-nosotros",
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careersPage");

  const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    t("spontaneous.subject"),
  )}`;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="border-b border-border">
        <Container className="max-w-[680px] py-[clamp(64px,9vw,120px)]">
          <Reveal>
            {/* Empty state — no current openings */}
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-8 text-center shadow-[var(--shadow)] sm:p-10">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Briefcase className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-[clamp(20px,2.6vw,26px)] font-bold tracking-[-0.02em] text-balance">
                {t("openings.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[15px] leading-[1.6] text-fg-muted">
                {t("openings.body")}
              </p>
            </div>

            {/* Spontaneous application */}
            <div className="mt-10 text-center">
              <h2 className="font-display text-[clamp(20px,2.6vw,26px)] font-bold tracking-[-0.02em] text-balance">
                {t("spontaneous.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-[1.6] text-fg-muted">
                {t("spontaneous.body")}
              </p>
              <a
                href={mailto}
                className="mt-6 inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
              >
                {t("spontaneous.cta")} <span className="text-lg">→</span>
              </a>
              <p className="mt-4 text-[14px] text-fg-muted">
                {t("spontaneous.or")}{" "}
                <a
                  href={mailto}
                  className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition hover:decoration-accent"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p className="mt-3 text-[13px] text-fg-faint">
                {t("spontaneous.note")}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
