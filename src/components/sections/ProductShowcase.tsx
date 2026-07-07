import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Section — "Producto propio". Two products, each dressed in its OWN brand kit
 * (Replo: navy + terracotta + Fraunces; FincAI: ink/paper + blue + DM Serif) so
 * they read as real, distinct, serious products — the authority signal. We show
 * brand + outcome, never the mechanics (anti-copy: no screenshots, no features).
 *
 * The hex values below are the PRODUCTS' brand colors on purpose — not Agenflow
 * tokens. Replo card links to replo.es ("Ver producto"); FincAI has no link yet.
 */
const REPLO = { navy: "#15263B", terra: "#D9644A", sand: "#F4ECDF" };
const FINCAI = { ink: "#0E1418", paper: "#F6F4EE", blue: "#2554EB", muted: "#6B7280" };

function ReploWordmark() {
  return (
    <span
      className="inline-flex items-end text-[26px] font-semibold leading-none tracking-[-0.02em]"
      style={{ fontFamily: "var(--font-fraunces)", color: REPLO.sand }}
    >
      replo
      <span
        aria-hidden
        className="mb-1 ml-1 inline-block h-[7px] w-[7px] rounded-full"
        style={{ background: REPLO.terra }}
      />
    </span>
  );
}

function FincaiWordmark() {
  return (
    <span className="inline-flex items-center">
      <span
        className="text-[27px] leading-none"
        style={{ fontFamily: "var(--font-dmserif)", color: FINCAI.ink }}
      >
        Finc
      </span>
      <span
        aria-hidden
        className="mx-2 h-5 w-px"
        style={{ background: FINCAI.ink, opacity: 0.35 }}
      />
      <span
        className="text-[15px] font-semibold uppercase tracking-wide"
        style={{ fontFamily: "var(--font-inter)", color: FINCAI.ink }}
      >
        AI
      </span>
    </span>
  );
}

function ReploCard() {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[20px] p-8 sm:p-10"
      style={{ background: REPLO.navy }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-6 select-none text-[240px] leading-none"
        style={{ fontFamily: "var(--font-fraunces)", color: REPLO.sand, opacity: 0.05 }}
      >
        r
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
        style={{ background: REPLO.terra, opacity: 0.2 }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ReploWordmark />
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ borderColor: "rgba(244,236,223,0.25)", color: REPLO.sand }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: REPLO.terra }}
            />
            Operativo
          </span>
        </div>

        <p
          className="mt-10 max-w-[16ch] text-[clamp(24px,3vw,34px)] font-semibold leading-[1.12]"
          style={{ fontFamily: "var(--font-fraunces)", color: REPLO.sand }}
        >
          Para inmobiliarias que no dejan escapar ni un cliente.
        </p>
        <p
          className="mt-4 max-w-[40ch] text-[15px] leading-relaxed"
          style={{ color: REPLO.sand, opacity: 0.72 }}
        >
          Responder antes que nadie deja de depender de tener a alguien pendiente
          del móvil.
        </p>

        <a
          href="https://replo.es"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-[10px] px-5 py-3 text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
          style={{ background: REPLO.terra, color: REPLO.sand }}
        >
          Ver producto <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

function FincaiCard() {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[20px] border p-8 sm:p-10"
      style={{ background: FINCAI.paper, borderColor: "rgba(14,20,24,0.10)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-4 select-none text-[240px] leading-none"
        style={{ fontFamily: "var(--font-dmserif)", color: FINCAI.ink, opacity: 0.05 }}
      >
        F
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
        style={{ background: FINCAI.blue, opacity: 0.1 }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <FincaiWordmark />
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ borderColor: "rgba(14,20,24,0.18)", color: FINCAI.ink }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: FINCAI.blue }}
            />
            Próximamente
          </span>
        </div>

        <p
          className="mt-10 max-w-[16ch] text-[clamp(24px,3vw,34px)] leading-[1.14]"
          style={{ fontFamily: "var(--font-dmserif)", color: FINCAI.ink }}
        >
          La administración de fincas, por fin sin fricción.
        </p>
        <p
          className="mt-4 max-w-[40ch] text-[15px] leading-relaxed"
          style={{ color: FINCAI.muted }}
        >
          El día a día de tus fincas bajo control, sin ahogarse en papeleo.
        </p>

        <span
          className="mt-8 text-[12px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: FINCAI.blue }}
        >
          Lista de espera, muy pronto
        </span>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>Producto propio</Eyebrow>
          <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            Hacemos que el negocio del inmueble funcione mejor por dentro.
          </h2>
          <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-fg-muted">
            Productos nuestros para el mundo del inmueble: uno para inmobiliarias,
            otro para administración de fincas.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-2">
          <StaggerItem className="h-full">
            <ReploCard />
          </StaggerItem>
          <StaggerItem className="h-full">
            <FincaiCard />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
