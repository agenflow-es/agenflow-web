import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PricingSection } from "@/components/pricing";
import { AiVisibilityCheck } from "@/components/ai/AiVisibilityCheck";

type Card = { name: string; desc: string };
type Feature = { text: string; tooltip?: string };
type PlanItem = {
  name: string;
  info?: string;
  highlighted?: boolean;
  features: Feature[];
};
type Row = { feat: string; vals: string[]; star?: boolean };

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
  const planItems = t.raw("plans.items") as PlanItem[];
  const cols = t.raw("compare.cols") as string[];
  const rows = t.raw("compare.rows") as Row[];
  const addonPoints = t.raw("addon.points") as string[];

  const popularLabel = t("plans.popularLabel");
  const planCta = t("plans.ctaText");
  const plans = planItems.map((p) => ({
    name: p.name,
    info: p.info,
    features: p.features,
    highlighted: p.highlighted,
    badge: p.highlighted ? popularLabel : undefined,
    btn: { text: planCta, href: "/contacto" },
  }));

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
        <Container className="relative max-w-[840px] py-[clamp(64px,10vw,120px)] text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.06] tracking-[-0.022em] text-balance">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-fg-muted text-pretty">
            {t("subtitle")}
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
            >
              {t("cta")} <span className="text-lg">→</span>
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

      {/* The shift — web / SEO / GEO */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <Eyebrow>{t("shift.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("shift.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("shift.intro")}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {shiftCards.map((c, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-lg)] border border-border bg-bg p-6 shadow-[var(--shadow)]"
                >
                  <span
                    aria-hidden
                    className="block h-1.5 w-7 rounded-full bg-accent opacity-80"
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

      {/* Plans (21st.dev pricing component, adapted, no prices) */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <Eyebrow>{t("plans.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("plans.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("plans.subtitle")}
              </p>
            </div>
            <PricingSection plans={plans} />
          </Reveal>
        </Container>
      </section>

      {/* Compare table */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="mb-10 max-w-[720px]">
              <Eyebrow>{t("compare.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("compare.title")}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border-strong">
                    <th className="py-4 pr-4 font-display text-[15px] font-semibold" />
                    {cols.map((c, i) => (
                      <th
                        key={i}
                        className="px-4 py-4 font-display text-[15px] font-semibold"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="py-3.5 pr-4 text-[14.5px] leading-[1.45] text-fg">
                        {r.feat}
                        {r.star && <span aria-hidden className="ml-1.5 text-accent">★</span>}
                      </td>
                      {r.vals.map((v, j) => (
                        <td
                          key={j}
                          className="px-4 py-3.5 text-[14.5px] text-fg-muted"
                        >
                          {v === "true" ? (
                            <Check
                              aria-label="Sí"
                              className="h-[18px] w-[18px] text-accent"
                            />
                          ) : v === "false" ? (
                            <span aria-label="No" className="text-fg-faint">
                              —
                            </span>
                          ) : (
                            v
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Recurring add-on */}
      <section className="border-b border-border bg-surface">
        <Container className="max-w-[920px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-border border-l-2 border-l-accent bg-bg p-8 shadow-[var(--shadow)] sm:p-10">
              <Eyebrow>{t("addon.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(24px,3vw,34px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("addon.title")}
              </h2>
              <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-fg-muted">
                {t("addon.body")}
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {addonPoints.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-fg"
                  >
                    <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[14px] text-fg-faint">{t("addon.note")}</p>
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
              href="/contacto"
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
