"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';

export default function TariffBacklinksClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('tariff_backlinks').select('*').order('created_at', { ascending: false });
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
    if (confirm(`Are you sure you want to delete ${item.keyword}?`)) {
      const { error } = await supabase.from('tariff_backlinks').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'tariff_backlinks', item.id, userEmail, { keyword: item.keyword });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      keyword: '',
      link_url: '#booking',
      column_side: 'left',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('tariff_backlinks').update({
        keyword: currentItem.keyword,
        link_url: currentItem.link_url,
        column_side: currentItem.column_side,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'tariff_backlinks', currentItem.id, userEmail, { keyword: currentItem.keyword });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('tariff_backlinks').insert([{
        keyword: currentItem.keyword,
        link_url: currentItem.link_url || '#booking',
        column_side: currentItem.column_side,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'tariff_backlinks', data[0].id, userEmail, { keyword: currentItem.keyword });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'keyword', label: 'Keyword / Title' },
    { key: 'link_url', label: 'URL / Link' },
    { key: 'column_side', label: 'Column Placement' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Tariff Backlinks
          </button>
        ) : (
          <h1>Tariff Backlinks</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Backlink
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Keyword / Title</label>
              <input 
                required 
                value={currentItem.keyword} 
                onChange={e => setCurrentItem({ ...currentItem, keyword: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>URL / Link Destination</label>
              <input 
                required 
                value={currentItem.link_url || ''} 
                onChange={e => setCurrentItem({ ...currentItem, link_url: e.target.value })} 
                placeholder="e.g. #booking or /about"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Column Placement</label>
              <select 
                required 
                value={currentItem.column_side} 
                onChange={e => setCurrentItem({ ...currentItem, column_side: e.target.value })}
              >
                <option value="left">Left Column</option>
                <option value="right">Right Column</option>
              </select>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Link
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
