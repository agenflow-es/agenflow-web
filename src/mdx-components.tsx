import type { MDXComponents } from "mdx/types";

// Brand-styled MDX elements for blog posts. Uses the project's semantic
// tokens (no `dark:` — tokens follow data-theme at runtime). Required by
// @next/mdx for the App Router.
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 scroll-mt-24 font-display text-[clamp(22px,3vw,30px)] font-bold leading-[1.2] tracking-[-0.02em] text-balance">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 font-display text-[20px] font-semibold leading-[1.3]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-[17px] leading-[1.75] text-fg-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[17px] leading-[1.7] text-fg-muted marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-[17px] leading-[1.7] text-fg-muted marker:text-fg-faint">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-[1.7]">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition hover:decoration-accent"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-accent pl-5 text-[17px] italic leading-[1.7] text-fg">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: ({ children }) => (
    <code className="rounded-[var(--radius)] bg-surface-2 px-1.5 py-0.5 font-label text-[0.88em]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-[14px] leading-[1.6] [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
