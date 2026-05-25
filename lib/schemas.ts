import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectTypes: z.array(z.string()).min(1, 'Please select at least one project type'),
  budget: z.number().min(5000, 'Minimum budget is $5,000'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(20, 'Please describe your project (at least 20 characters)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
