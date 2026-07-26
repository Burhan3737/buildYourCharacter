export interface SwatchRowProps {
  /** Namespaces the test ids so several rows can live in one tray. */
  id: string
  label: string
  colors: string[]
  value?: string
  disabled?: boolean
  onChange: (color: string, index: number) => void
}

const same = (a: string | undefined, b: string) => !!a && a.toLowerCase() === b.toLowerCase()

export function SwatchRow({
  id, label, colors, value, disabled = false, onChange,
}: SwatchRowProps) {
  if (colors.length === 0) return null

  return (
    <div
      role="group"
      aria-label={label}
      data-testid={`swatches-${id}`}
      className="flex flex-wrap gap-1.5"
    >
      {colors.map((color, i) => {
        const active = same(value, color)
        return (
          <button
            key={`${color}-${i}`}
            type="button"
            data-testid={`swatch-${id}-${i}`}
            aria-label={`${label} ${i + 1}`}
            aria-pressed={active}
            disabled={disabled}
            onClick={() => onChange(color, i)}
            style={{ backgroundColor: color }}
            className={[
              'h-6 w-6 shrink-0 rounded-pill transition',
              'disabled:cursor-not-allowed disabled:opacity-30',
              active
                ? 'ring-2 ring-ink ring-offset-2 ring-offset-white'
                : 'ring-1 ring-ink/15 hover:ring-ink/40',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}
