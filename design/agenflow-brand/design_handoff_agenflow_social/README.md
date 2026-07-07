# Agenflow — Sistema visual para redes sociales (Instagram)

Paquete de identidad de marca para **construir posts**. Está pensado para que Claude Code (o cualquier desarrollador) genere publicaciones nuevas siguiendo un sistema ya decidido y aprobado. **No reescribas el sistema: aplícalo.**

---

## 1. Qué es esto y cómo usarlo

Agenflow automatiza procesos y aplica IA en pymes, y construye software por sector (legal e inmobiliario). Entra vía consultoría + automatización. **Tono de marca:** técnico, fiable, directo, orientado a resultados de negocio. **Nada de "humo" corporativo ni lenguaje de "transformación digital".** Posicionamiento premium, al nivel visual de Vercel / Linear / Resend.

Los archivos `.html` de `referencias/` son **referencias de diseño** (prototipos del aspecto previsto), no código de producción para copiar tal cual. La tarea es **recrear estas plantillas como generador de posts** en el entorno que elijas (la línea B es la elegida). Si no hay codebase aún, elige el framework más apropiado (p. ej. una función que renderice a `<canvas>`/SVG y exporte PNG, o componentes React que se capturen a imagen).

**Fidelidad: ALTA (hi-fi).** Colores, tipografía, espaciados y composición son finales. Reprodúcelos con exactitud.

**Línea elegida: B · Técnico / esquemático.** Rejilla, hairlines, diagramas mínimos, etiquetas y números en mono. Transmite ingeniería y producto real. (Las líneas A·Editorial y C·Cálido se exploraron y descartaron; no se incluyen.)

---

## 2. Formatos

| Formato | Tamaño (px) | Uso |
|---|---|---|
| Post / slide de carrusel | **1080 × 1350** (4:5 vertical) | Portadas, contenido, cierre, gráficos sueltos |
| Portada de destacada (highlight) | 1080 × 1080 (círculo centrado; subir en 1080×1920 si IG recorta) | Iconos de highlights |
| Story (pendiente de diseñar) | 1080 × 1920 | — |

Una sola idea por slide. Márgenes constantes. La **portada** debe funcionar como miniatura en el grid (es lo que decide el clic) y las portadas de una serie deben reconocerse como familia.

---

## 3. Design tokens

### Color
| Token | Hex | Uso |
|---|---|---|
| `--blue` Azul Agenflow (primario) | `#5B82FF` | Resalta UNA palabra clave por slide; índices/etiquetas; CTA. Con moderación, nunca como relleno. |
| `--blue-200` | `#7898FF` | Índices de slide, acentos secundarios mono |
| `--blue-100` | `#A0B6FF` | Lámina clara del isotipo; chips suaves |
| `--blue-700` | `#4b6cd7` | Lámina media del isotipo (sobre claro) |
| `--blue-900` | `#344f9f` | Lámina oscura del isotipo (sobre claro) |
| `--ink` Tinta / negro | `#14161D` | Texto sobre fondo claro |
| `--paper` Neutro claro | `#EDEAE3` | Texto sobre fondo oscuro / fondo de tarjetas de spec |
| `--text-dark` | `#F3F1EC` | Titulares sobre oscuro (blanco cálido) |
| `--bg-dark` Fondo oscuro plano | `#0B0E1A` | Fondo de posts dark |
| Degradado oscuro | `#141A30 → #0A0E1D` (157deg) | Fondo alternativo para dark (portadas/cierre) |
| Fondo claro | `#FFFFFF` | Fondo de posts light |
| Texto secundario (dark) | `#9aa2bf` | Cuerpo/subtítulos sobre oscuro |
| Texto secundario (light) | `#5d6275` | Cuerpo/subtítulos sobre claro |
| Mono apagado (dark) | `#7e88a6` | Cabecera/pie mono sobre oscuro |
| Mono apagado (light) | `#8a8f9c` | Cabecera/pie mono sobre claro |

Tonos del isotipo **sobre fondo oscuro** (oscuro→claro): `#5B82FF · #7898FF · #A0B6FF`.
Tonos del isotipo **sobre fondo claro** (oscuro→claro): `#344f9f · #4b6cd7 · #5b82ff`.

### Tipografía
- **Titulares y cuerpo:** **Inter** — titulares Bold/Black (700/800/900), cuerpo Regular (400). Google Fonts.
- **Secundaria (etiquetas, índices, nodos, código, CTA tipo comando):** **Geist Mono** (400/500/600). Google Fonts. *(Elegida por el cliente; sustituyó a JetBrains Mono.)*
- **Wordmark / firma:** **Space Grotesk** SemiBold (600). Ver §5.

