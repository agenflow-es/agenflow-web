"use client";

import { MotionConfig } from "motion/react";
import { EASE, DURATION } from "@/lib/motion";

/**
 * Global motion rules. Wrap the app (or a subtree) with this so:
 * - every motion/react animation inherits the signature easing/duration by default;
 * - `reducedMotion="user"` makes motion honour the OS "reduce motion" setting as a
 *   site-wide backstop (individual primitives also short-circuit — belt and braces).
 *
 * Drop <MotionProvider> into the root layout when we start assembling real pages.
 * For now it lives in the /dev showcase.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE }}
    >
      {children}
    </MotionConfig>
  );
}
