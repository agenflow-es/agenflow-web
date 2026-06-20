import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Step = { step: string; name: string; desc: string; takeaway: string };

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
              href="/contacto"
              className="inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
            >
              {t("ctaPrimary")} <span className="text-lg">→</span>
            </Link>
            <a
              href="#como"
              className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-border-strong px-[26px] py-[15px] font-medium text-fg transition hover:bg-surface"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </Container>
      </section>

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
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <Eyebrow>{t("process.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("process.title")}
              </h2>
              <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">
                {t("process.intro")}
              </p>
            </div>

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
