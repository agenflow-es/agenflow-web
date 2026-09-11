/**
 * MODO OBRAS — el interruptor que tapa el sitio entero mientras se rediseña.
 *
 * Encendido: `MODO_OBRAS=1` en las variables de entorno de Vercel (Production
 * y/o Preview, a elegir allí). Apagado: se borra la variable o se pone a
 * cualquier otro valor. En los dos casos hace falta REDESPLEGAR: el proxy corre
 * en el Edge y Next sustituye `process.env.MODO_OBRAS` por su valor literal al
 * construir, así que cambiar la variable en el panel no surte efecto hasta el
 * siguiente despliegue (botón "Redeploy" en Vercel, ~1 min).
 *
 * En local NUNCA se enciende, salvo que se escriba a mano en `.env.local`: por
 * eso `npm run dev` sigue enseñando la web entera mientras fuera está tapada.
 * Ese es el único modo de verla, decidido el 11-09-2026: no hay puerta trasera
 * en producción (ni cookie, ni parámetro secreto), así que lo que está
 * publicado está tapado para todo el mundo sin excepción.
 *
 * ⚠️ LA COMPARACIÓN VA CONTRA EL LITERAL COMPLETO, a propósito. Escribirlo como
 * `!!process.env.MODO_OBRAS` haría que un `MODO_OBRAS=0` —o `false`, o una
 * variable declarada y vacía en un entorno de Vercel— tapara el sitio, que es
 * exactamente el fallo que nadie ve venir.
 */
export const MODO_OBRAS = process.env.MODO_OBRAS === "1";

/** La ruta que sirve la página de obras. Vive fuera de `[locale]`: no tiene
 *  idioma, y así no depende de next-intl ni del árbol que se está rehaciendo. */
export const RUTA_OBRAS = "/obras";
