'use client'

import { useState } from 'react'
import { Eyebrow } from '@/components/shared/eyebrow'
import { FilterTabs } from '@/components/work/filter-tabs'
import { CaseCard, type CaseCardProps } from '@/components/work/case-card'

const FILTERS = ['All', 'Web', 'Mobile', 'AI']

type CaseStudy = Omit<CaseCardProps, 'span'> & {
  span: CaseCardProps['span']
  category: string
}

const CASES: CaseStudy[] = [
  {
    id: 1,
    client: 'Meridian Health',
    title: 'A patient portal that made healthcare feel human',
    emphasisWord: 'human',
    tags: ['Web', 'UX Strategy'],
    results: [
      { num: '4.8★', label: 'App rating' },
      { num: '+63%', label: 'Engagement' },
      { num: '2.1M', label: 'Active users' },
    ],
    span: 'featured',
    category: 'Web',
  },
  {
    id: 2,
    client: 'Lyra Finance',
    title: 'Banking made beautifully simple',
    emphasisWord: 'beautifully',
    tags: ['Mobile', 'Fintech'],
    results: [
      { num: '98%', label: 'Retention' },
      { num: '0.9s', label: 'Load time' },
    ],
    span: 'side',
    category: 'Mobile',
  },
  {
    id: 3,
    client: 'Veridian AI',
    title: 'An AI copilot that thinks before you do',
    emphasisWord: 'thinks',
    tags: ['AI', 'SaaS'],
    results: [
      { num: '10×', label: 'Faster output' },
      { num: '$2.4M', label: 'ARR added' },
    ],
    span: 'half',
    category: 'AI',
  },
  {
    id: 4,
    client: 'Nomad Studio',
    title: 'A creative OS built for remote teams',
    emphasisWord: 'creative',
    tags: ['Web', 'Productivity'],
    results: [
      { num: '50K', label: 'Teams onboarded' },
      { num: '+41%', label: 'NPS uplift' },
    ],
    span: 'half',
    category: 'Web',
  },
]

export default function WorkPage() {
  const [active, setActive] = useState('All')

  const visible = active === 'All' ? CASES : CASES.filter((c) => c.category === active)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-16 lg:px-24 pt-24 pb-14">
        <Eyebrow text="Our Work" />
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-linen leading-tight max-w-2xl mb-10" style={{ letterSpacing: '-0.5px' }}>
          Projects that move<br />
          <em className="text-sage" style={{ fontStyle: 'italic' }}>people forward</em>
        </h1>
        <FilterTabs filters={FILTERS} active={active} onChange={setActive} />
      </section>

      {/* Grid */}
      <section
        className="grid grid-cols-12 gap-px bg-border border-b border-border"
        aria-label="Case studies"
      >
        {visible.map((c) => (
          <CaseCard
            key={c.id}
            id={c.id}
            client={c.client}
            title={c.title}
            emphasisWord={c.emphasisWord}
            tags={c.tags}
            results={c.results}
            span={c.span}
          />
        ))}
      </section>

      {/* Footer CTA */}
      <div className="px-6 md:px-16 lg:px-24 py-16 flex items-center gap-6">
        <hr className="flex-1 border-border" />
        <a
          href="/contact"
          className="text-[11px] font-medium tracking-[2px] uppercase text-copper hover:text-linen transition-colors whitespace-nowrap"
        >
          View All Case Studies
        </a>
        <hr className="flex-1 border-border" />
      </div>
    </div>
  )
}
