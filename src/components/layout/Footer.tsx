import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="mt-20 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2">
        <div>
          <div className="font-semibold">Agenflow</div>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">{t("tagline")}</p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm text-zinc-500">
          <Link href="/servicios">{nav("services")}</Link>
          <Link href="/sectores">{nav("sectors")}</Link>
          <Link href="/precios">{nav("pricing")}</Link>
          <Link href="/nosotros">{nav("about")}</Link>
          <Link href="/contacto">{nav("contact")}</Link>
          <Link href="/aviso-legal">{t("legalNotice")}</Link>
          <Link href="/privacidad">{t("privacy")}</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-8 text-xs text-zinc-400">
        © 2026 Agenflow. {t("rights")}
      </div>
    </footer>
  );
}
