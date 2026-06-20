import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type SectorItem = { name: string; desc: string; href: string };

export function Sectors() {
  const t = useTranslations("sectors");
  const items = t.raw("items") as SectorItem[];

  return (
    <section id="sectors" className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
        <Link
          href="/sectores"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("cta")}
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group rounded-2xl border border-black/10 p-8 transition hover:border-foreground dark:border-white/15"
          >
            <h3 className="text-xl font-medium">{item.name}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.desc}
            </p>
            <span className="mt-4 inline-block text-sm font-medium transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
