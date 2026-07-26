import { useId, useMemo, useState, type ReactNode } from 'react'
import type { Catalog } from '../../catalog/build'
import type { AssetRecord } from '../../catalog/parse'
import type { Character, SceneItem } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'
import { namespaceIds, sanitizeToken } from '../../render/namespaceIds'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'
import { ART_H, ART_W } from './StageItem'
import { isInsideRect, toStagePoint, usePointerDrag, type RectLike } from './usePointerDrag'

type Tab = 'characters' | 'props'

export interface StageDrawerProps {
  catalog: Catalog
  characters: Character[]
  backdropId: string
  getStageRect: () => RectLike | null
  onSetBackdrop: (backdropId: string) => void
  onAdd: (kind: SceneItem['kind'], refId: string, x: number, y: number) => void
}

interface DrawerEntryProps {
  id: string
  label: string
  getStageRect: () => RectLike | null
  onDrop: (x: number, y: number) => void
  children: ReactNode
}

/** Tap to drop at the stage centre, or drag the thing straight onto the stage. */
function DrawerEntry({ id, label, getStageRect, onDrop, children }: DrawerEntryProps) {
  const handlers = usePointerDrag({
    getRect: getStageRect,
    onEnd: ({ moved, clientX, clientY }) => {
      const rect = getStageRect()
      if (moved && isInsideRect(rect, clientX, clientY)) {
        const { x, y } = toStagePoint(rect, clientX, clientY)
        onDrop(x, y)
      } else if (!moved) {
        onDrop(STAGE_W / 2, STAGE_H / 2)
      }
    },
  })

  return (
    <button
      type="button"
      data-testid={`drawer-entry-${id}`}
      aria-label={label}
      className="flex w-24 shrink-0 touch-none select-none flex-col items-center gap-1 rounded-2xl bg-white p-2 text-xs font-semibold text-ink"
      {...handlers}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onDrop(STAGE_W / 2, STAGE_H / 2)
        }
      }}
    >
      {children}
      <span className="w-full truncate text-center">{label}</span>
    </button>
  )
}

/**
 * A raw asset drawn at thumbnail size — props and backdrops share this. Backdrops are
 * authored at the stage's size rather than the asset canvas, so the viewBox is passed in.
 */
function AssetThumb(
  { asset, className, viewBox }: { asset: AssetRecord; className: string; viewBox: string },
) {
  // Each thumbnail is its own instance, and the same asset also renders on the stage —
  // without namespacing they share element ids and the first one wins every url(#…).
  const token = sanitizeToken(useId())
  const markup = useMemo(() => namespaceIds(asset.markup, token), [asset.markup, token])

  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: markup }} />
    </svg>
  )
}

const ART_VIEW_BOX = `0 0 ${ART_W} ${ART_H}`
const BACKDROP_VIEW_BOX = `0 0 ${STAGE_W} ${STAGE_H}`

export function StageDrawer({
  catalog, characters, backdropId, getStageRect, onSetBackdrop, onAdd,
}: StageDrawerProps) {
  const [open, setOpen] = useState(true)
  const [tab, setTab] = useState<Tab>('props')

  const tabClass = (active: boolean) =>
    `rounded-pill px-4 py-2 text-sm font-bold ${active ? 'bg-peri text-white' : 'bg-white text-ink'}`

  return (
    <section
      data-testid="stage-drawer"
      className="shrink-0 border-t border-black/5 bg-page/90 px-3 pb-3 pt-2"
    >
      <div className="mb-2 flex items-center gap-2" role="tablist" aria-label="Stage drawer tabs">
        <button
          type="button" role="tab" aria-selected={tab === 'characters'}
          className={tabClass(tab === 'characters')}
          onClick={() => { setTab('characters'); setOpen(true) }}
        >
          Characters
        </button>
        <button
          type="button" role="tab" aria-selected={tab === 'props'}
          className={tabClass(tab === 'props')}
          onClick={() => { setTab('props'); setOpen(true) }}
        >
          Props
        </button>
        <button
          type="button"
          aria-expanded={open}
          className="ml-auto rounded-pill bg-white px-4 py-2 text-sm font-semibold text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Hide drawer' : 'Show drawer'}
        </button>
      </div>

      {open && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2" data-testid={`drawer-${tab}`}>
            {tab === 'characters' && characters.length === 0 && (
              <p className="py-6 text-sm opacity-60">
                No characters yet — make one on the Characters screen.
              </p>
            )}
            {tab === 'characters' && characters.map((c) => (
              <DrawerEntry
                key={c.id} id={c.id} label={c.name} getStageRect={getStageRect}
                onDrop={(x, y) => onAdd('character', c.id, x, y)}
              >
                <CharacterSvg
                  character={c} catalog={catalog} quality="flat"
                  className="h-16 w-full" title={c.name}
                />
              </DrawerEntry>
            ))}

            {tab === 'props' && catalog.props.length === 0 && (
              <p className="py-6 text-sm opacity-60">No props in the catalog yet.</p>
            )}
            {tab === 'props' && catalog.props.map((p) => (
              <DrawerEntry
                key={p.id} id={p.id} label={p.name} getStageRect={getStageRect}
                onDrop={(x, y) => onAdd('prop', p.id, x, y)}
              >
                <AssetThumb asset={p} className="h-16 w-full" viewBox={ART_VIEW_BOX} />
              </DrawerEntry>
            ))}
          </div>

          <div
            data-testid="backdrop-picker"
            className="flex items-center gap-2 overflow-x-auto border-t border-black/5 pt-2"
          >
            <span className="shrink-0 text-xs font-bold uppercase tracking-wide opacity-60">
              Backdrop
            </span>
            <button
              type="button" aria-label="No backdrop" aria-pressed={backdropId === ''}
              className={`shrink-0 rounded-pill px-4 py-2 text-xs font-semibold ${backdropId === '' ? 'ring-2 ring-peri' : ''} bg-white text-ink`}
              onClick={() => onSetBackdrop('')}
            >
              None
            </button>
            {catalog.backdrops.length === 0 && (
              <span className="text-xs opacity-60">No backdrops in the catalog yet.</span>
            )}
            {catalog.backdrops.map((b) => (
              <button
                key={b.id} type="button" aria-label={b.name}
                aria-pressed={backdropId === b.id}
                className={`shrink-0 overflow-hidden rounded-xl bg-white ${backdropId === b.id ? 'ring-2 ring-peri' : ''}`}
                onClick={() => onSetBackdrop(b.id)}
              >
                <AssetThumb asset={b} className="h-10 w-16" viewBox={BACKDROP_VIEW_BOX} />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
