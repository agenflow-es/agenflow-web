import { useTranslations } from "next-intl";

type LegalNamespace = "privacy" | "legalNotice" | "cookies";

export function LegalDoc({ namespace }: { namespace: LegalNamespace }) {
  const t = useTranslations("legal");
  const sections = t.raw(`${namespace}.sections`) as string[];

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        {t(`${namespace}.title`)}
      </h1>
      <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
        {t("draftNotice")}
      </p>
      <p className="mt-6 text-zinc-600 dark:text-zinc-400">
        {t(`${namespace}.intro`)}
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-xl font-medium">{s}</h2>
            <p className="mt-2 text-sm text-zinc-500">{t("pendingContent")}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-black/10 p-6 text-sm dark:border-white/15">
        <div className="font-medium">{t("company.label")}</div>
        <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>{t("company.name")}</li>
          <li>{t("company.taxId")}</li>
          <li>{t("company.address")}</li>
          <li>{t("company.email")}</li>
        </ul>
      </div>
    </section>
  );
}
