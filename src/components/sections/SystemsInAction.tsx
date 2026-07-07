import {
  Receipt,
  ArrowLeftRight,
  ScanSearch,
  CircleCheckBig,
  Inbox,
  MessagesSquare,
  CalendarCheck,
  Handshake,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SystemFlow, type FlowStage } from "@/components/visuals/SystemFlow";

/**
 * Section — "Sistemas en acción": 2 high-level example flows (judgment,
 * orchestration, autonomy — not trigger→action toy automations). Sits before the
 * product proof (Replo/FincAI). Copy inline for now; moves to messages later.
 */
type Flow = {
  tag: string;
  title: string;
  stages: FlowStage[];
  // two-beat close: `lead` lighter, `punch` bold, on separate lines
  remate: { lead: string; punch: string };
};

const FLOWS: Flow[] = [
  {
    tag: "Administración · despachos",
    title: "El cierre de mes que se revisa solo",
    stages: [
      { kicker: "Entra", icon: Receipt, text: "Cada día entran facturas, cobros y albaranes." },
      { kicker: "Cruza", icon: ArrowLeftRight, text: "El sistema los cruza entre sí y contra el banco." },
      {
        kicker: "Investiga",
        icon: ScanSearch,
        text: "Encuentra lo que no cuadra —un duplicado, un cobro que falta, un precio cambiado— y resuelve la diferencia.",
      },
      {
        kicker: "Resultado",
        icon: CircleCheckBig,
        text: "Te levanta la mano solo en lo que necesita tu criterio.",
      },
    ],
    remate: { lead: "Tu equipo pone el criterio.", punch: "El sistema, las horas." },
  },
  {
    tag: "El inmueble",
    title: "El comercial que atiende a cada lead, al instante",
    stages: [
      {
        kicker: "Entra",
        icon: Inbox,
        text: "Un lead llega por web, Idealista o WhatsApp — a la hora que sea.",
      },
      {
        kicker: "Conversa",
        icon: MessagesSquare,
        text: "Un agente conversa, entiende qué busca y lo cualifica.",
      },
      {
        kicker: "Orquesta",
        icon: CalendarCheck,
        text: "Lo cruza con tu cartera de pisos o inmuebles y agenda la visita en tu calendario.",
      },
      {
        kicker: "Resultado",
        icon: Handshake,
        text: "Ningún lead se queda sin respuesta. Cada oportunidad de venta, atendida al momento.",
      },
    ],
    remate: { lead: "Atiende y hace seguimiento 24/7.", punch: "Tú entras a cerrar." },
  },
];

export function SystemsInAction() {
  return (
    <section className="bg-bg py-[clamp(64px,10vw,120px)]">
      <Container>
        <Reveal>
          <Eyebrow>Sistemas en acción</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            Así se ve una automatización por dentro.
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28">
          {FLOWS.map((flow, i) => (
            <div key={i}>
              <Reveal>
                <div className="mb-12">
                  <span className="font-label text-[12px] uppercase tracking-[0.13em] text-accent">
                    {flow.tag}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(20px,2.6vw,28px)] font-semibold tracking-[-0.015em] text-fg">
                    {flow.title}
                  </h3>
                </div>
              </Reveal>

              <SystemFlow stages={flow.stages} />

              <Reveal>
                <p className="mx-auto mt-12 max-w-[34ch] text-center font-display text-[clamp(19px,2.4vw,26px)] font-semibold leading-snug tracking-[-0.015em]">
                  <span className="text-fg-muted">{flow.remate.lead}</span>
                  <br />
                  <span className="text-fg">{flow.remate.punch}</span>
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
