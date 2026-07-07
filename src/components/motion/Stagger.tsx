"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DISTANCE, STAGGER, VIEWPORT, revealVariants, staggerParent } from "@/lib/motion";

/**
 * Stagger — a container that reveals its <StaggerItem> children one after another
 * as it enters the viewport. Use for grids and lists so cards don't all pop at once.
 *
 * Pattern: <Stagger><StaggerItem>…</StaggerItem><StaggerItem>…</StaggerItem></Stagger>
 * Both honour prefers-reduced-motion (static render, content intact).
 */
export function Stagger({
  children,
  className,
  stagger = STAGGER,
  delayChildren = 0,
  once = VIEWPORT.once,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: VIEWPORT.margin }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  y = DISTANCE.base,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  return (
    <motion.div className={className} style={style} variants={revealVariants(y)}>
      {children}
    </motion.div>
  );
}
