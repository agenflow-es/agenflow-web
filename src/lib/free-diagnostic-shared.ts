// Shared between the client widget and free-diagnostic-actions.ts.

export const DIAGNOSTICO_ESTADOS = ["poco_preparado", "en_progreso", "con_base"] as const;
export type DiagnosticoEstado = (typeof DIAGNOSTICO_ESTADOS)[number];

export const TIPOS_NEGOCIO = [
  "tienda",
  "escaparate",
  "servicio",
  "contenido",
  "plataforma",
  "institucional",
  "otro",
] as const;
export type TipoNegocio = (typeof TIPOS_NEGOCIO)[number];

// Paso 1 (medir): motivos posibles de un 400 — la URL no tiene forma de dominio.
export const MOTIVOS_400 = [
  "es_ip",
  "sin_punto",
  "etiqueta_invalida",
  "no_es_url",
  "vacio",
  "demasiado_largo",
] as const;
export type Motivo400 = (typeof MOTIVOS_400)[number];

// Paso 2 (informe): motivos posibles de un 409 — ya se emitió un diagnóstico gratuito.
export const MOTIVOS_409 = ["conexion", "correo", "medicion"] as const;
export type Motivo409 = (typeof MOTIVOS_409)[number];
