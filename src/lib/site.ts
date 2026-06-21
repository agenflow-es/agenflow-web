export const siteConfig = {
  name: "Agenflow",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenflow.es",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@agenflow.es",
  linkedin: "https://www.linkedin.com/company/agenflow",
} as const;
