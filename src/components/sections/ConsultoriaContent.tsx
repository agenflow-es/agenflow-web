"use client";

import type { LucideIcon } from "lucide-react";
import {
  X,
  Check,
  ArrowRight,
  ListChecks,
  FileSearch,
  Unlock,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BentoGrid } from "@/components/motion/BentoGrid";
import { FullBleedStatement } from "@/components/motion/FullBleedStatement";
import { EASE, DURATION, VIEWPORT } from "@/lib/motion";

/**
 * ConsultoriaContent — body of the /consultoria page (Línea B). The paid
 * consultation = step 1 of the funnel + SEO landing. Every section uses a
 * DIFFERENT format and heading placement (centred contrast → asymmetric bento →
 * split timeline → two-column callout → full-bleed statement) so the page never
 * reads as stacked identical blocks. Cards carry depth: blueprint "+" mark, a
 * ghosted oversized icon, and an accent glow on hover. No "gratis"; no figures.
 */
const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

const THEM = [
  "30 minutos con un comercial",
  "Acaba en un presupuesto",
  "Un guion para engancharte",
];
const US = [
  "Una sesión de trabajo, sin prisas",
  "Entendemos tu negocio por dentro",
  "Te vas sabiendo exactamente qué mejorar",
];

const STEPS = [
  {
    n: "01",
    title: "Sesión de trabajo",
    desc: "Nos cuentas cómo opera tu negocio; preguntamos, escuchamos, entendemos.",
  },
  {
    n: "02",
    title: "Analizamos",
    desc: "Cruzamos lo que vimos y detectamos las oportunidades reales de mejora.",
  },
  {
    n: "03",
    title: "Recibes tu plan",
    desc: "En menos de 24 h lo tienes todo por escrito, listo para actuar.",
  },
];

// Shared card chrome: gradient surface, blueprint "+" mark, ghosted oversized
// icon for depth, accent border + lift + glow on hover.
const CARD =
  "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--accent)_45%,transparent)]";

function GhostIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Icon
      aria-hidden
      strokeWidth={1}
      className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-fg/[0.04] transition-colors duration-300 group-hover:text-accent/[0.08]"
    />
  );
}

function PlusMark() {
  return (
    <span
      aria-hidden
      className="absolute right-4 top-4 font-label text-[15px] leading-none text-fg-faint transition-colors duration-300 group-hover:text-accent"
    >
      +
    </span>
  );
}

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-[var(--accent-soft)] text-accent">
      <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
    </span>
  );
}

