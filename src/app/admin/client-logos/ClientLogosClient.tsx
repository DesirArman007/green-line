"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';

export default function ClientLogosClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('client_logos').select('*').order('created_at', { ascending: false });
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
    if (confirm(`Are you sure you want to delete this logo for ${item.name}?`)) {
      const { error } = await supabase.from('client_logos').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'client_logos', item.id, userEmail, { name: item.name });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      name: '',
      logo_url: '',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('client_logos').update({
        name: currentItem.name,
        logo_url: currentItem.logo_url,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'client_logos', currentItem.id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('client_logos').insert([{
        name: currentItem.name,
        logo_url: currentItem.logo_url,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'client_logos', data[0].id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Client Name' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Client Logos
          </button>
        ) : (
          <h1>Client Logos</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Logo
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Logo Image</label>
            <ImageUpload 
              bucket="media" 
              folder="clients" 
              currentImage={currentItem.logo_url}
              onUploadSuccess={(url) => setCurrentItem({ ...currentItem, logo_url: url })}
              dimensions="300 x 150 px (Horizontal Logo)"
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Client / Company Name</label>
              <input 
                required 
                value={currentItem.name} 
                onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} 
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Logo
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
