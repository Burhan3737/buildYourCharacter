import { CATEGORIES } from './categories'

export interface CategoryRailProps {
  active: string
  /** Vertical icon rail on wide screens, horizontal chip scroller below 900px. */
  orientation: 'vertical' | 'horizontal'
  onSelect: (key: string) => void
}

export function CategoryRail({ active, orientation, onSelect }: CategoryRailProps) {
  const horizontal = orientation === 'horizontal'

  return (
    <nav
      data-testid="category-rail"
      data-orientation={orientation}
      aria-label="Categories"
      className={horizontal
        ? 'flex shrink-0 snap-x gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none]'
        : 'flex w-[70px] shrink-0 flex-col gap-1 overflow-y-auto bg-white/60 px-1 py-2'}
    >
      {CATEGORIES.map((c) => {
        const on = c.key === active
        return (
          <button
            key={c.key}
            type="button"
            data-testid={`rail-${c.key}`}
            aria-pressed={on}
            aria-label={c.label}
            onClick={() => onSelect(c.key)}
            className={[
              'flex shrink-0 items-center transition',
              horizontal
                ? 'snap-start gap-1.5 rounded-pill px-3 py-1.5 text-sm font-semibold'
                : 'flex-col justify-center gap-0.5 rounded-2xl px-1 py-2 text-[10px] font-semibold',
              on ? 'bg-peri text-white shadow-sm' : 'bg-white text-ink/70 hover:bg-white',
            ].join(' ')}
          >
            <span aria-hidden className={horizontal ? 'text-base' : 'text-xl leading-none'}>
              {c.icon}
            </span>
            <span className={horizontal ? '' : 'leading-tight'}>{c.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
