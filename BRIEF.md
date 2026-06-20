# Brief — Nueva web Agenflow

> Documento vivo. Fuente de verdad para contenido, estructura y diseño (Claude Design) y para el desarrollo.
> Estado: **v0.2 — borrador** · Última actualización: 2026-06-20

---

## 1. Objetivo

Rehacer **agenflow.es** desde cero (la actual está en Framer, sin acceso al código) para reflejar el Agenflow de hoy: una empresa que **construye software con IA especializado por vertical**, y que entra en cada cliente a través de consultoría y automatización.

La web actual quedó anticuada en mensaje y menciona servicios que ya no se prestan (p. ej. "Ecosistema Salud"). El rediseño afila el posicionamiento y muestra **lo actual, no lo futuro**.

## 2. Posicionamiento y mensaje

**Idea central:** Agenflow construye software con IA, especializado por vertical. La consultoría y la automatización son la puerta de entrada; el desarrollo de producto por sector es la apuesta.

**Titular (borradores a refinar con referencias):**
- *"Software con IA para sectores que aún funcionan a mano."*
- *"De la auditoría al software: IA aplicada a tu operativa, por sectores."*

**Subtítulo (borrador):** "Auditamos tu operativa, automatizamos lo repetitivo y construimos el software que tu sector necesita. Empezamos en semanas, no en meses."

**Frase fuerza heredada (conservar, encaja):** *"Crecer sin sistemas no es escalar. Es solo un colapso programado."*

## 3. Audiencia

- **Pymes** que quieren automatizar/aplicar IA a su operativa (entrada por consultoría).
- **Sector legal** (despachos) — vía partner.
- **Sector inmobiliario y construcción** — administradores de fincas (fincai), inmobiliarias (replo); a futuro: reformas, instaladores, construcción.

## 4. Arquitectura de información (sitemap)

> Dos ejes separados para el visitante: **Servicios** ("¿qué podéis hacer por mí?") y **Sectores** ("¿trabajáis en mi sector?"). Hubs + páginas hijas para SEO y para poder enviar anuncios a una landing concreta.

```
/ (Home)
/servicios                              hub (resumen de los 3 pilares)
  /servicios/consultoria-ia
  /servicios/automatizacion-ia
  /servicios/desarrollo-software
  /servicios/presencia-online           (servicio complementario)
/sectores                               hub
  /sectores/legal
  /sectores/inmobiliario-construccion   → enlaza a fincai.es / replo
/precios                                paquetes SIN precio público
/nosotros                               quiénes somos / "habla con un experto"
/contacto                               formulario web (Resend) + email
/aviso-legal · /privacidad · /cookies
```

**Menú de navegación:** `Servicios · Sectores · Precios · Nosotros · [Contacto]`
(Productos fincai/replo viven dentro de su sector; "Productos" puede subir al menú cuando replo esté vivo.)

Idiomas: **ES (default) / EN** con rutas `/es` `/en` y `hreflang`.

## 5. Home — sección por sección

1. **Hero** — Titular + subtítulo + CTA primario "Solicitar diagnóstico" (→ /contacto) + secundario "Ver servicios".
2. **Qué es Agenflow** — posicionamiento: software con IA por vertical.
3. **Servicios (3 pilares)** — 3 tarjetas que enlazan a sus páginas + banda del complementario (presencia online).
4. **Sectores** — 2 tarjetas (Legal, Inmobiliario y construcción) que enlazan a sus páginas.
5. **Proceso (Protocolo Agenflow)** — timeline de 4 fases.
6. **Cómo trabajamos (teaser de Precios)** — paquetes según punto de partida → /precios.
7. **Confianza** — ver §8.
8. **CTA final** — "Solicita un diagnóstico de tu operativa".
9. **FAQ** + **Footer** (con email, LinkedIn, legal, selector de idioma).

## 6. Servicios (3 pilares + complementario)

Cada pilar tiene **página propia** (intro + puntos clave + CTA):

