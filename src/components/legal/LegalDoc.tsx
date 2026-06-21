import { useTranslations } from "next-intl";

type LegalNamespace = "privacy" | "legalNotice" | "cookies";
type Table = { headers: string[]; rows: string[][] };
type Section = { heading: string; body: string[]; table?: Table };

export function LegalDoc({ namespace }: { namespace: LegalNamespace }) {
  const t = useTranslations("legal");
  const sections = t.raw(`${namespace}.sections`) as Section[];

  return (
    <section className="mx-auto max-w-3xl px-[clamp(20px,5vw,48px)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t(`${namespace}.title`)}
      </h1>
      <p className="mt-3 font-label text-[12.5px] uppercase tracking-[0.1em] text-fg-faint">
        {t("lastUpdated")}
      </p>
      <p className="mt-6 leading-[1.6] text-fg-muted">
        {t(`${namespace}.intro`)}
      </p>

      {/* Owner / controller */}
      <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-sm">
        <div className="font-label text-[12px] uppercase tracking-[0.1em] text-accent">
          {t("company.label")}
        </div>
        <p className="mt-2 leading-[1.55] text-fg-muted">{t("company.brandNote")}</p>
        <ul className="mt-3 space-y-1 text-fg-muted">
          <li className="font-semibold text-fg">{t("company.name")}</li>
          <li>
            {t("company.taxIdLabel")}: {t("company.taxId")}
          </li>
          <li>
            {t("company.addressLabel")}: {t("company.address")}
          </li>
          <li>
            {t("company.emailLabel")}:{" "}
            <a
              href={`mailto:${t("company.email")}`}
              className="text-accent transition hover:underline"
            >
              {t("company.email")}
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-10 space-y-9">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
            {s.body.map((p, j) => (
              <p key={j} className="mt-2.5 leading-[1.65] text-fg-muted">
                {p}
              </p>
            ))}
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] border border-border">
                <table className="w-full border-collapse text-left text-[13.5px]">
                  <thead>
                    <tr className="bg-surface">
                      {s.table.headers.map((h, k) => (
                        <th
                          key={k}
                          className="border-b border-border px-3.5 py-2.5 font-semibold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row, r) => (
                      <tr key={r} className="align-top">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border-t border-border px-3.5 py-2.5 text-fg-muted"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
