type SectionRailProps = {
  number: string
  label?: string
}

/** 左侧竖排编号 + PORTFOLIO，呼应参考图编辑风 */
export function SectionRail({ number, label = 'PORTFOLIO' }: SectionRailProps) {
  return (
    <div className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-line py-8 md:flex lg:w-16">
      <span className="font-label text-sm tracking-[0.2em] text-muted">{number}</span>
      <span
        className="font-label mt-4 text-[11px] tracking-[0.35em] text-ink"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {label}
      </span>
    </div>
  )
}
