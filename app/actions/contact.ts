'use server'

import { contactSchema, type ContactFormData } from '@/lib/schemas'

export async function submitContact(data: ContactFormData) {
  const result = contactSchema.safeParse(data)
  if (!result.success) {
    return { success: false as const, error: 'Invalid form data' }
  }
  return { success: true as const }
}
