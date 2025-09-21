
import styles from './experience.module.css';

export default function Experience() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Work Experience</h1>
      
      <div className={styles.card}>
        <h3>Research Associate II | <a href="https://www.czbiohub.org/genomics/" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>Chan Zuckerberg Biohub SF</a></h3>
        <p className={styles.date}>2024 – 2025</p>
        <ul>
          <li>Designed and implemented a <strong><em>custom Cellpose-based zebrafish cell segmentation model</em></strong>, increasing the F1 score from <strong>53%</strong> to <strong>85%</strong>.</li>
          <li>Developed novel methods to generate training/testing datasets from whole-embryo MERFISH images, including a new strategy to select training data using <strong>Shannon’s entropy</strong>.</li>
          <li>Contributed to the <strong>Tabula Sapiens Rosetta Donor</strong> project by integrating isoform-level information with single-cell gene expression analyses.</li>
          <li>Performed high-throughput sequencing workflows (QC, MiSeq, NextSeq, NovaSeq) and post-run analysis, including demultiplexing and AWS-based data delivery.</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3>Master’s Research | <a href="https://cglgenomics.ucsc.edu/" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>UC Santa Cruz Genomics Institute</a></h3>
        <p className={styles.date}>2023 – 2024</p>
        <ul>
          <li>Developed a <strong><em>custom Cellpose2.0 model</em></strong> for spatial transcriptomic data analysis, achieving precision and recall metrics of <strong>84%</strong> and <strong>90%</strong>.</li>
          <li>Identified critical gene expression patterns in a human breast cancer model through spatial differential analysis, revealing insights into the tumor microenvironment.</li>
          <li>Visualized spatial distributions and performed clustering analyses (UMAP) using Python tools like Squidpy and Scanpy.</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3>CRISPR-X Intern | <a href="https://crisprtx.com/focus-areas/crispr-x" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>CRISPR Therapeutics</a></h3>
        <p className={styles.date}>2023</p>
        <ul>
          <li>Led a project on 3’-overhang dsDNA integration, significantly boosting CRISPR/Cas9 knock-in efficiency as validated by Next Generation Sequencing (NGS).</li>
          <li>Optimized T cell editing by integrating promoterless GFP transgenes and analyzing results with flow cytometry.</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3>Autoimmune Intern | <a href="https://crisprtx.com/focus-areas/crispr-x" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>CRISPR Therapeutics</a></h3>
        <p className={styles.date}>2022</p>
        <ul>
          <li>Enhanced CAR-T cell performance by analyzing costimulatory domain variations and improving targeting efficiency.</li>
          <li>Evaluated cancer cell targeting outcomes using advanced flow cytometry and digital droplet PCR (ddPCR) techniques.</li>
        </ul>
      </div>

      <div className={styles.skillsSection}>
        <h2 className={styles.skillsTitle}>Skills</h2>
        <div className={styles.skillsGrid}>
          <div>
            <h4>Programming & Tools</h4>
            <p>Python, Linux/Unix, R, C/C++, MATLAB, SQL, Jupyter, CellPose, AlphaFold, MatplotLib, Squidpy, Scanpy, Seaborn, Pandas, Git, AWS</p>
          </div>
          <div>
            <h4>Laboratory Techniques</h4>
            <p>Next Generation Sequencing, CRISPR/Cas9 Editing, PCR (qPCR, ddPCR), Flow Cytometry, Gel Electrophoresis, Tissue Culture</p>
          </div>
          <div>
            <h4>General</h4>
            <p>SnapGene, GraphPad Prism, FlowJo, Microsoft Office, Google Suite</p>
          </div>
        </div>
      </div>

    </div>
  );
}
