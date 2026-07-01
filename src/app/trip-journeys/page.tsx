"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import VideoTestimonials from '@/components/VideoTestimonials/VideoTestimonials';
import styles from './page.module.css';

export default function TripJourneysPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Navbar />
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroTextBlock}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbActive}>Trip Journeys</span>
            </div>
            <h1 className={styles.heroTitle}>
              Explore Our <span className={styles.heroHighlight}>Trip Journeys</span>
            </h1>
            <p className={styles.heroDesc}>
              Watch video testimonials and stories from our travelers who have experienced the comfort and reliability of Green Line.
            </p>
          </motion.div>
        </div>
        <div className={styles.heroGradient} />
      </section>

      <main className={styles.main} style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <VideoTestimonials showAllButton={false} />

        <div className={styles.container} style={{ marginTop: '60px' }}>
          <div className={styles.bottomCta}>
            <div className={styles.bottomCtaInner}>
              <div className={styles.bottomCtaText}>
                <h3>Ready to start your own journey?</h3>
                <p>
                  We can customize any itinerary to fit your schedule, budget, and preferences.
                  Get in touch with our travel experts today.
                </p>
              </div>
              <Link href="/#contact" className={styles.bottomCtaBtn}>
                Contact Us
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
