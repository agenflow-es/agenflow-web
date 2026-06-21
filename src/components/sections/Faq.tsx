import { useTranslations } from "next-intl";
import { FaqList } from "@/components/layout/FaqList";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  return (
    <FaqList variant="home" title={t("title")} items={t.raw("items") as Item[]} />
  );
}
