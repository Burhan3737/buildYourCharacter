import { useState, type ReactNode } from 'react'

export interface TrayDrawerProps {
  /** Named in the handle's accessible label, e.g. "Show options". */
  label: string
  children: ReactNode
}

/**
 * Bottom sheet used below 900px. The body stays mounted while collapsed so
 * expanding never re-renders the tray from scratch.
 */
export function TrayDrawer({ label, children }: TrayDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      data-testid="tray-drawer"
      data-open={open ? 'true' : 'false'}
      className={[
        'fixed inset-x-0 bottom-0 z-20 flex flex-col rounded-t-3xl bg-white',
        'shadow-[0_-8px_30px_rgba(59,42,34,0.15)] transition-[height] duration-200',
        open ? 'h-[68vh]' : 'h-12',
      ].join(' ')}
    >
      <button
        type="button"
        data-testid="drawer-handle"
        aria-expanded={open}
        aria-controls="tray-drawer-body"
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-full shrink-0 items-center justify-center"
      >
        <span aria-hidden className="h-1.5 w-12 rounded-pill bg-ink/20" />
        <span className="sr-only">{open ? `Hide ${label}` : `Show ${label}`}</span>
      </button>

      <div
        id="tray-drawer-body"
        data-testid="drawer-body"
        hidden={!open}
        className="min-h-0 flex-1 overflow-y-auto px-4 pb-6"
      >
        {children}
      </div>
    </div>
  )
}
