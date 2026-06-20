import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";

type Item = { name: string; desc: string; href: string };

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesHub");
  const ts = await getTranslations("services");
  const items = ts.raw("items") as Item[];

  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-[1.6] text-fg-muted">
        {t("subtitle")}
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-accent"
          >
            <h2 className="font-display text-lg font-semibold">{item.name}</h2>
            <p className="mt-2 text-sm leading-[1.55] text-fg-muted">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-fg-faint">
        {ts("complementary")}{" "}
        <Link
          href="/servicios/presencia-online"
          className="text-accent underline underline-offset-4"
        >
          {ts("complementaryCta")}
        </Link>
      </p>
    </Container>
  );
}
