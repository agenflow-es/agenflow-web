import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

// Shared closing CTA section. `home` is the larger variant used once on the
// home page; `page` is the smaller one used across inner pages.
export function CtaSection({
  title,
  subtitle,
  cta,
  href = "/contacto?reason=consultoria",
  variant = "page",
}: {
  title: string;
  subtitle: string;
  cta: string;
  href?: string;
  variant?: "home" | "page";
}) {
  const home = variant === "home";
  return (
    <section className={cn("relative overflow-hidden", home && "border-t border-border")}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 120% at 50% 120%, var(--accent-soft), transparent 70%)",
        }}
      />
      <Container
        className={cn(
          "relative text-center",
          home
            ? "max-w-[820px] py-[clamp(72px,10vw,130px)]"
            : "max-w-[760px] py-[clamp(64px,9vw,120px)]",
        )}
      >
        <Reveal>
          <h2
            className={cn(
              "font-display font-bold tracking-[-0.022em] text-balance",
              home
                ? "text-[clamp(32px,5vw,58px)] leading-[1.06]"
                : "text-[clamp(28px,4vw,46px)] leading-[1.08]",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 text-fg-muted",
              home
                ? "max-w-[600px] text-[clamp(16px,1.6vw,20px)]"
                : "max-w-[560px] text-[clamp(16px,1.5vw,19px)]",
            )}
          >
            {subtitle}
          </p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[30px] py-4 text-[17px] font-semibold text-accent-fg transition hover:-translate-y-0.5"
          >
            {cta} <span className="text-lg">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
