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
          className="group rounded-2xl border border-black/10 p-6 transition hover:border-foreground dark:border-white/15"
        >
          <h2 className="font-medium">fincai →</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t("products.fincai")}
          </p>
        </a>
        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/15">
          <h2 className="font-medium text-zinc-400">
            replo ({t("comingSoon")})
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t("products.replo")}
          </p>
        </div>
      </div>
    </DetailPage>
  );
}
