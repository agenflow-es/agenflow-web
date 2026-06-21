import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
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
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-soft), transparent 70%)",
          }}
        />
        <Container className="relative max-w-[820px] py-[clamp(64px,10vw,120px)] text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.06] tracking-[-0.022em] text-balance">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-fg-muted text-pretty">
            {t("subtitle")}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contacto?reason=presupuesto"
              className="inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
            >
              {t("ctaPrimary")} <span className="text-lg">→</span>
            </Link>
          </div>
        </Container>
      </section>

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
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <Eyebrow>{t("flow.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("flow.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("flow.intro")}
              </p>
            </div>

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
            <div className="max-w-[720px]">
              <Eyebrow>{t("capabilities.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("capabilities.title")}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c, i) => (
                <div
                  key={i}
                  className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent"
                >
                  <span
                    aria-hidden
                    className="block h-1.5 w-7 rounded-full bg-accent opacity-80 transition group-hover:w-10"
                  />
                  <h3 className="mt-5 font-display text-[18px] font-semibold">
                    {c.name}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-fg-muted">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Delivery */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <Eyebrow>{t("delivery.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("delivery.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("delivery.intro")}
              </p>
            </div>
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
