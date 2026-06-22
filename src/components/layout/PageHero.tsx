import { Container, Eyebrow } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { HeroSideGlows } from "@/components/visuals/HeroSideGlows";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };

const MAX_W: Record<number, string> = {
  820: "max-w-[820px]",
  860: "max-w-[860px]",
};

function CtaButton({ cta, primary }: { cta: Cta; primary?: boolean }) {
  const className = primary
    ? "inline-flex items-center gap-2.5 rounded-[var(--radius)] bg-accent px-[26px] py-[15px] font-medium text-accent-fg transition hover:-translate-y-0.5"
    : "inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-border-strong px-[26px] py-[15px] font-medium text-fg transition hover:bg-surface";
  const content = primary ? (
    <>
      {cta.label} <span className="text-lg">→</span>
    </>
  ) : (
    cta.label
  );
  // In-page anchors (#…) use a plain <a>; routes use the i18n Link.
  return cta.href.startsWith("#") ? (
    <a href={cta.href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}

// Shared hero for inner pages (not the home hero). One canonical h1 scale and
// max-width; 0, 1 or 2 CTAs.
export function PageHero({
  eyebrow,
  title,
  subtitle,
  cta,
  ctaSecondary,
  maxWidth = 860,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta?: Cta;
  ctaSecondary?: Cta;
  maxWidth?: 820 | 860;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroSideGlows />
      <Container
        className={cn(
          "relative py-[clamp(64px,10vw,120px)] text-center",
          MAX_W[maxWidth],
        )}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.07] tracking-[-0.022em] text-balance">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-[660px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-fg-muted text-pretty">
          {subtitle}
        </p>
        {(cta || ctaSecondary) && (
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            {cta && <CtaButton cta={cta} primary />}
            {ctaSecondary && <CtaButton cta={ctaSecondary} />}
          </div>
        )}
      </Container>
    </section>
  );
}
