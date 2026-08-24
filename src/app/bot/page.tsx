import { siteConfig } from "@/lib/site";

// Página pública de identificación del rastreador. Server component puro y sin
// APIs dinámicas -> Next la prerenderiza en el build y se sirve como HTML ya
// hecho. Ver la nota larga en layout.tsx: esto NO es un detalle de rendimiento,
// es el requisito de la página.
//
// Bilingüe en la misma URL (español primero, inglés debajo) A PROPÓSITO: quien
// llega aquí viene de leer `AIVisibilityBot` en los logs de su servidor y puede
// estar en cualquier país. Una sola URL, sin negociación de idioma, sin
// redirección: lo que hay que leer está en la página que ya ha abierto.

const UA = `AIVisibilityBot/1.0 (+${siteConfig.url}/bot; ${siteConfig.contactEmail})`;
const ROBOTS_SNIPPET = "User-agent: AIVisibilityBot\nDisallow: /";
const LAST_UPDATED = "24 de agosto de 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-xl font-semibold tracking-[-0.01em]">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-2.5 leading-[1.65] text-fg-muted">{children}</p>;
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-surface px-4 py-3.5 font-label text-[13px] leading-[1.7] text-fg">
      <code>{children}</code>
    </pre>
  );
}

function Mail() {
  return (
    <a
      href={`mailto:${siteConfig.contactEmail}`}
      className="text-accent transition hover:underline"
    >
      {siteConfig.contactEmail}
    </a>
  );
}

// Qué pedimos de cada sitio. Es la lista completa: si algún día se pide algo
// más, se añade AQUÍ ANTES de pedirlo — esta tabla es la promesa pública.
const QUE_PEDIMOS: [string, string][] = [
  ["robots.txt", "Saber qué nos permites antes de pedir nada más"],
  ["La página de inicio", "Ver qué recibe un agente cuando visita tu web"],
  ["El sitemap", "Conocer el tamaño y la estructura del sitio"],
];

const NO_HACEMOS: [string, string][] = [
  [
    "No entramos en ninguna zona con contraseña.",
    "No intentamos iniciar sesión ni rellenar formularios.",
  ],
  ["No compramos, no reservamos y no enviamos nada.", ""],
  [
    "No recogemos datos personales de tus usuarios,",
    "ni comentarios, ni fichas de clientes.",
  ],
  [
    "No guardamos la versión de tu gestor de contenidos ni de tus extensiones.",
    "Saber qué versión usan miles de negocios sería un inventario de vulnerabilidades, y no queremos tenerlo.",
  ],
  [
    "No suplantamos a un navegador.",
    "Si nos bloqueas, nos quedamos fuera. No intentamos entrar por otro sitio.",
  ],
];

const COMPORTAMIENTO = [
  "Una petición por dominio y barrido. No navegamos por tu sitio.",
  "Respetamos robots.txt, incluido crawl-delay.",
  "Nos identificamos siempre, en todas las peticiones.",
  "Si nos devuelves un bloqueo, lo anotamos y no insistimos.",
];

