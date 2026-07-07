import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { siteConfig } from "@/lib/site";
import {
  getPost,
  getPosts,
  getCategory,
  getRelatedPosts,
} from "@/content/blog/posts";

// Only prerender locale × slug combos that actually have content; anything
// else 404s instead of attempting a missing MDX import.
export const dynamicParams = false;

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  return getPosts(params.locale).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  const path = `/recursos/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { es: `/es${path}` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = await getTranslations("blogPage");
  const { default: Post } = await import(
    `@/content/blog/${locale}/${slug}.mdx`
  );

  const category = getCategory(post.category);
  const related = getRelatedPosts(locale, slug).map((p) => ({
    slug: p.slug,
    title: p.title,
    categoryLabel: getCategory(p.category)?.label ?? p.category,
    readingTime: p.readingTime,
  }));

  const df = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const base = `${siteConfig.url}/${locale}`;
  const url = `${base}/recursos/blog/${slug}`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale,
    articleSection: category?.label,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/recursos/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article>
        <Container className="max-w-[1060px] py-[clamp(48px,7vw,96px)]">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-label text-[12.5px] text-fg-faint"
          >
            <Link href="/" className="transition hover:text-accent">
              {t("home")}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/recursos/blog" className="transition hover:text-accent">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-fg-muted">{category?.label}</span>
          </nav>

          {/* Title block */}
          <div className="mt-8 max-w-[720px]">
            <div className="flex flex-wrap items-center gap-3 font-label text-[12.5px] text-fg-faint">
              <span className="font-medium uppercase tracking-[0.1em] text-accent">
                {category?.label}
              </span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{df.format(new Date(post.date))}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
              {post.updated && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    {t("updated")} {df.format(new Date(post.updated))}
                  </span>
                </>
              )}
            </div>

            <h1 className="mt-4 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
              {post.title}
            </h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-fg-muted text-pretty">
              {post.description}
            </p>
          </div>

          <hr className="mt-8 border-border" />

          {/* Body + TOC */}
          <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_190px]">
            <div id="article-body" className="max-w-[720px]">
              <Post />

              {/* FAQ (rendered + FAQPage schema above) */}
              {post.faq && post.faq.length > 0 && (
                <section className="mt-14">
                  <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold leading-[1.2] tracking-[-0.02em]">
                    {t("faqTitle")}
                  </h2>
                  <div className="mt-6">
                    {post.faq.map((f, i) => (
                      <details
                        key={i}
                        className="group border-t border-border py-5 last:border-b"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[18px] font-semibold">
                          {f.q}
                          <span className="text-[22px] text-accent transition group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-[16px] leading-[1.6] text-fg-muted">
                          {f.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <ArticleToc contentSelector="#article-body" title={t("toc")} />
              </div>
            </aside>
          </div>
        </Container>
      </article>

      <RelatedPosts posts={related} title={t("relatedTitle")} />

      {/* Cierre */}
      <section className="border-t border-border bg-surface py-[clamp(72px,12vw,150px)]">
        <Container className="text-center">
          <p className="mx-auto max-w-[24ch] font-display text-[clamp(26px,4.4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            {t("ctaTitle")}
          </p>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-9">
            <Link
              href="/contacto?reason=consultoria&subject=consultoria"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 text-[15px] font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              {t("ctaCta")} <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
