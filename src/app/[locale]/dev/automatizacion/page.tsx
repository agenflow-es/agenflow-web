import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { AutomationLoop } from "@/components/visuals/AutomationLoop";
import { IntegrationsOrbit } from "@/components/visuals/IntegrationsOrbit";

// Dev-only: SEO landing for "automatización de procesos". Partial build (hero +
// two showcase sections) to validate the premium components before finishing.
export const metadata: Metadata = {
  title: "Dev · Automatización (preview)",
  robots: { index: false, follow: false },
};

const H2 =
  "font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg text-balance";

export default async function DevAutomatizacionPage({
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
        eyebrow="Automatización de procesos"
        title={
          <>
            <span className="text-fg-muted">Automatización de procesos:</span>
            <br />
            adiós al trabajo manual.
          </>
        }
        subtitle="Conectamos las herramientas que ya usas para que las tareas repetitivas —facturas, datos, seguimientos, informes— se hagan solas. Tu equipo deja de copiar, pegar y perseguir tareas."
        primary={{ label: "Cuéntanos tu caso", href: "/contacto?subject=automatizacion" }}
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
                Lo que tu equipo hace a mano cada día —leer facturas, mover datos
                entre sistemas, perseguir seguimientos, montar informes— lo hace
                el sistema en segundo plano. Sin errores y sin que nadie tenga que
                estar encima.
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
                Trabajamos encima de tu CRM, tu ERP y tus hojas de cálculo. La IA
                se monta sobre lo que tu equipo ya domina —y, si falta una pieza,
                la construimos.
              </p>
            </Reveal>

            <Reveal className="md:col-span-7">
              <IntegrationsOrbit />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
