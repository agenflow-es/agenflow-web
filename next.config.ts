import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow MDX files to be imported (blog posts live in src/content/blog).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // 301s del rediseño: /precios y la vieja consultoría-ia van a /consultoria;
  // desarrollo-software se renombró a software-medida. Locale-prefixed (es|en).
  async redirects() {
    return [
      // Español solo por ahora: /en/* → /es/* (TEMPORAL, para reactivar inglés
      // más adelante sin que Google haya cacheado un 301).
      {
        source: "/en/:path*",
        destination: "/es/:path*",
        permanent: false,
      },
      {
        source: "/en",
        destination: "/es",
        permanent: false,
      },
      {
        source: "/:locale(es|en)/precios",
        destination: "/:locale/consultoria",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/servicios/consultoria-ia",
        destination: "/:locale/consultoria",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/servicios/desarrollo-software",
        destination: "/:locale/servicios/software-medida",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/sectores/inmobiliario-construccion",
        destination: "/:locale/inmueble",
        permanent: true,
      },
    ];
  },
  // Páginas-para-leads (propuestas, maquetas) las sirve un servidor externo
  // aislado. agenflow.es solo hace de proxy fino: ni credenciales ni datos de
  // cliente. Gated: sin la var, no hay rewrite.
  //
  // AÑADIR UN TIPO NUEVO = AÑADIR UNA PALABRA a esta lista Y OTRA al `matcher`
  // de src/proxy.ts. El segmento viaja como parámetro, así que el destino no hay
  // que tocarlo nunca, pero el matcher del proxy SÍ: el proxy corre antes que
  // estos rewrites y, si no está excluido, next-intl redirige a /es/... y esto
  // ya no casa. La lista viva es `REGISTRY` en agenflow-lead-pages/lib/registry.ts;
  // esta la repite porque next.config no puede importar de otro proyecto.
  async rewrites() {
    const origin = process.env.LEAD_PAGES_ORIGIN;
    if (!origin) return [];

    const TIPOS_LEAD_PAGES = ["propuesta-web", "muestra-web"];

    return {
      beforeFiles: [
        {
          source: `/:tipo(${TIPOS_LEAD_PAGES.join("|")})/:slug`,
          destination: `${origin}/:tipo/:slug`,
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withMDX = createMDX();

export default withNextIntl(withMDX(nextConfig));
