import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Package = { name: string; desc: string; cta: string };

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricingPage");
  const packages = t.raw("packages") as Package[];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {t("subtitle")}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {packages.map((p, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-black/10 p-8 dark:border-white/15"
          >
            <h2 className="text-xl font-medium">{p.name}</h2>
            <p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
              {p.desc}
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-block self-start rounded-full border border-foreground px-5 py-2.5 text-sm font-medium"
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-zinc-500">{t("note")}</p>
    </section>
  );
}
