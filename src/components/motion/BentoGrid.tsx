"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "./Stagger";

/**
 * BentoGrid + BentoCard — an asymmetric grid for services / verticals where the
 * cards are deliberately different sizes (avoids the flat "3 equal boxes" look).
 *
 * Layout: single column on mobile, a 6-track grid from md up. Cards set their own
 * width/height with `colSpan` (1–6) and `rowSpan`. Cards reveal in a stagger.
 */
export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Stagger
      className={cn(
        "grid grid-cols-1 gap-4 md:auto-rows-[minmax(180px,auto)] md:grid-cols-6",
        className,
      )}
    >
      {children}
    </Stagger>
  );
}

export function BentoCard({
  children,
  className,
  colSpan = 3,
  rowSpan = 1,
  label,
  title,
}: {
  children?: ReactNode;
  className?: string;
  /** columns to span on the md+ 6-track grid (1–6) */
  colSpan?: number;
  /** rows to span (for tall feature cards) */
  rowSpan?: number;
  label?: string;
  title?: string;
}) {
  const style: CSSProperties = {
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
  };
  return (
    <StaggerItem
      style={style}
      className={cn(
        "group flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent-bright/50",
        className,
      )}
    >
      {label && (
        <span className="font-label text-[11px] font-medium uppercase tracking-[0.13em] text-accent">
          {label}
        </span>
      )}
      {title && (
        <h3 className="mt-2 text-[17px] font-semibold text-fg">{title}</h3>
      )}
      {children && (
        <div className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">
          {children}
        </div>
      )}
    </StaggerItem>
  );
}
