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
