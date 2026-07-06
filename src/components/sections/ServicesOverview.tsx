"use client";

import type { LucideIcon } from "lucide-react";
import { Compass, Workflow, Blocks, Globe } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";

/**
 * ServicesOverview — the services page (Línea B). A tabbed navigator: pick a
 * service, read its rich panel. Each panel = promise + paragraph + concrete
 * deliverables ("Qué hacemos") + closing line, and links "ver en detalle" to
 * its dedicated SEO landing. Copy inline for now; wired to i18n + real
 * /servicios route once approved. Conversion layer overview that feeds the
 * deep landing pages.
 */
type Deliverable = { label: string; desc: string };

type Service = {
  id: string;
  tab: string;
  icon: LucideIcon;
  title: string;
  promise: string;
  body: string;
  does: Deliverable[];
  close: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    id: "01",
    tab: "Consultoría",
    icon: Compass,
    title: "Consultoría de IA",
    promise: "Decide qué merece la pena antes de construir nada.",
    body: "Una o dos sesiones para entender tu negocio por dentro: cómo operas hoy, dónde se pierde tiempo y qué te frena. Salimos con un plan de las oportunidades reales —qué automatizar, dónde suma la IA y en qué orden—. Partimos de lo que necesitas, no de la moda.",
    does: [
      { label: "Sesiones de trabajo", desc: "Escuchamos cómo operas hoy, con el equipo que hace el trabajo." },
      { label: "Mapa de oportunidades", desc: "Dónde se pierde tiempo y qué se puede resolver." },
      { label: "Plan priorizado", desc: "Qué hacer primero, ordenado por impacto y esfuerzo." },
      { label: "Análisis de viabilidad", desc: "Qué está listo hoy, qué necesita trabajo y qué puede esperar." },
    ],
    close: "Sales con un plan claro, no con un compromiso.",
    href: "/consultoria",
  },
  {
    id: "02",
    tab: "Automatización",
    icon: Workflow,
    title: "Automatización de procesos",
    promise: "El trabajo manual y repetitivo, hecho solo.",
    body: "Conectamos las herramientas que ya usas para que la información fluya sola y las tareas repetitivas —facturas, datos, seguimientos, informes— se hagan sin que nadie esté encima. Tu equipo deja de copiar, pegar y perseguir tareas.",
    does: [
      { label: "Integración de tus herramientas", desc: "Que hablen entre ellas sin exportar ni copiar a mano." },
      { label: "Flujos automáticos", desc: "Facturas, datos, seguimientos e informes, sin intervención." },
      { label: "Alertas y controles", desc: "El sistema avisa cuando algo necesita una persona." },
      { label: "Mantenimiento", desc: "Lo cuidamos para que siga funcionando cuando tu negocio cambia." },
    ],
    close: "El mismo equipo, produciendo mucho más.",
    href: "/servicios/automatizacion-ia",
  },
  {
    id: "03",
    tab: "Software a medida",
    icon: Blocks,
    title: "Software a medida",
    promise: "Cuando una automatización no basta: una plataforma que lo opera todo.",
    body: "A veces tu negocio no necesita una automatización suelta, sino un conjunto de ellas trabajando juntas. Ahí construimos una plataforma dedicada a tu empresa: un solo sistema, hecho a la medida de cómo operas, que reúne toda tu automatización e IA en un mismo lugar.",
    does: [
      { label: "Un sistema, no piezas sueltas", desc: "Todas tus automatizaciones e IA en una sola plataforma." },
      { label: "Hecha a tu medida", desc: "Construida sobre tu forma de operar, no una plantilla genérica." },
      { label: "Un único lugar de trabajo", desc: "Tu equipo deja de saltar entre herramientas dispersas." },
      { label: "Crece contigo", desc: "Añadimos procesos y capacidades a medida que los necesitas." },
    ],
    close: "Toda tu operativa, en un sistema hecho para ti.",
    href: "/servicios/software-medida",
  },
  {
    id: "04",
    tab: "Web con IA",
    icon: Globe,
    title: "Webs para la era de la IA",
    promise: "Que te encuentren donde ahora se busca.",
    body: "La IA cambió cómo te buscan: hoy mucha gente pregunta a ChatGPT antes que a Google. Rehacemos tu web entera —estructura, contenido, diseño y tripas técnicas— para ese mundo.",
    does: [
      { label: "Rediseño completo", desc: "Estructura, contenido y diseño desde cero." },
      { label: "Optimización para buscadores", desc: "Visible en Google, como siempre." },
      { label: "Optimización para IA", desc: "Y visible cuando te buscan desde ChatGPT." },
      { label: "Base técnica rápida", desc: "Web veloz, cuidada y fácil de mantener." },
    ],
    close: "Visible en Google. Y en ChatGPT.",
    href: "/servicios/webs-ia",
  },
];

function ServicePanel({ icon: Icon, id, title, promise, body, does, close, href }: Service) {
  return (
    <div className="tab-panel-anim grid gap-x-10 gap-y-10 md:grid-cols-12">
      {/* Left — identity: icon, number, title, promise */}
      <div className="md:col-span-5 md:self-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
          </span>
          <span className="font-label text-[12px] tracking-[0.14em] text-fg-muted">
            {id} / 04
          </span>
        </div>
        <h3 className="mt-6 font-display text-[clamp(24px,3vw,34px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
          {title}
        </h3>
        <p className="mt-4 max-w-[30ch] font-display text-[clamp(17px,1.7vw,20px)] font-medium leading-snug text-fg-muted">
          {promise}
        </p>
      </div>

      {/* Right — substance: paragraph, deliverables, closing line */}
      <div className="md:col-span-7">
        <p className="text-[15.5px] leading-relaxed text-fg-muted">{body}</p>

        <div className="mt-8">
          <Eyebrow className="text-label-adaptive">Qué hacemos</Eyebrow>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {does.map((d) => (
              <li key={d.label} className="border-t border-border pt-3.5">
                <p className="text-[14.5px] font-semibold text-fg">{d.label}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">
                  {d.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="flex gap-2.5 text-[15px] font-medium text-fg">
            <span aria-hidden className="text-accent">—</span>
            <span>{close}</span>
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 font-label text-[12px] uppercase tracking-[0.1em] text-accent transition-transform hover:translate-x-0.5"
          >
            Ver en detalle <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesOverview() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>Nuestros servicios</Eyebrow>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            Esto es lo que hacemos.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
            Cuatro servicios independientes. Empiezas por el que tu negocio
            necesita hoy; todo parte de entender cómo trabajas por dentro.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <Tabs.Root defaultValue="01">
            <Tabs.List
              aria-label="Servicios de Agenflow"
              className="-mx-[clamp(20px,5vw,48px)] flex gap-1 overflow-x-auto px-[clamp(20px,5vw,48px)] pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES.map((s) => (
                <Tabs.Trigger
                  key={s.id}
                  value={s.id}
                  className="group relative flex shrink-0 items-baseline gap-2 whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-[15px] font-medium text-fg-muted outline-none transition-colors hover:text-fg focus-visible:text-fg data-[state=active]:border-accent data-[state=active]:text-fg"
                >
                  <span className="font-label text-[11px] tracking-[0.1em] text-fg-faint transition-colors group-data-[state=active]:text-accent">
                    {s.id}
                  </span>
                  {s.tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="border-t border-border pt-12">
              {SERVICES.map((s) => (
                <Tabs.Content key={s.id} value={s.id} className="outline-none">
                  <ServicePanel {...s} />
                </Tabs.Content>
              ))}
            </div>
          </Tabs.Root>
        </Reveal>
      </Container>
    </section>
  );
}
