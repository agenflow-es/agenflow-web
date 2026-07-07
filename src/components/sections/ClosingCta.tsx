import { Container } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section — the closing CTA (Línea B redesign). Adapts Morningside's "AI is here /
 * the few with a plan will lead / we build for those few" to Agenflow: AI as the
 * context (the shift), the payoff = competing with advantage, and one low-friction
 * CTA ("Cuéntanos tu caso"). Clean band (no blueprint). Copy inline for now; the
 * real home still uses the i18n FinalCta until this is wired in.
 */
export function ClosingCta() {
  return (
    <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
      <Container className="text-center">
        <Reveal>
          <p className="mx-auto max-w-[26ch] font-display text-[clamp(26px,4.4vw,46px)] font-semibold leading-[1.14] tracking-[-0.02em]">
            <span className="text-fg-muted">
              La IA ya está aquí. Los pocos con un plan, liderarán.
            </span>
            <br />
            <span className="text-fg">Nosotros construimos para esos pocos.</span>
          </p>

          <div className="mt-10">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              Cuéntanos tu caso <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-6 font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
            Gratis · Sin compromiso · Te respondemos en menos de 24 h
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
