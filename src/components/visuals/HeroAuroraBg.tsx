// Lightweight, theme-aware "aurora" for the hero background: two side glows +
// the masked grid. Pure CSS (no WebGL), works in light and dark, near-zero
// cost. The glows hug the left/right edges so the centred hero text stays
// clean (a centre glow reads poorly on the light theme). Animations honor
// prefers-reduced-motion via the global rule in globals.css.

export function HeroAuroraBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* left-side glow */}
      <div
        className="absolute -left-[16%] top-[4%] h-[560px] w-[560px] rounded-full blur-[52px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 34%, transparent), transparent 68%)",
          animation: "af-drift 20s ease-in-out infinite",
          opacity: 0.65,
        }}
      />
      {/* right-side glow */}
      <div
        className="absolute -right-[16%] top-[26%] h-[600px] w-[600px] rounded-full blur-[52px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 32%, transparent), transparent 68%)",
          animation: "af-drift2 24s ease-in-out infinite",
          opacity: 0.6,
        }}
      />
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
