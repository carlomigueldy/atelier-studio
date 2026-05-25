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
      {/* Story section */}
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

      {/* Team section */}
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
