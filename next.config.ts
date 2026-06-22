import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow MDX files to be imported (blog posts live in src/content/blog).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withMDX = createMDX();

export default withNextIntl(withMDX(nextConfig));
