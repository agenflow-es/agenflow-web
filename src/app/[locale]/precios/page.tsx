import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PricingSection } from "@/components/pricing";

type CustomItem = {
  name: string;
  desc: string;
  note?: string;
  cta: string;
  ctaHref: string;
  link?: string;
  linkHref?: string;
};
type Feature = { text: string; tooltip?: string };
type PlanItem = {
  name: string;
  info?: string;
  highlighted?: boolean;
  features: Feature[];
};
type Row = { feat: string; vals: string[]; star?: boolean };

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricingPage");
  // The online-presence plans live under presenciaPage as the single source of
  // truth; /precios is where "what each plan includes" now appears, and the
  // presencia-online service page links back here.
  const tp = await getTranslations("presenciaPage");
  const custom = t.raw("custom.items") as CustomItem[];
  const planItems = tp.raw("plans.items") as PlanItem[];
  const cols = tp.raw("compare.cols") as string[];
  const rows = tp.raw("compare.rows") as Row[];
  const addonPoints = tp.raw("addon.points") as string[];

  const popularLabel = tp("plans.popularLabel");
  const planCta = tp("plans.ctaText");
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
        <Container className="relative max-w-[820px] py-[clamp(64px,10vw,120px)] text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.07] tracking-[-0.022em] text-balance">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-fg-muted text-pretty">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      {/* Block 1 — Tailored */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="max-w-[720px]">
              <Eyebrow>{t("custom.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("custom.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("custom.intro")}
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {custom.map((c, i) => (
                <div
                  key={i}
                  className="group flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-7 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent"
                >
                  <span
                    aria-hidden
                    className="block h-1.5 w-7 rounded-full bg-accent opacity-80 transition group-hover:w-10"
                  />
                  <h3 className="mt-5 font-display text-[19px] font-semibold">
                    {c.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-fg-muted">
                    {c.desc}
                  </p>
                  {c.note && (
                    <p className="mt-3 text-[12.5px] leading-[1.45] text-accent">
                      {c.note}
                    </p>
                  )}
                  <Link
                    href={c.ctaHref}
                    className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius)] bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-fg transition hover:-translate-y-0.5"
                  >
                    {c.cta} <span aria-hidden>→</span>
                  </Link>
                  {c.link && c.linkHref && (
                    <Link
                      href={c.linkHref}
                      className="mt-3 inline-flex w-fit items-center gap-1 text-[13.5px] font-semibold text-fg-muted transition hover:text-accent"
                    >
                      {c.link}{" "}
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Block 2 — Online presence packages (plans + comparison + add-on) */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <Eyebrow>{t("packages.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("packages.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("packages.intro")}
              </p>
            </div>

            <PricingSection plans={plans} />

            {/* Comparison table */}
            <div className="mt-16">
              <h3 className="mb-8 font-display text-[clamp(20px,2.6vw,28px)] font-semibold tracking-[-0.018em]">
                {tp("compare.title")}
              </h3>
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
                          {r.star && (
                            <span aria-hidden className="ml-1.5 text-accent">
                              ★
                            </span>
                          )}
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
            </div>

            {/* Recurring maintenance add-on */}
            <div className="mt-14 rounded-[var(--radius-lg)] border border-border border-l-2 border-l-accent bg-bg p-8 shadow-[var(--shadow)] sm:p-10">
              <Eyebrow>{tp("addon.eyebrow")}</Eyebrow>
              <h3 className="mt-4 font-display text-[clamp(22px,2.8vw,30px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {tp("addon.title")}
              </h3>
              <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-fg-muted">
                {tp("addon.body")}
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
              <p className="mt-7 text-[14px] text-fg-faint">{tp("addon.note")}</p>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/servicios/presencia-online"
                className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-fg transition hover:text-accent"
              >
                {t("packages.serviceLink")} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
