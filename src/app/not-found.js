import Link from 'next/link';

export const metadata = {
  title: 'Not found',
  description: 'That page doesn’t exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center gap-4 px-6 py-20">
      <p className="text-sm uppercase tracking-wider text-secondary">404</p>
      <h1 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
        That page slipped out of focus.
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-secondary md:text-lg">
        The URL you tried doesn&apos;t resolve to anything on this site. It may
        have moved, or it may never have existed.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-card shadow-soft transition-shadow hover:shadow-hover"
        >
          Back home
        </Link>
        <Link
          href="/work-experience"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold text-text transition-colors hover:border-primary hover:text-primary"
        >
          Work experience
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold text-text transition-colors hover:border-primary hover:text-primary"
        >
          Projects
        </Link>
      </div>
    </main>
  );
}
