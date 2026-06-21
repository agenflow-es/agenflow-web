import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { AccentCard } from "@/components/ui/AccentCard";
import { SpotlightCard } from "@/components/visuals/SpotlightCard";

type PainItem = { pain: string; fix: string };
type PainGroup = { name: string; items: PainItem[] };
type Segment = { name: string; desc: string };
type Product = {
  name: string;
  for: string;
  desc: string;
  status?: string;
  cta: string;
  href: string;
  external: boolean;
};

function ProductCard({ p }: { p: Product }) {
  const inner = (
    <>
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
        {p.for}
      </span>
      <p className="mt-4 flex-1 text-[15px] leading-[1.6] text-fg-muted">
        {p.desc}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-fg transition group-hover:text-accent">
        {p.cta}
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          {p.external ? "↗" : "→"}
        </span>
      </span>
    </>
  );

  const className =
    "group flex flex-col rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent";

  return p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={p.href} className={className}>
      {inner}
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "inmobiliario", path: "/sectores/inmobiliario-construccion" });
}

export default async function InmobiliarioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("inmobiliarioPage");
  const problem = t.raw("problem.items") as string[];
  const painGroups = t.raw("pains.groups") as PainGroup[];
  const products = t.raw("products.items") as Product[];
  const construction = t.raw("construction.items") as PainItem[];
  const segments = t.raw("segments.items") as Segment[];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        cta={{ label: t("cta"), href: "/contacto?reason=caso" }}
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
            <div className="grid gap-x-5 gap-y-10 md:grid-cols-2">
              {painGroups.map((g, i) => (
                <div key={i}>
                  <h3 className="mb-5 font-display text-[19px] font-semibold">
                    {g.name}
                  </h3>
                  <div className="space-y-4">
                    {g.items.map((it, j) => (
                      <SpotlightCard key={j} className="p-6">
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
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Products */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("products.eyebrow")}
              title={t("products.title")}
              intro={t("products.intro")}
              align="left"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {products.map((p, i) => (
                <ProductCard key={i} p={p} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Construction & renovation */}
      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("construction.eyebrow")}
              title={t("construction.title")}
              intro={t("construction.intro")}
              align="left"
              maxWidth={760}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {construction.map((it, i) => (
                <div
                  key={i}
                  className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent"
                >
                  <p className="text-[15.5px] font-semibold leading-[1.45] text-fg">
                    {it.pain}
                  </p>
                  <p className="mt-2.5 flex items-start gap-2 text-[15px] leading-[1.55] text-fg-muted">
                    <span aria-hidden className="mt-px shrink-0 font-semibold text-accent">
                      →
                    </span>
                    <span>{it.fix}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-7 font-label text-[12.5px] uppercase tracking-[0.1em] text-fg-faint">
              {t("construction.note")}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("segments.eyebrow")}
              title={t("segments.title")}
              align="left"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {segments.map((s, i) => (
                <AccentCard key={i} title={s.name} desc={s.desc} background="bg" compact />
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
        href="/contacto?reason=caso"
      />
    </>
  );
}
