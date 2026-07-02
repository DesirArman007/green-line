"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import DataTable from '@/components/Admin/DataTable/DataTable';
import ImageUpload from '@/components/Admin/ImageUpload/ImageUpload';
import { logAuditAction } from '@/utils/auditLogger';
import styles from '@/app/admin/AdminShared.module.css';
import RichTextEditor from '@/components/Admin/RichTextEditor/RichTextEditor';

export default function RoutePricingClient({ userEmail }: { userEmail: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [pricingRes, categoriesRes] = await Promise.all([
      supabase.from('route_pricing').select('*, vehicle_categories(name)').order('created_at', { ascending: false }).order('id', { ascending: true }),
      supabase.from('vehicle_categories').select('id, name').order('name')
    ]);
    
    if (!pricingRes.error && pricingRes.data) {
      setItems(pricingRes.data);
    }
    if (!categoriesRes.error && categoriesRes.data) {
      setCategories(categoriesRes.data);
    }
    setIsLoading(false);
  };

  const handleEdit = (item: any) => {
    setCurrentItem({
      ...item,
      route_name: item.route_name || 'VIJAYAWADA ⇄ HYDERABAD'
    });
    setIsEditing(true);
  };

  const handleDelete = async (item: any) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      const { error } = await supabase.from('route_pricing').delete().eq('id', item.id);
      if (!error) {
        await logAuditAction('DELETE', 'route_pricing', item.id, userEmail, { name: item.name });
        fetchData();
      } else {
        alert('Failed to delete item');
      }
    }
  };

  const handleCreateNew = () => {
    setCurrentItem({
      vehicle_category_id: '',
      route_name: '',
      name: '',
      description: '',
      capacity: '',
      features: [],
      one_way_price: '',
      per_extra_km: '',
      per_extra_hour: '',
      one_way_day_limit: '',
      round_trip_per_km: '',
      driver_batta: '',
      round_trip_day_limit: '',
      includes: [],
      poster_image: '',
    });
    setIsEditing(true);
  };

  const handleAddVehicleToRoute = (routeName: string) => {
    handleCreateNew();
    setCurrentItem((prev: any) => ({ ...prev, route_name: routeName }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      vehicle_category_id: currentItem.vehicle_category_id || null,
      route_name: currentItem.route_name,
      name: currentItem.name,
      description: currentItem.description,
      capacity: currentItem.capacity,
      one_way_price: currentItem.one_way_price,
      per_extra_km: currentItem.per_extra_km,
      per_extra_hour: currentItem.per_extra_hour,
      one_way_day_limit: currentItem.one_way_day_limit,
      round_trip_per_km: currentItem.round_trip_per_km,
      driver_batta: currentItem.driver_batta,
      round_trip_day_limit: currentItem.round_trip_day_limit,
      poster_image: currentItem.poster_image,
    };

    if (currentItem.id) {
      // Update
      const { error } = await supabase.from('route_pricing').update(payload).eq('id', currentItem.id);
      
      if (!error) {
        await logAuditAction('UPDATE', 'route_pricing', currentItem.id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchData();
      } else {
        alert('Failed to update item');
      }
    } else {
      // Create
      const { data, error } = await supabase.from('route_pricing').insert([payload]).select();
      
      if (!error && data) {
        await logAuditAction('CREATE', 'route_pricing', data[0].id, userEmail, { name: currentItem.name });
        setIsEditing(false);
        fetchData();
      } else {
        alert('Failed to create item');
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'one_way_price', label: 'One Way Price' },
  ];

  // Group items by route_name
  const groupedItems: Record<string, any[]> = {};
  items.forEach(item => {
    const rName = item.route_name || 'VIJAYAWADA ⇄ HYDERABAD';
    if (!groupedItems[rName]) groupedItems[rName] = [];
    groupedItems[rName].push(item);
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditing ? (
          <button type="button" className={styles.backBtnText} onClick={() => setIsEditing(false)}>
            &larr; Back to Route Pricing
          </button>
        ) : (
          <h1>Route Pricing</h1>
        )}
        {!isEditing && (
          <button className={styles.createBtn} onClick={handleCreateNew}>
            + Add New Route
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Route Banner Name</label>
              <input 
                required 
                value={currentItem.route_name} 
                onChange={e => setCurrentItem({ ...currentItem, route_name: e.target.value })} 
                placeholder="e.g. VIJAYAWADA ⇄ HYDERABAD"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input 
                required 
                value={currentItem.name} 
                onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Vehicle Category</label>
              <select
                value={currentItem.vehicle_category_id || ''}
                onChange={e => setCurrentItem({ ...currentItem, vehicle_category_id: e.target.value })}
              >
                <option value="">None</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Capacity</label>
              <input 
                value={currentItem.capacity || ''} 
                onChange={e => setCurrentItem({ ...currentItem, capacity: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>One Way Price</label>
              <input 
                value={currentItem.one_way_price || ''} 
                onChange={e => setCurrentItem({ ...currentItem, one_way_price: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Per Extra KM (One Way)</label>
              <input 
                value={currentItem.per_extra_km || ''} 
                onChange={e => setCurrentItem({ ...currentItem, per_extra_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Per Extra Hour (One Way)</label>
              <input 
                value={currentItem.per_extra_hour || ''} 
                onChange={e => setCurrentItem({ ...currentItem, per_extra_hour: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>One Way Day Limit</label>
              <input 
                value={currentItem.one_way_day_limit || ''} 
                onChange={e => setCurrentItem({ ...currentItem, one_way_day_limit: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Round Trip Per KM</label>
              <input 
                value={currentItem.round_trip_per_km || ''} 
                onChange={e => setCurrentItem({ ...currentItem, round_trip_per_km: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Round Trip Day Limit</label>
              <input 
                value={currentItem.round_trip_day_limit || ''} 
                onChange={e => setCurrentItem({ ...currentItem, round_trip_day_limit: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Driver Batta</label>
              <input 
                value={currentItem.driver_batta || ''} 
                onChange={e => setCurrentItem({ ...currentItem, driver_batta: e.target.value })} 
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

          <div className={styles.formGroup}>
            <label>Poster Image</label>
            <ImageUpload 
              bucket="media" 
              folder="vehicles" 
              currentImage={currentItem.poster_image}
              onUploadSuccess={(url) => setCurrentItem({ ...currentItem, poster_image: url })}
              dimensions="800 x 500 px (Landscape)"
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Route Pricing
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {Object.entries(groupedItems).map(([routeName, groupItems]) => (
            <div key={routeName} style={{ background: '#1c1f26', padding: '24px', borderRadius: '12px', border: '1px solid #2a2e35' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#fff', fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#88f933', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>ROUTE:</span> 
                  {routeName}
                </h2>
                <button 
                  className={styles.createBtn} 
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  onClick={() => handleAddVehicleToRoute(routeName)}
                >
                  + Add Vehicle
                </button>
              </div>
              <DataTable 
                data={groupItems} 
                columns={columns} 
                isLoading={isLoading} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          ))}
          {items.length === 0 && !isLoading && (
            <p style={{ color: '#8b929e' }}>No route pricing configured.</p>
          )}
        </div>
      )}
    </div>
  );
}
