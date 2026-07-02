"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';
import RichTextEditor from '@/components/Admin/RichTextEditor/RichTextEditor';

export default function ServicesClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false }).order('id', { ascending: true });
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
    if (confirm(`Are you sure you want to delete ${item.title}?`)) {
      const { error } = await supabase.from('services').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'services', item.id, userEmail, { title: item.title });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      title: '',
      description: '',
      image_url: '',
      icon_svg: '',
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('services').update({
        title: currentItem.title,
        description: currentItem.description,
        image_url: currentItem.image_url,
        icon_svg: currentItem.icon_svg,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'services', currentItem.id, userEmail, { title: currentItem.title });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('services').insert([{
        title: currentItem.title,
        description: currentItem.description,
        image_url: currentItem.image_url,
        icon_svg: currentItem.icon_svg,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'services', data[0].id, userEmail, { title: currentItem.title });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { 
      key: 'image_url', 
      label: 'Image',
      render: (item: any) => (
        item.image_url ? (
          <a href={item.image_url} target="_blank" rel="noreferrer" title="Click to view full image" style={{ display: 'block', cursor: 'zoom-in' }}>
            <div style={{
              width: '72px',
              height: '45px',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid var(--admin-border)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </a>
        ) : (
          <span style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>No image</span>
        )
      )
    },
    { 
      key: 'title', 
      label: 'Title',
      render: (item: any) => (
        <span style={{ fontWeight: 600, color: 'var(--admin-text-primary)', fontSize: '0.92rem' }}>
          {item.title}
        </span>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (item: any) => {
        // Strip HTML tags for preview and truncate to 100 chars
        const plainText = item.description ? item.description.replace(/<[^>]+>/g, '') : '';
        return (
          <span style={{ color: 'var(--admin-text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
            {plainText.length > 90 ? plainText.substring(0, 90) + '...' : plainText}
          </span>
        );
      }
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Services
          </button>
        ) : (
          <h1>Services</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Service
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start', marginBottom: '8px' }}>
            <div className={styles.formGroup}>
              <label>Service Image</label>
              <ImageUpload 
                bucket="media" 
                folder="services" 
                currentImage={currentItem.image_url}
                onUploadSuccess={(url) => setCurrentItem({ ...currentItem, image_url: url })}
                dimensions="1200 x 630 px (Landscape)"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Title</label>
              <input 
                required 
                maxLength={100}
                value={currentItem.title} 
                onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} 
                placeholder="Enter service title (e.g. Tour Packages)"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <RichTextEditor 
              content={currentItem.description} 
              onChange={(html) => setCurrentItem({ ...currentItem, description: html })} 
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Service
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
