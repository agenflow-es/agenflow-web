"use client";

import type { LucideIcon } from "lucide-react";
import {
  Receipt,
  ArrowLeftRight,
  BellRing,
  FileBarChart,
  TriangleAlert,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/**
 * AutomationLoop — adapted from an inbox component (looping task list). A card
 * with a vertical marquee of the real, repetitive tasks we take off your team's
 * plate, fading top/bottom. Línea B skin, honest copy (no invented metrics),
 * and it stops under prefers-reduced-motion.
 */
type Task = { icon: LucideIcon; title: string; sub: string };

const TASKS: Task[] = [
  { icon: Receipt, title: "Facturas", sub: "Lectura y registro automático" },
  { icon: ArrowLeftRight, title: "Datos entre CRM y ERP", sub: "Sincronizados, sin copiar y pegar" },
  { icon: BellRing, title: "Seguimientos", sub: "Recordatorios que no se escapan" },
  { icon: FileBarChart, title: "Informes", sub: "Listos cada semana, sin montar el Excel" },
  { icon: TriangleAlert, title: "Alertas", sub: "Aviso cuando algo necesita una persona" },
];

function Row({ icon: Icon, title, sub }: Task) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-[var(--accent-soft)] text-accent">
        <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
      </span>
      <div>
        <p className="text-[14px] font-semibold leading-tight text-fg">{title}</p>
        <p className="mt-0.5 text-[12.5px] leading-tight text-fg-muted">{sub}</p>
      </div>
    </div>
  );
}

export function AutomationLoop() {
  const rm = useReducedMotion();
  const rows = [...TASKS, ...TASKS];

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
      <div className="relative h-[340px] overflow-hidden">
        <motion.div
          className="absolute w-full"
          animate={rm ? undefined : { y: ["0%", "-50%"] }}
          transition={
            rm
              ? undefined
              : { repeat: Infinity, repeatType: "loop", duration: 16, ease: "linear" }
          }
        >
          {rows.map((t, i) => (
            <Row key={i} {...t} />
          ))}
        </motion.div>

        {/* fade top / bottom — same surface as the card */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface to-transparent" />
      </div>
    </div>
  );
}
