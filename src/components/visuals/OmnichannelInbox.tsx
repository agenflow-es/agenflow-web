import { Building2, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/ui/primitives";
import type { ComponentType } from "react";

// Unified-inbox product mockup for the real-estate sector (replo): every
// channel landing in one place, with the AI agent replying underneath.
// Looks like a real product surface — deliberately not a flow diagram.
// Server component: theme-aware via tokens.

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  email: Mail,
  phone: Phone,
  portal: Building2,
};

type Row = { icon: string; channel: string; preview: string };

export function OmnichannelInbox({
  title,
  badge,
  rows,
  footer,
}: {
  title: string;
  badge: string;
  rows: Row[];
  footer: string;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg shadow-[var(--shadow)]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <span className="font-display text-[15px] font-semibold">{title}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-label text-[11px] font-medium text-accent">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent"
            style={{ animation: "af-blink 2.2s ease-in-out infinite" }}
          />
          {badge}
        </span>
      </div>

      {/* rows */}
      <ul>
        {rows.map((r, i) => {
          const Icon = ICONS[r.icon] ?? MessageCircle;
          return (
            <li
              key={i}
              className="flex items-center gap-3 border-b border-border px-5 py-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="font-label text-[11px] uppercase tracking-[0.08em] text-accent">
                  {r.channel}
                </span>
                <p className="truncate text-[14px] leading-[1.4] text-fg">
                  {r.preview}
                </p>
              </div>
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
              />
            </li>
          );
        })}
      </ul>

      {/* agent footer */}
      <div className="flex items-center gap-2.5 bg-surface px-5 py-3.5">
        <Logo className="h-5 w-5" />
        <span className="text-[13px] leading-[1.4] text-fg-muted">{footer}</span>
      </div>
    </div>
  );
}
