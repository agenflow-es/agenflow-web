import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Shared horizontal step/milestone timeline. Numbered nodes on a connecting
// line, the last one optionally highlighted (accent fill + check) to mark the
// payoff. Server component: pure CSS, theme-aware via tokens; stacks on mobile.
type Step = { title: string; sub?: string };

export function StepTimeline({
  items,
  highlightLast = false,
}: {
  items: Step[];
  highlightLast?: boolean;
}) {
  return (
    <ol
      className="relative grid gap-x-6 gap-y-9 sm:grid-cols-3"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}
    >
      {/* connector line (desktop) */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-6 hidden h-px sm:block"
        style={{
          left: `${50 / items.length}%`,
          right: `${50 / items.length}%`,
          background:
            "linear-gradient(to right, var(--border-strong), var(--accent), var(--border-strong))",
          opacity: 0.6,
        }}
      />
      {items.map((it, i) => {
        const last = highlightLast && i === items.length - 1;
        return (
          <li key={i} className="relative flex flex-col items-center text-center">
            <span
              className={cn(
                "relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border font-label text-[15px] font-semibold",
                last
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface text-fg",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-[-6px] rounded-full border border-accent opacity-30"
                style={{
                  animation: "af-blink 3s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
              {last ? <Check className="h-5 w-5" /> : i + 1}
            </span>
            <h3 className="mt-4 font-display text-[17px] font-semibold leading-[1.25]">
              {it.title}
            </h3>
            {it.sub && (
              <p className="mt-1.5 max-w-[26ch] text-[14px] leading-[1.5] text-fg-muted">
                {it.sub}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
