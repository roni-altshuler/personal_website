import Image from 'next/image';
import styles from './experience.module.css';
import czBiohubLogo from '@../../../public/logo/CZ-Biohub-SF-Color-RGB.png';
import ucscGenomicsLogo from '@../../../public/logo/GenomicsInstitute.png';
import crisprLogo from '@../../../public/logo/CRISPR Therapeutics_idsoX7FvVl_1.svg';
import Card from '../../components/Card';

export default function Experience() {
  const experienceEntries = [
    {
      title: 'Research Associate II | Chan Zuckerberg Biohub SF',
      description: '',
      date: '2024 – 2025',
      logo: czBiohubLogo,
      logoAlt: 'CZ Biohub SF Logo',
      link: 'https://biohub.org/genomics/',
      modalContent: (
        <>
          <ul>
            <li>Designed and implemented a <strong><em>custom Cellpose-based zebrafish cell segmentation model</em></strong>, increasing the F1 score from <strong>53%</strong> to <strong>85%</strong>.</li>
            <li>Developed novel methods to generate training/testing datasets from whole-embryo MERFISH images, including a new strategy to select training data using <strong>Shannon’s entropy</strong>.</li>
            <li>Contributed to the <strong>Tabula Spiens Rosetta Donor</strong> project by integrating isoform-level information with single-cell gene expression analyses.</li>
            <li>Performed high-throughput sequencing workflows (QC, MiSeq, NextSeq, NovaSeq) and post-run analysis, including demultiplexing and AWS-based data delivery.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Master’s Research | UC Santa Cruz Genomics Institute',
      description: '',
      date: '2023 – 2024',
      logo: ucscGenomicsLogo,
      logoAlt: 'UCSC Genomics Institute Logo',
      link: 'https://cglgenomics.ucsc.edu/',
      modalContent: (
        <>
          <ul>
            <li>Developed a <strong><em>custom Cellpose2.0 model</em></strong> for spatial transcriptomic data analysis, achieving precision and recall metrics of <strong>84%</strong> and <strong>90%</strong>.</li>
            <li>Identified critical gene expression patterns in a human breast cancer model through spatial differential analysis, revealing insights into the tumor microenvironment.</li>
            <li>Visualized spatial distributions and performed clustering analyses (UMAP) using Python tools like Squidpy and Scanpy.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'CRISPR-X Intern | CRISPR Therapeutics',
      description: '',
      date: '2023',
      logo: crisprLogo,
      logoAlt: 'CRISPR Therapeutics Logo',
      link: 'https://crisprtx.com/focus-areas/crispr-x',
      modalContent: (
        <>
          <ul>
            <li>Led a project on 3’-overhang dsDNA integration, significantly boosting CRISPR/Cas9 knock-in efficiency as validated by Next Generation Sequencing (NGS).</li>
            <li>Optimized T cell editing by integrating promoterless GFP transgenes and analyzing results with flow cytometry.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Autoimmune Intern | CRISPR Therapeutics',
      description: '',
      date: '2022',
      logo: crisprLogo,
      logoAlt: 'CRISPR Therapeutics Logo',
      link: 'https://crisprtx.com/focus-areas/crispr-x',
      modalContent: (
        <>
          <ul>
            <li>Enhanced CAR-T cell performance by analyzing costimulatory domain variations and improving targeting efficiency.</li>
            <li>Evaluated cancer cell targeting outcomes using advanced flow cytometry and digital droplet PCR (ddPCR) techniques.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Work Experience</h1>
      
      <div className={styles.timeline}>
        {experienceEntries.map((entry, index) => (
          <Card
            key={index}
            logo={entry.logo}
            logoAlt={entry.logoAlt}
            title={entry.title}
            description={entry.description}
            date={entry.date}
            link={entry.link}
            modalContent={entry.modalContent}
          />
        ))}
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