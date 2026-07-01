-- 8. CLIENT LOGOS
create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.client_logos enable row level security;
create policy "Allow public read access on client_logos" on public.client_logos for select using (true);
create policy "Allow authenticated users to manage client_logos" on public.client_logos for all to authenticated using (true);
