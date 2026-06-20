import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Logo } from "@/components/ui/primitives";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { siteConfig } from "@/lib/site";

type NavItem = { name: string; href: string };

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mb-2.5 block text-[14.5px] text-fg-muted transition hover:text-fg-hover"
    >
      {children}
    </Link>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 font-label text-[12px] font-medium uppercase tracking-[0.13em] text-accent">
      {children}
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tSectors = useTranslations("sectors");
  const serviceItems = tServices.raw("items") as NavItem[];
  const sectorItems = tSectors.raw("items") as NavItem[];

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="pb-8 pt-[clamp(48px,7vw,80px)]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="min-w-[220px]">
            <div className="mb-4 flex items-center gap-2.5">
              <Logo />
              <span className="font-wordmark text-[21px] font-semibold tracking-[-0.03em]">
                agenflow
              </span>
            </div>
            <p className="max-w-[30ch] text-sm leading-[1.55] text-fg-muted">
              {t("tagline")}
            </p>
          </div>

          <div>
            <ColTitle>{t("groups.services")}</ColTitle>
            {serviceItems.map((l, i) => (
              <FooterLink key={i} href={l.href}>
                {l.name}
              </FooterLink>
            ))}
          </div>

          <div>
            <ColTitle>{t("groups.sectors")}</ColTitle>
            {sectorItems.map((l, i) => (
              <FooterLink key={i} href={l.href}>
                {l.name}
              </FooterLink>
            ))}
          </div>

          <div>
            <ColTitle>{t("groups.company")}</ColTitle>
            <FooterLink href="/nosotros">{nav("about")}</FooterLink>
            <FooterLink href="/precios">{nav("pricing")}</FooterLink>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mb-2.5 block text-[14.5px] text-fg-muted transition hover:text-fg-hover"
            >
              {siteConfig.contactEmail}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14.5px] text-fg-muted transition hover:text-fg-hover"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <span className="text-[13px] text-fg-faint">
            © 2026 Agenflow ·{" "}
            <Link href="/aviso-legal" className="transition hover:text-fg-hover">
              {t("legalNotice")}
            </Link>{" "}
            ·{" "}
            <Link href="/privacidad" className="transition hover:text-fg-hover">
              {t("privacy")}
            </Link>
          </span>
          <LocaleSwitcher />
        </div>
      </Container>
    </footer>
  );
}
