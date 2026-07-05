import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Cta = { label: string; href: string };

/**
 * HeroLineaB — the home/page hero: mono eyebrow, restrained, clean background
 * (the blueprint grid/frame was removed — it wasn't landing). Copy-agnostic:
 * pass title as a node so a two-beat contrast headline can dim the first clause
 * and land on the second.
 */
export function HeroLineaB({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  proof,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle: ReactNode;
  primary: Cta;
  secondary?: Cta;
  proof?: string;
}) {
  return (
    <section className="border-b border-border">
      <Container className="py-[clamp(72px,13vw,150px)] text-center">
        <Reveal>
          {eyebrow && <Eyebrow className="mb-5 inline-block">{eyebrow}</Eyebrow>}
          <h1 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(31px,5.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.025em] text-fg">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-fg-muted">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3.5 text-[15px] font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              {primary.label} <span aria-hidden>→</span>
            </a>
            {secondary && (
              <a
                href={secondary.href}
                className="inline-flex items-center rounded-[var(--radius)] border border-border-strong px-6 py-3.5 text-[15px] font-medium text-fg transition-colors hover:bg-surface"
              >
                {secondary.label}
              </a>
            )}
          </div>
          {proof && (
            <div className="mt-10 font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
              {proof}
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
