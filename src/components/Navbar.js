'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/education', label: 'Education' },
  { href: '/work-experience', label: 'Work Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
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

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <nav className={styles.navbar} aria-label="Primary">
        <Link
          href="/"
          className={styles.logo}
          onClick={closeMenu}
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          Roni Altshuler
        </Link>
        <div className={styles.navLinks}>
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(pathname, href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
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
      </nav>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropActive : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <div
        id="primary-nav-links"
        className={`${styles.mobileDrawer} ${isOpen ? styles.navActive : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
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
    </>
  );
}
