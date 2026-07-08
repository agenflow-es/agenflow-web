import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Hammer, Target, Ruler } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { FeatureCard } from "@/components/ui/FeatureCard";

export const metadata: Metadata = {
  title: "Nosotros | Agenflow",
  description:
    "Detrás de Agenflow hay un ingeniero industrial que vivió el problema desde dentro. Llevamos sistemas e IA a las pymes españolas para que produzcan más y sean más robustas.",
};

const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

const PARAGRAPHS = [
  "Agenflow lo funda un ingeniero industrial con más de 6 años de experiencia en construcción y proyectos internacionales de hospitales: obras enormes, con cientos de personas y miles de detalles que tienen que encajar. Ahí se aprende rápido que un proyecto sale adelante —y es rentable— cuando por dentro hay sistemas bien definidos y orquestados.",
  "También se vive el otro lado. Como todos sus compañeros, sufría el mismo problema: jornadas larguísimas, sin tiempo para nada y procesos con un margen de mejora enorme. Mucho esfuerzo invertido en tareas que un buen sistema podía resolver.",
  "La idea de montar algo propio siempre estuvo ahí. Cuando vio lo que la automatización y la inteligencia artificial podían hacer con esos procesos, no se lo pensó: dedicó más de un año a formarse y a aplicarlo en real, hasta fundar Agenflow.",
];

const PRINCIPIOS = [
  {
    icon: Hammer,
    title: "Hablas con quien lo construye",
    body: "Sin intermediarios ni comerciales: quien analiza tu operación es quien diseña y construye la solución, desde el primer día.",
  },
  {
    icon: Target,
    title: "Resultados, no tecnología",
    body: "La IA y la automatización son la herramienta, nunca el titular. Lo que medimos es tiempo recuperado y procesos que dejan de fallar.",
  },
  {
    icon: Ruler,
    title: "Rigor de ingeniería",
    body: "Venimos de proyectos donde un fallo se paga caro. Construimos sistemas simples y robustos, pensados para aguantar cuando tu negocio crece.",
  },
];

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="Nosotros"
        title={<>Nacimos dentro del problema que resolvemos.</>}
        subtitle="Años de ingeniería en proyectos exigentes nos enseñaron una cosa: un negocio es rentable cuando, por dentro, sus sistemas están bien definidos y orquestados. Llevamos esos sistemas —ahora con IA— a las pymes españolas."
        primary={{ label: "Cuéntanos tu caso", href: "/contacto" }}
        proof="Ingeniería · Automatización · IA para pymes"
      />

      {/* El origen — foto + historia + hitos */}
      <section className="border-b border-border bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <div className="grid gap-x-14 gap-y-10 md:grid-cols-[minmax(0,300px)_1fr] md:items-center md:gap-16">
            <Reveal>
              <figure className="m-0">
                <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[var(--radius-lg)] border border-border">
                  <Image
                    src="/equipo/francisco.png"
                    alt="Francisco Javier Arias, fundador de Agenflow"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 300px"
                  />
                </div>
                <figcaption className="mt-3 font-label text-[11px] uppercase tracking-[0.14em] text-accent">
                  Francisco J. Arias · Fundador
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <Eyebrow>El origen</Eyebrow>
              <h2 className={`mt-4 max-w-[20ch] ${H2}`}>
                De la construcción de hospitales a Agenflow.
              </h2>
              <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-fg-muted">
                {PARAGRAPHS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Misión */}
      <section className="border-b border-border bg-surface py-[clamp(64px,10vw,120px)]">
        <Container className="max-w-[860px]">
          <Reveal>
            <Eyebrow>Misión</Eyebrow>
            <blockquote className="m-0 mt-6">
              <p className="font-display text-[clamp(23px,3.4vw,36px)] font-semibold leading-[1.25] tracking-[-0.02em] text-fg text-balance">
                «Mi objetivo con Agenflow es que las pymes españolas sean más
                rentables y más robustas. Integramos inteligencia artificial y
                automatización en tu operación del día a día para que produzcas
                más sin disparar los costes, con procesos que aguantan cuando el
                negocio crece.»
              </p>
            </blockquote>
            <div className="mt-7 font-label text-[12px] uppercase tracking-[0.14em] text-label-adaptive">
              Francisco J. Arias · Fundador
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Qué nos hace distintos — principios de identidad */}
      <section className="bg-bg py-[clamp(64px,10vw,120px)]">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Qué nos hace distintos</Eyebrow>
            <h2 className={`mx-auto mt-4 max-w-[18ch] ${H2}`}>
              Un taller de ingeniería, no una startup de humo.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPIOS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <FeatureCard icon={p.icon} title={p.title} className="h-full">
                  {p.body}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[22ch] font-display text-[clamp(28px,4.6vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Ya sabes quiénes somos. Cuéntanos tú.
            </p>
            <div className="mt-10">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                Cuéntanos tu caso <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
