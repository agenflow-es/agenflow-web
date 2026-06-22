import { useTranslations } from "next-intl";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { CapabilityOrbit } from "@/components/visuals/CapabilityOrbit";

export function About() {
  const t = useTranslations("about");
  const capabilities = t.raw("capabilities") as string[];

  return (
    <section>
      <Container className="max-w-[1140px] py-[clamp(88px,12vw,168px)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <p className="mt-5 font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.18] tracking-[-0.022em] text-balance">
              {t("body")}
            </p>
          </Reveal>
          <Reveal>
            <CapabilityOrbit items={capabilities} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
