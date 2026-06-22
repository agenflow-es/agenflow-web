import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Sectors } from "@/components/sections/Sectors";
import { Security } from "@/components/sections/Security";
import { WhyUs } from "@/components/sections/WhyUs";
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
      <Services />
      <Sectors />
      <Security />
      <WhyUs />
      <FinalCta />
      <Faq />
    </>
  );
}
