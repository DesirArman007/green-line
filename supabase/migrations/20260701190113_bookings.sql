-- 12. BOOKINGS
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  car text,
  pickup text,
  drop_location text,
  date text,
  time text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.bookings enable row level security;
create policy "Allow authenticated users to read bookings" on public.bookings for select to authenticated using (true);
create policy "Allow public to insert bookings" on public.bookings for insert with check (true);
create policy "Allow authenticated users to manage bookings" on public.bookings for all to authenticated using (true);
