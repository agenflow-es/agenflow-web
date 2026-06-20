import { getTranslations, setRequestLocale } from "next-intl/server";
import { DetailPage } from "@/components/layout/DetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sectorPages.realEstate");

  return (
    <DetailPage title={t("title")} intro={t("intro")} cta={t("cta")}>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="https://fincai.es"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition hover:border-accent"
        >
          <h2 className="font-display font-semibold">fincai →</h2>
          <p className="mt-2 text-sm leading-[1.55] text-fg-muted">
            {t("products.fincai")}
          </p>
        </a>
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <h2 className="font-display font-semibold text-fg-faint">
            replo ({t("comingSoon")})
          </h2>
          <p className="mt-2 text-sm leading-[1.55] text-fg-muted">
            {t("products.replo")}
          </p>
        </div>
      </div>
    </DetailPage>
  );
}
