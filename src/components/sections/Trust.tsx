import { useTranslations } from "next-intl";

export function Trust() {
  const t = useTranslations("trust");

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-3xl border border-black/10 p-10 text-center dark:border-white/15">
        <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {t("body")}
        </p>
        {/* Placeholder: logos / métricas / testimonios cuando haya volumen */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <span>fincai</span>
          <span>replo</span>
          <span>Despacho partner</span>
        </div>
      </div>
    </section>
  );
}
