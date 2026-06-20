import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {t("subtitle")}
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/contacto"
          className="rounded-full bg-foreground px-6 py-3 font-medium text-background"
        >
          {t("ctaPrimary")}
        </Link>
        <Link
          href="/#services"
          className="rounded-full border border-black/10 px-6 py-3 font-medium dark:border-white/15"
        >
          {t("ctaSecondary")}
        </Link>
      </div>
    </section>
  );
}
