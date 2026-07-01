"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';

export default function TestimonialsClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false }).order('id', { ascending: true });
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
    if (confirm(`Are you sure you want to delete this testimonial from ${item.name}?`)) {
      const { error } = await supabase.from('testimonials').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'testimonials', item.id, userEmail, { name: item.name });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      name: '',
      role: '',
      text: '',
      rating: 5,
      image_url: '',
      is_featured: false,
    });
    setIsEditing(true);
  };

  const handleToggleFeatured = async (item: any) => {
    // Optimistic UI update to prevent weird page flashing/re-fetching
    const newFeaturedState = !item.is_featured;
    setItems(items.map(i => i.id === item.id ? { ...i, is_featured: newFeaturedState } : i));

    const { error } = await supabase.from('testimonials').update({ is_featured: newFeaturedState }).eq('id', item.id);
    if (!error) {
      await logAuditAction('UPDATE', 'testimonials', item.id, userEmail, { action: `Toggled is_featured to ${newFeaturedState}` });
    } else {
      // Revert on failure
      setItems(items.map(i => i.id === item.id ? { ...i, is_featured: !newFeaturedState } : i));
      alert('Failed to toggle featured status');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('testimonials').update({
        name: currentItem.name,
        role: currentItem.role,
        text: currentItem.text,
        rating: currentItem.rating,
        image_url: currentItem.image_url,
        is_featured: currentItem.is_featured,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'testimonials', currentItem.id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('testimonials').insert([{
        name: currentItem.name,
        role: currentItem.role,
        text: currentItem.text,
        rating: currentItem.rating,
        image_url: currentItem.image_url,
        is_featured: currentItem.is_featured,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'testimonials', data[0].id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'rating', label: 'Rating' },
    { 
      key: 'is_featured', 
      label: 'Featured (Home)',
      render: (item: any) => (
        <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
          <input 
            type="checkbox" 
            checked={item.is_featured} 
            onChange={(e) => { e.stopPropagation(); handleToggleFeatured(item); }} 
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: item.is_featured ? '#a3ff12' : '#2a2e35',
            transition: '.4s', borderRadius: '34px'
          }}>
            <span style={{
              position: 'absolute', content: '""', height: '16px', width: '16px',
              left: item.is_featured ? '24px' : '4px', bottom: '4px',
              backgroundColor: item.is_featured ? '#111' : '#8b929e',
              transition: '.4s', borderRadius: '50%'
            }}></span>
          </span>
        </label>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Testimonials
          </button>
        ) : (
          <h1>Testimonials</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Testimonial
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Profile Image</label>
            <ImageUpload 
              bucket="media" 
              folder="testimonials" 
              currentImage={currentItem.image_url}
              onUploadSuccess={(url) => setCurrentItem({ ...currentItem, image_url: url })}
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input 
                required 
                value={currentItem.name} 
                onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Role / Company</label>
              <input 
                value={currentItem.role || ''} 
                onChange={e => setCurrentItem({ ...currentItem, role: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Rating (1-5)</label>
              <input 
                type="number"
                min="1"
                max="5"
                required 
                value={currentItem.rating} 
                onChange={e => setCurrentItem({ ...currentItem, rating: Number(e.target.value) })} 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Testimonial Text</label>
            <textarea 
              className={styles.textarea}
              rows={4}
              required
              value={currentItem.text} 
              onChange={e => setCurrentItem({ ...currentItem, text: e.target.value })} 
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Testimonial
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
