-- 1. PACKAGES
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  duration text,
  vehicle text,
  price text,
  destination text,
  category text,
  rating numeric,
  image_url text,
  highlights text[],
  itinerary jsonb,
  includes text[],
  excludes text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.packages enable row level security;
create policy "Allow public read access on packages" on public.packages for select using (true);
create policy "Allow authenticated users to manage packages" on public.packages for all to authenticated using (true);
