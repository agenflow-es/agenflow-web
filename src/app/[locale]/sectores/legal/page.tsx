import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/layout/FaqList";
import { CtaSection } from "@/components/layout/CtaSection";
import { SpotlightCard } from "@/components/visuals/SpotlightCard";
import { AutomationFeed } from "@/components/visuals/AutomationFeed";
import { ShieldVisual } from "@/components/visuals/ShieldVisual";

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
  const automateBody = t.raw("automate.body") as string[];
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
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader
                eyebrow={t("automate.eyebrow")}
                title={t("automate.title")}
                align="left"
              />
              <div className="mt-6 space-y-4">
                {automateBody.map((p, i) => (
                  <p
                    key={i}
                    className="text-[16.5px] leading-[1.65] text-fg-muted text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <AutomationFeed items={t.raw("automate.feed") as string[]} />
            </Reveal>
          </div>
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ShieldVisual />
            </Reveal>

            <Reveal>
              <SectionHeader
                eyebrow={t("trust.eyebrow")}
                title={t("trust.title")}
                intro={t("trust.intro")}
                align="left"
              />
              <ul className="mt-8 space-y-5">
                {trust.map((item, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-[var(--accent-soft)] text-accent">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-[18px] font-semibold">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[14.5px] leading-[1.55] text-fg-muted">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
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
