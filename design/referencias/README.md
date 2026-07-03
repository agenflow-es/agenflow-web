# Biblioteca de referencias de diseño

Componentes profesionales de referencia (21st.dev, v0.app, Aceternity, magicui, etc.) para diseñar la web con criterio, no partiendo de cero.

> **Importante:** nada de esta carpeta se compila ni forma parte de la app. `design/` está excluido de `tsconfig` y de eslint. Estos `.tsx` son **material de referencia para adaptar**, no para importar tal cual desde `src/`.

## Cómo funciona

1. **Guardar una referencia.** Copia el código que te da la página (21st.dev/v0/…) en un archivo nuevo dentro de la sección que corresponda, p. ej. `hero/mi-referencia.tsx`. Añade arriba un bloque de comentario con:
   - `Fuente:` la URL.
   - `Por qué:` qué te gusta / qué queremos de aquí.
   - (Yo relleno `Adaptar:` — qué hay que cambiar para que encaje con la marca.)
   Si tienes prisa, suéltalo en `_inbox/` y ya lo archivo yo en su sección con las notas.

2. **Usar una referencia.** Cuando decidamos adoptar una, la porto a `src/components/` **adaptándola a la marca**: nunca se copia tal cual. Traducciones obligatorias (ver [`apply-brand-tokens`](../../.claude/skills/apply-brand-tokens/SKILL.md)):
   - `framer-motion` → `motion/react` (la dependencia directa de framer-motion se quitó del repo).
   - colores hardcodeados (`#222`, `bg-gray-100`, `dark:bg-zinc-900`…) → tokens de marca (`--bg`, `--text`, `--accent`, `--border`…).
   - radios grandes (`rounded-[30px]`) → `--radius` / `--radius-lg` (6–10px).
   - un solo acento; nada de blobs de gradiente difuso.

## Referencias archivadas

_(se irá llenando; una línea por referencia con enlace al archivo)_

- **Hero** — [container-scroll.tsx](hero/container-scroll.tsx) — mockup que rota/escala con el scroll (Aceternity).

## Wishlist (enlaces por evaluar, aún sin capturar código)

Migrado de la antigua lista suelta. Cuando saquemos el código de alguno, se convierte en un archivo archivado arriba y se quita de aquí.

**Clientes / logos:** [logos3](https://21st.dev/community/components/shadcnblockscom/logos3/default) · [sparkles+progressive-blur](https://21st.dev/community/components/linarui/sparkles/with-progressive-blur-and-slider) · [progressive-blur con logos](https://21st.dev/community/components/motion-primitives/progressive-blur/with-logos) · [theme-toggle](https://21st.dev/community/components/ayushmxxn/theme-toggle/default) · [action-search-bar](https://21st.dev/community/components/kokonutd/action-search-bar/default)

**Hero:** [hero-195-1](https://21st.dev/community/components/shadcnblockscom/hero-195-1/default)

**CTAs:** [cta11](https://21st.dev/community/components/shadcnblockscom/shadcnblocks-com-cta11/default) · [cta-4](https://21st.dev/community/components/shadcnblockscom/cta-4/default)

**Dialogs:** [alert-dialog con icono](https://21st.dev/community/components/shadcn/alert-dialog/with-icon) · [alert-dialog default](https://21st.dev/community/components/shadcn/alert-dialog/default)

**Features:** [feature108](https://21st.dev/community/components/shadcnblockscom/shadcnblocks-com-feature108/default) · [accordion-feature-section](https://21st.dev/community/components/shadcnblockscom/accordion-feature-section/default) · [feature-with-advantages](https://21st.dev/community/components/tommyjepsen/feature-with-advantages/default) · [feature-with-image](https://21st.dev/community/components/tommyjepsen/feature-with-image/default) · [feature](https://21st.dev/community/components/tommyjepsen/feature/default) · [features-5](https://21st.dev/community/components/tailark/features-5/default) · [features-11](https://21st.dev/community/components/tailark/features-11/default) · [casestudy-5](https://21st.dev/community/components/shadcnblockscom/casestudy-5/default)

**About us:** [about-3](https://21st.dev/community/components/shadcnblockscom/about-3/default)

**Cards:** [bento-grid](https://21st.dev/community/components/kokonutd/bento-grid/default) · [display-cards](https://21st.dev/community/components/Codehagen/display-cards/default) · [features-4](https://21st.dev/community/components/tailark/features-4/default) · [grid-feature-cards](https://21st.dev/community/components/efferd/grid-feature-cards/default)

**Visuales premium:** [radial-orbital-timeline](https://21st.dev/community/components/jatin-yadav05/radial-orbital-timeline/default) · [features-9](https://21st.dev/community/components/tailark/features-9/default)

**Texto animado:** [typewriter-text](https://21st.dev/community/components/hextaui/typewriter-text/default) · [text-reveal](https://21st.dev/community/components/magicui/text-reveal/default) · [text-effect](https://21st.dev/community/components/motion-primitives/text-effect/default) · [shining-text](https://21st.dev/community/components/hextaui/shining-text/default) · [scroll-hero-section](https://21st.dev/community/components/rahil1202/scroll-hero-section/default)

**Tabs:** [con iconos/scroll/badge](https://21st.dev/community/components/originui/tabs/with-icons-scroll-and-badge) · [rounded](https://21st.dev/community/components/originui/tabs/rounded) · [with-line](https://21st.dev/community/components/originui/tabs/with-line) · [vertical con tooltip](https://21st.dev/community/components/originui/tabs/vertical-tabs-with-tooltip)

**Producto / dashboard / métricas:** [area-charts-1](https://21st.dev/community/components/reui/area-charts-1/default) · [features-6](https://21st.dev/community/components/tailark/features-6/default) · [features-7](https://21st.dev/community/components/tailark/features-7/default) · [saas-template](https://21st.dev/community/components/wisedev/saa-s-template/default) · [about-us-section](https://21st.dev/community/components/uniquesonu/about-us-section/default)

**Scroll area:** [scroll-area](https://21st.dev/community/components/reui/scroll-area/default)

**Gráficas:** [area-chart-1 (reaviz)](https://21st.dev/community/components/reaviz/area-chart-1/default) · [area-charts-yaxis](https://21st.dev/community/components/Bklit/area-chart/area-charts-yaxis) · [rounded-area-chart](https://21st.dev/community/components/svg-ui/area-chart/rounded-area-chart) · [area-chart-one](https://21st.dev/community/components/SubframeApp/area-chart/area-chart-one) · [dotted-area-chart](https://21st.dev/community/components/svg-ui/area-chart/dotted-area-chart) · [area-charts-2](https://21st.dev/community/components/reui/area-charts-2/default)

**Sliders:** [temperature-slider](https://21st.dev/community/components/originui/slider/temperature-slider) · [slider-with-ticks](https://21st.dev/community/components/originui/slider/slider-with-ticks)

**Spinner:** [spinner-1](https://21st.dev/community/components/shugar/spinner-1/custom-size)
