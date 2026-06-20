import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/primitives";
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
    <Container className="max-w-2xl py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {t("title")}
      </h1>
      <p className="mt-6 text-lg leading-[1.6] text-fg-muted">{t("body")}</p>
      <ContactForm />
      <p className="mt-10 text-sm text-fg-faint">
        {t("emailLabel")}{" "}
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="text-accent underline underline-offset-4"
        >
          {siteConfig.contactEmail}
        </a>
      </p>
    </Container>
  );
}
