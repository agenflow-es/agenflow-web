import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Item = { name: string; desc: string; href: string };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section id="services" className="border-t border-border">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <div className="mx-auto mb-14 max-w-[680px] text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08] tracking-[-0.022em] text-balance">
              {t("title")}
            </h2>
          </div>

          <div className="mx-auto grid max-w-[1080px] gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group block rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1.5 hover:border-accent"
              >
                <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[var(--accent-soft)] font-label text-[13px] font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[21px] font-semibold">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.55] text-fg-muted">
                  {item.desc}
                </p>
                <span className="mt-[18px] inline-block text-sm font-semibold text-accent">
                  {item.name} →
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/servicios/presencia-online"
            className="mx-auto mt-[18px] flex max-w-[1080px] flex-wrap items-center gap-[18px] rounded-[var(--radius-lg)] border border-border bg-surface px-[26px] py-[22px] shadow-[var(--shadow)] transition hover:border-accent"
          >
            <span className="font-label text-[13px] font-semibold text-accent">
              +
            </span>
            <span className="min-w-[220px] flex-1 text-[15px] text-fg-muted">
              {t("complementary")}
            </span>
            <span className="text-[14.5px] font-semibold text-accent">
              {t("complementaryCta")} →
            </span>
          </Link>

          <div className="mt-10 text-center">
            <Link
              href="/servicios"
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              {t("cta")} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
