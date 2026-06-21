import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
  return buildMetadata({ locale, key: "services", path: "/servicios" });
}

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesHub");
  const ts = await getTranslations("services");
  const tf = await getTranslations("finalCta");
  const items = ts.raw("items") as Item[];

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
            <Link
              href="/servicios/presencia-online"
              className="group mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--radius-lg)] border border-border bg-surface px-[26px] py-5 shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:border-accent"
            >
              <span className="font-label text-[13px] font-semibold text-accent">
                +
              </span>
              <span className="min-w-[220px] flex-1 text-[15px] text-fg-muted">
                {ts("complementary")}
              </span>
              <span className="text-[14.5px] font-semibold text-accent">
                {ts("complementaryCta")} →
              </span>
            </Link>
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
