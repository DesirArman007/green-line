"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Fleet.module.css';

const fleetList = [
  {
    title: 'Sedan',
    models: 'Dzire • Etios • Amaze',
    seats: '4+1 Seats',
    price: 'From ₹12/km',
    features: ['AC', 'GPS Tracking', 'Boot Space'],
    bgImage: '/images/fleet_sedan.png'
  },
  {
    title: 'Premium Sedan',
    models: 'Ciaz • Verna',
    seats: '4+1 Seats',
    price: 'From ₹13/km',
    features: ['AC', 'Leather Seats', 'Premium Audio'],
    bgImage: '/images/fleet_premium_sedan.png'
  },
  {
    title: 'SUV',
    models: 'Ertiga • Kia Carens',
    seats: '7 Seats',
    price: 'From ₹14/km',
    features: ['AC', 'Spacious', 'Family Friendly'],
    bgImage: '/images/fleet_suv.png'
  },
  {
    title: 'Premium SUV',
    models: 'Innova Crysta • Innova Hycross',
    seats: '7/8 Seats',
    price: 'From ₹18/km',
    features: ['AC', 'Captain Seats', 'Premium Interior'],
    bgImage: '/images/fleet_premium_suv.png'
  },
  {
    title: 'Tempo Traveller',
    models: 'Force Urbania • Tempo Traveller',
    seats: '12–19 Seats',
    price: 'From ₹22/km',
    features: ['AC', 'Pushback Seats', 'Group Travel'],
    bgImage: '/images/fleet_tempo_traveller.png'
  },
  {
    title: 'Mini Bus & Bus',
    models: 'Mini Bus • Luxury Bus',
    seats: '22–45 Seats',
    price: 'Custom Quote',
    features: ['AC', 'PA System', 'Large Groups'],
    bgImage: '/images/fleet_bus.png'
  }
];

interface ParallaxCardProps {
  title: string;
  models: string;
  seats: string;
  price: string;
  features: string[];
  bgImage: string;
}

function ParallaxCard({ title, models, seats, price, features, bgImage }: ParallaxCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Moves image smoothly to create the parallax scroll effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={containerRef} className={styles.cardContainer}>
      {/* Background Image Container */}
      <div className={styles.imageWrapper}>
        <motion.img
          src={bgImage}
          alt={title}
          style={{ y }}
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content Overlay */}
      <div className={styles.cardContent}>
        {/* Top Info */}
        <div className={styles.cardTop}>
          <div className={styles.badgeRow}>
            <span className={styles.seatsBadge}>{seats}</span>
            <span className={styles.priceBadge}>{price}</span>
          </div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardModels}>{models}</p>
        </div>

        {/* Bottom Details */}
        <div className={styles.cardBottom}>
          <ul className={styles.featuresList}>
            {features.map((feat, idx) => (
              <li key={idx}>
                <span className={styles.featureDot}></span>
                {feat}
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/918282825442?text=${encodeURIComponent(`Hello GreenLine, I'm interested in booking a ${title} (${models}). Please share availability and pricing.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
            style={{ textDecoration: 'none' }}
          >
            Book Now <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Fleet() {
  return (
    <section className={styles.fleetSection} id="fleet">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <div className={styles.subtitleWrapper}>
            <span className={styles.line}></span>
            <h4 className={styles.subtitle}>OUR DIVERSE FLEET</h4>
            <span className={styles.line}></span>
          </div>
          <h2 className={styles.title}>
            Diverse Fleet for Comfort & <span className={styles.highlight}>Performance.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {fleetList.map((item, idx) => (
            <ParallaxCard key={idx} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}
