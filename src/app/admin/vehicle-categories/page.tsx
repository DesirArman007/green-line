import VehicleCategoriesClient from './VehicleCategoriesClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function VehicleCategoriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <VehicleCategoriesClient userEmail={user.email || ''} />;
}
