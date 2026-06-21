import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { AccentCard } from "@/components/ui/AccentCard";
import { ProcessFlow } from "@/components/visuals/ProcessFlow";
import { SpotlightCard } from "@/components/visuals/SpotlightCard";

type Capability = { name: string; desc: string };
type Step = { step: string; name: string; desc: string };

export default async function AutomatizacionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("automatizacionPage");
  const problem = t.raw("problem.items") as string[];
  const sources = t.raw("flow.sources") as string[];
  const outcomes = t.raw("flow.outcomes") as string[];
  const capabilities = t.raw("capabilities.items") as Capability[];
  const steps = t.raw("delivery.steps") as Step[];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        cta={{ label: t("ctaPrimary"), href: "/contacto?reason=presupuesto" }}
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

      {/* How it works — animated flow */}
      <section id="como" className="scroll-mt-20 border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("flow.eyebrow")}
              title={t("flow.title")}
              intro={t("flow.intro")}
            />

            <div className="mx-auto max-w-[920px] rounded-[var(--radius-lg)] border border-border bg-bg p-[clamp(20px,4vw,40px)] shadow-[var(--shadow)]">
              <div className="mb-5 flex items-center justify-between font-label text-[12px] uppercase tracking-[0.13em] text-accent">
                <span>{t("flow.sourcesLabel")}</span>
                <span>{t("flow.outcomesLabel")}</span>
              </div>
              <ProcessFlow sources={sources} outcomes={outcomes} hub={t("flow.hub")} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("capabilities.eyebrow")}
              title={t("capabilities.title")}
              align="left"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c, i) => (
                <AccentCard key={i} title={c.name} desc={c.desc} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Delivery */}
      <section className="border-b border-border bg-surface">
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

      {/* Reassurance */}
      <section className="border-b border-border">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-border border-l-2 border-l-accent bg-surface p-8 shadow-[var(--shadow)] sm:p-10">
              <h2 className="font-display text-[clamp(24px,3vw,34px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("reassurance.title")}
              </h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-fg-muted">
                {t("reassurance.body")}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 120% at 50% 120%, var(--accent-soft), transparent 70%)",
          }}
        />
        <Container className="relative max-w-[760px] py-[clamp(64px,9vw,120px)] text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(28px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.022em] text-balance">
              {t("finalCta.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[clamp(16px,1.5vw,19px)] text-fg-muted">
              {t("finalCta.subtitle")}
            </p>
            <Link
              href="/contacto?reason=presupuesto"
              className="mt-8 inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[30px] py-4 text-[17px] font-semibold text-accent-fg transition hover:-translate-y-0.5"
            >
              {t("finalCta.cta")} <span className="text-lg">→</span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
