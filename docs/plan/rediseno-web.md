# Plan de mejora web Agenflow — Implementación para Claude Code

> **Contexto para el agente:** Web de Agenflow (agenflow.es), consultora/estudio de automatización e IA para pymes españolas. Stack: Next.js 16.2 (App Router, Turbopack), React 19.2 + TS5, Tailwind v4 con tokens CSS propios, next-intl (es/en), motion, react-hook-form + Zod, Resend, lucide-react, next-themes, MDX, @anthropic-ai/sdk (widget IA en /servicios/presencia-online).
>
> **Objetivo de negocio:** la web es el destino de aterrizaje de campañas outbound (cold email, LinkedIn, ads). El visitante debe entender qué hace Agenflow, confiar, y **contactar por el formulario gratuito**. La conversión objetivo es el envío del formulario de contacto, NO la solicitud de consultoría (que es un servicio de pago).
>
> **Regla de oro de contenido:** NO inventar prueba social. No hay testimonios ni métricas de clientes propios todavía. Cualquier cifra debe ser de investigación de mercado referenciada (con fuente) o no ponerse. Los productos FincAI y Replo sí son reales y operativos: se pueden mostrar como prueba tangible.

---

## FASE 0 — Medición y fixes previos (hacer PRIMERO)

Sin esto no podremos saber si el rediseño funciona.

### 0.1 Analytics
- Instalar `@vercel/analytics` (`<Analytics />` en root layout).
- Eventos custom con `track()`:
  - `contact_form_submit` (con prop `service` del dropdown)
  - `contact_form_view` (al montar la página de contacto)
  - `cta_click` (prop `location`: hero, footer, section-id)
  - `ai_widget_used` (widget de visibilidad IA)
  - `pricing_view`
- Opcional si el plan de Vercel lo permite: Speed Insights.

### 0.2 Bugs detectados (verificar y corregir)
1. **Hero duplicado en la home (tema claro):** el bloque hero aparece renderizado dos veces. Localizar y eliminar la duplicación.
2. **Títulos cortados/solapados:** sección "Si es repetitivo y sigue reglas..." en /servicios/automatizacion-ia y "Sistemas reales, aplicados a negocios reales" en la home aparecen con el heading solapado con la sección anterior. Probable conflicto de márgenes/padding entre secciones o animación de reveal con `overflow: hidden`. Revisar especificidad CSS entre selectores de sección y de componente.
3. **Contraste en tema oscuro:** texto secundario gris sobre negro por debajo de AA en varias cards (p. ej. "Lo que casi siempre aparece" en consultoría). Subir el token de texto secundario oscuro hasta cumplir WCAG AA (ratio ≥ 4.5:1 para body).

### 0.3 Tema claro por defecto
- `next-themes`: `defaultTheme="light"` (mantener toggle y `storageKey` para respetar elección previa del usuario).
- Motivo: audiencia = dueños de pyme no técnicos; el claro transmite empresa seria y lee mejor en páginas largas de texto.

---

## FASE 1 — Sistema de diseño

### 1.1 Concepto: "taller de ingeniería", no "startup de IA"

El diferencial real de Agenflow es que lo construye un ingeniero que diseñaba sistemas de instalaciones en hospitales y ahora diseña los sistemas internos de negocios. El diseño debe respirar **precisión técnica y esquema/plano**, no gradientes difusos de plantilla de IA. Eliminar los gradientes borrosos azul-violeta del hero.

### 1.2 Tokens de color (tema claro, principal)

Definir en CSS custom properties (Tailwind v4 `@theme`):

```css
--color-paper:      #FAFAF8;  /* fondo base, blanco cálido, no #FFF puro */
--color-surface:    #FFFFFF;  /* cards */
--color-ink:        #16181D;  /* texto principal */
--color-ink-soft:   #4A4F5A;  /* texto secundario (AA sobre paper) */
--color-blueprint:  #EEF1F8;  /* fondos de sección alternos, azul-gris muy claro tipo papel de plano */
--color-accent:     #3D48E8;  /* azul de marca, único acento. Ajustar al azul actual del logo si difiere */
--color-accent-ink: #2A32B8;  /* hover/estados */
--color-line:       #D8DCE6;  /* bordes, líneas de esquema */
```

