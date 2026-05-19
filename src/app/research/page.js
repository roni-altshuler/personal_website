import Link from 'next/link';
import Card from '../../components/Card';
import { groupedResearch } from '../../data/research';
import { SKILLS } from '../../data/skills';
import styles from './research.module.css';

function ModalBody({ entry }) {
  return (
    <>
      <ul>
        {entry.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {entry.caseStudy && (
        <Link href={`/research/${entry.caseStudy}`} className={styles.caseStudyCta}>
          Read case study →
        </Link>
      )}
    </>
  );
}

export default function Research() {
  const groups = groupedResearch();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Research</h1>
      <p className={styles.intro}>
        A timeline of doctoral work, industry research, master’s and undergraduate
        training, and internships — with deeper case studies on the most
        substantial projects.
      </p>

      {groups.map(({ track, label, entries }) => (
        <section key={track}>
          <h2 className={styles.trackHeader}>{label}</h2>
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
        </section>
      ))}

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
