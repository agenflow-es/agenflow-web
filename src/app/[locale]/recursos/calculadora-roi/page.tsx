import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/metadata";
import { RoiCalculator } from "@/components/roi/RoiCalculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    key: "calculadoraRoi",
    path: "/recursos/calculadora-roi",
  });
}

export default async function CalculadoraRoiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("roiPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="border-b border-border">
        <Container className="max-w-[960px] py-[clamp(56px,8vw,110px)]">
          <Reveal>
            <RoiCalculator />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
