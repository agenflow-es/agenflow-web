import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { AccentCard } from "@/components/ui/AccentCard";
import { SpotlightCard } from "@/components/visuals/SpotlightCard";

type PainItem = { pain: string; fix: string };
type Capability = { name: string; desc: string };
type Step = { step: string; name: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "legal", path: "/sectores/legal" });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legalPage");
  const problem = t.raw("problem.items") as string[];
  const pains = t.raw("pains.items") as PainItem[];
  const automate = t.raw("automate.items") as Capability[];
  const steps = t.raw("delivery.steps") as Step[];
  const trust = t.raw("trust.items") as Capability[];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        cta={{ label: t("cta"), href: "/contacto?reason=consultoria" }}
      />

      {/* Problem */}
      <section className="border-b border-border">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
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

      {/* Pains solved */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("pains.eyebrow")}
              title={t("pains.title")}
              intro={t("pains.intro")}
            />
            <div className="grid gap-5 md:grid-cols-2">
              {pains.map((it, i) => (
                <SpotlightCard key={i} className="p-6">
                  <p className="text-[14.5px] leading-[1.5] text-fg-muted">
                    {it.pain}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-[15px] leading-[1.5] text-fg">
                    <span aria-hidden className="mt-px shrink-0 font-semibold text-accent">
                      →
                    </span>
                    <span>{it.fix}</span>
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What we automate */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("automate.eyebrow")}
              title={t("automate.title")}
              intro={t("automate.intro")}
              align="left"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {automate.map((c, i) => (
                <AccentCard key={i} title={c.name} desc={c.desc} background="bg" />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How we work */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("delivery.eyebrow")}
              title={t("delivery.title")}
              intro={t("delivery.intro")}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <SpotlightCard key={i}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-label text-[15px] font-semibold text-accent-fg">
                    {s.step}
                  </span>
                  <h3 className="mt-5 font-display text-[20px] font-semibold">
                    {s.name}
                  </h3>
                  <p className="mt-2.5 leading-[1.6] text-fg-muted">{s.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Trust & confidentiality */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("trust.eyebrow")}
              title={t("trust.title")}
              intro={t("trust.intro")}
              align="left"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((c, i) => (
                <AccentCard key={i} title={c.name} desc={c.desc} background="bg" compact />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

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
