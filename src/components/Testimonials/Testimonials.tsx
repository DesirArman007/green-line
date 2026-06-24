import React from 'react';
import styles from './Testimonials.module.css';

const testimonialList = [
  {
    name: 'Bessie Cooper',
    image: '/images/testimonial_bessie.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”'
  },
  {
    name: 'Devon Lane',
    image: '/images/testimonial_devon.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”'
  },
  {
    name: 'Leslie Alexander',
    image: '/images/testimonial_leslie.png',
    quote: '“ Professional service and pricing The car condition was excellent customer support was very responsive. ”'
  }
];

export default function Testimonials() {
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

        {/* Cards Grid */}
        <div className={styles.grid}>
          {testimonialList.map((item, idx) => (
            <div key={idx} className={styles.card}>
              {/* Image Background */}
              <img 
                src={item.image} 
                alt={item.name} 
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
                <p className={styles.quote}>{item.quote}</p>
                
                {/* Customer name */}
                <h3 className={styles.name}>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
