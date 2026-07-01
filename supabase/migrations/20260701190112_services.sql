-- 11. SERVICES
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  icon_svg text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.services enable row level security;
create policy "Allow public read access on services" on public.services for select using (true);
create policy "Allow authenticated users to manage services" on public.services for all to authenticated using (true);
