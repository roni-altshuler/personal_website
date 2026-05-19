import Link from 'next/link';

export default function NextPrevNav({ prev, next }) {
  return (
    <nav className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/research/${prev.slug}`}
          className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-hover"
        >
          <span className="text-xs uppercase tracking-wider text-secondary">
            ← Previous case study
          </span>
          <span className="mt-1 font-semibold text-text group-hover:text-primary transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/research/${next.slug}`}
          className="group flex flex-col rounded-lg border border-border bg-card p-4 text-right transition-shadow hover:shadow-hover sm:ml-auto sm:w-full"
        >
          <span className="text-xs uppercase tracking-wider text-secondary">
            Next case study →
          </span>
          <span className="mt-1 font-semibold text-text group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
