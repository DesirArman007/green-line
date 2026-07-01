-- 16. USER ROLES (RBAC)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('admin', 'superadmin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

alter table public.user_roles enable row level security;

-- Superadmins can read all roles, admins can read their own role
create policy "Users can read own role or superadmins can read all" on public.user_roles for select to authenticated using (
  auth.uid() = user_id or exists (
    select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'superadmin'
  )
);

-- Only superadmins can insert/update/delete roles
create policy "Superadmins can manage roles" on public.user_roles for all to authenticated using (
  exists (
    select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'superadmin'
  )
);
