import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { HeroAuroraBg } from "@/components/visuals/HeroAuroraBg";

export function Hero() {
  const t = useTranslations("hero");
  const proof = t.raw("proof") as string[];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroAuroraBg />
        {/* Fade the background into the page below. */}
        <div
          className="absolute inset-x-0 bottom-0 h-44"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
        />
      </div>

      <Container className="relative z-[1] flex max-w-[1000px] flex-col items-center pb-[clamp(80px,12vw,150px)] pt-[clamp(72px,11vw,128px)] text-center">
        <h1 className="max-w-[16ch] font-display text-[clamp(34px,5.2vw,64px)] font-bold leading-[1.04] tracking-[-0.022em] text-balance">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-[600px] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-fg-muted text-pretty">
          {t("subtitle")}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/contacto?reason=consultoria"
            className="inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
          >
            {t("ctaPrimary")} <span className="text-lg">→</span>
          </Link>
          <a
            href="#services"
            className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-border-strong px-[26px] py-[15px] font-medium text-fg transition hover:bg-surface"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-label text-[11.5px] uppercase tracking-[0.13em] text-fg-faint">
          {proof.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block" />
              )}
              {p}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
