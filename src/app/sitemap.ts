import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const paths = [
  "",
  "/servicios",
  "/servicios/consultoria-ia",
  "/servicios/automatizacion-ia",
  "/servicios/desarrollo-software",
  "/servicios/presencia-online",
  "/sectores/legal",
  "/sectores/inmobiliario-construccion",
  "/precios",
  "/nosotros",
  "/contacto",
  "/privacidad",
  "/aviso-legal",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales, defaultLocale } = routing;

  return paths.map((path) => ({
    url: `${siteConfig.url}/${defaultLocale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
      ),
    },
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
