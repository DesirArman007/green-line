"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import RoutePricing from '@/components/RoutePricing/RoutePricing';
import styles from './page.module.css';

export default function FleetPage() {
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
            {/* Breadcrumbs */}
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbActive}>Fleet</span>
            </div>
            <h1 className={styles.heroTitle}>
              Our Fleet & <span className={styles.heroHighlight}>Tariffs</span>
            </h1>
            <p className={styles.heroDesc}>
              Explore our transparent route tariffs and hire professional chauffeur-driven sedans and SUVs for local or outstation journeys.
            </p>
          </motion.div>
        </div>
        <div className={styles.heroGradient} />
      </section>

      {/* Main interactive Route Pricing Component */}
      <main className={styles.main}>
        <RoutePricing />
      </main>

      <Footer />
    </>
  );
}
