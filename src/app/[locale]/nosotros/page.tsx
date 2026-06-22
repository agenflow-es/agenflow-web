import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { AccentCard } from "@/components/ui/AccentCard";
import { FaqList } from "@/components/layout/FaqList";
import { CtaSection } from "@/components/layout/CtaSection";
import { StepTimeline } from "@/components/visuals/StepTimeline";

type FocusItem = {
  title: string;
  desc: string;
  href: string;
  linkLabel: string;
};
type Value = { title: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "nosotros", path: "/nosotros" });
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const paragraphs = t.raw("origin.paragraphs") as string[];
  const milestones = t.raw("origin.milestones") as { title: string; sub?: string }[];
  const focus = t.raw("focus.items") as FocusItem[];
  const values = t.raw("values.items") as Value[];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        cta={{ label: t("ctaPrimary"), href: "/contacto?reason=consultoria" }}
        ctaSecondary={{ label: t("ctaSecondary"), href: "#origen" }}
      />

      {/* Origin story */}
      <section id="origen" className="scroll-mt-20 border-b border-border">
        <Container className="max-w-[820px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <Eyebrow>{t("origin.eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
              {t("origin.title")}
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-[1.7] text-fg-muted">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-14">
              <StepTimeline items={milestones} highlightLast />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="border-b border-border bg-surface">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-border border-l-2 border-l-accent bg-bg p-8 shadow-[var(--shadow)] sm:p-10">
              <Eyebrow>{t("mission.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(24px,3vw,36px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("mission.title")}
              </h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-fg-muted">
                {t("mission.body")}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Sectors we know first-hand */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("focus.eyebrow")}
              title={t("focus.title")}
              intro={t("focus.intro")}
            />
            <div className="mx-auto grid max-w-[860px] gap-5 sm:grid-cols-2">
              {focus.map((it, i) => (
                <AccentCard key={i} title={it.title} desc={it.desc} href={it.href}>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                    {it.linkLabel} <span aria-hidden>→</span>
                  </span>
                </AccentCard>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How we work */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader eyebrow={t("values.eyebrow")} title={t("values.title")} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <AccentCard
                  key={i}
                  title={v.title}
                  desc={v.desc}
                  background="bg"
                  compact
                />
              ))}
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
        href="/contacto?reason=consultoria"
      />
    </>
  );
}
