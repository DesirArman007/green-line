"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';

export default function OutstationTariffsClient({ userEmail }: { userEmail: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('outstation_tariffs').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setItems(data);
    }
    setIsLoading(false);
  };

  const handleEdit = (item: any) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (item: any) => {
    if (confirm(`Are you sure you want to delete ${item.car}?`)) {
      const { error } = await supabase.from('outstation_tariffs').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'outstation_tariffs', item.id, userEmail, { car: item.car });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      car: '',
      min_km: '',
      per_km: '',
      beta: '',
      toll_parking: '',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('outstation_tariffs').update({
        car: currentItem.car,
        min_km: currentItem.min_km,
        per_km: currentItem.per_km,
        beta: currentItem.beta,
        toll_parking: currentItem.toll_parking,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'outstation_tariffs', currentItem.id, userEmail, { car: currentItem.car });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('outstation_tariffs').insert([{
        car: currentItem.car,
        min_km: currentItem.min_km,
        per_km: currentItem.per_km,
        beta: currentItem.beta,
        toll_parking: currentItem.toll_parking,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'outstation_tariffs', data[0].id, userEmail, { car: currentItem.car });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'car', label: 'Car' },
    { key: 'min_km', label: 'Min KM' },
    { key: 'per_km', label: 'Per KM' },
    { key: 'beta', label: 'Driver Batta' },
    { key: 'toll_parking', label: 'Toll & Parking' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Outstation Tariffs
          </button>
        ) : (
          <h1>Outstation Tariffs</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Outstation Tariff
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Car</label>
              <input 
                required 
                value={currentItem.car} 
                onChange={e => setCurrentItem({ ...currentItem, car: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Minimum KM</label>
              <input 
                required 
                value={currentItem.min_km} 
                onChange={e => setCurrentItem({ ...currentItem, min_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price Per KM</label>
              <input 
                required 
                value={currentItem.per_km} 
                onChange={e => setCurrentItem({ ...currentItem, per_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Driver Beta</label>
              <input 
                required 
                value={currentItem.beta} 
                onChange={e => setCurrentItem({ ...currentItem, beta: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Toll & Parking</label>
              <input 
                required 
                value={currentItem.toll_parking} 
                onChange={e => setCurrentItem({ ...currentItem, toll_parking: e.target.value })} 
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Tariff
            </button>
          </div>
        </form>
      ) : (
        <DataTable 
          data={items} 
          columns={columns} 
          isLoading={isLoading} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}
