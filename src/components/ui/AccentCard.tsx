import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Canonical "accent-bar" card used across service/sector pages. One source of
// truth for padding, the growing accent bar, hover lift and text scale.
// `background` stays contextual (cards contrast against their section: use
// "bg" on bg-surface sections, "surface" on default-bg sections).
type AccentCardProps = {
  title: string;
  desc?: string;
  href?: string;
  external?: boolean;
  bar?: boolean;
  background?: "surface" | "bg";
  compact?: boolean; // tighter type scale for 4-up grids
  className?: string;
  children?: ReactNode;
};

export function AccentCard({
  title,
  desc,
  href,
  external = false,
  bar = true,
  background = "surface",
  compact = false,
  className,
  children,
}: AccentCardProps) {
  const cardClass = cn(
    "group rounded-[var(--radius-lg)] border border-border p-6 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent",
    background === "surface" ? "bg-surface" : "bg-bg",
    (href || children) && "flex flex-col",
    className,
  );

  const inner = (
    <>
      {bar && (
        <span
          aria-hidden
          className="block h-1.5 w-7 rounded-full bg-accent opacity-80 transition group-hover:w-10"
        />
      )}
      <h3
        className={cn(
          "font-display font-semibold",
          compact ? "text-[17px]" : "text-[18px]",
          bar && "mt-5",
        )}
      >
        {title}
      </h3>
      {desc && (
        <p
          className={cn(
            "mt-2.5 leading-[1.6] text-fg-muted",
            compact ? "text-[14.5px]" : "text-[15px]",
            children && "flex-1",
          )}
        >
          {desc}
        </p>
      )}
      {children}
    </>
  );

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={cardClass}>
        {inner}
      </Link>
    );
  }
  return <div className={cardClass}>{inner}</div>;
}
