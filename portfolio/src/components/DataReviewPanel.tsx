import { CaretDown } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { AnimatedCounter } from './AnimatedCounter'
import { BrushUnderline } from './BrushUnderline'
import {
  featuredVideoOps,
  formatOpsNumber,
  formatOpsPercent,
  funnelSteps,
  interactionSlices,
  opsKpis,
  rateCompare,
  rateCompareConclusionHighlight,
  rateCompareConclusionLead,
  retentionSheet,
  deviceShare,
} from '../data/bilibiliOps'

type SheetId = 'overview' | 'interaction' | 'rates' | 'retention' | 'funnel'

const sheets: Array<{ id: SheetId; step: string; title: string; blurb: string }> = [
  {
    id: 'overview',
    step: '01',
    title: '公开表现',
    blurb: '播放 / 点赞 / 点赞率 / 互动率',
  },
  {
    id: 'interaction',
    step: '02',
    title: '互动构成',
    blurb: '点赞 / 收藏 / 评论 / 投币 / 弹幕 / 转发',
  },
  {
    id: 'rates',
    step: '03',
    title: '互动率对照',
    blurb: '比率拆解与结论',
  },
  {
    id: 'retention',
    step: '04',
    title: '完播与留存',
    blurb: '平均进度 / 3秒跳出 / 播转粉',
  },
  {
    id: 'funnel',
    step: '05',
    title: '转化漏斗',
    blurb: '播放 → 完播 → 互动 → 关注',
  },
]

