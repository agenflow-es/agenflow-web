import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PricingTeaser() {
  const t = useTranslations("pricing");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-3xl border border-black/10 p-10 text-center dark:border-white/15">
        <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {t("subtitle")}
        </p>
        <Link
          href="/precios"
          className="mt-6 inline-block rounded-full border border-foreground px-6 py-3 font-medium"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
