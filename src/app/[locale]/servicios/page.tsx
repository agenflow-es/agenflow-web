import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type ServiceItem = { name: string; desc: string; href: string };

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesHub");
  const ts = await getTranslations("services");
  const items = ts.raw("items") as ServiceItem[];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {t("subtitle")}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group rounded-2xl border border-black/10 p-6 transition hover:border-foreground dark:border-white/15"
          >
            <h2 className="text-lg font-medium">{item.name}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-500">
        {ts("complementary")}{" "}
        <Link
          href="/servicios/presencia-online"
          className="underline underline-offset-4"
        >
          {ts("complementaryCta")}
        </Link>
      </p>
    </section>
  );
}
