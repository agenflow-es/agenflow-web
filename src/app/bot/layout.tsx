/* eslint-disable @next/next/no-html-link-for-pages --
 * Los enlaces al resto del sitio van con <a> PELADO A PROPÓSITO, no con `Link`.
 *
 * 1) `Link` de `@/i18n/navigation` (next-intl) exige contexto de locale y ataría
 *    esta URL a la estructura de idiomas, que es justo lo que hay que evitar:
 *    ver la nota de abajo sobre por qué `/bot` no se puede mover nunca.
 * 2) `Link` de `next/link` tampoco aporta nada aquí: `/bot` tiene su PROPIO root
 *    layout, y Next documenta que navegar entre root layouts distintos provoca
 *    una carga completa de página ("Navigating across multiple root layouts will
 *    cause a full page load"), así que no hay navegación de cliente que ganar —
 *    solo prefetch de un árbol que se va a recargar entero igualmente.
 * Un <a> es lo correcto: sale en el HTML, funciona sin JavaScript y no acopla
 * esta página a nada.
 */
import type { Metadata } from "next";
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Logo } from "@/components/ui/primitives";
import { siteConfig } from "@/lib/site";
import "../globals.css";

// SEGUNDO ROOT LAYOUT, A PROPÓSITO.
//
// `/bot` vive FUERA de `src/app/[locale]/`, así que no tiene ningún layout por
// encima y Next lo trata como root layout propio (define <html> y <body>).
// Documentado: "Omitting `app/layout.js` so layouts in subdirectories ... each
// become root layouts for their respective directories".
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md
//
// ⚠️ POR QUÉ NO USA next-intl NI EL Header/Footer DEL SITIO:
// la URL `/bot` va escrita en el User-Agent de CADA petición del rastreador y
// queda en los registros de miles de servidores ajenos, así que NO SE PUEDE
// MOVER NUNCA. Este layout es deliberadamente autónomo —fuentes, tema y chrome
// propios, cero dependencias de `@/i18n/*`— para que una reestructuración de
// idiomas (o quitar el prefijo, o añadir locales) no pueda arrastrarla.
// El Header/Footer del sitio usan `Link` de `@/i18n/navigation`, que exige
// contexto de locale: usarlos aquí ataría esta URL a la estructura de idiomas,
// que es justo lo que hay que evitar.
//
// ⚠️ Y NO LLEVA JAVASCRIPT DE CLIENTE: la página se sirve ya renderizada. Somos
// quienes le dicen a la gente que su web sea legible para los agentes; si
// nuestra propia página de identificación llegara como una caja vacía de JS, se
// acabó el argumento. Por eso `data-theme` va fijo en el HTML en vez de por
// ThemeProvider (next-themes, client component): el tema correcto sale del
// servidor, sin hidratación. `defaultTheme: "light"` en ThemeProvider — se fija
// el mismo valor para que /bot se vea como el resto del sitio.

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "AIVisibilityBot — el rastreador de Agenflow",
  description:
    "Quiénes somos, qué hace nuestro rastreador AIVisibilityBot en tu web y cómo pedirnos que pare, por robots.txt o por correo.",
  // Canónica SIN prefijo de idioma y SIN alternates de idioma: esta URL es una
  // sola, es bilingüe en la misma página y no tiene gemela en otro locale.
  alternates: { canonical: "/bot" },
};

export default function BotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-theme="light"
      className={`${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <header className="border-b border-border">
          <div className="mx-auto flex h-[68px] max-w-3xl items-center px-[clamp(20px,5vw,48px)]">
            {/* <a> pelado, no `Link` de next-intl: ver nota de arriba. */}
            <a href="/es" className="flex items-center gap-2.5">
              <Logo />
              <span className="font-wordmark text-[21px] font-semibold tracking-[-0.03em]">
                agenflow
              </span>
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-3xl px-[clamp(20px,5vw,48px)] py-8">
            <span className="text-[13px] text-fg-faint">
              © 2026 Agenflow ·{" "}
              <a href="/es/aviso-legal" className="transition hover:text-fg-hover">
                Aviso legal
              </a>{" "}
              ·{" "}
              <a href="/es/privacidad" className="transition hover:text-fg-hover">
                Privacidad
              </a>{" "}
              ·{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="transition hover:text-fg-hover"
              >
                {siteConfig.contactEmail}
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
