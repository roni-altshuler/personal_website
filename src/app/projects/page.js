import styles from './projects.module.css';

export default function Projects() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>Personal Projects</h1>

        {/* Placeholder for project listings */}
        <div className={styles.projectList}>
          <div className={styles.projectCard}>
            <a href="https://github.com/roni-altshuler/soccer_predictor" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>
              <h2>Soccer Predictor <i className="fab fa-github"></i></h2>
            </a>
            <p>Soccer Stats Predictor is a Next.js web app that lets users generate clear, data-driven soccer match predictions between teams or across leagues. Powered by machine learning on historical data, it shows intuitive win/draw/loss probabilities in an interactive, professional interface.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
