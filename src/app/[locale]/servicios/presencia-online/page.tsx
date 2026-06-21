import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/layout/FaqList";
import { CtaSection } from "@/components/layout/CtaSection";
import { AccentCard } from "@/components/ui/AccentCard";
import { AiVisibilityCheck } from "@/components/ai/AiVisibilityCheck";

type Card = { name: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "presencia", path: "/servicios/presencia-online" });
}

export default async function PresenciaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("presenciaPage");
  const problem = t.raw("problem.items") as string[];
  const shiftCards = t.raw("shift.cards") as Card[];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        cta={{ label: t("cta"), href: "/contacto?reason=presupuesto" }}
      />

      {/* Problem */}
      <section className="border-b border-border">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
              {t("problem.title")}
            </h2>
            <ul className="mt-8 space-y-4">
              {problem.map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-[17px] leading-[1.5] text-fg-muted"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* The shift — web / SEO / GEO */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("shift.eyebrow")}
              title={t("shift.title")}
              intro={t("shift.intro")}
              maxWidth={760}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {shiftCards.map((c, i) => (
                <AccentCard key={i} title={c.name} desc={c.desc} background="bg" />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* AI audit hook */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="grid items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-2">
              <div>
                <Eyebrow>{t("audit.eyebrow")}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                  {t("audit.title")}
                </h2>
                <p className="mt-5 text-[17px] leading-[1.6] text-fg-muted text-pretty">
                  {t("audit.body")}
                </p>
              </div>
              <AiVisibilityCheck />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Plans & pricing → /precios (detail lives on the pricing page) */}
      <section className="border-b border-border bg-surface">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)] text-center">
          <Reveal>
            <Eyebrow>{t("plansLink.eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
              {t("plansLink.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.6] text-fg-muted text-pretty">
              {t("plansLink.body")}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/precios"
                className="inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
              >
                {t("plansLink.cta")} <span className="text-lg">→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <FaqList
        title={t("faq.title")}
        items={t.raw("faq.items") as { q: string; a: string }[]}
      />

      {/* Final CTA */}
      <CtaSection
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        cta={t("finalCta.cta")}
        href="/contacto?reason=presupuesto"
      />
    </>
  );
}
