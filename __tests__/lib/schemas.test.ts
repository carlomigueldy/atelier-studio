import { contactSchema } from '@/lib/schemas'

const validData = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  projectTypes: ['Web App'],
  budget: 25000,
  timeline: 'Flexible',
  message: 'We need a custom dashboard with reporting features for our logistics company.',
}

describe('contactSchema', () => {
  it('accepts valid complete data', () => {
    expect(contactSchema.safeParse(validData).success).toBe(true)
  })

  it('accepts data without optional company and phone', () => {
    const data = { ...validData, company: undefined, phone: undefined }
    expect(contactSchema.safeParse(data).success).toBe(true)
  })

  it('rejects name shorter than 2 characters', () => {
    const result = contactSchema.safeParse({ ...validData, name: 'J' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter your name')
    }
  })

  it('rejects invalid email format', () => {
    const result = contactSchema.safeParse({ ...validData, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address')
    }
  })

  it('rejects empty projectTypes array', () => {
    const result = contactSchema.safeParse({ ...validData, projectTypes: [] })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please select at least one project type')
    }
  })

  it('rejects budget below minimum', () => {
    const result = contactSchema.safeParse({ ...validData, budget: 1000 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Minimum budget is $5,000')
    }
  })

  it('rejects message shorter than 20 characters', () => {
    const result = contactSchema.safeParse({ ...validData, message: 'Too short' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please describe your project (at least 20 characters)')
    }
  })
})
