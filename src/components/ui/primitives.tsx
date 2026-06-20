import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1240px] px-[clamp(20px,5vw,48px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-label text-[12.5px] font-medium uppercase tracking-[0.13em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Agenflow isotipo — three stacked parallelograms. Fills follow the theme
// via the --iso-* tokens (light-on-dark in dark mode, color on light).
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="26"
      height="26"
      role="img"
      aria-label="Agenflow"
      className={cn("shrink-0", className)}
    >
      <polygon points="8,50 32,50 44,40 20,40" style={{ fill: "var(--iso-1)" }} />
      <polygon
        points="15,38 39,38 51,28 27,28"
        style={{ fill: "var(--iso-2)" }}
      />
      <polygon
        points="22,26 46,26 58,16 34,16"
        style={{ fill: "var(--iso-3)" }}
      />
    </svg>
  );
}
