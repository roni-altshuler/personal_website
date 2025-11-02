import Image from 'next/image';
import styles from './education.module.css';
import technionLogo from '@../../../public/logo/Technion_logo.svg';
import ucscLogo from '@../../../public/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg';
import Card from '../../components/Card';

export default function Education() {
  const educationEntries = [
    {
      title: 'Technion – Israel Institute of Technology',
      description: 'PhD in Biology, 2025 – Present',
      logo: technionLogo,
      logoAlt: 'Technion Logo',
      link: 'https://www.ronharellab.com/',
      modalContent: (
        <>
          <h3>Technion – Israel Institute of Technology</h3>
          <p><strong>Dates:</strong> 2025 – Present</p>
          <p><strong>Degree:</strong> PhD in Biology</p>
          <p><strong>Status:</strong> First-Year PhD Student</p>
          <p><strong>Focus:</strong> Graduate Researcher in the Ron-Harel Lab, focusing on ImmunoMetabolism & Aging.</p>
          <p>Learn more at <a href=\"https://www.ronharellab.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Ron-Harel Lab</a>.</p>
        </>
      ),
    },
    {
      title: 'University of California, Santa Cruz',
      description: 'Master of Science in Biomolecular Engineering and Bioinformatics, 2023 – 2024',
      logo: ucscLogo,
      logoAlt: 'UCSC Baskin Engineering Logo',
      link: 'https://engineering.ucsc.edu/',
      modalContent: (
        <>
          <h3>University of California, Santa Cruz</h3>
          <p><strong>Dates:</strong> 2023 – 2024</p>
          <p><strong>Degree:</strong> Master of Science in Biomolecular Engineering and Bioinformatics</p>
          <p><strong>Thesis:</strong> Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model.</p>
          <p>Learn more at <a href=\"https://engineering.ucsc.edu/\" target=\"_blank\" rel=\"noopener noreferrer\">UCSC Baskin Engineering</a>.</p>
        </>
      ),
    },
    {
      title: 'University of California, Santa Cruz',
      description: 'Bachelor of Science in Biomolecular Engineering and Bioinformatics with Honors, 2020 – 2023',
      logo: ucscLogo,
      logoAlt: 'UCSC Baskin Engineering Logo',
      link: 'https://engineering.ucsc.edu/',
      modalContent: (
        <>
          <h3>University of California, Santa Cruz</h3>
          <p><strong>Dates:</strong> 2020 – 2023</p>
          <p><strong>Degree:</strong> Bachelor of Science in Biomolecular Engineering and Bioinformatics with Honors</p>
          <p><strong>Honors:</strong> Dean’s Honors List (2021, 2022, 2023).</p>
          <p>Learn more at <a href=\"https://engineering.ucsc.edu/\" target=\"_blank\" rel=\"noopener noreferrer\">UCSC Baskin Engineering</a>.</p>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Education</h1>
      <div className={styles.timeline}>
        {educationEntries.map((entry, index) => (
          <Card
            key={index}
            title={(
              <div className={styles.titleContainer}>
                <Image src={entry.logo} alt={entry.logoAlt} className={styles.logo} />
                <h3><a href={entry.link} target=\"_blank\" rel=\"noopener noreferrer\" className={styles.glowLink}>{entry.title}</a></h3>
              </div>
            )}
            description={entry.description}
            modalContent={entry.modalContent}
          />
        ))}
      </div>
    </div>
  );
}