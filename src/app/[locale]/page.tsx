import { setRequestLocale } from "next-intl/server";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { PainBlock } from "@/components/sections/PainBlock";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SystemsInAction } from "@/components/sections/SystemsInAction";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Founder } from "@/components/sections/Founder";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroLineaB
        eyebrow="Automatización e IA para pymes"
        title={
          <>
            <span className="text-fg-muted">No hablamos de IA.</span>
            <br />
            La ponemos a funcionar en tu negocio.
          </>
        }
        subtitle="Automatizamos el trabajo manual que te frena —facturas, datos, informes, seguimientos— para que crezcas con el mismo equipo. Convertimos procesos lentos en capacidad para crecer."
        primary={{ label: "Cuéntanos tu caso", href: "/contacto" }}
        proof="Consultoría · Automatización · Software a medida"
      />

      <PainBlock />
      <ProcessSteps />
      <SystemsInAction />
      <ProductShowcase />
      <Founder />
      <ClosingCta />
    </>
  );
}
