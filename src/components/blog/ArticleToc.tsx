"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

const ACCENTS: Record<string, string> = {
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
  ü: "u",
  ñ: "n",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[áéíóúüñ]/g, (c) => ACCENTS[c] ?? c)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * ArticleToc — table of contents for long articles. Reads the <h2>s inside the
 * article body on mount (MDX has no build-time slugs, so we assign ids here),
 * links to them, and highlights the one in view. Hidden when there are fewer
 * than two headings. Sticky aside on desktop; hidden on mobile to keep reading
 * clean.
 */
export function ArticleToc({
  contentSelector,
  title,
}: {
  contentSelector: string;
  title: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;
    let obs: IntersectionObserver | undefined;

    // Defer to the next frame so the MDX body is painted before we read its
    // headings (and so we're not calling setState synchronously in the effect).
    const raf = requestAnimationFrame(() => {
      const hs = Array.from(root.querySelectorAll("h2"));
      const list: Heading[] = hs.map((h, i) => {
        const text = h.textContent ?? "";
        const id = h.id || slugify(text) || `sec-${i}`;
        h.id = id;
        return { id, text };
      });
      setHeadings(list);

      obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(e.target.id);
          }
        },
        { rootMargin: "0px 0px -75% 0px", threshold: 0 },
      );
      hs.forEach((h) => obs!.observe(h));
    });

    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [contentSelector]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label={title} className="text-[13.5px]">
      <p className="mb-4 font-label text-[11px] uppercase tracking-[0.13em] text-fg-faint">
        {title}
      </p>
      <ul className="space-y-2.5 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={
                "-ml-px block border-l-2 pl-4 leading-snug transition-colors " +
                (active === h.id
                  ? "border-accent text-fg"
                  : "border-transparent text-fg-muted hover:text-fg")
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
