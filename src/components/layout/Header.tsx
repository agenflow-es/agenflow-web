import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Agenflow
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/servicios">{t("services")}</Link>
          <Link href="/sectores">{t("sectors")}</Link>
          <Link href="/precios">{t("pricing")}</Link>
          <Link href="/nosotros">{t("about")}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
