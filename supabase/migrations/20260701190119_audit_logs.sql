-- 15. AUDIT LOGS
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  action text not null, -- e.g., 'CREATE', 'UPDATE', 'DELETE'
  entity_type text not null, -- e.g., 'packages', 'blogs'
  entity_id text, -- ID of the record that was modified
  details jsonb, -- Additional context, like what fields changed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.audit_logs enable row level security;

-- Only superadmins can read audit logs
create policy "Allow superadmins to read audit_logs" on public.audit_logs for select to authenticated using (
  exists (
    select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'superadmin'
  )
);

-- Anyone authenticated can insert logs (since normal admins trigger actions that get logged)
create policy "Allow authenticated users to insert audit_logs" on public.audit_logs for insert to authenticated with check (true);
