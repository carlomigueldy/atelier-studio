'use server'

import { contactSchema, type ContactFormData } from '@/lib/schemas'

export async function submitContact(data: ContactFormData) {
  const result = contactSchema.safeParse(data)
  if (!result.success) {
    return { success: false as const, error: 'Invalid form data' }
  }
  // v1 stub — wire up email/persistence layer before production use
  return { success: true as const }
}
