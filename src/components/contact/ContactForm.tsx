"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { sendContact } from "@/lib/contact-actions";
import {
  CONTACT_SUBJECTS,
  DEFAULT_CONTACT_SUBJECT,
  type ContactSubject,
} from "@/lib/contact-subjects";

export function ContactForm({
  defaultSubject = DEFAULT_CONTACT_SUBJECT,
}: {
  defaultSubject?: ContactSubject;
}) {
  const t = useTranslations("contactPage.form");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorKind, setErrorKind] = useState<string>("failed");

  const schema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    company: z.string().optional(),
    subject: z.enum(CONTACT_SUBJECTS),
    message: z.string().min(10, t("errors.message")),
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
    defaultValues: { subject: defaultSubject },
  });

  async function onSubmit(values: Values) {
    setStatus("idle");
    const res = await sendContact(values);
    if (res.ok) {
      setStatus("ok");
      reset();
    } else {
      setErrorKind(res.error ?? "failed");
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-[var(--radius)] border border-border bg-transparent px-4 py-2.5 text-sm text-fg outline-none transition focus:border-accent";
  // Solid (non-transparent) background so the native option popup is legible in
  // dark mode; appearance-none drops the native arrow, so we add our own.
  const selectClass =
    "mt-1 w-full appearance-none rounded-[var(--radius)] border border-border bg-bg px-4 py-2.5 pr-10 text-sm text-fg outline-none transition focus:border-accent";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="name">
          {t("name")}
        </label>
        <input
          id="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="email">
          {t("email")}
        </label>
        <input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="company">
          {t("company")}
        </label>
        <input id="company" className={fieldClass} {...register("company")} />
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="subject">
          {t("subject")}
        </label>
        <div className="relative">
          <select id="subject" className={selectClass} {...register("subject")}>
            {CONTACT_SUBJECTS.map((key) => (
              <option key={key} value={key} className="bg-bg text-fg">
                {t(`subjects.${key}`)}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="message">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={5}
          maxLength={5000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={fieldClass}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>
      {/* Honeypot: off-screen + aria-hidden so humans never see or tab to it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-[var(--radius)] bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>
      <p className="text-xs leading-[1.5] text-fg-faint">
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
      {status === "ok" && (
        <p role="status" className="text-sm text-green-500">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {errorKind === "rate_limited" ? t("errorRate") : t("error")}
        </p>
      )}
    </form>
  );
}
