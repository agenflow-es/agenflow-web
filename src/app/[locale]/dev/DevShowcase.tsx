"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BentoGrid, BentoCard } from "@/components/motion/BentoGrid";
import { ScrollNarrative, type NarrativeStep } from "@/components/motion/ScrollNarrative";
import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { FullBleedStatement } from "@/components/motion/FullBleedStatement";

/**
 * /dev — isolated showcase of the motion primitives. Content here is throwaway
 * demo copy, not final web copy. The point is to review timing, look and
 * reduced-motion behaviour before any real section is assembled.
 */

function Label({ name, note }: { name: string; note: string }) {
  return (
    <div className="mb-8 border-l-2 border-accent pl-4">
      <div className="font-label text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
        {name}
      </div>
      <p className="mt-1 text-[14px] text-fg-muted">{note}</p>
    </div>
  );
}

function Block({ children }: { children: ReactNode }) {
  return <section className="py-[clamp(48px,8vw,96px)]">{children}</section>;
}

const PROCESS: NarrativeStep[] = [
  {
    id: "diag",
    label: "Paso 01",
    title: "Diagnosticamos",
    body: "Miramos tu operación de arriba abajo y detectamos dónde se va el tiempo. Sales con un plan claro de qué hacer y en qué orden.",
  },
  {
    id: "build",
    label: "Paso 02",
    title: "Construimos",
    body: "Conectamos las herramientas que ya usas y montamos los sistemas que quitan el trabajo manual. Tu equipo deja de teclear lo repetitivo.",
  },
  {
    id: "run",
    label: "Paso 03",
    title: "Mantenemos",
    body: "Lo dejamos funcionando y mejorando contigo. No te entregamos un cacharro y desaparecemos.",
  },
];

const TOOLS = [
  "Gmail",
  "WhatsApp",
  "Excel",
  "Google Sheets",
  "Holded",
  "HubSpot",
  "Notion",
  "Google Calendar",
  "Drive",
  "Slack",
];

export function DevShowcase() {
  return (
    <MotionProvider>
      <div className="bg-bg text-fg">
        <Container className="py-16">
          <span className="font-label text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
            Banco de pruebas
          </span>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.02em]">
            Primitivos de motion
          </h1>
          <p className="mt-3 max-w-[60ch] text-fg-muted">
            Cada primitivo aislado, consumiendo el sistema de motion
            (<code className="font-label text-[13px] text-fg">lib/motion.ts</code>)
            y el brand kit. Activa &ldquo;reducir movimiento&rdquo; en tu sistema
            para comprobar que todo se queda quieto.
          </p>
        </Container>

        {/* Reveal + Stagger */}
        <Container>
          <Block>
            <Label
              name="<Reveal> + <Stagger>"
              note="Entrada al hacer scroll: fade + translate sutil. Stagger encadena los hijos."
            />
            <Reveal>
              <h2 className="mb-6 font-display text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.015em]">
                Este título aparece con un Reveal.
              </h2>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <StaggerItem
                  key={n}
                  className="rounded-[var(--radius-lg)] border border-border bg-surface p-6"
                >
                  <div className="font-label text-[12px] uppercase tracking-[0.13em] text-accent">
                    Item 0{n}
                  </div>
                  <p className="mt-2 text-[14.5px] text-fg-muted">
                    Las tarjetas entran una tras otra, no todas de golpe.
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Block>
        </Container>

        {/* BentoGrid */}
        <Container>
          <Block>
            <Label
              name="<BentoGrid> + <BentoCard>"
              note="Rejilla asimétrica: tarjetas de tamaños distintos. Cada una define su colSpan/rowSpan."
            />
            <BentoGrid>
              <BentoCard colSpan={4} label="Servicio" title="Automatización de procesos">
                Las facturas entran solas, los avisos llegan a tiempo, los informes
                se generan solos.
              </BentoCard>
              <BentoCard colSpan={2} rowSpan={2} label="Producto" title="Software por sector">
                Producto propio con la IA dentro, pensado para cómo trabaja tu
                sector de verdad.
              </BentoCard>
              <BentoCard colSpan={2} label="Punto de entrada" title="Consultoría" />
              <BentoCard colSpan={2} label="Vertical" title="El inmueble" />
            </BentoGrid>
          </Block>
        </Container>

        {/* ScrollNarrative */}
        <Container>
          <Block>
            <Label
              name="<ScrollNarrative>"
              note="Los pasos avanzan a la izquierda; el panel fijo de la derecha reacciona. Un solo uso en toda la web."
            />
            <ScrollNarrative
              steps={PROCESS}
              renderPanel={(active) => (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <div className="font-label text-[13px] uppercase tracking-[0.18em] text-accent">
                    {PROCESS[active].label}
                  </div>
                  <div className="mt-4 font-display text-[clamp(48px,9vw,96px)] font-semibold leading-none tracking-[-0.03em] text-fg">
                    0{active + 1}
                  </div>
                  <div className="mt-4 font-display text-[20px] font-semibold text-fg">
                    {PROCESS[active].title}
                  </div>
                </div>
              )}
            />
          </Block>
        </Container>

        {/* LogoMarquee */}
        <Container>
          <Block>
            <Label
              name="<LogoMarquee>"
              note="Marquee lento e infinito, pausa al pasar el ratón. Contenido: herramientas que integramos (no logos de clientes)."
            />
          </Block>
        </Container>
        <LogoMarquee items={TOOLS} className="py-4" />

        {/* FullBleedStatement */}
        <Container>
          <Block>
            <Label
              name="<FullBleedStatement>"
              note="Sección a sangre completa con una afirmación fuerte y mucho aire."
            />
          </Block>
        </Container>
        <FullBleedStatement kicker="Principio" tinted>
          No todo se puede automatizar. Te decimos qué sí y qué no antes de empezar.
        </FullBleedStatement>

        <div className="h-24" />
      </div>
    </MotionProvider>
  );
}