export function ConsultoriaContent() {
  const rm = useReducedMotion();
  const slide = (dir: number) =>
    rm
      ? {}
      : {
          initial: { opacity: 0, x: dir * 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: VIEWPORT,
          transition: { duration: DURATION.slow, ease: EASE },
        };

  return (
    <>
      {/* 2 · Qué es — centred heading over an asymmetric contrast */}
      <section className="bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal className="mx-auto max-w-[760px] text-center">
            <Eyebrow>Qué es</Eyebrow>
            <h2 className={`mx-auto mt-4 max-w-[22ch] ${H2}`}>
              No es una llamada de ventas. Es trabajo de verdad.
            </h2>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-12">
            <motion.div
              {...slide(-1)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-8 md:col-span-6"
            >
              <PlusMark />
              <span className="font-label text-[11px] font-medium uppercase tracking-[0.13em] text-fg-faint">
                La «auditoría gratis» de otros
              </span>
              <ul className="mt-6 space-y-3.5">
                {THEM.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[15px] text-fg-muted"
                  >
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-fg-faint"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...slide(1)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-[var(--accent-soft)] to-transparent p-8 md:col-span-6"
            >
              <span
                aria-hidden
                className="absolute right-4 top-4 font-label text-[15px] leading-none text-accent"
              >
                +
              </span>
              <span className="font-label text-[11px] font-medium uppercase tracking-[0.13em] text-accent">
                Tu consultoría con Agenflow
              </span>
              <ul className="mt-6 space-y-4">
                {US.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[16px] font-medium text-fg"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3 · Qué te llevas — asymmetric bento with rich cards */}
      <section className="border-t border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal>
            <Eyebrow>Qué te llevas</Eyebrow>
            <h2 className={`mt-4 max-w-[22ch] ${H2}`}>
              Sales con un plan, no con un compromiso.
            </h2>
          </Reveal>

          <BentoGrid className="mt-11">
            {/* Feature card — tall, spans 4 */}
            <StaggerItem
              style={{ gridColumn: "span 4", gridRow: "span 2" }}
              className={CARD}
            >
              <GhostIcon icon={ListChecks} />
              <PlusMark />
              <IconChip icon={ListChecks} />
              <span className="relative z-10 mt-5 font-label text-[11px] font-medium uppercase tracking-[0.13em] text-accent">
                El entregable
              </span>
              <h3 className="relative z-10 mt-2 font-display text-[clamp(21px,2.4vw,28px)] font-semibold leading-tight text-fg">
                Un plan de acción priorizado
              </h3>
              <p className="relative z-10 mt-3 max-w-[38ch] text-[15px] leading-relaxed text-fg-muted">
                Qué hacer primero y en qué orden, según impacto y esfuerzo.
              </p>
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {["Prioridades", "Orden de ejecución", "Impacto estimado"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-bg/60 px-3 py-1 font-label text-[11px] tracking-[0.06em] text-fg-muted backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
              <p className="relative z-10 mt-auto pt-6 text-[15px] font-medium text-fg">
                En tus manos en{" "}
                <span className="text-accent">menos de 24 h</span>.
              </p>
            </StaggerItem>

            {/* Two supporting cards, stacked on the right */}
            <StaggerItem style={{ gridColumn: "span 2" }} className={CARD}>
              <GhostIcon icon={FileSearch} />
              <PlusMark />
              <IconChip icon={FileSearch} />
              <span className="relative z-10 mt-5 font-label text-[11px] font-medium uppercase tracking-[0.13em] text-accent">
                Diagnóstico
              </span>
              <h3 className="relative z-10 mt-2 font-display text-[19px] font-semibold text-fg">
                Análisis completo
              </h3>
              <p className="relative z-10 mt-2 text-[14px] leading-relaxed text-fg-muted">
                Dónde se pierde tiempo y qué se puede automatizar.
              </p>
            </StaggerItem>

            <StaggerItem style={{ gridColumn: "span 2" }} className={CARD}>
              <GhostIcon icon={Unlock} />
              <PlusMark />
              <IconChip icon={Unlock} />
              <span className="relative z-10 mt-5 font-label text-[11px] font-medium uppercase tracking-[0.13em] text-accent">
                Sin ataduras
              </span>
              <h3 className="relative z-10 mt-2 font-display text-[19px] font-semibold text-fg">
                Tuyo, sin permanencia
              </h3>
              <p className="relative z-10 mt-2 text-[14px] leading-relaxed text-fg-muted">
                Lo ejecutas con tu equipo, por tu cuenta o con nosotros.
              </p>
            </StaggerItem>
          </BentoGrid>
        </Container>
      </section>

      {/* 4 · Cómo funciona — split: heading rail (left) + animated timeline (right) */}
      <section className="border-y border-border bg-surface py-[clamp(64px,10vw,120px)]">
        <Container>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
            <Reveal className="md:col-span-5 lg:col-span-4">
              <Eyebrow>Cómo funciona</Eyebrow>
              <h2 className={`mt-4 ${H2}`}>
                De tu operativa a un plan, en tres pasos.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
                Un método claro, sin humo. Cada paso tiene un porqué.
              </p>
            </Reveal>

            <div className="md:col-span-7 lg:col-span-8">
              <Stagger className="max-w-[560px]">
                {STEPS.map(({ n, title, desc }, i) => {
                  const last = i === STEPS.length - 1;
                  return (
                    <StaggerItem key={n} className="flex gap-6">
                      {/* node + connector: the line lives BETWEEN nodes, so it
                          never crosses an icon nor runs past the last step */}
                      <div className="flex flex-col items-center">
                        <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-[var(--accent-soft)] font-label text-[13px] tracking-[0.06em] text-accent">
                          {n}
                        </div>
                        {!last && (
                          <div className="relative mt-2 w-px flex-1 overflow-hidden bg-border">
                            <div className="h-10 w-full bg-gradient-to-b from-transparent via-accent to-transparent [animation:af-beam-y_3.2s_linear_infinite]" />
                          </div>
                        )}
                      </div>
                      <div className={last ? "pt-1.5" : "pt-1.5 pb-10"}>
                        <h3 className="font-display text-[21px] font-semibold leading-snug text-fg">
                          {title}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">
                          {desc}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      {/* 5 · El puente — discount, two-column accent callout */}
      <section className="bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal className="grid gap-8 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-[var(--accent-soft)] to-transparent p-[clamp(28px,5vw,56px)] md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <Eyebrow>El siguiente paso</Eyebrow>
              <h2 className={`mt-4 max-w-[18ch] ${H2}`}>
                ¿Y si lo construimos juntos?
              </h2>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
                El plan es tuyo, lo ejecutes con quien lo ejecutes. Pero si
                decides que lo construyamos nosotros, lo que inviertes en la
                consultoría se convierte en un descuento en tu proyecto de
                automatización.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]">
                <div className="flex-1 text-center">
                  <div className="font-label text-[10.5px] uppercase tracking-[0.1em] text-fg-faint">
                    Consultoría
                  </div>
                  <div className="mt-1.5 font-display text-[17px] font-semibold text-fg">
                    La inviertes
                  </div>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-accent"
                  strokeWidth={2}
                  aria-hidden
                />
                <div className="flex-1 text-center">
                  <div className="font-label text-[10.5px] uppercase tracking-[0.1em] text-accent">
                    Tu proyecto
                  </div>
                  <div className="mt-1.5 font-display text-[17px] font-semibold text-fg">
                    Se descuenta
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[13px] text-fg-muted">
                El diagnóstico nunca es dinero perdido.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6 · Por qué de pago — full-bleed statement (the "why", complements FAQ) */}
      <FullBleedStatement kicker="Con transparencia" tinted>
        No es gratis. Es la inversión de{" "}
        <span className="text-accent">ver claro tu negocio</span> antes de mover
        una sola pieza.
      </FullBleedStatement>
    </>
  );
}
