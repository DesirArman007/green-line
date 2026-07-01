import React from 'react';
import styles from './Fleet.module.css';
import { createClient } from '@/utils/supabase/server';
import FleetGrid from './FleetGrid';

export default async function Fleet() {
  const supabase = await createClient();
  const { data: fleetList } = await supabase
    .from('vehicle_categories')
    .select('*')
    .order('created_at', { ascending: true });

  const activeFleet = fleetList || [];

  return (
    <section className={styles.fleetSection} id="fleet">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <div className={styles.subtitleWrapper}>
            <span className={styles.line}></span>
            <h4 className={styles.subtitle}>OUR DIVERSE FLEET</h4>
            <span className={styles.line}></span>
          </div>
          <h2 className={styles.title}>
            Diverse Fleet for Comfort & <span className={styles.highlight}>Performance.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <FleetGrid activeFleet={activeFleet} />

      </div>
    </section>
  );
}
