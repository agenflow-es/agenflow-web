// Brand-native "connect your tools" diagram (inspired by 21st.dev's Animated
// Beam, but fixed-coordinate + pure CSS so it never needs layout measurement).
// Server component: no hooks, animations come from globals.css keyframes.
// Tokens (--accent, --bg-elev, --iso-*) make it theme-aware automatically.

const LEFT_Y = [40, 132, 224, 316];
const RIGHT_Y = [84, 180, 276];
const HUB = { x: 380, y: 180 };

export function ProcessFlow({
  sources,
  outcomes,
  hub,
}: {
  sources: string[];
  outcomes: string[];
  hub: string;
}) {
  const src = sources.slice(0, 4);
  const out = outcomes.slice(0, 3);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-label={`${src.join(", ")} → ${hub} → ${out.join(", ")}`}
        className="h-auto w-full"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* source → hub connections */}
        {src.map((_, i) => {
          const y = LEFT_Y[i];
          const d = `M 160 ${y} C 252 ${y}, 252 ${HUB.y}, 328 ${HUB.y}`;
          return (
            <g key={`ls${i}`}>
              <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 14"
                style={{ animation: "af-dash 1s linear infinite", animationDelay: `${i * 0.18}s` }}
              />
            </g>
          );
        })}

        {/* hub → outcome connections */}
        {out.map((_, i) => {
          const y = RIGHT_Y[i];
          const d = `M 432 ${HUB.y} C 510 ${HUB.y}, 510 ${y}, 592 ${y}`;
          return (
            <g key={`ro${i}`}>
              <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 14"
                style={{ animation: "af-dash 1s linear infinite", animationDelay: `${0.4 + i * 0.18}s` }}
              />
            </g>
          );
        })}

        {/* hub */}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r="66"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.3"
          style={{ animation: "af-blink 3s ease-in-out infinite" }}
        />
        <circle cx={HUB.x} cy={HUB.y} r="52" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1.5" />
        <svg x={HUB.x - 26} y={HUB.y - 26} width="52" height="52" viewBox="0 0 64 64">
          <polygon points="8,50 32,50 44,40 20,40" style={{ fill: "var(--iso-1)" }} />
          <polygon points="15,38 39,38 51,28 27,28" style={{ fill: "var(--iso-2)" }} />
          <polygon points="22,26 46,26 58,16 34,16" style={{ fill: "var(--iso-3)" }} />
        </svg>

        {/* source pills */}
        {src.map((label, i) => {
          const y = LEFT_Y[i];
          return (
            <g key={`lp${i}`}>
              <rect x="28" y={y - 23} width="132" height="46" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
              <text x="94" y={y} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="500" fill="var(--text)">
                {label}
              </text>
            </g>
          );
        })}

        {/* outcome pills */}
        {out.map((label, i) => {
          const y = RIGHT_Y[i];
          return (
            <g key={`op${i}`}>
              <rect x="592" y={y - 23} width="140" height="46" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
              <text x="662" y={y} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="500" fill="var(--text)">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
