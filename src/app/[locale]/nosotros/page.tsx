import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <Container className="max-w-3xl py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t("title")}
      </h1>
      <p className="mt-6 text-lg leading-[1.6] text-fg-muted">{t("intro")}</p>
      <p className="mt-4 leading-[1.6] text-fg-muted">{t("body")}</p>
      <div className="mt-10 rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)]">
        <h2 className="font-display text-lg font-semibold">{t("expertTitle")}</h2>
        <p className="mt-2 text-sm leading-[1.55] text-fg-muted">
          {t("expertBody")}
        </p>
      </div>
      <Link
        href="/contacto?reason=consultoria"
        className="mt-8 inline-block rounded-[var(--radius)] bg-accent px-6 py-3 font-medium text-accent-fg transition hover:-translate-y-0.5"
      >
        {t("cta")}
      </Link>
    </Container>
  );
}
