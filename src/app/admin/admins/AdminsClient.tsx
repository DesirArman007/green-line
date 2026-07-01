'use client';

import { useState } from 'react';
import sharedStyles from '../AdminShared.module.css';
import tableStyles from '@/components/Admin/DataTable/DataTable.module.css';
import { createAdmin, deleteAdmin } from './actions';

type AdminUser = {
  id: string;
  email: string | undefined;
  role: string | undefined;
  created_at: string;
  last_sign_in_at?: string | null;
};

export default function AdminsClient({ initialAdmins, currentUserId }: { initialAdmins: AdminUser[], currentUserId: string }) {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createAdmin(formData);
      // We could re-fetch or just reload the page to get the updated list
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Failed to create admin');
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (id === currentUserId) {
      alert("You cannot delete yourself!");
      return;
    }
    
    if (!confirm('Are you sure you want to delete this admin account permanently?')) return;
    
    try {
      await deleteAdmin(id);
      setAdmins(admins.filter(a => a.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete admin');
    }
  }

  if (isAdding) {
    return (
      <div className={sharedStyles.container}>
        <div className={sharedStyles.header}>
          <h1>
            <button onClick={() => setIsAdding(false)} className={sharedStyles.backBtnText}>
              &larr; Back
            </button>
            Add New Admin
          </h1>
        </div>

        <form onSubmit={handleCreate} className={sharedStyles.form}>
          {error && <div style={{ color: '#ff4a4a', padding: '10px', backgroundColor: 'rgba(255, 74, 74, 0.1)', borderRadius: '8px' }}>{error}</div>}
          
          <div className={sharedStyles.formGrid}>
            <div className={sharedStyles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="admin@example.com" />
            </div>

            <div className={sharedStyles.formGroup}>
              <label htmlFor="password">Temporary Password</label>
              <input type="password" id="password" name="password" required minLength={6} />
            </div>

            <div className={sharedStyles.formGroup}>
              <label htmlFor="role">Role Level</label>
              <select id="role" name="role" required>
                <option value="admin">Admin (Standard)</option>
                <option value="superadmin">Super Admin (Full Access)</option>
              </select>
            </div>
          </div>

          <div className={sharedStyles.formActions}>
            <button type="button" onClick={() => setIsAdding(false)} className={sharedStyles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className={sharedStyles.saveBtn}>
              {isSubmitting ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={sharedStyles.container}>
      <div className={sharedStyles.header}>
        <h1>Admin Users</h1>
        <button onClick={() => setIsAdding(true)} className={sharedStyles.createBtn}>
          + Add New Admin
        </button>
      </div>

      <div className={tableStyles.tableContainer}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Last Sign In</th>
              <th className={tableStyles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td><strong>{admin.email}</strong> {admin.id === currentUserId && '(You)'}</td>
                <td>
                  <span className={admin.role === 'superadmin' ? sharedStyles.statusTagCompleted : sharedStyles.statusTagConfirmed} style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {admin.role}
                  </span>
                </td>
                <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                <td>{admin.last_sign_in_at ? new Date(admin.last_sign_in_at).toLocaleDateString() : 'Never'}</td>
                <td className={tableStyles.actionsCell}>
                  <div className={tableStyles.actionsWrapper}>
                    {admin.id !== currentUserId && (
                      <button 
                        onClick={() => handleDelete(admin.id)} 
                        className={tableStyles.deleteBtn}
                        title="Delete User"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan={5} className={tableStyles.empty}>
                  No admin users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
