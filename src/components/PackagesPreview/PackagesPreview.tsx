"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import styles from './PackagesPreview.module.css';

export default function PackagesPreview() {
  const [featuredPackages, setFeaturedPackages] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function loadFeaturedPackages() {
      // Query the first 4 packages (since they are our seeded packages and should be displayed as featured)
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: true })
        .order('id', { ascending: true })
        .limit(4);

      if (!error && data) {
        setFeaturedPackages(
          data.map((d: any) => ({
            id: d.id,
            name: d.name,
            destination: d.destination,
            duration: d.duration,
            days: 1,
            nights: 0,
            price: d.price,
            priceValue: parseInt(d.price.replace(/[^0-9]/g, '')) || 0,
            vehicle: d.vehicle,
            image: d.image_url,
            highlights: d.highlights || [],
            category: d.category,
            featured: true, // Mark all returned as featured for the preview section
            description: d.description,
          }))
        );
      }
    }
    loadFeaturedPackages();
  }, []);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.subtitleWrapper}>
            <span className={styles.line} />
            <h4 className={styles.subtitle}>TOUR PACKAGES</h4>
            <span className={styles.line} />
          </div>
          <h2 className={styles.title}>
            Curated Journeys, Unforgettable{' '}
            <span className={styles.highlight}>Destinations.</span>
          </h2>
          <p className={styles.headerDesc}>
            Handpicked tour packages with expert drivers, comfortable vehicles, and
            hassle-free itineraries — so you can focus on the experience.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className={styles.grid}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featuredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={styles.card}
              variants={{
                hidden: { y: 40, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 80, damping: 16 },
                },
              }}
            >
              {/* Image */}
              <div className={styles.imageWrapper}>
                <img src={pkg.image} alt={pkg.name} className={styles.cardImage} />
                <div className={styles.imageOverlay} />

                {/* Duration Badge */}
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

                {/* Category Badge */}
                <span className={styles.categoryBadge}>
                  {pkg.category === 'pilgrimage'
                    ? '🙏 Pilgrimage'
                    : pkg.category === 'weekend'
                      ? '🌴 Weekend'
                      : '🗺️ Long Tour'}
                </span>
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
                </div>

                {/* Highlights */}
                <ul className={styles.highlights}>
                  {pkg.highlights.slice(0, 2).map((h: string, i: number) => (
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
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/packages" className={styles.ctaButton}>
            View All Packages
            <span className={styles.ctaArrow}>
              <svg
                width="18"
                height="18"
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
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
