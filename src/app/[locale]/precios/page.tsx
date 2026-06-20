import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";

type Item = { name: string; desc: string; cta: string };

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricingPage");
  const items = t.raw("items") as Item[];

  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-[1.6] text-fg-muted">
        {t("subtitle")}
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-7 shadow-[var(--shadow)]"
          >
            <h2 className="font-display text-xl font-semibold">{p.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-[1.55] text-fg-muted">
              {p.desc}
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex w-fit items-center rounded-[var(--radius)] border border-border-strong px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent"
            >
              {p.cta} →
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-fg-faint">{t("note")}</p>
    </Container>
  );
}
