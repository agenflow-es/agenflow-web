"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * FullBleedStatement — a full-width band with one strong statement and a lot of
 * breathing room. For punctuation between sections (a claim, a principle). No
 * decoration competing with the words; the whitespace does the work.
 *
 * Breaks out of the parent container to the full viewport width.
 */
export function FullBleedStatement({
  children,
  kicker,
  className,
  tinted = false,
}: {
  children: ReactNode;
  /** small mono label above the statement */
  kicker?: string;
  className?: string;
  /** subtle surface tint to separate it from the page */
  tinted?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2 border-y border-border",
        tinted ? "bg-surface" : "bg-bg",
        className,
      )}
    >
      <div className="mx-auto max-w-[1000px] px-[clamp(20px,5vw,48px)] py-[clamp(72px,12vw,160px)] text-center">
        <Reveal>
          {kicker && (
            <span className="mb-6 block font-label text-[12px] font-medium uppercase tracking-[0.16em] text-accent">
              {kicker}
            </span>
          )}
          <p className="mx-auto max-w-[22ch] text-balance font-display text-[clamp(26px,4.4vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-fg">
            {children}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
