import fs from 'node:fs';
import path from 'node:path';
import ResumeDownloadLink from '../../components/analytics/ResumeDownloadLink';
import { FadeUp } from '../../components/anim/Reveal';
import styles from './resume.module.css';

const PDF_FILENAME = 'RoniAltshulerCurrent.pdf';
const PDF_PATH = `/${PDF_FILENAME}`;

function pdfExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', PDF_FILENAME));
  } catch {
    return false;
  }
}

export default function Resume() {
  const hasPdf = pdfExists();

  return (
    <div className={styles.container}>
      <FadeUp as="h1" className={styles.pageTitle}>Resume</FadeUp>
      <FadeUp delay={0.1} as="p" className={styles.tagline}>
        A concise overview of my education, experience, and skills
      </FadeUp>

      <div className={styles.actions}>
        {hasPdf ? (
          <>
            <ResumeDownloadLink href={PDF_PATH} className={styles.downloadButton}>
              Download PDF
            </ResumeDownloadLink>
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
          title="Roni Altshuler Resume"
          className={styles.preview}
          loading="lazy"
        />
      ) : (
        <div className={styles.pdfStub}>
          <p>
            <strong>The downloadable PDF will live here.</strong>
          </p>
        </div>
      )}
    </div>
  );
}
