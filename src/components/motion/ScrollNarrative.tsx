"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_CSS, DURATION } from "@/lib/motion";

export type NarrativeStep = {
  id: string;
  /** small mono label, e.g. "PASO 01" */
  label?: string;
  title: string;
  body: ReactNode;
};

/**
 * ScrollNarrative — left column of steps scrolls past a sticky right panel that
 * reacts to whichever step is active. For explaining "cómo trabajamos". Used ONCE
 * on the whole site — it's a signature moment, not a pattern to repeat.
 *
 * The active step is driven by scroll position (IntersectionObserver), so it works
 * fine under prefers-reduced-motion; only the cross-fade easing is a transition,
 * which the global reduced-motion rule neutralises.
 */
export function ScrollNarrative({
  steps,
  renderPanel,
  className,
}: {
  steps: NarrativeStep[];
  /** renders the sticky panel for the active step index */
  renderPanel: (activeIndex: number) => ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      // a step becomes "active" when it reaches the vertical middle of the viewport
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    const els = refs.current.filter(Boolean) as HTMLLIElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        // desktop: two columns (steps left, sticky panel right). mobile: single
        // block so the sticky panel — a DIRECT child of this tall container — can
        // travel across the steps (nested in a grid/flex cell it'd be trapped short).
        "lg:grid lg:grid-cols-2 lg:gap-20",
        className,
      )}
    >
      {/* panel — DOM-first so on mobile it pins at the top and reacts as the steps
          scroll under it; order-2 sends it to the right column on desktop.
          self-start keeps it short so it has room to travel. */}
      <div className="sticky top-[76px] mb-10 self-start lg:top-28 lg:order-2 lg:mb-0">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface lg:aspect-[4/3]">
          {renderPanel(active)}
        </div>
      </div>

      {/* steps */}
      <ol className="lg:order-1">
        {steps.map((step, i) => (
          <li
            key={step.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-idx={i}
            className="min-h-[46vh] py-8 first:pt-0 lg:min-h-[52vh] lg:py-10"
          >
            <div
              className="transition-opacity"
              style={{
                opacity: i === active ? 1 : 0.35,
                transitionDuration: `${DURATION.base}s`,
                transitionTimingFunction: EASE_CSS,
              }}
            >
              {step.label && (
                <span className="font-label text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
                  {step.label}
                </span>
              )}
              <h3 className="mt-3 font-display text-[clamp(22px,3vw,32px)] font-semibold leading-tight tracking-[-0.015em] text-fg">
                {step.title}
              </h3>
              <div className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-fg-muted">
                {step.body}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
