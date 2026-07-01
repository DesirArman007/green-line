-- 2. BLOGS
create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text not null,
  read_time text,
  author text,
  image_url text,
  date text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.blogs enable row level security;
create policy "Allow public read access on blogs" on public.blogs for select using (true);
create policy "Allow authenticated users to manage blogs" on public.blogs for all to authenticated using (true);
