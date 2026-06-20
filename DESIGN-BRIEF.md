# Brief de diseño — Nueva web Agenflow (para Claude Design)

> Documento para encargar el diseño a **Claude Design**. Acompaña a [BRIEF.md](BRIEF.md) (contenido y estructura).
> Estado: **v1.1 — listo para entregar** · 2026-06-20

---

## 0. Encargo para Claude Design (resumen para arrancar)

Diseña la web corporativa de **Agenflow**, una empresa que **construye software con IA especializado por vertical** (legal, inmobiliario/construcción) y que entra en cada cliente vía consultoría + automatización. **No es la web de un SaaS concreto, sino la de la empresa matriz** que produce esos SaaS.

Quiero que:
1. **Propongas una identidad de marca nueva** (logotipo/wordmark, paleta, tipografía, tono visual) — tienes el contexto completo en este brief y en BRIEF.md.
2. Entregues **dos versiones de tema: claro y oscuro**, para decidir cuál adoptamos.
3. Empieces por la **Home (desktop + móvil)**; luego el patrón de **hub + página hija** (Servicios y Sectores), **Precios**, **Nosotros** y **Contacto**.
4. Entregues un **sistema coherente** (tokens de color, tipografía, espaciado, componentes) exportable a Tailwind v4, no pantallas sueltas.

**Menú de navegación:** `Servicios · Sectores · Precios · Nosotros · [Contacto]` (Servicios y Sectores con submenú/dropdown a sus páginas hijas).

## 1. Qué es Agenflow
Empresa que construye software con IA especializado por vertical; consultoría + automatización como puerta de entrada. Tono: técnico, fiable, directo, orientado a resultados. Nada de "humo" corporativo.

## 2. Objetivo del diseño
Transmitir **solidez técnica + producto real** (no agencia genérica), hacer creíble a una empresa joven pero ambiciosa, y guiar al visitante hacia "solicitar diagnóstico".

## 3. Identidad de marca
- **Logo / identidad:** **RENOVAR.** Claude Design propone una identidad nueva (wordmark + marca, paleta, tipografía) con el contexto completo de Agenflow.
- **Tema:** entregar **AMBAS versiones, clara y oscura**, para decidir.
- **Mantener** del posicionamiento: nombre "Agenflow" y la idea de "flujo/sistemas que fluyen".

## 4. Referencias (curadas con Francisco)
**Matriz / studio que construye varios productos (estructura/narrativa):**
- **Hexa** — hexa.build · **Atomic** — atomic.vc · **Pioneer Square Labs** — psl.com · **Betaworks** — betaworks.com

**Credibilidad técnica / IA (listón visual):**
- **Vercel** — vercel.com · **Linear** — linear.app · **Resend** — resend.com

**Craft / estudio de producto (casos y carácter):**
- **Metalab** — metalab.com · **Work & Co** — work.co · **Basement Studio** — basement.studio · *(atrevido)* **Igloo Inc** — igloo.inc

> Dirección: estructura/narrativa ≈ Hexa; nivel visual ≈ Vercel/Linear; bloques de caso/sector ≈ Metalab.
> `[Francisco: pruna/añade las que más te representen]`

## 5. Dirección visual e imágenes
- **Mood / adjetivos:** técnico · confiable · moderno · limpio · con carácter. `[ajustar al ver propuestas]`
- **Imágenes (mezcla):**
  - **Capturas de producto** donde se hable de producto. Disponibles de **fincai** (sí). **replo** aún no → placeholder/abstracto.
  - **Minimal tipográfico** como base general.
  - **Infografías** para explicar mejor (Protocolo Agenflow / arquitectura de una solución).
- **Animación:** sutil y con propósito (se construirá con Motion). Fluidez tipo Framer sin recargar.

## 6. Audiencia y tono
Decisores de pyme y de sectores legal e inmobiliario. Beneficios de negocio antes que jerga. Bilingüe ES/EN (mismo diseño, textos intercambiables, longitudes variables).

## 7. Páginas a diseñar (prioridad)
1. **Home** (desktop + móvil) — narrativa completa.
2. **Hub + página hija** — patrón reutilizable para **Servicios** (4 hijas) y **Sectores** (2 hijas).
3. **Precios** — paquetes (tarjetas) SIN precio público, cada uno con "Solicitar presupuesto".
4. **Nosotros** — quiénes somos + "habla con un experto".
5. **Contacto** — formulario + email.
6. (Fase 2) Páginas legales.

**Mapa completo:** `/` · `/servicios` (+ consultoria-ia, automatizacion-ia, desarrollo-software, presencia-online) · `/sectores` (+ legal, inmobiliario-construccion) · `/precios` · `/nosotros` · `/contacto`.

## 8. Home — secciones a maquetar (de BRIEF.md §5)
1. **Hero** — titular + subtítulo + CTA primario "Solicitar diagnóstico" + secundario "Ver servicios".
2. **Qué es Agenflow** — frase de posicionamiento.
3. **Servicios (3 pilares)** — 3 tarjetas (enlazan a sus páginas) + banda del complementario.
4. **Sectores** — 2 tarjetas grandes (Legal, Inmobiliario y construcción) que enlazan.
5. **Proceso (Protocolo Agenflow)** — timeline de 4 fases (buena candidata a infografía).
6. **Cómo trabajamos** — teaser de Precios → /precios.
7. **Confianza** — banda preparada para logos/métricas (pocos aún): credibilidad por método, producto y expertise.
8. **CTA final**.
9. **FAQ** — acordeón.
10. **Footer** — email, LinkedIn, legal, selector de idioma.

## 9. Componentes / sistema a entregar
Header con nav + **submenús Servicios/Sectores** + selector de idioma (ES/EN) · botones (primario/secundario) · tarjeta de servicio · tarjeta de sector · **patrón de página de detalle** (título + intro + lista de puntos + CTA) · **tarjeta de paquete de precios** · timeline/infografía de proceso · banda de confianza/logos · acordeón FAQ · formulario de contacto · footer · estados hover/focus · breakpoints móvil/tablet/desktop.

## 10. Requisitos técnicos para el diseño
- **Responsive, mobile-first.**
- **Accesibilidad AA** (contraste, foco visible, teclado).
- **Rendimiento**: imágenes optimizables, sin dependencias pesadas innecesarias.
- **Sistema de tokens** (color, tipografía, radios, sombras, espaciado) exportable a Tailwind v4.
- **Bilingüe**: textos de longitud variable ES/EN sin romper layout.
- **Dos temas** (claro/oscuro) sobre el mismo sistema de tokens.

## 11. Estado de inputs
- [x] Referencias (§4)
- [x] Marca: **renovar** vía Claude Design (§3)
- [x] Tema: **ambos**, claro y oscuro (§3)
- [x] Imágenes: mezcla (capturas producto + minimal tipográfico + infografías) (§5)
- [x] IA y páginas definidas (§7)
- [x] Assets: capturas de **fincai** disponibles; replo todavía no
