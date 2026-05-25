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
