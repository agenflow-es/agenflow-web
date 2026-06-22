# Agenflow Web

Sitio corporativo bilingüe (ES/EN) de **Agenflow** — software con IA, automatización y consultoría para pymes.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (estricto)
- **Tailwind CSS v4** con sistema de tokens claro/oscuro (`src/app/globals.css`) y puente a primitivas shadcn/21st.dev
- **next-intl** para i18n (`/es` por defecto, `/en`); enrutado de locale en `src/proxy.ts`
- **MDX** (`@next/mdx`) para los posts del blog (`src/content/blog/`)
- **Motion** (`motion/react`) para animaciones; **React Hook Form + Zod** para formularios
- **Resend** para email (contacto + newsletter) y **Anthropic** para la comprobación de visibilidad en IA
- **next-themes** (tema oscuro por defecto), fuentes Inter · JetBrains Mono · Space Grotesk vía `next/font`
- Hosting: **Vercel**

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y rellena las variables (ver abajo)
npm run dev                  # http://localhost:3000  → redirige a /es
```

### Variables de entorno (`.env.local`)

| Variable | Para qué | Gated |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (SEO: sitemap, canonical, hreflang) | — |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contacto mostrado en footer/contacto | — |
| `RESEND_API_KEY` | Envío de email (contacto + newsletter) vía Resend | sin ella, el form devuelve error controlado |
| `CONTACT_FROM` | Remitente verificado en Resend (p. ej. `web@notifications.agenflow.es`) | — |
| `CONTACT_EMAIL` | Buzón que recibe los mensajes de contacto | — |
| `RESEND_AUDIENCE_ID` | Audiencia de Resend donde se guardan las altas de newsletter | sin ella, la suscripción devuelve error |
| `ANTHROPIC_API_KEY` | Comprobación «¿qué dice la IA de tu negocio?» (Claude + búsqueda web) | sin ella, el widget muestra estado "muy pronto" |

Todas las funciones están *gated*: si falta su clave, degradan con elegancia en vez de romper.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (usa un `.next` limpio; no mezcles `dev` y `build` sobre el mismo `.next`)
- `npm run start` — sirve el build
- `npm run lint` — ESLint

## Estructura

- `src/app/[locale]/` — rutas (App Router), una carpeta por sección
- `src/components/` — `layout/`, `sections/` (home), `ui/`, `visuals/`, `legal/`, formularios
- `src/messages/{es,en}.json` — **toda** la copy traducible (mantener ambos en paridad de claves)
- `src/lib/` — server actions (Resend/Anthropic), `metadata.ts` (`buildMetadata`), `site.ts`
- `src/content/blog/` — registro tipado `posts.ts` + cuerpos MDX por locale
- `design/` — material de referencia de diseño (no es código de producción)

## i18n

La copy vive en `src/messages/{es,en}.json` y se consume con `useTranslations()` / `getTranslations()`. Ambos ficheros deben tener **exactamente las mismas claves**; el build no lo valida, así que al añadir/quitar una clave hazlo en los dos idiomas.

## Notas

- Los rate-limits de los server actions son **en memoria** (suficiente como primera barrera; en serverless conviene moverlos a Vercel KV / Upstash antes de producción).
- Los textos legales (`/privacidad`, `/aviso-legal`, `/cookies`) son un borrador sólido pendiente de **revisión por un abogado**.
