'use client';

import styles from './projects.module.css';
import Card from '../../components/Card';

export default function Projects() {
  const soccerDescription = 'Soccer Stats Predictor is a Next.js web app that lets users generate clear, data-driven soccer match predictions between teams or across leagues. Powered by machine learning on historical data, it shows intuitive win/draw/loss probabilities in an interactive, professional interface.';
  
  const projects = [
    {
      title: 'Soccer Predictor',
      description: soccerDescription,
      link: 'https://github.com/roni-altshuler/soccer_predictor',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      modalContent: (
        <div>
          <p style={{ lineHeight: '1.6' }}>
            {soccerDescription}
          </p>
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
              link={project.link}
              modalContent={project.modalContent}
              customHeader={
                <div className={styles.projectHeader}>
                  <div className={styles.projectTitle}>
                    {project.icon}
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectTitleLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.title}
                    </a>
                  </div>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              }
              children={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
