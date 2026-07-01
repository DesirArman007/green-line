-- 7. TARIFF BACKLINKS
create table public.tariff_backlinks (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  column_side text not null check (column_side in ('left', 'right')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.tariff_backlinks enable row level security;
create policy "Allow public read access on tariff_backlinks" on public.tariff_backlinks for select using (true);
create policy "Allow authenticated users to manage tariff_backlinks" on public.tariff_backlinks for all to authenticated using (true);