function MetricBar({
  label,
  display,
  widthPercent,
  tone = 'accent',
  play,
}: {
  label: string
  display: string
  widthPercent: number
  tone?: 'accent' | 'ink'
  play: boolean
}) {
  const reduceMotion = useReducedMotion()
  const width = Math.max(widthPercent, 3)

  return (
    <div className="grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[3.75rem_minmax(0,1fr)_4.5rem]">
      <span className="text-sm text-muted">{label}</span>
      <div className="h-0.5 overflow-hidden bg-line/80">
        <motion.div
          className={`h-full ${tone === 'accent' ? 'bg-accent' : 'bg-ink/50'}`}
          initial={reduceMotion ? false : { width: 0 }}
          animate={play ? { width: `${width}%` } : { width: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
      <span className="text-right font-label text-xs tracking-wide tabular-nums text-ink/80">
        {display}
      </span>
    </div>
  )
}

function SheetBody({
  id,
  play,
}: {
  id: SheetId
  play: boolean
}) {
  const maxInteraction = Math.max(...interactionSlices.map((slice) => slice.value))
  const maxRate = Math.max(...rateCompare.map((row) => row.rate))

  if (id === 'overview') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4">
        {opsKpis.map((kpi, index) => (
          <div
            key={kpi.key}
            className={`px-1 py-2 md:px-2 ${index % 2 === 1 ? 'md:pl-4' : ''} ${
              index >= 2 ? 'mt-4 md:mt-0' : ''
            }`}
          >
            <p className="text-sm text-muted">{kpi.label}</p>
            <p className="mt-2 font-label text-[1.65rem] font-semibold tracking-tight tabular-nums md:text-[1.85rem]">
              {play ? (
                <AnimatedCounter
                  value={kpi.value}
                  suffix={kpi.suffix ?? ''}
                  decimals={kpi.suffix === '%' ? 1 : 0}
                />
              ) : (
                <>0{kpi.suffix ?? ''}</>
              )}
            </p>
            <p className="mt-1 font-label text-[9px] tracking-[0.16em] text-muted">
              {kpi.labelEn}
            </p>
          </div>
        ))}
      </div>
    )
  }

  if (id === 'interaction') {
    return (
      <div>
        <div className="mb-5 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted">收藏</p>
            <p className="mt-1 font-label text-xl font-semibold tabular-nums">
              {formatOpsNumber(featuredVideoOps.favorite)}
            </p>
            <p className="mt-0.5 font-label text-[11px] tabular-nums text-muted">
              {formatOpsPercent(featuredVideoOps.favoriteRate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">投币</p>
            <p className="mt-1 font-label text-xl font-semibold tabular-nums">
              {formatOpsNumber(featuredVideoOps.coin)}
            </p>
            <p className="mt-0.5 font-label text-[11px] tabular-nums text-muted">
              {formatOpsPercent(featuredVideoOps.coinRate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">转发</p>
            <p className="mt-1 font-label text-xl font-semibold tabular-nums">
              {formatOpsNumber(featuredVideoOps.share)}
            </p>
            <p className="mt-0.5 font-label text-[11px] tabular-nums text-muted">
              {formatOpsPercent(featuredVideoOps.shareRate)}
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {interactionSlices.map((slice) => (
            <MetricBar
              key={slice.key}
              label={slice.label}
              display={formatOpsNumber(slice.value)}
              widthPercent={(slice.value / maxInteraction) * 100}
              tone="accent"
              play={play}
            />
          ))}
        </div>
      </div>
    )
  }

  if (id === 'rates') {
    return (
      <div>
        <div className="space-y-3">
          {rateCompare.map((row) => (
            <MetricBar
              key={row.label}
              label={row.label}
              display={formatOpsPercent(row.rate)}
              widthPercent={(row.rate / maxRate) * 100}
              tone="ink"
              play={play}
            />
          ))}
        </div>
        <p className="mt-6 text-[14px] leading-[1.75] text-ink/75">
          {rateCompareConclusionLead}
          <BrushUnderline tone="accent">
            {rateCompareConclusionHighlight}
          </BrushUnderline>
          。
        </p>
      </div>
    )
  }

  if (id === 'retention') {
    return (
      <div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[240px] text-left text-sm">
            <thead>
              <tr className="font-label text-[10px] tracking-[0.14em] text-muted">
                <th className="pb-3 font-medium">指标</th>
                <th className="pb-3 font-medium">数值</th>
              </tr>
            </thead>
            <tbody>
              {retentionSheet.rows.map((row) => (
                <tr key={row.metric} className="border-t border-line/70">
                  <td className="py-3 pr-3 font-medium">{row.metric}</td>
                  <td className="py-3 font-label tabular-nums">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 font-label text-[10px] tracking-[0.16em] text-muted">
          终端分布
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {deviceShare.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.tone }}
                aria-hidden
              />
              <span className="text-muted">{item.label}</span>
              <span className="font-label tabular-nums text-ink/80">
                {item.percent}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-0">
        {funnelSteps.map((step, index) => (
          <div
            key={step.stage}
            className={`grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-3 py-3 ${
              index > 0 ? 'border-t border-line/70' : ''
            }`}
          >
            <p className="font-label text-[10px] tracking-[0.14em] text-muted">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="font-medium">{step.stage}</p>
            <p className="text-right font-label text-lg font-semibold tabular-nums">
              {step.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

type DataReviewPanelProps = {
  active: boolean
}

/** 依次点开的多表复盘：公开表现 → 互动 → 比率 → 完播 → 漏斗 */
export function DataReviewPanel({ active }: DataReviewPanelProps) {
  const [openId, setOpenId] = useState<SheetId | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!active) setOpenId(null)
  }, [active])

  return (
    <div className="mt-6 md:mt-8">
      <div className="mb-4">
        <p className="text-sm text-ink/70">以视频《挽救计划》为例</p>
      </div>

      <div className="border border-line">
        {sheets.map((sheet) => {
          const isOpen = openId === sheet.id

          return (
            <div
              key={sheet.id}
              className="border-b border-line last:border-b-0"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenId((current) =>
                    current === sheet.id ? null : sheet.id,
                  )
                }
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-ink/[0.02] md:px-5"
              >
                <span className="font-label text-[11px] tracking-[0.18em] text-muted">
                  {sheet.step}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold tracking-tight">
                    {sheet.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {sheet.blurb}
                  </span>
                </span>
                <CaretDown
                  size={16}
                  className={`shrink-0 text-accent transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key={sheet.id}
                    initial={
                      reduceMotion ? false : { height: 0, opacity: 0 }
                    }
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={
                      reduceMotion ? undefined : { height: 0, opacity: 0 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line px-4 py-5 md:px-5 md:py-6">
                      <SheetBody id={sheet.id} play={isOpen} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
