import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Sectors } from "@/components/sections/Sectors";
import { Process } from "@/components/sections/Process";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Trust } from "@/components/sections/Trust";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Sectors />
      <Process />
      <PricingTeaser />
      <Trust />
      <FinalCta />
      <Faq />
    </>
  );
}
