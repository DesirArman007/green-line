-- 14. CONTACT ENQUIRIES
create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service_type text,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.contact_enquiries enable row level security;
create policy "Allow authenticated users to read contact_enquiries" on public.contact_enquiries for select to authenticated using (true);
create policy "Allow public to insert contact_enquiries" on public.contact_enquiries for insert with check (true);
create policy "Allow authenticated users to manage contact_enquiries" on public.contact_enquiries for all to authenticated using (true);
