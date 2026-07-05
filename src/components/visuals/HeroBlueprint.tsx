// Shared hero background — "Línea B · técnico/esquemático" (the brand system
// already approved for social, ported to the web). Replaces the old blurred
// aurora/glow blobs (HeroAuroraBg + HeroSideGlows) with a calm blueprint
// grammar: faint grid + hairline frame + corner marks. Pure CSS, no deps,
// theme-aware via tokens. Used by both the home hero (Hero.tsx) and PageHero
// (every inner page), so this one component sets the tone for the whole site.
// (The diagonal "ascending lines with nodes" were removed — they read as a
// cobweb over the hero rather than a schematic.)

function CornerMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute select-none font-label text-[15px] leading-none text-accent opacity-40 ${className}`}
    >
      +
    </span>
  );
}

export function HeroBlueprint() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* grid, faded toward the edges so it reads as texture, not a pattern */}
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

      {/* hairline frame + corner marks — literal "marco/cruces" from the brand handoff */}
      <div className="absolute inset-6 border border-[var(--border-strong)] sm:inset-8" />
      <CornerMark className="left-4 top-4 sm:left-6 sm:top-6" />
      <CornerMark className="right-4 top-4 -translate-x-full sm:right-6 sm:top-6" />
      <CornerMark className="bottom-4 left-4 sm:bottom-6 sm:left-6" />
      <CornerMark className="bottom-4 right-4 -translate-x-full sm:bottom-6 sm:right-6" />
    </div>
  );
}
