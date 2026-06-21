import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";

type Step = { step: string; name: string; desc: string; takeaway: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "consultoria", path: "/servicios/consultoria-ia" });
}

export default async function ConsultoriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("consultoriaPage");
  const forWho = t.raw("forWho.items") as string[];
  const steps = t.raw("process.steps") as Step[];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        cta={{ label: t("ctaPrimary"), href: "/contacto?reason=consultoria" }}
        ctaSecondary={{ label: t("ctaSecondary"), href: "#como" }}
      />

      {/* For who / problem */}
      <section className="border-b border-border">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <Eyebrow>{t("forWho.eyebrow")}</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
              {t("forWho.title")}
            </h2>
            <ul className="mt-8 space-y-4">
              {forWho.map((it, i) => (
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

      {/* The consultation, step by step (merged) */}
      <section id="como" className="scroll-mt-20 border-b border-border bg-surface">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <SectionHeader
              eyebrow={t("process.eyebrow")}
              title={t("process.title")}
              intro={t("process.intro")}
            />

            <div className="mx-auto max-w-[860px] space-y-4">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="group rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent sm:flex sm:gap-7 sm:p-8"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-label text-[15px] font-semibold text-accent-fg">
                    {s.step}
                  </span>
                  <div className="mt-5 sm:mt-0">
                    <h3 className="font-display text-[21px] font-semibold">
                      {s.name}
                    </h3>
                    <p className="mt-2.5 leading-[1.6] text-fg-muted">
                      {s.desc}
                    </p>
                    <div className="mt-4 flex items-start gap-2 text-[14px]">
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                      <span>
                        <span className="font-semibold text-accent">
                          {t("process.takeawayLabel")}:
                        </span>{" "}
                        <span className="text-fg">{s.takeaway}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The expert */}
      <section className="border-b border-border">
        <Container className="max-w-[860px] py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-border border-l-2 border-l-accent bg-surface p-8 shadow-[var(--shadow)] sm:p-10">
              <Eyebrow>{t("expert.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(24px,3vw,36px)] font-bold leading-[1.12] tracking-[-0.022em] text-balance">
                {t("expert.title")}
              </h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-fg-muted">
                {t("expert.body")}
              </p>
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
