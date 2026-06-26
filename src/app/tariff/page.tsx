"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Tariff from '@/components/Tariff/Tariff';
import styles from './page.module.css';

export default function TariffPage() {
  return (
    <>
      {/* Hero Banner for Navbar visibility */}
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
              <span className={styles.breadcrumbActive}>Tariff</span>
            </div>
            <h1 className={styles.heroTitle}>
              Explore Our <span className={styles.heroHighlight}>Tariffs</span>
            </h1>
            <p className={styles.heroDesc}>
              Transparent pricing. Trusted service. Find the perfect vehicle tariff tailored for your local use, outstation travel, and special trips.
            </p>
          </motion.div>
        </div>
        <div className={styles.heroGradient} />
      </section>

      {/* Main Tariff Pricing Section */}
      <main className={styles.main}>
        <Tariff />
      </main>

      <Footer />
    </>
  );
}
