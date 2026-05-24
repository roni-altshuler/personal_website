import Card from "../../components/Card";
import { educationEntries } from "../../data/research";
import { FadeUp } from "../../components/anim/Reveal";

function Bullets({ entry }) {
  return (
    <ul>
      {entry.bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

export default function Education() {
  const entries = educationEntries();

  return (
    <section className="mx-auto max-w-4xl px-6 pb-32 pt-24 md:pt-32">
      <FadeUp>
        <span className="eyebrow">Foundations</span>
      </FadeUp>
      <FadeUp delay={0.05}>
        <h1
          className="mt-2 font-display font-semibold text-ink"
          style={{
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Education
        </h1>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          Degrees and the labs that shaped them, from undergrad through the
          PhD in progress
        </p>
      </FadeUp>

      <div className="mt-12 flex flex-col gap-5 md:mt-14 md:gap-6">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            logo={entry.logo}
            logoAlt={entry.logoAlt}
            title={entry.title}
            description={entry.subtitle}
            date={entry.date}
            link={entry.link}
            lead={entry.summary}
            modalContent={<Bullets entry={entry} />}
            disableModal
          />
        ))}
      </div>
    </section>
  );
}
