"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, DISTANCE, VIEWPORT } from "@/lib/motion";

/**
 * Reveal — fade + subtle upward translate as the element scrolls into view.
 * The building block for entrance motion. For lists, use <Stagger> instead.
 *
 * Honours prefers-reduced-motion: when the user asks for less motion we render
 * a plain, static element (no offset, no transition) — the content is always there.
 */
export function Reveal({
  children,
  className,
  /** extra delay in seconds (rarely needed — prefer <Stagger> for sequences) */
  delay = 0,
  /** travel distance in px (defaults to the system's base) */
  y = DISTANCE.base,
  once = VIEWPORT.once,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: VIEWPORT.margin }}
      transition={{ duration: DURATION.base, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
