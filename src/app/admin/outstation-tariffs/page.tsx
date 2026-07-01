import OutstationTariffsClient from './OutstationTariffsClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function OutstationTariffsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <OutstationTariffsClient userEmail={user.email || ''} />;
}
