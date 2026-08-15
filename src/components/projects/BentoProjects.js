"use client";

import { useEffect, useState } from "react";
import { PROJECTS, LANGUAGE_COLORS } from "../../data/projects";
import { FadeUp } from "../anim/Reveal";
import LinearCard from "../cards/LinearCard";

/*
 * BentoProjects: Linear-themed grid.
 *
 * Layout is a full-width feature banner followed by a 3-across row of
 * standard tiles (2-across on tablet, stacked on mobile). The earlier
 * 4-column × 2-row feature tile left four empty cells the moment a fourth
 * project was added, which reads as a broken grid rather than as
 * whitespace.
 *
 * Stars and forks render LIVE from /api/github and are ALWAYS shown, zero
 * included. A repo with no stars is a fact about the repo; hiding the row
 * when the count is 0 makes "nobody has starred this" and "we could not
 * reach GitHub" look identical, and it is the second one that is a bug.
 * When the API fails it returns null and the static fallback — the last
 * known real count — is kept.
 */

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const ForkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function plural(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function ProjectMeta({ project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-xs text-ink-subtle">
      <span className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full"
          style={{
            backgroundColor: LANGUAGE_COLORS[project.language] || "#8a8f98",
          }}
        />
        <span className="mono">{project.language}</span>
      </span>

      {/* aria-label carries the meaning; the icon is decorative. A screen
          reader announcing "star 3" is not a sentence. */}
      <span
        className="flex items-center gap-1.5 mono"
        title={plural(project.stars ?? 0, "star")}
      >
        <StarIcon />
        <span aria-hidden="true">{project.stars ?? 0}</span>
        <span className="sr-only">{plural(project.stars ?? 0, "GitHub star")}</span>
      </span>

      <span
        className="flex items-center gap-1.5 mono"
        title={plural(project.forks ?? 0, "fork")}
      >
        <ForkIcon />
        <span aria-hidden="true">{project.forks ?? 0}</span>
        <span className="sr-only">{plural(project.forks ?? 0, "GitHub fork")}</span>
      </span>

      <span className="ml-auto inline-flex items-center gap-1 text-ink-subtle transition-colors group-hover:text-linear-accent">
        github <ArrowIcon />
      </span>
    </div>
  );
}

/* The live-site link is a sibling of the card, not a nested anchor: an <a>
   inside an <a> is invalid HTML and browsers resolve it unpredictably. */
function DemoLink({ href, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-xs text-ink-subtle underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-linear-accent"
    >
      {label} <ArrowIcon />
    </a>
  );
}

function FeatureTile({ project }) {
  return (
    <div className="relative">
      <LinearCard
        as="a"
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        padding="p-8 md:p-10"
        className="group flex h-full flex-col justify-between"
      >
        <div>
          <span className="eyebrow mb-3 block">Featured · live build</span>
          <h2
            className="font-display text-3xl font-semibold text-ink md:text-4xl"
            style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
          >
            {project.displayName}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {project.description}
          </p>
        </div>
        <ProjectMeta project={project} />
      </LinearCard>
      <div className="px-8 md:px-10">
        <DemoLink href={project.demo} label="Visit the live site" />
      </div>
    </div>
  );
}

function StandardTile({ project }) {
  return (
    <div className="relative flex h-full flex-col">
      <LinearCard
        as="a"
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        padding="p-6"
        className="group flex flex-1 flex-col justify-between"
      >
        <div>
          <h3
            className="font-display text-xl font-medium text-ink"
            style={{ letterSpacing: "-0.015em", lineHeight: 1.2 }}
          >
            {project.displayName}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
        </div>
        <ProjectMeta project={project} />
      </LinearCard>
      <div className="px-6">
        <DemoLink href={project.demo} label="Live site" />
      </div>
    </div>
  );
}

export default function BentoProjects() {
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) return;
        const repoData = await res.json();
        setProjects((prev) =>
          prev.map((p) => {
            const live = repoData.find((r) => r.name === p.name);
            if (!live) return p;
            // Merge only what actually came back. A null means the fetch
            // failed for that repo, and the static fallback is a better
            // answer than a zero we invented.
            return {
              ...p,
              stars: live.stars ?? p.stars,
              forks: live.forks ?? p.forks,
              language: live.language ?? p.language,
            };
          })
        );
      } catch {
        // silent — the static defaults are already rendered
      }
    }
    fetchGitHubStats();
  }, []);

  const [feature, ...rest] = projects;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
      <FadeUp whileInView delay={0} className="md:col-span-6">
        <FeatureTile project={feature} />
      </FadeUp>

      {rest.map((p, i) => (
        <FadeUp
          key={p.name}
          whileInView
          delay={0.08 + i * 0.06}
          className="md:col-span-3 lg:col-span-2"
        >
          <StandardTile project={p} />
        </FadeUp>
      ))}
    </div>
  );
}
