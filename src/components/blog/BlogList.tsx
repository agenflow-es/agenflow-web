"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type PostCard = {
  slug: string;
  title: string;
  description: string;
  dateIso: string;
  dateLabel: string;
  category: string;
  categoryLabel: string;
  type: "pillar" | "cluster";
  readingTime: string;
};

type Category = { slug: string; label: string };

/**
 * BlogList — the SEO-wall index grid with a category filter. Client-side so the
 * reader can narrow by pillar without a page load; cards are the Línea B "rich
 * card" (gradient, blueprint "+", accent hover). Pillars carry a "Guía" badge.
 */
export function BlogList({
  posts,
  categories,
  allLabel,
  readMore,
  guideLabel,
  emptyLabel,
}: {
  posts: PostCard[];
  categories: Category[];
  allLabel: string;
  readMore: string;
  guideLabel: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState<string>("all");

  // Only offer filters that actually have posts, plus "all".
  const present = new Set(posts.map((p) => p.category));
  const filters = [
    { slug: "all", label: allLabel },
    ...categories.filter((c) => present.has(c.slug)),
  ];

  const shown =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter */}
      <div
        role="tablist"
        aria-label="Categorías del blog"
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const on = active === f.slug;
          return (
            <button
              key={f.slug}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(f.slug)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[13.5px] font-medium transition-colors",
                on
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <p className="mt-12 text-center text-[16px] text-fg-muted">
          {emptyLabel}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link
              key={p.slug}
              href={`/recursos/blog/${p.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface to-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
            >
              <span
                aria-hidden
                className="absolute right-4 top-4 font-label text-[15px] leading-none text-fg-faint transition-colors duration-300 group-hover:text-accent"
              >
                +
              </span>

              <div className="flex items-center gap-2.5 font-label text-[11px] uppercase tracking-[0.11em]">
                <span className="font-medium text-accent">{p.categoryLabel}</span>
                {p.type === "pillar" && (
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] tracking-[0.08em] text-fg-muted">
                    {guideLabel}
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-fg">
                {p.title}
              </h2>
              <p className="mt-3 flex-1 text-[14.5px] leading-[1.6] text-fg-muted">
                {p.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-label text-[12px] text-fg-faint">
                  <time dateTime={p.dateIso}>{p.dateLabel}</time>
                  <span aria-hidden> · </span>
                  {p.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent">
                  {readMore}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
