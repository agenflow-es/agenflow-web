import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { HeroLineaB } from "@/components/sections/HeroLineaB";
import { BlogList, type PostCard } from "@/components/blog/BlogList";
import { buildMetadata } from "@/lib/metadata";
import { getPosts, getCategory, CATEGORIES } from "@/content/blog/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, key: "blog", path: "/recursos/blog" });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blogPage");
  const posts = getPosts(locale);
  const df = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const cards: PostCard[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    dateIso: p.date,
    dateLabel: df.format(new Date(p.date)),
    category: p.category,
    categoryLabel: getCategory(p.category)?.label ?? p.category,
    type: p.type,
    readingTime: p.readingTime,
  }));

  const categories = CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }));

  return (
    <>
      <HeroLineaB
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="border-b border-border bg-bg py-[clamp(56px,9vw,110px)]">
        <Container>
          <BlogList
            posts={cards}
            categories={categories}
            allLabel={t("all")}
            readMore={t("readMore")}
            guideLabel={t("guide")}
            emptyLabel={t("empty")}
          />
        </Container>
      </section>

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
