// Lightweight, theme-aware "aurora" for the hero background: two side glows +
// the masked grid. Pure CSS (no WebGL), works in light and dark, near-zero
// cost. The glows live in HeroSideGlows (shared with the inner-page PageHero);
// this adds the masked grid on top for the home hero. Animations honor
// prefers-reduced-motion via the global rule in globals.css.

import { HeroSideGlows } from "./HeroSideGlows";

export function HeroAuroraBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <HeroSideGlows />
      {/* grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 72% at 50% 30%,#000 35%,transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 92% 72% at 50% 30%,#000 35%,transparent 80%)",
        }}
      />
    </div>
  );
}
