import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdmins } from './actions';
import AdminsClient from './AdminsClient';

export const metadata = {
  title: 'Admin Users Management - Green Line CMS',
};

export default async function AdminsPage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Ensure current user is superadmin
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (roleData?.role !== 'superadmin') {
    return (
      <div style={{ padding: '32px', color: '#fff' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view or manage admin users. This area is restricted to Super Administrators only.</p>
      </div>
    );
  }

  const admins = await getAdmins();

  return (
    <div>
      <AdminsClient initialAdmins={admins} currentUserId={user.id} />
    </div>
  );
}
