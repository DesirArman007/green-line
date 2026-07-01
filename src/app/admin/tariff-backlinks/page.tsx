import TariffBacklinksClient from './TariffBacklinksClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function TariffBacklinksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <TariffBacklinksClient userEmail={user.email || ''} />;
}
