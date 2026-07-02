"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import styles from './VideoTestimonials.module.css';

const getYoutubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  
  // Handle YouTube Shorts (portrait format)
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    if (parts[1]) {
      const id = parts[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
  }
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return null;
};

const getYoutubeThumbnailUrl = (url: string): string | null => {
  if (!url) return null;
  
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    if (parts[1]) {
      const id = parts[1].split(/[?&]/)[0];
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }
  }
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
  }
  return null;
};

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
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialJourney | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
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
          data.map((item: any) => {
            const firstVideoUrl = item.video_url ? item.video_url.split(',')[0].trim() : '';
            const ytThumbnail = getYoutubeThumbnailUrl(firstVideoUrl);
            const isMp4 = firstVideoUrl.toLowerCase().endsWith('.mp4') || firstVideoUrl.toLowerCase().endsWith('.webm');
            
            const autoThumbnail = ytThumbnail || (isMp4 ? firstVideoUrl : '/images/video_thumb_placeholder.png');

            return {
              id: item.id,
              route: item.route || item.title || 'Trip Journey',
              distance: item.distance || 'Local/Outstation',
              vehicle: item.vehicle || 'Premium Vehicle',
              customer: item.customer || 'Customer',
              initials: item.initials || 'C',
              rating: item.rating || 5,
              quote: item.quote || '“Wonderful travel experience!”',
              thumbnail: autoThumbnail,
              videoUrl: item.video_url || ''
            };
          })
        );
      }
      setIsLoading(false);
    }
    loadTestimonials();
  }, [featuredOnly]);

  const handleOpenVideo = (item: TestimonialJourney) => {
    setSelectedTestimonial(item);
    setActiveVideoIndex(0);
  };

  const handleCloseVideo = () => {
    setSelectedTestimonial(null);
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
                onClick={() => handleOpenVideo(item)}
              >
                {/* Thumbnail with overlay & Play Button */}
                <div className={styles.thumbnailWrapper}>
                  {item.thumbnail.toLowerCase().endsWith('.mp4') || item.thumbnail.toLowerCase().endsWith('.webm') ? (
                    <video 
                      src={item.thumbnail}
                      className={styles.thumbnail}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <img 
                      src={item.thumbnail} 
                      alt={item.route} 
                      className={styles.thumbnail}
                      loading="lazy"
                    />
                  )}
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
        {selectedTestimonial && (
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

              {/* Left Column: Video Section */}
              <div className={styles.videoSection}>
                {(() => {
                  const urls = selectedTestimonial.videoUrl
                    ? selectedTestimonial.videoUrl.split(',').map((s) => s.trim()).filter(Boolean)
                    : [];
                  const activeUrl = urls[activeVideoIndex] || '';

                  return (
                    <>
                      <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}>
                        {getYoutubeEmbedUrl(activeUrl) ? (
                          <iframe
                            src={getYoutubeEmbedUrl(activeUrl)!}
                            className={styles.videoElement}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          />
                        ) : (
                          <video 
                            key={activeUrl}
                            src={activeUrl} 
                            className={styles.videoElement} 
                            controls 
                            autoPlay 
                            playsInline
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        )}
                      </div>

                      {/* Video Switching Tabs (Only shows if there are multiple videos!) */}
                      {urls.length > 1 && (
                        <div className={styles.videoTabs}>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginRight: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Playlist ({urls.length}):
                          </span>
                          {urls.map((_, uIdx) => (
                            <button
                              key={uIdx}
                              className={`${styles.videoTab} ${activeVideoIndex === uIdx ? styles.videoTabActive : ''}`}
                              onClick={() => setActiveVideoIndex(uIdx)}
                            >
                              Video {uIdx + 1}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Right Column: Text Details Section */}
              <div className={styles.detailsSection}>
                <h3 className={styles.modalRoute}>{selectedTestimonial.route}</h3>
                
                <div className={styles.modalMetaLine}>
                  <span>{selectedTestimonial.distance}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                  <span>{selectedTestimonial.vehicle}</span>
                </div>

                <div className={styles.modalStars} style={{ marginBottom: '16px' }}>
                  {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className={styles.modalQuote}>{selectedTestimonial.quote}</p>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '20px 0' }} />

                <div className={styles.modalProfile}>
                  <div className={styles.modalAvatar}>
                    {selectedTestimonial.initials}
                  </div>
                  <div className={styles.modalProfileInfo}>
                    <h4>{selectedTestimonial.customer}</h4>
                    <span>Verified Rider</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