Tema oscuro: derivar de los mismos tokens (`--color-paper: #0E1015`, etc.) garantizando AA. El oscuro es secundario; no invertir esfuerzo en efectos exclusivos de dark.

**Regla:** un solo acento (el azul). Nada de segundos acentos ni gradientes. El color se gana con los fondos `blueprint` alternos y la línea técnica.

### 1.3 Tipografía

- **Display (H1–H2):** `Archivo` (Google Fonts, variable). Usar en peso 600–700, tracking ligeramente negativo, y en H1 permitir el eje de anchura (semi-expanded) para carácter técnico. Es una fuente de raíz grotesca/industrial que encaja con "ingeniería" sin ser fría.
- **Body:** `Inter` (probablemente ya está). Mantener. 16–18px base, line-height 1.6.
- **Utility/labels/eyebrows/datos:** `IBM Plex Mono`, 12–13px, uppercase, tracking amplio. Sustituye a los eyebrows azules actuales. La mono refuerza el lenguaje de esquema técnico y es la firma tipográfica de la web.
- Cargar con `next/font` (subsets latin, display swap).

### 1.4 Elemento firma: el sistema de flujo

Elevar el diagrama de la página de automatización (herramientas → nodo → resultados) a **sistema visual de toda la marca**:

- **Líneas de conexión:** trazos de 1px color `--color-line`, con tramos discontinuos, esquinas en ángulo recto u ortogonales suaves (estilo plano de instalaciones, no curvas orgánicas).
- **Nodos:** pequeños círculos/cuadrados con borde, rellenos al pasar datos.
- **Animación:** un pulso que recorre la línea (`stroke-dashoffset` animado con motion), activado por scroll-reveal, una sola vez. Respetar `prefers-reduced-motion` (sin animación, línea estática).
- **Dónde se usa:** hero de la home (versión sutil de fondo o lateral), separadores entre secciones clave, el diagrama de automatización (ya existe, se refina), y micro-detalles en cards (esquina con nodo).
- **Dónde NO:** no saturar. Máximo 3 apariciones por página. El resto de la página, quieta y disciplinada.

### 1.5 Motion

- Scroll-reveals sobrios: fade + translateY(12px), duración 400ms, stagger corto en grids de cards. Una vez, no en cada scroll.
- Hover en cards: elevación mínima (border → accent, sin sombras dramáticas).
- `prefers-reduced-motion: reduce` → desactivar todo salvo transiciones de opacidad.

### 1.6 Componentes base a normalizar
- `SectionEyebrow` (mono, uppercase), `SectionTitle`, `Card`, `CTAButton` (primario azul / secundario outline), `FlowLine` (el elemento firma, SVG parametrizable), `FAQAccordion` (ya existe), `FounderStrip` (nuevo).

---

## FASE 2 — Funnel y CTAs (cambio estratégico)

### 2.1 Nueva jerarquía de conversión

| Nivel | Acción | Coste para el usuario | Dónde |
|---|---|---|---|
| CTA primario global | **"Cuéntanos tu caso"** → formulario de contacto | Gratis, nosotros llamamos | Header, hero, cierres de página |
| CTA secundario | "Ver servicios" / "Ver producto" | Navegación | Hero home, cards |
| Servicio (no CTA global) | "Solicitar consultoría" | De pago | Solo dentro de /servicios/consultoria-ia y precios |

**Cambios concretos:**
- Botón del header: "Contacto" → **"Cuéntanos tu caso"** (o mantener "Contacto" si rompe el layout en móvil; el destino es lo importante).
- TODOS los CTAs de cierre de página que hoy dicen "Solicitar consultoría" pasan a "Cuéntanos tu caso" → /contacto, **excepto** en la página de consultoría, donde el CTA propio del servicio se mantiene.
- "Solicitar presupuesto" (automatización, presencia online, precios) puede mantenerse como texto, pero apunta al mismo formulario de contacto con el dropdown preseleccionado vía query param (`/contacto?servicio=automatizacion`).

### 2.2 Formulario de contacto (rehacer copy, misma estructura)

Campos actuales están bien (Nombre, Email, Empresa opcional, dropdown servicio, mensaje). Cambios:

