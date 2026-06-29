import React, { useState, useEffect, useRef } from 'react';
import styles from './Tariff.module.css';

interface TableScrollSliderProps {
  elementRef: React.RefObject<HTMLDivElement | null>;
}

const TableScrollSlider = ({ elementRef }: TableScrollSliderProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setShowSlider(el.scrollWidth > el.clientWidth);
    };

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    el.addEventListener('scroll', handleScroll);

    const observer = new MutationObserver(checkOverflow);
    observer.observe(el, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkOverflow);
      el.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [elementRef]);

  if (!showSlider) return null;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = elementRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft = (parseFloat(e.target.value) / 100) * maxScroll;
  };

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min="0"
        max="100"
        value={scrollProgress}
        onChange={handleSliderChange}
        className={styles.customSlider}
        aria-label="Scroll table horizontally"
      />
    </div>
  );
};

const localPricingData = [
  { carType: "Sedan", exCarName: "Dzire", hr4: "₹1,200/-", hr8: "₹2,000/-", tollParking: "Extra" },
  { carType: "SUV Type 1", exCarName: "Ertiga", hr4: "₹1,800/-", hr8: "₹2,500/-", tollParking: "Extra" },
  { carType: "SUV Type 2", exCarName: "Innova", hr4: "₹2,000/-", hr8: "₹3,000/-", tollParking: "Extra" },
  { carType: "Premium SUV", exCarName: "Crysta", hr4: "₹3,000/-", hr8: "₹3,500/-", tollParking: "Extra" }
];

const outstationPricingData = [
  { car: "Dzire", minKm: "300 Km", perKm: "₹13/-", beta: "₹400/-", tollParking: "Extra" },
  { car: "Ertiga", minKm: "400 Km", perKm: "₹16/-", beta: "₹400/-", tollParking: "Extra" },
  { car: "Innova", minKm: "400 Km", perKm: "₹16/-", beta: "₹500/-", tollParking: "Extra" },
  { car: "Crysta", minKm: "400 Km", perKm: "₹19/-", beta: "₹500/-", tollParking: "Extra" },
  { car: "Tempo - 12", minKm: "400 Km", perKm: "₹27/-", beta: "₹800/-", tollParking: "Extra" },
  { car: "Tempo - 17", minKm: "400 Km", perKm: "₹38/-", beta: "₹1,000/-", tollParking: "Extra" }
];

const carRentalTypesLeft = [
  "corolla hire Vijayawada",
  "indica hire Vijayawada",
  "ikon hire Vijayawada",
  "honda city hire Vijayawada",
  "honda accord hire Vijayawada",
  "camry hire Vijayawada",
  "corolla hire Vijayawada",
  "innova hire Vijayawada",
  "honda crv hire Vijayawada"
];

const carRentalTypesRight = [
  "tempo traveller hire Vijayawada",
  "coach hire in Vijayawada",
  "Car hire Vijayawada",
  "fiesta hire Vijayawada",
  "fortuner hire Vijayawada",
  "indigo hire Vijayawada",
  "BMW 7 series hire Vijayawada",
  "BMW 5 series hire Vijayawada",
  "7 series hire Vijayawada",
  "5 series hire Vijayawada"
];

