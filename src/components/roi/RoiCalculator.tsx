"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const WEEKS_PER_MONTH = 4.33;

function Slider({
  label,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[15px] font-medium text-fg">{label}</label>
        <span className="font-label text-[15px] font-semibold text-accent">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

export function RoiCalculator() {
  const t = useTranslations("roiPage");
  const locale = useLocale();
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(8);
  const [cost, setCost] = useState(25);
  const [autoPct, setAutoPct] = useState(70);

  const hoursMonth = people * hours * (autoPct / 100) * WEEKS_PER_MONTH;
  const savingMonth = hoursMonth * cost;
  const savingYear = savingMonth * 12;

  const intl = locale === "en" ? "en-US" : "es-ES";
  const currency = (n: number) =>
    new Intl.NumberFormat(intl, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(n));
  const number = (n: number) =>
    new Intl.NumberFormat(intl, { maximumFractionDigits: 0 }).format(
      Math.round(n),
    );

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(300px,380px)] lg:gap-12">
        {/* Inputs */}
        <div className="space-y-7">
          <Slider
            label={t("inputs.people")}
            value={people}
            display={number(people)}
            min={1}
            max={50}
            onChange={setPeople}
          />
          <Slider
            label={t("inputs.hours")}
            value={hours}
            display={number(hours)}
            min={1}
            max={40}
            onChange={setHours}
          />
          <Slider
            label={t("inputs.cost")}
            value={cost}
            display={`${currency(cost)}/h`}
            min={10}
            max={120}
            onChange={setCost}
          />
          <Slider
            label={t("inputs.automation")}
            value={autoPct}
            display={`${autoPct}%`}
            min={10}
            max={100}
            step={5}
            onChange={setAutoPct}
          />
        </div>

        {/* Results */}
        <div className="rounded-[var(--radius-lg)] border border-border border-l-2 border-l-accent bg-surface p-7 shadow-[var(--shadow)]">
          <span className="font-label text-[12.5px] font-medium uppercase tracking-[0.13em] text-accent">
            {t("results.title")}
          </span>

          <div className="mt-5">
            <div className="font-display text-[clamp(34px,5vw,46px)] font-bold leading-none tracking-[-0.02em] text-fg">
              {currency(savingMonth)}
            </div>
            <div className="mt-2 text-[14px] text-fg-muted">
              {t("results.savingMonth")}
            </div>
          </div>

          <hr className="my-6 border-border" />

          <dl className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[14px] text-fg-muted">
                {t("results.savingYear")}
              </dt>
              <dd className="font-display text-[20px] font-semibold text-fg">
                {currency(savingYear)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[14px] text-fg-muted">
                {t("results.hoursMonth")}
              </dt>
              <dd className="font-display text-[20px] font-semibold text-fg">
                {number(hoursMonth)} h
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-[13px] leading-[1.5] text-fg-faint">
            {t("results.note")}
          </p>
        </div>
      </div>

      <p className="mt-8 text-[13px] leading-[1.5] text-fg-faint">
        {t("disclaimer")}
      </p>

      <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-bg p-7 text-center shadow-[var(--shadow)] sm:p-8">
        <h2 className="font-display text-[clamp(20px,2.6vw,26px)] font-bold tracking-[-0.02em] text-balance">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.6] text-fg-muted">
          {t("ctaSubtitle")}
        </p>
        <Link
          href="/contacto?reason=consultoria&subject=automatizacion"
          className="mt-6 inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
        >
          {t("cta")} <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}
