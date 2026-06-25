"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonialList = [
  {
    name: 'Bessie Cooper',
    image: '/images/testimonial_bessie.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”',
    company: 'CEO, Cooper Tech'
  },
  {
    name: 'Devon Lane',
    image: '/images/testimonial_devon.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”',
    company: 'Founder, Lane Agency'
  },
  {
    name: 'Leslie Alexander',
    image: '/images/testimonial_leslie.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”',
    company: 'Director, Alexander Co.'
  },
  {
    name: 'Annette Black',
    image: '/images/testimonial_annette.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”',
    company: 'Director, Black Design'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialList.length) % testimonialList.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const current = testimonialList[activeIndex];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span>Testimonials</span>
          </div>
          <h2 className={styles.heading}>
            Real customer experiences that <span className={styles.highlight}>build trust</span>
          </h2>
        </div>

        {/* Decorative theme dot on the left */}
        <div className={styles.leftDotWrapper}>
          <div className={styles.decorativeDot}></div>
        </div>

        {/* Desktop Grid Layout (Visible on desktop) */}
        <div className={styles.desktopGrid}>
          {testimonialList.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <img 
                src={item.image} 
                alt={item.name} 
                className={styles.cardImage} 
              />
              <div className={styles.overlay} />

              <div className={styles.cardContent}>
                {/* 5-star rating */}
                <div className={styles.stars}>
                  <span className={styles.star}>★</span>
                  <span className={styles.star}>★</span>
                  <span className={styles.star}>★</span>
                  <span className={styles.star}>★</span>
                  <span className={styles.star}>★</span>
                </div>
                
                {/* Quote */}
                <p className={styles.quote}>{item.quote}</p>

                {/* Customer Name & Company */}
                <div>
                  <h3 className={styles.name}>{item.name}</h3>
                  <span className={styles.company}>{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider Container (Visible on mobile/tablet) */}
        <div className={styles.sliderWrapper}>
          <button 
            className={`${styles.navBtn} ${styles.prevBtn}`} 
            onClick={handlePrev} 
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className={styles.sliderViewport}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className={styles.activeSlide}
              >
                <div className={styles.card}>
                  {/* Image Background */}
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className={styles.cardImage} 
                  />
                  <div className={styles.overlay} />

                  {/* Text content overlay */}
                  <div className={styles.cardContent}>
                    {/* 5-star rating */}
                    <div className={styles.stars}>
                      <span className={styles.star}>★</span>
                      <span className={styles.star}>★</span>
                      <span className={styles.star}>★</span>
                      <span className={styles.star}>★</span>
                      <span className={styles.star}>★</span>
                    </div>
                    
                    {/* Quote */}
                    <p className={styles.quote}>{current.quote}</p>

                    {/* Customer Name & Company */}
                    <div>
                      <h3 className={styles.name}>{current.name}</h3>
                      <span className={styles.company}>{current.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className={`${styles.navBtn} ${styles.nextBtn}`} 
            onClick={handleNext} 
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className={styles.dotsContainer}>
          {testimonialList.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
