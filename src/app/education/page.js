import Image from 'next/image';
import styles from './education.module.css';
import technionLogo from '@../../../public/logo/Technion_logo.svg';
import ucscLogo from '@../../../public/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg';
import Card from '../../components/Card';

export default function Education() {
  const educationEntries = [
    {
      title: 'Technion – Israel Institute of Technology',
      description: 'PhD in Biology',
      date: '2025 – Present',
      logo: technionLogo,
      logoAlt: 'Technion Logo',
      link: 'https://www.ronharellab.com/',
      modalContent: (
        <>
          <p><strong>Status:</strong> First-Year PhD Student</p>
          <p><strong>Focus:</strong> Graduate Researcher in the Ron-Harel Lab, focusing on ImmunoMetabolism & Aging.</p>
        </>
      ),
    },
    {
      title: 'University of California, Santa Cruz',
      description: 'Master of Science in Biomolecular Engineering and Bioinformatics',
      date: '2023 – 2024',
      logo: ucscLogo,
      logoAlt: 'UCSC Baskin Engineering Logo',
      link: 'https://engineering.ucsc.edu/',
      modalContent: (
        <>
          <p><strong>Thesis:</strong> Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model.</p>
        </>
      ),
    },
    {
      title: 'University of California, Santa Cruz',
      description: 'Bachelor of Science in Biomolecular Engineering and Bioinformatics with Honors',
      date: '2020 – 2023',
      logo: ucscLogo,
      logoAlt: 'UCSC Baskin Engineering Logo',
      link: 'https://engineering.ucsc.edu/',
      modalContent: (
        <>
          <p><strong>Honors:</strong> Dean’s Honors List (2021, 2022, 2023)</p>
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
    </div>
  );
}