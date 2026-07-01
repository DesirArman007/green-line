"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';

export default function VideoTestimonialsClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('video_testimonials').select('*').order('created_at', { ascending: false });
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
    if (confirm(`Are you sure you want to delete this video testimonial?`)) {
      const { error } = await supabase.from('video_testimonials').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'video_testimonials', item.id, userEmail, { title: item.title });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      title: '',
      thumbnail_url: '',
      video_url: '',
      route: '',
      distance: '',
      vehicle: '',
      customer: '',
      initials: '',
      rating: 5,
      quote: '',
      is_featured: false,
    });
    setIsEditing(true);
  };

  const handleToggleFeatured = async (item: any) => {
    const newFeaturedState = !item.is_featured;
    setItems(items.map(i => i.id === item.id ? { ...i, is_featured: newFeaturedState } : i));

    const { error } = await supabase.from('video_testimonials').update({ is_featured: newFeaturedState }).eq('id', item.id);
    if (!error) {
      await logAuditAction('UPDATE', 'video_testimonials', item.id, userEmail, { action: `Toggled is_featured to ${newFeaturedState}` });
    } else {
      setItems(items.map(i => i.id === item.id ? { ...i, is_featured: !newFeaturedState } : i));
      alert('Failed to toggle featured status');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: currentItem.title,
      thumbnail_url: currentItem.thumbnail_url,
      video_url: currentItem.video_url,
      route: currentItem.route || '',
      distance: currentItem.distance || '',
      vehicle: currentItem.vehicle || '',
      customer: currentItem.customer || '',
      initials: currentItem.initials || '',
      rating: parseInt(currentItem.rating) || 5,
      quote: currentItem.quote || '',
      is_featured: currentItem.is_featured || false,
    };

    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('video_testimonials').update(payload).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'video_testimonials', currentItem.id, userEmail, { title: currentItem.title });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item: ' + error.message);
      }
    } else {
      // Create
      const { data, error } = await supabase.from('video_testimonials').insert([payload]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'video_testimonials', data[0].id, userEmail, { title: currentItem.title });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item: ' + error?.message);
      }
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'route', label: 'Route' },
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
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Video Testimonials
          </button>
        ) : (
          <h1>Trip Journeys (Video Testimonials)</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Journey
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Thumbnail Image</label>
            <ImageUpload 
              bucket="media" 
              folder="testimonials" 
              currentImage={currentItem.thumbnail_url}
              onUploadSuccess={(url) => setCurrentItem({ ...currentItem, thumbnail_url: url })}
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Internal Title</label>
              <input 
                value={currentItem.title || ''} 
                onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} 
                placeholder="E.g., Tirupati Pilgrimage"
              />
            </div>
            <div className={styles.formGroup}>
              <label>YouTube Video URL (or MP4 link)</label>
              <input 
                required 
                value={currentItem.video_url || ''} 
                onChange={e => setCurrentItem({ ...currentItem, video_url: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Route Display Name</label>
              <input 
                value={currentItem.route || ''} 
                onChange={e => setCurrentItem({ ...currentItem, route: e.target.value })} 
                placeholder="E.g., Hyderabad ➔ Tirupati"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Distance & Trip Type</label>
              <input 
                value={currentItem.distance || ''} 
                onChange={e => setCurrentItem({ ...currentItem, distance: e.target.value })} 
                placeholder="E.g., 580 km Outstation"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Vehicle Model</label>
              <input 
                value={currentItem.vehicle || ''} 
                onChange={e => setCurrentItem({ ...currentItem, vehicle: e.target.value })} 
                placeholder="E.g., Toyota Innova Crysta"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Customer Name</label>
              <input 
                value={currentItem.customer || ''} 
                onChange={e => setCurrentItem({ ...currentItem, customer: e.target.value })} 
                placeholder="E.g., Suresh Kumar"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Customer Initials</label>
              <input 
                value={currentItem.initials || ''} 
                onChange={e => setCurrentItem({ ...currentItem, initials: e.target.value })} 
                placeholder="E.g., SK"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Rating (1-5)</label>
              <input 
                type="number"
                min="1" max="5"
                value={currentItem.rating || 5} 
                onChange={e => setCurrentItem({ ...currentItem, rating: parseInt(e.target.value) })} 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Quote / Review Snippet</label>
            <textarea 
              value={currentItem.quote || ''} 
              onChange={e => setCurrentItem({ ...currentItem, quote: e.target.value })} 
              rows={4}
              placeholder="“We booked the Innova Crysta for our family trip... Highly recommended!”"
            />
          </div>
          

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Journey
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
