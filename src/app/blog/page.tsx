"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { categoryLabels, type BlogPost } from '@/data/blogData';
import { createClient } from '@/utils/supabase/client';
import styles from './page.module.css';

const categories = Object.keys(categoryLabels);

const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadBlogs() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBlogPosts(
          data.map((d: any) => ({
            id: d.id,
            title: d.title,
            excerpt: d.excerpt,
            content: d.content,
            date: d.date,
            category: d.category,
            image: d.image_url,
            readTime: d.read_time || '5 min read',
            author: d.author,
          }))
        );
      }
      setIsLoading(false);
    }
    loadBlogs();
  }, []);

  // Handle hash navigation to open a blog post directly
  useEffect(() => {
    if (blogPosts.length > 0 && typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const post = blogPosts.find((p) => p.id === hash);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [blogPosts]);

  const filteredPosts =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // Close modal and clear URL hash
  const closeModal = () => {
    setSelectedPost(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${post.id}`);
    }
  };

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
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbActive}>Blog</span>
            </div>
            <h1 className={styles.heroTitle}>
              Travel Insights & <span className={styles.heroHighlight}>Road Guides</span>
            </h1>
            <p className={styles.heroDesc}>
              Read local travel guidelines, expert driving safety tips, and itineraries
              curated by GreenLine Car Travels to make your next journey smooth and stress-free.
            </p>
          </motion.div>
        </div>
        <div className={styles.heroGradient} />
      </section>

      {/* Main Listing Section */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Category Filter Tabs */}
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
                    layoutId="activeBlogFilterUnderline"
                    className={styles.filterUnderline}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className={styles.resultsCount}>
            Showing <strong>{filteredPosts.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''}
          </p>

          {/* Articles Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className={styles.grid}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.08,
                    type: 'spring',
                    stiffness: 80,
                    damping: 16,
                  }}
                  onClick={() => openModal(post)}
                >
                  {/* Card Image */}
                  <div className={styles.imageWrapper}>
                    <img src={post.image} alt={post.title} className={styles.cardImage} />
                    <div className={styles.imageOverlay} />
                    <span className={styles.categoryBadge}>
                      {categoryLabels[post.category]}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.metaRow}>
                      <span className={styles.metaItem}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {post.date}
                      </span>
                      <span className={styles.metaItem}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    <div className={styles.cardFooter}>
                      <span className={styles.author}>By {post.author}</span>
                      <span className={styles.readMoreLink}>
                        Read Full Article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Full Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <motion.div
              className={styles.modalContainer}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} // Prevent overlay click closing
            >
              {/* Close Button */}
              <button className={styles.modalCloseBtn} onClick={closeModal} aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Modal Cover Image */}
              <div className={styles.modalImageWrapper}>
                <img src={selectedPost.image} alt={selectedPost.title} className={styles.modalImage} />
                <div className={styles.modalImageOverlay} />
                <div className={styles.modalMetaHeader}>
                  <span className={styles.modalCategoryBadge}>
                    {categoryLabels[selectedPost.category]}
                  </span>
                  <h1 className={styles.modalTitle}>{selectedPost.title}</h1>
                  <div className={styles.modalMetaRow}>
                    <span>By {selectedPost.author}</span>
                    <span className={styles.modalMetaDot} />
                    <span>{selectedPost.date}</span>
                    <span className={styles.modalMetaDot} />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className={styles.modalBody}>
                {isHtml(selectedPost.content || '') ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                ) : (
                  selectedPost.content.split('\n\n').map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Handle subheadings starting with ###
                    if (trimmed.startsWith('###')) {
                      return (
                        <h3 key={index} className={styles.modalSubheading}>
                          {trimmed.replace('###', '').trim()}
                        </h3>
                      );
                    }

                    // Handle bullet lists starting with -
                    if (trimmed.startsWith('-')) {
                      return (
                        <ul key={index} className={styles.modalBulletList}>
                          {trimmed.split('\n').map((item, itemIdx) => {
                            const listItem = item.replace('-', '').trim();
                            return listItem ? <li key={itemIdx}>{listItem}</li> : null;
                          })}
                        </ul>
                      );
                    }

                    // Standard paragraphs
                    return (
                      <p key={index} className={styles.modalParagraph}>
                        {trimmed}
                      </p>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
