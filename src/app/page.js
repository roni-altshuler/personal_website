import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/profile.PNG"
          alt="Roni Altshuler"
          width={200}
          height={200}
          className={styles.profileImage}
        />
        <h1 className={styles.title}>Roni Altshuler</h1>
        <p className={styles.subtitle}>Biomolecular Engineer & Bioinformatician</p>
        <div className={styles.socialIcons}>
          <a href="https://github.com/roni-altshuler" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/roni-altshuler/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="mailto:roni.altshuler@gmail.com"><i className="fas fa-envelope"></i></a>
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.blurb}>
          I am a PhD student at the Technion, specializing in Immunometabolism and Aging. As a Biomolecular Engineer and Bioinformatician, I tackle complex challenges in computational biology and genomic sciences, developing bioinformatics workflows and leveraging techniques like spatial transcriptomics and CRISPR/Cas9 to translate biological data into therapeutic discoveries.
        </p>
        <p className={styles.blurb}>
          Beyond my research, I am an endurance athlete and soccer player. My dedication led to a marathon personal best of 2:59:14 and a half-marathon of 1:22:13, placing me in the top 5% of runners. This same resilience and teamwork helped lead my soccer team to a California State Cup championship, influencing my collaborative approach to science.
        </p>
      </main>
    </div>
  );
}