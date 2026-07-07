import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { RoiEstimator } from "@/components/roi/RoiEstimator";

// Dev-only: the Recursos ROI calculator brought to Línea B (clean hero, richer
// result). Preview before wiring to i18n + the real /recursos/calculadora-roi
// route (which still uses the old PageHero + RoiCalculator).
export const metadata: Metadata = {
  title: "Dev · Calculadora ROI (preview)",
  robots: { index: false, follow: false },
};

const CONTACT_HREF = "/contacto?subject=automatizacion";

export default async function DevCalculadoraRoiPage({
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
        eyebrow="Calculadora de ROI"
        title={
          <>
            <span className="text-fg-muted">El trabajo manual también cuesta dinero.</span>
            <br />
            Calcula cuánto recuperas.
          </>
        }
        subtitle="Pon los números de tu equipo y mira, en un minuto, cuánto tiempo y dinero recuperas al año al automatizar lo repetitivo —y cuánta capacidad de crecer te da eso."
        primary={{ label: "Calcular mi ahorro", href: "#calculadora" }}
        proof="Con tus propios números · Sin registro · Orientativo"
      />

      <section
        id="calculadora"
        className="border-b border-border bg-bg py-[clamp(56px,9vw,110px)]"
      >
        <Container className="max-w-[960px]">
          <Reveal>
            <RoiEstimator />
          </Reveal>
        </Container>
      </section>

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(72px,12vw,150px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[22ch] font-display text-[clamp(26px,4.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Esas horas no vuelven. Pero puedes dejar de perderlas.
            </p>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
              En la consultoría te decimos qué automatizar primero para
              conseguirlo, con un plan claro y el retorno delante.
            </p>
            <div className="mt-9">
              <Link
                href={CONTACT_HREF}
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
