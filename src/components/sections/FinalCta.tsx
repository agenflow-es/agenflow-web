import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {t("subtitle")}
      </p>
      <Link
        href="/contacto"
        className="mt-8 inline-block rounded-full bg-foreground px-8 py-3 font-medium text-background"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
