import styles from './projects.module.css';
import Card from '../../components/Card';

export default function Projects() {
  const projects = [
    {
      title: 'Soccer Predictor',
      description: 'A Next.js web app that generates data-driven soccer match predictions using machine learning.',
      link: 'https://github.com/roni-altshuler/soccer_predictor',
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>Personal Projects</h1>

        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
