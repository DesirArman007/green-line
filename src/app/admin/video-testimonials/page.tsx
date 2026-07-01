import VideoTestimonialsClient from './VideoTestimonialsClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function VideoTestimonialsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <VideoTestimonialsClient userEmail={user.email || ''} />;
}
