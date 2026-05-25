'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { submitContact } from '@/app/actions/contact'

const PROJECT_TYPES = [
  'Web App',
  'Mobile App',
  'AI / Automation',
  'Design System',
  'Strategy Only',
  'Not Sure Yet',
]

const TIMELINES = [
  'ASAP',
  '1–3 months',
  '3–6 months',
  'Flexible',
]

const BUDGET_MIN = 5000
const BUDGET_MAX = 150000

function formatBudget(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectTypes: [],
      budget: 25000,
      timeline: 'Flexible',
    },
  })

  const budgetValue = watch('budget', 25000)

  async function onSubmit(data: ContactFormData) {
    const result = await submitContact(data)
    if (result.success) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <h2 className="font-serif text-3xl text-linen mb-4">Message received</h2>
        <p className="text-linen-dim mb-8">
          Thank you for reaching out. We will be in touch within 1–2 business days.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-copper text-linen rounded font-sans text-sm hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Personal details */}
      <div className="space-y-5">
        <h2 className="font-serif text-[22px] text-linen border-b border-border pb-2">
          Your details
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-linen-dim">
              Your name <span className="text-copper">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="bg-bg-subtle border border-border rounded px-4 py-2.5 text-linen placeholder:text-linen-dim/40 focus:outline-none focus:border-border-focus"
              placeholder="Jane Smith"
              {...register('name')}
            />
            {errors.name && (
              <p role="alert" className="text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="text-sm text-linen-dim">
              Company
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              className="bg-bg-subtle border border-border rounded px-4 py-2.5 text-linen placeholder:text-linen-dim/40 focus:outline-none focus:border-border-focus"
              placeholder="Acme Corp"
              {...register('company')}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-linen-dim">
              Email <span className="text-copper">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="bg-bg-subtle border border-border rounded px-4 py-2.5 text-linen placeholder:text-linen-dim/40 focus:outline-none focus:border-border-focus"
              placeholder="jane@acme.com"
              {...register('email')}
            />
            {errors.email && (
              <p role="alert" className="text-sm text-error">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm text-linen-dim">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className="bg-bg-subtle border border-border rounded px-4 py-2.5 text-linen placeholder:text-linen-dim/40 focus:outline-none focus:border-border-focus"
              placeholder="+1 555 000 0000"
              {...register('phone')}
            />
          </div>
        </div>
      </div>

      {/* Project details */}
      <div className="space-y-5">
        <h2 className="font-serif text-[22px] text-linen border-b border-border pb-2">
          Project enquiry
        </h2>

        {/* Project types */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-linen-dim">
            Project type <span className="text-copper">*</span>
          </span>
          <Controller
            name="projectTypes"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((type) => {
                  const selected = field.value.includes(type)
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        if (selected) {
                          field.onChange(field.value.filter((v: string) => v !== type))
                        } else {
                          field.onChange([...field.value, type])
                        }
                      }}
                      className={`px-4 py-2 rounded text-sm border transition-colors ${
                        selected
                          ? 'bg-copper text-linen border-copper'
                          : 'bg-bg-subtle text-linen-dim border-border hover:border-border-focus'
                      }`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            )}
          />
          {errors.projectTypes && (
            <p role="alert" className="text-sm text-error">{errors.projectTypes.message}</p>
          )}
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm text-linen-dim">
            Budget <span className="text-copper">*</span>
            <span className="ml-2 text-linen">{formatBudget(budgetValue)}</span>
          </label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <input
                id="budget"
                type="range"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={1000}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                aria-valuemin={BUDGET_MIN}
                aria-valuemax={BUDGET_MAX}
                aria-valuenow={field.value}
                className="w-full accent-copper"
              />
            )}
          />
          <div className="flex justify-between text-xs text-linen-dim">
            <span>{formatBudget(BUDGET_MIN)}</span>
            <span>{formatBudget(BUDGET_MAX)}+</span>
          </div>
          {errors.budget && (
            <p className="text-sm text-error">{errors.budget.message}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm text-linen-dim">
            Timeline <span className="text-copper">*</span>
          </label>
          <select
            id="timeline"
            className="bg-bg-subtle border border-border rounded px-4 py-2.5 text-linen focus:outline-none focus:border-border-focus"
            {...register('timeline')}
          >
            <option value="">Select a timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.timeline && (
            <p className="text-sm text-error">{errors.timeline.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm text-linen-dim">
            Tell us about your project <span className="text-copper">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className="bg-bg-subtle border border-border rounded px-4 py-2.5 text-linen placeholder:text-linen-dim/40 focus:outline-none focus:border-border-focus resize-none"
            placeholder="Describe what you're looking to build, any existing systems, and your goals..."
            {...register('message')}
          />
          {errors.message && (
            <p role="alert" className="text-sm text-error">{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3 bg-copper text-linen font-sans text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
