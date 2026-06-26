"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';
import ScreenCarousel from './ScreenCarousel';

const servicesList = [
  {
    title: 'Local Trips',
    badge: 'FROM ₹499',
    desc: 'Comfortable city rides with professional chauffeurs for daily commutes, meetings, and errands across your city.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
    )
  },
  {
    title: 'Airport Transfers',
    badge: 'FROM ₹699',
    desc: 'Punctual pick-ups and drop-offs to all major airports. Flight tracking ensures your driver is always on time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4.2.9.6 1l5.5 1.8L5 17l-2.4-.6c-.4-.1-.9.2-1 .6L1 19.4c-.1.4.2.8.6.9l4.8 1.2 1.2 4.8c.1.4.5.7.9.6l2.4-1c.4-.1.7-.6.6-1L11 19l3.7-3.7 1.8 5.5c.1.4.6.7 1 .6l3.6-1.2c.5-.2.8-.6.7-1z"></path></svg>
    )
  },
  {
    title: 'Outstation Travel',
    badge: 'PAN INDIA',
    desc: 'Seamless intercity travel across South India with experienced drivers and well-maintained vehicles for long journeys.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.1 2.182a2 2 0 0 1 3.8 0l1.196 3.586a2 2 0 0 0 1.517 1.341l3.66.417a2 2 0 0 1 1.144 3.518l-2.736 2.45a2 2 0 0 0-.62 1.905l.758 3.593a2 2 0 0 1-2.956 2.148L12.5 19.26a2 2 0 0 0-1 0l-3.363 1.878a2 2 0 0 1-2.956-2.148l.758-3.593a2 2 0 0 0-.62-1.905l-2.736-2.45a2 2 0 0 1 1.144-3.518l3.66-.417a2 2 0 0 0 1.517-1.341l1.196-3.586Z"></path></svg>
    )
  },
  {
    title: 'Tour Packages',
    badge: 'CUSTOMIZABLE',
    desc: 'Custom-crafted travel itineraries for pilgrimage, holiday, and leisure tours — designed around your schedule and budget.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-3V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4z"></path><line x1="8" y1="11" x2="8" y2="15"></line><line x1="16" y1="11" x2="16" y2="15"></line></svg>
    )
  },
  {
    title: 'Corporate Travel',
    badge: 'B2B PLANS',
    desc: 'Dedicated fleet solutions for businesses — employee transport, client pickups, and executive chauffeur services.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="9.01" y2="18"></line><line x1="15" y1="18" x2="15.01" y2="18"></line></svg>
    )
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselMedia = [
    { type: 'image' as const, src: '/images/local-trips.png' },
    { type: 'image' as const, src: '/images/airport-trip.png' },
    { type: 'image' as const, src: '/images/outstation.png' },
    { type: 'image' as const, src: '/images/tour-packages.png' },
    { type: 'image' as const, src: '/images/corporate.png' },
  ];

  return (
    <section className={styles.servicesSection} id="services">
      {/* Desktop Layout (visible on screens > 768px) */}
      <div className={`${styles.container} ${styles.desktopView}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.subtitleWrapper}>
            <span className={styles.line}></span>
            <h4 className={styles.subtitle}>Services of Greenline</h4>
            <span className={styles.line}></span>
          </div>
          <h2 className={styles.title}>
            Driven by Trust. Powered by <span className={styles.highlight}>Excellence.</span>
          </h2>
        </div>

        {/* Large Centered Showcase Area */}
        <div className={styles.largeShowcaseArea}>
          <ScreenCarousel 
            customMediaItems={carouselMedia}
            activeIndex={activeIndex}
            onIndexChange={(idx) => setActiveIndex(idx)}
            laptopWidth={960}
            tilt={true}
            ambientGlow={true}
            glowColor="#BEEB42"
            glowIntensity={35}
            frameColor="Space Black"
            videoTransition="Slide"
          />
        </div>

        {/* Horizontal Underlined Navigation Menu */}
        <div className={styles.horizontalNav}>
          {servicesList.map((service, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <span className={styles.navItemText}>
                  {service.title}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className={styles.activeUnderlineLine}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Centered Active Description Block with Fading Transition */}
        <div className={styles.descriptionBlock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={styles.descriptionContent}
            >
              <div className={styles.badgeWrapper}>
                <span className={styles.badge}>{servicesList[activeIndex].badge}</span>
              </div>
              <p className={styles.descriptionText}>
                {servicesList[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Layout (visible on screens <= 768px) */}
      <div className={`${styles.container} ${styles.mobileView}`}>
        {/* Business Travel Showcase Banner */}
        <div className={styles.businessTravelBanner}>
          <div className={styles.mBadge}>
            <span className={styles.mBadgeLine}></span>
            <span className={styles.mBadgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </span>
            <span className={styles.mBadgeText}>GREENLINE</span>
            <span className={styles.mBadgeLine}></span>
          </div>

          <h2 className={styles.mMainTitle}>
            Business Travel.<br />Handled <span className={styles.mGreenText}>Seamlessly.</span>
          </h2>

          <p className={styles.mSubDesc}>
            Seamless intercity travel across South India with experienced drivers and well-maintained vehicles for long journeys.
          </p>

          {/* Left List + Right Curved Image Row */}
          <div className={styles.mShowcaseRow}>
            {/* Features List */}
            <div className={styles.mFeaturesList}>
              <div className={styles.mFeatureItem}>
                <div className={styles.mFeatureIconBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className={styles.mFeatureTextBox}>
                  <h4>Experienced Drivers</h4>
                  <p>Professional, verified & trained for safe journeys.</p>
                </div>
              </div>

              <div className={styles.mFeatureItem}>
                <div className={styles.mFeatureIconBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="5" y="11" width="14" height="6" rx="2"></rect>
                    <path d="M17 11l-1.5-4.5A1 1 0 0 0 14.5 6h-5a1 1 0 0 0-.95.7L7 11"></path>
                    <circle cx="8" cy="20" r="2"></circle>
                    <circle cx="16" cy="20" r="2"></circle>
                  </svg>
                </div>
                <div className={styles.mFeatureTextBox}>
                  <h4>Well-Maintained Vehicles</h4>
                  <p>Clean, comfortable & serviced for a smooth ride.</p>
                </div>
              </div>

              <div className={styles.mFeatureItem}>
                <div className={styles.mFeatureIconBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className={styles.mFeatureTextBox}>
                  <h4>On-time & Reliable</h4>
                  <p>Punctual service you can depend on.</p>
                </div>
              </div>

              <div className={styles.mFeatureItem}>
                <div className={styles.mFeatureIconBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className={styles.mFeatureTextBox}>
                  <h4>24/7 Support</h4>
                  <p>Always available to assist you on the go.</p>
                </div>
              </div>
            </div>

            {/* Showcase Image with curved overlay */}
            <div className={styles.mImageContainer}>
              <img 
                src="/images/corporate_travel.png" 
                alt="Business travel" 
                className={styles.mShowcaseImage}
              />
            </div>
          </div>
        </div>

        {/* OUR SERVICES Grid Divider */}
        <div className={styles.mSectionDivider}>
          <span className={styles.mDividerLine}></span>
          <span className={styles.mDividerText}>OUR SERVICES</span>
          <span className={styles.mDividerLine}></span>
        </div>

        {/* 6 Services Cards Grid */}
        <motion.div 
          className={styles.mServicesGrid}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-45px" }}
        >
          <motion.div 
            className={styles.mServiceCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
          >
            <div className={styles.mCardIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h4>Local Trips</h4>
            <p>Comfortable rides within the city.</p>
            <span className={styles.mCardUnderline}></span>
          </motion.div>

          <motion.div 
            className={styles.mServiceCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
          >
            <div className={styles.mCardIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4.2.9.6 1l5.5 1.8L5 17l-2.4-.6c-.4-.1-.9.2-1 .6L1 19.4c-.1.4.2.8.6.9l4.8 1.2 1.2 4.8c.1.4.5.7.9.6l2.4-1.5-.9-2.9"></path>
              </svg>
            </div>
            <h4>Airport Transfers</h4>
            <p>Timely pickups & drop-offs.</p>
            <span className={styles.mCardUnderline}></span>
          </motion.div>

          <motion.div 
            className={styles.mServiceCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
          >
            <div className={styles.mCardIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="5" y="11" width="14" height="6" rx="2"></rect>
                <path d="M17 11l-1.5-4.5A1 1 0 0 0 14.5 6h-5a1 1 0 0 0-.95.7L7 11"></path>
                <circle cx="8" cy="20" r="2"></circle>
                <circle cx="16" cy="20" r="2"></circle>
              </svg>
            </div>
            <h4>Outstation Travel</h4>
            <p>Safe & reliable travel across destinations.</p>
            <span className={styles.mCardUnderline}></span>
          </motion.div>

          <motion.div 
            className={styles.mServiceCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
          >
            <div className={styles.mCardIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h4>Corporate Travel</h4>
            <p>Professional travel for work & events.</p>
            <span className={styles.mCardUnderline}></span>
          </motion.div>

          <motion.div 
            className={styles.mServiceCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
          >
            <div className={styles.mCardIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 7h-3V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4z"></path>
              </svg>
            </div>
            <h4>Tour Packages</h4>
            <p>Curated packages for a memorable journey.</p>
            <span className={styles.mCardUnderline}></span>
          </motion.div>

          <motion.div 
            className={styles.mServiceCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
          >
            <div className={styles.mCardIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="9" y1="22" x2="9" y2="22"></line>
                <line x1="15" y1="22" x2="15" y2="22"></line>
                <line x1="9" y1="6" x2="9.01" y2="6"></line>
                <line x1="15" y1="6" x2="15.01" y2="6"></line>
                <line x1="9" y1="10" x2="9.01" y2="10"></line>
                <line x1="15" y1="10" x2="15.01" y2="10"></line>
              </svg>
            </div>
            <h4>Corporate Travel</h4>
            <p>Tailored solutions for business needs.</p>
            <span className={styles.mCardUnderline}></span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
