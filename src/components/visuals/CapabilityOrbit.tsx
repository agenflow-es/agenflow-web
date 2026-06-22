// Brand-native "one house, three ways in" orbit. Agenflow isotipo at the
// centre, the three capabilities orbiting around it, with accent dashes
// flowing outward. Server component: pure SVG + globals.css keyframes, so it's
// theme-aware via tokens (--accent, --bg-elev, --iso-*) and needs no JS.

const HUB = { x: 320, y: 215 };
const R = 150;
// Three nodes at 270° (top), 150° (lower-left), 30° (lower-right).
const NODES = [
  { x: HUB.x, y: HUB.y - R },
  { x: HUB.x + R * Math.cos((150 * Math.PI) / 180), y: HUB.y + R * Math.sin((150 * Math.PI) / 180) },
  { x: HUB.x + R * Math.cos((30 * Math.PI) / 180), y: HUB.y + R * Math.sin((30 * Math.PI) / 180) },
];

export function CapabilityOrbit({ items }: { items: string[] }) {
  const labels = items.slice(0, 3);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 640 440"
        role="img"
        aria-label={`Agenflow → ${labels.join(", ")}`}
        className="h-auto w-full"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* orbit ring */}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r={R}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="3 9"
        />

        {/* hub → capability connectors */}
        {NODES.map((n, i) => {
          const d = `M ${HUB.x} ${HUB.y} L ${n.x} ${n.y}`;
          return (
            <g key={`c${i}`}>
              <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 14"
                style={{ animation: "af-dash 1s linear infinite", animationDelay: `${i * 0.22}s` }}
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

        {/* capability pills */}
        {NODES.map((n, i) => (
          <g key={`p${i}`}>
            <circle cx={n.x} cy={n.y} r="4" fill="var(--accent)" />
            <rect
              x={n.x - 84}
              y={n.y - 22}
              width="168"
              height="44"
              rx="12"
              fill="var(--bg-elev)"
              stroke="var(--border)"
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14.5"
              fontWeight="500"
              fill="var(--text)"
            >
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
