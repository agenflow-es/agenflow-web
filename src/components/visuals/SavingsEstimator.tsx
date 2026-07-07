"use client";

import { useId, useState } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";

/**
 * SavingsEstimator — "el valor". An interactive estimate: the owner sets their
 * own numbers (people, hours/week on manual work, cost/hour) and sees the time
 * and money the team could get back per year. Client-side inputs only — it
 * shows the visitor's own figures, never our prices. Orientative by design.
 */
const WEEKS = 46; // working weeks/year (holidays discounted)
const RECOVERY = 0.8; // realistic share of manual time reclaimed (rest = supervision)

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

export function SavingsEstimator() {
  const [people, setPeople] = useState(8);
  const [hours, setHours] = useState(8);
  const [cost, setCost] = useState(20);

  const hoursYear = people * hours * WEEKS * RECOVERY;
  const costYear = hoursYear * cost;
  const fte = hoursYear / 1700; // ≈ full-time equivalent

  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Eyebrow>El valor</Eyebrow>
        <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-fg">
          Ponle números a lo que recuperas.
        </h2>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-fg-muted">
          Mueve los valores con los datos de tu equipo y mira cuánto tiempo —y
          dinero— podéis recuperar al año.
        </p>

        <div className="mt-11 rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-[clamp(22px,4vw,48px)]">
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
                max={25}
                suffix=" h"
                onChange={setHours}
              />
              <Slider
                label="Coste medio por hora"
                value={cost}
                min={10}
                max={60}
                suffix=" €"
                onChange={setCost}
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
              <div className="mt-6 border-t border-border pt-5">
                <div className="font-display text-[clamp(24px,3.5vw,34px)] font-semibold tabular-nums text-fg">
                  {fmt(costYear)} €
                </div>
                <div className="mt-1 text-[13px] text-fg-muted">
                  en tiempo de tu equipo
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[13px] leading-relaxed text-fg-muted">
            Estimación orientativa con tus propios números. La afinamos contigo en
            la consultoría.
          </p>
        </div>
      </Container>
    </section>
  );
}
