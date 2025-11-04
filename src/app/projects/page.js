'use client';

import styles from './projects.module.css';
import Card from '../../components/Card';

export default function Projects() {
  const projects = [
    {
      title: 'Soccer Predictor',
      description: 'Soccer Stats Predictor is a Next.js web app that lets users generate clear, data-driven soccer match predictions between teams or across leagues. Powered by machine learning on historical data, it shows intuitive win/draw/loss probabilities in an interactive, professional interface.',
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
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', color: 'var(--primary-color)' }}>About the Project</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Soccer Stats Predictor is an AI-powered web application that predicts soccer match outcomes using machine learning. 
            The system analyzes historical data from over 150,000 matches across 9 major leagues and competitions.
          </p>
          
          <h3 style={{ marginBottom: '0.75rem', marginTop: '1.5rem', fontSize: '1.3rem', color: 'var(--primary-color)' }}>Key Features</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.8' }}>
            <li><strong>Head-to-Head Predictions:</strong> Compare teams within the same league</li>
            <li><strong>Cross-League Analysis:</strong> Compare teams from different leagues and competitions</li>
            <li><strong>Win/Draw/Loss Probabilities:</strong> Clear percentage breakdowns for match outcomes</li>
            <li><strong>Predicted Scorelines:</strong> Most likely score predictions based on historical patterns</li>
            <li><strong>Interactive Interface:</strong> Modern, responsive design built with Next.js and Tailwind CSS</li>
          </ul>

          <h3 style={{ marginBottom: '0.75rem', marginTop: '1.5rem', fontSize: '1.3rem', color: 'var(--primary-color)' }}>Technology Stack</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.8' }}>
            <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS, Zustand (state management)</li>
            <li><strong>Backend:</strong> Python, Flask, scikit-learn</li>
            <li><strong>Machine Learning:</strong> Gradient Boosting, Random Forest, XGBoost</li>
            <li><strong>Data Processing:</strong> pandas, NumPy</li>
            <li><strong>Deployment:</strong> Vercel (frontend), Railway (backend API)</li>
          </ul>

          <h3 style={{ marginBottom: '0.75rem', marginTop: '1.5rem', fontSize: '1.3rem', color: 'var(--primary-color)' }}>Data Coverage</h3>
          <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
            The model is trained on comprehensive match data from:
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>English Premier League</li>
            <li>Spanish La Liga</li>
            <li>German Bundesliga</li>
            <li>Italian Serie A</li>
            <li>French Ligue 1</li>
            <li>UEFA Champions League</li>
            <li>UEFA Europa League</li>
            <li>And more...</li>
          </ul>
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
            />
          ))}
        </div>
      </section>
    </div>
  );
}
