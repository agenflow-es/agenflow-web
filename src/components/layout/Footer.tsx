import { Link } from "@/i18n/navigation";
import { Container, Logo } from "@/components/ui/primitives";
import { siteConfig } from "@/lib/site";
// Spanish-only for now: footer links hardcoded in Spanish, LocaleSwitcher not
// rendered (kept in the codebase to re-enable EN later).

type NavItem = { name: string; href: string };

const SERVICIOS: NavItem[] = [
  { name: "Automatización de procesos", href: "/servicios/automatizacion-ia" },
  { name: "Software a medida", href: "/servicios/software-medida" },
  { name: "Presencia online", href: "/servicios/presencia-online" },
  { name: "Consultoría", href: "/consultoria" },
  { name: "Inmueble", href: "/inmueble" },
];
const RECURSOS: NavItem[] = [
  { name: "Blog", href: "/recursos/blog" },
  { name: "Calculadora de ROI", href: "/recursos/calculadora-roi" },
  { name: "Newsletter", href: "/recursos/newsletter" },
];

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
  return (
    // Footer is always dark, in both themes: data-theme="dark" re-declares the
    // dark tokens for this subtree, so bg/text/border flip regardless of the page theme.
    <footer data-theme="dark" className="border-t border-border bg-surface text-fg">
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
              Convertimos procesos lentos en capacidad para crecer.
            </p>
          </div>

          <div>
            <ColTitle>Servicios</ColTitle>
            {SERVICIOS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.name}
              </FooterLink>
            ))}
          </div>

          <div>
            <ColTitle>Recursos</ColTitle>
            {RECURSOS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.name}
              </FooterLink>
            ))}
          </div>

          <div>
            <ColTitle>Empresa</ColTitle>
            <FooterLink href="/nosotros">Sobre nosotros</FooterLink>
            <FooterLink href="/trabaja-con-nosotros">Trabaja con nosotros</FooterLink>
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
              Aviso legal
            </Link>{" "}
            ·{" "}
            <Link href="/privacidad" className="transition hover:text-fg-hover">
              Privacidad
            </Link>{" "}
            ·{" "}
            <Link href="/cookies" className="transition hover:text-fg-hover">
              Cookies
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
