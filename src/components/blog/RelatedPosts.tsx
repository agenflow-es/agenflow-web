import { Link } from "@/i18n/navigation";

type Related = {
  slug: string;
  title: string;
  categoryLabel: string;
  readingTime: string;
};

/**
 * RelatedPosts — the internal-linking mesh at the foot of each article. Same
 * category first (the cluster), then recent posts. Server component.
 */
export function RelatedPosts({
  posts,
  title,
}: {
  posts: Related[];
  title: string;
}) {
  if (posts.length === 0) return null;
  return (
    <section className="border-t border-border bg-bg">
      <div className="mx-auto max-w-[960px] px-[clamp(20px,5vw,48px)] py-[clamp(48px,7vw,88px)]">
        <h2 className="font-display text-[clamp(22px,3vw,30px)] font-semibold tracking-[-0.02em] text-fg">
          {title}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/recursos/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-gradient-to-b from-surface to-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="font-label text-[11px] uppercase tracking-[0.11em] text-accent">
                {p.categoryLabel}
              </span>
              <h3 className="mt-3 flex-1 font-display text-[16.5px] font-semibold leading-[1.3] text-fg">
                {p.title}
              </h3>
              <span className="mt-4 font-label text-[12px] text-fg-faint">
                {p.readingTime}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
