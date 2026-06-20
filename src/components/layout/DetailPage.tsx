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
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">{intro}</p>
      {points && points.length > 0 && (
        <ul className="mt-8 space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
              <span aria-hidden className="text-zinc-400">
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
          className="mt-10 inline-block rounded-full bg-foreground px-6 py-3 font-medium text-background"
        >
          {cta}
        </Link>
      )}
    </section>
  );
}
