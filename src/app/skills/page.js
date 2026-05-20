import { SKILLS } from '../../data/skills';

export default function Skills() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-3 text-center text-4xl font-bold text-text">Skills</h1>
      <p className="mx-auto mb-10 max-w-2xl text-center text-base text-secondary">
        A snapshot of the techniques, languages, and tools I work with across the bench
        and the terminal.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SKILLS.map(({ pillar, icon, items }) => (
          <section
            key={pillar}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-lg text-primary"
              >
                <i className={`fas ${icon}`}></i>
              </span>
              <h2 className="text-xl font-semibold text-text">{pillar}</h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center rounded-full border border-border bg-bg-secondary px-3 py-1 text-sm text-text transition-colors hover:border-primary hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
