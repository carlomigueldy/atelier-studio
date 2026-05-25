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
