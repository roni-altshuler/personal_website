"use client";

import BentoProjects from "../../components/projects/BentoProjects";
import { FadeUp } from "../../components/anim/Reveal";

export default function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-24 md:pt-32">
      <FadeUp>
        <span className="eyebrow">Open source · live builds</span>
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
          Things I&apos;m building.
        </h1>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          Side projects where I get to chase whatever&apos;s pulling at me,
          ML on sports data, NLP on song lyrics, telemetry forecasting. Stars
          and forks update live from GitHub.
        </p>
      </FadeUp>

      <div className="mt-14 md:mt-16">
        <BentoProjects />
      </div>
    </section>
  );
}
