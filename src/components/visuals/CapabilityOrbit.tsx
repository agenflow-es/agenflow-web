// Brand-native "one house, four ways in" orbit. Agenflow isotipo at the
// centre; the four capabilities sit just OUTSIDE the orbit ring at the four
// cardinal points, so every pill's inner edge is the same distance from the
// logo. The two longest labels go top/bottom (where width is free) and the
// shorter two left/right, so nothing overflows. Server component: pure SVG +
// globals.css keyframes, theme-aware via tokens.

const CX = 300;
const CY = 215;
const R = 92; // orbit ring radius
const GAP = 14; // ring → pill inner-edge gap
const PH = 40; // pill height
const PW_WIDE = 226; // top / bottom pills
const PW_NARROW = 170; // left / right pills

export function CapabilityOrbit({ items }: { items: string[] }) {
  const labels = items.slice(0, 4);
  // Longest two labels → top & bottom; shorter two → right & left.
  const ranked = labels
    .map((l, i) => ({ l, i }))
    .sort((a, b) => b.l.length - a.l.length || a.i - b.i);
  const [top, bottom, right, left] = [
    ranked[0]?.l ?? "",
    ranked[1]?.l ?? "",
    ranked[2]?.l ?? "",
    ranked[3]?.l ?? "",
  ];

  // Pill centres, placed so every inner edge sits R+GAP from the hub.
  const nodes = [
    { label: top, cx: CX, cy: CY - (R + GAP + PH / 2), w: PW_WIDE, dot: { x: CX, y: CY - R }, edge: { x: CX, y: CY - (R + GAP) } },
    { label: bottom, cx: CX, cy: CY + (R + GAP + PH / 2), w: PW_WIDE, dot: { x: CX, y: CY + R }, edge: { x: CX, y: CY + (R + GAP) } },
    { label: right, cx: CX + (R + GAP + PW_NARROW / 2), cy: CY, w: PW_NARROW, dot: { x: CX + R, y: CY }, edge: { x: CX + (R + GAP), y: CY } },
    { label: left, cx: CX - (R + GAP + PW_NARROW / 2), cy: CY, w: PW_NARROW, dot: { x: CX - R, y: CY }, edge: { x: CX - (R + GAP), y: CY } },
  ];

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 600 430"
        role="img"
        aria-label={`Agenflow → ${labels.join(", ")}`}
        className="h-auto w-full"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* orbit ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 9" />

        {/* hub → pill connectors */}
        {nodes.map((n, i) => {
          const d = `M ${CX} ${CY} L ${n.edge.x} ${n.edge.y}`;
          return (
            <g key={`c${i}`}>
              <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.25" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeDasharray="2 13"
                style={{ animation: "af-dash 1s linear infinite", animationDelay: `${i * 0.2}s` }}
              />
            </g>
          );
        })}

        {/* hub */}
        <circle cx={CX} cy={CY} r="50" fill="var(--accent)" opacity="0.1" style={{ animation: "af-blink 3s ease-in-out infinite" }} />
        <circle cx={CX} cy={CY} r="38" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1.5" />
        <svg x={CX - 21} y={CY - 21} width="42" height="42" viewBox="0 0 64 64">
          <polygon points="8,50 32,50 44,40 20,40" style={{ fill: "var(--iso-1)" }} />
          <polygon points="15,38 39,38 51,28 27,28" style={{ fill: "var(--iso-2)" }} />
          <polygon points="22,26 46,26 58,16 34,16" style={{ fill: "var(--iso-3)" }} />
        </svg>

        {/* ring dots + capability pills */}
        {nodes.map((n, i) => (
          <g key={`p${i}`}>
            <circle cx={n.dot.x} cy={n.dot.y} r="4" fill="var(--accent)" />
            <rect
              x={n.cx - n.w / 2}
              y={n.cy - PH / 2}
              width={n.w}
              height={PH}
              rx="12"
              fill="var(--bg-elev)"
              stroke="var(--border)"
            />
            <text
              x={n.cx}
              y={n.cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontWeight="500"
              fill="var(--text)"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
