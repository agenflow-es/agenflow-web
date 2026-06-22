import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { buildMetadata } from "@/lib/metadata";
import { getPosts } from "@/content/blog/posts";

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

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="border-b border-border">
        <Container className="py-[clamp(72px,10vw,140px)]">
          {posts.length === 0 ? (
            <p className="text-center text-[17px] text-fg-muted">{t("empty")}</p>
          ) : (
            <div className="mx-auto grid max-w-[920px] gap-6 sm:grid-cols-2">
              {posts.map((p) => (
                <Reveal key={p.slug}>
                  <Link
                    href={`/recursos/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-7 shadow-[var(--shadow)] transition duration-200 hover:-translate-y-1 hover:border-accent"
                  >
                    <div className="flex items-center gap-3 font-label text-[12.5px] text-fg-faint">
                      <span className="font-medium uppercase tracking-[0.1em] text-accent">
                        {p.tag}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{p.readingTime}</span>
                    </div>
                    <h2 className="mt-4 font-display text-[21px] font-semibold leading-[1.25] tracking-[-0.01em]">
                      {p.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-fg-muted">
                      {p.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <time className="text-[13px] text-fg-faint" dateTime={p.date}>
                        {df.format(new Date(p.date))}
                      </time>
                      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                        {t("readMore")}{" "}
                        <span
                          aria-hidden
                          className="transition group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        cta={t("ctaCta")}
        href="/contacto?reason=consultoria"
      />
    </>
  );
}
