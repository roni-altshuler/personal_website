'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PROJECTS, LANGUAGE_COLORS } from '../../data/projects';

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const ForkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

export default function SelectedProjects() {
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setProjects((prev) =>
          prev.map((p) => {
            const live = data.find((r) => r.name === p.name);
            return live ? { ...p, stars: live.stars, forks: live.forks, language: live.language || p.language } : p;
          })
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          Selected projects
        </h2>
        <Link
          href="/projects"
          className="text-sm text-secondary transition-colors hover:text-primary"
        >
          All projects →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-text transition-shadow hover:shadow-hover"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-secondary">
                <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5zm-8 11h8v1.5h-8a1 1 0 010-1.5z" />
              </svg>
              <span className="group-hover:text-primary transition-colors">{project.displayName}</span>
            </div>
            <p className="text-sm leading-relaxed">{project.description}</p>
            <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-secondary">
              <span className="flex items-center gap-1">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: LANGUAGE_COLORS[project.language] || '#ccc' }}
                />
                {project.language}
              </span>
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <StarIcon />
                  {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <ForkIcon />
                  {project.forks}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
