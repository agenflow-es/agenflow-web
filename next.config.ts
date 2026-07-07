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
  // Páginas-para-leads (propuestas) las sirve un servidor externo aislado.
  // agenflow.es solo hace de proxy fino. Gated: sin la var, no hay rewrite.
  async rewrites() {
    const origin = process.env.LEAD_PAGES_ORIGIN;
    if (!origin) return [];
    return {
      beforeFiles: [
        {
          source: "/propuesta-web/:slug",
          destination: `${origin}/propuesta-web/:slug`,
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withMDX = createMDX();

export default withNextIntl(withMDX(nextConfig));
