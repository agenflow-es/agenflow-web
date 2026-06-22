"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

// Premium "automation at work" feed: a looping vertical marquee of tasks the
// system completes on its own, each ticked off. Distinct from the ProcessFlow
// diagram. Theme-aware; pauses (static) when prefers-reduced-motion.
export function AutomationFeed({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const loop = reduce ? items : [...items, ...items];

  return (
    <div className="relative h-[360px] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg p-4 shadow-[var(--shadow)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16"
        style={{ background: "linear-gradient(var(--bg), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16"
        style={{ background: "linear-gradient(transparent, var(--bg))" }}
      />
      <motion.ul
        className="flex flex-col gap-3"
        animate={reduce ? undefined : { y: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 16, ease: "linear", repeat: Infinity }
        }
      >
        {loop.map((task, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface px-4 py-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-[14.5px] leading-[1.4] text-fg">{task}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
