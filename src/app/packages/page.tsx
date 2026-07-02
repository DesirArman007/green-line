"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { categoryLabels, type TourPackage } from '@/data/packagesData';
import { createClient } from '@/utils/supabase/client';
import styles from './page.module.css';

const categories = Object.keys(categoryLabels);

const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Enquiry modal states
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<TourPackage | null>(null);
  const [enquirerName, setEnquirerName] = useState('');
  const [enquirerPhone, setEnquirerPhone] = useState('');
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function loadPackages() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: true })
        .order('id', { ascending: true });

      if (!error && data) {
        setTourPackages(
          data.map((d: any) => ({
            id: d.id,
            name: d.name,
            destination: d.destination,
            duration: d.duration,
            days: 1, // default placeholders
            nights: 0,
            price: d.price,
            priceValue: parseInt(d.price.replace(/[^0-9]/g, '')) || 0,
            vehicle: d.vehicle,
            image: d.image_url,
            highlights: d.highlights || [],
            category: d.category,
            featured: false, // fallback, since it's preview only
            description: d.description,
          }))
        );
      }
      setIsLoading(false);
    }
    loadPackages();
  }, []);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg || !enquirerName || !enquirerPhone) return;

    setIsSubmittingEnquiry(true);
    try {
      const { error } = await supabase.from('package_enquiries').insert([{
        name: enquirerName,
        phone: enquirerPhone,
        package_name: selectedPkg.name,
        destination: selectedPkg.destination,
        duration: selectedPkg.duration,
        vehicle: selectedPkg.vehicle,
        price: selectedPkg.price,
      }]);

      if (error) throw error;

      // Format WhatsApp message
      const message = `Hi, I'm interested in the "${selectedPkg.name}" package.\n\n` +
        `- Destination: ${selectedPkg.destination}\n` +
        `- Duration: ${selectedPkg.duration}\n` +
        `- Vehicle: ${selectedPkg.vehicle}\n` +
        `- Price: ${selectedPkg.price}\n\n` +
        `Please share more details and availability.`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/918282825442?text=${encoded}`, '_blank');

      // Reset and close
      setEnquirerName('');
      setEnquirerPhone('');
      setIsEnquiryModalOpen(false);
      setSelectedPkg(null);
    } catch (err: any) {
      alert(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  const filtered: TourPackage[] =
    activeCategory === 'all'
      ? tourPackages
      : tourPackages.filter((pkg) => pkg.category === activeCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <Navbar />
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroTextBlock}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbActive}>Tour Packages</span>
            </div>
            <h1 className={styles.heroTitle}>
              Explore Our <span className={styles.heroHighlight}>Tour Packages</span>
            </h1>
            <p className={styles.heroDesc}>
              Choose from our handpicked travel itineraries — crafted for comfort,
              curated for unforgettable memories. Every journey includes a professional
              chauffeur and a well-maintained vehicle.
            </p>
          </motion.div>
        </div>
        {/* Ambient gradient */}
        <div className={styles.heroGradient} />
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Filter Tabs */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {categoryLabels[cat]}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className={styles.filterUnderline}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className={styles.resultsCount}>
            Showing <strong>{filtered.length}</strong> package{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Packages Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className={styles.grid}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.08,
                    type: 'spring',
                    stiffness: 80,
                    damping: 16,
                  }}
                >
                  {/* Image */}
                  <div className={styles.imageWrapper}>
                    <img src={pkg.image} alt={pkg.name} className={styles.cardImage} />
                    <div className={styles.imageOverlay} />
                    <span className={styles.durationBadge}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {pkg.duration}
                    </span>
                    <span className={styles.categoryBadge}>
                      {pkg.category === 'pilgrimage'
                        ? '🙏 Pilgrimage'
                        : pkg.category === 'weekend'
                          ? '🌴 Weekend'
                          : '🗺️ Long Tour'}
                    </span>
                    {pkg.featured && <span className={styles.featuredRibbon}>★ Featured</span>}
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div className={styles.locationRow}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--primary-green)"
                          strokeWidth="2.5"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className={styles.destination}>{pkg.destination}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{pkg.name}</h3>
                      {isHtml(pkg.description || '') ? (
                        <div className={styles.cardDesc} dangerouslySetInnerHTML={{ __html: pkg.description }} />
                      ) : (
                        <p className={styles.cardDesc}>{pkg.description}</p>
                      )}
                    </div>

                    {/* Highlights */}
                    {(!pkg.description?.includes('<ul>') && !pkg.description?.includes('<li>') && !pkg.description?.includes('<ol>')) && pkg.highlights && pkg.highlights.length > 0 && (
                      <ul className={styles.highlights}>
                        {pkg.highlights.map((h, i) => (
                          <li key={i}>
                            <span className={styles.highlightDot} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.priceBlock}>
                        <span className={styles.priceLabel}>Starting from</span>
                        <span className={styles.price}>{pkg.price}</span>
                      </div>
                      <div className={styles.footerRight}>
                        <div className={styles.vehicleBadge}>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                          </svg>
                          {pkg.vehicle}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPkg(pkg);
                            setIsEnquiryModalOpen(true);
                          }}
                          className={styles.enquireBtn}
                        >
                          Enquire Now
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <div className={styles.bottomCtaInner}>
              <div className={styles.bottomCtaText}>
                <h3>Can&apos;t find the perfect package?</h3>
                <p>
                  We can customize any itinerary to fit your schedule, budget, and preferences.
                  Get in touch with our travel experts today.
                </p>
              </div>
              <Link href="/#contact" className={styles.bottomCtaBtn}>
                Contact Us
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Enquiry Modal */}
      {isEnquiryModalOpen && selectedPkg && (
        <div className={styles.modalOverlay} onClick={() => setIsEnquiryModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsEnquiryModalOpen(false)} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Enquire Now</h3>
              <p className={styles.modalSubtitle}>Please share your details to proceed with WhatsApp enquiry for <strong>{selectedPkg.name}</strong></p>
            </div>
            <form onSubmit={handleEnquirySubmit} className={styles.enquiryForm}>
              <div className={styles.inputGroup}>
                <label>Full Name*</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Your full name" 
                  value={enquirerName} 
                  onChange={e => setEnquirerName(e.target.value)} 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number*</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 9XXXXXXXXX" 
                  value={enquirerPhone} 
                  onChange={e => setEnquirerPhone(e.target.value)} 
                />
              </div>
              <button 
                type="submit" 
                className={styles.modalSubmitBtn}
                disabled={isSubmittingEnquiry}
              >
                {isSubmittingEnquiry ? 'Submitting...' : 'Proceed to WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
