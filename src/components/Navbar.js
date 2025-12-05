'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>Roni Altshuler</Link>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <div className={`${styles.navLinks} ${isOpen ? styles.navActive : ''}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/projects" onClick={closeMenu}>Projects</Link>
        <Link href="/education" onClick={closeMenu}>Education</Link>
        <Link href="/experience" onClick={closeMenu}>Experience</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
