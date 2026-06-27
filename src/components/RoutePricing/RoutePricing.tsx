"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RoutePricing.module.css';

interface PricingData {
  id: string;
  name: string;
  thumbnail: string;
  posterImage: string;
  oneWay: {
    price: string;
    extraKm: string;
    extraHr: string;
    limit: string;
  };
  roundTrip: {
    perKm: string;
    batta: string;
    calc: string;
  };
}

const routePricingList: PricingData[] = [
  {
    id: 'dzire-etios',
    name: 'Dzire / Etios',
    thumbnail: '/images/sedan_profile.png',
    posterImage: '/images/posters/tall_poster_v2.png',
    oneWay: {
      price: '4,999/-',
      extraKm: '20/-',
      extraHr: '100/-',
      limit: '300km in 6hrs'
    },
    roundTrip: {
      perKm: '12/-',
      batta: '500/-',
      calc: '350km'
    }
  },
  {
    id: 'toyota-innova',
    name: 'Toyota Innova',
    thumbnail: '/images/fleet_premium_suv.png',
    posterImage: '/images/posters/tall_poster_v2.png',
    oneWay: {
      price: '9,000/-',
      extraKm: '30/-',
      extraHr: '200/-',
      limit: '300km in 6hrs'
    },
    roundTrip: {
      perKm: '16/-',
      batta: '500/-',
      calc: '400km'
    }
  },
  {
    id: 'toyota-crysta',
    name: 'Toyota Crysta',
    thumbnail: '/images/fleet_premium_suv.png',
    posterImage: '/images/posters/tall_poster_v2.png',
    oneWay: {
      price: '11,000/-',
      extraKm: '35/-',
      extraHr: '250/-',
      limit: '300km in 6hrs'
    },
    roundTrip: {
      perKm: '19/-',
      batta: '500/-',
      calc: '400km'
    }
  },
  {
    id: 'maruti-ertiga',
    name: 'Maruti Ertiga',
    thumbnail: '/images/fleet_suv.png',
    posterImage: '/images/posters/tall_poster_v2.png',
    oneWay: {
      price: '7,500/-',
      extraKm: '25/-',
      extraHr: '150/-',
      limit: '300km in 6hrs'
    },
    roundTrip: {
      perKm: '15/-',
      batta: '500/-',
      calc: '350km'
    }
  },
  {
    id: 'maruti-brezza',
    name: 'Maruti Brezza',
    thumbnail: '/images/fleet_suv.png',
    posterImage: '/images/posters/tall_poster_v2.png',
    oneWay: {
      price: '6,500/-',
      extraKm: '22/-',
      extraHr: '120/-',
      limit: '300km in 6hrs'
    },
    roundTrip: {
      perKm: '13/-',
      batta: '500/-',
      calc: '350km'
    }
  }
];

