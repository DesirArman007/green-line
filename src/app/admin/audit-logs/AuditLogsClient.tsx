"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import styles from './page.module.css';

export default function AuditLogsClient() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setLogs(data);
    }
    setIsLoading(false);
  };

  const columns = [
    { 
      key: 'created_at', 
      label: 'Timestamp',
      render: (item: any) => new Date(item.created_at).toLocaleString()
    },
    { key: 'user_email', label: 'User Email' },
    { 
      key: 'action', 
      label: 'Action',
      render: (item: any) => (
        <span className={`${styles.badge} ${styles[item.action.toLowerCase()]}`}>
          {item.action}
        </span>
      )
    },
    { key: 'entity_type', label: 'Entity Type' },
    { 
      key: 'details', 
      label: 'Details',
      render: (item: any) => item.details ? JSON.stringify(item.details) : '-'
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          Audit Logs
        </h1>
        <p>View all actions performed by administrators across the CMS.</p>
      </div>

      <DataTable 
        data={logs} 
        columns={columns} 
        isLoading={isLoading} 
      />
    </div>
  );
}
