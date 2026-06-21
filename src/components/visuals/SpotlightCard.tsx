"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

// "Card Spotlight" pattern (popularized on 21st.dev / Aceternity): a radial
// glow that follows the cursor, here tinted with the brand accent. Robust and
// theme-aware — no extra deps, the spotlight is a CSS radial-gradient driven by
// two custom properties updated on pointer move.
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-[var(--shadow)] transition-colors duration-300 hover:border-border-strong",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(450px circle at var(--mx, 50%) var(--my, 0%), var(--accent-soft), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
