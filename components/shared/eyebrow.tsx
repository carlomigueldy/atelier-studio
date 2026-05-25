type EyebrowProps = { text: string }

export function Eyebrow({ text }: EyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-7 h-px bg-sage" aria-hidden="true" />
      <span className="text-[10px] font-medium tracking-[3px] uppercase text-sage">{text}</span>
    </div>
  )
}
