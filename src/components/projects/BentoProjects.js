import Image from 'next/image';
import { PROJECTS } from '../../data/projects';

export default function BentoProjects() {
  return (
    <div className="project-grid">
      {PROJECTS.map((project) => (
        <article className="project-card" id={project.name} key={project.name}>
          <Image
            className="project-image"
            src={project.image}
            alt={project.imageAlt}
            width={1280}
            height={800}
            sizes="(max-width: 639px) calc(100vw - 44px), (max-width: 1319px) 46vw, 604px"
          />
          <div className="project-body">
            <p className="project-meta">{project.category}</p>
            <h2>{project.displayName}</h2>
            <p>{project.description}</p>
            <p className="project-evidence">
              {project.evidence}{' '}
              <a className="text-link" href={project.evidenceLink}>
                {project.evidenceLabel}
              </a>
            </p>
            <ul className="tag-list" aria-label={`${project.displayName} methods`}>
              {project.methods.map((method) => <li key={method}>{method}</li>)}
            </ul>
            <div className="project-actions">
              <a className="button" href={project.demo} aria-label={`View demo: ${project.displayName}`}>
                View demo <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href={project.link} aria-label={`View code: ${project.displayName} on GitHub`}>
                View code <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
