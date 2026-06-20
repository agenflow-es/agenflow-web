import { useTranslations } from "next-intl";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Item = { name: string; desc: string };

export function WhyUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-surface">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08] tracking-[-0.022em] text-balance">
            {t("title")}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {items.map((item, i) => (
              <div key={i} className="border-l-2 border-accent pl-5">
                <h3 className="font-display text-[20px] font-semibold">
                  {item.name}
                </h3>
                <p className="mt-2 leading-[1.55] text-fg-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
