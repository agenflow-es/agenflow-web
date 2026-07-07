"use client";

import { useId, useState } from "react";

/**
 * RoiEstimator — the Recursos ROI calculator, Línea B. The visitor sets their
 * own numbers (people, weekly hours on manual work, cost/hour, and the share
 * that can be automated) and sees the time and money they could get back per
 * year — plus what that means in full-time people freed to grow. Client-side
 * only: it shows the visitor's own figures, never our prices. Orientative.
 */
const WEEKS = 46; // working weeks/year (holidays discounted)
const FTE_HOURS = 1700; // ≈ hours in one full-time year

function fmt(n: number) {
  return new Intl.NumberFormat("es-ES").format(Math.round(n));
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14.5px] font-medium text-fg">
          {label}
        </label>
        <span className="font-display text-[18px] font-semibold tabular-nums text-accent">
          {value}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-accent"
      />
    </div>
  );
}

export function RoiEstimator() {
  const [people, setPeople] = useState(5);
  const [hours, setHours] = useState(8);
  const [cost, setCost] = useState(22);
  const [autoPct, setAutoPct] = useState(70);

  const hoursYear = people * hours * WEEKS * (autoPct / 100);
  const costYear = hoursYear * cost;
  const costMonth = costYear / 12;
  const fte = hoursYear / FTE_HOURS;

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-[clamp(22px,4vw,48px)]">
      <div className="grid gap-x-14 gap-y-10 md:grid-cols-2 md:items-center">
        {/* Inputs */}
        <div className="space-y-8">
          <Slider
            label="Personas en tareas repetitivas"
            value={people}
            min={1}
            max={40}
            onChange={setPeople}
          />
          <Slider
            label="Horas a la semana en esas tareas"
            value={hours}
            min={1}
            max={30}
            suffix=" h"
            onChange={setHours}
          />
          <Slider
            label="Coste medio por hora"
            value={cost}
            min={10}
            max={80}
            suffix=" €"
            onChange={setCost}
          />
          <Slider
            label="Parte que se puede automatizar"
            value={autoPct}
            min={10}
            max={100}
            step={5}
            suffix=" %"
            onChange={setAutoPct}
          />
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-accent/30 bg-[var(--accent-soft)] p-8 text-center">
          <div className="font-label text-[11px] uppercase tracking-[0.13em] text-accent">
            Recuperas al año
          </div>
          <div className="mt-3 font-display text-[clamp(36px,5.5vw,56px)] font-semibold leading-none tracking-[-0.02em] tabular-nums text-fg">
            {fmt(hoursYear)} h
          </div>
          <div className="mt-2 text-[14.5px] text-fg-muted">
            ≈ {fte.toFixed(1).replace(".", ",")} personas a jornada completa
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div>
              <div className="font-display text-[clamp(22px,3.4vw,30px)] font-semibold tabular-nums text-fg">
                {fmt(costYear)} €
              </div>
              <div className="mt-1 text-[12.5px] text-fg-muted">al año</div>
            </div>
            <div>
              <div className="font-display text-[clamp(22px,3.4vw,30px)] font-semibold tabular-nums text-fg">
                {fmt(costMonth)} €
              </div>
              <div className="mt-1 text-[12.5px] text-fg-muted">al mes</div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-[13px] leading-relaxed text-fg-muted">
        Estimación orientativa con tus propios números. La afinamos contigo en la
        consultoría.
      </p>
    </div>
  );
}
