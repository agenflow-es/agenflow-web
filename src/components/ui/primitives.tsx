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

export function Logo() {
  return (
    <span className="relative inline-block h-[22px] w-[22px]">
      <span className="absolute inset-0 rounded-[6px] bg-accent opacity-90" />
      <span className="absolute left-[5px] top-[5px] h-3 w-3 rounded-[3px] bg-bg" />
      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-[2px] bg-accent" />
    </span>
  );
}
