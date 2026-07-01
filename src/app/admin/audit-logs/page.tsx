import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AuditLogsClient from './AuditLogsClient';

export default async function AuditLogsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if the user is a superadmin
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!roleData || roleData.role !== 'superadmin') {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view the audit logs. This area is restricted to Super Administrators only.</p>
        </div>
      </div>
    );
  }

  return <AuditLogsClient />;
}
