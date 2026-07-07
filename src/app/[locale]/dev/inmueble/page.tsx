import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Building2, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FaqList } from "@/components/layout/FaqList";

// Dev-only: the vertical flagship — "el mundo del inmueble" (Línea B). Sells
// results, shows depth per sub-vertical (real substance reused from the old
// sector page, refreshed), and lands on the real proof Nexoo lacks: Replo +
// FincAI (via ProductShowcase). Installers is the next vertical, shown as
// "próximamente" without revealing the (top-secret) product. Preview before
// wiring to i18n + the real /inmueble route.
export const metadata: Metadata = {
  title: "Dev · Inmueble (preview)",
  robots: { index: false, follow: false },
};

const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

const CONTACT_HREF = "/contacto?subject=inmueble";

const SCENES = [
  "Un cliente te escribe y, para cuando alguien le contesta, ya está hablando con otra agencia.",
  "Llamadas, visitas y WhatsApps que no hay forma de seguir a mano.",
  "Comunidades con incidencias, documentación y juntas que te comen el día.",
  "Cada día se te escapan ventas, solo porque no llegas a tiempo.",
];

type Fix = { pain: string; fix: string };

const INMOBILIARIAS: Fix[] = [
  {
    pain: "Un lead te espera horas y se va con la agencia que responde antes.",
    fix: "Un agente de WhatsApp y voz le contesta al instante, a cualquier hora, y le agenda la visita.",
  },
  {
    pain: "Los contactos de Idealista, Fotocasa, la web y el teléfono se te pierden entre todos.",
    fix: "Una bandeja los reúne en un sitio y les hace seguimiento, sin que se te cuele ninguno.",
  },
  {
    pain: "Visitas, llamadas y recordatorios que no hay quien cuadre a mano.",
    fix: "Agenda y seguimiento automáticos: recuerda, confirma y avisa por ti.",
  },
];

const FINCAS: Fix[] = [
  {
    pain: "Cada incidencia de una comunidad se te convierte en un email, una llamada y un papel suelto.",
    fix: "La IA la registra, la clasifica y la sigue hasta cerrarla.",
  },
  {
    pain: "Encontrar un documento o preparar una junta te lleva la mañana entera.",
    fix: "Tienes la documentación de cada comunidad ordenada y a mano: la consultas preguntando en lenguaje natural.",
  },
  {
    pain: "Contestas a los vecinos lo mismo cien veces.",
    fix: "Responde solo por ti a las dudas frecuentes, con la información correcta de su comunidad.",
  },
];

const FAQ = [
  {
    q: "El agente que contesta a mis clientes, ¿se nota que es una IA?",
    a: "Contesta de forma natural y con la información correcta, y eres tú quien marca hasta dónde llega. En cuanto algo pide trato humano, te lo pasa al momento para que entres tú.",
  },
  {
    q: "¿Se conecta con las herramientas que ya uso?",
    a: "Sí. Se monta sobre tu CRM, tus portales (Idealista, Fotocasa…) y tu WhatsApp, y reúne los canales en un sitio para que no cambies tu forma de trabajar.",
  },
  {
    q: "¿Están seguros los datos de mis clientes?",
    a: "Sí. Trabajamos con RGPD por diseño e infraestructura en la UE; tu información es tuya, no se usa para entrenar modelos ni sale de tu control.",
  },
  {
    q: "Somos pocos, ¿esto es para mí?",
    a: "Sobre todo para ti. Cuando sois pocos, cada hora y cada lead pesan más; empiezas por lo que más te aprieta y creces desde ahí, sin meterte en un gran proyecto.",
  },
  {
    q: "¿Tengo que automatizarlo todo de golpe?",
    a: "No. Arrancamos por el punto de más impacto y vamos sumando; ves resultados pronto sin parar tu día a día.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance, y no damos precio de catálogo. Lo concretamos en la consultoría, atado a lo que construimos y al retorno que esperas.",
  },
];

