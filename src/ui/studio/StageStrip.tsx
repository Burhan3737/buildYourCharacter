import {
  BODY_TYPES, LIFE_STAGES, STAGE_LABELS,
  type BodyType, type LifeStage,
} from '../../catalog/types'

export interface StageStripProps {
  stage: LifeStage
  bodyType: BodyType
  onStage: (stage: LifeStage) => void
  onBodyType: (bodyType: BodyType) => void
}

const BODY_LABELS: Record<BodyType, string> = { female: 'Female', male: 'Male' }

const chip = (on: boolean) => [
  'shrink-0 snap-start rounded-pill px-3 py-1.5 text-xs font-semibold transition',
  on ? 'bg-ink text-white shadow-sm' : 'bg-white text-ink/70 hover:bg-white/80',
].join(' ')

export function StageStrip({ stage, bodyType, onStage, onBodyType }: StageStripProps) {
  return (
    <div
      data-testid="stage-strip"
      className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2"
    >
      <div
        role="group"
        aria-label="Life stage"
        className="flex snap-x gap-1.5 overflow-x-auto rounded-pill bg-white/60 p-1 [scrollbar-width:none]"
      >
        {LIFE_STAGES.map((s) => (
          <button
            key={s}
            type="button"
            data-testid={`stage-${s}`}
            aria-pressed={s === stage}
            onClick={() => onStage(s)}
            className={chip(s === stage)}
          >
            {STAGE_LABELS[s]}
          </button>
        ))}
      </div>

      <div
        role="group"
        aria-label="Body type"
        className="flex gap-1.5 rounded-pill bg-white/60 p-1"
      >
        {BODY_TYPES.map((b) => (
          <button
            key={b}
            type="button"
            data-testid={`body-${b}`}
            aria-pressed={b === bodyType}
            onClick={() => onBodyType(b)}
            className={chip(b === bodyType)}
          >
            {BODY_LABELS[b]}
          </button>
        ))}
      </div>
    </div>
  )
}
