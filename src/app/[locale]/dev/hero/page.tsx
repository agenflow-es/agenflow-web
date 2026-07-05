import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { HeroLineaB } from "@/components/sections/HeroLineaB";

// Dev-only: compare hero headline directions side by side. Never indexed.
export const metadata: Metadata = {
  title: "Dev · Hero — variantes",
  robots: { index: false, follow: false },
};

function VariantLabel({ children }: { children: ReactNode }) {
  return (
    <div className="border-y border-border bg-surface px-6 py-3 font-label text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
      {children}
    </div>
  );
}

const PROOF = "Consultoría · Automatización · Software por sector";
const CTAS = {
  primary: { label: "Cuéntanos tu caso", href: "#" },
  secondary: { label: "Ver cómo trabajamos", href: "#" },
};

export default async function DevHeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <VariantLabel>Variante A — hablar vs. hacer</VariantLabel>
      <HeroLineaB
        eyebrow="Automatización e IA para pymes"
        title={
          <>
            <span className="text-fg-muted">No hablamos de IA.</span>{" "}
            La ponemos a funcionar en tu negocio.
          </>
        }
        subtitle="Automatizamos el trabajo manual que te frena —facturas, datos, informes, seguimientos— para que crezcas con el mismo equipo. Convertimos procesos lentos en capacidad para crecer."
        primary={CTAS.primary}
        secondary={CTAS.secondary}
        proof={PROOF}
      />

      <VariantLabel>Variante B — tecnología vs. alivio real</VariantLabel>
      <HeroLineaB
        eyebrow="Automatización e IA para pymes"
        title={
          <>
            <span className="text-fg-muted">No te vendemos tecnología.</span>{" "}
            Te quitamos el trabajo que te frena.
          </>
        }
        subtitle="Automatización e IA en tu operativa —facturas, datos, informes, seguimientos— para que tu equipo dedique el tiempo a hacer crecer el negocio."
        primary={CTAS.primary}
        secondary={CTAS.secondary}
        proof={PROOF}
      />
    </div>
  );
}
