import { SKILLS } from '../../data/skills';
import { FadeUp } from '../../components/anim/Reveal';

export default function Skills() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <FadeUp as="h1" className="mb-3 text-center text-4xl font-bold text-text">
        Skills
      </FadeUp>
      <FadeUp delay={0.1} as="p" className="mx-auto mb-10 max-w-2xl text-center text-base text-secondary">
        A snapshot of the techniques, languages, and tools I work with across the bench
        and the terminal.
      </FadeUp>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SKILLS.map(({ pillar, icon, items }, i) => (
          <FadeUp
            key={pillar}
            whileInView
            delay={i * 0.08}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary hover:shadow-hover"
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
                  className="inline-flex items-center rounded-full border border-border bg-bg-secondary px-3 py-1 text-sm text-text transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>
    </main>
  );
}
