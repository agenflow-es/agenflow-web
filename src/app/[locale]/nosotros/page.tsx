import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        {t("intro")}
      </p>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{t("body")}</p>
      <div className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/15">
        <h2 className="font-medium">{t("expertTitle")}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t("expertBody")}
        </p>
      </div>
      <Link
        href="/contacto"
        className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 font-medium text-background"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
