"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "af-cookie-notice";

// Purely informational notice: the site uses only strictly-necessary technical
// cookies (locale + theme), so no prior consent is required. The banner just
// informs and is dismissed once, remembered in localStorage.
//
// State is read via useSyncExternalStore so there is no setState-in-effect and
// no SSR/hydration flash: the server snapshot hides it, the client snapshot
// reads localStorage, and dismissing dispatches a same-tab event to re-read.

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_KEY, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_KEY, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ? "dismissed" : "visible";
  } catch {
    return "visible";
  }
}

function getServerSnapshot() {
  return "dismissed" as const;
}

function dismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore persistence failure (e.g. private mode)
  }
  window.dispatchEvent(new Event(STORAGE_KEY));
}

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (state === "dismissed") return null;

  return (
    <div
      role="region"
      aria-label={t("aria")}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-[680px] flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[var(--shadow)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <p className="text-[13.5px] leading-[1.5] text-fg-muted">
          {t("text")}{" "}
          <Link
            href="/cookies"
            className="font-semibold text-accent underline-offset-2 transition hover:underline"
          >
            {t("more")}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 self-start rounded-[var(--radius)] bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-fg transition hover:-translate-y-0.5 sm:self-auto"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