- **Título:** "Solicita tu consultoría" → **"Cuéntanos tu caso"**
- **Subtítulo:** "Nos cuentas cómo trabajáis hoy y qué te gustaría quitarte de encima. Lo leemos, y si podemos ayudarte, te llamamos. Si no podemos, te lo decimos también. Sin coste y sin compromiso."
- **Dropdown "¿En qué podemos ayudarte?":** añadir opción por defecto "No lo tengo claro todavía" como primera opción. Preseleccionable por query param.
- **Debajo del botón de envío:** "→ Te respondemos en menos de 24 horas laborables."
- **Estado post-envío (importante):** pantalla/mensaje de éxito con: "Recibido. Te escribimos en menos de 24h laborables desde info@agenflow.es — revisa también spam. Mientras tanto, puedes ver [cómo trabajamos]." Disparar evento `contact_form_submit`.
- Validación Zod con mensajes en el idioma activo, errores concretos ("Escribe un email válido", no "campo inválido").

---

## FASE 3 — Home (reescritura completa)

Reducir de ~11 secciones a 8. La home actual repite el mismo beneficio 4 veces y no muestra la prueba tangible (productos operativos). Estructura y copy nuevos:

### Sección 1 — Hero
- Eyebrow (mono): `AUTOMATIZACIÓN E IA PARA PYMES`
- **H1:** "Tu equipo pierde horas en trabajo que una máquina hace mejor."
- **Sub:** "Automatizamos los procesos que frenan tu negocio —facturas, datos, informes, seguimientos— para que esas horas vuelvan a lo que de verdad lo hace crecer. Cuéntanos tu caso y te decimos por dónde empezar. Sin humo."
- CTA primario: **Cuéntanos tu caso →** | CTA secundario: Ver servicios
- Visual: elemento firma (líneas de flujo) sobrio, sin gradientes.
- Debajo, en mono pequeño (sustituye a la línea actual): `CONSULTORÍA · AUTOMATIZACIÓN · SOFTWARE POR SECTOR · PRESENCIA ONLINE`

### Sección 2 — Qué hacemos (4 servicios)
- Eyebrow: `SERVICIOS`
- **H2:** "Primero te escuchamos. Después construimos."
- Mantener las 4 cards actuales con enlaces, pero reescribir descripciones en segunda persona y con escena concreta:
  - **Consultoría de IA:** "Dos sesiones de trabajo para radiografiar tu operación. Sales con un plan claro de qué automatizar y en qué orden. El plan es tuyo, lo ejecutes con nosotros o no."
  - **Automatización de procesos:** "Conectamos las herramientas que ya usas. Las facturas entran solas, los informes se generan solos, los avisos llegan a tiempo. Tu equipo deja de teclear."
  - **Software por sector:** "Producto propio con la IA dentro, diseñado para cómo trabaja tu sector de verdad. Ya operativo en inmobiliario y administración de fincas."
  - **Mejora de presencia online:** "Tu web rápida, que convierte, y visible donde la gente busca hoy: Google y la IA (ChatGPT, Gemini, Perplexity)."

### Sección 3 — Productos operativos (NUEVA — la prueba tangible)
- Eyebrow: `FUNCIONANDO HOY`
- **H2:** "No solo lo decimos. Lo tenemos construido."
- **Intro:** "Estos son productos nuestros, con la IA dentro, operativos ahora mismo en negocios reales:"
- Cards de **FincAI** (administración de fincas) y **Replo** (inmobiliarias) con badge `● OPERATIVO` (mono) y enlace a sus páginas de producto. Card tercera: "Sector legal — en desarrollo" si procede ser honesto con su estado; si está operativo, mismo badge.
- Cierre de sección: "El software que construimos para otros funciona porque primero lo construimos para nosotros."

### Sección 4 — Sistemas reales (mantener, reescribir)
- Mantener los 3 casos actuales (auditoría de cuentas, agente de leads, documento sin teclear) pero:
  - Sin cifras inventadas. Describir el antes → después en términos de proceso: "Antes: alguien confirmaba cada apunte a mano contra bancos y proveedores. Ahora: el sistema coteja y solo levanta la mano cuando algo no cuadra."
  - Cada caso con etiqueta mono del tipo de negocio (`DESPACHO`, `INMOBILIARIA`, `PYME`).
- Si en el futuro hay métricas reales de cliente, este es el sitio donde irán.