Escala de referencia (a 1080×1350):
| Rol | Familia | Tamaño | Peso | Tracking |
|---|---|---|---|---|
| Titular portada | Inter | 72 px | 700 | -0.022em |
| Titular contenido | Inter | 58 px | 700 | -0.02em |
| Cuerpo / apoyo | Inter | 36 px | 400 | — |
| Cabecera/pie mono | Geist Mono | 23 px | 400 | — |
| Índice de slide | Geist Mono | 23 px | 400 | — |
| Nodos de diagrama | Geist Mono | 30 px | 400 | — |
| Frase de cierre (sub) | Inter | 42 px | 400 | — |

Mínimo legible en miniatura: el titular nunca por debajo de ~24 px reales. Debe aguantar español largo sin romper la rejilla (probar textos largos).

### Rejilla, márgenes y chrome
- Lienzo 1080×1350.
- **Rejilla** de 64 px. Opacidad: **posts oscuros** muy tenue (`rgba(120,152,255,0.035)`); **posts blancos SIN rejilla** (fondo limpio). Esto es una regla del cliente.
- **Marco hairline** a 48 px del borde: `1px solid rgba(91,130,255,0.16)` (dark) / `rgba(20,22,29,0.14)` (light).
- **Marcas "+"** (cruces) en esquinas, en `#5B82FF`, Geist Mono 24 px. Presentes en portadas y cierre.
- **Padding interno** del contenido: 60 px dentro del marco.
- **Cabecera mono:** `contexto · etiqueta` a la izquierda, `[ NN / 09 ]` a la derecha, separada por hairline inferior.
- **Pie mono:** dato opcional a la izquierda + `agenflow.es` a la derecha, separado por hairline superior.

### Radios y sombras
- Radio de tarjeta de post (mockup/preview): 6 px. Cajas de diagrama: 4–8 px. Chips: 6–14 px.
- Sombra de preview (no va en el export final): `0 24px 60px rgba(0,0,0,.45)` (dark) / `0 24px 60px rgba(0,0,0,.18)` (light).

---

## 4. Temas y ritmo de feed

Hay **dos temas intercambiables**, mismo sistema:
- **Dark** (más premium y reconocible; tema base): fondo `#0B0E1A` o degradado `#141A30→#0A0E1D`, texto `#F3F1EC`/`#9aa2bf`, isotipo en tonos claros (`#5B82FF·#7898FF·#A0B6FF`).
- **Light**: fondo `#FFFFFF` **sin rejilla**, texto `#14161D`/`#5d6275`, isotipo en tonos oscuros (`#344f9f·#4b6cd7·#5b82ff`).

**Regla de feed (damero):** cada post alterna el tema respecto a sus vecinos; el grid se lee como patrón, no como muro plano. Un carrusel usa UN solo tema (todas sus slides iguales); en el grid solo cuenta su portada. El azul aparece en todas las casillas (palabra clave o índice): es el hilo que cose dark y light.

---

## 5. Reglas de marca (OBLIGATORIAS — no rediseñar)

- **Wordmark:** "agenflow" SIEMPRE en minúsculas, **Space Grotesk SemiBold, tracking -0.035em**. El asta de la "f" lleva un **corte diagonal deliberado** — no lo corrijas. El wordmark se usa **solo como firma** (esquina/pie). Archivos: `assets/agenflow-wordmark.svg` (oscuro, para fondos claros) y `assets/agenflow-wordmark-blanco.svg` (blanco, para fondos oscuros).
- **Isotipo:** 3 láminas/paralelogramos que ascienden (= flujo / automatización / capas). Orientación correcta y **obligatoria: lámina clara arriba → lámina oscura abajo**. No reordenar, separar ni recolorear fuera de las paletas indicadas. Archivos: `assets/agenflow-isotipo.svg` (color), `-blanco.svg`, `-mono.svg`.
- Marca de agua discreta del isotipo en portadas; isotipo **presente y mayor en el slide de cierre**.
- El isotipo, dibujado inline en las plantillas, son 3 `<polygon>` con esta geometría (sobre `viewBox="0 0 64 64"`):
  ```
  <polygon points="8,50 32,50 44,40 20,40"  fill="<clara>"></polygon>
  <polygon points="15,38 39,38 51,28 27,28" fill="<media>"></polygon>
  <polygon points="22,26 46,26 58,16 34,16" fill="<oscura>"></polygon>
  ```
  Las láminas sueltas como bloque gráfico se hacen con `clip-path:polygon(33.3% 0,100% 0,66.7% 100%,0 100%)`.

