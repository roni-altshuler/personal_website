import Link from 'next/link';
import Card from '../../components/Card';
import { workEntries } from '../../data/research';
import { SKILLS } from '../../data/skills';
import styles from './work-experience.module.css';

function ModalBody({ entry }) {
  return (
    <>
      <ul>
        {entry.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {entry.caseStudy && (
        <Link href={`/work-experience/${entry.caseStudy}`} className={styles.caseStudyCta}>
          Read case study →
        </Link>
      )}
    </>
  );
}

export default function WorkExperience() {
  const entries = workEntries();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Work Experience</h1>

      <div className={styles.timeline}>
        {entries.map((entry) => (
          <Card
            key={entry.id}
            logo={entry.logo}
            logoAlt={entry.logoAlt}
            title={entry.title}
            description={entry.subtitle}
            date={entry.date}
            link={entry.link}
            modalContent={<ModalBody entry={entry} />}
          />
        ))}
      </div>

      <div className={styles.skillsSection}>
        <h2 className={styles.skillsTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
          {SKILLS.map(({ group, items }) => (
            <div key={group}>
              <h4>{group}</h4>
              <p>{items.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
