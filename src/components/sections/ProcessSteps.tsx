"use client";

import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import {
  ScrollNarrative,
  type NarrativeStep,
} from "@/components/motion/ScrollNarrative";

/**
 * Section 3 — how we work, as a 3-step path (the ScrollNarrative signature moment,
 * used ONCE on the site). Step 1 is the paid consultoría (the funnel door) — no
 * "gratis" here; the free entry point is the global "Cuéntanos tu caso" CTA.
 * "use client" so the renderPanel function can pass to the (client) ScrollNarrative.
 *
 * Copy inline for now; moves to messages when the home is wired to i18n.
 */
const STEPS: NarrativeStep[] = [
  {
    id: "diag",
    label: "Paso 01",
    title: "Diagnosticamos",
    body: "Radiografiamos tu operación en unas sesiones de trabajo. Sales con un plan claro de qué automatizar y en qué orden. El plan es tuyo, lo ejecutes con nosotros o no.",
  },
  {
    id: "build",
    label: "Paso 02",
    title: "Construimos",
    body: "Conectamos las herramientas que ya usas y montamos los sistemas que quitan el trabajo manual: automatización, software propio por sector… lo que tu caso necesite. Y tu negocio empieza a crecer, con el mismo equipo.",
  },
  {
    id: "run",
    label: "Paso 03",
    title: "Mantenemos",
    body: "Lo dejamos funcionando y mejorando contigo. Medimos lo que cambia en tu día a día. No te entregamos un cacharro y desaparecemos.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            Primero entendemos tu negocio. Después construimos.
          </h2>
        </Reveal>

        <div className="mt-14">
          <ScrollNarrative
            steps={STEPS}
            renderPanel={(active) => (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="font-label text-[13px] uppercase tracking-[0.18em] text-accent">
                  {STEPS[active].label}
                </div>
                <div className="mt-4 font-display text-[clamp(48px,9vw,96px)] font-semibold leading-none tracking-[-0.03em] text-fg">
                  0{active + 1}
                </div>
                <div className="mt-4 font-display text-[20px] font-semibold text-fg">
                  {STEPS[active].title}
                </div>
              </div>
            )}
          />
        </div>
      </Container>
    </section>
  );
}
