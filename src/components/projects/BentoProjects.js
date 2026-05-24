"use client";

import { useEffect, useState } from "react";
import { PROJECTS, LANGUAGE_COLORS } from "../../data/projects";
import { FadeUp } from "../anim/Reveal";
import LinearCard from "../cards/LinearCard";

/*
 * BentoProjects: Linear-themed mixed-size grid.
 * 6-column desktop, 2-column tablet, 1-column mobile. The first card
 * spans 4×2 (the "feature" tile); the rest take 2×1 cells. GitHub stars
 * + forks render live from /api/github (silent failure → static defaults).
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
      {project.stars > 0 && (
        <span className="flex items-center gap-1.5 mono">
          <StarIcon />
          {project.stars}
        </span>
      )}
      {project.forks > 0 && (
        <span className="flex items-center gap-1.5 mono">
          <ForkIcon />
          {project.forks}
        </span>
      )}
      <span className="ml-auto inline-flex items-center gap-1 text-ink-subtle transition-colors group-hover:text-linear-accent">
        github <ArrowIcon />
      </span>
    </div>
  );
}

function FeatureTile({ project, className }) {
  return (
    <LinearCard
      as="a"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      padding="p-8 md:p-10"
      className={`group flex h-full flex-col justify-between ${className}`}
    >
      <div>
        <span className="eyebrow mb-3 block">Featured · live build</span>
        <h2
          className="font-display text-3xl font-semibold text-ink md:text-4xl"
          style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
        >
          {project.displayName}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
          {project.description}
        </p>
      </div>
      <ProjectMeta project={project} />
    </LinearCard>
  );
}

function StandardTile({ project, className }) {
  return (
    <LinearCard
      as="a"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      padding="p-6"
      className={`group flex h-full flex-col justify-between ${className}`}
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
            return {
              ...p,
              stars: live.stars,
              forks: live.forks,
              language: live.language || p.language,
            };
          })
        );
      } catch {
        // silent
      }
    }
    fetchGitHubStats();
  }, []);

  const [feature, ...rest] = projects;

  return (
    <div className="grid auto-rows-[minmax(220px,_auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
      <FadeUp whileInView delay={0} className="md:col-span-6 lg:col-span-4 lg:row-span-2">
        <FeatureTile project={feature} className="h-full" />
      </FadeUp>

      {rest.map((p, i) => (
        <FadeUp
          key={p.name}
          whileInView
          delay={0.08 + i * 0.06}
          className="md:col-span-3 lg:col-span-2"
        >
          <StandardTile project={p} className="h-full" />
        </FadeUp>
      ))}
    </div>
  );
}
