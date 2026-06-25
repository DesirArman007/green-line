import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      
      <div className={styles.titleSection}>
        <h3>Need to Rent a <br className={styles.desktopBr} />Luxury Car?</h3>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.inputGroup}>
        <label>Full Name</label>
        <input type="text" placeholder="Enter Full Name" className={styles.input} />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.inputGroup}>
        <label>Mobile Number</label>
        <input type="text" placeholder="Enter Phone no." className={styles.input} />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.inputGroup}>
        <label>Pickup Location</label>
        <input type="text" placeholder="Enter Location" className={styles.input} />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.inputGroup}>
        <label>Pickup Date</label>
        <div className={styles.dateInputWrapper}>
          <input type="text" placeholder="dd-mm-yyyy" className={styles.input} />
          <svg className={styles.calendarIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
      </div>

      <button className={styles.sendBtn}>
        Send
      </button>

    </div>
  );
}
