import fs from 'node:fs';
import path from 'node:path';
import styles from './cv.module.css';

const PDF_PATH = '/roni-altshuler-cv.pdf';

function pdfExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', 'roni-altshuler-cv.pdf'));
  } catch {
    return false;
  }
}

export default function CV() {
  const hasPdf = pdfExists();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Curriculum Vitae</h1>
      <p className={styles.intro}>
        A snapshot of my education, research experience, and technical skills.
      </p>

      <div className={styles.actions}>
        {hasPdf ? (
          <>
            <a
              href={PDF_PATH}
              download
              className={styles.downloadButton}
              rel="noopener"
            >
              Download PDF
            </a>
            <a
              href={PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              Open in new tab
            </a>
          </>
        ) : (
          <span className={styles.secondaryButton}>PDF coming soon</span>
        )}
      </div>

      {hasPdf ? (
        <iframe
          src={PDF_PATH}
          title="Roni Altshuler CV"
          className={styles.preview}
          loading="lazy"
        />
      ) : (
        <div className={styles.pdfStub}>
          <p>
            <strong>The downloadable PDF will live here.</strong>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            In the meantime, the summary below covers the essentials.
          </p>
        </div>
      )}

      <section className={styles.summary}>
        <p>
          I’m a biomolecular engineer and bioinformatician currently pursuing a
          PhD at the Technion in the Ron-Harel Lab, studying immunometabolism
          and aging.
        </p>
        <p>
          Before the Technion I was a Research Associate II at the Chan
          Zuckerberg Biohub SF, where I built a custom Cellpose-based zebrafish
          cell segmentation model that lifted F1 from 53% to 85% on whole-embryo
          MERFISH images, and contributed to the Tabula Sapiens Rosetta Donor
          project.
        </p>
        <p>
          I hold an M.S. and B.S. in Biomolecular Engineering and Bioinformatics
          from UC Santa Cruz, with master’s research at the UCSC Genomics
          Institute on spatial transcriptomics of a human breast-cancer model,
          and two consecutive internships at CRISPR Therapeutics working on
          knock-in efficiency and CAR-T optimization.
        </p>

        <div className={styles.statList}>
          <div className={styles.stat}>
            <span className={styles.statValue}>PhD</span>
            <span className={styles.statLabel}>Technion, ongoing</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>M.S.</span>
            <span className={styles.statLabel}>UCSC, 2024</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>B.S.</span>
            <span className={styles.statLabel}>UCSC, 2023</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>85% F1</span>
            <span className={styles.statLabel}>Cellpose @ CZ Biohub</span>
          </div>
        </div>
      </section>
    </div>
  );
}
