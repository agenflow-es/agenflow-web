"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AIInput } from "@/components/ui/ai-input";
import { checkAiVisibility } from "@/lib/ai-check-actions";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; answer: string }
  | { status: "error"; kind: string };

export function AiVisibilityCheck() {
  const t = useTranslations("presenciaPage.audit");
  const locale = useLocale();
  const [state, setState] = useState<State>({ status: "idle" });

  async function run(value: string) {
    setState({ status: "loading" });
    const res = await checkAiVisibility({ business: value, locale });
    if (res.ok && res.answer) {
      setState({ status: "done", answer: res.answer });
    } else {
      setState({ status: "error", kind: res.error ?? "failed" });
    }
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
      <AIInput
        placeholder={t("placeholder")}
        disabled={state.status === "loading"}
        onSubmit={run}
      />

      {state.status === "loading" && (
        <div
          role="status"
          className="mt-4 flex items-center gap-2.5 text-[14.5px] text-fg-muted"
        >
          <Loader2 className="h-4 w-4 animate-spin text-accent" />
          {t("loading")}
        </div>
      )}

      {state.status === "done" && (
        <div className="mt-4">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-label text-[11px] uppercase tracking-[0.12em] text-fg-faint">
              {t("answerLabel")}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <p className="rounded-[var(--radius-lg)] rounded-bl-sm border border-border bg-bg px-4 py-3 text-[14.5px] leading-[1.55] text-fg-muted">
            {state.answer}
          </p>
          <Link
            href="/contacto?subject=presencia"
            className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-accent transition hover:gap-2.5"
          >
            {t("resultCta")} <span aria-hidden>→</span>
          </Link>
        </div>
      )}

      {state.status === "error" && (
        <p role="alert" className="mt-4 text-[14px] text-fg-faint">
          {state.kind === "not_configured"
            ? t("errors.notConfigured")
            : state.kind === "rate_limited"
              ? t("errors.rateLimited")
              : t("errors.failed")}
        </p>
      )}

      <p className="mt-4 text-[12.5px] leading-[1.5] text-fg-faint">
        {t("disclaimer")}
      </p>
    </div>
  );
}
