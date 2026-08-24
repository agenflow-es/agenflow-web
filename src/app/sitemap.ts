import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { getPosts } from "@/content/blog/posts";

// Spanish-only for now: the sitemap lists the /es URLs (no EN alternates yet).
const paths = [
  "",
  "/servicios",
  "/servicios/automatizacion-ia",
  "/servicios/software-medida",
  "/servicios/presencia-online",
  "/consultoria",
  "/inmueble",
  "/nosotros",
  "/trabaja-con-nosotros",
  "/recursos",
  "/recursos/blog",
  "/recursos/newsletter",
  "/recursos/calculadora-roi",
  // Blog posts.
  ...getPosts(routing.defaultLocale).map((p) => `/recursos/blog/${p.slug}`),
  "/contacto",
  "/privacidad",
  "/aviso-legal",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { defaultLocale } = routing;

  return [
    ...paths.map((path) => ({
      url: `${siteConfig.url}/${defaultLocale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    // `/bot` va SIN prefijo de idioma y por eso no puede salir de `paths`, que
    // los prefija todos. No es una excepción cosmética: esa URL viaja en el
    // User-Agent del rastreador, es bilingüe en una sola página y no se puede
    // mover nunca. Ver src/app/bot/layout.tsx y el matcher de src/proxy.ts.
    {
      url: `${siteConfig.url}/bot`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];
}
