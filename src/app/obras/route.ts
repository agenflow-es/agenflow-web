/**
 * /obras — la página que ve todo el mundo mientras el sitio se rediseña.
 *
 * ES UN ROUTE HANDLER Y NO UNA PÁGINA, POR UNA SOLA RAZÓN: EL 503.
 *
 * Mientras la web está tapada, cada URL tiene que responder `503 Service
 * Unavailable` con `Retry-After`. Es la señal que Google documenta para una
 * parada temporal: el rastreador vuelve más tarde y NO desindexa nada. Si en su
 * lugar devolviéramos un 200 con este mismo texto, Google vería veinte URLs
 * distintas con contenido idéntico y las trataría como soft-404 —o peor, las
 * indexaría—, y al levantar el telón habría que recuperar el posicionamiento.
 *
 * Y una página de App Router no puede fijar su código de estado. Se comprobó en
 * el código de esta versión de Next: cuando el proxy devuelve un `rewrite`, el
 * status de esa respuesta se descarta y manda el de la ruta destino
 * (`node_modules/next/dist/server/lib/router-utils/resolve-routes.js`, el bloque
 * de `x-middleware-rewrite`). Un Route Handler SÍ manda en su propio status, así
 * que el proxy reescribe aquí y aquí se devuelve el 503.
 *
 * ⚠️ NO LLEVA `<meta name="robots" content="noindex">`, y es deliberado. Con un
 * 503 la página no se indexa igualmente, así que el noindex no añadiría nada; lo
 * que sí añadiría es riesgo, porque si las obras se alargan más de la cuenta un
 * noindex leído en todas las URLs del dominio sí puede llegar a desindexarlas.
 * La señal correcta para "esto vuelve" es el 503, y no se mezcla con otra que
 * significa "esto no debe estar en el índice".
 *
 * ⚠️ HTML A MANO, SIN REACT, SIN TAILWIND Y SIN `next/font`, también a propósito:
 *  · Un Route Handler no renderiza componentes, y montar `renderToStaticMarkup`
 *    para cuatro líneas de texto no compensa.
 *  · Lo importante: esta página no puede romperse. Es la única cara del sitio
 *    mientras por debajo se están rehaciendo el layout, los componentes y los
 *    tokens. Si dependiera de `@/components/...` o de `globals.css`, un refactor
 *    a medias dejaría la web tapada Y rota a la vez.
 *  · Las fuentes son las del sistema y no se pide nada a Google Fonts en tiempo
 *    de ejecución: el resto del sitio usa `next/font`, que las sirve desde
 *    nuestro dominio, y una llamada a Google desde aquí mandaría la IP de cada
 *    visitante a un tercero sin consentimiento, justo lo que el sitio evita.
 *    El logotipo no pierde nada: ya va en Helvetica, que es fuente de sistema.
 *
 * Los colores están COPIADOS de los tokens claros de globals.css (`--bg`,
 * `--text`, `--text-muted`, `--accent`, `--rail`, `--iso-1..3`) en vez de
 * importados, por el mismo motivo de arriba. Si la marca cambia de color, esta
 * página no se entera: repásala a mano al levantar el telón.
 */
import { siteConfig } from "@/lib/site";
import { MODO_OBRAS } from "@/lib/obras";

// Un día. Es una pista para el rastreador, no una promesa: Google la usa para
// espaciar los reintentos, no para enseñarle una fecha a nadie.
const REINTENTAR_EN_SEGUNDOS = 86_400;

/** El correo sale de una variable de entorno y acaba dentro de un atributo
 *  `href` y de un nodo de texto: se escapa, aunque hoy el valor sea nuestro. */
