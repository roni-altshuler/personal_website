import Image from "next/image";
import Link from "next/link";
import V3Hero from "../components/hero/V3Hero";
import { FadeUp } from "../components/anim/Reveal";
import LinearCard from "../components/cards/LinearCard";
import NarrativeScroll from "../components/home/NarrativeScroll";
import { GITHUB_URL, LINKEDIN_URL } from "../data/site";

const CHAPTERS = [
  {
    eyebrow: "01 · Where it began",
    title: "A question that became a calling",
    body: "Watching friends battle cancer turned a question into a calling: why do diseases take hold, and how do we treat them? That question has pointed me in the same direction ever since.",
  },
  {
    eyebrow: "02 · Into the science",
    title: "Oncology, genomics, bioinformatics",
    body: "It pulled me into oncology, genomics, and bioinformatics. At UC Santa Cruz I earned my B.S. and M.S. in Biomolecular Engineering & Bioinformatics, building computational pipelines on spatial transcriptomics, single-cell, and CRISPR/Cas9 data.",
  },
  {
    eyebrow: "03 · The seam",
    title: "Where biology meets code",
    body: "I keep ending up at the seam between the bench and the keyboard, translating messy biological questions into computation, then turning the results back into biology that means something.",
  },
  {
    eyebrow: "04 · Now",
    title: "Immune and metabolic pathways",
    body: "Today I'm a PhD candidate in the Ron-Harel Lab at the Technion, working to uncover how immune and metabolic pathways shape health and disease.",
  },
];

const TEASERS = [
  {
    eyebrow: "Foundations",
    title: "Education",
    body: "Degrees and labs from undergrad through the PhD in progress, UCSC and the Technion.",
    href: "/education",
    cta: "See the path",
  },
  {
    eyebrow: "Track record",
    title: "Work experience",
    body: "Four years across CRISPR Therapeutics, UCSC Genomics Institute, CZ Biohub, and the Technion.",
    href: "/work-experience",
    cta: "See the lineage",
  },
  {
    eyebrow: "Recent work",
    title: "Projects",
    body: "Motorsport AI, soccer prediction, and lyric analysis, all open source, all live.",
    href: "/projects",
    cta: "Browse the build",
  },
];

export default function Home() {
  return (
    <>
      <V3Hero />

      <section id="about" className="mx-auto max-w-6xl px-6 pb-24 pt-4 scroll-mt-24 md:pb-32">
        <div className="grid items-start gap-12 md:grid-cols-[260px_1fr] md:gap-16">
          <FadeUp whileInView className="md:sticky md:top-24">
            <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 p-2">
              <Image
                src="/profile.PNG"
                alt="Roni Altshuler"
                width={240}
                height={240}
                sizes="(max-width: 768px) 200px, 240px"
                className="block h-auto w-full rounded-lg object-cover"
                priority
              />
            </div>
            <p className="mt-4 text-xs text-ink-subtle">
              <span className="mono">PhD, in progress</span>
              <br />
              Ron-Harel Lab · Technion
            </p>
          </FadeUp>

          <div>
            <FadeUp whileInView>
              <span className="eyebrow">About</span>
            </FadeUp>
            <FadeUp whileInView delay={0.05}>
              <h2
                className="mt-2 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl"
                style={{ letterSpacing: "-0.032em", lineHeight: 1.1 }}
              >
                The short version
              </h2>
            </FadeUp>
            <FadeUp whileInView delay={0.15} as="p" className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">
              I&apos;m a biomolecular engineer and bioinformatician, and a PhD
              candidate in the{" "}
              <a
                href="https://ronharellab.technion.ac.il/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-linear-accent hover:underline"
              >
                Ron-Harel Lab
              </a>{" "}
              at the Technion. I work at the seam between biology and code, close
              enough to the bench to know what the data means and fluent enough
              in code to make it scale.
            </FadeUp>
            <FadeUp whileInView delay={0.2} as="p" className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Outside the lab, I race endurance events and have played soccer my
              whole life. Both keep me sharp, both keep me sane.
            </FadeUp>

            <FadeUp whileInView delay={0.35} className="mt-8 flex gap-3 text-xl text-ink-subtle">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-surface-1 transition-colors hover:border-linear-accent-focus hover:text-linear-accent"
              >
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-surface-1 transition-colors hover:border-linear-accent-focus hover:text-linear-accent"
              >
                <i className="fab fa-linkedin" aria-hidden="true"></i>
              </a>
              <Link
                href="/contact"
                aria-label="Contact"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-surface-1 transition-colors hover:border-linear-accent-focus hover:text-linear-accent"
              >
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      <div id="path" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp whileInView>
            <span className="eyebrow">The path</span>
          </FadeUp>
          <FadeUp whileInView delay={0.05}>
            <h2
              className="mt-2 max-w-3xl font-display text-3xl font-semibold text-ink md:text-4xl"
              style={{ letterSpacing: "-0.032em", lineHeight: 1.1 }}
            >
              How I got here
            </h2>
          </FadeUp>
        </div>
        <NarrativeScroll chapters={CHAPTERS} />
      </div>

      <section id="explore" className="mx-auto max-w-6xl px-6 pb-32 scroll-mt-24 md:pb-40">
        <FadeUp whileInView>
          <span className="eyebrow">Three doors</span>
        </FadeUp>
        <FadeUp whileInView delay={0.05}>
          <h2
            className="mt-2 max-w-3xl font-display text-3xl font-semibold text-ink md:text-4xl"
            style={{ letterSpacing: "-0.032em", lineHeight: 1.1 }}
          >
            Pick where to start
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {TEASERS.map((t, i) => (
            <FadeUp
              key={t.href}
              whileInView
              delay={0.1 + i * 0.06}
              className="h-full"
            >
              <LinearCard
                as="a"
                href={t.href}
                className="group flex h-full flex-col"
                padding="p-7"
              >
                <span className="eyebrow">{t.eyebrow}</span>
                <h3
                  className="mt-2 font-display text-xl font-medium text-ink"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {t.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-linear-accent transition-colors duration-200 ease-out group-hover:text-linear-accent-hover">
                  {t.cta}{" "}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </LinearCard>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
