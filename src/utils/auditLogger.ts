import { createClient } from '@/utils/supabase/client';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

export async function logAuditAction(
  action: AuditAction,
  entityType: string,
  entityId: string,
  userEmail: string | undefined,
  details?: any
) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from('audit_logs').insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      user_email: userEmail || 'unknown',
      details,
    });

    if (error) {
      console.error('Failed to insert audit log:', error);
    }
  } catch (err) {
    console.error('Exception during audit logging:', err);
  }
}
