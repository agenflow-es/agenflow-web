import { useTranslations } from "next-intl";

type ProcessItem = { name: string; desc: string };

export function Process() {
  const t = useTranslations("process");
  const items = t.raw("items") as ProcessItem[];

  return (
    <section id="process" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-2xl border border-black/10 p-6 dark:border-white/15"
          >
            <div className="font-mono text-sm text-zinc-400">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-2 font-medium">{item.name}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
