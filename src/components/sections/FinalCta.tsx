import { useTranslations } from "next-intl";
import { CtaSection } from "@/components/layout/CtaSection";

export function FinalCta() {
  const t = useTranslations("finalCta");
  return (
    <CtaSection
      variant="home"
      title={t("title")}
      subtitle={t("subtitle")}
      cta={t("cta")}
      href="/contacto?reason=consultoria"
    />
  );
}
