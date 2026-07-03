---
name: apply-brand-tokens
description: Agenflow brand tokens and visual rules ("Línea B · técnico/esquemático") — auto-loads when touching components or global styles so brand rules don't have to be rediscovered each session.
paths: "src/**/*.tsx","src/app/globals.css"
user-invocable: false
---

Quick reference for `design/agenflow-brand/IDENTIDAD.md` + `design/agenflow-brand/design_handoff_agenflow_social/README.md` (full docs — read them for anything not covered here). This is the cheat sheet, not the source of truth.

## The one rule that matters most

**No blurred gradient blobs, ever.** This site shipped the same generic "AI SaaS" hero cliché twice (dark aurora-glow, then a lighter "Superchat"-style version) before landing on the real brand system. If you're about to add a `blur-` + `radial-gradient` decorative shape, stop — use the grid/hairline/node system below instead.

## Color

Single accent, used with restraint (small text, thin lines, small highlights — never a large fill):
- `--accent` (light: `#2f54eb`, dark: `#5b82ff`) — AA-safe on body text and button backgrounds. Use for text, buttons, active states.
- `--accent-bright` (`#5b82ff` both themes) — the vivid brand blue, for **non-text decorative** elements only (diagram lines/nodes, large highlights) where AA text-contrast rules don't apply.
- Everything else is neutral: `--bg`, `--bg-elev`, `--bg-elev2`, `--text`, `--text-muted`, `--border`, `--border-strong`, `--grid`.

## Type

- Display/body: **Inter** (`--font-display` / `--font-body`).
- Labels, eyebrows, index numbers, mono data: **Geist Mono** (`--font-label`) — always uppercase, tracked wide (`tracking-[0.13em]`).
- Wordmark only (never body copy): **Space Grotesk** (`--font-wordmark`).

## The visual grammar ("Línea B")

- **Grid**: faint, masked/faded toward edges — texture, not a pattern you consciously notice. Token `--grid`.
- **Hairline frame + corner "+" marks**: thin border inset from the container edge, small `+` glyphs (mono, `text-accent`, low opacity) at the corners. See `HeroBlueprint.tsx` for the reference implementation.
- **Nodes and connectors**: circles/pills joined by thin lines (straight or right-angled, not curvy), optionally with a subtle animated dash pulse (`af-dash` keyframe in `globals.css`). This is the site's signature device — echoes the isotipo's three ascending laminas ("el flujo siempre asciende"). See `ProcessFlow.tsx` and `HeroBlueprint.tsx`.
- **Radii stay tight**: 6–10px (`--radius` / `--radius-lg`), not 16+. Large radii read as generic consumer-SaaS, not engineering.
- Max ~3 uses of the signature node/line device per page — restraint is part of the effect.

## Isotipo

Three ascending parallelograms, dark lamina at the bottom → light at the top (never reorder). Reference SVG in `src/components/ui/primitives.tsx` (`Logo`) and `ProcessFlow.tsx`.
