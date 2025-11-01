
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>Roni Altshuler</Link>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/education">Education</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
