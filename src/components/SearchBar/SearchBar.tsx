"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';

const carOptions = [
  { value: 'Sedan', label: 'Sedan (Dzire, Etios)' },
  { value: 'SUV', label: 'SUV (Ertiga, Carens)' },
  { value: 'Premium SUV', label: 'Premium SUV (Innova)' },
  { value: 'Tempo Traveller', label: 'Tempo Traveller' }
];

const generateTimeSlots = () => {
  const slots = [];
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const periods = ['AM', 'PM'];
  
  for (const period of periods) {
    for (const hour of hours) {
      const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
      slots.push(`${hourStr}:00 ${period}`);
      slots.push(`${hourStr}:30 ${period}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const formatDateString = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ...
  
  const days = [];
  // Add empty slots for days of previous month padding
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

const getDisplayDate = (dateStr: string) => {
  if (!dateStr) return "Select Date";
  const parts = dateStr.split('-');
  const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function SearchBar() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carType: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const carDropdownRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (carDropdownRef.current && !carDropdownRef.current.contains(event.target as Node)) {
        setIsCarDropdownOpen(false);
      }
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setIsTimeDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCar = (value: string) => {
    setFormData((prev) => ({ ...prev, carType: value }));
    setIsCarDropdownOpen(false);
  };

  const handleSelectTime = (value: string) => {
    setFormData((prev) => ({ ...prev, time: value }));
    setIsTimeDropdownOpen(false);
  };

  const handleSelectDate = (value: string) => {
    setFormData((prev) => ({ ...prev, date: value }));
    setIsDateDropdownOpen(false);
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.pickupLocation || !formData.dropLocation || !formData.date || !formData.time || !formData.carType) {
      alert('Please fill in all required fields.');
      return;
    }

    const message = `Hello GreenLine, I'd like to book a cab.\n\n` +
      `- Name: ${formData.name}\n` +
      `- Phone: ${formData.phone}\n` +
      `- Car Type: ${formData.carType}\n` +
      `- Pickup: ${formData.pickupLocation}\n` +
      `- Drop: ${formData.dropLocation}\n` +
      `- Date: ${getDisplayDate(formData.date)}\n` +
      `- Time: ${formData.time}\n\n` +
      `Please confirm availability and pricing.`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918282825442?text=${encoded}`, '_blank');
    
    setSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      carType: '',
      pickupLocation: '',
      dropLocation: '',
      date: '',
      time: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const calendarDays = getDaysInMonth(currentMonth);

  return (
    <div 
      className={`${styles.searchBarContainer} ${isOpen ? styles.containerOpen : styles.containerClosed}`}
      onClick={() => {
        if (!isOpen) setIsOpen(true);
      }}
    >
      {submitted ? (
        <div className={styles.successWrapper}>
          <div className={styles.successIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className={styles.successText}>
            <h3>Booking Enquiry Received!</h3>
            <p>We are checking vehicle availability and will call you back with a quote within 5 minutes.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
          
          <div 
            className={styles.titleSection} 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <h3>Need to Rent a <br className={styles.desktopBr} />Premium Cab?</h3>
            <svg 
              className={`${styles.toggleArrow} ${isOpen ? styles.arrowOpen : ''}`} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          <div className={`${styles.formFieldsGrid} ${isOpen ? styles.fieldsOpen : styles.fieldsClosed}`}>
            {/* Card: Full Name */}
            <div className={`${styles.formCard} ${styles.nameCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <label className={styles.cardLabel}>Name</label>
              </div>
              <div className={styles.cardBody}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={styles.cardInput}
                  required
                />
              </div>
            </div>

            {/* Card: Mobile Number */}
            <div className={`${styles.formCard} ${styles.phoneCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <label className={styles.cardLabel}>Phone</label>
              </div>
              <div className={styles.cardBody}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone No"
                  className={styles.cardInput}
                  required
                />
              </div>
            </div>

            {/* Card: Car Type */}
            <div className={`${styles.formCard} ${styles.carCard}`} ref={carDropdownRef}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <label className={styles.cardLabel}>Car</label>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.customDropdown}>
                  <div 
                    className={styles.dropdownTrigger} 
                    onClick={() => setIsCarDropdownOpen(!isCarDropdownOpen)}
                  >
                    <span className={formData.carType ? styles.selectedText : styles.placeholderText}>
                      {formData.carType 
                        ? carOptions.find(o => o.value === formData.carType)?.label 
                        : "Choose Car"}
                    </span>
                    <svg 
                      className={`${styles.dropdownArrow} ${isCarDropdownOpen ? styles.arrowOpen : ''}`} 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  
                  {isCarDropdownOpen && (
                    <ul className={styles.dropdownList}>
                      {carOptions.map((option) => (
                        <li 
                          key={option.value} 
                          className={`${styles.dropdownOption} ${formData.carType === option.value ? styles.optionSelected : ''}`}
                          onClick={() => handleSelectCar(option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Card: Pickup Location */}
            <div className={`${styles.formCard} ${styles.pickupCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.cardIconCircle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <label className={styles.cardLabel}>Pickup</label>
                </div>
                <div className={styles.journeyGraphicPickup}>
                  <span className={styles.greenDot} />
                  <span className={styles.dottedLine} />
                </div>
              </div>
              <div className={styles.cardBody}>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="Pickup Location"
                  className={styles.cardInput}
                  required
                />
              </div>
            </div>

            {/* Card: Drop Location */}
            <div className={`${styles.formCard} ${styles.dropCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.cardIconCircle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <label className={styles.cardLabel}>Drop</label>
                </div>
                <div className={styles.journeyGraphicDrop}>
                  <span className={styles.greenDot} />
                  <span className={styles.dottedLine} />
                  <span className={styles.hollowCircle} />
                </div>
              </div>
              <div className={styles.cardBody}>
                <input
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  placeholder="Drop Location"
                  className={styles.cardInput}
                  required
                />
              </div>
            </div>

            {/* Card: Pickup Date */}
            <div className={`${styles.formCard} ${styles.dateCard}`} ref={dateDropdownRef}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <label className={styles.cardLabel}>Date</label>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.customDropdown}>
                  <div 
                    className={styles.dropdownTrigger} 
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                  >
                    <span className={formData.date ? styles.selectedText : styles.placeholderText}>
                      {formData.date ? getDisplayDate(formData.date) : "Select date"}
                    </span>
                    <svg 
                      className={styles.dropdownArrowIcon} 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  
                  {isDateDropdownOpen && (
                    <div className={styles.calendarDropdownList}>
                      <div className={styles.calendarHeader}>
                        <button 
                          type="button" 
                          className={styles.calendarNavBtn}
                          onClick={() => changeMonth(-1)}
                        >
                          &larr;
                        </button>
                        <span className={styles.calendarMonthYear}>
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button 
                          type="button" 
                          className={styles.calendarNavBtn}
                          onClick={() => changeMonth(1)}
                        >
                          &rarr;
                        </button>
                      </div>
                      
                      <div className={styles.calendarGrid}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                          <div key={idx} className={styles.calendarHeaderDay}>{day}</div>
                        ))}
                        {calendarDays.map((day, idx) => {
                          if (!day) return <div key={idx} className={styles.calendarEmptyCell} />;
                          
                          const dateStr = formatDateString(day);
                          const selected = formData.date === dateStr;
                          const disabled = isPastDate(day);
                          
                          return (
                            <button
                              key={idx}
                              type="button"
                              className={`${styles.calendarDayCell} ${selected ? styles.daySelected : ''} ${disabled ? styles.dayDisabled : ''}`}
                              disabled={disabled}
                              onClick={() => handleSelectDate(dateStr)}
                            >
                              {day.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card: Pickup Time */}
            <div className={`${styles.formCard} ${styles.timeCard}`} ref={timeDropdownRef}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <label className={styles.cardLabel}>Time</label>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.customDropdown}>
                  <div 
                    className={styles.dropdownTrigger} 
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  >
                    <span className={formData.time ? styles.selectedText : styles.placeholderText}>
                      {formData.time ? formData.time : "Select time"}
                    </span>
                    <svg 
                      className={styles.dropdownArrowIcon} 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  
                  {isTimeDropdownOpen && (
                    <ul className={`${styles.dropdownList} ${styles.scrollableList}`}>
                      {timeSlots.map((slot) => (
                        <li 
                          key={slot} 
                          className={`${styles.dropdownOption} ${formData.time === slot ? styles.optionSelected : ''}`}
                          onClick={() => handleSelectTime(slot)}
                        >
                          {slot}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className={styles.sendBtn} disabled={submitting}>
              {submitting ? 'Booking...' : 'Get Taxi'}
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
