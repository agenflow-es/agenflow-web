import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { AutomationLoop } from "@/components/visuals/AutomationLoop";
import { IntegrationsOrbit } from "@/components/visuals/IntegrationsOrbit";
import { StepScrollReveal } from "@/components/motion/StepScrollReveal";
import { SavingsEstimator } from "@/components/visuals/SavingsEstimator";
import { FaqList } from "@/components/layout/FaqList";

// Dev-only: SEO landing for "automatización de procesos" (Línea B). Full page in
// preview before wiring to i18n + the real /servicios/automatizacion-ia route.
export const metadata: Metadata = {
  title: "Automatización de procesos para pymes | Agenflow",
  description:
    "Adiós al trabajo manual. Automatizamos las tareas repetitivas sobre las herramientas que ya usas, para que tu equipo llegue a todo.",
};

const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

const CONTACT_HREF = "/contacto?subject=automatizacion";

const STEPS = [
  {
    n: "01",
    title: "Diseñamos el flujo",
    desc: "Mapeamos el proceso de principio a fin y dibujamos la automatización, con sus reglas y sus excepciones.",
  },
  {
    n: "02",
    title: "La construimos",
    desc: "Montamos la automatización y la conectamos con las herramientas que ya usas.",
  },
  {
    n: "03",
    title: "La probamos con datos reales",
    desc: "La ponemos a prueba con datos realistas y ajustamos hasta que funcione sin fallos.",
  },
  {
    n: "04",
    title: "Desplegamos y la mantenemos",
    desc: "La dejamos en marcha, monitorizada, y la ajustamos a medida que tu negocio y la tecnología cambian.",
  },
];

const FAQ = [
  {
    q: "¿Y si la automatización se equivoca?",
    a: "Diseñamos controles: valida sola lo rutinario, levanta la mano cuando algo no encaja y deja todo registrado. No es una caja negra.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "RGPD por diseño, infraestructura en la UE, y tu información no se usa para entrenar modelos ni sale de tu control.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance; te lo decimos claro antes de empezar. En la consultoría vemos qué automatizar y con qué retorno.",
  },
  {
    q: "¿Y si soy pequeño o tengo pocos procesos?",
    a: "Mejor: empezamos por el de más impacto, así ves resultados pronto sin meterte en un gran proyecto.",
  },
  {
    q: "¿Tengo que parar mi operación para implementarlo?",
    a: "No. Lo montamos en paralelo y lo activamos cuando está probado; tu día a día no se detiene.",
  },
];

export default async function DevAutomatizacionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="Automatización de procesos"
        title={
          <>
            <span className="text-fg-muted">Automatización de procesos:</span>
            <br />
            adiós al trabajo manual.
          </>
        }
        subtitle="El sistema ejecuta las tareas repetitivas y tu equipo pasa de hacerlas a supervisarlas —recuperando horas cada semana para dedicarlas a lo que de verdad hace crecer el negocio."
        primary={{ label: "Cuéntanos tu caso", href: CONTACT_HREF }}
        proof="Sobre tu stack actual · Sin cambiar de herramientas · Empiezas por lo que más te aprieta"
      />

      {/* Qué automatizamos — looping task list (inbox #2, adapted) */}
      <section className="border-b border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <div className="grid items-center gap-x-14 gap-y-10 md:grid-cols-2">
            <Reveal className="order-2 md:order-1">
              <div className="mx-auto md:mx-0">
                <AutomationLoop />
              </div>
            </Reveal>
            <Reveal className="order-1 md:order-2">
              <Eyebrow>Qué automatizamos</Eyebrow>
              <h2 className={`mt-4 max-w-[18ch] ${H2}`}>
                Lo que tu equipo deja de hacer a mano.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-fg-muted">
                Lo que tu equipo hace a mano cada día —facturas, datos,
                seguimientos, informes— lo ejecuta el sistema. En vez de teclear
                cada tarea, tu gente solo supervisa el proceso y actúa donde hace
                falta criterio.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Facturas", "Datos", "Seguimientos", "Informes", "Alertas"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-label text-[11.5px] tracking-[0.06em] text-fg-muted"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sobre tu stack — two columns: copy left, orbital right (~60%) */}
      <section className="bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <div className="grid items-center gap-x-14 gap-y-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <Eyebrow>Sobre tu stack</Eyebrow>
              <h2 className={`mt-4 max-w-[16ch] ${H2}`}>
                No cambies de herramientas. Las conectamos.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-fg-muted">
                Se monta encima de tu CRM, tu ERP y tus hojas de cálculo, sin
                migraciones. Lo construimos sencillo para todo tu equipo
                —técnicos y no técnicos—, así que se adopta enseguida y empieza a
                ahorrar tiempo y costes.
              </p>
            </Reveal>

            <Reveal className="md:col-span-7">
              <IntegrationsOrbit />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cómo trabajamos — scroll-pinned reveal: title (slide 0) → 4 steps */}
      <StepScrollReveal
        title="Cómo trabajamos"
        intro="Con tu operativa ya sobre la mesa, empezamos por lo de más impacto y lo construimos en cuatro pasos."
        steps={STEPS}
      />

      {/* El valor — interactive savings estimator */}
      <SavingsEstimator />

      <FaqList title="Preguntas frecuentes" items={FAQ} />

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[20ch] font-display text-[clamp(28px,4.6vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Tu equipo tiene mejores cosas que hacer que copiar y pegar.
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
              Sobre tu stack · Sin cambiar de herramientas · Empiezas por lo que más te aprieta
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