export default function Tariff() {
  const [typesExpanded, setTypesExpanded] = useState(true);
  const [typesShowAll, setTypesShowAll] = useState(false);

  const localTableRef = useRef<HTMLDivElement>(null);
  const outstationTableRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.tariffSection}>
      <div className={styles.container}>

        {/* Mobile Quick Call (hidden on desktop) */}
        <div className={styles.mobileQuickCall}>
          <a href="tel:+918282825442" className={styles.quickCallCard}>
            <div className={styles.phoneIconWrapper}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className={styles.quickCallText}>
              <span className={styles.quickCallLabel}>Quick Call</span>
              <span className={styles.quickCallPhone}>+91 94940 52005</span>
            </div>
          </a>
        </div>

        {/* Main Columns Grid */}
        <div className={styles.mainGrid}>

          {/* Left Column: Pricing Tables */}
          <div className={styles.tablesContainer}>

            {/* Table 1: Local Prices */}
            <div className={styles.tableBlock}>
              <div className={styles.tableHeaderSection}>
                <div className={styles.tableHeaderTitle}>
                  <span className={styles.tableHeaderIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <h3>Local Prices</h3>
                </div>
              </div>
              <div className={styles.tableWrapper}>
                <div ref={localTableRef} className={styles.responsiveTable}>
                  <table className={styles.pricingTable}>
                    <thead>
                      <tr>
                        <th>
                          <div className={styles.thContent}>
                            Car Type
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            Ex Car Name
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            <svg className={styles.headerIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 10" />
                            </svg>
                            4H 40KM
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            <svg className={styles.headerIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 10" />
                            </svg>
                            8H 80KM
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            Tolls, Parkings & Permit
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {localPricingData.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 1 ? styles.altRow : ''}>
                          <td className={styles.carNameCell}>
                            <div className={styles.carCellContent}>
                              <span className={styles.carName}>{row.carType}</span>
                            </div>
                          </td>
                          <td className={styles.priceCell} style={{ textAlign: 'left' }}>{row.exCarName}</td>
                          <td className={styles.priceCell}>{row.hr4}</td>
                          <td className={styles.priceCell}>{row.hr8}</td>
                          <td className={styles.battaCell}>
                            <span className={styles.extraBadge}>{row.tollParking}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <TableScrollSlider elementRef={localTableRef} />
            </div>

            {/* Table 2: Outstation Prices */}
            <div className={styles.tableBlock}>
              <div className={styles.tableHeaderSection}>
                <div className={styles.tableHeaderTitle}>
                  <span className={styles.tableHeaderIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                      <line x1="9" y1="3" x2="9" y2="18" />
                      <line x1="15" y1="6" x2="15" y2="21" />
                    </svg>
                  </span>
                  <h3>Outstation Prices</h3>
                </div>
              </div>
              <div className={styles.tableWrapper}>
                <div ref={outstationTableRef} className={styles.responsiveTable}>
                  <table className={styles.pricingTable}>
                    <thead>
                      <tr>
                        <th>
                          <div className={styles.thContent}>
                            Car Name
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            Min KM
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            Per KM
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            Beta (Driver)
                          </div>
                        </th>
                        <th>
                          <div className={styles.thContent}>
                            Tolls, Parkings & Permit
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {outstationPricingData.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 1 ? styles.altRow : ''}>
                          <td className={styles.carNameCell}>
                            <div className={styles.carCellContent}>
                              <span className={styles.carName}>{row.car}</span>
                            </div>
                          </td>
                          <td className={styles.priceCell}>{row.minKm}</td>
                          <td className={styles.priceCell}>{row.perKm}</td>
                          <td className={styles.priceCell}>{row.beta}</td>
                          <td className={styles.battaCell}>
                            <span className={styles.extraBadge}>{row.tollParking}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <TableScrollSlider elementRef={outstationTableRef} />
            </div>

            {/* Detailed Terms Box (Moved below tables) */}
            <div className={styles.termsBox}>
              <div className={styles.termsIconBg}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <ul className={styles.termsList}>
                <li>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>All the Vehicles Mentioned above are airconditioned only</span>
                </li>
                <li>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Time And Meter Reading will be calculated as from Garage to Garage</span>
                </li>
                <li>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Tolls, Parking charges and Inter state taxes(If Applicable) will be charged as per Actuals</span>
                </li>
                <li>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Batta may not includes the driver food Alowances</span>
                </li>
                <li>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Prices may change without prior Notice</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Quick Call + Types of Car Rentals */}
          <div className={styles.typesWrapper}>
            <div className={styles.desktopQuickCall}>
              <a href="tel:+918282825442" className={styles.quickCallCard}>
                <div className={styles.phoneIconWrapper}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.quickCallText}>
                  <span className={styles.quickCallLabel}>Quick Call</span>
                  <span className={styles.quickCallPhone}>+91 94940 52005</span>
                </div>
              </a>
            </div>

            <div className={styles.typesCard}>
              <div 
                className={styles.typesHeader}
                onClick={() => setTypesExpanded(!typesExpanded)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.typesHeaderLeft}>
                  <div className={styles.typesIconBadge}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="2" />
                      <path d="M9 17h6" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                  </div>
                  <h3>Types of Car Rentals</h3>
                </div>
                <div className={styles.accordionIcon}>
                  <svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: typesExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {typesExpanded && (
                <>
                  <div className={styles.typesListGrid}>
                    <ul className={styles.typesList}>
                      {carRentalTypesLeft.slice(0, typesShowAll ? undefined : 5).map((item, idx) => (
                        <li key={idx}>
                          <span className={styles.chevron}>&gt;</span>
                          <a href="#booking" className={styles.typeLink}>{item}</a>
                        </li>
                      ))}
                    </ul>
                    <ul className={styles.typesList}>
                      {carRentalTypesRight.slice(0, typesShowAll ? undefined : 5).map((item, idx) => (
                        <li key={idx}>
                          <span className={styles.chevron}>&gt;</span>
                          <a href="#booking" className={styles.typeLink}>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!typesShowAll && (
                    <div className={styles.viewMoreRow} onClick={() => setTypesShowAll(true)}>
                      <span>View more</span>
                      <div className={styles.viewMoreIconWrapper}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
