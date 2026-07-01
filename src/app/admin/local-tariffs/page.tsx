import LocalTariffsClient from './LocalTariffsClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LocalTariffsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <LocalTariffsClient userEmail={user.email || ''} />;
}
