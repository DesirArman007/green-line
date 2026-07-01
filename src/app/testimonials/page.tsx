import React from 'react';
import { createClient } from '@/utils/supabase/server';
import styles from '@/components/Testimonials/Testimonials.module.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'All Testimonials - Green Line',
  description: 'See what our customers have to say about Green Line.',
};

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (!testimonials || testimonials.length === 0) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#F6FBF4' }}>
        <Navbar forceSolid={true} />
        <div style={{ height: '110px' }}></div>
        <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>No testimonials found.</h2>
        </div>
        <Footer />
      </main>
    );
  }

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
    <main style={{ minHeight: '100vh', backgroundColor: '#F6FBF4' }}>
      <Navbar forceSolid={true} />
      
      {/* Spacer to push content below the fixed navbar */}
      <div style={{ height: '110px' }}></div>
      
      <section className={styles.testimonialsSection} style={{ margin: 0, borderRadius: 0, paddingBottom: '100px' }}>
        <div className={styles.container}>
          
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span>Testimonials</span>
            </div>
            <h2 className={styles.heading}>
              All <span className={styles.highlight}>Customer Reviews</span>
            </h2>
          </div>

          <div style={{ height: '40px' }} /> {/* Spacer */}

          {/* Grid Layout (We'll use a standard grid for the full page rather than the desktopGrid which might hide on mobile) */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '24px',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
            {testimonials.map((item: any, idx: number) => (
              <div key={idx} className={styles.card} style={{ height: '500px' }}>
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className={styles.cardImage} 
                />
                <div className={styles.overlay} />

                <div className={styles.cardContent}>
                  {renderStars(item.rating || 5)}
                  
                  <p className={styles.quote}>{item.text}</p>

                  <div>
                    <h3 className={styles.name}>{item.name}</h3>
                    <span className={styles.company}>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
