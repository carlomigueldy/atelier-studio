# Agency Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-service software agency marketing site with 4 pages (Hero, Portfolio, About, Contact) using Next.js App Router, Tailwind CSS v4, shadcn/ui, TypeScript, react-hook-form, and zod.

**Architecture:** App Router with 4 routes (`/`, `/work`, `/about`, `/contact`). Each page is a Server Component wrapping feature-specific components; the contact form is the only Client Component. A single server action handles form submission. Design tokens live exclusively in `globals.css` via Tailwind v4's `@theme` directive — no `tailwind.config.ts` needed.

**Tech Stack:** Next.js 15, Tailwind CSS v4, shadcn/ui (cn utility + Form), TypeScript, react-hook-form, @hookform/resolvers/zod, zod, Playfair Display + DM Sans via next/font/google, Jest + @testing-library/react.

**Design Spec:** `docs/superpowers/specs/2026-05-25-agency-website-design.md`

---

## File Map

```
app/
  layout.tsx                    root layout — fonts, Nav, metadata
  globals.css                   @import tailwindcss + @theme tokens
  page.tsx                      / — renders <Hero />
  work/page.tsx                 /work — portfolio grid
  about/page.tsx                /about — story + team
  contact/page.tsx              /contact — info panel + <ContactForm />
  actions/contact.ts            'use server' — submitContact()

components/
  layout/nav.tsx                site navigation
  shared/eyebrow.tsx            reusable eyebrow label
  home/hero.tsx                 hero split-grid + stats
  home/ticker.tsx               capability tag ticker bar
  work/case-card.tsx            portfolio card (featured/side/half spans)
  work/filter-tabs.tsx          All/Web/Mobile/AI filter
  about/page.tsx                story + team — combined (no separate files needed)
  contact/contact-form.tsx      'use client' — react-hook-form + zod form

lib/
  schemas.ts                    contactSchema + ContactFormData type
  utils.ts                      cn() helper (shadcn/ui)

__tests__/
  lib/schemas.test.ts           unit tests for contactSchema
  components/contact/contact-form.test.tsx   RTL integration tests
```

---

## Task 1: Bootstrap project & install dependencies

**Files:**
- Create: `postcss.config.mjs`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `components.json` (shadcn/ui)

- [ ] **Step 1: Scaffold Next.js app (no Tailwind — we install v4 manually)**

```bash
npx create-next-app@latest . \
  --typescript \
  --eslint \
  --no-src-dir \
  --app \
  --no-tailwind \
  --import-alias "@/*" \
  --yes
```

Expected: Project scaffolded. `app/`, `package.json`, `tsconfig.json` present.

- [ ] **Step 2: Install Tailwind v4 and app dependencies**

```bash
npm install tailwindcss @tailwindcss/postcss
npm install zod react-hook-form @hookform/resolvers
```

Expected: No errors. `tailwindcss` version `^4.x` in `node_modules`.

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event \
  @types/jest
```

- [ ] **Step 4: Configure PostCSS for Tailwind v4**

`postcss.config.mjs`:
```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

- [ ] **Step 5: Configure Jest**

`jest.config.ts`:
```ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default createJestConfig(config)
```

`jest.setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
```

- [ ] **Step 7: Init shadcn/ui**

```bash
npx shadcn@latest init --yes
```

When prompted (or accepting defaults):
- Style: Default
- Base color: Stone
- CSS variables: Yes
- `globals.css` path: `app/globals.css`

Expected: `components/ui/` directory created, `components.json` written, `lib/utils.ts` with `cn()` created.

- [ ] **Step 8: Verify setup**

```bash
npm run build 2>&1 | tail -5
```

Expected: Build succeeds (may show warnings about missing styles — resolved in Task 2).

- [ ] **Step 9: Update .gitignore**

Add to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: bootstrap Next.js project with Tailwind v4, shadcn/ui, and Jest"
```

---

## Task 2: Design system — globals.css + Tailwind v4 tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with design system tokens**

`app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg:           #1a2e28;
  --color-bg-subtle:    #1f3830;
  --color-bg-hover:     #243f38;
  --color-linen:        #f4ede3;
  --color-linen-dim:    #c4b9ab;
  --color-copper:       #c8874a;
  --color-sage:         #7aaa8e;
  --color-border:       rgba(244, 237, 227, 0.1);
  --color-border-focus: rgba(200, 135, 74, 0.5);
  --color-error:        #e07a5f;

  /* Fonts — variables injected by next/font at runtime */
  --font-serif: var(--font-playfair), Georgia, serif;
  --font-sans:  var(--font-dm-sans), system-ui, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-linen);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Verify Tailwind token classes resolve**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | grep -c "html" || true
kill %1
```

Expected: Server starts without CSS errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add Forest & Linen design system tokens via Tailwind v4 @theme"
```

---

## Task 3: Root layout + fonts + navigation

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/layout/nav.tsx`
- Create: `components/shared/eyebrow.tsx`

- [ ] **Step 1: Write the shared Eyebrow component**

`components/shared/eyebrow.tsx`:
```tsx
type EyebrowProps = { text: string }

