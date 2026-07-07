// Blog post registry. Metadata lives here (typed, fast to list); the article
// body lives in the matching MDX file under src/content/blog/<locale>/<slug>.mdx.
// Same slug across locales → the URL is shared and the locale switcher keeps the
// reader on the same article. The blog is the SEO wall: posts are grouped into
// five content pillars (categories) and mark themselves pillar vs cluster, so
// the index can filter and the article can build the internal-linking mesh.

/** The five content pillars — the blog's categories (Spanish-first). */
export const CATEGORIES = [
  { slug: "automatizacion", label: "Automatización" },
  { slug: "ia-pymes", label: "IA para pymes" },
  { slug: "software-medida", label: "Software a medida" },
  { slug: "presencia-online", label: "Presencia online" },
  { slug: "inmueble", label: "Inmueble" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export type BlogFaq = { q: string; a: string };

export type BlogPostMeta = {
  slug: string;
  locale: string;
  title: string;
  description: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  /** ISO date of the last meaningful update (optional). */
  updated?: string;
  /** One of the five pillars (CATEGORIES slug). */
  category: CategorySlug;
  /** "pillar" = broad cornerstone guide; "cluster" = focused long-tail piece. */
  type: "pillar" | "cluster";
  /** e.g. "5 min". */
  readingTime: string;
  /** Optional Q&A rendered at the end + emitted as FAQPage schema (AEO). */
  faq?: BlogFaq[];
};

const posts: BlogPostMeta[] = [
  {
    slug: "por-donde-empezar-a-automatizar",
    locale: "es",
    title: "Por dónde empezar a automatizar tu negocio",
    description:
      "Automatizar no empieza comprando software, sino mirando dónde se va el tiempo. Una guía práctica para dar el primer paso sin equivocarte.",
    date: "2026-06-18",
    category: "automatizacion",
    type: "pillar",
    readingTime: "5 min",
    faq: [
      {
        q: "¿Por dónde empiezo a automatizar en mi empresa?",
        a: "Por el proceso que más horas o errores te cuesta hoy, no por la herramienta. Identifícalo, mide cuántas horas a la semana consume y a qué coste, y automatízalo de principio a fin antes de pasar al siguiente.",
      },
      {
        q: "¿Qué tareas conviene automatizar primero?",
        a: "Las que se repiten a menudo, siguen reglas claras y mueven datos entre sitios (de un correo a una hoja, de un formulario a tu CRM). Si una tarea cumple las tres, casi siempre hay margen para quitártela de encima.",
      },
      {
        q: "¿Cuánto cuesta automatizar un proceso?",
        a: "Depende del alcance y se decide caso a caso. Lo importante es medir antes las horas y el coste que consume el proceso: así sabes si compensa y puedes demostrar el resultado después.",
      },
    ],
  },
  {
    slug: "por-donde-empezar-a-automatizar",
    locale: "en",
    title: "Where to start automating your business",
    description:
      "Automation doesn't start by buying software — it starts by looking at where time goes. A practical guide to taking the first step without getting it wrong.",
    date: "2026-06-18",
    category: "automatizacion",
    type: "pillar",
    readingTime: "5 min",
  },

  {
    slug: "como-responder-leads-idealista-al-instante",
    locale: "es",
    title: "Cómo responder a los leads de Idealista al instante (y quedarte la venta)",
    description:
      "En inmobiliaria, el primero que contesta se lleva la visita. Aprende a responder al instante los leads de Idealista, a cualquier hora, y quedarte la venta.",
    date: "2026-04-03",
    category: "inmueble",
    type: "cluster",
    readingTime: "5 min",
    faq: [
      {
        q: "¿Esto sirve también para los contactos que me entran por teléfono?",
        a: "Sí. El agente atiende llamadas igual que mensajes: coge el teléfono cuando tu equipo no puede, resuelve las preguntas de siempre y agenda la visita. Si la llamada pide criterio, la deriva a una persona con el contexto ya recogido.",
      },
      {
        q: "¿Puede atender en inglés a compradores extranjeros?",
        a: "Sí. Detecta el idioma del cliente y le responde en el suyo, algo muy útil en zonas con mucho comprador de fuera. Así no pierdes contactos internacionales solo por la barrera del idioma fuera de horario.",
      },
      {
        q: "¿Cuánto se tarda en ponerlo en marcha?",
        a: "Se empieza por un solo canal, el que más leads te trae, y desde ahí se amplía. No hace falta parar tu operativa ni montar nada complejo: se conecta a tu agenda, se prueba con contactos reales y se ajusta el tono antes de dejarlo funcionando solo.",
      },
    ],
  },
  {
    slug: "que-es-un-agente-de-ia",
    locale: "es",
    title: "Qué es un agente de IA y para qué sirve en tu pyme",
    description:
      "Te explicamos sin tecnicismos qué es un agente de IA, en qué se diferencia de un chatbot y cómo puede quitarle trabajo repetitivo a tu pyme.",
    date: "2026-04-07",
    category: "ia-pymes",
    type: "pillar",
    readingTime: "7 min",
    faq: [
      {
        q: "¿Un agente de IA es lo mismo que ChatGPT?",
        a: "No exactamente. ChatGPT es una herramienta general con la que conversas. Un agente usa esa clase de tecnología por dentro, pero está montado para tu negocio: conoce tus reglas, se conecta a tus herramientas y ejecuta tareas concretas, no solo charla.",
      },
      {
        q: "¿Necesito saber de tecnología para tener un agente en mi negocio?",
        a: "No. Tú aportas el conocimiento de tu negocio y de cómo trabajáis; la parte técnica la montamos nosotros. Tu papel es explicar cómo funcionan las cosas, no programar nada.",
      },
      {
        q: "¿Funciona con las herramientas que ya uso o tengo que cambiar de programas?",
        a: "Lo normal es que se conecte a lo que ya tienes: tu correo, tu agenda, tu CRM o tu programa de facturación. La idea es sumar capacidad a tu forma de trabajar, no obligarte a empezar de cero con todo nuevo.",
      },
    ],
  },
  {
    slug: "automatizar-seguimiento-de-leads",
    locale: "es",
    title: "Cómo automatizar el seguimiento de leads y dejar de perder ventas",
    description:
      "Las ventas no se pierden por precio, sino por silencio. Aprende a automatizar el seguimiento de tus leads sin perder el trato cercano.",
    date: "2026-04-10",
    category: "automatizacion",
    type: "cluster",
    readingTime: "5 min",
    faq: [
      {
        q: "¿Un seguimiento automático no suena impersonal?",
        a: "No si lo montas bien. Los mensajes van en tu tono y con tus palabras, y en cuanto el lead responde algo real, el hilo pasa a una persona. Automatizas la constancia, no la conversación.",
      },
      {
        q: "¿Cuántos mensajes de seguimiento debo enviar antes de rendirme?",
        a: "No hay número mágico, pero varios toques espaciados y útiles funcionan mejor que uno solo. Lo importante es que cada mensaje aporte algo distinto y que pares en cuanto la persona pide que la dejes en paz.",
      },
      {
        q: "¿Necesito un CRM caro para empezar?",
        a: "No. Puedes empezar con un solo canal y las herramientas que ya usas. Lo que marca la diferencia no es el software, sino que ningún lead se quede sin respuesta ni sin seguimiento por despiste.",
      },
    ],
  },
  {
    slug: "como-aparecer-en-chatgpt",
    locale: "es",
    title: "Cómo hacer que ChatGPT recomiende tu negocio",
    description:
      "Descubre cómo hacer que ChatGPT tenga en cuenta tu negocio: web clara, contenido útil, datos coherentes y reseñas. Sin humo ni garantías falsas.",
    date: "2026-04-15",
    category: "presencia-online",
    type: "pillar",
    readingTime: "7 min",
    faq: [
      {
        q: "¿Se puede garantizar que ChatGPT recomiende mi negocio?",
        a: "No, y quien te lo prometa te está vendiendo humo. La IA decide sola y cambia a menudo. Lo que sí puedes hacer es ponértelo todo a favor: dejar tu negocio tan claro y coherente en internet que seas una respuesta fácil de dar cuando alguien pregunte.",
      },
      {
        q: "¿Tengo que pagar algo a ChatGPT para salir en sus respuestas?",
        a: "No. La IA no vende puestos ni acepta pagos por recomendarte. Aprende de lo que ya hay publicado sobre ti: tu web, tu ficha de Google, tus reseñas y las menciones en otros sitios. El trabajo está en ordenar y aclarar todo eso, no en pagar.",
      },
      {
        q: "¿Esto me sirve si tengo un negocio local y pequeño?",
        a: "Sí, y a menudo más. Mucha gente pregunta a la IA por opciones cerca de su zona. Si dejas claro qué haces, para quién y dónde trabajas, y tus datos coinciden en todas partes, tienes mucho ganado frente a negocios más grandes pero confusos.",
      },
    ],
  },
  {
    slug: "software-a-medida-o-de-catalogo",
    locale: "es",
    title: "Software a medida o de catálogo: cuál le conviene a tu empresa",
    description:
      "¿Te vale una herramienta del mercado o necesitas algo hecho para ti? Aprende a decidir entre software de catálogo y a medida sin equivocarte.",
    date: "2026-04-20",
    category: "software-medida",
    type: "pillar",
    readingTime: "6 min",
    faq: [
      {
        q: "¿Es siempre mejor el software a medida?",
        a: "No. Si tu proceso es estándar, estás empezando o el presupuesto manda, una herramienta de catálogo suele ser la opción más sensata. Lo a medida gana cuando tu forma de trabajar es distinta a la del montón o cuando pierdes tiempo uniendo datos entre programas a mano.",
      },
      {
        q: "¿Cómo sé que se me ha quedado corta la herramienta que uso?",
        a: "Cuando pagas por funciones que no usas, exportas y copias datos entre programas cada semana, tu equipo salta entre pestañas todo el día o ninguna herramienta encaja del todo con cómo trabajáis. Dos o tres de esas señales suelen indicar que tu empresa ha crecido y tus herramientas no.",
      },
      {
        q: "¿Puedo combinar software de catálogo y a medida?",
        a: "Sí, y a menudo es lo más inteligente: usas herramientas del mercado para lo estándar y una capa a medida que las une y automatiza el trasiego de datos entre ellas. No tiene por qué ser todo o nada.",
      },
    ],
  },
  {
    slug: "ia-para-administracion-de-fincas",
    locale: "es",
    title: "IA para administración de fincas: menos papeleo, más comunidades",
    description:
      "Descubre cómo la IA te quita el papeleo de la administración de fincas: incidencias seguidas, documentación a mano y más comunidades sin ampliar tu equipo.",
    date: "2026-04-24",
    category: "inmueble",
    type: "cluster",
    readingTime: "5 min",
    faq: [
      {
        q: "¿La IA va a sustituir al administrador de fincas?",
        a: "No. Se encarga del papeleo repetitivo (registrar incidencias, ordenar documentos, responder dudas frecuentes) para que tú dediques tu tiempo al trato, las decisiones difíciles y las juntas complicadas. Lo delicado sigue pasando por tus manos.",
      },
      {
        q: "¿Necesito cambiar todos mis programas para empezar?",
        a: "No hace falta cambiarlo todo de golpe. Se empieza por lo que más te pesa hoy, se monta bien de principio a fin y compruebas el resultado antes de dar el siguiente paso.",
      },
      {
        q: "¿Un vecino puede recibir información equivocada de otra comunidad?",
        a: "No. El asistente responde con la información de la comunidad de cada vecino: su cuota, sus fechas y sus acuerdos. Y lo delicado, como una reclamación seria, te lo deriva a ti en lugar de contestarlo.",
      },
    ],
  },
  {
    slug: "automatizar-facturas",
    locale: "es",
    title: "Automatizar las facturas: menos errores y horas recuperadas",
    description:
      "Meter facturas a mano te cuesta horas y errores caros. Descubre qué puedes automatizar de punta a punta y qué dejas para tu equipo.",
    date: "2026-04-29",
    category: "automatizacion",
    type: "cluster",
    readingTime: "4 min",
    faq: [
      {
        q: "¿Sirve aunque cada proveedor me mande la factura de una forma distinta?",
        a: "Sí. El sistema captura el dato llegue como llegue: email, PDF adjunto o foto por WhatsApp. Lee el importe, la fecha y el proveedor sin que nadie teclee, sin importar el formato.",
      },
      {
        q: "¿Tengo que cambiar mi programa de contabilidad?",
        a: "No hace falta. La idea es que la factura entre ya ordenada en la contabilidad o la hoja que ya usas. Se adapta a tu forma de trabajar, no al revés.",
      },
      {
        q: "¿Pierdo el control de lo que se paga?",
        a: "Al contrario. El sistema hace el trabajo mecánico y marca solo lo que no cuadra. Tú revisas esas excepciones y decides. El criterio y los pagos siguen siendo cosa tuya.",
      },
    ],
  },
  {
    slug: "ia-para-atencion-al-cliente",
    locale: "es",
    title: "IA para atención al cliente: responder al instante sin ampliar equipo",
    description:
      "Responde al instante a cada cliente, a cualquier hora, sin ampliar tu equipo. Descubre qué hace un agente de IA en atención y cómo empezar por un canal.",
    date: "2026-05-04",
    category: "ia-pymes",
    type: "cluster",
    readingTime: "5 min",
    faq: [
      {
        q: "¿Un agente de IA sustituye a mi equipo de atención?",
        a: "No. Atiende lo repetitivo y lo que llega a deshora, y escala a una persona cuando el caso pide criterio. Tu equipo deja de contestar siempre lo mismo y dedica su tiempo a las consultas que de verdad lo necesitan.",
      },
      {
        q: "¿No hay riesgo de que responda cualquier cosa o suene a robot?",
        a: "Un agente bien montado solo usa la información de tu negocio que tú le das, y cuando algo se sale de ahí, deriva a una persona en vez de improvisar. Responde con el tono y las palabras de tu marca, no como un menú automático.",
      },
      {
        q: "¿Por qué canal conviene empezar?",
        a: "Por el que más consultas te trae y donde más se repiten las preguntas: normalmente WhatsApp, el formulario de la web o el correo. Empiezas por uno, lo pruebas, y cuando funciona sumas el siguiente sin complicarte.",
      },
    ],
  },
  {
    slug: "por-que-tu-web-no-te-trae-clientes",
    locale: "es",
    title: "Por qué tu web ya no te trae clientes (y cómo arreglarlo)",
    description:
      "Tu web está bonita pero no entra ni un cliente. Estos son los 4 motivos habituales y cómo se arregla cada uno para que empiece a traerte trabajo.",
    date: "2026-05-08",
    category: "presencia-online",
    type: "cluster",
    readingTime: "5 min",
    faq: [
      {
        q: "¿Tengo que rehacer toda la web desde cero?",
        a: "No siempre. Lo normal es empezar por el fallo que más clientes te está costando ahora mismo (que no te encuentren, que vaya lenta o que los contactos se pierdan) e ir cerrando agujeros desde ahí.",
      },
      {
        q: "¿Por qué debería preocuparme de aparecer en ChatGPT y no solo en Google?",
        a: "Porque cada vez más gente pregunta directamente a ChatGPT quién le resuelve algo, en lugar de buscar en Google. Si tu web no está preparada para eso, no existes para todas esas personas.",
      },
      {
        q: "¿Cómo sé si mi web convierte o solo está de adorno?",
        a: "Mírala como un desconocido: ¿en cinco segundos queda claro qué haces, para quién y qué tiene que hacer el visitante? ¿Va rápida en el móvil? ¿Cuando alguien escribe, le respondes al momento? Si algo falla, ahí se te van los clientes.",
      },
    ],
  },
  {
    slug: "ia-y-proteccion-de-datos",
    locale: "es",
    title: "IA y protección de datos: qué mirar antes de usarla en tu negocio",
    description:
      "Antes de meter IA en tu negocio, esto es lo que debes preguntar sobre los datos de tus clientes para hacerlo bien y sin sustos.",
    date: "2026-05-13",
    category: "ia-pymes",
    type: "cluster",
    readingTime: "4 min",
    faq: [
      {
        q: "¿Es legal usar IA con los datos de mis clientes en España?",
        a: "Sí, siempre que lo hagas con cabeza. La IA bien implementada es compatible con el RGPD. La clave está en saber dónde se guardan los datos, que no se usen para entrenar modelos de terceros, controlar quién accede y poder borrarlos cuando quieras.",
      },
      {
        q: "¿Cómo sé si mis datos se usan para entrenar los modelos de IA?",
        a: "Pregúntalo directamente al proveedor. Muchas herramientas serias permiten desactivar ese uso, pero no siempre viene activado por defecto. Que exista la opción no basta: confirma que en tu caso está aplicada y, mejor aún, que te lo dejen por escrito.",
      },
      {
        q: "¿Qué significa que la infraestructura esté en la Unión Europea?",
        a: "Que los servidores donde se guarda la información están dentro de la UE, bajo las reglas del RGPD. Es lo más recomendable: juegas con una ley conocida y con garantías claras. Si los datos viajan fuera, conviene revisar con más detalle qué protección tienen.",
      },
    ],
  },
];

export function getPosts(locale: string): BlogPostMeta[] {
  return posts
    .filter((p) => p.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(
  locale: string,
  slug: string,
): BlogPostMeta | undefined {
  return posts.find((p) => p.locale === locale && p.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * The internal-linking mesh: posts related to the given one. Same category
 * first (the cluster), then filled with other recent posts if short. Never
 * returns the post itself.
 */
export function getRelatedPosts(
  locale: string,
  slug: string,
  limit = 3,
): BlogPostMeta[] {
  const all = getPosts(locale);
  const current = all.find((p) => p.slug === slug);
  const rest = all.filter((p) => p.slug !== slug);
  const sameCat = rest.filter((p) => p.category === current?.category);
  const others = rest.filter((p) => p.category !== current?.category);
  return [...sameCat, ...others].slice(0, limit);
}
