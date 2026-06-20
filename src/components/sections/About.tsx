import { useTranslations } from "next-intl";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const t = useTranslations("about");

  return (
    <section>
      <Container className="max-w-[1100px] py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <p className="mt-5 font-display text-[clamp(28px,3.8vw,46px)] font-bold leading-[1.18] tracking-[-0.022em] text-balance">
            {t("body")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