function SubVertical({
  icon: Icon,
  name,
  intro,
  items,
}: {
  icon: LucideIcon;
  name: string;
  intro?: string;
  items: Fix[];
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-[var(--accent-soft)] text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
          </span>
          <h3 className="font-display text-[22px] font-semibold text-fg">
            {name}
          </h3>
        </div>
        {intro && (
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-relaxed text-fg-muted">
            {intro}
          </p>
        )}
      </Reveal>
      <Stagger className="mt-7 grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <StaggerItem key={it.pain}>
            <div className="group h-full rounded-2xl border border-border bg-gradient-to-b from-surface to-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
              <p className="text-[14.5px] leading-relaxed text-fg-muted">
                {it.pain}
              </p>
              <p className="mt-3.5 flex items-start gap-2 text-[15px] font-medium text-fg">
                <span aria-hidden className="mt-px shrink-0 text-accent">
                  →
                </span>
                <span>{it.fix}</span>
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default async function DevInmueblePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="El mundo del inmueble"
        title={
          <>
            <span className="text-fg-muted">Inmobiliaria, instaladores, fincas.</span>
            <br />
            Tu negocio del inmueble, funcionando por dentro.
          </>
        }
        subtitle="Automatizamos e integramos IA en cada eslabón de tu negocio, del primer contacto con el cliente a la gestión de la finca, para que no se te escape ni una oportunidad y llegues a todo con el equipo que ya tienes."
        primary={{ label: "Cuéntanos tu caso", href: CONTACT_HREF }}
        proof="Inmobiliaria · Instaladores · Administración de fincas"
      />

      {/* El día a día — sector-specific pain */}
      <section className="border-b border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container className="max-w-[880px]">
          <Reveal>
            <Eyebrow>El día a día del sector</Eyebrow>
            <h2 className={`mt-4 max-w-[22ch] ${H2}`}>
              El negocio se te va en llegar tarde y en papeleo.
            </h2>
          </Reveal>
          <Stagger className="mt-8 space-y-4">
            {SCENES.map((s) => (
              <StaggerItem key={s}>
                <p className="flex items-start gap-3.5 text-[17px] leading-[1.5] text-fg-muted">
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{s}</span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Eslabón por eslabón — depth per sub-vertical */}
      <section className="border-b border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal>
            <Eyebrow>Eslabón por eslabón</Eyebrow>
            <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
              Sabemos exactamente dónde no llegas a tiempo.
            </h2>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
              Conocemos los atascos de tu día a día en el sector —y construimos
              para quitártelos de en medio.
            </p>
          </Reveal>

          <div className="mt-14 space-y-16">
            <SubVertical
              icon={Building2}
              name="Inmobiliarias"
              intro="Replo se encarga de todo el contacto con tus leads —venta, alquiler o compraventa—: automatiza lo que se puede y te deja solo lo que de verdad pide tu criterio."
              items={INMOBILIARIAS}
            />
            <SubVertical
              icon={Users}
              name="Administración de fincas"
              intro="Toda la gestión de tus comunidades —documentación, incidencias y comunicación— sin que se te vaya el día en papeleo."
              items={FINCAS}
            />

            {/* Instaladores — next vertical, "próximamente" (no product revealed) */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-[var(--accent-soft)] text-accent">
                    <Wrench className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="font-display text-[22px] font-semibold text-fg">
                    Instaladores
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-fg-muted">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Próximamente
                  </span>
                </div>
                <p className="mt-6 max-w-[64ch] text-[16px] leading-relaxed text-fg-muted">
                  Da igual lo que instales: te entran más llamadas y avisos de
                  los que puedes coger, y cada uno que se queda sin respuesta es
                  un trabajo que se lleva otro. Nuestra solución los atiende por
                  ti, resuelve sola lo que puede y te pasa solo lo que necesita
                  una persona.
                </p>
                <Link
                  href={CONTACT_HREF}
                  className="mt-6 inline-flex items-center gap-1.5 font-label text-[12px] uppercase tracking-[0.1em] text-accent transition-transform hover:translate-x-0.5"
                >
                  ¿Eres instalador? Avísame cuando esté <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>

          </div>
        </Container>
      </section>

      {/* Results — the payoff (hours + growth), as a pinned text reveal */}
      <section className="border-b border-border bg-bg">
        <Container>
          <TextReveal
            text={
              "No es solo ahorrar horas: es crecer sin sumar gente.\nTu mismo equipo saca adelante mucho más trabajo, y tu negocio se vuelve mucho más rentable."
            }
            className="mx-auto max-w-[30ch] text-center font-display text-[clamp(24px,4vw,42px)] font-semibold leading-[1.2] tracking-[-0.02em] text-fg"
          />
        </Container>
      </section>

      {/* Producto propio — the real proof (Replo + FincAI) */}
      <ProductShowcase />

      <FaqList title="Preguntas del sector" items={FAQ} />

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[20ch] font-display text-[clamp(28px,4.6vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Conocemos tu sector por dentro. Pongámoslo a trabajar para ti.
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
              Inmobiliaria · Instaladores · Administración de fincas
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
