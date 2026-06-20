import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{t("body")}</p>
    </section>
  );
}
