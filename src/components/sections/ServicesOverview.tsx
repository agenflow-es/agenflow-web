"use client";

import type { LucideIcon } from "lucide-react";
import { Compass, Workflow, Blocks, Globe } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * ServicesOverview — the single services page (Línea B). One page that explains
 * the four services clearly but briefly, as an indexed spec list (rows + hairlines,
 * engineering tone) so each one gets room to be understood — not tiny cards.
 * Copy inline for now; wired to i18n + real /servicios route once approved.
 */
type Service = {
  index: string;
  icon: LucideIcon;
  kicker: string;
  title: string;
  body: string;
  meta: string;
};

const SERVICES: Service[] = [
  {
    index: "01",
    icon: Compass,
    kicker: "Por dónde se empieza",
    title: "Consultoría de IA",
    body: "Una o dos sesiones de trabajo para entender tu negocio por dentro. Escuchamos cómo operas hoy y, según lo que veamos, te devolvemos un plan con las oportunidades reales de mejora: qué automatizar, dónde suma la IA y en qué orden. A veces basta con automatizar, a veces la IA marca la diferencia — partimos de lo que necesitas, no de la moda.",
    meta: "Sales con un plan claro, no con un compromiso.",
  },
  {
    index: "02",
    icon: Workflow,
    kicker: "Automatizamos",
    title: "Automatización de procesos",
    body: "Conectamos las herramientas que ya usas para que la información fluya sola y el trabajo manual y repetitivo —facturas, datos, seguimientos, informes— se haga sin que nadie tenga que estar encima. Tu equipo deja de copiar, pegar y perseguir tareas, y se dedica a lo que de verdad mueve el negocio.",
    meta: "El mismo equipo, produciendo mucho más.",
  },
  {
    index: "03",
    icon: Blocks,
    kicker: "Construimos",
    title: "Software por sector",
    body: "Cuando tu sector necesita una herramienta que el mercado no ofrece, la construimos a la medida de cómo trabajas —no una plantilla genérica más. Es lo que estamos haciendo con el mundo del inmueble en Replo y FincAI.",
    meta: "Software propio, pensado para tu día a día.",
  },
  {
    index: "04",
    icon: Globe,
    kicker: "Renovamos",
    title: "Webs para la era de la IA",
    body: "La IA ha cambiado cómo te buscan: hoy mucha gente pregunta a ChatGPT antes que a Google, y muchas webs se han quedado obsoletas para ese mundo. Rehacemos la tuya entera —estructura, contenido, diseño y tripas técnicas— y la optimizamos para que te encuentren donde ahora se busca.",
    meta: "Visible en Google. Y en ChatGPT.",
  },
];

function ServiceRow({ index, icon: Icon, kicker, title, body, meta }: Service) {
  return (
    <StaggerItem className="group grid gap-x-10 gap-y-5 border-t border-border py-10 md:grid-cols-12 md:py-12">
      <div className="md:col-span-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-fg-muted transition-colors group-hover:text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
          </span>
          <span className="font-label text-[12px] tracking-[0.14em] text-fg-muted">
            {index}
          </span>
        </div>
        <Eyebrow className="mt-5 block">{kicker}</Eyebrow>
        <h3 className="mt-1.5 font-display text-[clamp(21px,2.4vw,26px)] font-semibold leading-tight text-fg">
          {title}
        </h3>
      </div>
      <div className="md:col-span-7">
        <p className="text-[15px] leading-relaxed text-fg-muted">{body}</p>
        <p className="mt-5 flex gap-2.5 text-[15px] font-medium text-fg">
          <span aria-hidden className="text-accent">
            —
          </span>
          <span>{meta}</span>
        </p>
      </div>
    </StaggerItem>
  );
}

export function ServicesOverview() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>Nuestros servicios</Eyebrow>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            Cuatro formas de conseguirlo.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
            Puedes empezar por una o combinarlas en un solo sistema. Todo parte
            de entender tu negocio.
          </p>
        </Reveal>
        <Stagger className="mt-12 border-b border-border">
          {SERVICES.map((s) => (
            <ServiceRow key={s.index} {...s} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
