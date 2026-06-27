"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts, categoryLabels } from '@/data/blogData';
import styles from './BlogPreview.module.css';

export default function BlogPreview() {
  // Show all 3 posts as featured preview
  const featuredBlogs = blogPosts.slice(0, 3);

  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.subtitleWrapper}>
            <span className={styles.line} />
            <h4 className={styles.subtitle}>LATEST ARTICLES</h4>
            <span className={styles.line} />
          </div>
          <h2 className={styles.title}>
            Travel Insights, Guides &{' '}
            <span className={styles.highlight}>Road Tips.</span>
          </h2>
          <p className={styles.headerDesc}>
            Stay updated with travel itineraries, road safety rules, destination tips,
            and rental guides curated by our local travel experts.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          className={styles.grid}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featuredBlogs.map((post) => (
            <motion.div
              key={post.id}
              className={styles.card}
              variants={{
                hidden: { y: 40, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 80, damping: 16 },
                },
              }}
            >
              {/* Image Wrapper */}
              <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} className={styles.cardImage} />
                <div className={styles.imageOverlay} />
                
                {/* Category Badge */}
                <span className={styles.categoryBadge}>
                  {categoryLabels[post.category]}
                </span>
              </div>

              {/* Card Body */}
              <div className={styles.cardContent}>
                {/* Meta details */}
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

                {/* Title and Excerpt */}
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                {/* Read More Link */}
                <div className={styles.readMoreWrapper}>
                  <Link href={`/blog#${post.id}`} className={styles.readMoreLink}>
                    Read Article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.arrowIcon}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/blog" className={styles.ctaButton}>
            View All Blogs
            <span className={styles.ctaArrow}>
              <svg
                width="18"
                height="18"
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
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
