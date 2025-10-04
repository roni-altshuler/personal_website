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
          As a first-year PhD student at the Technion, I am diving deep into immunometabolism and aging, a journey that demands a goal-oriented mindset and a diligent work ethic. My path as a Biomolecular Engineer and Bioinformatician is defined by a persistent determination to tackle complex challenges at the intersection of computational biology and genomic sciences. Whether developing sophisticated bioinformatics workflows or leveraging advanced techniques like spatial transcriptomics and CRISPR/Cas9, I am driven by a resilience that turns intricate biological data into actionable insights. My perseverance is fueled by a passion for unraveling the molecular complexities of disease, pushing toward the next generation of therapeutic discoveries.
        </p>
        <p className={styles.blurb}>
          Outside of the lab, my disciplined approach to life is mirrored in my pursuits as an endurance athlete and soccer player. Achieving a marathon personal best of 2:59:14 and a half-marathon time of 1:22:13 required immense dedication, placing me in the top 5% of runners and demonstrating a capacity for sustained, hard work. This same resilience and focus on teamwork were instrumental in leading my soccer team to a California State Cup championship, shaping my collaborative and determined approach to every scientific endeavor.
        </p>
      </main>
    </div>
  );
}