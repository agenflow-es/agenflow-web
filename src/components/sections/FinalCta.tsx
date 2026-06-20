import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 120% at 50% 120%,var(--accent-soft),transparent 70%)",
        }}
      />
      <Container className="relative max-w-[820px] py-[clamp(72px,10vw,130px)] text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,58px)] font-bold leading-[1.06] tracking-[-0.022em] text-balance">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[clamp(16px,1.6vw,20px)] text-fg-muted">
            {t("subtitle")}
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[30px] py-4 text-[17px] font-semibold text-accent-fg transition hover:-translate-y-0.5"
          >
            {t("cta")} <span className="text-lg">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
