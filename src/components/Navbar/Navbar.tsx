"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState<'top' | 'visible' | 'hidden'>('top');
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const threshold = 100; // px past which the navbar becomes sticky

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= threshold) {
        setScrollState('top');
      } else if (currentY < lastScrollY.current) {
        // Scrolling UP → show
        setScrollState('visible');
      } else {
        // Scrolling DOWN → hide
        setScrollState('hidden');
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = [
    styles.navbar,
    scrollState !== 'top' ? styles.navbarScrolled : '',
    scrollState === 'hidden' ? styles.navbarHidden : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClasses}>
      <Link href="/" className={styles.logo}>
        <img src="/images/logo.png" alt="GreenLine" className={styles.logoImage} />
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>
            Green<span className={styles.logoHighlight}>Line</span>
          </span>
          <span className={styles.logoSubtitle}>Drive Your Journey</span>
        </div>
      </Link>

      {/* Desktop Nav Links */}
      <ul className={styles.navLinks}>
        <li className={isActive('/') ? styles.active : ''}><Link href="/">Home</Link></li>
        <li><Link href="/#about">About Us</Link></li>
        <li><Link href="/#services">Services</Link></li>
        <li className={isActive('/packages') ? styles.active : ''}><Link href="/packages">Packages</Link></li>
        <li className={isActive('/tariff') ? styles.active : ''}><Link href="/tariff">Tariff</Link></li>
        <li className={isActive('/blog') ? styles.active : ''}><Link href="/blog">Blog</Link></li>
        <li className={isActive('/fleet') ? styles.active : ''}><Link href="/fleet">Fleet</Link></li>
        <li><Link href="/#contact">Contact Us</Link></li>
      </ul>

      {/* Desktop CTA */}
      <div className={styles.cta}>
        <Link href="/fleet" className={styles.navBtn}>
          <span className={styles.iconCircle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
          Get Started
        </Link>
      </div>

      {/* Hamburger Button (mobile only) */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/#about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link href="/packages" onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link href="/tariff" onClick={() => setMenuOpen(false)}>Tariff</Link></li>
          <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
          <li><Link href="/fleet" onClick={() => setMenuOpen(false)}>Fleet</Link></li>
          <li><Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
}
