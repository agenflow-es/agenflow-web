import { useTranslations } from "next-intl";

type FaqItem = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
      <div className="mt-8 divide-y divide-black/10 dark:divide-white/10">
        {items.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="cursor-pointer list-none font-medium">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
