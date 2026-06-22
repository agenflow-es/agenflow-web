"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Logo } from "@/components/ui/primitives";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

type NavItem = { name: string; href: string };

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
          className="absolute left-0 top-[calc(100%-4px)] min-w-[260px] rounded-[var(--radius-lg)] border border-border bg-surface p-2 shadow-[var(--shadow)]"
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
  const nav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tSectors = useTranslations("sectors");
  const tResources = useTranslations("resourcesHub");
  const serviceItems = tServices.raw("items") as NavItem[];
  const sectorItems = tSectors.raw("items") as NavItem[];
  const resourceItems: NavItem[] = (
    tResources.raw("items") as { name: string; href: string }[]
  ).map(({ name, href }) => ({ name, href }));

  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{
        background: "color-mix(in srgb, var(--bg) 78%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <Container className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-4">
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
          <Dropdown label={nav("services")} items={serviceItems} />
          <Dropdown label={nav("sectors")} items={sectorItems} />
          <Dropdown label={nav("resources")} items={resourceItems} />
          <Link
            href="/precios"
            className="px-3 py-2.5 text-[15px] font-medium text-fg-muted transition hover:text-fg-hover"
          >
            {nav("pricing")}
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-2.5">
          <ThemeToggle />
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className="hidden rounded-[var(--radius)] bg-accent px-[18px] py-2.5 text-[14px] font-semibold text-accent-fg transition hover:-translate-y-0.5 lg:inline-flex"
          >
            {nav("contact")}
          </Link>
          <MobileMenu
            serviceItems={serviceItems}
            sectorItems={sectorItems}
            resourceItems={resourceItems}
            labels={{
              services: nav("services"),
              sectors: nav("sectors"),
              resources: nav("resources"),
              pricing: nav("pricing"),
              cta: nav("contact"),
              open: nav("menuOpen"),
              close: nav("menuClose"),
            }}
          />
        </div>
      </Container>
    </header>
  );
}
