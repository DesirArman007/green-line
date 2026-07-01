"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from('testimonials').select('*').order('is_featured', { ascending: false }).order('created_at', { ascending: false }).order('id', { ascending: true });
      if (data && !error) {
        setTestimonials(data);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return null; // Return empty or a loading state while fetching
  }

  const featuredTestimonials = testimonials.filter(t => t.is_featured);
  const defaultTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 4);
  const visibleTestimonials = showAll ? testimonials : defaultTestimonials;

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % visibleTestimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + visibleTestimonials.length) % visibleTestimonials.length);
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

  const current = visibleTestimonials[activeIndex];

  const renderStars = (rating: number) => {
    return (
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={styles.star} style={{ opacity: i < rating ? 1 : 0.3 }}>★</span>
        ))}
      </div>
    );
  };

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
          {visibleTestimonials.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <img 
                src={item.image_url} 
                alt={item.name} 
                className={styles.cardImage} 
              />
              <div className={styles.overlay} />

              <div className={styles.cardContent}>
                {/* Dynamic star rating */}
                {renderStars(item.rating || 5)}
                
                {/* Quote */}
                <p className={styles.quote}>{item.text}</p>

                {/* Customer Name & Company */}
                <div>
                  <h3 className={styles.name}>{item.name}</h3>
                  <span className={styles.company}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button for Desktop */}
        {testimonials.length > defaultTestimonials.length && (
          <div className={styles.viewAllWrapper}>
            <Link 
              href="/testimonials"
              className={styles.ctaButton} 
            >
              View All Testimonials
              <span className={styles.ctaArrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        )}

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
                    src={current.image_url} 
                    alt={current.name} 
                    className={styles.cardImage} 
                  />
                  <div className={styles.overlay} />

                  {/* Text content overlay */}
                  <div className={styles.cardContent}>
                    {/* Dynamic star rating */}
                    {renderStars(current.rating || 5)}
                    
                    {/* Quote */}
                    <p className={styles.quote}>{current.text}</p>

                    {/* Customer Name & Company */}
                    <div>
                      <h3 className={styles.name}>{current.name}</h3>
                      <span className={styles.company}>{current.role}</span>
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
          {testimonials.map((_, idx) => (
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