export function Eyebrow({ text }: EyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-7 h-px bg-sage" aria-hidden="true" />
      <span className="text-[10px] font-medium tracking-[3px] uppercase text-sage">{text}</span>
    </div>
  )
}
```

- [ ] **Step 2: Write the Nav component**

`components/layout/nav.tsx`:
```tsx
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  return (
    <nav
      className="flex items-center justify-between px-6 lg:px-[60px] py-7 border-b border-border"
      aria-label="Main navigation"
    >
      <Link href="/" className="font-serif text-xl font-bold text-linen hover:opacity-90 transition-opacity">
        Atelier<span className="text-copper" aria-hidden="true">.</span>
      </Link>

      <ul className="hidden md:flex items-center gap-10 list-none" role="list">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[13px] text-linen-dim hover:text-linen transition-colors tracking-[0.5px]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="bg-copper text-bg px-5 py-2.5 text-[12px] font-bold tracking-[1.5px] uppercase rounded-sm hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus"
      >
        Start a Project
      </Link>
    </nav>
  )
}
```

- [ ] **Step 3: Update root layout with fonts**

`app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Nav } from '@/components/layout/nav'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atelier Studio — Software Solutions Agency',
  description:
    'Full-service software agency offering Web, Mobile, and AI development for teams that need to ship fast and scale confidently.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-linen font-sans antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Remove the generated app/page.tsx placeholder and replace**

`app/page.tsx`:
```tsx
export default function HomePage() {
  return <div className="text-linen px-[60px] py-20">Hero coming in Task 6.</div>
}
```

- [ ] **Step 5: Verify fonts load**

```bash
npm run dev &
sleep 8
curl -s http://localhost:3000 | grep -i "playfair\|font" | head -3 || true
kill %1
```

Expected: No 500 errors. Page loads with green background.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx components/layout/nav.tsx components/shared/eyebrow.tsx
git commit -m "feat: add root layout with Playfair Display + DM Sans fonts and navigation"
```

---

## Task 4: Contact schema (TDD — tests first)

**Files:**
- Create: `lib/schemas.ts`
- Create: `__tests__/lib/schemas.test.ts`

- [ ] **Step 1: Write failing tests first**

`__tests__/lib/schemas.test.ts`:
```ts
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
      expect(result.error.errors[0].message).toBe('Please enter your name')
    }
  })

  it('rejects invalid email format', () => {
    const result = contactSchema.safeParse({ ...validData, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Please enter a valid email address')
    }
  })

  it('rejects empty projectTypes array', () => {
    const result = contactSchema.safeParse({ ...validData, projectTypes: [] })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Please select at least one project type')
    }
  })

  it('rejects budget below minimum', () => {
    const result = contactSchema.safeParse({ ...validData, budget: 1000 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Minimum budget is $5,000')
    }
  })

  it('rejects message shorter than 20 characters', () => {
    const result = contactSchema.safeParse({ ...validData, message: 'Too short' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Please describe your project (at least 20 characters)')
    }
  })
})
```

- [ ] **Step 2: Run tests — expect all FAIL**

```bash
npm test __tests__/lib/schemas.test.ts 2>&1 | tail -10
```

Expected: `Cannot find module '@/lib/schemas'` error — tests fail as expected.

- [ ] **Step 3: Implement the schema**

`lib/schemas.ts`:
```ts
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
```

- [ ] **Step 4: Run tests — expect all PASS**

```bash
npm test __tests__/lib/schemas.test.ts 2>&1 | tail -10
```

Expected:
```
Tests:       7 passed, 7 total
```

- [ ] **Step 5: Commit**

```bash
git add lib/schemas.ts __tests__/lib/schemas.test.ts
git commit -m "feat: add contact form zod schema with full validation"
```

---

## Task 5: Contact form component + server action

**Files:**
- Create: `app/actions/contact.ts`
- Create: `components/contact/contact-form.tsx`
- Create: `__tests__/components/contact/contact-form.test.tsx`

- [ ] **Step 1: Write failing component tests first**

`__tests__/components/contact/contact-form.test.tsx`:
```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/contact/contact-form'

jest.mock('@/app/actions/contact', () => ({
  submitContact: jest.fn().mockResolvedValue({ success: true }),
}))

