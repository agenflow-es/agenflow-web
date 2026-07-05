import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DevShowcase } from "./DevShowcase";

// Dev-only playground for the motion primitives. Never indexed; 404s in prod.
export const metadata: Metadata = {
  title: "Dev · Primitivos de motion",
  robots: { index: false, follow: false },
};

export default async function DevPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(locale);
  return <DevShowcase />;
}
