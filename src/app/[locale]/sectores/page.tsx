import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";

type Item = { name: string; desc: string; href: string };

export default async function SectoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sectorsHub");
  const tsec = await getTranslations("sectors");
  const items = tsec.raw("items") as Item[];

  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-[1.6] text-fg-muted">
        {t("subtitle")}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group rounded-[var(--radius-lg)] border border-border bg-surface p-8 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-accent"
          >
            <h2 className="font-display text-xl font-semibold">{item.name}</h2>
            <p className="mt-2 leading-[1.55] text-fg-muted">{item.desc}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
