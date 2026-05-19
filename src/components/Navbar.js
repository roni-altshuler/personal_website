'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/education', label: 'Education' },
  { href: '/work-experience', label: 'Work Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar} aria-label="Primary">
      <Link
        href="/"
        className={styles.logo}
        onClick={closeMenu}
        aria-current={pathname === '/' ? 'page' : undefined}
      >
        Roni Altshuler
      </Link>
      <button
        type="button"
        className={styles.menuIcon}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="primary-nav-links"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true"></i>
      </button>
      <div
        id="primary-nav-links"
        className={`${styles.navLinks} ${isOpen ? styles.navActive : ''}`}
      >
        {NAV_ITEMS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMenu}
            aria-current={isActive(pathname, href) ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