### Sección 5 — Widget IA (NUEVO en home, reutilizar el existente)
- Traer el componente funcional de /servicios/presencia-online adaptado:
- Eyebrow: `PRUÉBALO AHORA`
- **H2:** "¿Qué sabe la IA de tu negocio ahora mismo?"
- **Texto:** "Escribe el nombre de tu negocio y tu ciudad. Preguntamos a una IA con acceso a internet y te enseñamos aquí mismo qué encuentra. La respuesta casi siempre sorprende."
- Tras mostrar resultado, enlace: "Quiero que la IA me conozca →" a /servicios/presencia-online, y CTA "Cuéntanos tu caso".
- Nota técnica: mismo endpoint (@anthropic-ai/sdk). Añadir rate limiting básico si no existe (por IP, p. ej. 5/hora) para controlar coste al subir tráfico de ads. Evento `ai_widget_used`.

### Sección 6 — Founder strip (NUEVO)
- Bloque horizontal compacto: foto de Francisco + texto:
- **"Antes diseñaba los sistemas que hacen funcionar un hospital por dentro. Ahora diseño los que hacen funcionar tu negocio por dentro."**
- "Francisco J. Arias — Fundador · Ingeniero industrial. Más de 5 años en proyectos internacionales donde miles de detalles tienen que encajar. Agenflow aplica esa misma ingeniería a tu operación."
- Enlace: "Conoce la historia →" a /nosotros.
- Aquí NO hablar de "misión" ni "visión": una cara, un puente creíble, un enlace.

### Sección 7 — Cómo trabajamos + confianza (fusionar las 2 actuales)
- **H2:** "Por qué puedes confiar en nosotros."
- Comprimir a 4 puntos (columna izquierda "cómo trabajamos", derecha "tus datos"):
  1. "Hablas con quien lo construye. Sin comerciales ni intermediarios."
  2. "Ingeniería real. Años de proyectos exigentes; medimos resultados, no promesas."
  3. "RGPD por diseño. Datos en la UE, cifrado y control de accesos."
  4. "Confidencialidad firmada. Tu información se trata con el mismo cuidado que la nuestra."
- Añadir una línea de honestidad (genera más confianza que cualquier promesa): **"No todo se puede automatizar. Te decimos qué sí y qué no antes de empezar."**

### Sección 8 — Cierre FOMO + FAQ + CTA final
- Mantener **una sola** sección de urgencia. Conservar "Tu competencia preferiría que no nos conocieras." como H2 de cierre (funciona como remate si el resto del copy es sobrio), y **eliminar** "La distancia con quien ya lo hace se agranda cada mes" (tabla comparativa entera fuera: es la sección más plantilla de la web).
- FAQ: mantener las 4 preguntas actuales.
- CTA final: "Cuéntanos tu caso →" + línea: "Gratis. Te llamamos nosotros. Y si no podemos ayudarte, te lo decimos."

### Secciones ELIMINADAS de la home
1. "¿Automatización? ¿IA? ¿Por dónde se empieza?" → su esencia queda en una pregunta del FAQ ("No tengo claro qué automatizar, ¿por dónde empiezo?", que ya existe).
2. "Lo que esta tecnología le aporta a tu negocio" (6 chips genéricos) → fuera entera.
3. "La distancia con quien ya lo hace…" (tabla comparativa) → fuera.
4. "Hacemos que tu negocio funcione mejor por dentro" → fusionar su única idea útil en el hero/servicios; la sección desaparece.

---

## FASE 4 — Páginas interiores (ajustes puntuales)

### 4.1 /servicios/consultoria-ia — la mejor página, tocar poco
- Mantener estructura y copy ("Dos sesiones de trabajo, no una reunión comercial", "Te atiende quien va a construir tu solución": intactos).
- **Añadir claridad de precio:** es un servicio de pago con precio fijo; decirlo sin rodeos en la sección de las sesiones: "Precio fijo, no depende del alcance. Si después implementas el plan con nosotros, el 50% se descuenta del proyecto." (esto ya está en precios; traerlo aquí).
- CTA de cierre: mantener "Solicitar consultoría" (aquí sí), pero añadir salida blanda debajo: "¿Prefieres contarnos tu caso primero? Contacto gratuito →".

