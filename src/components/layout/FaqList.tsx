import { Container } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

// Shared FAQ accordion. `home` is the full home-page variant; `page` is the
// inner-page variant placed before the closing CTA.
export function FaqList({
  title,
  items,
  variant = "page",
}: {
  title: string;
  items: FaqItem[];
  variant?: "home" | "page";
}) {
  const home = variant === "home";
  return (
    <section
      id={home ? "faq" : undefined}
      className={cn("border-border", home ? "border-t" : "border-b")}
    >
      <Container
        className={cn(
          "max-w-[840px]",
          home ? "py-[clamp(88px,12vw,168px)]" : "py-[clamp(72px,10vw,140px)]",
        )}
      >
        <h2 className="mx-auto mb-11 max-w-[680px] text-center font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
          {title}
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
