import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Four Column Top Grid */}
        <div className={styles.grid}>
          
          {/* Column 1: Brand & Logo */}
          <div className={styles.brandColumn}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoIconCircle}>
                {/* Custom circular car/path icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <path d="M9 17h6"></path>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </div>
              <div className={styles.logoText}>
                <h3>GREENLINE</h3>
                <span>CAR TRAVELS</span>
              </div>
            </div>
            
            <p className={styles.brandDesc}>
              Experience the pinnacle of comfort and luxury with our premium fleet. 
              Your trusted transportation partner across Andhra Pradesh and Telangana.
            </p>
            
            {/* Social Icons */}
            <div className={styles.socials}>
              {/* WhatsApp */}
              <a href="https://wa.me/918282825442" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.428 1.978 13.96 1.01 11.999 1.01c-5.441 0-9.866 4.372-9.87 9.802 0 1.714.471 3.393 1.357 4.869l-.994 3.63 3.771-.977zm11.238-6.994c-.29-.145-1.71-.845-1.975-.94-.266-.097-.461-.145-.656.145-.19.29-.74.94-.908 1.134-.167.19-.335.213-.625.068-.29-.145-1.228-.453-2.338-1.439-.864-.767-1.447-1.716-1.617-2.006-.17-.29-.018-.446.127-.59.13-.13.29-.335.435-.503.146-.168.195-.29.29-.481.097-.19.048-.36-.024-.503-.073-.146-.656-1.58-.9-2.17-.238-.574-.48-.495-.656-.504-.17-.008-.363-.01-.557-.01-.19 0-.5.072-.76.36-.26.29-1 .977-1 2.384 0 1.407 1.023 2.77 1.168 2.964.145.19 2.012 3.074 4.876 4.314.682.296 1.213.473 1.627.604.686.216 1.31.186 1.803.113.55-.082 1.71-.699 1.952-1.373.24-.674.24-1.253.17-1.373-.073-.12-.266-.19-.556-.335z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.869.507 9.388.507 9.388.507s7.519 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className={styles.linksColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerIconCircle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <h4>Quick Links</h4>
            </div>
            <div className={styles.headerLine}></div>
            
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Home</a></li>
              <li><a href="#about" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> About Us</a></li>
              <li><a href="#fleet" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Our Fleet</a></li>
              <li><a href="#testimonials" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Testimonials</a></li>
              <li><a href="#booking" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Book Now</a></li>
            </ul>
          </div>
          
          {/* Column 3: Our Services */}
          <div className={styles.servicesColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerIconCircle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <path d="M9 17h6"></path>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </div>
              <h4>Our Services</h4>
            </div>
            <div className={styles.headerLine}></div>
            
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Local City Rides</a></li>
              <li><a href="#" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Airport Transfers</a></li>
              <li><a href="#" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Outstation Trips</a></li>
              <li><a href="#" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Corporate Travel</a></li>
              <li><a href="#" className={styles.linkItem}><span className={styles.linkArrow}>&gt;</span> Wedding Car Rentals</a></li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div className={styles.contactColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerIconCircle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h4>Contact Info</h4>
            </div>
            <div className={styles.headerLine}></div>
            
            <ul className={styles.contactList}>
              <li>
                <a href="tel:+918282825442" className={styles.contactItem}>
                  <span className={styles.contactIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <span>+91 82828 25442</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@greenlinecartravels.in" className={styles.contactItem}>
                  <span className={styles.contactIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <span>contact@greenlinecartravels.in</span>
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/search/?api=1&query=23-28-1A,+Mutyalampadu,+SN+Puram,+Vijayawada+-+520011" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  <span className={styles.contactIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span>#23-28-1A, Mutyalampadu, SN Puram, Vijayawada - 520011</span>
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Copyright and Credits Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            © 2026 <a href="#">Greenline Car Travels</a>. All Rights Reserved.
          </div>
          <div className={styles.poweredText}>
            Powered by <a href="https://tensorik.in" target="_blank" rel="noopener noreferrer">Tensorik Technologies Pvt Ltd</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
