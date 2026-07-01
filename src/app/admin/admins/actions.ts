'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function getAdmins() {
  const supabase = createAdminClient();
  
  // Get all users from auth.users via admin API
  const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError) {
    console.error('Error fetching users:', usersError);
    throw new Error('Failed to fetch users');
  }

  // Get all user_roles
  const { data: rolesData, error: rolesError } = await supabase
    .from('user_roles')
    .select('*');

  if (rolesError) {
    console.error('Error fetching roles:', rolesError);
    throw new Error('Failed to fetch roles');
  }

  // Combine data: only return users who have an entry in user_roles (i.e., they are admins or superadmins)
  const roleMap = new Map(rolesData.map(r => [r.user_id, r.role]));
  
  const admins = usersData.users
    .filter(u => roleMap.has(u.id))
    .map(u => ({
      id: u.id,
      email: u.email,
      role: roleMap.get(u.id),
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at
    }));

  return admins;
}

export async function createAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  if (!email || !password || !role) {
    throw new Error('Missing required fields');
  }

  const supabase = createAdminClient();

  // Create user in auth.users
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true // auto-confirm since it's created by superadmin
  });

  if (authError) {
    console.error('Error creating user:', authError);
    throw new Error(authError.message);
  }

  const userId = authData.user.id;

  // Assign role
  const { error: roleError } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role });

  if (roleError) {
    // Attempt rollback if role assignment fails
    await supabase.auth.admin.deleteUser(userId);
    console.error('Error assigning role:', roleError);
    throw new Error('Failed to assign role, user creation rolled back.');
  }

  revalidatePath('/admin/admins');
  return { success: true };
}

export async function deleteAdmin(userId: string) {
  const supabase = createAdminClient();

  // Deleting from auth.users should automatically cascade to user_roles due to foreign key constraints,
  // but if not, Supabase admin API deletes the auth.users record.
  const { error } = await supabase.auth.admin.deleteUser(userId);
  
  if (error) {
    console.error('Error deleting user:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/admins');
  return { success: true };
}