describe('ContactForm', () => {
  it('renders all required field labels', () => {
    render(<ContactForm />)
    expect(screen.getByText(/your name/i)).toBeInTheDocument()
    expect(screen.getByText(/^email/i)).toBeInTheDocument()
    expect(screen.getByText(/tell us about your project/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send enquiry/i })).toBeInTheDocument()
  })

  it('shows name validation error on submit with empty name', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByText('Please enter your name')).toBeInTheDocument()
    })
  })

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/email/i), 'bad-email')
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('shows project type error when none selected on submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/your name/i), 'Jane Smith')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByText('Please select at least one project type')).toBeInTheDocument()
    })
  })

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/your name/i), 'Jane Smith')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: /web app/i }))
    await user.type(screen.getByLabelText(/tell us about your project/i), 'We need a custom analytics dashboard for our operations team.')
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      // h2 renders "Message\nreceived." — query by role to avoid brittle text splitting
      expect(screen.getByRole('heading', { name: /message.*received/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test __tests__/components/contact/contact-form.test.tsx 2>&1 | tail -10
```

Expected: `Cannot find module '@/components/contact/contact-form'` — fails as expected.

- [ ] **Step 3: Create the server action**

`app/actions/contact.ts`:
```ts
'use server'

import { contactSchema, type ContactFormData } from '@/lib/schemas'

export async function submitContact(data: ContactFormData) {
  const result = contactSchema.safeParse(data)
  if (!result.success) {
    return { success: false as const, error: 'Invalid form data' }
  }
  return { success: true as const }
}
```

- [ ] **Step 4: Create the contact form component**

`components/contact/contact-form.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
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
  'As soon as possible',
  '1–3 months',
  '3–6 months',
  '6+ months',
  'Flexible',
]

const BUDGET_MIN = 5000
const BUDGET_MAX = 250000

function formatBudget(value: number): string {
  return value >= BUDGET_MAX ? '$250,000+' : `$${value.toLocaleString()}`
}

const inputClass =
  'w-full bg-bg-subtle/60 border rounded-sm px-4 py-3.5 text-sm font-light text-linen placeholder:text-linen-dim/40 outline-none transition-colors'
const inputError = 'border-error'
const inputNormal = 'border-border focus:border-border-focus'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [budgetDisplay, setBudgetDisplay] = useState(25000)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectTypes: [], budget: 25000, timeline: 'Flexible' },
  })

  const selectedTypes = watch('projectTypes') ?? []
  const budgetValue = watch('budget') ?? 25000
  const budgetPct = ((budgetValue - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100

  function toggleType(type: string) {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    setValue('projectTypes', next, { shouldValidate: true })
  }

  async function onSubmit(data: ContactFormData) {
    const result = await submitContact(data)
    if (result.success) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-5">
        <div
          className="w-16 h-16 rounded-full border-2 border-sage flex items-center justify-center text-sage text-2xl mb-2"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2 className="font-serif text-[36px] font-normal text-linen leading-tight">
          Message<br />received.
        </h2>
        <p className="text-sm font-light text-linen-dim leading-[1.75] max-w-[320px]">
          Thank you for reaching out. One of our team will be in touch within one business day.
        </p>
        <div className="w-10 h-px bg-border" />
        <Link href="/" className="text-[11px] font-medium tracking-[2px] uppercase text-sage hover:text-linen transition-colors">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <h2 className="font-serif text-[22px] font-medium text-linen mb-2">Tell us about your project</h2>
        <p className="text-[13px] font-light text-linen-dim">
          Fields marked <span className="text-copper">*</span> are required.
        </p>
      </div>

      {/* Project type pills */}
      <div className="mb-8">
        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim mb-3">
          Project Type <span className="text-copper">*</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Project type selection">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              aria-pressed={selectedTypes.includes(type)}
              className={`px-4 py-2 rounded-sm text-[11px] font-medium tracking-[1px] uppercase border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus ${
                selectedTypes.includes(type)
                  ? 'bg-copper/15 border-copper text-copper'
                  : 'bg-transparent border-border text-linen-dim hover:border-linen/25 hover:text-linen'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.projectTypes && (
          <p className="text-[11px] text-error mt-2 flex items-center gap-1.5" role="alert">
            ⚠ {errors.projectTypes.message}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim">
              Your Name <span className="text-copper">*</span>
            </label>
            <input
              id="name"
              {...register('name')}
              placeholder="Jane Smith"
              className={`${inputClass} ${errors.name ? inputError : inputNormal}`}
            />
            {errors.name && (
              <p className="text-[11px] text-error flex items-center gap-1.5" role="alert">⚠ {errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim">
              Company
            </label>
            <input
              id="company"
              {...register('company')}
              placeholder="Acme Inc."
              className={`${inputClass} ${inputNormal}`}
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim">
              Email <span className="text-copper">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="jane@example.com"
              className={`${inputClass} ${errors.email ? inputError : inputNormal}`}
            />
            {errors.email && (
              <p className="text-[11px] text-error flex items-center gap-1.5" role="alert">⚠ {errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+1 (555) 000-0000"
              className={`${inputClass} ${inputNormal}`}
            />
          </div>
        </div>

        {/* Budget slider */}
        <div className="mb-5">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim mb-2">
            Estimated Budget <span className="text-copper">*</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif text-xl font-bold text-copper">{formatBudget(budgetDisplay)}</span>
            <span className="text-[11px] text-linen-dim tracking-[0.5px]">$5k — $250k+</span>
          </div>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <div
                className="w-full h-0.5 bg-border rounded-sm relative mb-5 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                  const value = Math.round(BUDGET_MIN + pct * (BUDGET_MAX - BUDGET_MIN))
                  field.onChange(value)
                  setBudgetDisplay(value)
                }}
                role="slider"
                aria-valuenow={field.value}
                aria-valuemin={BUDGET_MIN}
                aria-valuemax={BUDGET_MAX}
                aria-label="Estimated budget"
                tabIndex={0}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-sm pointer-events-none"
                  style={{
                    width: `${budgetPct}%`,
                    background: 'linear-gradient(to right, var(--color-sage), var(--color-copper))',
                  }}
                />
                <div
                  className="absolute top-1/2 w-3.5 h-3.5 rounded-full bg-copper border-2 border-bg -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${budgetPct}%`, boxShadow: '0 0 0 2px var(--color-copper)' }}
                />
              </div>
            )}
          />
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="timeline" className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim">
            Timeline
          </label>
          <select
            id="timeline"
            {...register('timeline')}
            className={`${inputClass} ${inputNormal} cursor-pointer appearance-none`}
          >
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="message" className="text-[10px] font-semibold tracking-[2px] uppercase text-linen-dim">
            Tell us about your project <span className="text-copper">*</span>
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            placeholder="Describe what you're building, who it's for, and what success looks like…"
            className={`${inputClass} ${errors.message ? inputError : inputNormal} resize-none leading-relaxed`}
          />
          {errors.message && (
            <p className="text-[11px] text-error flex items-center gap-1.5" role="alert">⚠ {errors.message.message}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border mt-2">
          <p className="text-[11px] font-light text-linen-dim max-w-[220px] leading-relaxed">
            By submitting, you agree to our{' '}
            <a href="#" className="text-sage hover:text-linen transition-colors">Privacy Policy</a>.
            We never share your details.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-copper text-bg px-9 py-3.5 rounded-sm text-[12px] font-bold tracking-[2px] uppercase flex items-center gap-2.5 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus"
          >
            {isSubmitting ? 'Sending…' : 'Send Enquiry'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test __tests__/components/contact/contact-form.test.tsx 2>&1 | tail -10
```

Expected:
```
Tests:       5 passed, 5 total
```

- [ ] **Step 6: Commit**

```bash
git add app/actions/contact.ts components/contact/contact-form.tsx __tests__/components/contact/contact-form.test.tsx
git commit -m "feat: add contact form with react-hook-form, zod validation, and server action"
```

---

## Task 6: Hero page

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/ticker.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the Ticker component**

`components/home/ticker.tsx`:
```tsx
const ITEMS = [
  'Web Applications',
  'Mobile Development',
  'AI & Automation',
  'Product Strategy',
  'Design Systems',
  'API Architecture',
  'Cloud Infrastructure',
  'Startup to Enterprise',
]

export function Ticker() {
  return (
    <div
      className="border-t border-border px-6 lg:px-[60px] py-3.5 flex items-center gap-12 overflow-x-auto whitespace-nowrap"
      aria-label="Capabilities"
    >
      {ITEMS.map((item) => (
        <div key={item} className="flex items-center gap-3 flex-shrink-0">
          <div className="w-1 h-1 rounded-full bg-copper flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-[2px] uppercase text-linen-dim">{item}</span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create the Hero component**

`components/home/hero.tsx`:
```tsx
import Link from 'next/link'
import { Eyebrow } from '@/components/shared/eyebrow'
import { Ticker } from './ticker'

const SERVICES = [
  { num: '01', name: 'Web Applications', desc: 'Scalable products built with modern frameworks, designed to perform.' },
  { num: '02', name: 'Mobile Development', desc: 'Native and cross-platform apps that users actually love to use.' },
  { num: '03', name: 'AI & Automation', desc: 'Intelligent features and workflows that create genuine competitive edge.' },
  { num: '04', name: 'Product Strategy', desc: 'From concept to roadmap — we think like founders, not just engineers.' },
]

const STATS = [
  { num: '120+', label: 'Projects Delivered' },
  { num: '8yr', label: 'In Practice' },
  { num: '94%', label: 'Clients Return' },
]

export function Hero() {
  return (
    <>
      <section
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-97px)] relative overflow-hidden"
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(200,135,74,0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 60% at 10% 80%, rgba(122,170,142,0.08) 0%, transparent 60%)',
          ].join(', '),
        }}
      >
        {/* Left */}
        <div className="flex flex-col justify-center px-6 py-20 lg:px-[60px] relative z-10">
          <Eyebrow text="Full-Service Software Agency" />

          <h1
            className="font-serif font-normal text-linen leading-[1.08] mb-7"
            style={{ fontSize: 'clamp(44px, 5vw, 72px)', letterSpacing: '-1px' }}
          >
            We craft software<br />
            that{' '}
            <em className="text-sage" style={{ fontStyle: 'italic' }}>scales</em>
            {' '}with<br />
            <strong className="font-bold">your ambition.</strong>
          </h1>

          <p className="text-linen-dim font-light text-base leading-[1.75] max-w-[420px] mb-12">
            From early-stage product to enterprise platform — we design, build, and ship software that drives real business outcomes. Web, mobile, and AI, done properly.
          </p>

          <div className="flex items-center gap-8 flex-wrap">
            <Link
              href="/contact"
              className="bg-copper text-bg px-8 py-3.5 text-xs font-bold tracking-[2px] uppercase rounded-sm hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus"
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              className="text-sm text-linen-dim flex items-center gap-2 hover:text-linen transition-colors"
            >
              See our work <span className="text-sage" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="flex gap-10 mt-[72px] pt-10 border-t border-border flex-wrap">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-[32px] font-bold text-linen leading-none mb-1.5">{s.num}</div>
                <div className="text-[11px] font-normal text-linen-dim tracking-[1px] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — services list */}
        <div
          id="services"
          className="relative border-t lg:border-t-0 lg:border-l border-border overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full px-6 py-16 lg:px-[50px]">
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-sage mb-8">
              What we do
            </div>
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className={`flex items-start gap-5 py-6 border-b border-border group cursor-pointer ${i === 0 ? 'border-t' : ''}`}
              >
                <div className="font-serif text-[13px] text-sage opacity-60 pt-0.5 min-w-[28px]">
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="font-serif text-xl font-medium text-linen mb-1.5 group-hover:text-copper transition-colors">
                    {s.name}
                  </div>
                  <div className="text-xs font-light text-linen-dim leading-relaxed">{s.desc}</div>
                </div>
                <div
                  className="text-lg text-border pt-1 group-hover:text-copper group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                >
                  →
                </div>
              </div>
            ))}
          </div>
          <div
            className="absolute bottom-[-20px] right-[-10px] font-serif font-black leading-none pointer-events-none select-none"
            style={{ fontSize: '220px', color: 'rgba(122,170,142,0.04)' }}
            aria-hidden="true"
          >
            IV
          </div>
        </div>
      </section>
      <Ticker />
    </>
  )
}
```

- [ ] **Step 3: Update app/page.tsx**

`app/page.tsx`:
```tsx
import { Hero } from '@/components/home/hero'

export default function HomePage() {
  return <Hero />
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000 — verify: green background, serif headline, copper CTA, services list on right, ticker bar at bottom.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/home/hero.tsx components/home/ticker.tsx
git commit -m "feat: add hero section with split layout, services panel, and ticker"
```

---

## Task 7: Portfolio page

**Files:**
- Create: `components/work/case-card.tsx`
- Create: `components/work/filter-tabs.tsx`
- Create: `app/work/page.tsx`

- [ ] **Step 1: Create the FilterTabs component**

`components/work/filter-tabs.tsx`:
```tsx
'use client'

type FilterTabsProps = {
  filters: string[]
  active: string
  onChange: (filter: string) => void
}

export function FilterTabs({ filters, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter case studies">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          aria-pressed={active === f}
          className={`px-4 py-2 rounded-sm text-[11px] font-medium tracking-[1.5px] uppercase border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus ${
            active === f
              ? 'bg-copper text-bg border-copper'
              : 'bg-transparent text-linen-dim border-border hover:border-linen/25 hover:text-linen'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create the CaseCard component**

`components/work/case-card.tsx`:
```tsx
type CaseResult = { num: string; label: string }

export type CaseCardProps = {
  id: number
  client: string
  title: string
  emphasisWord: string
  tags: string[]
  results: CaseResult[]
  span: 'featured' | 'side' | 'half'
}

const SPAN_CLASSES: Record<CaseCardProps['span'], string> = {
  featured: 'col-span-12 lg:col-span-8',
  side:     'col-span-12 lg:col-span-4',
  half:     'col-span-12 lg:col-span-6',
}

const ASPECT_CLASSES: Record<CaseCardProps['span'], string> = {
  featured: 'aspect-video',
  side:     'aspect-[4/3]',
  half:     'aspect-video',
}

export function CaseCard({ client, title, emphasisWord, tags, results, span }: CaseCardProps) {
  const [before, after] = title.split(emphasisWord)

  return (
    <article className={`${SPAN_CLASSES[span]} bg-bg hover:bg-bg-hover transition-colors group cursor-pointer`}>
      <div className={`${ASPECT_CLASSES[span]} bg-bg-subtle relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-bg-hover to-bg opacity-80" aria-hidden="true" />
        <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap z-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold tracking-[2px] uppercase px-2.5 py-1 rounded-sm bg-bg/80 border border-border text-sage backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="absolute bottom-[-10px] right-[-5px] font-serif font-black leading-none pointer-events-none select-none"
          style={{ fontSize: '100px', color: 'rgba(244,237,227,0.04)' }}
          aria-hidden="true"
        >
          {String(tags.length).padStart(2, '0')}
        </div>
      </div>

      <div className="p-7 lg:p-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-medium tracking-[2px] uppercase text-copper">{client}</span>
          <span
            className="text-lg text-border group-hover:text-copper group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        <h3
          className="font-serif text-xl lg:text-2xl font-medium text-linen leading-tight mb-3"
          style={{ letterSpacing: '-0.2px' }}
        >
          {before}
          <em className="text-sage" style={{ fontStyle: 'italic' }}>{emphasisWord}</em>
          {after}
        </h3>

        {results.length > 0 && (
          <div className="flex gap-6 flex-wrap pt-5 border-t border-border mt-4">
            {results.map((r) => (
              <div key={r.label}>
                <div className="font-serif text-xl font-bold text-linen leading-none mb-1">{r.num}</div>
                <div className="text-[10px] font-normal tracking-[1px] uppercase text-linen-dim">{r.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Create the Work page**

`app/work/page.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { Eyebrow } from '@/components/shared/eyebrow'
import { CaseCard, type CaseCardProps } from '@/components/work/case-card'
import { FilterTabs } from '@/components/work/filter-tabs'

type CaseStudy = CaseCardProps & { filter: string[] }

const CASES: CaseStudy[] = [
  {
    id: 1,
    client: 'FinTech Startup — Series B',
    title: 'An AI-powered analytics platform that turned data into decisions.',
    emphasisWord: 'decisions',
    tags: ['Web App', 'AI'],
    results: [
      { num: '3.2×', label: 'User Retention' },
      { num: '14wk', label: 'To Launch' },
      { num: '$12M', label: 'Series B Raised After' },
    ],
    span: 'featured',
    filter: ['Web', 'AI'],
  },
  {
    id: 2,
    client: 'Health & Wellness — SMB',
    title: 'Wellness app with 40k users at launch.',
    emphasisWord: '40k',
    tags: ['Mobile'],
    results: [
      { num: '4.8★', label: 'App Store' },
      { num: '40k', label: 'Day-1 Users' },
    ],
    span: 'side',
    filter: ['Mobile'],
  },
  {
    id: 3,
    client: 'Logistics Corp — Enterprise',
    title: 'Supply chain platform rebuilt from the ground up.',
    emphasisWord: 'rebuilt',
    tags: ['Enterprise', 'Web'],
    results: [],
    span: 'half',
    filter: ['Web'],
  },
  {
    id: 4,
    client: 'E-Commerce — Scale-up',
    title: 'AI automation that cut ops costs by 60%.',
    emphasisWord: '60%',
    tags: ['AI', 'Automation'],
    results: [],
    span: 'half',
    filter: ['AI'],
  },
]

const FILTERS = ['All', 'Web', 'Mobile', 'AI']

export default function WorkPage() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? CASES : CASES.filter((c) => c.filter.includes(active))

  return (
    <div>
      <div className="flex items-end justify-between px-6 lg:px-[60px] pt-[80px] pb-12 border-b border-border flex-wrap gap-6">
        <div>
          <Eyebrow text="Selected Work" />
          <h1
            className="font-serif font-normal text-linen"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.5px', lineHeight: '1.1' }}
          >
            Projects that{' '}
            <em className="text-copper" style={{ fontStyle: 'italic' }}>move</em>
            <br />the needle.
          </h1>
        </div>
        <FilterTabs filters={FILTERS} active={active} onChange={setActive} />
      </div>

      <div className="grid grid-cols-12 gap-px bg-border border-b border-border">
        {visible.map((c) => (
          <CaseCard key={c.id} {...c} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 px-6 lg:px-[60px] py-10">
        <div className="flex-1 h-px bg-border" aria-hidden="true" />
        <a
          href="#"
          className="text-[11px] font-semibold tracking-[2.5px] uppercase text-linen-dim border border-border px-7 py-3 rounded-sm hover:border-copper hover:text-copper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus"
        >
          View All Case Studies
        </a>
        <div className="flex-1 h-px bg-border" aria-hidden="true" />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify in browser**

Navigate to http://localhost:3000/work — verify: asymmetric grid, filter tabs change visible cards, hover lifts card background, copper arrow on hover.

- [ ] **Step 5: Commit**

```bash
git add app/work/page.tsx components/work/case-card.tsx components/work/filter-tabs.tsx
git commit -m "feat: add portfolio page with asymmetric grid and filter tabs"
```

---

## Task 8: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create the About page**

`app/about/page.tsx`:
```tsx
import { Eyebrow } from '@/components/shared/eyebrow'

const VALUES = [
  { num: '01', title: 'Craft over velocity', desc: 'We ship fast, but never at the cost of quality. Shortcuts cost more in the long run.' },
  { num: '02', title: 'Partners, not vendors', desc: 'We think like co-founders. Your success is a direct measure of ours.' },
  { num: '03', title: 'Honest over comfortable', desc: "We'll tell you when an idea needs rethinking. That's what good partners do." },
]

const TEAM = [
  {
    initials: 'JM',
    name: 'James Mercer',
    role: 'Founder & CEO',
    bio: '10 years building products at scale. Ex-Stripe, ex-Vercel. Believes deeply in the power of taste in engineering.',
    tags: ['Strategy', 'Product'],
    accent: 'copper' as const,
  },
  {
    initials: 'SR',
    name: 'Sofia Reyes',
    role: 'Head of Engineering',
    bio: 'Systems thinker and distributed systems specialist. Obsessed with reliability and developer experience.',
    tags: ['Backend', 'Infra'],
    accent: 'sage' as const,
  },
  {
    initials: 'AK',
    name: 'Amir Khalid',
    role: 'Lead Designer',
    bio: 'Crafts interfaces where function and beauty are the same thing. 8 years across product and brand design.',
    tags: ['UI/UX', 'Design Systems'],
    accent: 'copper' as const,
  },
  {
    initials: 'NP',
    name: 'Nina Park',
    role: 'AI & ML Lead',
    bio: 'PhD in ML. Translates cutting-edge research into features that ship on time and work in production.',
    tags: ['AI/ML', 'Python'],
    accent: 'sage' as const,
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        <div className="px-6 py-[80px] lg:px-[60px] border-b lg:border-b-0 lg:border-r border-border">
          <Eyebrow text="Our Story" />
          <h1
            className="font-serif font-normal text-linen mb-8"
            style={{ fontSize: 'clamp(36px, 3.5vw, 52px)', letterSpacing: '-0.5px', lineHeight: '1.1' }}
          >
            Built by builders,<br />
            for{' '}
            <em className="text-copper" style={{ fontStyle: 'italic' }}>builders.</em>
          </h1>
          <div className="space-y-5">
            <p className="text-[15px] font-light text-linen-dim leading-[1.8]">
              Atelier was founded on a simple premise:{' '}
              <strong className="text-linen font-medium">great software requires both craft and conviction.</strong>{' '}
              Too many agencies optimize for billable hours. We optimize for outcomes.
            </p>
            <p className="text-[15px] font-light text-linen-dim leading-[1.8]">
              Since 2016, we've partnered with companies across every stage — from pre-seed startups shipping their first product to Fortune 500s modernizing decade-old infrastructure.
            </p>
          </div>
          <div className="mt-10">
            {VALUES.map((v) => (
              <div key={v.num} className="flex items-start gap-5 py-5 border-t border-border">
                <div className="font-serif text-[12px] text-copper opacity-80 pt-0.5 min-w-[24px]">{v.num}</div>
                <div>
                  <div className="font-serif text-[17px] font-medium text-linen mb-1">{v.title}</div>
                  <div className="text-[12px] font-light text-linen-dim leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-[80px] lg:px-[60px] flex flex-col justify-between relative overflow-hidden gap-12">
          <div>
            <div
              className="font-serif font-bold text-linen leading-none mb-2"
              style={{ fontSize: '100px', letterSpacing: '-4px' }}
              aria-label="8 or more years"
            >
              8<span className="text-copper" aria-hidden="true">+</span>
            </div>
            <div className="text-[12px] font-normal tracking-[2px] uppercase text-linen-dim">Years of craft</div>
          </div>

          <blockquote className="border border-border rounded-sm p-8 bg-bg-subtle/60 backdrop-blur-sm">
            <p className="font-serif text-[22px] font-normal italic text-linen leading-relaxed mb-4">
              "We don't measure success in lines of code or sprint velocity. We measure it in{' '}
              <em className="not-italic font-bold text-sage">outcomes</em> — growth, retention, revenue, and products people actually love."
            </p>
            <footer className="text-[11px] font-medium tracking-[2px] uppercase text-copper">
              — Founding Principle
            </footer>
          </blockquote>

          <div
            className="absolute bottom-[-30px] right-[-20px] font-serif font-black leading-none pointer-events-none select-none"
            style={{ fontSize: '160px', color: 'rgba(122,170,142,0.05)' }}
            aria-hidden="true"
          >
            VIII
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="px-6 py-[80px] lg:px-[60px] border-b border-border">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2
            className="font-serif font-normal text-linen"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.3px' }}
          >
            The people who<br />make it{' '}
            <em className="text-sage" style={{ fontStyle: 'italic' }}>happen.</em>
          </h2>
          <span className="text-[11px] font-medium tracking-[2px] uppercase text-linen-dim">
            12 across 4 time zones
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-bg hover:bg-bg-hover transition-colors p-7 lg:p-8 group"
            >
              <div className="w-14 h-14 rounded-sm border border-border bg-bg-subtle relative flex items-center justify-center mb-5 overflow-hidden">
                <span className="font-serif text-lg font-bold text-linen-dim" aria-hidden="true">
                  {member.initials}
                </span>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: member.accent === 'copper' ? 'var(--color-copper)' : 'var(--color-sage)' }}
                  aria-hidden="true"
                />
              </div>
              <div className="font-serif text-lg font-medium text-linen mb-1 group-hover:text-copper transition-colors" style={{ letterSpacing: '-0.2px' }}>
                {member.name}
              </div>
              <div className="text-[11px] font-medium tracking-[1.5px] uppercase text-copper mb-3.5">
                {member.role}
              </div>
              <p className="text-xs font-light text-linen-dim leading-relaxed mb-4">{member.bio}</p>
              <div className="flex gap-1.5 flex-wrap">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-semibold tracking-[1.5px] uppercase text-sage border border-sage/25 px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:3000/about — verify: story/manifesto split, values list with numbered items, 4-col team grid with hover states.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page with story, values, and team grid"
```

---

## Task 9: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create the Contact page**

`app/contact/page.tsx`:
```tsx
import { Eyebrow } from '@/components/shared/eyebrow'
import { ContactForm } from '@/components/contact/contact-form'

const CONTACT_DETAILS = [
  { icon: '✉', label: 'Email', value: 'hello@atelierstudio.co' },
  { icon: '◎', label: 'Location', value: 'Remote-first · Global team' },
  { icon: '◷', label: 'Office Hours', value: 'Mon – Fri, 9am – 6pm UTC' },
]

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] min-h-[calc(100vh-97px)]">
      {/* Left */}
      <div className="px-6 py-[80px] lg:px-[60px] border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between relative overflow-hidden">
        <div
          className="absolute bottom-[-80px] left-[-40px] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(122,170,142,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div>
          <Eyebrow text="Let's Talk" />
          <h1
            className="font-serif font-normal text-linen mb-6"
            style={{ fontSize: 'clamp(36px, 3.5vw, 52px)', letterSpacing: '-0.5px', lineHeight: '1.1' }}
          >
            Start your<br />
            next{' '}
            <em className="text-copper" style={{ fontStyle: 'italic' }}>great</em>
            <br />project.
          </h1>
          <p className="text-sm font-light text-linen-dim leading-[1.75] max-w-[340px] mb-12">
            Whether you have a fully-formed brief or just an idea on a napkin — we'd love to hear from you. We respond to every inquiry within one business day.
          </p>
          <div>
            {CONTACT_DETAILS.map((d) => (
              <div key={d.label} className="flex items-start gap-4 py-5 border-t border-border last:border-b">
                <div
                  className="w-9 h-9 border border-border rounded-sm flex items-center justify-center text-sm text-sage flex-shrink-0"
                  aria-hidden="true"
                >
                  {d.icon}
                </div>
                <div>
                  <div className="text-[10px] font-medium tracking-[2px] uppercase text-linen-dim mb-1">{d.label}</div>
                  <div className="text-[13px] text-linen">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2.5 mt-10 text-xs font-light text-linen-dim">
            <div
              className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0"
              style={{ boxShadow: '0 0 0 3px rgba(122,170,142,0.2)' }}
              aria-hidden="true"
            />
            We typically respond within 4 hours during business hours.
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="px-6 py-[80px] lg:px-[60px]">
        <ContactForm />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:3000/contact — verify: split layout, contact details, pulsing dot indicator, form renders correctly, submit shows success state.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: add contact page with info panel and lead form"
```

---

## Task 10: Responsive styles, accessibility, and final checks

**Files:**
- Modify: `components/layout/nav.tsx` (mobile menu consideration)
- Verify all pages at mobile viewport

- [ ] **Step 1: Run full test suite**

```bash
npm test 2>&1 | tail -15
```

Expected:
```
Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
```

- [ ] **Step 2: Verify responsive layouts at 375px**

In browser DevTools, set viewport to 375px width and navigate each page:
- `/` — hero stacks vertically, services below headline, stats wrap
- `/work` — cards stack to single column, filter tabs wrap
- `/about` — story stacks, team grid 2-col
- `/contact` — info panel stacks above form

Fix any layout overflow or text clipping by adding missing `sm:` or `lg:` prefixed classes.

- [ ] **Step 3: Verify focus-visible outlines**

Tab through `/contact` form — every interactive element (pills, inputs, select, submit button) must show a visible focus ring using `outline-2 outline-border-focus`.

- [ ] **Step 4: Add missing aria-labels to nav for mobile**

In `components/layout/nav.tsx`, add a mobile menu button stub (hidden on desktop, visible on mobile) so the nav is not empty on small screens:

```tsx
{/* After the <ul> */}
<button
  className="md:hidden text-linen-dim hover:text-linen transition-colors p-2"
  aria-label="Open navigation menu"
  aria-expanded="false"
>
  ☰
</button>
```

Note: Full mobile menu implementation is a v2 feature. The stub ensures accessibility compliance for the nav element.

- [ ] **Step 5: Build and check for TypeScript errors**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds with 0 TypeScript errors. Note: Any "prerendering" warnings for client components are expected behavior for `'use client'` pages.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete agency website — all 4 pages, responsive, accessible"
```

---

## Completion Checklist

- [ ] All 12 tests pass (`npm test`)
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] All 4 routes render at http://localhost:3000 (`/`, `/work`, `/about`, `/contact`)
- [ ] Contact form validates and shows success state on submit
- [ ] Forest & Linen design system applied consistently across all pages
- [ ] Playfair Display + DM Sans fonts load correctly
- [ ] Mobile layout correct at 375px viewport
- [ ] Focus-visible outlines present on all interactive elements
