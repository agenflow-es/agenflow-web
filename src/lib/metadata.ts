import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Per-page metadata helper. Titles/descriptions live under the `pageMeta`
// namespace keyed by page. metadataBase + the title template are set once in
// the root layout, so this only fills title/description + canonical/alternates.
export async function buildMetadata({
  locale,
  key,
  path,
}: {
  locale: string;
  key: string;
  path: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return {
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { es: `/es${path}`, en: `/en${path}` },
    },
  };
}
