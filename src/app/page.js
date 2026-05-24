import Image from "next/image";
import Link from "next/link";
import V3Hero from "../components/hero/V3Hero";
import { FadeUp } from "../components/anim/Reveal";
import AffiliationsMarquee from "../components/affiliations/AffiliationsMarquee";
import LinearCard from "../components/cards/LinearCard";

const TEASERS = [
  {
    eyebrow: "Recent work",
    title: "Projects",
    body: "Apps for soccer prediction, lyric analysis, and F1 race forecasting — all open source, all live.",
    href: "/projects",
    cta: "Browse the build",
  },
  {
    eyebrow: "Track record",
    title: "Work experience",
    body: "Six years across CRISPR Therapeutics, UCSC Genomics Institute, CZ Biohub, and the Technion.",
    href: "/work-experience",
    cta: "See the lineage",
  },
  {
    eyebrow: "Toolbox",
    title: "Skills",
    body: "Single-cell, spatial omics, ML pipelines, glycoengineering, and the bench skills underneath.",
    href: "/skills",
    cta: "Open the toolbox",
  },
];

export default function Home() {
  return (
    <>
      <V3Hero />

      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-28">
        <FadeUp whileInView>
          <span className="eyebrow">Trusted collaborators</span>
        </FadeUp>
        <FadeUp whileInView delay={0.1} className="mt-6 block">
          <AffiliationsMarquee />
        </FadeUp>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
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
                Curiosity that started with friends, became a career.
              </h2>
            </FadeUp>
            <FadeUp whileInView delay={0.15} as="p" className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">
              Watching friends battle cancer sparked a lifelong curiosity about
              why diseases occur and how we can treat them. That pulled me into
              oncology, genomics, and bioinformatics — and into the{" "}
              <a
                href="https://www.ronharellab.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-linear-accent hover:underline"
              >
                Ron-Harel Lab
              </a>{" "}
              at the Technion, where I work to uncover how immune and metabolic
              pathways shape health and disease.
            </FadeUp>
            <FadeUp whileInView delay={0.2} as="p" className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Before the PhD I earned my B.S. and M.S. in Biomolecular
              Engineering & Bioinformatics at UC Santa Cruz, where I built
              computational pipelines on spatial transcriptomics, single-cell,
              and CRISPR/Cas9 data. I keep ending up at the seam between
              biology and code.
            </FadeUp>
            <FadeUp whileInView delay={0.25} as="p" className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Outside the lab, I race endurance events and have played soccer
              my whole life. Both keep me sharp, both keep me sane.
            </FadeUp>

            <FadeUp whileInView delay={0.35} className="mt-8 flex gap-3 text-xl text-ink-subtle">
              <a
                href="https://github.com/roni-altshuler"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-surface-1 transition-colors hover:border-linear-accent-focus hover:text-linear-accent"
              >
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/roni-altshuler/"
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

      <section className="mx-auto max-w-6xl px-6 pb-32 md:pb-40">
        <FadeUp whileInView>
          <span className="eyebrow">Three doors</span>
        </FadeUp>
        <FadeUp whileInView delay={0.05}>
          <h2
            className="mt-2 max-w-3xl font-display text-3xl font-semibold text-ink md:text-4xl"
            style={{ letterSpacing: "-0.032em", lineHeight: 1.1 }}
          >
            Pick where to start.
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {TEASERS.map((t, i) => (
            <FadeUp key={t.href} whileInView delay={0.1 + i * 0.06}>
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
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-linear-accent transition-transform group-hover:translate-x-0.5">
                  {t.cta} <span aria-hidden="true">→</span>
                </span>
              </LinearCard>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
