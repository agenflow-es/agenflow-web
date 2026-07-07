# Audiencia — ICP y catálogo de sectores

> **Nota para agenflow-web (copia del repo `marketing`, 2026-07-05):** define a quién le habla el copy.
> Aplica a la web tal cual. Complementa `brand-voice.md` §2 (misma carpeta). El catálogo de sectores
> (§2) se genera en el repo `agenflow-platform`; los enlaces `../estrategia/…` apuntan al repo `marketing`.

> Quién debe reconocerse al leer una pieza de Agenflow. Complementa `brand-voice.md` §2.

---

## 1. ICP general (perfil que NO se especializa por sector en bios/lanzamientos)

- **Quién:** dueño, socio o responsable de operaciones de una pyme española. No técnico. Decide solo
  o con 1-2 personas más.
- **Situación:** el negocio funciona, pero por dentro se sostiene a base de trabajo manual repetitivo
  — su equipo o él mismo hace de "pegamento" entre herramientas y procesos que no hablan entre sí.
- **Lo que nota:** pierde horas, se le escapan cosas (leads, pagos, seguimientos), y sabe que la
  competencia grande ya opera distinto — pero cree que la IA/automatización "es para empresas más
  grandes que la suya".
- **Lo que rechaza:** jerga técnica, promesas vagas, comerciales que no entienden su negocio,
  compromisos largos sin ver resultado.
- **Lo que necesita oír:** que se puede empezar sin reestructurar toda la empresa, que habla con
  quien construye (no con un vendedor), y que el primer paso (consultoría) no le compromete a nada.

> Fuente de este perfil: `../agenflow-brand/IDENTIDAD.md` §3 y el patrón repetido en las piezas ya
> escritas. No está validado con entrevistas reales de clientes todavía — actualizar en cuanto
> existan (ver pilar 6 "casos y testimonios" en `../estrategia/redes-estrategia.md`).

---

## 2. Catálogo de sectores (fuente: `agenflow-platform/agenflow-backend/leads/config/sectors.py`)

Los sectores en los que Agenflow ya prospecta activamente. Sirven para variar ejemplos en el copy
generalista (sin especializarse en ninguno) y como candidatos a piezas de profundidad sectorial más
adelante:

`dentista · clínica médica · fisioterapia · veterinario · óptica · centro de estética · abogado ·
gestoría/asesoría · inmobiliaria · gimnasio · constructora/reformas · estudio de arquitectura ·
concesionario de coches · instaladores (electricidad, fontanería, placas solares, climatización, gas)
· notaría`

**Vertical de cabecera (pilar "El inmueble"):** inmobiliaria, construcción/reformas, arquitectura,
notaría — todo lo que rodea a un inmueble. Es el único grupo con profundidad propia hoy (ver
`../estrategia/redes-estrategia.md` §3, pilar 3).

**Regla de uso:** en piezas generalistas, alternar sector de ejemplo entre esta lista para no sonar
de un solo nicho (ver `../estrategia/redes-estrategia.md` §6). No inventar dolores específicos de un
sector que no esté aquí confirmado — si hace falta un ejemplo de un sector nuevo, comprobar antes que
esté en `sectors.py` o preguntar.

---

## 3. Pendiente (rellenar con research real, no con suposiciones)

- [ ] Persona detallada por sector de cabecera (inmobiliaria primero).
- [ ] Objeciones reales recogidas de conversaciones/consultorías.
- [ ] Primer caso de cliente real → activa el pilar 6 de testimonios.
