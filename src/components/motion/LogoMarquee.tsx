"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * LogoMarquee — a slow, infinite horizontal marquee for social proof. Pauses on
 * hover. Honours prefers-reduced-motion (the global CSS rule in globals.css
 * freezes the CSS animation, so it sits still and stays readable).
 *
 * Content note: we have no client logos and never fake them. This carries the
 * TOOLS WE INTEGRATE (Gmail, WhatsApp, Sheets, Holded…) — which also reinforces
 * "you keep your tools, we connect them". Swap the text chips for real logo SVGs
 * when we have them.
 */
export function LogoMarquee({
  items,
  className,
  /** seconds for one full loop — bigger = slower */
  speed = 32,
}: {
  items: ReactNode[];
  className?: string;
  speed?: number;
}) {
  // Duplicate the track so the loop is seamless (translateX(-50%) lands on a copy).
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        // fade the edges so items appear/disappear softly
        "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <ul
        className="flex w-max items-center gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animation: `af-marquee ${speed}s linear infinite` }}
      >
        {track.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-2 rounded-[var(--radius)] border border-border bg-surface px-4 py-2.5 font-label text-[12.5px] uppercase tracking-[0.08em] text-fg-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
