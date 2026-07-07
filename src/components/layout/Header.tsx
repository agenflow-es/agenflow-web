"use client";

import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container, Logo } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
// Note: the web is Spanish-only for now, so the nav is hardcoded in Spanish and
// the LocaleSwitcher is not rendered (kept in the codebase to re-enable EN later).

type NavItem = { name: string; href: string };

const SERVICIOS: NavItem[] = [
  { name: "Automatización de procesos", href: "/servicios/automatizacion-ia" },
  { name: "Software a medida", href: "/servicios/software-medida" },
  { name: "Presencia online", href: "/servicios/presencia-online" },
  { name: "Ver todos los servicios", href: "/servicios" },
];
const TOP_LINKS: NavItem[] = [
  { name: "Inmueble", href: "/inmueble" },
  { name: "Consultoría", href: "/consultoria" },
];
const RECURSOS: NavItem[] = [
  { name: "Blog", href: "/recursos/blog" },
  { name: "Calculadora de ROI", href: "/recursos/calculadora-roi" },
  { name: "Newsletter", href: "/recursos/newsletter" },
];
const NOSOTROS: NavItem = { name: "Nosotros", href: "/nosotros" };

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  // Close when keyboard focus leaves the whole group (tab-out) so the menu is
  // reachable and dismissible without a mouse.
  function handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
    if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }

  return (
    <span
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[15px] font-medium text-fg-muted transition hover:text-fg-hover"
      >
        {label}
        <span aria-hidden="true" className="text-[10px] opacity-70">
          ▾
        </span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%-4px)] min-w-[240px] rounded-[var(--radius-lg)] border border-border bg-surface p-2 shadow-[var(--shadow)]"
        >
          {items.map((it) => (
            <Link
              key={it.href}
              role="menuitem"
              href={it.href}
              onClick={() => setOpen(false)}
              className="block rounded-[var(--radius)] px-3 py-2.5 text-[14.5px] font-semibold text-fg transition hover:bg-surface-2 hover:text-accent"
            >
              {it.name}
            </Link>
          ))}
        </div>
      )}
    </span>
  );
}

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{
        background: "color-mix(in srgb, var(--bg) 78%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Agenflow"
          className="flex items-center gap-2.5 justify-self-start text-fg"
        >
          <Logo />
          <span className="font-wordmark text-[21px] font-semibold tracking-[-0.03em]">
            agenflow
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          <Dropdown label="Servicios" items={SERVICIOS} />
          {TOP_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2.5 text-[15px] font-medium text-fg-muted transition hover:text-fg-hover"
            >
              {l.name}
            </Link>
          ))}
          <Dropdown label="Recursos" items={RECURSOS} />
          <Link
            href={NOSOTROS.href}
            className="px-3 py-2.5 text-[15px] font-medium text-fg-muted transition hover:text-fg-hover"
          >
            {NOSOTROS.name}
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-2.5">
          <ThemeToggle />
          <Link
            href="/contacto"
            className="hidden rounded-[var(--radius)] bg-accent px-[18px] py-2.5 text-[14px] font-semibold text-accent-fg transition hover:-translate-y-0.5 lg:inline-flex"
          >
            Contacto
          </Link>
          <MobileMenu
            servicios={SERVICIOS}
            topLinks={TOP_LINKS}
            recursos={RECURSOS}
            nosotros={NOSOTROS}
            labels={{
              servicios: "Servicios",
              recursos: "Recursos",
              cta: "Contacto",
              open: "Abrir menú",
              close: "Cerrar menú",
            }}
          />
        </div>
      </Container>
    </header>
  );
}
