"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const tripTestimonials: TestimonialJourney[] = [
  {
    id: 'tirupati-pilgrimage',
    route: 'Hyderabad ➔ Tirupati Pilgrimage',
    distance: '580 km Outstation',
    vehicle: 'Toyota Innova Crysta',
    customer: 'Suresh Kumar',
    initials: 'SK',
    rating: 5,
    quote: '“We booked the Innova Crysta for our family trip to Tirupati. The driver was highly professional, knew the hill roads very well, and drove with extreme caution. The ride was incredibly comfortable and smooth. Highly recommended!”',
    thumbnail: '/images/video_thumb_tirupati.png',
    videoUrl: '/images/hero-video.mp4'
  },
  {
    id: 'airport-transfer',
    route: 'Hyderabad City ➔ RGI Airport',
    distance: '35 km Local',
    vehicle: 'Toyota Camry Sedan',
    customer: 'Priya Sharma',
    initials: 'PS',
    rating: 5,
    quote: '“I use Greenline for all my business airport trips. The Camry is always spotlessly clean, the driver is always 10 minutes early, and the ride is extremely peaceful. Truly premium service!”',
    thumbnail: '/images/video_thumb_airport.png',
    videoUrl: '/images/hero-video.mp4'
  },
  {
    id: 'araku-getaway',
    route: 'Vizag ➔ Araku Valley Winding Trails',
    distance: '230 km Hills Outstation',
    vehicle: 'Executive Tempo Traveller',
    customer: 'Rajesh & Family',
    initials: 'RF',
    rating: 5,
    quote: '“Perfect family outing to Araku Valley! The Tempo Traveller was very spacious, clean, and had great suspension. The driver acted as a friendly local guide too. Wonderful travel experience!”',
    thumbnail: '/images/video_thumb_scenic.png',
    videoUrl: '/images/hero-video.mp4'
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span>Trip Journeys</span>
          </div>
          <h2 className={styles.heading}>
            Real video stories from our travelers
          </h2>
        </div>

        {/* Testimonials Grid */}
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