export default function BotPage() {
  return (
    <article className="mx-auto max-w-3xl px-[clamp(20px,5vw,48px)] py-16">
      {/* ---------------------------------------------------- Español ---- */}
      <p className="font-label text-[12.5px] uppercase tracking-[0.1em] text-accent">
        Rastreador
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.022em]">
        Nuestro rastreador
      </h1>
      <p className="mt-5 text-[18px] leading-[1.6] text-fg-muted">
        Si has llegado aquí es porque has visto{" "}
        <code className="font-label text-[15px] text-fg">AIVisibilityBot</code>{" "}
        en los registros de tu servidor. Esta página te dice quiénes somos, qué
        hemos hecho en tu web y cómo pedirnos que dejemos de hacerlo.
      </p>

      {/* Lo que casi todo el mundo viene a buscar, antes que nada. */}
      <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
        <div className="font-label text-[12px] uppercase tracking-[0.1em] text-accent">
          Cómo pedirnos que paremos
        </div>
        <p className="mt-2.5 leading-[1.6] text-fg-muted">
          Añade esto a tu <code className="font-label text-fg">robots.txt</code>
          . Lo respetamos siempre, aunque nos deje sin datos.
        </p>
        <Pre>{ROBOTS_SNIPPET}</Pre>
        <p className="mt-3.5 leading-[1.6] text-fg-muted">
          O escríbenos a <Mail /> con tu dominio y te sacamos de la lista.{" "}
          <strong className="font-semibold text-fg">
            Sin preguntas y sin condiciones.
          </strong>
        </p>
      </div>

      <H2>Quiénes somos</H2>
      <P>
        Agenflow es la denominación comercial de{" "}
        <strong className="font-semibold text-fg">
          Francisco Javier Arias Carrillo
        </strong>{" "}
        (NIF 45886331C), c/ Huelva 38, 14400 Pozoblanco (Córdoba), España.
      </P>
      <P>
        Contacto: <Mail /> · 611 499 875
      </P>

      <H2>Qué hace este rastreador</H2>
      <P>
        Estudiamos{" "}
        <strong className="font-semibold text-fg">
          cómo de preparados están los sitios web para los agentes de
          inteligencia artificial
        </strong>
        : si pueden entrar, si pueden leer el contenido, si pueden entenderlo y
        si pueden usar la web. Con eso publicamos análisis agregados del estado
        del mercado y ayudamos a los negocios a corregir lo que falla.
      </P>
      <P>
        Para eso pedimos, de tu sitio y{" "}
        <strong className="font-semibold text-fg">una sola vez por barrido</strong>:
      </P>
      <div className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] border border-border">
        <table className="w-full border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="bg-surface">
              <th className="border-b border-border px-3.5 py-2.5 font-semibold">
                Qué pedimos
              </th>
              <th className="border-b border-border px-3.5 py-2.5 font-semibold">
                Para qué
              </th>
            </tr>
          </thead>
          <tbody>
            {QUE_PEDIMOS.map(([que, paraQue]) => (
              <tr key={que} className="align-top">
                <td className="border-t border-border px-3.5 py-2.5 text-fg">
                  {que}
                </td>
                <td className="border-t border-border px-3.5 py-2.5 text-fg-muted">
                  {paraQue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Cómo nos identificamos</H2>
      <P>
        Enviamos esta cadena de agente de usuario en todas nuestras peticiones:
      </P>
      <Pre>{UA}</Pre>

      <H2>Qué NO hacemos</H2>
      <ul className="mt-3 space-y-2.5">
        {NO_HACEMOS.map(([titular, resto]) => (
          <li key={titular} className="flex gap-3 leading-[1.65] text-fg-muted">
            <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
            <span>
              <strong className="font-semibold text-fg">{titular}</strong>
              {resto ? ` ${resto}` : ""}
            </span>
          </li>
        ))}
      </ul>

      <H2>Cómo nos comportamos</H2>
      <ul className="mt-3 space-y-2.5">
        {COMPORTAMIENTO.map((linea) => (
          <li key={linea} className="flex gap-3 leading-[1.65] text-fg-muted">
            <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{linea}</span>
          </li>
        ))}
      </ul>

      <H2>Cómo tratamos lo que recogemos</H2>
      <P>
        Recogemos el contenido que sirves públicamente. Puede incluir datos de
        contacto profesional que tú mismo publicas —el nombre de la empresa, un
        teléfono, un correo, un NIF en el aviso legal—. Lo tratamos con base en
        el{" "}
        <strong className="font-semibold text-fg">interés legítimo</strong> de
        investigación de mercado, y está detallado en nuestra{" "}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
            <a> pelado a propósito: /bot tiene su propio root layout y no debe
            acoplarse al enrutado por idioma. Ver la nota larga en layout.tsx. */}
        <a
          href="/es/privacidad"
          className="text-accent transition hover:underline"
        >
          política de privacidad
        </a>
        .
      </P>
      <P>
        Puedes pedirnos acceso, rectificación, supresión u oposición en <Mail />,
        y reclamar ante la Agencia Española de Protección de Datos.
      </P>

      {/* ---------------------------------------------------- English ---- */}
      <hr className="mt-16 border-border" />

      <section lang="en" className="mt-16">
        <p className="font-label text-[12.5px] uppercase tracking-[0.1em] text-accent">
          Crawler
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.022em]">
          Our crawler
        </h2>
        <p className="mt-5 text-[17px] leading-[1.6] text-fg-muted">
          You are probably here because you saw{" "}
          <code className="font-label text-[15px] text-fg">AIVisibilityBot</code>{" "}
          in your server logs.
        </p>

        <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <div className="font-label text-[12px] uppercase tracking-[0.1em] text-accent">
            To opt out
          </div>
          <p className="mt-2.5 leading-[1.6] text-fg-muted">
            Add this to your{" "}
            <code className="font-label text-fg">robots.txt</code>, which we
            always honour:
          </p>
          <Pre>{ROBOTS_SNIPPET}</Pre>
          <p className="mt-3.5 leading-[1.6] text-fg-muted">
            Or email <Mail /> with your domain.{" "}
            <strong className="font-semibold text-fg">No questions asked.</strong>
          </p>
        </div>

        <P>
          <strong className="font-semibold text-fg">Who we are</strong> —
          Agenflow is the trading name of Francisco Javier Arias Carrillo (NIF
          45886331C), Pozoblanco, Córdoba, Spain. Contact: <Mail />
        </P>
        <P>
          <strong className="font-semibold text-fg">What it does</strong> — We
          study how ready websites are for AI agents: whether agents can reach
          them, read them, understand them and use them. We request your{" "}
          <code className="font-label text-fg">robots.txt</code>, your home page
          and your sitemap,{" "}
          <strong className="font-semibold text-fg">once per sweep</strong>.
        </P>
        <P>
          <strong className="font-semibold text-fg">We never</strong> log in,
          submit forms, buy, book, collect your users&rsquo; personal data,
          record your software versions, or impersonate a browser to get around
          a block.
        </P>
      </section>

      <p className="mt-14 border-t border-border pt-6 font-label text-[12.5px] uppercase tracking-[0.1em] text-fg-faint">
        Última actualización / Last updated: {LAST_UPDATED}
      </p>
    </article>
  );
}
