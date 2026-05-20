import Card from '../../components/Card';
import { workEntries } from '../../data/research';
import { FadeUp } from '../../components/anim/Reveal';
import styles from './work-experience.module.css';

function Bullets({ entry }) {
  return (
    <ul>
      {entry.bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

export default function WorkExperience() {
  const entries = workEntries();

  return (
    <div className={styles.container}>
      <FadeUp as="h1" className={styles.pageTitle}>Work Experience</FadeUp>

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
            lead={entry.summary}
            modalContent={<Bullets entry={entry} />}
            disableModal
          />
        ))}
      </div>
    </div>
  );
}
