import { useTranslations } from "next-intl";

type LegalNamespace = "privacy" | "legalNotice" | "cookies";

export function LegalDoc({ namespace }: { namespace: LegalNamespace }) {
  const t = useTranslations("legal");
  const sections = t.raw(`${namespace}.sections`) as string[];

  return (
    <section className="mx-auto max-w-3xl px-[clamp(20px,5vw,48px)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t(`${namespace}.title`)}
      </h1>
      <p className="mt-4 rounded-[var(--radius)] border border-border bg-[var(--accent-soft)] px-4 py-3 text-sm text-accent">
        {t("draftNotice")}
      </p>
      <p className="mt-6 leading-[1.6] text-fg-muted">
        {t(`${namespace}.intro`)}
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="font-display text-xl font-semibold">{s}</h2>
            <p className="mt-2 text-sm text-fg-faint">{t("pendingContent")}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-sm">
        <div className="font-semibold">{t("company.label")}</div>
        <ul className="mt-2 space-y-1 text-fg-muted">
          <li>{t("company.name")}</li>
          <li>{t("company.taxId")}</li>
          <li>{t("company.address")}</li>
          <li>{t("company.email")}</li>
        </ul>
      </div>
    </section>
  );
}
