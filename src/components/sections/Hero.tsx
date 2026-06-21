import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";

export function Hero() {
  const t = useTranslations("hero");
  const proof = t.raw("proof") as string[];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -left-[120px] -top-[160px] h-[620px] w-[620px] rounded-full blur-[20px]"
          style={{
            background: "radial-gradient(circle,var(--accent-soft),transparent 68%)",
            animation: "af-drift 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-[220px] -right-[140px] h-[560px] w-[560px] rounded-full blur-[20px]"
          style={{
            background: "radial-gradient(circle,var(--accent-soft),transparent 68%)",
            animation: "af-drift2 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 28%,#000 35%,transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 28%,#000 35%,transparent 78%)",
          }}
        />
      </div>

      <Container className="relative z-[1] flex max-w-[1000px] flex-col items-center pt-[clamp(56px,9vw,104px)] text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--accent-soft)] px-3 py-[7px] font-label text-[12.5px] font-medium uppercase tracking-[0.13em] text-accent">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            style={{ animation: "af-blink 2.2s infinite" }}
          />
          {t("eyebrow")}
        </span>

        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(34px,5.2vw,64px)] font-bold leading-[1.04] tracking-[-0.022em] text-balance">
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
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-border-strong px-[26px] py-[15px] font-medium text-fg transition hover:bg-surface"
          >
            {t("ctaSecondary")}
          </Link>
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

        <div
          className="relative mt-[clamp(56px,8vw,96px)] w-full max-w-[980px]"
          style={{ animation: "af-float 8s ease-in-out infinite" }}
        >
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-[11px] w-[11px] rounded-full bg-border-strong" />
              <span className="h-[11px] w-[11px] rounded-full bg-border-strong" />
              <span className="h-[11px] w-[11px] rounded-full bg-border-strong" />
              <span className="ml-3.5 font-label text-xs text-fg-faint">
                app.fincai.es
              </span>
            </div>
            <div
              className="relative flex h-[clamp(280px,40vw,440px)] items-center justify-center overflow-hidden bg-surface-2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg,var(--grid) 0 2px,transparent 2px 14px)",
              }}
            >
              <div
                className="absolute inset-y-0 w-[30%]"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,var(--accent-soft),transparent)",
                  animation: "af-scan 3.4s ease-in-out infinite",
                }}
              />
              <span className="rounded-[var(--radius)] border border-dashed border-border-strong bg-bg px-4 py-2.5 font-label text-[13px] uppercase tracking-[0.13em] text-fg-faint">
                {t("mockupLabel")}
              </span>
            </div>
          </div>
        </div>
      </Container>

      <div className="h-[clamp(64px,8vw,96px)]" />
    </section>
  );
}
