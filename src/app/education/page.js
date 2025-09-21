import styles from './education.module.css';

export default function Education() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Education</h1>
      <div className={styles.timeline}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3><a href="https://www.ronharellab.com/" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>Technion – Israel Institute of Technology</a></h3>
            <p className={styles.date}>2025 – Present</p>
          </div>
          <div className={styles.cardBody}>
            <p><strong>Degree:</strong> PhD in Biology</p>
            <p><strong>Status:</strong> First-Year PhD Student</p>
            <p><strong>Focus:</strong> Graduate Researcher in the Ron-Harel Lab, focusing on ImmunoMetabolism & Aging.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3><a href="https://engineering.ucsc.edu/" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>University of California, Santa Cruz</a></h3>
            <p className={styles.date}>2023 – 2024</p>
          </div>
          <div className={styles.cardBody}>
            <p><strong>Degree:</strong> Master of Science in Biomolecular Engineering and Bioinformatics</p>
            <p><strong>Thesis:</strong> Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3><a href="https://engineering.ucsc.edu/" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>University of California, Santa Cruz</a></h3>
            <p className={styles.date}>2020 – 2023</p>
          </div>
          <div className={styles.cardBody}>
            <p><strong>Degree:</strong> Bachelor of Science in Biomolecular Engineering and Bioinformatics with Honors</p>
            <p><strong>Honors:</strong> Dean’s Honors List (2021, 2022, 2023).</p>
          </div>
        </div>
      </div>
    </div>
  );
}