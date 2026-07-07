"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
      {items.map((it) => (
        <Link
          key={it.href}
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
//
// The overlay is rendered into a portal on document.body — NOT inline — because
// the sticky <header> uses backdrop-filter, which makes it the containing block
// for position:fixed descendants. Rendered inline, the fixed overlay would be
// sized against the 68px header (collapsing to ~0 height); the portal restores
// viewport-relative positioning so the panel fills the screen.
export function MobileMenu({
  servicios,
  topLinks,
  recursos,
  nosotros,
  labels,
}: {
  servicios: NavItem[];
  topLinks: NavItem[];
  recursos: NavItem[];
  nosotros: NavItem;
  labels: {
    servicios: string;
    recursos: string;
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

      {open &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 top-[68px] z-40 lg:hidden"
            onClick={close}
          >
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
              aria-label="Menú"
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-border bg-surface p-5 shadow-[var(--shadow)]"
            >
              <Group title={labels.servicios} items={servicios} onNavigate={close} />

              <div className="border-t border-border pt-2">
                {topLinks.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={close}
                    className="block rounded-[var(--radius)] px-3 py-2.5 text-[15px] font-semibold text-fg transition hover:bg-surface-2"
                  >
                    {it.name}
                  </Link>
                ))}
              </div>

              <Group title={labels.recursos} items={recursos} onNavigate={close} />

              <div className="border-t border-border pt-2">
                <Link
                  href={nosotros.href}
                  onClick={close}
                  className="block rounded-[var(--radius)] px-3 py-3 text-[15px] font-semibold text-fg transition hover:bg-surface-2"
                >
                  {nosotros.name}
                </Link>
              </div>

              <Link
                href="/contacto"
                onClick={close}
                className="mt-3 block rounded-[var(--radius)] bg-accent px-5 py-3 text-center text-[15px] font-semibold text-accent-fg transition hover:-translate-y-0.5"
              >
                {labels.cta}
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
