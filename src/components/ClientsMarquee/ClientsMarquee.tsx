"use client";

import React from 'react';
import styles from './ClientsMarquee.module.css';

// --- Custom High-Fidelity SVG Brand Logos (for local/regional brands) ---

interface LogoProps {
  className?: string;
}

const clientLogos = [
  { name: "L&T", logo: <img src="/images/logos/larsen_toubro.svg" alt="L&T" className={styles.logoIcon} /> },
  { name: "Abott", logo: <img src="/images/logos/abbott.svg" alt="Abbott" className={styles.logoIcon} /> },
  { name: "TCS", logo: <img src="/images/tcs.png" alt="TCS" className={`${styles.logoIcon} ${styles.tcsLogo}`} /> },
  { name: "HCL", logo: <img src="/images/logos/hcl.svg" alt="HCL" className={styles.logoIcon} /> },
  { name: "Maruthi Suzuki", logo: <img src="/images/logos/maruti_suzuki.svg" alt="Maruti Suzuki" className={`${styles.logoIcon} ${styles.marutiLogo}`} /> },
  { name: "TATA Motors", logo: <img src="/images/logos/tata_motors.svg" alt="TATA Motors" className={styles.logoIcon} /> }
];

export default function ClientsMarquee() {
  // Duplicating the list multiple times to facilitate a seamless infinite loop animation
  const list = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos
  ];

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.container}>
        <p className={styles.label}>Trusted by Industry Leaders & Travel Partners</p>
        <div className={styles.marqueeWrapper}>
          <div className={styles.track}>
            {list.map((item, index) => (
              <div key={index} className={styles.logoCard}>
                {item.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
