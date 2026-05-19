import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDY_SLUGS, getResearchEntry } from '../../../data/research';
import styles from '../research.module.css';

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const entry = getResearchEntry(params.slug);
  if (!entry) return {};
  const title = `${entry.title} — Case Study`;
  return {
    title,
    description: entry.summary,
    alternates: { canonical: `/research/${params.slug}` },
    openGraph: { title: `${title} · Roni Altshuler`, url: `/research/${params.slug}` },
  };
}

export default function CaseStudyPage({ params }) {
  const entry = getResearchEntry(params.slug);
  if (!entry) notFound();

  return (
    <div className={styles.container}>
      <Link href="/research" className={styles.caseStudyCta}>← Back to Research</Link>
      <h1 className={styles.pageTitle} style={{ marginTop: '1.5rem' }}>
        {entry.title}
      </h1>
      <p className={styles.intro}>
        {entry.subtitle} · {entry.date}
      </p>
      <p className={styles.intro}>{entry.summary}</p>

      <section style={{ textAlign: 'center', padding: '3rem 1rem', opacity: 0.75 }}>
        <p>
          <strong>Full case study coming soon.</strong>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          A deeper write-up with methods, figures, and outcomes is in the works.
        </p>
      </section>

      {entry.bullets?.length > 0 && (
        <section>
          <h2 className={styles.trackHeader}>Highlights</h2>
          <ul style={{ maxWidth: 720, margin: '0 auto', lineHeight: 1.7 }}>
            {entry.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
