import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Item = {
  label: string;
  name: string;
  desc: string;
  cta: string;
  href: string;
};

export function Sectors() {
  const t = useTranslations("sectors");
  const items = t.raw("items") as Item[];

  return (
    <section id="sectors" className="border-t border-border bg-surface">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <div className="mx-auto mb-14 max-w-[680px] text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08] tracking-[-0.022em] text-balance">
              {t("title")}
            </h2>
          </div>

          <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1.5 hover:border-accent"
              >
                <div
                  className="relative flex aspect-[16/10] items-end bg-surface-2 p-4"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg,var(--grid) 0 2px,transparent 2px 13px)",
                  }}
                >
                  <span className="rounded-[5px] border border-dashed border-border-strong bg-bg px-2.5 py-1.5 font-label text-[11px] uppercase tracking-[0.13em] text-fg-faint">
                    {item.name}
                  </span>
                </div>
                <div className="p-7">
                  <Eyebrow className="text-[12px]">{item.label}</Eyebrow>
                  <h3 className="mt-3 font-display text-[25px] font-semibold">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 leading-[1.55] text-fg-muted">
                    {item.desc}
                  </p>
                  <span className="mt-5 inline-block text-[14.5px] font-semibold text-accent">
                    {item.cta} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
