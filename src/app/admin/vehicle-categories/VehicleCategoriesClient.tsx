"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';
import RichTextEditor from '@/components/Admin/RichTextEditor/RichTextEditor';

export default function VehicleCategoriesClient({ userEmail }: { userEmail: string }) {
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
    const { data, error } = await supabase.from('vehicle_categories').select('*').order('created_at', { ascending: true });
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
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      const { error } = await supabase.from('vehicle_categories').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'vehicle_categories', item.id, userEmail, { name: item.name });
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      name: '',
      description: '',
      image_url: '',
      seats: '',
      price: '',
      features: [],
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure features is an array, if they entered a comma-separated string
    let parsedFeatures = currentItem.features;
    if (typeof parsedFeatures === 'string') {
      parsedFeatures = parsedFeatures.split(',').map((f: string) => f.trim()).filter((f: string) => f);
    }
    
    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('vehicle_categories').update({
        name: currentItem.name,
        description: currentItem.description,
        image_url: currentItem.image_url,
        seats: currentItem.seats,
        price: currentItem.price,
        features: parsedFeatures,
      }).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'vehicle_categories', currentItem.id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('vehicle_categories').insert([{
        name: currentItem.name,
        description: currentItem.description,
        image_url: currentItem.image_url,
        seats: currentItem.seats,
        price: currentItem.price,
        features: parsedFeatures,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'vehicle_categories', data[0].id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchItems();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Models' },
    { key: 'seats', label: 'Seats' },
    { key: 'price', label: 'Price' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Fleet Vehicles
          </button>
        ) : (
          <h1>Fleet Vehicles</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Category
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Category Image</label>
            <ImageUpload 
              bucket="media" 
              folder="vehicles" 
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
              <label>Seats</label>
              <input 
                placeholder="e.g. 4+1 Seats"
                value={currentItem.seats || ''} 
                onChange={e => setCurrentItem({ ...currentItem, seats: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input 
                placeholder="e.g. From ₹12/km"
                value={currentItem.price || ''} 
                onChange={e => setCurrentItem({ ...currentItem, price: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Features (comma-separated)</label>
              <input 
                placeholder="AC, GPS Tracking, Boot Space"
                value={Array.isArray(currentItem.features) ? currentItem.features.join(', ') : (currentItem.features || '')} 
                onChange={e => setCurrentItem({ ...currentItem, features: e.target.value })} 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Models (comma-separated)</label>
            <input 
              placeholder="e.g. Dzire, Etios, Amaze"
              value={currentItem.description || ''} 
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })} 
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Category
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
