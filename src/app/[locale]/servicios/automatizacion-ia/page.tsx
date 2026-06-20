import { getTranslations, setRequestLocale } from "next-intl/server";
import { DetailPage } from "@/components/layout/DetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicePages.automatizacion");

  return (
    <DetailPage
      title={t("title")}
      intro={t("intro")}
      points={t.raw("points") as string[]}
      cta={t("cta")}
    />
  );
}
