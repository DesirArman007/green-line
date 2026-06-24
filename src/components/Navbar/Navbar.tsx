import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="GreenLine" className={styles.logoImage} />
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>
            Green<span className={styles.logoHighlight}>Line</span>
          </span>
          <span className={styles.logoSubtitle}>Drive Your Journey</span>
        </div>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.active}><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Services</a></li>
        <li>
          <a href="#">
            Cars 
            <svg className={styles.chevronIcon} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#">
            Pages 
            <svg className={styles.chevronIcon} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </a>
        </li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div className={styles.cta}>
        <button className={styles.navBtn}>
          <span className={styles.iconCircle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
          Get Started
        </button>
      </div>
    </nav>
  );
}
