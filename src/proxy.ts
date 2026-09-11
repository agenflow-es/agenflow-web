import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { MODO_OBRAS, RUTA_OBRAS } from "./lib/obras";

const intl = createMiddleware(routing);

/**
 * MODO OBRAS (11-09-2026) — mientras `MODO_OBRAS=1`, todo lo que pase por aquí
 * se reescribe a /obras, que responde 503. Ver `src/lib/obras.ts` para el
 * interruptor y `src/app/obras/route.ts` para el porqué del 503.
 *
 * NO HAY PUERTA TRASERA: ni cookie, ni parámetro secreto, ni excepción por IP.
 * Lo publicado está tapado para todo el mundo, y la web entera se sigue viendo
 * en local (`npm run dev`), donde la variable no está puesta.
 *
 * QUÉ SIGUE VISIBLE, Y NO ES UN OLVIDO: lo que el `matcher` de abajo excluye,
 * porque el proxy ni siquiera se ejecuta ahí.
 *  · `/bot` — la URL de identificación del rastreador, escrita en el User-Agent
 *    de cada petición y guardada en los registros de miles de servidores
 *    ajenos. Taparla con un 503 haría que quien revisa sus logs y la teclea se
 *    encuentre un muro, que es exactamente lo contrario de para qué existe.
 *  · `/propuesta-web/:slug` y `/muestra-web/:slug` — enlaces ya enviados a
 *    prospectos. Tapar la web de Agenflow no puede tumbar la propuesta que
 *    alguien tiene abierta en otra pestaña.
 *  · `/robots.txt`, `/sitemap.xml` y los estáticos (el `.*\..*` del matcher) —
 *    se quedan como están A PROPÓSITO. Un robots.txt que prohibiera rastrear
 *    impediría a Google volver a comprobar si el sitio ya está en pie; el 503
 *    de cada URL ya le dice que espere, que es la señal correcta.
 */
export default function proxy(request: NextRequest) {
  // /obras SE SIRVE SIEMPRE TAL CUAL, con el modo encendido y con el modo
  // apagado, y el corte va ANTES que las dos ramas por dos motivos distintos:
  //  · Encendido: sin esto se reescribiría a sí misma.
  //  · Apagado: sin esto next-intl se adelanta y la manda a /es/obras, que no
  //    existe — un 404. La página de obras NO tiene idioma (vive fuera de
  //    `[locale]`), así que no debe pasar nunca por next-intl. Con el corte, el
  //    Route Handler ve que el modo está apagado y manda a la portada.
  if (request.nextUrl.pathname === RUTA_OBRAS) return NextResponse.next();

  if (MODO_OBRAS) return NextResponse.rewrite(new URL(RUTA_OBRAS, request.url));

  return intl(request);
}

export const config = {
  // Match all paths except API, Next internals and static files.
  //
  // Los segmentos de páginas-para-leads (`propuesta-web`, `muestra-web`) van
  // excluidos A PROPÓSITO y NO son opcionales: el proxy corre ANTES que los
  // rewrites `beforeFiles` de next.config.ts (orden documentado: headers →
  // redirects → proxy → beforeFiles → rutas de fichero), así que si el proxy los
  // ve, next-intl los redirige a /es/... y el rewrite ya no casa. Resultado: 404
  // sin explicación en un enlace que se le ha mandado a un prospecto.
  // https://nextjs.org/docs/app/api-reference/file-conventions/middleware#execution-order
  //
  // `bot` va excluido POR EL MISMO MOTIVO PERO CON MÁS FUERZA: `/bot` es la URL
  // de identificación del rastreador, viaja en el User-Agent de cada petición
  // que hacemos y queda escrita en los registros de miles de servidores ajenos.
  // NO SE PUEDE MOVER NUNCA. Si el proxy la viera, next-intl la redirigiría a
  // /es/bot y la URL quedaría de rehén de la estructura de idiomas: cambiar el
  // locale por defecto, o quitar el prefijo, rompería un enlace ya impreso en
  // logs de terceros que no podemos actualizar. Aquí NO vale un 307 a /es/bot:
  // quien la lee suele ser alguien revisando logs, no un navegador siguiendo
  // redirecciones. La página se sirve tal cual, sin prefijo.
  //
  // El `(?:/|$)` es a propósito y no es adorno: excluye `/bot` y `/bot/...`,
  // pero NO `/botanica` ni cualquier ruta futura que empiece por esas letras,
  // que sí deben seguir pasando por next-intl.
  //
  // ⚠️ ESTA LISTA TIENE QUE CASAR CON `TIPOS_LEAD_PAGES` DE next.config.ts.
  // No se puede derivar de ella: Next exige que `matcher` sea una constante
  // estática y descarta los valores dinámicos ("The matcher values need to be
  // constants so they can be statically analyzed at build-time"). Así que al
  // añadir un tipo de página-para-leads hay que tocar DOS sitios: aquí y allí.
  matcher: [
    "/((?!api|_next|_vercel|propuesta-web|muestra-web|bot(?:/|$)|.*\\..*).*)",
  ],
};
