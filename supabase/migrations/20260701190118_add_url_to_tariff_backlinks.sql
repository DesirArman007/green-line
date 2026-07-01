-- 7b. Add url to TARIFF BACKLINKS
alter table public.tariff_backlinks add column link_url text default '#booking' not null;
