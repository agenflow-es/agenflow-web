"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { subscribeNewsletter } from "@/lib/newsletter-actions";

export function NewsletterForm() {
  const t = useTranslations("newsletterPage.form");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const schema = z.object({
    email: z.string().email(t("errors.email")),
    consent: z.boolean().refine((v) => v === true, {
      message: t("errors.consent"),
    }),
    // Honeypot: stays empty for real users; bots that fill it are dropped server-side.
    website: z.string().optional(),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: Values) {
    setStatus("idle");
    const res = await subscribeNewsletter(values);
    if (res.ok) {
      setStatus("ok");
      reset();
    } else {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-[var(--radius)] border border-border bg-transparent px-4 py-3 text-sm text-fg outline-none transition focus:border-accent";

  // Subscribed — replace the form with the success message.
  if (status === "ok") {
    return (
      <p role="status" className="text-[15px] font-medium leading-[1.5] text-fg">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            {t("email")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className={fieldClass}
            {...register("email")}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 rounded-[var(--radius)] bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {isSubmitting ? t("sending") : t("submit")}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-email-error" role="alert" className="mt-2 text-xs text-red-500">
          {errors.email.message}
        </p>
      )}

      <label className="mt-4 flex items-start gap-2.5 text-[13px] leading-[1.5] text-fg-muted">
        <input
          type="checkbox"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "newsletter-consent-error" : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          {...register("consent")}
        />
        <span>
          {t.rich("consent", {
            privacy: (chunks) => (
              <Link
                href="/privacidad"
                className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition hover:decoration-accent"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {errors.consent && (
        <p id="newsletter-consent-error" role="alert" className="mt-2 text-xs text-red-500">
          {errors.consent.message}
        </p>
      )}

      {/* Honeypot: off-screen + aria-hidden so humans never see or tab to it. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <input
          id="newsletter-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-500">
          {t("error")}
        </p>
      )}
    </form>
  );
}
