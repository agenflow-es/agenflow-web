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

  return paths.map((path) => ({
    url: `${siteConfig.url}/${defaultLocale}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