### 4.2 /servicios/automatizacion-ia
- Fix del bug de título solapado (Fase 0).
- CTAs "Solicitar presupuesto" → /contacto?servicio=automatizacion.
- El diagrama de herramientas conectadas se rediseña con el sistema de flujo de la Fase 1 (es el origen del elemento firma).
- Copy: bien en general. Retocar el hero: "Toda empresa tiene procesos. Las que crecen los tienen optimizados." → **"Cada tarea manual parece pequeña. Sumadas, frenan tu negocio."** (ya lo usa dentro: promoverlo a H1, es más concreto) y de sub usar la conexión de herramientas.

### 4.3 /servicios/desarrollo-software (software por sector)
- **Eliminar** la sección "El software del futuro, construido hoy" (visión sin contenido).
- Subir la sección de productos (FincAI, Replo, Sector legal) justo debajo del hero: la prueba antes que la tesis.
- Mantener "¿Conoces un sector a fondo? Construyámoslo juntos" (captación de partners, valiosa).
- Ajustar el estado de "Sector legal" a la realidad (¿operativo o en desarrollo?).

### 4.4 /servicios/presencia-online
- Fix del título cortado ("Para negocios locales como el tuyo").
- El widget se queda (además de su copia en home). Bien como está.
- CTAs → /contacto?servicio=presencia-online.

### 4.5 /nosotros
- La página es buena. Mejoras:
  - **Hero:** mantener "Nacimos dentro del problema que resolvemos".
  - En "De la construcción de hospitales a Agenflow", abrir con la frase puente del founder strip ("Antes diseñaba los sistemas que hacen funcionar un hospital por dentro…"). El resto del relato ya está bien hilado.
  - La cita de misión: acortarla a la mitad. Propuesta: **"Mi objetivo es que las pymes españolas produzcan más sin crecer en costes, con sistemas que aguantan cuando el negocio crece."**
  - "Sectores que conocemos de cerca": bien, mantener.
  - CTA final → contacto gratuito, no consultoría.

### 4.6 /precios
- Página sólida. Ajustes menores:
  - CTAs "Solicitar presupuesto" → /contacto con query param del plan.
  - En la card de Consultoría, el descuento del 50% ya está: bien.
  - Añadir bajo el H1 una línea de expectativa: "Pide presupuesto sin compromiso: primero entendemos tu caso, después ponemos número."

---

## FASE 5 — i18n, accesibilidad y QA

1. **next-intl:** todo el copy nuevo va a los ficheros de mensajes `es` y `en`. Traducir al inglés con el mismo tono (directo, sin jerga corporativa). El widget IA responde en el idioma activo.
2. **Accesibilidad:** contraste AA en ambos temas; focus visible en todos los interactivos; `prefers-reduced-motion` respetado; formulario con labels asociados y errores anunciados (`aria-live`).
3. **QA responsive:** especial atención a móvil (el tráfico de ads en RRSS será mayoritariamente móvil): hero, widget IA, tabla de precios (scroll horizontal o colapso a cards en <768px).
4. **SEO técnico:** metadata por página con el copy nuevo, OG images, sitemap. H1 único por página.
5. **Verificación visual:** capturas de cada página en claro y oscuro, desktop y móvil, antes de dar por cerrado.

---

## Orden de ejecución recomendado

1. Fase 0 completa (analytics + bugs + tema claro por defecto) — commit propio, deploy, baseline de métricas.
2. Fase 1 (tokens, fuentes, componentes base, FlowLine) — sin tocar contenido aún.
3. Fase 2 (funnel: formulario + CTAs globales).
4. Fase 3 (home nueva).
5. Fase 4 (interiores, en el orden 4.3 → 4.2 → 4.5 → 4.1 → 4.4 → 4.6).
6. Fase 5 (i18n EN + a11y + QA).

Cada fase en su propia rama/PR para poder revisar y revertir por separado.

## Qué NO hacer
- No inventar testimonios, logos de clientes ni métricas de resultados.
- No añadir secciones nuevas no listadas aquí.
- No usar gradientes difusos ni más de un color de acento.
- No convertir "Solicitar consultoría" en CTA global: solo vive en su página y en precios.
- No tocar el modelo de precios ni el copy de la página de consultoría más allá de lo indicado.
