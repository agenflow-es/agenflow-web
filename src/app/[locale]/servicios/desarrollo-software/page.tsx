import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { AccentCard } from "@/components/ui/AccentCard";
import { SpotlightCard } from "@/components/visuals/SpotlightCard";

type Pillar = { name: string; desc: string };
type Step = { step: string; name: string; desc: string };
type Product = {
  name: string;
  sector: string;
  desc: string;
  status?: string;
  href: string;
};
type Reason = { name: string; desc: string };

export default async function DesarrolloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("desarrolloPage");
  const pillars = t.raw("thesis.pillars") as Pillar[];
  const steps = t.raw("model.steps") as Step[];
  const products = t.raw("showcase.items") as Product[];
  const reasons = t.raw("why.items") as Reason[];
  const tSectors = await getTranslations("sectors");
  const sectorLinks = tSectors.raw("items") as { name: string; href: string }[];

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
          <p className="mx-auto mt-6 max-w-[640px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-fg-muted text-pretty">
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

      {/* Thesis */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="max-w-[760px]">
              <Eyebrow>{t("thesis.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("thesis.title")}
              </h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-fg-muted text-pretty">
                {t("thesis.body")}
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <AccentCard key={i} title={p.name} desc={p.desc} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The model */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <Eyebrow>{t("model.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("model.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("model.intro")}
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

      {/* Showcase */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="max-w-[720px]">
              <Eyebrow>{t("showcase.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("showcase.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("showcase.intro")}
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Link
                  key={i}
                  href={p.href}
                  className="group flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-[22px] font-semibold lowercase">
                      {p.name}
                    </span>
                    {p.status && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-label text-[10.5px] uppercase tracking-[0.08em] text-fg-muted">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {p.status}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 font-label text-[12px] uppercase tracking-[0.1em] text-accent">
                    {p.sector}
                  </span>
                  <p className="mt-4 flex-1 text-[15px] leading-[1.6] text-fg-muted">
                    {p.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-fg transition group-hover:text-accent">
                    {t("showcase.cta")}
                    <span aria-hidden className="transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why us */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="max-w-[720px]">
              <Eyebrow>{t("why.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("why.title")}
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r, i) => (
                <AccentCard key={i} title={r.name} desc={r.desc} background="bg" bar={false} compact />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Split CTA */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 120% at 50% 120%, var(--accent-soft), transparent 70%)",
          }}
        />
        <Container className="relative py-[clamp(64px,9vw,120px)]">
          <Reveal>
            <div className="mb-10 text-center">
              <Eyebrow>{t("split.eyebrow")}</Eyebrow>
            </div>
            <div className="mx-auto grid max-w-[920px] gap-5 md:grid-cols-2">
              <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-8 shadow-[var(--shadow)]">
                <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-0.018em]">
                  {t("split.user.title")}
                </h3>
                <p className="mt-3 leading-[1.6] text-fg-muted">
                  {t("split.user.body")}
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {sectorLinks.map((s, i) => (
                    <Link
                      key={i}
                      href={s.href}
                      className="group inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-border px-3.5 py-2 text-[14px] font-semibold text-fg transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {s.name}
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/contacto"
                className="group rounded-[var(--radius-lg)] border border-l-2 border-border border-l-accent bg-surface p-8 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent"
              >
                <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-0.018em]">
                  {t("split.partner.title")}
                </h3>
                <p className="mt-3 leading-[1.6] text-fg-muted">
                  {t("split.partner.body")}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent">
                  {t("split.partner.cta")}
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
