import { useTranslations } from "next-intl";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

type Item = { name: string; desc: string };

export function Security() {
  const t = useTranslations("security");
  const items = t.raw("items") as Item[];

  return (
    <section id="security" className="border-t border-border">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <Reveal>
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
              {t("title")}
            </h2>
            <p className="mt-4 leading-[1.6] text-fg-muted">{t("subtitle")}</p>
          </div>

          <div className="mx-auto grid max-w-[1000px] gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-[var(--accent-soft)] text-accent">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <h3 className="font-display text-[19px] font-semibold">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-[1.55] text-fg-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
