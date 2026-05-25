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
        {/* Left panel */}
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

        {/* Right panel — services list */}
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
