// Isometric layered stack for the SaaS-studio model: sector knowledge →
// automation + AI → product, building upward. Echoes the Agenflow isotipo
// (three stacked slabs). Server component: pure SVG, theme-aware via tokens;
// the top (product) layer is accent-filled with a soft pulsing halo.

const CX = 150;
const W = 110; // half width
const D = 52; // half depth
const H = 20; // thickness
// Top-vertex Y per layer, bottom → top.
const TOP_Y = [240, 155, 70];

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

export function LayeredStack({ layers }: { layers: Layer[] }) {
  const items = layers.slice(0, 3);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 500 380"
        role="img"
        aria-label={items.map((l) => l.name).join(" → ")}
        className="h-auto w-full"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {items.map((layer, i) => {
          const cy = TOP_Y[i];
          const isTop = i === items.length - 1;
          const labelY = cy + D;
          const top = isTop ? "var(--accent)" : "var(--bg-elev2)";
          const left = isTop ? "var(--accent)" : "var(--bg-elev)";
          const right = isTop ? "var(--accent)" : "var(--bg)";
          return (
            <g key={i}>
              {isTop && (
                <ellipse
                  cx={CX}
                  cy={cy + D}
                  rx={W + 22}
                  ry={D + 14}
                  fill="var(--accent)"
                  opacity="0.16"
                  style={{ animation: "af-blink 3s ease-in-out infinite" }}
                />
              )}
              <path d={leftFace(cy)} fill={left} opacity={isTop ? 0.8 : 1} stroke="var(--border)" />
              <path d={rightFace(cy)} fill={right} opacity={isTop ? 0.65 : 1} stroke="var(--border)" />
              <path d={topFace(cy)} fill={top} stroke={isTop ? "var(--accent)" : "var(--border-strong)"} />

              {/* connector arrow to the layer above */}
              {i < items.length - 1 && (
                <path
                  d={`M ${CX} ${cy - 6} l -5 9 h 10 Z`}
                  fill="var(--accent)"
                  opacity="0.8"
                  style={{ animation: "af-blink 2.4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
                />
              )}

              {/* label */}
              <text
                x={CX + W + 26}
                y={labelY - 4}
                fontSize="15"
                fontWeight="600"
                fill="var(--text)"
              >
                {layer.name}
              </text>
              <text
                x={CX + W + 26}
                y={labelY + 15}
                fontSize="12.5"
                fill="var(--text-muted)"
              >
                {layer.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
