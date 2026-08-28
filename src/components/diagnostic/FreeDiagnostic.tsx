"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  runFreeDiagnostic,
  submitFreeDiagnosticReport,
} from "@/lib/free-diagnostic-actions";
import {
  DIAGNOSTICO_ESTADOS,
  TIPOS_NEGOCIO,
  type DiagnosticoEstado,
} from "@/lib/free-diagnostic-shared";

type CheckState =
  | { step: "idle" }
  | { step: "loading" }
  | { step: "result"; id: string; estado: DiagnosticoEstado; mensaje: string }
  | { step: "error"; kind: "invalid" | "not_configured" | "failed"; message?: string };

const ACTIVE_STYLES: Record<DiagnosticoEstado, string> = {
  poco_preparado: "border-transparent bg-red-500 text-white",
  en_progreso: "border-transparent bg-amber-500 text-amber-950",
  con_base: "border-transparent bg-accent text-accent-fg",
};

const IDLE_STYLES: Record<DiagnosticoEstado, string> = {
  poco_preparado: "border-red-500/25 text-fg-faint",
  en_progreso: "border-amber-500/25 text-fg-faint",
  con_base: "border-accent/25 text-fg-faint",
};

function StateBar({
  estado,
  labels,
}: {
  estado: DiagnosticoEstado;
  labels: Record<DiagnosticoEstado, string>;
}) {
  return (
    <div role="status" className="grid grid-cols-3 gap-2">
      {DIAGNOSTICO_ESTADOS.map((key) => {
        const isActive = key === estado;
        return (
          <div
            key={key}
            aria-current={isActive || undefined}
            className={`rounded-[var(--radius)] border px-2 py-2 text-center text-[11.5px] font-semibold uppercase tracking-[0.04em] transition ${
              isActive ? ACTIVE_STYLES[key] : IDLE_STYLES[key]
            }`}
          >
            {labels[key]}
          </div>
        );
      })}
    </div>
  );
}

function ReportForm({
  id,
  locale,
}: {
  id: string;
  locale: "es" | "en";
}) {
  const t = useTranslations("presenciaPage.freeDiagnostic.report");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const schema = z.object({
    email: z.string().trim().email(t("errors.email")),
    tipoNegocio: z.enum(TIPOS_NEGOCIO),
    website: z.string().optional(),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    const res = await submitFreeDiagnosticReport({ id, locale, ...values });
    setStatus(res.ok ? "sent" : "error");
  }

  const labelClass = "text-[13px] font-medium text-fg";
  const fieldClass =
    "mt-1.5 w-full rounded-[var(--radius)] border border-border bg-transparent px-3.5 py-2.5 text-sm text-fg outline-none transition placeholder:text-fg-faint focus:border-accent";
  const selectClass =
    "mt-1.5 w-full appearance-none rounded-[var(--radius)] border border-border bg-bg px-3.5 py-2.5 pr-9 text-sm text-fg outline-none transition focus:border-accent";

  if (status === "sent") {
    return (
      <p role="status" className="mt-5 text-[14.5px] font-medium leading-[1.5] text-fg">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 border-t border-border pt-5">
      <p className="text-[13.5px] font-medium text-fg">{t("heading")}</p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="fd-email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input
            id="fd-email"
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "fd-email-error" : undefined}
            className={fieldClass}
            {...register("email")}
          />
          {errors.email && (
            <p id="fd-email-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="fd-tipo-negocio" className={labelClass}>
            {t("businessTypeLabel")}
          </label>
          <div className="relative">
            <select
              id="fd-tipo-negocio"
              defaultValue=""
              aria-invalid={!!errors.tipoNegocio}
              aria-describedby={errors.tipoNegocio ? "fd-tipo-negocio-error" : undefined}
              className={selectClass}
              {...register("tipoNegocio")}
            >
              <option value="" disabled className="bg-bg text-fg-muted">
                {t("businessTypePlaceholder")}
              </option>
              {TIPOS_NEGOCIO.map((key) => (
                <option key={key} value={key} className="bg-bg text-fg">
                  {t(`businessTypes.${key}`)}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint"
            />
          </div>
          {errors.tipoNegocio && (
            <p id="fd-tipo-negocio-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {t("errors.businessType")}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: off-screen + aria-hidden so humans never see or tab to it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <input id="fd-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 w-full rounded-[var(--radius)] bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-accent-fg transition hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? t("sending") : t("cta")}
      </button>

      <p className="mt-2.5 text-xs leading-[1.5] text-fg-faint">
        {t.rich("privacy", {
          privacy: (chunks) => (
            <Link
              href="/privacidad"
              className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition hover:decoration-accent"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      {status === "error" && (
        <p role="alert" className="mt-2.5 text-[13px] text-red-500">
          {t("errors.failed")}
        </p>
      )}
    </form>
  );
}

export function FreeDiagnostic() {
  const t = useTranslations("presenciaPage.freeDiagnostic");
  const locale = useLocale() as "es" | "en";
  const [url, setUrl] = useState("");
  const [state, setState] = useState<CheckState>({ step: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim() || state.step === "loading") return;
    setState({ step: "loading" });
    const res = await runFreeDiagnostic({ url, locale });
    if (res.ok) {
      setState({ step: "result", id: res.id, estado: res.estado, mensaje: res.mensaje });
    } else {
      setState({ step: "error", kind: res.error, message: res.message });
    }
  }

  const stateLabels: Record<DiagnosticoEstado, string> = {
    poco_preparado: t("states.pocoPreparado"),
    en_progreso: t("states.enProgreso"),
    con_base: t("states.conBase"),
  };

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("urlPlaceholder")}
          disabled={state.step === "loading"}
          className="w-full flex-1 rounded-[var(--radius)] border border-border bg-transparent px-4 py-3 text-sm text-fg outline-none transition placeholder:text-fg-faint focus:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state.step === "loading" || !url.trim()}
          className="shrink-0 rounded-[var(--radius)] bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {state.step === "loading" ? t("checking") : t("submit")}
        </button>
      </form>

      {state.step === "loading" && (
        <div role="status" className="mt-4 flex items-center gap-2.5 text-[14.5px] text-fg-muted">
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-accent" />
          {t("loadingNotice")}
        </div>
      )}

      {state.step === "error" && (
        <p role="alert" className="mt-4 text-[14px] text-fg-faint">
          {state.kind === "not_configured"
            ? t("errors.notConfigured")
            : state.kind === "invalid"
              ? t("errors.invalid")
              : (state.message ?? t("errors.failed"))}
        </p>
      )}

      {state.step === "result" && (
        <div className="mt-5">
          <StateBar estado={state.estado} labels={stateLabels} />
          <p className="mt-4 text-[14.5px] leading-[1.55] text-fg-muted">{state.mensaje}</p>
          <ReportForm id={state.id} locale={locale} />
        </div>
      )}
    </div>
  );
}
