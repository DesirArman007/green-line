import ServicesClient from './ServicesClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <ServicesClient userEmail={user.email || ''} />;
}
