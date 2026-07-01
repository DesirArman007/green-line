-- 6. OUTSTATION TARIFFS
create table public.outstation_tariffs (
  id uuid primary key default gen_random_uuid(),
  car text not null,
  min_km text not null,
  per_km text not null,
  beta text not null,
  toll_parking text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.outstation_tariffs enable row level security;
create policy "Allow public read access on outstation_tariffs" on public.outstation_tariffs for select using (true);
create policy "Allow authenticated users to manage outstation_tariffs" on public.outstation_tariffs for all to authenticated using (true);
