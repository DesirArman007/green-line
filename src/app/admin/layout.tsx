import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import styles from './layout.module.css'
import AdminSidebarNav from './AdminSidebarNav'
import { signout } from '@/app/login/actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    // Redirect to login if not authenticated
    redirect('/login')
  }

  // Check if the user is a superadmin
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  const navCategories = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/admin' }
      ]
    },
    {
      title: 'Leads & Bookings',
      items: [
        { name: 'Bookings', href: '/admin/bookings' },
        { name: 'Package Enquiries', href: '/admin/package-enquiries' },
        { name: 'Contact Enquiries', href: '/admin/contact-enquiries' },
      ]
    },
    {
      title: 'Content Management',
      items: [
        { name: 'Packages', href: '/admin/packages' },
        { name: 'Blogs', href: '/admin/blogs' },
        { name: 'Services', href: '/admin/services' },
        { name: 'Testimonials', href: '/admin/testimonials' },
        { name: 'Video Testimonials', href: '/admin/video-testimonials' },
        { name: 'Client Logos', href: '/admin/client-logos' },
      ]
    },
    {
      title: 'Fleet & Pricing',
      items: [
        { name: 'Fleet Vehicles', href: '/admin/vehicle-categories' },
        { name: 'Route Pricing', href: '/admin/route-pricing' },
        { name: 'Local Tariffs', href: '/admin/local-tariffs' },
        { name: 'Outstation Tariffs', href: '/admin/outstation-tariffs' },
      ]
    },
    {
      title: 'Settings & SEO',
      items: [
        { name: 'Tariff Backlinks', href: '/admin/tariff-backlinks' },
        ...(roleData?.role === 'superadmin' ? [
          { name: 'Admin Users', href: '/admin/admins' },
          { name: 'Audit Logs', href: '/admin/audit-logs' }
        ] : []),
      ]
    }
  ]

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ display: 'flex' }}>
              <img src="/images/logo.png" alt="GreenLine Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' }} />
            </div>
            <h2 style={{ margin: 0 }}>Green Line</h2>
          </div>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
        
        <AdminSidebarNav navCategories={navCategories} />

        <div className={styles.sidebarFooter}>
          <form action={signout}>
            <button type="submit" className={styles.logoutBtn}>
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  )
}
