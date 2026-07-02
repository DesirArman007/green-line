"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from './AdminPackages.module.css';
import RichTextEditor from '@/components/Admin/RichTextEditor/RichTextEditor';

export default function PackagesClient({ userEmail }: { userEmail: string }) {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false }).order('id', { ascending: true });
    if (!error && data) {
      setPackages(data);
    }
    setIsLoading(false);
  };

  const handleEdit = (pkg: any) => {
    setCurrentPackage(pkg);
    setIsEditing(true);
  };

  const handleDelete = async (pkg: any) => {
    if (confirm(`Are you sure you want to delete ${pkg.name}?`)) {
      const { error } = await supabase.from('packages').delete().eq('id', pkg.id);
      if (!error) {
        await logAuditAction('DELETE', 'packages', pkg.id, userEmail, { name: pkg.name });
        fetchPackages();
      } else {
        alert('Failed to delete package');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentPackage({
      name: '',
      description: '',
      duration: '',
      vehicle: '',
      price: '',
      destination: '',
      category: '',
      image_url: '',
      highlights: [],
      includes: [],
      excludes: [],
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPackage.id) {
      // Update
      const { error } = await supabase.from('packages').update({
        name: currentPackage.name,
        description: currentPackage.description,
        duration: currentPackage.duration,
        vehicle: currentPackage.vehicle,
        price: currentPackage.price,
        destination: currentPackage.destination,
        category: currentPackage.category,
        image_url: currentPackage.image_url,
        updated_at: new Date().toISOString()
      }).eq('id', currentPackage.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'packages', currentPackage.id, userEmail, { name: currentPackage.name });
        setIsEditing(false);
        fetchPackages();
      } else {
        alert('Failed to update package');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('packages').insert([{
        name: currentPackage.name,
        description: currentPackage.description,
        duration: currentPackage.duration,
        vehicle: currentPackage.vehicle,
        price: currentPackage.price,
        destination: currentPackage.destination,
        category: currentPackage.category,
        image_url: currentPackage.image_url,
      }]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'packages', data[0].id, userEmail, { name: currentPackage.name });
        setIsEditing(false);
        fetchPackages();
      } else {
        alert('Failed to create package');
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'destination', label: 'Destination' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Packages
          </button>
        ) : (
          <h1>Packages</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Package
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Package Image</label>
            <ImageUpload 
              bucket="media" 
              folder="packages" 
              currentImage={currentPackage.image_url}
              onUploadSuccess={(url) => setCurrentPackage({ ...currentPackage, image_url: url })}
              dimensions="800 x 500 px (Landscape)"
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input 
                required 
                maxLength={100}
                value={currentPackage.name} 
                onChange={e => setCurrentPackage({ ...currentPackage, name: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Destination</label>
              <input 
                required 
                maxLength={100}
                value={currentPackage.destination} 
                onChange={e => setCurrentPackage({ ...currentPackage, destination: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Duration (e.g., 2 Days)</label>
              <input 
                required 
                maxLength={50}
                value={currentPackage.duration} 
                onChange={e => setCurrentPackage({ ...currentPackage, duration: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input 
                required 
                maxLength={20}
                value={currentPackage.price} 
                onChange={e => setCurrentPackage({ ...currentPackage, price: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Vehicle</label>
              <input 
                maxLength={50}
                value={currentPackage.vehicle || ''} 
                onChange={e => setCurrentPackage({ ...currentPackage, vehicle: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Category</label>
              <input 
                maxLength={50}
                value={currentPackage.category || ''} 
                onChange={e => setCurrentPackage({ ...currentPackage, category: e.target.value })} 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <RichTextEditor 
              content={currentPackage.description} 
              onChange={(html) => setCurrentPackage({ ...currentPackage, description: html })} 
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Package
            </button>
          </div>
        </form>
      ) : (
        <DataTable 
          data={packages} 
          columns={columns} 
          isLoading={isLoading} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}
