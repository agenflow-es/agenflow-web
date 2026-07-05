# docs — documentos del proyecto

Documentos de trabajo de agenflow-web: investigación, planes y briefs. No forma parte de la app (no se compila).

## Estructura

- **[plan/](plan/)** — planes de ejecución.
  - [rediseno-web.md](plan/rediseno-web.md) — plan por fases del rediseño de la web (fases 0-5).
- **[investigacion/](investigacion/)** — investigación de mercado y competencia.
  - [competencia.md](investigacion/competencia.md) — estudio de 20 webs del sector (agencias IA España, referentes internacionales, GEO/webs-IA).
- **[brief/](brief/)** — briefs y encargos.
  - [brief-inicial.md](brief/brief-inicial.md) — brief inicial del proyecto (histórico).

## Qué NO vive aquí (y por qué)

Estos son paquetes/carpetas funcionales autocontenidas, no documentos sueltos; se quedan donde las herramientas y sus rutas internas las esperan:

- `design/agenflow-brand/` — kit de marca (logo, color, tipografía, `IDENTIDAD.md`, `MARCA.txt`). Referenciado por ruta desde el skill `apply-brand-tokens`.
- `design/design-brief-file/` — bundle de handoff de diseño (HTML, screenshots, README con rutas relativas internas).
- `design/referencias/` — biblioteca de componentes de referencia para adaptar.
- `.claude/`, `CLAUDE.md`, `AGENTS.md`, `README.md` (raíz) — configuración e instrucciones del proyecto.
