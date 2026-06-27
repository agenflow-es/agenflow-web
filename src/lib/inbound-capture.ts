// Captura inbound 24/7 en el SaaS interno: además de Resend (server action), cada
// envío del formulario de contacto hace un POST a la Edge Function de captura
// (Supabase), que persiste la submission cruda y la promueve a company por trigger.
//
// CLIENT-SAFE a propósito (lo llama ContactForm, un client component): no importa
// "server-only", solo el tipo/constantes puras de contact-subjects. El fetch corre en
// el NAVEGADOR -> la URL es NEXT_PUBLIC_ (la Edge Function es pública e Origin-gated;
// no lleva credenciales). Best-effort: si falla, NO afecta a Resend ni a la UI.
import type { ContactSubject } from "@/lib/contact-subjects";

// Mapa EXPLÍCITO clave-del-form -> clave de `interes` que espera la Edge Function
// (las 7 de la migración 0006). Desacopla las claves del form de las de la función:
// no dependemos de las etiquetas i18n (traducibles) ni perdemos "otro". `Record<
// ContactSubject, ...>` obliga a que estén las 7 (tsc falla si se añade un subject sin
// mapear). Los valores deben coincidir con INTERES_KEYS del handler de la función.
export const SUBJECT_TO_INTERES: Record<ContactSubject, string> = {
  presencia: "mejora_presencia_online",
  consultoria: "consultoria_ia",
  automatizacion: "automatizacion_procesos",
  software: "software_sector",
  inmobiliario: "inmobiliario_construccion",
  legal: "sector_legal",
  otro: "otra_cosa",
};

export interface InboundCaptureInput {
  name: string;
  email: string;
  company?: string;
  subject: ContactSubject;
  message: string;
  website?: string; // honeypot: vacío en humanos; la función descarta si viene relleno
}

// Fire-and-forget: devuelve void de inmediato; cualquier error de red/función se traga
// con .catch (nunca burbujea al onSubmit). Gated: sin la env var, no hace nada (el form
// solo dispara Resend) — mismo patrón que LEAD_PAGES_ORIGIN.
export function postInboundCapture(v: InboundCaptureInput): void {
  const url = process.env.NEXT_PUBLIC_INBOUND_CAPTURE_URL;
  if (!url) return;
  void fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nombre: v.name,
      email: v.email,
      empresa: v.company ?? "",
      interes: SUBJECT_TO_INTERES[v.subject],
      mensaje: v.message,
      website: v.website ?? "",
    }),
    keepalive: true, // sobrevive si el usuario navega justo tras enviar
  }).catch(() => {
    // best-effort: Resend (server action) es la red de seguridad y la fuente de la UI.
  });
}
