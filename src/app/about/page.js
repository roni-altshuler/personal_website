import Link from 'next/link';
import OrganizationLogo from '../../components/OrganizationLogo';
import { educationEntries } from '../../data/research';
import { SKILLS } from '../../data/skills';

export default function AboutPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>About Me</h1>
        <p className="lead">
          I’m Roni Altshuler, a biomolecular engineer, bioinformatician, and PhD
          student in the Ron-Harel Lab at the Technion.
        </p>
      </header>

      <section className="prose" aria-labelledby="about-motivation">
        <h2 id="about-motivation">What Brought Me Here</h2>
        <p>
          Watching friends face cancer led me to study biomolecular engineering
          and bioinformatics at UC Santa Cruz. After working in genomics at
          Chan Zuckerberg Biohub, I joined the Ron-Harel Lab at the Technion to
          study immunometabolism and aging.
        </p>
        <p>
          I work across experimental biology and computation. My experience
          includes stromal cell and T-cell culture, flow cytometry, immunofluorescence,
          and confocal microscopy, alongside gene editing, sequencing, and
          computational workflows for single cell and spatial transcriptomics.
        </p>
        <p>
          Outside the lab, I race endurance events and have played soccer my whole
          life. I also build software to explore my interests in sports and music.
        </p>
        <Link className="text-link" href="/projects">Explore my software projects <span aria-hidden="true">→</span></Link>
      </section>

      <section id="education" className="content-section" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <div className="timeline">
          {educationEntries().map((entry) => (
            <article className="timeline-entry surface-card" key={entry.id}>
              <div className="organization-entry-heading">
                <div>
                  <p className="eyebrow">{entry.date}</p>
                  <h3>{entry.subtitle}{entry.id === 'technion-phd' ? ' (In Progress)' : ''}</h3>
                  <p>{entry.title}</p>
                </div>
                <OrganizationLogo entry={entry} />
              </div>
              <p>{entry.summary}</p>
              {entry.id === 'technion-phd' && <Link className="text-link" href="/research#technion-phd">Current research <span aria-hidden="true">→</span></Link>}
              {entry.id === 'ucsc-ms' && <Link className="text-link" href="/research#ucsc-genomics">Master’s research <span aria-hidden="true">→</span></Link>}
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="content-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Research Skills</h2>
        <div className="content-grid">
          {SKILLS.map((skill) => (
            <article className="surface-card" key={skill.pillar}>
              <h3>{skill.pillar}</h3>
              <p>{skill.description}</p>
              <ul className="tag-list" aria-label={`${skill.pillar} tools`}>
                {skill.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ul>
                {skill.evidence.map((evidence) => (
                  <li key={evidence.href}><Link className="text-link" href={evidence.href}>{evidence.label} <span aria-hidden="true">→</span></Link></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
