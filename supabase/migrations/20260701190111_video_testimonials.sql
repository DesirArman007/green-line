-- 10. VIDEO TESTIMONIALS
create table public.video_testimonials (
  id uuid primary key default gen_random_uuid(),
  title text,
  thumbnail_url text,
  video_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.video_testimonials enable row level security;
create policy "Allow public read access on video_testimonials" on public.video_testimonials for select using (true);
create policy "Allow authenticated users to manage video_testimonials" on public.video_testimonials for all to authenticated using (true);
