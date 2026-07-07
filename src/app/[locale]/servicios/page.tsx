import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { ServicesOverview } from "@/components/sections/ServicesOverview";

// The services overview page (Línea B): a tabbed navigator across the four
// services, each linking to its dedicated landing.
export const metadata: Metadata = {
  title: "Servicios de automatización e IA para pymes | Agenflow",
  description:
    "Consultoría, automatización de procesos, software a medida y mejora de presencia online. Empiezas por el servicio que tu negocio necesita hoy.",
};

export default async function DevServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero — clean, no blueprint */}
      <HeroLineaB
        eyebrow="Servicios"
        title={
          <>
            <span className="text-fg-muted">Menos operativa,</span>
            <br />
            más negocio.
          </>
        }
        subtitle="Entendemos qué te frena y construimos el sistema que lo resuelve, para que crezcas con el mismo equipo."
        primary={{ label: "Cuéntanos tu caso", href: "/contacto" }}
        proof="Consultoría · Automatización · Software a medida · Presencia online"
      />

      {/* Services — indexed spec list (4 services) */}
      <ServicesOverview />

      {/* Closing — honest bridge + one CTA, in a single band */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[24ch] font-display text-[clamp(26px,4.4vw,46px)] font-semibold leading-[1.14] tracking-[-0.02em]">
              <span className="text-fg-muted">Cada mes que lo dejas pasar,</span>
              <br />
              <span className="text-fg">
                tu competencia ya lo está automatizando.
              </span>
            </p>

            <div className="mt-10">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                Reserva tu consultoría <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-6 font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
              Una sesión · Sales con un plan, no con un compromiso
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
