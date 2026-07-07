import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";

/**
 * Section 2 — the pain. Names the problem in the owner's own language, before we
 * sell anything (the pattern the best sites use: Morningside, XRay). Left-aligned
 * header + a ruled grid of recognisable scenes, then a bridge line into the system
 * (section 3). No blueprint background here — clean, the words do the work.
 *
 * Copy inline for now; moves to messages when the home is wired to i18n.
 */
const SCENES = [
  "Alguien teclea a mano las facturas y los pedidos que entran cada día.",
  "Un cliente pregunta a las 22:00. Nadie lo ve hasta mañana — y ya ha escrito a otros tres.",
  "Los mismos datos viven en cinco sitios, y ninguno cuadra con el otro.",
  "El informe de cada mes se arma copiando y pegando de aquí y de allá.",
  "Un vencimiento o un seguimiento se lleva de memoria… hasta que se escapa.",
  "Cada tarea parece pequeña. Sumadas, te frenan.",
];

export function PainBlock() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>¿Te suena?</Eyebrow>
          <h2 className="mt-4 max-w-[19ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            Tu negocio funciona. Por dentro, se sostiene a base de trabajo manual.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid sm:grid-cols-2 sm:gap-x-12">
          {SCENES.map((scene, i) => (
            <StaggerItem
              key={i}
              className="flex gap-4 border-t border-border py-6"
            >
              <span aria-hidden className="mt-3 h-px w-6 flex-none bg-accent" />
              <p className="text-[16px] leading-relaxed text-fg">{scene}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <TextReveal
          text={"No es culpa de tu equipo.\nEs falta de sistema."}
          className="mx-auto max-w-[24ch] text-center font-display text-[clamp(24px,4vw,40px)] font-semibold leading-[1.2] tracking-[-0.02em] text-fg"
          containerClassName="mt-8"
        />
      </Container>
    </section>
  );
}
