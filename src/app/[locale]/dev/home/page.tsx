import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { PainBlock } from "@/components/sections/PainBlock";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SystemsInAction } from "@/components/sections/SystemsInAction";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Founder } from "@/components/sections/Founder";
import { ClosingCta } from "@/components/sections/ClosingCta";

// Dev-only: the real home taking shape, section by section, in order.
// Grows as each section is approved. Never indexed.
export const metadata: Metadata = {
  title: "Dev · Home (preview)",
  robots: { index: false, follow: false },
};

export default async function DevHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Section 1 — Hero (direction A, chosen) */}
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
        primary={{ label: "Cuéntanos tu caso", href: "#" }}
        proof="Consultoría · Automatización · Software por sector"
      />

      {/* Section 2 — Pain */}
      <PainBlock />

      {/* Section 3 — How we work (3 steps) */}
      <ProcessSteps />

      {/* Section 4 — Systems in action (2 example flows) */}
      <SystemsInAction />

      {/* Section 5 — Own products (Replo + FincAI) */}
      <ProductShowcase />

      {/* Section 6 — Founder */}
      <Founder />

      {/* Section 7 — Final CTA */}
      <ClosingCta />
    </>
  );
}
