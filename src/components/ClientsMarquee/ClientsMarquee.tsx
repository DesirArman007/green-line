"use client";

import React from 'react';
import styles from './ClientsMarquee.module.css';

// --- Custom High-Fidelity SVG Brand Logos (for local/regional brands) ---

interface LogoProps {
  className?: string;
}

const SSVLogo = ({ className }: LogoProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L12 12L7 7" />
    <path d="M13 17L18 12L13 7" />
  </svg>
);

const MagicTripLogo = ({ className }: LogoProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 4V2M15 16v-2M8 9h2M20 9h-2M19 5l-1.5 1.5M11 13l-1.5 1.5M19 13l-1.5-1.5M11 5l-1.5-1.5" />
    <path d="M2 22l8-8" />
  </svg>
);

const VeloreLogo = ({ className }: LogoProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const VijayaMilkLogo = ({ className }: LogoProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22Z" />
  </svg>
);

const clientLogos = [
  { name: "SSV Travels", logo: <SSVLogo className={styles.logoIcon} /> },
  { name: "Magic trip", logo: <MagicTripLogo className={styles.logoIcon} /> },
  { name: "Velore Travels", logo: <VeloreLogo className={styles.logoIcon} /> },
  { name: "L&T", logo: <img src="/images/logos/larsen_toubro.svg" alt="L&T" className={styles.logoIcon} /> },
  { name: "Abott", logo: <img src="/images/logos/abbott.svg" alt="Abbott" className={styles.logoIcon} /> },
  { name: "Lupin", logo: <img src="https://logo.clearbit.com/lupin.com" alt="Lupin" className={styles.logoIcon} /> },
  { name: "TCS", logo: <img src="/images/logos/tcs.svg" alt="TCS" className={styles.logoIcon} /> },
  { name: "FirstSource", logo: <img src="https://logo.clearbit.com/firstsource.com" alt="FirstSource" className={styles.logoIcon} /> },
  { name: "HCL", logo: <img src="/images/logos/hcl.svg" alt="HCL" className={styles.logoIcon} /> },
  { name: "Vijaya Milk", logo: <VijayaMilkLogo className={styles.logoIcon} /> },
  { name: "Maruthi Suzuki", logo: <img src="/images/logos/maruti_suzuki.svg" alt="Maruti Suzuki" className={styles.logoIcon} /> },
  { name: "TATA Motors", logo: <img src="/images/logos/tata_motors.svg" alt="TATA Motors" className={styles.logoIcon} /> },
  { name: "APEX", logo: <img src="https://logo.clearbit.com/apex.com" alt="APEX" className={styles.logoIcon} /> }
];

export default function ClientsMarquee() {
  // Duplicating the list to facilitate a seamless infinite loop animation
  const list = [...clientLogos, ...clientLogos];

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.container}>
        <p className={styles.label}>Trusted by Industry Leaders & Travel Partners</p>
        <div className={styles.marqueeWrapper}>
          <div className={styles.track}>
            {list.map((item, index) => (
              <div key={index} className={styles.logoCard}>
                {item.logo}
                <span className={styles.name}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
