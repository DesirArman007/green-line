-- 9. TESTIMONIALS
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  text text not null,
  rating numeric default 5,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.testimonials enable row level security;
create policy "Allow public read access on testimonials" on public.testimonials for select using (true);
create policy "Allow authenticated users to manage testimonials" on public.testimonials for all to authenticated using (true);
