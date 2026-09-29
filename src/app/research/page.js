import Link from 'next/link';
import OrganizationLogo from '../../components/OrganizationLogo';
import { researchEntries } from '../../data/research';

function Contributions({ bullets }) {
  return (
    <ul>
      {bullets.map((bullet, index) => (
        <li key={index}>
          {Array.isArray(bullet) ? (
            <>
              <strong>{bullet[0]}</strong>
              <ul>
                {bullet.slice(1).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </>
          ) : bullet}
        </li>
      ))}
    </ul>
  );
}

export default function ResearchPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Research & Experience</h1>
        <p className="lead">
          I study immunometabolism and aging as a PhD student at the Technion.
          My PhD combines cell culture, T-cell coculture, flow cytometry, and microscopy
          with single cell and spatial transcriptomics. My earlier work includes
          genomics, image analysis, and gene editing.
        </p>
      </header>

      <div className="timeline">
        {researchEntries().map((entry) => (
          <article data-motion-card="subtle" className="timeline-entry surface-card" id={entry.id} key={entry.id} aria-labelledby={`${entry.id}-title`}>
            <div className="organization-entry-heading">
              <div>
                <p className="eyebrow">{entry.date}</p>
                <h2 id={`${entry.id}-title`}>{entry.role || entry.title}</h2>
                <p>{entry.id === 'technion-phd' ? entry.title : entry.subtitle}</p>
              </div>
              <OrganizationLogo entry={entry} />
            </div>
            <div className="prose">
              <p>{entry.summary}</p>
              <Contributions bullets={entry.bullets} />
            </div>
            <ul className="tag-list" aria-label="Methods">
              {entry.methods.map((method) => <li key={method}>{method}</li>)}
            </ul>
            <a className="text-link" href={entry.link}>
              {entry.id === 'technion-phd' ? 'Visit the Ron-Harel Lab' : `Visit ${entry.id === 'cz-biohub' ? 'Biohub Genomics' : entry.id === 'ucsc-genomics' ? 'UCSC Computational Genomics Lab' : 'CRISPR Therapeutics'}`} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <section className="content-section prose" aria-labelledby="research-connect">
        <h2 id="research-connect">Research Interests</h2>
        <p>
          I enjoy work that connects experimental questions with computational analysis.
          If your interests overlap with immune metabolism, single cell biology, or
          spatial analysis, <Link className="text-link" href="/contact">get in touch</Link>.
        </p>
      </section>
    </div>
  );
}
