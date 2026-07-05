import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { ServicesOverview } from "@/components/sections/ServicesOverview";

// Dev-only: the single services page (Línea B). Full page in preview before
// wiring to i18n + the real /servicios route. Never indexed.
export const metadata: Metadata = {
  title: "Dev · Servicios (preview)",
  robots: { index: false, follow: false },
};

export default async function DevServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero — clean, no blueprint */}
      <HeroLineaB
        eyebrow="Servicios"
        title={
          <>
            <span className="text-fg-muted">
              Distintos servicios, un mismo objetivo:
            </span>
            <br />
            que tu negocio funcione mejor por dentro.
          </>
        }
        subtitle="Desde entender qué te frena hasta construir y mantener el sistema que lo resuelve. Esto es lo que hacemos."
        primary={{ label: "Cuéntanos tu caso", href: "#" }}
        proof="Consultoría · Automatización · Software por sector · Presencia online"
      />

      {/* Services — indexed spec list (4 services) */}
      <ServicesOverview />

      {/* Closing — honest bridge + one CTA, in a single band */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[26ch] font-display text-[clamp(26px,4.4vw,46px)] font-semibold leading-[1.14] tracking-[-0.02em]">
              <span className="text-fg-muted">¿No sabes cuál necesitas?</span>{" "}
              <span className="text-fg">
                Nosotros tampoco, hasta que vemos tu negocio por dentro.
              </span>
            </p>

            <div className="mt-10">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                Cuéntanos tu caso <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-6 font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
              Gratis · Sin compromiso · Te respondemos en menos de 24 h
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
