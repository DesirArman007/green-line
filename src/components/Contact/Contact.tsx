"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            GET IN TOUCH
          </div>
          <h2 className={styles.title}>
            Plan Your Journey With <span className={styles.highlight}>Greenline Travels</span>
          </h2>
          <p className={styles.subtitle}>
            Need a premium ride for your next trip? Reach out via call, WhatsApp,
            or fill the form below. We’re here to make your journey smooth and comfortable.
          </p>
        </div>

        {/* Middle spacer to let the background roadmap graphic show through */}
        <div className={styles.spacer} />

        {/* Contact Cards Grid with Framer Motion Staggered entrance */}
        <motion.div 
          className={styles.cardsGrid}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          
          {/* Card 1: Our Location */}
          <motion.a 
            href="https://maps.app.goo.gl/nsXXjwKXTdx1Hbq57" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.contactCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } }
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>OUR LOCATION</span>
                <h4 className={styles.cardTitleText}>Greenline Car Travels</h4>
                <p className={styles.cardDesc}>Shamshabad, Hyderabad – 501218 India</p>
              </div>
            </div>
            <div className={styles.cardRight}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.a>

          {/* Card 2: Whatsapp */}
          <motion.a 
            href="https://wa.me/918282825442" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.contactCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } }
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>WHATSAPP</span>
                <h4 className={styles.cardTitleText}>+91 82828 25442</h4>
                <p className={styles.cardDesc}>Instant reply guaranteed</p>
              </div>
            </div>
            <div className={styles.cardRight}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.a>

          {/* Card 3: Email Us */}
          <motion.a 
            href="mailto:contact@greenlinecaartravels.in" 
            className={styles.contactCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } }
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>EMAIL US</span>
                <h4 className={styles.cardTitleText}>contact@greenlinecaartravels.in</h4>
                <p className={styles.cardDesc}>Reply within 24 hours</p>
              </div>
            </div>
            <div className={styles.cardRight}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.a>

          {/* Card 4: Availability */}
          <motion.div 
            className={styles.contactCard}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } }
            }}
          >
            <div className={styles.cardLeft}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>AVAILABILITY</span>
                <h4 className={styles.cardTitleText}>24/7 Service</h4>
                <p className={styles.cardDesc}>Round the clock support</p>
              </div>
            </div>
            <div className={styles.cardRight}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* Grid Pattern Details at bottom corners */}
      <div className={styles.gridPatternLeft} />
      <div className={styles.gridPatternRight} />
    </section>
  );
}
