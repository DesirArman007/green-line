import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

// Simple status mapping helper
function getStatusClass(status: string) {
  const s = (status || '').toLowerCase();
  if (s === 'new') return styles.statusTagNew;
  if (s === 'contacted') return styles.statusTagContacted;
  if (s === 'confirmed') return styles.statusTagConfirmed;
  if (s === 'completed') return styles.statusTagCompleted;
  if (s === 'cancelled') return styles.statusTagCancelled;
  if (s === 'resolved') return styles.statusTagResolved;
  return styles.statusTagNew;
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts & recent entries in parallel
  const [
    { count: packagesCount },
    { count: bookingsCount },
    { count: fleetCount },
    { count: contactEnquiriesCount },
    { count: packageEnquiriesCount },
    { data: recentBookings },
    { data: recentPackageEnquiries },
    { data: recentContactEnquiries }
  ] = await Promise.all([
    supabase.from('packages').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('vehicle_categories').select('*', { count: 'exact', head: true }),
    supabase.from('contact_enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('package_enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('package_enquiries').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false }).limit(3)
  ]);

  const totalEnquiries = (contactEnquiriesCount || 0) + (packageEnquiriesCount || 0);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Green Line CMS Control Center</p>
      </header>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <h3>Total Packages</h3>
            <p className={styles.statValue}>{packagesCount || 0}</p>
          </div>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <h3>New Bookings</h3>
            <p className={styles.statValue}>{bookingsCount || 0}</p>
          </div>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <h3>Active Fleet</h3>
            <p className={styles.statValue}>{fleetCount || 0}</p>
          </div>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <h3>Total Enquiries</h3>
            <p className={styles.statValue}>{totalEnquiries}</p>
          </div>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Grid: Left column for feeds, right for quick actions */}
      <div className={styles.dashboardGrid}>
        
        {/* Left main content */}
        <div className={styles.mainColumn}>
          
          {/* Recent Bookings Card */}
          <div className={styles.sectionCard}>
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Recent Cab Bookings
            </h2>
            <div className={styles.feedList}>
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((b) => (
                  <div key={b.id} className={styles.feedItem}>
                    <div className={styles.feedMeta}>
                      <span className={styles.feedName}>{b.name}</span>
                      <span className={styles.feedDetail}>
                        Car: <strong>{b.car}</strong> | {b.pickup} &rarr; {b.drop_location}
                      </span>
                      <span className={styles.feedSubText}>Date: {b.date} | Phone: {b.phone}</span>
                    </div>
                    <div className={styles.feedStatus}>
                      <span className={`${styles.statusTag} ${getStatusClass(b.status)}`}>
                        {b.status || 'new'}
                      </span>
                      <span className={styles.feedDate}>
                        {new Date(b.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyText}>No recent bookings found.</p>
              )}
            </div>
          </div>

          {/* Recent Package Enquiries Card */}
          <div className={styles.sectionCard}>
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              Recent Package Enquiries
            </h2>
            <div className={styles.feedList}>
              {recentPackageEnquiries && recentPackageEnquiries.length > 0 ? (
                recentPackageEnquiries.map((pe) => (
                  <div key={pe.id} className={styles.feedItem}>
                    <div className={styles.feedMeta}>
                      <span className={styles.feedName}>{pe.name}</span>
                      <span className={styles.feedDetail}>
                        Package: <strong>{pe.package_name}</strong> | Destination: {pe.destination}
                      </span>
                      <span className={styles.feedSubText}>
                        Vehicle: {pe.vehicle} | Price: {pe.price || 'N/A'}
                      </span>
                    </div>
                    <div className={styles.feedStatus}>
                      <span className={`${styles.statusTag} ${getStatusClass(pe.status)}`}>
                        {pe.status || 'new'}
                      </span>
                      <span className={styles.feedDate}>
                        {new Date(pe.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyText}>No recent package enquiries found.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right side content */}
        <div className={styles.sideColumn}>
          
          {/* Quick Actions Card */}
          <div className={styles.sectionCard}>
            <h2>Quick Actions</h2>
            <div className={styles.quickActionsGrid}>
              <Link href="/admin/vehicle-categories" className={styles.actionBtn}>
                <span className={styles.actionIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                Manage Fleet
              </Link>
              
              <Link href="/admin/route-pricing" className={styles.actionBtn}>
                <span className={styles.actionIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                Configure Routes
              </Link>

              <Link href="/admin/packages" className={styles.actionBtn}>
                <span className={styles.actionIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                Add Tour Package
              </Link>

              <Link href="/admin/blogs" className={styles.actionBtn}>
                <span className={styles.actionIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </span>
                Write Blog Post
              </Link>
            </div>
          </div>

          {/* Contact Enquiries Card */}
          <div className={styles.sectionCard}>
            <h2>Recent Contact Leads</h2>
            <div className={styles.feedList}>
              {recentContactEnquiries && recentContactEnquiries.length > 0 ? (
                recentContactEnquiries.map((ce) => (
                  <div key={ce.id} className={styles.feedItem} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className={styles.feedName}>{ce.name}</span>
                      <span className={`${styles.statusTag} ${getStatusClass(ce.status)}`}>
                        {ce.status || 'new'}
                      </span>
                    </div>
                    <span className={styles.feedDetail} style={{ display: 'block', marginBottom: '6px' }}>
                      Service: <strong>{ce.service_type || 'General Inquiry'}</strong>
                    </span>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#8b929e', fontStyle: 'italic', wordBreak: 'break-all' }}>
                      "{ce.message && ce.message.length > 80 ? ce.message.substring(0, 80) + '...' : ce.message}"
                    </p>
                    <span className={styles.feedDate} style={{ marginTop: '8px', display: 'block' }}>
                      {new Date(ce.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className={styles.emptyText}>No recent contact enquiries.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
