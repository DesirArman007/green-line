-- 5. LOCAL TARIFFS
create table public.local_tariffs (
  id uuid primary key default gen_random_uuid(),
  car_type text not null,
  four_hr_80_km text not null,
  eight_hr_80_km text not null,
  extra_km text not null,
  extra_hr text not null,
  driver_batta text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.local_tariffs enable row level security;
create policy "Allow public read access on local_tariffs" on public.local_tariffs for select using (true);
create policy "Allow authenticated users to manage local_tariffs" on public.local_tariffs for all to authenticated using (true);
