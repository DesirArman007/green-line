-- 8. Add route_name to ROUTE PRICING
alter table public.route_pricing add column route_name text default 'VIJAYAWADA ⇄ HYDERABAD' not null;
