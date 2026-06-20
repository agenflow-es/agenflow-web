import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/primitives";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];

  return (
    <section id="faq" className="border-t border-border">
      <Container className="max-w-[840px] py-[clamp(88px,12vw,168px)]">
        <h2 className="mx-auto mb-11 max-w-[680px] text-center font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
          {t("title")}
        </h2>
        <div>
          {items.map((item, i) => (
            <details
              key={i}
              className="group border-t border-border py-5 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[19px] font-semibold">
                {item.q}
                <span className="text-[22px] text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3.5 leading-[1.6] text-fg-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
