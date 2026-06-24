import React from 'react';
import styles from './About.module.css';

const featureList = [
  {
    title: 'Trusted & Safe',
    desc: 'Fully insured vehicles with regular maintenance and safety checks.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    title: 'Always Here',
    desc: '24/7 customer support to assist you anytime, anywhere.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    )
  },
  {
    title: 'Wide Selection',
    desc: 'From economy to luxury, choose the perfect ride for every journey.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="6" rx="2" />
        <path d="M17 11l-1.5-4.5A1 1 0 0 0 14.5 6h-5a1 1 0 0 0-.95.7L7 11" />
        <circle cx="8" cy="20" r="2" />
        <circle cx="16" cy="20" r="2" />
      </svg>
    )
  },
  {
    title: 'Across Locations',
    desc: '50+ pickup locations making travel more accessible for you.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  }
];

const statsList = [
  {
    value: '10K+',
    label: 'Vehicles Worldwide',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="6" rx="2" />
        <path d="M17 11l-1.5-4.5A1 1 0 0 0 14.5 6h-5a1 1 0 0 0-.95.7L7 11" />
        <circle cx="8" cy="20" r="2" />
        <circle cx="16" cy="20" r="2" />
      </svg>
    )
  },
  {
    value: '5K+',
    label: 'Happy Customers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    value: '50+',
    label: 'Pickup Locations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    value: '99%',
    label: 'Customer Satisfaction',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
];

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Left Column - Content */}
        <div className={styles.textColumn}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l1.5 10.5L12 22l8.5-4.5L22 7l-10-5z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </span>
            ABOUT US
          </div>
          
          <h2 className={styles.heading}>
            Mobility solutions <br />
            built <span className={styles.highlight}>around you.</span>
          </h2>
          
          <div className={styles.accentLine}></div>
          
          <p className={styles.description}>
            We provide a wide range of well-maintained vehicles to suit business trips, 
            family vacations, and everyday travel needs. Your comfort, safety, and 
            satisfaction are at the heart of everything we do.
          </p>

          {/* 2x2 Features Grid */}
          <div className={styles.featuresGrid}>
            {featureList.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.iconCircle}>
                  {feature.icon}
                </div>
                <div className={styles.featureText}>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Block */}
          <div className={styles.testimonialCard}>
            <img src="/images/ceo_avatar.png" alt="James Carter" className={styles.avatar} />
            <div className={styles.testimonialContent}>
              <span className={styles.quoteSymbol}>“</span>
              <p className={styles.quoteText}>
                We aim to deliver more than just rides. We deliver trust, 
                reliability, and peace of mind with every journey.
              </p>
              <div className={styles.testimonialMeta}>
                <div className={styles.authorInfo}>
                  <h4>James Carter</h4>
                  <p>CEO & Founder</p>
                </div>
                <span className={styles.signature}>James Carter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Unified Showcase Card containing Image Area, Wave divider & Stats panel */}
        <div className={styles.showcaseColumn}>
          <div className={styles.showcaseCard}>
            {/* Upper Image Area */}
            <div className={styles.imageArea}>
              {/* Wavy Divider to seamlessly blend the image bottom with statsPanel */}
              <div className={styles.wavyDivider}>
                <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={styles.waveSvg}>
                  <path 
                    d="M0,80 C360,110 1080,30 1440,10 L1440,100 L0,100 Z" 
                    fill="#112513" 
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Contiguous Forest Green Stats Panel */}
            <div className={styles.statsPanel}>
              {/* Abstract Flow lines background */}
              <div className={styles.statsBgFlow}>
                <svg viewBox="0 0 1000 150" fill="none" preserveAspectRatio="none" className={styles.flowSvg}>
                  <path d="M-50,130 C200,100 400,140 600,80 C800,20 900,110 1050,40" stroke="rgba(190, 235, 66, 0.08)" strokeWidth="1.5" />
                  <path d="M-50,110 C200,70 350,120 580,60 C800,0 880,90 1050,20" stroke="rgba(190, 235, 66, 0.05)" strokeWidth="1.5" />
                  <path d="M-50,150 C220,120 450,150 630,95 C820,40 920,130 1050,60" stroke="rgba(190, 235, 66, 0.04)" strokeWidth="1.2" />
                  <path d="M-50,90 C180,50 380,90 550,40 C720,-10 850,70 1050,10" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />
                </svg>
              </div>
              {statsList.map((stat, idx) => (
                <div key={idx} className={styles.statCardItem}>
                  <div className={styles.statCardIcon}>
                    {stat.icon}
                  </div>
                  <h3 className={styles.statCardNumber}>{stat.value}</h3>
                  <p className={styles.statCardLabel}>
                    {stat.label.split(' ').map((word, wIdx) => (
                      <React.Fragment key={wIdx}>
                        {word}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
