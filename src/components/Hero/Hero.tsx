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
          <a
            href="https://wa.me/918282825442?text=Hi%2C%20I%20want%20to%20book%20a%20car.%20Can%20you%20help%20me%20with%20the%20details%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>&rarr;</span> Reserve Your Car
          </a>
        </div>
      </div>
    </div>
  );
}
