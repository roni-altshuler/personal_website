import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>Roni Altshuler</Link>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <div className={`${styles.navLinks} ${isOpen ? styles.navActive : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/education">Education</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
