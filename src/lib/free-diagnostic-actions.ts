import { z } from "zod";
import {
  DIAGNOSTICO_ESTADOS,
  MOTIVOS_400,
  MOTIVOS_409,
  TIPOS_NEGOCIO,
  type DiagnosticoEstado,
  type Motivo400,
  type Motivo409,
} from "@/lib/free-diagnostic-shared";

// Calls the ai-visibility backend directly from the visitor's browser — NOT a
// Server Action. The backend enforces "one free report per connection,
// forever" by IP; proxying through a Server Action would make every visitor
// look like the same Vercel egress IP and burn that limit globally on the
// first request. CORS on the backend side is what actually gates this.

// Paso 1 (medir) hace ~11 peticiones a la web del visitante con 3s de
// separación a propósito, para no parecer un ataque: puede tardar 30-60s.
// El suelo pedido es "ningún timeout de cliente por debajo de 90s".
const CHECK_TIMEOUT_MS = 100_000;
// Paso 2 (informe) consulta a un modelo con búsqueda web, renderiza el PDF
// con un navegador real y envía el correo — no es solo ida y vuelta de JSON.
const REPORT_TIMEOUT_MS = 60_000;

const localeSchema = z.enum(["es", "en"]).default("es");

const checkSchema = z.object({
  url: z.string().trim().min(1),
  locale: localeSchema,
  // CAPTCHA aplazado (decisión 0071): el campo se mantiene en el contrato,
  // hoy siempre undefined, para no tocar este fichero cuando se active.
  captcha: z.string().optional(),
});

export type FreeDiagnosticResult =
  | { ok: true; id: string; estado: DiagnosticoEstado; mensaje: string }
  | { ok: false; error: "invalid"; motivo?: Motivo400; message?: string }
  | { ok: false; error: "not_configured" | "failed"; message?: string };

// Best-effort normalization so "tuweb.es" works, not just "https://tuweb.es" —
// this is UX convenience only; real validation (forma del dominio, SSRF…)
// vive enteramente en el backend de ai-visibility.
function normalizeUrl(raw: string): URL | null {
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme);
  } catch {
    return null;
  }
}

function parseMotivo400(motivo: unknown): Motivo400 | undefined {
  return MOTIVOS_400.includes(motivo as Motivo400) ? (motivo as Motivo400) : undefined;
}

export async function runFreeDiagnostic(input: unknown): Promise<FreeDiagnosticResult> {
  const parsed = checkSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const url = normalizeUrl(parsed.data.url);
  if (!url) return { ok: false, error: "invalid" };

  const apiUrl = process.env.NEXT_PUBLIC_AGENFLOW_VISION_API_URL;
  if (!apiUrl) {
    console.warn(
      "[free-diagnostic] NEXT_PUBLIC_AGENFLOW_VISION_API_URL no configurada; diagnóstico deshabilitado.",
    );
    return { ok: false, error: "not_configured" };
  }

  try {
    const res = await fetch(`${apiUrl}/api/diagnostico-gratuito`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url.toString(),
        locale: parsed.data.locale,
        captcha: parsed.data.captcha,
      }),
      signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
    });

    const data = await res.json().catch(() => null);

    // 400: la URL no tiene forma de dominio. Rápido, no gasta intento — el
    // texto de `error` ya está escrito para el dueño del negocio.
    if (res.status === 400) {
      const message = typeof data?.error === "string" ? data.error : undefined;
      return { ok: false, error: "invalid", motivo: parseMotivo400(data?.motivo), message };
    }

    if (!res.ok) {
      const message = typeof data?.error === "string" ? data.error : undefined;
      return { ok: false, error: "failed", message };
    }

    if (
      typeof data?.id !== "string" ||
      typeof data?.mensaje !== "string" ||
      !DIAGNOSTICO_ESTADOS.includes(data?.estado)
    ) {
      console.error("[free-diagnostic] respuesta inesperada del backend", data);
      return { ok: false, error: "failed" };
    }

    return { ok: true, id: data.id, estado: data.estado, mensaje: data.mensaje };
  } catch (err) {
    console.error("[free-diagnostic] fallo al llamar al backend de Agenflow Vision", err);
    return { ok: false, error: "failed" };
  }
}

const reportSchema = z.object({
  id: z.string().trim().min(1),
  email: z.string().trim().email(),
  tipoNegocio: z.enum(TIPOS_NEGOCIO),
  locale: localeSchema,
  // CAPTCHA aplazado (decisión 0071): mismo placeholder que en checkSchema.
  captcha: z.string().optional(),
  // Honeypot: stays empty for real users; bots that fill it are dropped before the fetch.
  website: z.string().optional(),
});

export type FreeDiagnosticReportResult =
  | { ok: true }
  | { ok: false; error: "conflict"; motivo: Motivo409; message?: string }
  | { ok: false; error: "retryable"; message?: string }
  | { ok: false; error: "invalid" | "not_configured" | "failed"; message?: string };

export async function submitFreeDiagnosticReport(
  input: unknown,
): Promise<FreeDiagnosticReportResult> {
  const parsed = reportSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { id, email, tipoNegocio, locale, captcha, website } = parsed.data;

  // Honeypot filled → bot. Report success so it gets no signal back.
  if (website && website.trim() !== "") return { ok: true };

  const apiUrl = process.env.NEXT_PUBLIC_AGENFLOW_VISION_API_URL;
  if (!apiUrl) {
    console.warn(
      "[free-diagnostic] NEXT_PUBLIC_AGENFLOW_VISION_API_URL no configurada; envío de informe deshabilitado.",
    );
    return { ok: false, error: "not_configured" };
  }

  try {
    const res = await fetch(`${apiUrl}/api/diagnostico-gratuito/informe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, email, tipoNegocio, locale, captcha }),
      signal: AbortSignal.timeout(REPORT_TIMEOUT_MS),
    });

    if (res.ok) return { ok: true };

    const data = await res.json().catch(() => null);
    const message = typeof data?.error === "string" ? data.error : undefined;

    // 409: ya se emitió un diagnóstico gratuito (por conexión, por correo, o
    // por medición). Es una conversación que empieza, no un error — ver
    // MOTIVOS_409 y el bloque `conflict` en el widget.
    if (res.status === 409) {
      const motivo = MOTIVOS_409.includes(data?.motivo) ? (data.motivo as Motivo409) : "medicion";
      return { ok: false, error: "conflict", motivo, message };
    }

    // 502: el correo no salió, pero no ha gastado el diagnóstico gratuito.
    // Se puede reintentar con un botón — nunca en bucle automático.
    if (res.status === 502) {
      return { ok: false, error: "retryable", message };
    }

    return { ok: false, error: "failed", message };
  } catch (err) {
    console.error("[free-diagnostic] fallo al enviar el informe", err);
    return { ok: false, error: "failed" };
  }
}
