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
  const titleParts = title.split(emphasisWord)
  const before = titleParts[0] ?? ''
  const after = titleParts[1] ?? ''

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
