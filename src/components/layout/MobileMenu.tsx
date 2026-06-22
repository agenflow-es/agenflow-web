"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

type NavItem = { name: string; href: string };

function Group({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="mb-2">
      <div className="px-3 pb-1 pt-2 font-label text-[11px] uppercase tracking-[0.13em] text-fg-faint">
        {title}
      </div>
      {items.map((it, i) => (
        <Link
          key={i}
          href={it.href}
          onClick={onNavigate}
          className="block rounded-[var(--radius)] px-3 py-2.5 text-[15px] font-semibold text-fg transition hover:bg-surface-2"
        >
          {it.name}
        </Link>
      ))}
    </div>
  );
}

// Mobile navigation (<lg). Reuses the same nav data as the desktop Header,
// passed in as props so there is a single source of truth. Closes on link
// click, overlay click and Escape; locks body scroll while open.
export function MobileMenu({
  serviceItems,
  sectorItems,
  resourceItems,
  labels,
}: {
  serviceItems: NavItem[];
  sectorItems: NavItem[];
  resourceItems: NavItem[];
  labels: {
    services: string;
    sectors: string;
    resources: string;
    pricing: string;
    cta: string;
    open: string;
    close: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] text-fg transition hover:bg-surface"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[68px] z-40" onClick={close}>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "color-mix(in srgb, var(--bg) 55%, transparent)",
              backdropFilter: "blur(2px)",
            }}
          />
          <nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={labels.services}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-border bg-surface p-5 shadow-[var(--shadow)]"
          >
            <Group title={labels.services} items={serviceItems} onNavigate={close} />
            <Group title={labels.sectors} items={sectorItems} onNavigate={close} />
            <Group title={labels.resources} items={resourceItems} onNavigate={close} />
            <div className="mt-2 border-t border-border pt-2">
              <Link
                href="/precios"
                onClick={close}
                className="block rounded-[var(--radius)] px-3 py-3 text-[15px] font-semibold text-fg transition hover:bg-surface-2"
              >
                {labels.pricing}
              </Link>
            </div>
            <Link
              href="/contacto?reason=consultoria"
              onClick={close}
              className="mt-3 block rounded-[var(--radius)] bg-accent px-5 py-3 text-center text-[15px] font-semibold text-accent-fg transition hover:-translate-y-0.5"
            >
              {labels.cta}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
