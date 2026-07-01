"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import styles from './VideoTestimonials.module.css';

interface TestimonialJourney {
  id: string;
  route: string;
  distance: string;
  vehicle: string;
  customer: string;
  initials: string;
  rating: number;
  quote: string;
  thumbnail: string;
  videoUrl: string;
}

interface VideoTestimonialsProps {
  showAllButton?: boolean;
  featuredOnly?: boolean;
}

export default function VideoTestimonials({ showAllButton = true, featuredOnly = false }: VideoTestimonialsProps = {}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [tripTestimonials, setTripTestimonials] = useState<TestimonialJourney[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadTestimonials() {
      setIsLoading(true);
      let query = supabase.from('video_testimonials').select('*').order('created_at', { ascending: false });
      
      if (featuredOnly) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (!error && data) {
        setTripTestimonials(
          data.map((item: any) => ({
            id: item.id,
            route: item.route || item.title || 'Trip Journey',
            distance: item.distance || 'Local/Outstation',
            vehicle: item.vehicle || 'Premium Vehicle',
            customer: item.customer || 'Customer',
            initials: item.initials || 'C',
            rating: item.rating || 5,
            quote: item.quote || '“Wonderful travel experience!”',
            thumbnail: item.thumbnail_url || '/images/video_thumb_placeholder.png',
            videoUrl: item.video_url || ''
          }))
        );
      }
      setIsLoading(false);
    }
    loadTestimonials();
  }, [featuredOnly]);

  const handleOpenVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section className={styles.videoTestimonialsSection} id="video-testimonials">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Real video stories from our travelers
          </h2>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', color: '#fff', padding: '40px' }}>Loading stories...</div>
        ) : tripTestimonials.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No stories available at the moment.</div>
        ) : (
          <div className={styles.grid}>
            {tripTestimonials.map((item) => (
              <div 
                key={item.id} 
                className={styles.card}
                onClick={() => handleOpenVideo(item.videoUrl)}
              >
                {/* Thumbnail with overlay & Play Button */}
                <div className={styles.thumbnailWrapper}>
                  <img 
                    src={item.thumbnail} 
                    alt={item.route} 
                    className={styles.thumbnail}
                    loading="lazy"
                  />
                  <div className={styles.playOverlay}>
                    <div className={styles.playBtnCircle}>
                      {/* SVG Play Icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.vehicleBadge}>
                    {item.vehicle}
                  </div>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  {/* Route Header */}
                  <h3 className={styles.routeText}>{item.route}</h3>
                  
                  {/* Meta details (Distance & Rating) */}
                  <div className={styles.metaLine}>
                    <span>{item.distance}</span>
                    <div className={styles.stars}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>

                  {/* Review Snippet */}
                  <p className={styles.reviewQuote}>{item.quote}</p>

                  {/* Separator line */}
                  <hr className={styles.divider} />

                  {/* Customer Profile Info */}
                  <div className={styles.profile}>
                    <div className={styles.profileAvatar}>
                      {item.initials}
                    </div>
                    <div className={styles.profileInfo}>
                      <h4 className={styles.customerName}>{item.customer}</h4>
                      <span className={styles.customerLabel}>Verified Rider</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {showAllButton && tripTestimonials.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px', position: 'relative', zIndex: 2 }}>
            <Link 
              href="/trip-journeys"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#BEEB42',
                color: '#0d140f',
                border: '1px solid #BEEB42',
                padding: '14px 32px',
                borderRadius: '40px',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.2px',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                boxShadow: '0 4px 16px rgba(190, 235, 66, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(190, 235, 66, 0.3)';
                const arrow = e.currentTarget.querySelector('span');
                if (arrow) {
                  arrow.style.background = 'rgba(13, 20, 15, 0.25)';
                  arrow.style.transform = 'translateX(3px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(190, 235, 66, 0.15)';
                const arrow = e.currentTarget.querySelector('span');
                if (arrow) {
                  arrow.style.background = 'rgba(13, 20, 15, 0.15)';
                  arrow.style.transform = 'translateX(0)';
                }
              }}
            >
              View All Trip Journeys
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: 'rgba(13, 20, 15, 0.15)',
                borderRadius: '50%',
                transition: 'all 0.3s ease'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Video Modal Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop Blur */}
            <div className={styles.modalBackdrop} onClick={handleCloseVideo} />

            {/* Modal Content Wrapper */}
            <motion.div 
              className={styles.modalWrapper}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {/* Close Button */}
              <button 
                className={styles.closeButton} 
                onClick={handleCloseVideo}
                aria-label="Close video player"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Video Player */}
              <video 
                src={activeVideo} 
                className={styles.videoElement} 
                controls 
                autoPlay 
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
