"use client";

import React, { useState } from 'react';
import styles from './Booking.module.css';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        message: ''
      });
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className={styles.bookingSection} id="booking">
      <div className={styles.container}>

        {/* Dual Column Layout */}
        <div className={styles.contentGrid}>
          
          {/* Left Column: Form Card */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>
                Book Your <span className={styles.formTitleGreen}>Ride</span>
              </h3>
              <p className={styles.formSubtitle}>We will respond with a quote instantly</p>
              
              <div className={styles.formDivider}>
                <span className={styles.dividerPill}></span>
                <span className={styles.dividerDot}></span>
                <span className={styles.dividerPill}></span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formFields}>
              {/* Full Name */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Full Name<span className={styles.labelRequired}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your full name" 
                    required 
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Phone Number<span className={styles.labelRequired}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+91 9XXXXXXXXX" 
                    required 
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Email (Optional)</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              {/* Service Type Dropdown */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Service Type</label>
                <div className={`${styles.inputWrapper} ${styles.selectWrapper}`}>
                  <span className={styles.inputIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                  </span>
                  <select 
                    name="serviceType" 
                    value={formData.serviceType} 
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    <option value="sedan">Sedan (Dzire, Etios, Amaze)</option>
                    <option value="premium-sedan">Premium Sedan (Ciaz, Verna)</option>
                    <option value="suv">SUV (Ertiga, Kia Carens)</option>
                    <option value="premium-suv">Premium SUV (Innova Crysta, Hycross)</option>
                    <option value="tempo">Tempo Traveller (Urbania, Force)</option>
                    <option value="bus">Mini Bus & Bus</option>
                  </select>
                </div>
              </div>

              {/* Message / Itinerary Details */}
              <div className={`${styles.fieldGroup} ${styles.fullWidthField}`}>
                <label className={styles.fieldLabel}>Message / Itinerary Details</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon} style={{ top: '14px', alignItems: 'flex-start', paddingTop: '14px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </span>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={(e) => {
                      handleChange(e);
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }} 
                    placeholder="Tell us about your travel plans, destinations, dates..."
                  />
                </div>
              </div>

              {/* Success Message Alert */}
              {submitted && (
                <div className={styles.successMessage}>
                  ✓ Enquiry sent successfully! We will contact you shortly.
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={submitting}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                {submitting ? 'Sending Enquiry...' : "Send Enquiry — It's Free"}
              </button>
            </form>
          </div>

          {/* Right Column: Info, Map & Badges */}
          <div className={styles.rightColumn}>
            
            {/* Map Card */}
            <div className={styles.mapCard}>
              <iframe 
                src="https://maps.google.com/maps?q=17.256832,78.450276&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className={styles.mapIframe}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
              
              {/* Location Detail Overlay */}
              <div className={styles.mapAddressCard}>
                <span className={styles.mapMarkerIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className={styles.mapAddressInfo}>
                  <h4>Greenline Travels</h4>
                  <p>Shamshabad, Hyderabad 501218</p>
                </div>
              </div>

              {/* Open Maps Button Overlay */}
              <a 
                href="https://maps.app.goo.gl/nsXXjwKXTdx1Hbq57"
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.openMapsBtn}
              >
                <span>Open Maps</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>

              {/* Zoom Controls Overlay */}
              <div className={styles.zoomControls}>
                <button className={styles.zoomBtn} type="button">+</button>
                <button className={styles.zoomBtn} type="button">-</button>
              </div>
            </div>

            {/* Dark Green Stats Card */}
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <div className={styles.statIconWrapper}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h4 className={styles.statNumber}>5K+</h4>
                <span className={styles.statLabel}>Happy Riders</span>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIconWrapper}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                  </svg>
                </div>
                <h4 className={styles.statNumber}>50+</h4>
                <span className={styles.statLabel}>Fleet Vehicles</span>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIconWrapper}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <h4 className={styles.statNumber}>24/7</h4>
                <span className={styles.statLabel}>Support</span>
              </div>
            </div>

            {/* White Trust Badges Card */}
            <div className={styles.trustCard}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </span>
                <span className={styles.trustText}>Safe &<br />Reliable</span>
              </div>
              
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
                <span className={styles.trustText}>On-time<br />Service</span>
              </div>

              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="5" x2="18" y2="5"></line>
                    <line x1="6" y1="9" x2="16" y2="9"></line>
                    <path d="M6 5c6 0 6 8 0 8h10l-10 7"></path>
                  </svg>
                </span>
                <span className={styles.trustText}>Best<br />Prices</span>
              </div>

              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </span>
                <span className={styles.trustText}>Trusted by<br />Thousands</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
