import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { CtaSection } from "@/components/layout/CtaSection";
import { siteConfig } from "@/lib/site";
import { getPost, getPosts } from "@/content/blog/posts";

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
      languages: { es: `/es${path}`, en: `/en${path}` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
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

  const df = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/${locale}/recursos/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="border-b border-border">
        <Container className="max-w-[760px] py-[clamp(56px,8vw,104px)]">
          <Link
            href="/recursos/blog"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg-muted transition hover:text-accent"
          >
            <span aria-hidden>←</span> {t("backToBlog")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-label text-[12.5px] text-fg-faint">
            <span className="font-medium uppercase tracking-[0.1em] text-accent">
              {post.tag}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{df.format(new Date(post.date))}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.022em] text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-fg-muted text-pretty">
            {post.description}
          </p>

          <hr className="mt-8 border-border" />

          <div className="mt-2">
            <Post />
          </div>
        </Container>
      </article>

      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        cta={t("ctaCta")}
        href="/contacto?reason=consultoria"
      />
    </>
  );
}
