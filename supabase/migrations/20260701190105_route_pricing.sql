-- 4. ROUTE PRICING (For Fleet Page)
create table public.route_pricing (
  id uuid primary key default gen_random_uuid(),
  vehicle_category_id uuid references public.vehicle_categories(id) on delete set null,
  name text not null,
  description text,
  capacity text,
  features text[],
  one_way_price text,
  per_extra_km text,
  per_extra_hour text,
  one_way_day_limit text,
  round_trip_per_km text,
  driver_batta text,
  round_trip_day_limit text,
  includes text[],
  poster_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.route_pricing enable row level security;
create policy "Allow public read access on route_pricing" on public.route_pricing for select using (true);
create policy "Allow authenticated users to manage route_pricing" on public.route_pricing for all to authenticated using (true);
