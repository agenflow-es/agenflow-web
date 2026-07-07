import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  LayoutTemplate,
  Search,
  Bot,
  Zap,
  ClipboardList,
  Database,
  BellRing,
  MessagesSquare,
  CircleCheckBig,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { AiVisibilityCheck } from "@/components/ai/AiVisibilityCheck";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SystemFlow, type FlowStage } from "@/components/visuals/SystemFlow";
import { FaqList } from "@/components/layout/FaqList";

// Dev-only: SEO landing for "mejora de presencia online" (Línea B), refocused
// from presencia-online. Same template as the other service landings but its
// signature pieces are (1) the live AI-visibility widget and (2) the
// differentiator section — a web wired to the business via automations. The
// "cómo trabajamos" is a light timeline (not a third scroll-pinned reveal).
// Preview before wiring to i18n + the real /servicios route.
export const metadata: Metadata = {
  title: "Mejora de presencia online | Agenflow",
  description:
    "Reconstruimos tu web para que te encuentren en Google y en ChatGPT, y la conectamos con tu negocio para que cada visita trabaje para ti.",
};

const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

const CONTACT_HREF = "/contacto?subject=presencia";

const BUILD = [
  {
    icon: LayoutTemplate,
    title: "Rediseño completo",
    body: "Estructura, contenido y diseño desde cero, pensados para convertir, no solo para verse bien.",
  },
  {
    icon: Search,
    title: "Visible en Google",
    body: "La base de SEO técnico bien hecha: rápida, ordenada y fácil de rastrear.",
  },
  {
    icon: Bot,
    title: "Visible en la IA",
    body: "Preparada para que ChatGPT y otros asistentes te encuentren, te entiendan y te recomienden.",
  },
  {
    icon: Zap,
    title: "Rápida y cuidada",
    body: "Carga veloz y una base técnica sólida que aguanta y es fácil de mantener.",
  },
];

// The differentiator: a form on the web triggers a real business automation.
const WIRED: FlowStage[] = [
  { kicker: "En la web", text: "Un cliente rellena un formulario", icon: ClipboardList },
  { kicker: "Entra", text: "El lead cae en tu sistema, sin copiar nada", icon: Database },
  { kicker: "Avisa", text: "Se avisa a quien tiene que atenderlo", icon: BellRing },
  { kicker: "Responde", text: "Se le contesta al instante", icon: MessagesSquare },
  { kicker: "En marcha", text: "Y el seguimiento arranca solo", icon: CircleCheckBig },
];

const FAQ = [
  {
    q: "¿Esto no es el SEO de siempre?",
    a: "El SEO es la mitad. Además preparamos tu web para que la IA (ChatGPT, Perplexity…) te encuentre y te cite; hoy mucha gente decide justo ahí.",
  },
  {
    q: "¿Solo hacéis la web, o también la conectáis con mi negocio?",
    a: "Las dos cosas, y ahí está la diferencia: además de construirla, la enlazamos con tus automatizaciones y herramientas para que trabaje de verdad, no solo para que se vea bien.",
  },
  {
    q: "¿Se puede garantizar que la IA me recomiende?",
    a: "Nadie serio te lo garantiza. Lo que hacemos es ponerlo todo a tu favor y medir los resultados.",
  },
  {
    q: "Mi web es bastante nueva, ¿me sirve?",
    a: "La revisamos igual: muchas webs modernas siguen sin estar preparadas para cómo se busca hoy. Si está bien, te lo decimos.",
  },
  {
    q: "¿Cuánto cuesta o cuánto tarda?",
    a: "Depende del alcance; te lo decimos claro antes de empezar, sin precio de catálogo.",
  },
];

export default async function DevPresenciaOnlinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="Presencia online"
        title={
          <>
            <span className="text-fg-muted">Ya no te buscan solo en Google.</span>
            <br />
            Ahora se lo preguntan a la IA.
          </>
        }
        subtitle="Reconstruimos tu presencia online para el mundo de hoy: que te encuentren en Google y en ChatGPT, y que tu web esté conectada con tu negocio para que cada visita trabaje para ti."
        primary={{ label: "Cuéntanos tu caso", href: CONTACT_HREF }}
        proof="Web rehecha · Visible donde se busca · Conectada a tu negocio"
      />

      {/* Compruébalo — the live AI-visibility widget (concentrates the "IA" idea) */}
      <section className="border-b border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <div className="grid items-center gap-x-14 gap-y-10 md:grid-cols-2">
            <Reveal>
              <Eyebrow>Compruébalo</Eyebrow>
              <h2 className={`mt-4 max-w-[18ch] ${H2}`}>
                ¿Qué dice la IA de tu negocio ahora mismo?
              </h2>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-fg-muted">
                Escribe tu negocio y pregúntaselo. Si la IA no te conoce —o
                cuenta algo que no es—, tus clientes están viendo exactamente
                eso.
              </p>
            </Reveal>

            <Reveal>
              <AiVisibilityCheck />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Qué construimos — what the new web includes (rich cards) */}
      <section className="bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Qué construimos</Eyebrow>
            <h2 className={`mx-auto mt-4 max-w-[20ch] ${H2}`}>
              Una web hecha para cómo se busca hoy.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {BUILD.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <FeatureCard icon={c.icon} title={c.title} className="h-full">
                  {c.body}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Diferencial — a web wired to the business (form → automation) */}
      <section className="border-y border-border bg-surface py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal className="mx-auto max-w-[720px] text-center">
            <Eyebrow>Nuestro diferencial</Eyebrow>
            <h2 className={`mx-auto mt-4 max-w-[18ch] ${H2}`}>
              Tu web, enchufada a tu negocio.
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] text-[16px] leading-relaxed text-fg-muted">
              La mayoría de webs solo informan. La tuya, además, hace: la
              conectamos con las automatizaciones de tu negocio para que cada
              acción dispare algo útil. Alguien rellena un formulario y no acaba
              en un correo olvidado.
            </p>
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <SystemFlow stages={WIRED} />
            </Reveal>
          </div>

          <Reveal className="mt-12 text-center">
            <p className="mx-auto max-w-[30ch] font-display text-[clamp(19px,2.4vw,26px)] font-semibold leading-snug text-fg">
              De una visita a un cliente atendido, sin que nadie mueva un dedo.
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqList title="Sobre tu presencia online" items={FAQ} />

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[22ch] font-display text-[clamp(28px,4.6vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Tu web no es un folleto. Es la puerta de entrada a tu negocio.
            </p>
            <div className="mt-10">
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                Cuéntanos tu caso <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-6 font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
              Web rehecha · Visible donde se busca · Conectada a tu negocio
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
