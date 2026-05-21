'use client';

import { useEffect, useState } from 'react';
import { PROJECTS, LANGUAGE_COLORS } from '../../data/projects';
import { FadeUp } from '../../components/anim/Reveal';
import TiltCard from '../../components/cards/TiltCard';
import styles from './projects.module.css';

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const ForkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

export default function Projects() {
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) return;
        const repoData = await res.json();

        setProjects((prev) =>
          prev.map((project) => {
            const live = repoData.find((r) => r.name === project.name);
            if (!live) return project;
            return {
              ...project,
              stars: live.stars,
              forks: live.forks,
              language: live.language || project.language,
            };
          })
        );
      } catch {
        // keep defaults on error
      }
    }
    fetchGitHubStats();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <FadeUp as="h1" className={styles.pageTitle}>Projects</FadeUp>

        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <FadeUp
              key={project.name}
              whileInView
              delay={i * 0.06}
              className={styles.cardWrap}
            >
              <TiltCard
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
              >
                <div className={styles.repoHeader}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={styles.repoIcon}
                  >
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5zm-8 11h8v1.5h-8a1 1 0 010-1.5z" />
                  </svg>
                  <span className={styles.repoName}>{project.displayName}</span>
                  <span className={styles.publicBadge}>Public</span>
                </div>

                <p className={styles.repoDescription}>{project.description}</p>

                <div className={styles.repoMeta}>
                  <span className={styles.languageTag}>
                    <span
                      className={styles.languageDot}
                      style={{
                        backgroundColor:
                          LANGUAGE_COLORS[project.language] || '#ccc',
                      }}
                    />
                    {project.language}
                  </span>

                  {project.stars > 0 && (
                    <span className={styles.metaItem}>
                      <StarIcon />
                      {project.stars}
                    </span>
                  )}

                  {project.forks > 0 && (
                    <span className={styles.metaItem}>
                      <ForkIcon />
                      {project.forks}
                    </span>
                  )}
                </div>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
