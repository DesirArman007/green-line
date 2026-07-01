-- 13. PACKAGE ENQUIRIES
create table public.package_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  package_name text,
  destination text,
  duration text,
  vehicle text,
  price text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.package_enquiries enable row level security;
create policy "Allow authenticated users to read package_enquiries" on public.package_enquiries for select to authenticated using (true);
create policy "Allow public to insert package_enquiries" on public.package_enquiries for insert with check (true);
create policy "Allow authenticated users to manage package_enquiries" on public.package_enquiries for all to authenticated using (true);
