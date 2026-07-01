import RoutePricingClient from './RoutePricingClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function RoutePricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <RoutePricingClient userEmail={user.email || ''} />;
}
