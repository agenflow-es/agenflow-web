"use server";

import { z } from "zod";
import { DIAGNOSTICO_ESTADOS, TIPOS_NEGOCIO, type DiagnosticoEstado } from "@/lib/free-diagnostic-shared";

// Network-level safety net over the backend's own ~20s measurement budget —
// not a promise about how long the check actually takes.
const FETCH_TIMEOUT_MS = 25_000;

const localeSchema = z.enum(["es", "en"]).default("es");

const checkSchema = z.object({
  url: z.string().trim().min(1),
  locale: localeSchema,
});

export type FreeDiagnosticResult =
  | { ok: true; id: string; estado: DiagnosticoEstado; mensaje: string }
  | { ok: false; error: "invalid" | "not_configured" | "failed"; message?: string };

// Best-effort normalization so "tuweb.es" works, not just "https://tuweb.es" —
// this is UX convenience only; real validation (SSRF, domain resolution…)
// lives entirely in the ai-visibility backend.
function normalizeUrl(raw: string): URL | null {
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme);
  } catch {
    return null;
  }
}

export async function runFreeDiagnostic(input: unknown): Promise<FreeDiagnosticResult> {
  const parsed = checkSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const url = normalizeUrl(parsed.data.url);
  if (!url) return { ok: false, error: "invalid" };

  const apiUrl = process.env.AGENFLOW_VISION_API_URL;
  if (!apiUrl) {
    console.warn(
      "[free-diagnostic] AGENFLOW_VISION_API_URL no configurada; diagnóstico deshabilitado.",
    );
    return { ok: false, error: "not_configured" };
  }

  try {
    const res = await fetch(`${apiUrl}/api/diagnostico-gratuito`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.toString(), locale: parsed.data.locale }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    const data = await res.json().catch(() => null);

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
  // Honeypot: stays empty for real users; bots that fill it are dropped server-side.
  website: z.string().optional(),
});

export type FreeDiagnosticReportResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "not_configured" | "failed"; message?: string };

export async function submitFreeDiagnosticReport(
  input: unknown,
): Promise<FreeDiagnosticReportResult> {
  const parsed = reportSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { id, email, tipoNegocio, locale, website } = parsed.data;

  // Honeypot filled → bot. Report success so it gets no signal back.
  if (website && website.trim() !== "") return { ok: true };

  const apiUrl = process.env.AGENFLOW_VISION_API_URL;
  if (!apiUrl) {
    console.warn(
      "[free-diagnostic] AGENFLOW_VISION_API_URL no configurada; envío de informe deshabilitado.",
    );
    return { ok: false, error: "not_configured" };
  }

  try {
    const res = await fetch(`${apiUrl}/api/diagnostico-gratuito/informe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, email, tipoNegocio, locale }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const message = typeof data?.error === "string" ? data.error : undefined;
      return { ok: false, error: "failed", message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[free-diagnostic] fallo al enviar el informe", err);
    return { ok: false, error: "failed" };
  }
}