---

## 6. Plantillas (3 tipos reutilizables)

Referencia visual completa: `referencias/Agenflow-Sistema-B.dc.html` (plantillas base + panel de especificación + destacadas + gráficos sueltos) y `referencias/Agenflow-Light-Visuales.dc.html` (tema light + esquemas estáticos + mockup de feed + comparador de fuente).

### A · PORTADA
Es la miniatura del grid. Cabecera mono `agenflow · serie-NN` + `[ 01 / 09 ]`. Bloque central: isotipo (150×150) + divisor vertical hairline + 3 líneas mono `capa_01 · captura / capa_02 · proceso / capa_03 · resultado`. **Titular grande** (Inter 700, ~72 px) con UNA palabra clave en `#5B82FF`. Pie: `// guárdalo 🔖` (gancho) + `agenflow.es`. Cruces "+" en las 4 esquinas.

### B · SLIDE DE CONTENIDO
Una idea por slide. Cabecera `tarea-NN · etiqueta` + `[ 0N / 09 ]`. Titular (Inter 700, ~58 px). **Diagrama de nodos opcional**: cajas mono unidas por `──▸` en `#5B82FF`, el último nodo resaltado (borde `#5B82FF` + fondo `rgba(91,130,255,.14)`). Apoyo breve (Inter 400, máx. 2 líneas) con un término en negrita/azul. Dato mono opcional en el pie.

### C · CIERRE / CTA
Isotipo presente y mayor (150×150). Pregunta/remate (Inter 700, ~68 px) + frase de apoyo. **CTA en formato comando mono**: `> consultoría --en-bio` en caja con borde/fondo azul tenue. Índice `[ 09 / 09 ]`. **Nunca precios ni cifras inventadas.**

### Gráficos sueltos (posts individuales, sin índice de slide)
- **Cita:** comilla gigante `"` en azul + frase (Inter 700) + atribución mono `— agenflow`.
- **Dato cualitativo:** caja "antes" (apagada) → `▼` azul → caja "después" (resaltada azul). **Sin números inventados** — es cualitativo.
- **Anuncio:** chip mono `NUEVO` (fondo azul) + titular + CTA comando.

### Esquemas / infografías (estáticos)
El feed **no admite movimiento**: todo en composición fija (nada de animación). Ejemplos en la referencia: capas etiquetadas (capturar/procesar/resolver), flujo `email → hoja → CRM` con flecha sólida, mapa de convergencia (varias entradas → agenflow → una respuesta), sello de marca (isotipo + anillos concéntricos).

### Destacadas (highlights)
Círculo (fondo dark, anillo hairline interior) con un glifo mono o el isotipo centrado, y el nombre debajo en mono. Un glifo por destacada; el azul solo en el glifo. Nombres propuestos (editables): `automatiza · casos · legal · inmo · sobre`.

---

## 7. Copywriting

- Español, tono técnico y directo, orientado a negocio. Frases cortas. Una idea por pieza.
- Resaltar **una sola** palabra/expresión clave por slide en `#5B82FF`.
- Prohibido: "transformación digital", humo corporativo, **precios**, métricas/cifras inventadas, fotos de personas (la cuenta es voz de empresa, sin cara).
- CTA siempre hacia `consultoría --en-bio`.

---

## 8. Assets incluidos (`assets/`)
- `agenflow-wordmark.svg` — wordmark oscuro (fondos claros)
- `agenflow-wordmark-blanco.svg` — wordmark blanco (fondos oscuros)
- `agenflow-isotipo.svg` / `-blanco.svg` / `-mono.svg`
- `agenflow-lockup-horizontal.svg` / `-horizontal-blanco.svg` / `-vertical.svg`

Fuentes (cargar de Google Fonts): **Inter** (400–900), **Geist Mono** (400/500/600), **Space Grotesk** (600).

## 9. Archivos de referencia (`referencias/`)
- `Agenflow-Sistema-B.dc.html` — plantillas base, panel de spec, destacadas, gráficos sueltos.
- `Agenflow-Light-Visuales.dc.html` — tema light, esquemas estáticos, mockup de feed, comparador de fuente.
- `support.js` — runtime necesario para abrir los `.dc.html` en navegador (solo para visualizar las referencias; no es parte del sistema de marca).

> Para verlos: abre los `.html` en un navegador (necesitan `support.js` al lado, ya incluido). Son prototipos para inspeccionar valores y composición — la implementación final debe **generar posts** reproduciendo estos tokens y reglas.
