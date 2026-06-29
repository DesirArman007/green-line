"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { tourPackages, categoryLabels, type TourPackage } from '@/data/packagesData';
import styles from './page.module.css';

const categories = Object.keys(categoryLabels);

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered: TourPackage[] =
    activeCategory === 'all'
      ? tourPackages
      : tourPackages.filter((pkg) => pkg.category === activeCategory);

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
              <span className={styles.breadcrumbActive}>Tour Packages</span>
            </div>
            <h1 className={styles.heroTitle}>
              Explore Our <span className={styles.heroHighlight}>Tour Packages</span>
            </h1>
            <p className={styles.heroDesc}>
              Choose from our handpicked travel itineraries — crafted for comfort,
              curated for unforgettable memories. Every journey includes a professional
              chauffeur and a well-maintained vehicle.
            </p>
          </motion.div>
        </div>
        {/* Ambient gradient */}
        <div className={styles.heroGradient} />
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Filter Tabs */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {categoryLabels[cat]}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className={styles.filterUnderline}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className={styles.resultsCount}>
            Showing <strong>{filtered.length}</strong> package{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Packages Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className={styles.grid}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.08,
                    type: 'spring',
                    stiffness: 80,
                    damping: 16,
                  }}
                >
                  {/* Image */}
                  <div className={styles.imageWrapper}>
                    <img src={pkg.image} alt={pkg.name} className={styles.cardImage} />
                    <div className={styles.imageOverlay} />
                    <span className={styles.durationBadge}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {pkg.duration}
                    </span>
                    <span className={styles.categoryBadge}>
                      {pkg.category === 'pilgrimage'
                        ? '🙏 Pilgrimage'
                        : pkg.category === 'weekend'
                          ? '🌴 Weekend'
                          : '🗺️ Long Tour'}
                    </span>
                    {pkg.featured && <span className={styles.featuredRibbon}>★ Featured</span>}
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div className={styles.locationRow}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--primary-green)"
                          strokeWidth="2.5"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className={styles.destination}>{pkg.destination}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{pkg.name}</h3>
                      <p className={styles.cardDesc}>{pkg.description}</p>
                    </div>

                    {/* Highlights */}
                    <ul className={styles.highlights}>
                      {pkg.highlights.map((h, i) => (
                        <li key={i}>
                          <span className={styles.highlightDot} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.priceBlock}>
                        <span className={styles.priceLabel}>Starting from</span>
                        <span className={styles.price}>{pkg.price}</span>
                      </div>
                      <div className={styles.footerRight}>
                        <div className={styles.vehicleBadge}>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                          </svg>
                          {pkg.vehicle}
                        </div>
                        <a
                          href={`https://wa.me/918282825442?text=${encodeURIComponent(
                            `Hi, I'm interested in the "${pkg.name}" package.\n\n` +
                            `- Destination: ${pkg.destination}\n` +
                            `- Duration: ${pkg.duration}\n` +
                            `- Vehicle: ${pkg.vehicle}\n` +
                            `- Price: ${pkg.price}\n\n` +
                            `Please share more details and availability.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.enquireBtn}
                          style={{ textDecoration: 'none' }}
                        >
                          Enquire Now
                          <svg
                            width="14"
                            height="14"
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
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <div className={styles.bottomCtaInner}>
              <div className={styles.bottomCtaText}>
                <h3>Can&apos;t find the perfect package?</h3>
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
