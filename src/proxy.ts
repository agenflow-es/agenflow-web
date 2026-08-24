import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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
