"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { sendContact } from "@/lib/contact-actions";

export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    company: z.string().optional(),
    message: z.string().min(10, t("errors.message")),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    setStatus("idle");
    const res = await sendContact(values);
    if (res.ok) {
      setStatus("ok");
      reset();
    } else {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-[var(--radius)] border border-border bg-transparent px-4 py-2.5 text-sm text-fg outline-none transition focus:border-accent";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="name">
          {t("name")}
        </label>
        <input id="name" className={fieldClass} {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="email">
          {t("email")}
        </label>
        <input id="email" type="email" className={fieldClass} {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="company">
          {t("company")}
        </label>
        <input id="company" className={fieldClass} {...register("company")} />
      </div>
      <div>
        <label className="text-sm font-medium text-fg" htmlFor="message">
          {t("message")}
        </label>
        <textarea id="message" rows={5} className={fieldClass} {...register("message")} />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-[var(--radius)] bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>
      {status === "ok" && (
        <p className="text-sm text-green-500">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">{t("error")}</p>
      )}
    </form>
  );
}
