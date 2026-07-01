"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '../packages/AdminPackages.module.css'; // Reusing styles

export default function BookingsClient() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (data) setBookings(data);
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (!error) {
      await logAuditAction('UPDATE', 'bookings', id, user?.email, { status });
      fetchBookings();
    }
  };

  const columns = [
    { key: 'created_at', label: 'Requested On', render: (item: any) => new Date(item.created_at).toLocaleDateString() },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'car', label: 'Car' },
    { key: 'pickup', label: 'Pickup' },
    { key: 'drop_location', label: 'Drop' },
    { key: 'date', label: 'Travel Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (item: any) => (
        <select 
          value={item.status} 
          onChange={(e) => updateStatus(item.id, e.target.value)}
          style={{ padding: '4px', borderRadius: '4px', backgroundColor: '#1a1e24', color: '#fff', border: '1px solid #2a2e35' }}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      )
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          Bookings
        </h1>
        <p>Leads from the "Need to Rent a Premium Cab?" form</p>
      </div>

      <DataTable data={bookings} columns={columns} isLoading={isLoading} />
    </div>
  );
}
