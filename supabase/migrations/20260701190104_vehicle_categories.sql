-- 3. VEHICLE CATEGORIES (For Home Page)
create table public.vehicle_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.vehicle_categories enable row level security;
create policy "Allow public read access on vehicle_categories" on public.vehicle_categories for select using (true);
create policy "Allow authenticated users to manage vehicle_categories" on public.vehicle_categories for all to authenticated using (true);
