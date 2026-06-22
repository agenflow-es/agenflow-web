// Symbolic, theme-aware illustrations for the home Sectors cards. Same visual
// language as ShieldVisual / CapabilityOrbit: pure SVG + globals.css keyframes
// (af-dash, af-blink), themed via tokens. Sized 16:10 to fill the card header.

// A lit / unlit window grid for the buildings.
function Windows({
  x,
  y,
  cols,
  rows,
  lit = [],
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  lit?: [number, number][];
}) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = lit.some(([lc, lr]) => lc === c && lr === r);
      cells.push(
        <rect
          key={`${c}-${r}`}
          x={x + c * 16}
          y={y + r * 18}
          width="9"
          height="11"
          rx="1.5"
          fill={on ? "var(--accent)" : "var(--grid)"}
          opacity={on ? 0.9 : 1}
        />,
      );
    }
  }
  return <>{cells}</>;
}

// Inmobiliario y construcción: a community of buildings orchestrated by a
// central AI node, with a crane nodding to construction.
export function RealEstateVisual() {
  const HUB = { x: 200, y: 38 };
  const ROOFS: [number, number][] = [
    [113, 112],
    [200, 72],
    [287, 134],
  ];
  return (
    <figure className="absolute inset-0 m-0 flex items-center justify-center p-5">
      <svg
        viewBox="0 0 400 250"
        role="img"
        aria-label="Comunidad de edificios orquestada por un agente de IA"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ground line */}
        <line x1="44" y1="206" x2="356" y2="206" stroke="var(--border)" strokeWidth="1.5" />

        {/* hub → rooftop connectors (orchestration) */}
        {ROOFS.map(([x, y], i) => {
          const d = `M ${HUB.x} ${HUB.y} L ${x} ${y}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.25" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2 12"
                style={{ animation: "af-dash 1s linear infinite", animationDelay: `${i * 0.2}s` }}
              />
            </g>
          );
        })}

        {/* buildings */}
        <g stroke="var(--border-strong)" strokeWidth="1.5">
          <rect x="80" y="112" width="66" height="94" rx="4" fill="var(--bg-elev)" />
          <rect x="158" y="72" width="84" height="134" rx="4" fill="var(--bg-elev)" />
          <rect x="254" y="134" width="66" height="72" rx="4" fill="var(--bg-elev)" />
        </g>
        <Windows x={92} y={126} cols={3} rows={4} lit={[[1, 1]]} />
        <Windows x={170} y={86} cols={4} rows={6} lit={[[1, 0], [2, 3]]} />
        <Windows x={266} y={148} cols={3} rows={3} lit={[[0, 1]]} />

        {/* crane (construction) over the right building */}
        <g stroke="var(--iso-2)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85">
          <line x1="332" y1="206" x2="332" y2="96" />
          <line x1="300" y1="100" x2="356" y2="100" />
          <line x1="312" y1="100" x2="312" y2="120" />
        </g>

        {/* hub node */}
        <circle cx={HUB.x} cy={HUB.y} r="22" fill="var(--accent)" opacity="0.12" style={{ animation: "af-blink 3s ease-in-out infinite" }} />
        <circle cx={HUB.x} cy={HUB.y} r="13" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx={HUB.x} cy={HUB.y} r="4.5" fill="var(--accent)" />
        {ROOFS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="var(--accent)" />
        ))}
      </svg>
    </figure>
  );
}

// Legal: an accounting-audit document under review, with a verified seal —
// echoing the shield's flowing perimeter for brand consistency.
export function LegalVisual() {
  return (
    <figure className="absolute inset-0 m-0 flex items-center justify-center p-5">
      <svg
        viewBox="0 0 400 250"
        role="img"
        aria-label="Documento de auditoría contable revisado y aprobado"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* document */}
        <rect x="120" y="34" width="160" height="182" rx="12" fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth="1.5" />
        {/* flowing review perimeter */}
        <rect
          x="129"
          y="43"
          width="142"
          height="164"
          rx="8"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 12"
          style={{ animation: "af-dash 1.2s linear infinite" }}
        />

        {/* title bar */}
        <rect x="142" y="58" width="74" height="11" rx="3" fill="var(--accent)" opacity="0.85" />

        {/* text rows */}
        <g fill="var(--grid)">
          <rect x="142" y="84" width="116" height="7" rx="3" />
          <rect x="142" y="100" width="116" height="7" rx="3" />
        </g>

        {/* highlighted reviewed row */}
        <rect x="142" y="118" width="116" height="9" rx="3" fill="var(--accent)" opacity="0.16" />

        {/* balance / cuadre: debit = credit */}
        <rect x="142" y="142" width="44" height="11" rx="3" fill="var(--border-strong)" />
        <g stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
          <line x1="198" y1="145" x2="208" y2="145" />
          <line x1="198" y1="150" x2="208" y2="150" />
        </g>
        <rect x="220" y="142" width="44" height="11" rx="3" fill="var(--border-strong)" />

        {/* verified seal */}
        <circle cx="250" cy="190" r="32" fill="var(--accent)" opacity="0.12" style={{ animation: "af-blink 3.2s ease-in-out infinite" }} />
        <circle cx="250" cy="190" r="24" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M238 190 L247 200 L263 178" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </figure>
  );
}
