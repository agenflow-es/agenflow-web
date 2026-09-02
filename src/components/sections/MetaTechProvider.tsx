import Image from "next/image";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section — franja de confianza bajo el hero: el sello oficial "Meta Tech
 * Provider". Banda fina sobre `bg-surface` para separarla tonalmente del hero
 * y del PainBlock, que van sobre `bg-bg`.
 *
 * El badge se sirve en dos variantes del mismo PNG transparente: la de tinta
 * (#1C2B33) para el tema claro y una invertida con el texto en blanco para el
 * oscuro. El isotipo azul es idéntico en ambas — solo cambia el color del
 * texto, nunca el logotipo. El intercambio lo hace CSS por `data-theme` en
 * globals.css (`.meta-badge-*`), igual que los iconos del ThemeToggle: aquí no
 * sirve el variante `dark:` de Tailwind porque los tokens siguen a
 * `data-theme`, no a la clase `.dark`.
 *
 * Copy inline, como el resto de secciones de la home.
 */

// Dimensiones intrínsecas del PNG; el tamaño de render lo fija BADGE_SIZE, en
// un solo sitio, para que las dos variantes no puedan divergir.
const BADGE = { width: 637, height: 187 };
const BADGE_SIZE = "h-auto w-[124px] sm:w-[148px]";
const BADGE_ALT = "Meta Tech Provider";

export function MetaTechProvider() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-[clamp(28px,4vw,40px)]">
        <Reveal className="flex flex-col items-center gap-3.5 text-center">
          <Image
            {...BADGE}
            alt={BADGE_ALT}
            src="/brands/meta/meta-tech-provider.png"
            className={`meta-badge-light ${BADGE_SIZE}`}
          />
          <Image
            {...BADGE}
            alt={BADGE_ALT}
            src="/brands/meta/meta-tech-provider-reverse.png"
            className={`meta-badge-reverse ${BADGE_SIZE}`}
          />

          <span className="font-label text-[11.5px] uppercase tracking-[0.14em] text-label-adaptive">
            Proveedor de tecnología oficial
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
