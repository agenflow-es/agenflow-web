import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Item = { name: string; desc: string };

export function Pricing() {
  const t = useTranslations("pricing");
  const items = t.raw("items") as Item[];

  return (
    <section id="pricing" className="border-t border-border">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-[42ch] leading-[1.6] text-fg-muted">
                {t("subtitle")}
              </p>
              <Link
                href="/precios"
                className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3.5 font-medium text-accent-fg transition hover:-translate-y-0.5"
              >
                {t("viewAll")} →
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-border bg-surface px-[22px] py-5"
                >
                  <div className="flex-1">
                    <div className="font-display text-[18px] font-semibold">
                      {item.name}
                    </div>
                    <div className="text-[13.5px] text-fg-faint">
                      {item.desc}
                    </div>
                  </div>
                  <Link
                    href="/contacto?reason=presupuesto"
                    className="whitespace-nowrap text-sm font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {t("cta")} →
                  </Link>
                </div>
              ))}
              <p className="mt-2 text-[13px] text-fg-faint">{t("note")}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
