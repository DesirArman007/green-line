"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';

export default function LocalTariffsClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('local_tariffs').select('*').order('created_at', { ascending: false }).order('id', { ascending: true });
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
    if (confirm(`Are you sure you want to delete ${item.car_type}?`)) {
      const { error } = await supabase.from('local_tariffs').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'local_tariffs', item.id, userEmail, { car_type: item.car_type });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      car_type: '',
      four_hr_80_km: '',
      eight_hr_80_km: '',
      extra_km: '',
      extra_hr: '',
      driver_batta: '',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('local_tariffs').update({
        car_type: currentItem.car_type,
        four_hr_80_km: currentItem.four_hr_80_km,
        eight_hr_80_km: currentItem.eight_hr_80_km,
        extra_km: currentItem.extra_km,
        extra_hr: currentItem.extra_hr,
        driver_batta: currentItem.driver_batta,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'local_tariffs', currentItem.id, userEmail, { car_type: currentItem.car_type });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('local_tariffs').insert([{
        car_type: currentItem.car_type,
        four_hr_80_km: currentItem.four_hr_80_km,
        eight_hr_80_km: currentItem.eight_hr_80_km,
        extra_km: currentItem.extra_km,
        extra_hr: currentItem.extra_hr,
        driver_batta: currentItem.driver_batta,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'local_tariffs', data[0].id, userEmail, { car_type: currentItem.car_type });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'car_type', label: 'Car Type' },
    { key: 'four_hr_80_km', label: '4Hr/80Km' },
    { key: 'eight_hr_80_km', label: '8Hr/80Km' },
    { key: 'extra_km', label: 'Extra KM' },
    { key: 'extra_hr', label: 'Extra Hour' },
    { key: 'driver_batta', label: 'Driver Batta' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Local Tariffs
          </button>
        ) : (
          <h1>Local Tariffs</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Local Tariff
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Car Type</label>
              <input 
                required 
                value={currentItem.car_type} 
                onChange={e => setCurrentItem({ ...currentItem, car_type: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>4Hr/80Km Price</label>
              <input 
                required 
                value={currentItem.four_hr_80_km} 
                onChange={e => setCurrentItem({ ...currentItem, four_hr_80_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>8Hr/80Km Price</label>
              <input 
                required 
                value={currentItem.eight_hr_80_km} 
                onChange={e => setCurrentItem({ ...currentItem, eight_hr_80_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Extra KM Price</label>
              <input 
                required 
                value={currentItem.extra_km} 
                onChange={e => setCurrentItem({ ...currentItem, extra_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Extra Hour Price</label>
              <input 
                required 
                value={currentItem.extra_hr} 
                onChange={e => setCurrentItem({ ...currentItem, extra_hr: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Driver Batta</label>
              <input 
                required 
                value={currentItem.driver_batta} 
                onChange={e => setCurrentItem({ ...currentItem, driver_batta: e.target.value })} 
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
