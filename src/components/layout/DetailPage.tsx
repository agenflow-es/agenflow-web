import { Link } from "@/i18n/navigation";

export function DetailPage({
  title,
  intro,
  points,
  cta,
  children,
}: {
  title: string;
  intro: string;
  points?: string[];
  cta?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-[clamp(20px,5vw,48px)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.022em]">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-[1.6] text-fg-muted">{intro}</p>
      {points && points.length > 0 && (
        <ul className="mt-8 space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 text-fg">
              <span aria-hidden className="text-accent">
                —
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
      {cta && (
        <Link
          href="/contacto"
          className="mt-10 inline-block rounded-[var(--radius)] bg-accent px-6 py-3 font-medium text-accent-fg transition hover:-translate-y-0.5"
        >
          {cta}
        </Link>
      )}
    </section>
  );
}
