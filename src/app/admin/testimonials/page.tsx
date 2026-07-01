import TestimonialsClient from './TestimonialsClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <TestimonialsClient userEmail={user.email || ''} />;
}
