import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { ConsultoriaContent } from "@/components/sections/ConsultoriaContent";
import { FaqList } from "@/components/layout/FaqList";

// Dev-only: the paid consultation page (Línea B) — funnel step 1 + SEO landing.
// Full page in preview before wiring to i18n + the real /consultoria route.
export const metadata: Metadata = {
  title: "Consultoría de IA y automatización para pymes | Agenflow",
  description:
    "Una sesión para entender tu negocio por dentro y salir con un plan claro: qué automatizar, dónde suma la IA y con qué retorno.",
};

const CONTACT_HREF = "/contacto?reason=consultoria&subject=consultoria";

const FAQ = [
  {
    q: "¿Cuánto cuesta?",
    a: "No publicamos precio aquí porque depende del alcance de tu caso. Te lo decimos claro antes de reservar, sin sorpresas —y si luego construimos juntos, se descuenta de tu proyecto.",
  },
  {
    q: "¿Con quién trabajo?",
    a: "Con quien construye, no con un comercial. Quien se sienta contigo en la consultoría es quien después lo ejecuta.",
  },
  {
    q: "¿Tengo que seguir con vosotros después?",
    a: "No hay permanencia: si sigues con nosotros, es porque quieres, no porque estés atado.",
  },
  {
    q: "¿Cuánto dura?",
    a: "Lo que haga falta para hacerlo bien. Sin reloj de 30 minutos.",
  },
  {
    q: "¿Necesito saber de IA o tener algo montado?",
    a: "No. Partimos de tu negocio, no de la tecnología.",
  },
];

export default async function DevConsultoriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="Consultoría de IA"
        title={
          <>
            <span className="text-fg-muted">El punto de partida:</span>
            <br />
            entender tu negocio por dentro.
          </>
        }
        subtitle="Nos sentamos a mirar tu negocio por dentro —dónde pierdes tiempo y dónde la IA suma de verdad— y salimos con las cosas claras."
        primary={{ label: "Reserva tu consultoría", href: CONTACT_HREF }}
        proof="Análisis completo · Plan en menos de 24 h · Sin compromiso de seguir"
      />

      <ConsultoriaContent />

      <FaqList title="Preguntas frecuentes" items={FAQ} />

      {/* Closing — one statement, one CTA */}
      <section className="border-t border-border bg-surface py-[clamp(80px,13vw,168px)]">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-[20ch] font-display text-[clamp(28px,4.6vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
              Déjanos entender tu negocio por dentro.
            </p>
            <div className="mt-10">
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                Reserva tu consultoría <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-6 font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
              Análisis completo · Plan en menos de 24 h · Sin compromiso de seguir
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
