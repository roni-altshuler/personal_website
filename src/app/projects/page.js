import styles from './projects.module.css';
import Card from '../../components/Card';

export default function Projects() {
  const projects = [
    {
      title: 'Soccer Predictor',
      description: 'Soccer Stats Predictor is a Next.js web app that lets users generate clear, data-driven soccer match predictions between teams or across leagues. Powered by machine learning on historical data, it shows intuitive win/draw/loss probabilities in an interactive, professional interface.',
      modalContent: (
        <div>
          <p>This project utilizes machine learning models to predict outcomes of soccer matches based on historical data. It provides users with win/draw/loss probabilities and detailed statistics.</p>
          <p>Technologies used: Next.js, React, Python (for ML models), scikit-learn, pandas.</p>
          <p>You can view the code on <a href='https://github.com/roni-altshuler/soccer_predictor' target='_blank' rel='noopener noreferrer'>GitHub</a>.</p>
        </div>
      ),
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
              modalContent={project.modalContent}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
