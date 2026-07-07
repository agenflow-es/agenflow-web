import { Workflow, ArrowRight, ArrowDown } from "lucide-react";
import { Logo } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * ScaleToSystem — the "software a medida" escalation visual: one automation →
 * several → a bespoke system. Three ascending tiers (a staircase), the last in
 * accent, connected by arrows. Illustrates the section's message literally: when
 * your needs go beyond a couple of loose automations, you want a whole system.
 * Server component, no motion (calm on purpose — the earlier converging-beams
 * take didn't land). Real > abstract: recognizable flow chips + a mini platform.
 */
function FlowChip() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-[var(--accent-soft)] text-accent">
      <Workflow className="h-4 w-4" strokeWidth={1.7} aria-hidden />
    </span>
  );
}

function Tier({
  minH,
  accent,
  title,
  caption,
  children,
}: {
  minH: number;
  accent?: boolean;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div
        className={cn(
          "relative flex rounded-2xl border bg-gradient-to-b from-surface to-bg p-4",
          accent
            ? "border-accent/50 shadow-[0_24px_60px_-30px_color-mix(in_srgb,var(--accent)_50%,transparent)]"
            : "border-border",
        )}
        style={{ minHeight: minH }}
      >
        {accent && (
          <span
            aria-hidden
            className="absolute right-3 top-2.5 font-label text-[14px] leading-none text-accent"
          >
            +
          </span>
        )}
        {children}
      </div>
      <p className="mt-3.5 font-display text-[15px] font-semibold text-fg">
        {title}
      </p>
      <p className="mt-0.5 text-[13px] leading-snug text-fg-muted">{caption}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div
      aria-hidden
      className="flex justify-center text-accent lg:block lg:self-center"
    >
      <ArrowDown className="h-5 w-5 lg:hidden" strokeWidth={1.7} />
      <ArrowRight className="hidden h-5 w-5 lg:block" strokeWidth={1.7} />
    </div>
  );
}

export function ScaleToSystem() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
        <Tier
          minH={112}
          title="Una automatización"
          caption="Un proceso, resuelto."
        >
          <div className="flex w-full items-end">
            <FlowChip />
          </div>
        </Tier>

        <Arrow />

        <Tier
          minH={150}
          title="Varias"
          caption="Más procesos, aún sueltos."
        >
          <div className="flex w-full items-end gap-2">
            <FlowChip />
            <FlowChip />
            <FlowChip />
          </div>
        </Tier>

        <Arrow />

        <Tier
          minH={200}
          accent
          title="Un sistema a medida"
          caption="Todo junto, hecho para ti."
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-accent/30 bg-[var(--accent-soft)] text-accent">
                <Logo className="h-4 w-4" />
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-fg-muted">
                Tu sistema
              </span>
            </div>
            <div className="mt-auto space-y-1.5 pt-4">
              {[100, 82, 92].map((w, i) => (
                <div
                  key={i}
                  className="rounded-md border border-border bg-surface px-2 py-1.5"
                  style={{ width: `${w}%` }}
                >
                  <span className="block h-1.5 rounded-full bg-accent/25" />
                </div>
              ))}
            </div>
          </div>
        </Tier>
      </div>
    </div>
  );
}