export default function RoutePricing() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentData = routePricingList[selectedIdx];

  const handleWhatsAppRedirect = () => {
    const message = `Hello GreenLine, I would like to book a ${currentData.name} for Vijayawada - Hyderabad route. Please send details.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918282825442?text=${encoded}`, '_blank');
  };

  return (
    <section className={styles.section} id="route-pricing">
      <div className={styles.container}>

        {/* Upgraded Header Banner Card */}
        <div className={styles.routeHeaderCard}>
          <div className={styles.headerTexts}>
            <h2 className={styles.routeTitle}>
              VIJAYAWADA <span className={styles.swapArrow}>⇄</span> HYDERABAD
            </h2>
            <p className={styles.subtitle}>
              EXCLUSIVE <span className={styles.greenText}>ONE-WAY & ROUND TRIP</span> ROUTE TARIFFS
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className={styles.layoutGrid}>

          {/* Column 1: Tabs List with car image & chevrons */}
          <div className={styles.tabsCol}>
            <div className={styles.tabsListCard}>
              <span className={styles.sidebarTitle}>CHOOSE YOUR CAR</span>
              {routePricingList.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`${styles.tabBtn} ${selectedIdx === idx ? styles.activeTab : ''}`}
                >
                  <div className={styles.tabBtnLeft}>
                    <span className={styles.tabName}>{item.name}</span>
                  </div>
                  <svg
                    className={styles.chevronIcon}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Digital Styled Poster */}
          <div className={styles.posterCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData.id}
                className={styles.posterCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={handleWhatsAppRedirect}
              >
                <img
                  src={currentData.posterImage}
                  alt={currentData.name}
                  className={styles.flatPosterImg}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Column 3: Premium pricing card with check lists, check pills, and bottom feature items */}
          <div className={styles.pricingCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData.id}
                className={styles.pricingDetailsCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* One Way Block */}
                <div className={styles.pricingBlock}>
                  <div className={styles.blockHeaderRow}>
                    <div className={styles.circularIconCircle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h3 className={styles.blockTitle}>ONE WAY DROP</h3>
                  </div>

                  <div className={styles.pricingTable}>
                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        One way drop
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.oneWay.price}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        Per Extra Km
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.oneWay.extraKm}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Per Extra Hour
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.oneWay.extraHr}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Day Limit
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.oneWay.limit}</span>
                    </div>
                  </div>

                  {/* Shield Inclusions Pill */}
                  <div className={styles.pillContainer}>
                    <svg className={styles.pillIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>All Including (Tolls, Oil, Permits If Any)</span>
                  </div>
                </div>

                {/* Divider */}
                <div className={styles.cardDivider} />

                {/* Round Trip Block */}
                <div className={styles.pricingBlock}>
                  <div className={styles.blockHeaderRow}>
                    <div className={styles.circularIconCircle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="23 4 23 10 17 10" />
                        <polyline points="1 20 1 14 7 14" />
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </svg>
                    </div>
                    <h3 className={styles.blockTitle}>ROUND TRIP</h3>
                  </div>

                  <div className={styles.pricingTable}>
                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        Per Km
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.roundTrip.perKm}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Driver Batta
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.roundTrip.batta}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.rowLabelGroup}>
                        <svg className={styles.rowIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Day Calculation
                      </span>
                      <span className={styles.dots} />
                      <span className={styles.value}>{currentData.roundTrip.calc}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Value Badges */}
                <div className={styles.featuresRow}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIconCircle}>
                      {/* Fuel Pump SVG */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 22V2h10v20H3z" />
                        <path d="M13 5h4a2 2 0 0 1 2 2v6" />
                        <circle cx="17" cy="18" r="2" />
                        <line x1="6" y1="6" x2="10" y2="6" />
                        <line x1="6" y1="10" x2="10" y2="10" />
                      </svg>
                    </div>
                    <div className={styles.featureLabels}>
                      <span className={styles.featTitle}>FUEL</span>
                      <span className={styles.featSub}>INCLUDED</span>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.featureIconCircle}>
                      {/* Toll gate / Road SVG */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <line x1="12" y1="15" x2="12" y2="18" />
                      </svg>
                    </div>
                    <div className={styles.featureLabels}>
                      <span className={styles.featTitle}>TOLLS</span>
                      <span className={styles.featSub}>INCLUDED</span>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.featureIconCircle}>
                      {/* Document permit check SVG */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <polyline points="9 15 11 17 15 13" />
                      </svg>
                    </div>
                    <div className={styles.featureLabels}>
                      <span className={styles.featTitle}>PERMITS</span>
                      <span className={styles.featSub}>INCLUDED</span>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.featureIconCircle}>
                      {/* Expert driver steering wheel SVG */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="12" y1="2" x2="12" y2="9" />
                        <line x1="12" y1="15" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="9" y2="12" />
                        <line x1="15" y1="12" x2="22" y2="12" />
                      </svg>
                    </div>
                    <div className={styles.featureLabels}>
                      <span className={styles.featTitle}>EXPERT</span>
                      <span className={styles.featSub}>DRIVERS</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
