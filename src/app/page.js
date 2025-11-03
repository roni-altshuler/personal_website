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
          sizes="(max-width: 768px) 150px, 200px"
        />
        <h1 className={styles.title}>Roni Altshuler</h1>
        <p className={styles.subtitle}>Biomolecular Engineer & Bioinformatician</p>
        <div className={styles.socialIcons}>
          <a href="https://github.com/roni-altshuler" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="mailto:roni.altshuler@gmail.com"><i className="fas fa-envelope"></i></a>
          <a href="https://www.linkedin.com/in/roni-altshuler/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.blurb}>
          Hi, I&apos;m Roni Altshuler, a PhD student at the <a href="https://www.ronharellab.com/" target="_blank" rel="noopener noreferrer" className={styles.glowLink}>Technion</a>, studying Immunometabolism and Aging. My research explores how immune and metabolic pathways interact to shape health and disease, with the goal of turning scientific discoveries into real therapeutic impact. Before starting my PhD, I trained as a Biomolecular Engineer and Bioinformatician, developing computational workflows and working with cutting-edge techniques like spatial transcriptomics and CRISPR/Cas9 to make sense of complex biological data. I&apos;m passionate about using science to uncover how our bodies work, and how we can help them work better. Outside the lab, you&apos;ll probably find me training for my next endurance challenge, always striving to push boundaries both in science and in life.
        </p>
      </main>
    </div>
  );
}