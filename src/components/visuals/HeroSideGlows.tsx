// The two theme-aware blue side glows from the home hero, hugging the left/right
// edges so centred hero text stays clean (a centre glow reads poorly on the
// light theme). Pure CSS, works in light and dark, near-zero cost. Shared by the
// home hero (HeroAuroraBg) and the inner-page PageHero so every hero matches.
// Animations honor prefers-reduced-motion via the global rule in globals.css.

export function HeroSideGlows() {
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
    </div>
  );
}
