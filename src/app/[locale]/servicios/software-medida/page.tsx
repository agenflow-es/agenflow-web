import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Blocks, PenTool, Sparkles, LayoutDashboard } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { ScaleToSystem } from "@/components/visuals/ScaleToSystem";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StepScrollReveal } from "@/components/motion/StepScrollReveal";
import { FaqList } from "@/components/layout/FaqList";

// Dev-only: SEO landing for "software a medida" (Línea B). Reuses the
// automation skeleton (hero, scroll-pinned phases, FAQ, closing) but with the
// language of bespoke software: the escalation "beyond a couple of automations
// → one system", and a 5-phase build (more steps than automation, to signal a
// bigger project). Preview before wiring to i18n + the real route.
export const metadata: Metadata = {
  title: "Software a medida para tu empresa | Agenflow",
  description:
    "Cuando una automatización no basta: una plataforma dedicada que reúne tus procesos, tus datos y tu IA en un solo sistema hecho para ti.",
};

const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

const CONTACT_HREF = "/contacto?subject=software-medida";

const INCLUDES = [
  {
    icon: Blocks,
    title: "Todo en un sistema",
    body: "Tus automatizaciones, tus datos y tu IA dejan de estar sueltos: viven en una sola plataforma, no en diez pestañas.",
  },
  {
    icon: PenTool,
    title: "Hecho a tu forma de operar",
    body: "No adaptamos tu negocio a un software genérico. Construimos el software sobre cómo trabajas tú.",
  },
  {
    icon: Sparkles,
    title: "IA donde aporta criterio",
    body: "Donde una decisión se repite, el sistema la propone o la resuelve; tu equipo pone el criterio.",
  },
  {
    icon: LayoutDashboard,
    title: "Un panel para dirigir",
    body: "De un vistazo ves cómo va el negocio, sin pedir informes ni cruzar hojas de cálculo.",
  },
];

const PHASES = [
  {
    n: "01",
    title: "Descubrimiento",
    desc: "Nos metemos en cómo trabajas de verdad: procesos, datos, herramientas y las excepciones que no están en ningún manual. De ahí sale qué tiene que hacer tu sistema.",
  },
  {
    n: "02",
    title: "Diseño y arquitectura",
    desc: "Dibujamos el sistema entero antes de programar: qué módulos lleva, cómo fluyen los datos y dónde decide la IA. Acordamos contigo cómo va a funcionar.",
  },
  {
    n: "03",
    title: "Desarrollo por fases",
    desc: "Lo construimos por partes y pones a funcionar la primera pronto. En cada fase, una sesión de avance: ves el progreso y ajustamos sobre la marcha.",
  },
  {
    n: "04",
    title: "Pruebas y puesta en marcha",
    desc: "Lo probamos con tus datos reales, migramos lo que haga falta y acompañamos a tu equipo hasta que el sistema es el sitio donde se trabaja.",
  },
  {
    n: "05",
    title: "Soporte y evolución",
    desc: "Nos quedamos: resolvemos incidencias y añadimos procesos y capacidades a medida que tu negocio crece.",
  },
];

const FAQ = [
  {
    q: "¿Cuándo merece la pena un software a medida frente a uno estándar?",
    a: "Cuando ninguna herramienta del mercado encaja del todo con cómo trabajas y necesitas varios procesos funcionando en un mismo sistema. Un software de catálogo te obliga a trabajar como él; el tuyo se construye sobre cómo trabajas tú.",
  },
  {
    q: "¿Cuánto se tarda en tenerlo?",
    a: "Depende del alcance, pero normalmente entre uno y dos meses. Lo construimos por fases y en cada una tienes una sesión de avance, así que sigues el progreso en todo momento.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende mucho del alcance, y no damos un precio de catálogo: lo concretamos en la consultoría, atado a lo que construimos y al retorno que esperas. Sabrás a qué atenerte antes de empezar.",
  },
  {
    q: "¿El sistema es mío?",
    a: "Sí. Es una plataforma dedicada a tu empresa: el código y los datos son tuyos. No dependes de una suscripción para seguir operando.",
  },
  {
    q: "¿Y si mi negocio cambia?",
    a: "Se amplía. Añadimos procesos y capacidades cuando los necesitas; está pensado para crecer, no para rehacerse.",
  },
  {
    q: "¿Tengo que dejar mis herramientas actuales?",
    a: "Solo las que ya no aporten. La plataforma reúne lo que te sirve y sustituye lo que se queda corto; lo decidimos contigo, sin cambios bruscos.",
  },
];

export default async function DevSoftwareMedidaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="Software a medida"
        title={
          <>
            <span className="text-fg-muted">Software a medida:</span>
            <br />
            un sistema, no diez herramientas.
          </>
        }
        subtitle="Cuando ninguna herramienta del mercado encaja con cómo trabajas, la construimos. Una plataforma dedicada a tu empresa que reúne tus procesos, tus datos y tu IA en un solo sitio —hecha a tu medida, y tuya."
        primary={{ label: "Cuéntanos tu caso", href: CONTACT_HREF }}
        proof="Hecho para tu empresa · Un solo sistema · Crece contigo"
      />

      {/* El salto a medida — one automation → several → a system */}
      <section className="border-b border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <div className="grid items-center gap-x-14 gap-y-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <Eyebrow>El salto a medida</Eyebrow>
              <h2 className={`mt-4 max-w-[16ch] ${H2}`}>
                Cuando una automatización ya no basta.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-fg-muted">
                Automatizar una tarea suelta está muy bien. Pero llega un punto
                en el que no buscas parches, sino un sistema: varios procesos
                trabajando juntos, con tu forma de operar metida dentro. Ahí
                tiene sentido un software a medida —un sistema digital completo,
                con sus automatizaciones y su IA, hecho para cómo trabaja tu
                empresa.
              </p>
            </Reveal>

            <Reveal className="md:col-span-7">
              <ScaleToSystem />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Qué construimos — bespoke platform capabilities (rich cards) */}
      <section className="bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Qué construimos</Eyebrow>
            <h2 className={`mx-auto mt-4 max-w-[20ch] ${H2}`}>
              Un sistema hecho a la medida de tu empresa.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {INCLUDES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <FeatureCard icon={c.icon} title={c.title} className="h-full">
                  {c.body}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Cómo lo construimos — scroll-pinned reveal: title + 5 phases */}
      <StepScrollReveal
        title="Cómo lo construimos"
        intro="Un sistema a medida es un proyecto, no un encargo. Lo construimos por fases —normalmente en uno o dos meses— y en cada una tienes una sesión de avance para ver cómo crece."
        steps={PHASES}
      />

      <FaqList title="Sobre el software a medida" items={FAQ} />

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[22ch] font-display text-[clamp(28px,4.6vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Un software que se adapta a tu empresa, no tu empresa al software.
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
              Hecho para tu empresa · Un solo sistema · Crece contigo
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
