// Shared between the client widget and the server action — kept in a plain
// module (no "use server") because a Server Action file may only export
// async functions, not runtime constants like these enums.

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
