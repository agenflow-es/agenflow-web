import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section — "Quién hay detrás". A summary of /nosotros: the founder's photo and a
 * mission pull-quote. Human credibility without lowering the level — a real,
 * solvent engineer behind a 2026 software company. Results/mission framing, not
 * tech-forward. Copy inline for now; moves to messages when wired to i18n.
 */
export function Founder() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>Quién hay detrás</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <figure className="m-0">
              <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[var(--radius-lg)] border border-border">
                <Image
                  src="/equipo/francisco.png"
                  alt="Francisco Javier Arias, fundador de Agenflow"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 320px"
                />
              </div>
              <figcaption className="mt-3 font-label text-[11px] uppercase tracking-[0.14em] text-fg-faint">
                Fundador · Ingeniero industrial
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <div>
              <blockquote className="m-0">
                <p className="font-display text-[clamp(22px,3.2vw,34px)] font-semibold leading-[1.22] tracking-[-0.02em] text-fg">
                  «El mundo digital cambia cada vez más rápido, y ahora con la
                  inteligencia artificial, todavía más. Mi trabajo es que tu pyme
                  siga compitiendo con ventaja.»
                </p>
              </blockquote>

              <div className="mt-7">
                <div className="text-[15px] font-semibold text-fg">
                  Francisco Javier Arias — Fundador
                </div>
                <p className="mt-1.5 max-w-[48ch] text-[14.5px] leading-relaxed text-fg-muted">
                  Ingeniero industrial. Más de 5 años de experiencia en
                  ingeniería, construcción y proyectos internacionales.
                </p>
              </div>

              <Link
                href="/nosotros"
                className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-accent hover:underline"
              >
                Conoce la historia <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
