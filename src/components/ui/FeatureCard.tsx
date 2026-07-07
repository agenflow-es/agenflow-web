import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * FeatureCard — the Línea B "rich card": gradient surface, blueprint "+" mark,
 * a ghosted oversized icon for depth, an accent icon chip, and an accent border
 * + lift + glow on hover. Francisco's approved card look — reuse across the site
 * instead of flat boxes. Server component (no hooks).
 */
export function FeatureCard({
  icon: Icon,
  label,
  title,
  children,
  className,
}: {
  icon: LucideIcon;
  label?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--accent)_45%,transparent)]",
        className,
      )}
    >
      <Icon
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 text-fg/[0.04] transition-colors duration-300 group-hover:text-accent/[0.08]"
      />
      <span
        aria-hidden
        className="absolute top-4 right-4 font-label text-[15px] leading-none text-fg-faint transition-colors duration-300 group-hover:text-accent"
      >
        +
      </span>
      <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-[var(--accent-soft)] text-accent">
        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
      </span>
      {label && (
        <span className="relative z-10 mt-5 font-label text-[11px] font-medium tracking-[0.13em] text-accent uppercase">
          {label}
        </span>
      )}
      <h3 className="relative z-10 mt-2 font-display text-[19px] font-semibold text-fg">
        {title}
      </h3>
      {children && (
        <div className="relative z-10 mt-2 text-[14.5px] leading-relaxed text-fg-muted">
          {children}
        </div>
      )}
    </div>
  );
}
