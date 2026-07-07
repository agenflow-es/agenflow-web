# 📥 Component Inbox — buzón de componentes

Sitio para **pegar componentes de UI que quieras incorporar a la web**. Yo (Claude)
los recojo de aquí, los **adapto al sistema "Línea B"** y los muevo ya integrados a
`src/components/…`.

Piénsalo como una bandeja de entrada: aquí entra el componente **en crudo** (tal cual
lo copiaste de donde sea), y de aquí sale, ya adaptado, a la web real.

> ✅ **Esta carpeta NO rompe el build.** `design/**` está excluido de TypeScript
> (`tsconfig.json`) y de ESLint (`eslint.config.mjs`), así que puedes pegar código
> con dependencias que no tenemos, imports raros o incluso a medias. Da igual: aquí
> nada se compila.

---

## Cómo añadir un componente

1. Crea una subcarpeta con el nombre del componente:
   `design/component-inbox/<nombre-componente>/`
2. Pega dentro el/los archivo(s) del componente (`.tsx`, `.css`, lo que sea).
3. (Opcional pero muy útil) añade un `SOURCE.md` con:
   - **De dónde sale** (URL: shadcn, 21st.dev, Aceternity, MagicUI, un CodePen, un
     dribbble, una captura…).
   - **Qué dependencias npm necesita** (si las conoces).
   - **Para qué lo quieres** / en qué sección de la web lo imaginas.
4. Dime "revisa el inbox" o el nombre del componente, y lo integro.

### Método rápido (uno a uno) — recomendado

Para probar componentes de uno en uno, usa siempre el mismo fichero:
**`design/component-inbox/_inbox.txt`**

1. Borra lo que hubiera y pega dentro el código del componente nuevo.
2. Dime "revisa el inbox" (o "siguiente componente").
3. Lo leo, te digo si se puede integrar (deps, adaptación, choques de marca) y,
   si das el OK, lo monto en la web.

No hace falta guardar los anteriores: cada vez que lo reescribes, el de antes ya
lo he evaluado en la conversación. Si algún componente lo quieres conservar para
más adelante, guárdalo en su propia subcarpeta (abajo) en vez de en `_inbox.txt`.

### Método con carpeta (varios archivos o para conservar)

Si el componente son varios archivos, o quieres tenerlo guardado, crea una
subcarpeta con su nombre y mételo ahí.

### Alternativa sin pegar código

Si el componente está en **shadcn / un registro / una librería conocida**, no hace
falta que lo copies: dime el nombre o la URL y lo traigo yo (tengo acceso a la
herramienta de shadcn). El buzón es para cuando el código lo tienes tú.

---

## Qué hago yo al integrarlo (adaptación "Línea B")

Al mover un componente del inbox a `src/components/`, lo dejo coherente con la marca:

- **Color** → uso los tokens (`--accent` azul #5B82FF, `--bg`, `--surface`, `--fg`,
  `--border`…). Nada de colores hardcodeados ni paletas ajenas.
- **Tipografía** → Inter (cuerpo/títulos), Geist Mono (labels), Space Grotesk
  (wordmark). Quito cualquier fuente externa que traiga el componente.
- **Dark / light** → funcionando en los dos temas vía tokens, no solo en uno.
- **Motion** → uso nuestro sistema (`@/lib/motion`: `EASE`, `DURATION`…) y respeto
  `prefers-reduced-motion`.
- **Dependencias** → si trae una librería nueva, te aviso antes de instalarla; si se
  puede resolver con lo que ya tenemos (`motion`, `lucide-react`, Radix, Tailwind v4),
  lo reescribo sin dep nueva.
- **Accesibilidad y limpieza** → foco visible, roles/aria correctos, sin código muerto.

Verifico siempre en claro **y** oscuro, escritorio **y** móvil, con `tsc` + `eslint`
en verde, antes de darlo por integrado.

---

## Qué NO es esto

- No es donde viven los componentes terminados (esos están en `src/components/`).
- No es una librería de producción: nada de aquí se importa desde la web directamente.
- Puedo borrar del inbox lo ya integrado (te aviso), para que no se acumule.

## Sugerencias de dónde sacar componentes con nivel

Por si te sirve de inspiración para pegar aquí: **shadcn/ui**, **Aceternity UI**,
**Magic UI**, **21st.dev**, **Cult UI**, **Kokonut UI**, **Motion Primitives**,
**React Bits**. Copia el que te guste, pégalo aquí, y yo lo dejo con nuestra piel.
