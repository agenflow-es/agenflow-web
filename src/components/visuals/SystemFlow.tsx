import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FlowStage = {
  /** short mono label, e.g. "Entra", "Investiga", "Resultado" */
  kicker: string;
  text: string;
  icon: LucideIcon;
};

/**
 * SystemFlow — one scenario as a row of icon stages joined by a light "beam"
 * that flows between them (the fluidity). Horizontal on desktop, vertical on
 * mobile. The last stage is the outcome (solid accent). Pure CSS animation
 * (af-beam) so no JS; the global reduced-motion rule freezes it.
 */
function IconBadge({ icon: Icon, outcome }: { icon: LucideIcon; outcome: boolean }) {
  return (
    <div
      className={cn(
        "relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border",
        outcome
          ? "border-accent bg-accent text-accent-fg"
          : "border-border bg-surface text-accent",
      )}
    >
      <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
    </div>
  );
}

/** Horizontal beam: base hairline + a bright segment sweeping left → right. */
function BeamH() {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-8 z-0 h-0.5 w-full -translate-y-1/2 overflow-hidden"
    >
      <span className="absolute inset-0 bg-border-strong opacity-50" />
      <span
        className="absolute inset-y-0 w-2/5"
        style={{
          background:
            "linear-gradient(90deg,transparent,var(--accent),transparent)",
          animation: "af-beam 1.8s linear infinite",
        }}
      />
    </span>
  );
}

/** Vertical beam for the mobile stack. */
function BeamV() {
  return (
    <span
      aria-hidden
      className="absolute bottom-0 left-8 top-16 z-0 w-0.5 -translate-x-1/2 overflow-hidden"
    >
      <span className="absolute inset-0 bg-border-strong opacity-50" />
      <span
        className="absolute inset-x-0 h-2/5"
        style={{
          background:
            "linear-gradient(180deg,transparent,var(--accent),transparent)",
          animation: "af-beam-y 1.8s linear infinite",
        }}
      />
    </span>
  );
}

export function SystemFlow({ stages }: { stages: FlowStage[] }) {
  const n = stages.length;

  return (
    <>
      {/* desktop: icons in a row, beams between, text below */}
      <div
        className="hidden lg:grid"
        style={{ gridTemplateColumns: `repeat(${n},minmax(0,1fr))` }}
      >
        {stages.map((s, i) => (
          <div
            key={i}
            className="relative flex h-16 items-center justify-center"
          >
            {i < n - 1 && <BeamH />}
            <IconBadge icon={s.icon} outcome={i === n - 1} />
          </div>
        ))}
        {stages.map((s, i) => (
          <div key={i} className="px-4 pt-6 text-center">
            <div className="font-label text-[11px] uppercase tracking-[0.13em] text-accent">
              {s.kicker}
            </div>
            <p className="mt-1.5 text-[14px] leading-snug text-fg">{s.text}</p>
          </div>
        ))}
      </div>

      {/* mobile: vertical stack */}
      <div className="flex flex-col lg:hidden">
        {stages.map((s, i) => (
          <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
            {i < n - 1 && <BeamV />}
            <IconBadge icon={s.icon} outcome={i === n - 1} />
            <div className="pt-1.5">
              <div className="font-label text-[11px] uppercase tracking-[0.13em] text-accent">
                {s.kicker}
              </div>
              <p className="mt-1 text-[14.5px] leading-snug text-fg">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
