"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Fleet.module.css';

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

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={containerRef} className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <motion.img
          src={bgImage}
          alt={title}
          style={{ y }}
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <div className={styles.badgeRow}>
            <span className={styles.seatsBadge}>{seats}</span>
            <span className={styles.priceBadge}>{price}</span>
          </div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardModels}>{models}</p>
        </div>

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

export default function FleetGrid({ activeFleet }: { activeFleet: any[] }) {
  return (
    <div className={styles.grid}>
      {activeFleet.map((item, idx) => {
        // If models contain commas, convert them to bullet points for display
        const displayModels = item.description 
          ? item.description.split(',').map((m: string) => m.trim()).join(' • ')
          : '';

        return (
          <ParallaxCard 
            key={idx} 
            title={item.name} 
            models={displayModels} 
            seats={item.seats || ''} 
            price={item.price || ''} 
            features={Array.isArray(item.features) ? item.features : []} 
            bgImage={item.image_url} 
          />
        );
      })}
    </div>
  );
}
