"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Logo } from "@/components/ui/primitives";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

type NavItem = { name: string; href: string };

function Dropdown({
  label,
  items,
  footerHref,
  footerLabel,
}: {
  label: string;
  items: NavItem[];
  footerHref?: string;
  footerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[15px] font-medium text-fg-muted transition hover:text-fg-hover"
      >
        {label}
        <span className="text-[10px] opacity-70">▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%-4px)] min-w-[260px] rounded-[var(--radius-lg)] border border-border bg-surface p-2 shadow-[var(--shadow)]">
          {items.map((it, i) => (
            <Link
              key={i}
              href={it.href}
              className="block rounded-[var(--radius)] px-3 py-2.5 text-[14.5px] font-semibold text-fg transition hover:bg-surface-2"
            >
              {it.name}
            </Link>
          ))}
          {footerHref && footerLabel && (
            <Link
              href={footerHref}
              className="mt-1 block rounded-[var(--radius)] px-3 py-2.5 text-[13px] font-semibold text-accent transition hover:bg-surface-2"
            >
              {footerLabel} →
            </Link>
          )}
        </div>
      )}
    </span>
  );
}

export function Header() {
  const nav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tSectors = useTranslations("sectors");
  const tServicePages = useTranslations("servicePages");
  const tResources = useTranslations("resourcesHub");
  const serviceItems: NavItem[] = [
    ...(tServices.raw("items") as NavItem[]),
    {
      name: tServicePages("presenciaOnline.title"),
      href: "/servicios/presencia-online",
    },
  ];
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
          <Link
            href="/nosotros"
            className="px-3 py-2.5 text-[15px] font-medium text-fg-muted transition hover:text-fg-hover"
          >
            {nav("about")}
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-2.5">
          <ThemeToggle />
          <LocaleSwitcher />
          <Link
            href="/contacto?reason=consultoria"
            className="hidden rounded-[var(--radius)] bg-accent px-[18px] py-2.5 text-[14px] font-semibold text-accent-fg transition hover:-translate-y-0.5 lg:inline-flex"
          >
            {nav("cta")}
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
              about: nav("about"),
              cta: nav("cta"),
              open: nav("menuOpen"),
              close: nav("menuClose"),
            }}
          />
        </div>
      </Container>
    </header>
  );
}
