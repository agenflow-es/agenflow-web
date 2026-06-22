import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { CapabilityOrbit } from "@/components/visuals/CapabilityOrbit";

type Item = { name: string; desc: string; href: string };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];
  const capabilities = t.raw("capabilities") as string[];

  return (
    <section id="services" className="scroll-mt-24 border-t border-border">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("title")}
              </h2>
            </div>
            <div className="mx-auto w-full max-w-[560px]">
              <CapabilityOrbit items={capabilities} />
            </div>
          </div>

          <div className="mt-14 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1.5 hover:border-accent"
              >
                <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[var(--accent-soft)] font-label text-[13px] font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-[1.55] text-fg-muted">
                  {item.desc}
                </p>
                <span className="mt-[18px] inline-block text-sm font-semibold text-accent">
                  {t("more")} →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
