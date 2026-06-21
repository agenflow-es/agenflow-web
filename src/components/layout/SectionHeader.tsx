import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/primitives";

// Shared section header (eyebrow + h2 + optional intro). Standardizes the
// type scale and rhythm; `align` and `maxWidth` stay per-call.
const MAX_W: Record<number, string> = {
  680: "max-w-[680px]",
  720: "max-w-[720px]",
  760: "max-w-[760px]",
};

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  maxWidth?: 680 | 720 | 760;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  maxWidth = 720,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        MAX_W[maxWidth],
        centered && "mx-auto mb-12 text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 font-display font-bold tracking-[-0.022em] text-balance",
          centered
            ? "text-[clamp(26px,3.4vw,42px)] leading-[1.1]"
            : "text-[clamp(26px,3.4vw,40px)] leading-[1.12]",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 leading-[1.6] text-fg-muted text-pretty">{intro}</p>
      )}
    </div>
  );
}
