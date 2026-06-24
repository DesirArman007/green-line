import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Rent the Perfect Car <br/>
          for Every <span className={styles.highlight}>Adventure</span>
        </h1>
        <p className={styles.description}>
          Find the ideal car for every journey with our wide range of well-maintained and reliable vehicles. Whether for business trips, family vacations, or daily travel, we offer flexible rental options and affordable pricing.
        </p>
        <div className={styles.actions}>
          <button className="btn-primary">
            <span>&rarr;</span> Reserve Your Car
          </button>
          <button className="btn-outline">
            <span className={styles.playIcon}>&#9658;</span> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
}
