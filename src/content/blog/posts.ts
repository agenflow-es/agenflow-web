// Blog post registry. Metadata lives here (typed, fast to list); the article
// body lives in the matching MDX file under src/content/blog/<locale>/<slug>.mdx.
// Same slug across locales → the URL is shared and the locale switcher keeps the
// reader on the same article.
export type BlogPostMeta = {
  slug: string;
  locale: string;
  title: string;
  description: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  tag: string;
  /** e.g. "5 min". */
  readingTime: string;
};

const posts: BlogPostMeta[] = [
  {
    slug: "por-donde-empezar-a-automatizar",
    locale: "es",
    title: "Por dónde empezar a automatizar tu negocio",
    description:
      "Automatizar no empieza comprando software, sino mirando dónde se va el tiempo. Una guía práctica para dar el primer paso sin equivocarte.",
    date: "2026-06-18",
    tag: "Automatización",
    readingTime: "5 min",
  },
  {
    slug: "por-donde-empezar-a-automatizar",
    locale: "en",
    title: "Where to start automating your business",
    description:
      "Automation doesn't start by buying software — it starts by looking at where time goes. A practical guide to taking the first step without getting it wrong.",
    date: "2026-06-18",
    tag: "Automation",
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
