import styles from '../page.module.css';
import PackagesClient from './PackagesClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.dashboard}>
      <PackagesClient userEmail={user.email || 'unknown'} />
    </div>
  );
}
