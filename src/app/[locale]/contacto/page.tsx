import { getTranslations, setRequestLocale } from "next-intl/server";

// TODO: sustituir email placeholder por el de contacto definitivo
// TODO: formulario real (React Hook Form + Zod + Resend)
const CONTACT_EMAIL = "hola@agenflow.es";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{t("body")}</p>
      <p className="mt-10 text-sm text-zinc-500">
        {t("emailLabel")}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  );
}
