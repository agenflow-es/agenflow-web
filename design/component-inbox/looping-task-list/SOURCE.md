# Looping task list (FeatureSection)

Componente pegado por Francisco (2026-07-06). Guardado para el landing de
**automatización de procesos**.

- **Qué es:** sección a 2 columnas. Izquierda = lista de tareas que se
  auto-desplaza en bucle (marquee vertical) con desvanecido arriba/abajo dentro
  de una card. Derecha = badge + titular + tags.
- **Uso previsto:** bloque de "qué automatizamos".

## Dependencias
- `framer-motion` → **sustituir por `motion/react`** (ya la tenemos; misma librería).
- `@/components/ui/card` y `@/components/ui/badge` → **no existen** en el repo;
  reemplazar por divs con tokens propios (no hace falta shadcn card/badge).
- `lucide-react` → ya instalada.
- **Cero dependencias nuevas.**

## Adaptación pendiente al integrar (Línea B)
- Colores a tokens (`text-fg`, `bg-surface`, `border-border`), azul de marca en iconos.
- El "cuadradito gris" placeholder de cada fila → icon chip azul con el icono real
  (ahora el icono va suelto a la derecha; centralizarlo en el chip).
- Movimiento con nuestro sistema + `prefers-reduced-motion` (en reduce, lista quieta).
- **Copy real, sin cifras/claims inventados:** fuera "100+ Automations" y
  "Enterprise Ready"; bajar el "AI-powered/AI-driven". Tareas reales: facturas,
  datos entre CRM/ERP, seguimientos, informes, alertas…
