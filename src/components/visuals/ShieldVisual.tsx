// Trust shield for the home Security section: a shield with a verified check,
// a flowing accent perimeter (reads as an active security scan) and a soft
// pulsing halo. Server component: pure SVG + globals.css keyframes,
// theme-aware via tokens.

const SHIELD =
  "M160 30 L280 80 L280 195 C280 280 160 332 160 332 C160 332 40 280 40 195 L40 80 Z";
const INNER =
  "M160 50 L262 92 L262 191 C262 260 160 310 160 310 C160 310 58 260 58 191 L58 92 Z";

export function ShieldVisual() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 320 360"
        role="img"
        aria-label="Seguridad y confidencialidad"
        className="mx-auto h-auto w-full max-w-[320px]"
      >
        {/* halo */}
        <ellipse
          cx="160"
          cy="186"
          rx="118"
          ry="138"
          fill="var(--accent)"
          opacity="0.1"
          style={{ animation: "af-blink 3.2s ease-in-out infinite" }}
        />
        {/* shield body */}
        <path
          d={SHIELD}
          fill="var(--bg-elev)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        {/* flowing accent perimeter (security scan) */}
        <path
          d={INNER}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="3 12"
          style={{ animation: "af-dash 1.1s linear infinite" }}
        />
        {/* verified check */}
        <path
          d="M120 178 L150 208 L210 138"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </figure>
  );
}
