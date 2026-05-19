'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center gap-4 px-6 py-20">
      <p className="text-sm uppercase tracking-wider text-secondary">Error</p>
      <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
        Something glitched.
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-secondary md:text-lg">
        The page hit an unexpected error. Try again, or head back home — if it
        keeps happening, let me know via the contact form.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-card shadow-soft transition-shadow hover:shadow-hover"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold text-text transition-colors hover:border-primary hover:text-primary"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
