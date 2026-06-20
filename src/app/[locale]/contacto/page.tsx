import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

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
      <ContactForm />
      <p className="mt-10 text-sm text-zinc-500">
        {t("emailLabel")}{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
          {siteConfig.contactEmail}
        </a>
      </p>
    </section>
  );
}
