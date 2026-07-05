/**
 * Motion system — the single source of truth for animation timing across the
 * whole site. Every animated component imports from here; nothing hardcodes its
 * own easing/duration. If it feels wrong globally, you change it in one place.
 *
 * Principles (agreed for the redesign):
 * - One signature easing curve, used for EVERYTHING. Soft, no bounce.
 * - Small, calm reveals: 8–16px of travel max. Never scale/rotate/bounce on entry.
 * - Short, consistent durations. Marquees are the only "slow" thing.
 * - Accessibility is not optional: every consumer must honour prefers-reduced-motion
 *   (see components/motion/* — they short-circuit to a static render, and
 *   <MotionProvider> sets motion's reducedMotion="user" globally as a backstop).
 */
import type { Variants } from "motion/react";

/** Signature easing. Use in ALL JS-driven animations (motion/react `ease`). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Same curve for CSS (transitions, keyframes). Keep in sync with EASE. */
export const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Durations in seconds (motion/react uses seconds). */
export const DURATION = {
  /** micro-interactions: hovers, toggles (150–200ms) */
  micro: 0.18,
  /** standard: reveals, most transitions (300–400ms) */
  base: 0.35,
  /** slow: deliberate, large moves (600ms) */
  slow: 0.6,
} as const;

/** Reveal travel distances in px. Max 16 — restraint is the point. */
export const DISTANCE = {
  sm: 8,
  base: 12,
  lg: 16,
} as const;

/** Delay between staggered children, in seconds (60–80ms). */
export const STAGGER = 0.07;

/** Shared viewport config for scroll reveals: fire once, a little early. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Variants for a single element revealing on scroll. */
export function revealVariants(y: number = DISTANCE.base): Variants {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE },
    },
  };
}

/** Variants for a container that staggers its children into view. */
export function staggerParent(
  stagger: number = STAGGER,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}
