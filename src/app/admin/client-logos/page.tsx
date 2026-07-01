import ClientLogosClient from './ClientLogosClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ClientLogosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <ClientLogosClient userEmail={user.email || ''} />;
}
