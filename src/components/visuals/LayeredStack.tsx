"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// Isometric layered stack for the SaaS-studio model: sector knowledge →
// automation + AI → product, building upward. The slabs light up (accent)
// from bottom to top as the block scrolls through the viewport, and unlight
// as you scroll back. Client component: scroll-linked opacity via Motion;
// theme-aware via tokens.

const CX = 150;
const W = 110; // half width
const D = 52; // half depth
const H = 20; // thickness
const TOP_Y = [240, 155, 70]; // bottom → top

function topFace(cy: number) {
  return `M ${CX} ${cy} L ${CX + W} ${cy + D} L ${CX} ${cy + 2 * D} L ${CX - W} ${cy + D} Z`;
}
function leftFace(cy: number) {
  return `M ${CX - W} ${cy + D} L ${CX} ${cy + 2 * D} L ${CX} ${cy + 2 * D + H} L ${CX - W} ${cy + D + H} Z`;
}
function rightFace(cy: number) {
  return `M ${CX + W} ${cy + D} L ${CX} ${cy + 2 * D} L ${CX} ${cy + 2 * D + H} L ${CX + W} ${cy + D + H} Z`;
}

type Layer = { name: string; sub: string };

// Staggered scroll windows (within the element's travel through the viewport)
// so the bottom slab lights first, the top last.
const RANGES: [number, number][] = [
  [0.05, 0.26],
  [0.18, 0.4],
  [0.32, 0.52],
];

export function LayeredStack({ layers }: { layers: Layer[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const items = layers.slice(0, 3);

  return (
    <figure ref={ref} className="m-0">
      <svg
        viewBox="0 0 500 380"
        role="img"
        aria-label={items.map((l) => l.name).join(" → ")}
        className="h-auto w-full"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {items.map((layer, i) => (
          <StackLayer
            key={i}
            layer={layer}
            cy={TOP_Y[i]}
            progress={scrollYProgress}
            range={RANGES[i] ?? RANGES[RANGES.length - 1]}
            isTop={i === items.length - 1}
            showArrow={i < items.length - 1}
            arrowDelay={i * 0.3}
          />
        ))}
      </svg>
    </figure>
  );
}

function StackLayer({
  layer,
  cy,
  progress,
  range,
  isTop,
  showArrow,
  arrowDelay,
}: {
  layer: Layer;
  cy: number;
  progress: MotionValue<number>;
  range: [number, number];
  isTop: boolean;
  showArrow: boolean;
  arrowDelay: number;
}) {
  const lit = useTransform(progress, range, [0, 1]);
  const litLeft = useTransform(lit, (v) => v * 0.82);
  const litRight = useTransform(lit, (v) => v * 0.6);
  const litHalo = useTransform(lit, (v) => v * 0.16);
  const labelY = cy + D;

  return (
    <g>
      {/* halo (top slab only) */}
      {isTop && (
        <motion.ellipse
          cx={CX}
          cy={cy + D}
          rx={W + 22}
          ry={D + 14}
          fill="var(--accent)"
          style={{ opacity: litHalo }}
        />
      )}

      {/* base (off) faces */}
      <path d={leftFace(cy)} fill="var(--bg-elev)" stroke="var(--border)" />
      <path d={rightFace(cy)} fill="var(--bg)" stroke="var(--border)" />
      <path d={topFace(cy)} fill="var(--bg-elev2)" stroke="var(--border-strong)" />

      {/* accent overlay, fades in with scroll progress */}
      <motion.path d={leftFace(cy)} fill="var(--accent)" stroke="var(--accent)" style={{ opacity: litLeft }} />
      <motion.path d={rightFace(cy)} fill="var(--accent)" stroke="var(--accent)" style={{ opacity: litRight }} />
      <motion.path d={topFace(cy)} fill="var(--accent)" stroke="var(--accent)" style={{ opacity: lit }} />

      {/* connector arrow to the slab above */}
      {showArrow && (
        <path
          d={`M ${CX} ${cy - 6} l -5 9 h 10 Z`}
          fill="var(--accent)"
          opacity="0.8"
          style={{ animation: "af-blink 2.4s ease-in-out infinite", animationDelay: `${arrowDelay}s` }}
        />
      )}

      {/* label */}
      <text x={CX + W + 26} y={labelY - 4} fontSize="15" fontWeight="600" fill="var(--text)">
        {layer.name}
      </text>
      <text x={CX + W + 26} y={labelY + 15} fontSize="12.5" fill="var(--text-muted)">
        {layer.sub}
      </text>
    </g>
  );
}
