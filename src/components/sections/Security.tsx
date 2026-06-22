import { useTranslations } from "next-intl";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { ShieldVisual } from "@/components/visuals/ShieldVisual";

type Item = { name: string; desc: string };

export function Security() {
  const t = useTranslations("security");
  const items = t.raw("items") as Item[];

  return (
    <section id="security" className="border-t border-border">
      <Container className="py-[clamp(88px,12vw,168px)]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ShieldVisual />
          </Reveal>

          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
              {t("title")}
            </h2>
            <p className="mt-4 leading-[1.6] text-fg-muted">{t("subtitle")}</p>

            <ul className="mt-8 space-y-5">
              {items.map((item, i) => (
                <li key={i} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-[var(--accent-soft)] text-accent">
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
                  <div>
                    <h3 className="font-display text-[18px] font-semibold">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[14.5px] leading-[1.55] text-fg-muted">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
