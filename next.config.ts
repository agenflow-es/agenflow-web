import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow MDX files to be imported (blog posts live in src/content/blog).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
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
