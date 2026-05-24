import { SKILLS } from "../../data/skills";
import { FadeUp } from "../../components/anim/Reveal";
import LinearCard from "../../components/cards/LinearCard";

export const metadata = {
  title: "Skills",
  description:
    "Wet-lab, computational, and tooling skills used by Roni Altshuler across research and engineering.",
};

export default function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-24 md:pt-32">
      <FadeUp>
        <span className="eyebrow">Toolbox</span>
      </FadeUp>
      <FadeUp delay={0.05}>
        <h1
          className="mt-2 max-w-3xl font-display font-semibold text-ink"
          style={{
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Skills, grouped by where I use them.
        </h1>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          Three pillars: the bench, the keyboard, and the connective tools
          that keep both honest. Updated as projects pull in something new.
        </p>
      </FadeUp>

      <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {SKILLS.map((pillar, i) => (
          <FadeUp
            key={pillar.pillar}
            whileInView
            delay={i * 0.08}
            className="h-full"
          >
            <LinearCard
              padding="p-7"
              className="flex h-full flex-col"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-surface-2 text-linear-accent"
                >
                  <i className={`fas ${pillar.icon}`}></i>
                </span>
                <h2
                  className="font-display text-xl font-medium text-ink"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {pillar.pillar}
                </h2>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="mono inline-flex items-center rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </LinearCard>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
