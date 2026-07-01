"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '../packages/AdminPackages.module.css'; // Reusing styles

export default function PackageEnquiriesClient() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('package_enquiries').select('*').order('created_at', { ascending: false });
    if (data) setEnquiries(data);
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('package_enquiries').update({ status }).eq('id', id);
    if (!error) {
      await logAuditAction('UPDATE', 'package_enquiries', id, user?.email, { status });
      fetchEnquiries();
    }
  };

  const columns = [
    { key: 'created_at', label: 'Date', render: (item: any) => new Date(item.created_at).toLocaleDateString() },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'package_name', label: 'Package' },
    { key: 'destination', label: 'Destination' },
    { key: 'duration', label: 'Duration' },
    { key: 'vehicle', label: 'Vehicle' },
    { key: 'price', label: 'Price' },
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
          <option value="resolved">Resolved</option>
        </select>
      )
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          Package Enquiries
        </h1>
        <p>Leads from the individual Tour Package inquiry forms</p>
      </div>

      <DataTable data={enquiries} columns={columns} isLoading={isLoading} />
    </div>
  );
}
