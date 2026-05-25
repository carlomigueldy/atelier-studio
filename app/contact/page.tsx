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
      {/* Left panel */}
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
              className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0 animate-pulse"
              style={{ boxShadow: '0 0 0 3px rgba(122,170,142,0.2)' }}
              aria-hidden="true"
            />
            We typically respond within 4 hours during business hours.
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="px-6 py-[80px] lg:px-[60px]">
        <ContactForm />
      </div>
    </div>
  )
}