| Pilar | Qué es | CTA |
|---|---|---|
| **Consultoría de IA y automatización** | Auditoría de operativa + plan concreto. Puerta de entrada. | Solicitar diagnóstico |
| **Automatización + IA para pymes** | Quitar trabajo manual repetitivo con automatización e IA. | Automatizar mi operativa |
| **Desarrollo de software a medida** | SaaS/software a medida del sector, con IA en el núcleo. | Hablar de mi proyecto |
| *Complementario:* **Modernización de presencia online** | Renovar webs anticuadas. Primer paso antes de automatizar. | Mejorar mi presencia |

## 7. Sectores

### Legal (`/sectores/legal`)
- Software/automatización para despachos, **con un despacho partner** que co-define las soluciones.
- Prueba social principal. **Partner CONFIDENCIAL por ahora** → "un despacho de abogados partner", sin nombre ni logo.

### Inmobiliario y construcción (`/sectores/inmobiliario-construccion`)
- **fincai.es** — software con IA para **administradores de fincas**. **Finc** = agente de IA que orquesta. Lanza ~agosto 2026.
- **replo** — **gestión de leads para inmobiliarias**: bandeja omnicanal, agente WhatsApp, voz, gestión de visitas. Web aún no publicada.
- Visión (no servicio actual): reformas, instaladores, construcción.
- Cada producto: enlace al sitio del producto desde la página de sector.

## 8. Precios

**Modelo: paquetes SIN precio público** (cada uno con "Solicitar presupuesto"):
1. **Diagnóstico de operativa** — punto de entrada.
2. **Sprint de automatización + IA** — implementación acotada.
3. **Desarrollo de software / producto** — a medida por sector.
4. **Soporte y optimización** — acompañamiento continuo.

Nota en página: "Sin precios cerrados: presupuesto a medida tras el diagnóstico." *(Si más adelante quieres publicar "desde €", se añade sin rehacer nada.)*

## 9. Prueba social / Confianza

Limitada aún (partner legal confidencial; sin administradores de fincas todavía). Diseñada para **dar confianza sin muchos logos**, y preparada para escalar. Métricas **sin volumen de cartera** (no inventar nº clientes/facturación):
- Resultados reales anonimizados del proyecto legal ("un despacho partner"). → *Necesito 1–2 cifras reales.*
- Capacidades de producto (fincai/replo).
- Método/velocidad ("resultados en semanas").
- Estadística de sector *citada y atribuida* (no como logro propio).
- Expertise del fundador (Nosotros, "habla con un experto").
- Hueco reservado para logos/métricas/testimonios al escalar.

## 10. Tono y voz

Directo, técnico-pero-claro, orientado a resultados de negocio. Sin humo de "transformación digital". Frases cortas, verbos de acción.

## 11. Stack técnico

- **Next.js 16 (App Router) + React 19 + TypeScript**
- **Tailwind CSS v4** + sistema de tokens
- **shadcn/ui** (Radix) · **Motion** (animaciones)
- **next-intl** (ES/EN, rutas `/es` `/en`, `src/proxy.ts`)
- Contenido en `src/messages/{es,en}.json` (migrable a CMS Sanity en fase 2)
- **Contacto:** formulario web (React Hook Form + Zod + **Resend**) + **email**. *(Sin Calendly.)*
- SEO: Metadata API, `next-sitemap`, JSON-LD (Organization, Service), `hreflang`
- Analítica: **Plausible** (o Vercel Analytics)
- **Hosting: Vercel** (dominio agenflow.es por DNS)

## 12. Estado del build

✅ Esqueleto bilingüe montado y verificado (`npm run build` OK): toda la IA de §4 navegable, secciones de Home como componentes, copys ES/EN. Estilo = placeholder neutro (lo viste Claude Design).
⏳ Pendiente: shadcn/ui, Motion, formulario Resend, páginas legales, SEO, integrar diseño, deploy Vercel.

## 13. Necesito de ti

- **Email de contacto** definitivo (placeholder actual: `hola@agenflow.es`).
- Datos legales (autónomo ahora; SL en trámite) para privacidad/aviso legal.
- 1–2 **cifras reales** del proyecto legal (anonimizadas).
- **Anclajes de precio** si en algún momento quieres pasar de "presupuesto" a "desde €".
- Bio para **Nosotros** (ángulo "habla con un experto").
- **Diseño:** ver [DESIGN-BRIEF.md](DESIGN-BRIEF.md) (referencias + lanzar encargo a Claude Design).
