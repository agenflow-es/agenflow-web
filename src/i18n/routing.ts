import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Always default to Spanish. Disabling detection means neither the
  // NEXT_LOCALE cookie nor the Accept-Language header influence the locale:
  // the root path always resolves to "es" and English must be chosen
  // explicitly (via /en or the language switcher).
  localeDetection: false,
});
