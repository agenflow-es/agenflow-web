import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ServiceItem = { name: string; desc: string; href: string };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
        <Link
          href="/servicios"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("cta")}
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group rounded-2xl border border-black/10 p-6 transition hover:border-foreground dark:border-white/15"
          >
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-500">
        {t("complementary")}{" "}
        <Link
          href="/servicios/presencia-online"
          className="underline underline-offset-4"
        >
          {t("complementaryCta")}
        </Link>
      </p>
    </section>
  );
}
