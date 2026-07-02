"use client";

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import { logAuditAction } from '@/utils/auditLogger';
import { ChevronDown } from 'lucide-react';
import styles from '../packages/AdminPackages.module.css'; // Reusing styles

const getStatusColor = (val: string) => {
  switch (val) {
    case 'new':
      return { bg: '#e2e8f0', text: '#475569', border: '#cbd5e1' };
    case 'contacted':
      return { bg: 'rgba(59, 130, 246, 0.1)', text: '#1d4ed8', border: 'rgba(59, 130, 246, 0.2)' };
    case 'confirmed':
    case 'completed':
      return { bg: 'rgba(16, 185, 129, 0.1)', text: '#047857', border: 'rgba(16, 185, 129, 0.2)' };
    case 'cancelled':
      return { bg: 'rgba(239, 68, 68, 0.1)', text: '#b91c1c', border: 'rgba(239, 68, 68, 0.2)' };
    default:
      return { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
  }
};

function StatusDropdown({ status, onChange, options }: { status: string, onChange: (val: string) => void, options: { value: string, label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const colors = getStatusColor(status);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 4,
      left: rect.right - 120, // aligns to the right side of the trigger button
    });
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} style={{ display: 'inline-block' }}>
      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <span>{status}</span>
        <ChevronDown size={12} style={{ opacity: 0.7 }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            backgroundColor: 'var(--admin-card-bg)',
            border: '1px solid var(--admin-border)',
            borderRadius: '8px',
            boxShadow: 'var(--admin-shadow-lg)',
            zIndex: 9999,
            minWidth: '120px',
            padding: '4px 0',
            overflow: 'hidden',
          }}
        >
          {options.map((opt) => {
            const optColors = getStatusColor(opt.value);
            const isSelected = opt.value === status;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: optColors.text,
                  backgroundColor: isSelected ? optColors.bg : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'var(--admin-table-row-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
        <StatusDropdown 
          status={item.status} 
          onChange={(newStatus) => updateStatus(item.id, newStatus)}
          options={[
            { value: 'new', label: 'New' },
            { value: 'contacted', label: 'Contacted' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
        />
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
