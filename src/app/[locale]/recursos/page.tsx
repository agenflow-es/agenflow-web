import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { AccentCard } from "@/components/ui/AccentCard";
import { buildMetadata } from "@/lib/metadata";

type Item = { name: string; desc: string; href: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "recursos", path: "/recursos" });
}

export default async function RecursosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resourcesHub");
  const tf = await getTranslations("finalCta");
  const items = t.raw("items") as Item[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {items.map((item, i) => (
                <AccentCard
                  key={i}
                  title={item.name}
                  desc={item.desc}
                  href={item.href}
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title={tf("title")}
        subtitle={tf("subtitle")}
        cta={tf("cta")}
        href="/contacto?reason=consultoria"
      />
    </>
  );
}
