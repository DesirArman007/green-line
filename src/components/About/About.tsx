import React from 'react';
import styles from './About.module.css';

const featureList = [
  {
    title: 'Trusted Rental Services',
    desc: 'Safe, insured, and quality-assured vehicles you can rely on.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    title: '24/7 Customer Support',
    desc: 'Our support team is always here to assist you anytime.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    )
  },
  {
    title: 'Wide Range of Vehicles',
    desc: 'From economy to luxury, we have the perfect car for every journey.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19a2 2 0 0 1 1.76 1.06L9.5 10h10.51a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <circle cx="17" cy="18" r="2"/>
        <circle cx="7" cy="18" r="2"/>
      </svg>
    )
  }
];

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Left Column */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19a2 2 0 0 1 1.76 1.06L9.5 10h10.51a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                </div>
                <h3>10K+</h3>
                <p>Vehicles Worldwide</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3>5K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3>50+</h3>
                <p>Pickup Locations</p>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <h3>99%</h3>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.textColumn}>
          <div className={styles.badge}>
            <span className={styles.dot}></span> ABOUT US
          </div>
          <h2 className={styles.heading}>
            Mobility solutions built <span className={styles.highlight}>around you.</span>
          </h2>
          <p className={styles.description}>
            We provide a wide range of well-maintained vehicles to suit business trips, family vacations, and everyday travel needs.
          </p>

          <div className={styles.featureList}>
            {featureList.map((feature, idx) => (
              <div key={idx} className={styles.featureRow}>
                <div className={styles.iconBox}>{feature.icon}</div>
                <div className={styles.featureText}>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
                <div className={styles.arrowIcon}>
                  &rarr;
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footerRow}>
            <button className={`btn-primary ${styles.aboutBtn}`}>
              <span>&rarr;</span> More About Us
            </button>
            <div className={styles.divider}></div>
            <div className={styles.founderInfo}>
              <img src="/images/ceo_avatar.png" alt="James Carter" className={styles.avatar} />
              <div className={styles.founderText}>
                <h4>James Carter</h4>
                <p>CEO & Founder</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