function escapar(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paginaDeObras() {
  const correo = escapar(siteConfig.contactEmail);

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Estamos renovando la web — Agenflow</title>
<meta name="description" content="Agenflow está renovando su web. Volvemos muy pronto. Mientras tanto puedes escribirnos.">
<style>
  :root {
    --bg: #f4f4f6;
    --text: #0c0c0f;
    --text-muted: #5b5b65;
    --text-faint: #9a9aa2;
    --accent: #2f54eb;
    --rail: rgba(128, 128, 128, 0.16);
    --font-ui: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --font-wordmark: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-ui);
    font-size: 17px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  /* Los dos raíles verticales del sitio, en el borde del marco de 1240px.
     Mismo corte que el componente Rails: solo a partir de 1336px (1240 + 48 de
     aire a cada lado); por debajo quedarían pegados al filo de la pantalla. */
  .railes { display: none; }
  @media (min-width: 1336px) {
    .railes {
      display: block;
      position: fixed;
      inset: 0;
      margin: 0 auto;
      width: 100%;
      max-width: 1240px;
      border-left: 1px solid var(--rail);
      border-right: 1px solid var(--rail);
      pointer-events: none;
    }
  }

  .marco {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    padding: 72px clamp(20px, 5vw, 48px);
    text-align: center;
  }

  .marca {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .marca span {
    font-family: var(--font-wordmark);
    font-size: 21px;
    font-weight: 600;
    letter-spacing: -0.03em;
  }

  /* El titular manda en el ancho: a 40rem "Estamos renovando la web" entra en
     una sola línea en escritorio, en vez de partir en un "Estamos" suelto que
     text-wrap: balance no puede equilibrar con solo tres palabras. La
     entradilla se queda más estrecha, en su medida de lectura. */
  .bloque { max-width: 40rem; }

  .eyebrow {
    margin: 0 0 14px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  h1 {
    margin: 0;
    font-size: clamp(30px, 4.6vw, 50px);
    line-height: 1.08;
    letter-spacing: -0.03em;
    font-weight: 600;
    text-wrap: balance;
  }

  .entradilla {
    margin: 18px auto 0;
    max-width: 34rem;
    font-size: 19px;
    line-height: 1.5;
    color: var(--text-muted);
    text-wrap: pretty;
  }

  .contacto {
    margin: 0;
    font-size: 15px;
    color: var(--text-muted);
  }
  .contacto a {
    color: var(--accent);
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid rgba(47, 84, 235, 0.28);
    padding-bottom: 1px;
    transition: border-color 0.15s ease;
  }
  .contacto a:hover { border-bottom-color: var(--accent); }
  .contacto a:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  .pie {
    position: relative;
    z-index: 1;
    padding: 0 clamp(20px, 5vw, 48px) 32px;
    text-align: center;
    font-size: 13.5px;
    color: var(--text-faint);
  }
</style>
</head>
<body>
  <div class="railes" aria-hidden="true"></div>

  <main class="marco">
    <div class="marca">
      <svg viewBox="0 0 64 64" width="26" height="26" role="img" aria-label="Agenflow">
        <polygon points="8,50 32,50 44,40 20,40" fill="#344f9f" />
        <polygon points="15,38 39,38 51,28 27,28" fill="#4b6cd7" />
        <polygon points="22,26 46,26 58,16 34,16" fill="#5b82ff" />
      </svg>
      <span>agenflow</span>
    </div>

    <div class="bloque">
      <p class="eyebrow">En obras</p>
      <h1>Estamos renovando la web</h1>
      <p class="entradilla">
        Volvemos muy pronto, con una casa mejor para contarte lo que hacemos.
        Gracias por pasarte.
      </p>
    </div>

    <p class="contacto">
      ¿Necesitas algo ahora? Escríbenos a
      <a href="mailto:${correo}">${correo}</a>
    </p>
  </main>

  <footer class="pie">© 2026 Agenflow</footer>
</body>
</html>`;
}

export function GET() {
  // Con el modo obras apagado, esta URL no pinta nada: quien la teclee por
  // costumbre va a la portada en vez de ver un cartel de obras sobre una web
  // que está perfectamente en pie.
  if (!MODO_OBRAS) {
    return new Response(null, { status: 307, headers: { Location: "/" } });
  }

  return new Response(paginaDeObras(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": String(REINTENTAR_EN_SEGUNDOS),
      // Que no se quede pegada en ninguna caché. Sin esto, el día que se apague
      // el interruptor habría visitantes —y capas de CDN— viendo el cartel de
      // obras sobre una web que ya está publicada.
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
