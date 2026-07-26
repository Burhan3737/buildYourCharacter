import type { Catalog } from '../../catalog/build'
import type { Character, SceneItem } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'
import { MAX_SCALE, MIN_SCALE, STAGE_H, STAGE_W } from '../../state/sceneOps'
import { usePointerDrag, type RectLike } from './usePointerDrag'

/** Every asset is authored in this box, bottom-aligned on the ground line. */
export const ART_W = 400
export const ART_H = 600
/** An item's (x, y) is the middle of its feet, so a drop lands where the finger is. */
export const ANCHOR_X = 200
export const ANCHOR_Y = 570

const BAR_W = 440
const BAR_H = 104
const EDGE = 8

export interface StageItemProps {
  item: SceneItem
  catalog: Catalog
  /** The character this item points at, for `kind: 'character'`. */
  character?: Character
  selected: boolean
  getStageRect: () => RectLike | null
  onSelect: (id: string) => void
  onDrag: (id: string, dx: number, dy: number) => void
  onScale: (id: string, scale: number) => void
  onFlip: (id: string) => void
  onRaise: (id: string) => void
  onRemove: (id: string) => void
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const round = (n: number) => Math.round(n * 1000) / 1000

export function StageItem({
  item, catalog, character, selected, getStageRect,
  onSelect, onDrag, onScale, onFlip, onRaise, onRemove,
}: StageItemProps) {
  const prop = item.kind === 'prop' ? catalog.byId[item.refId] : undefined

  const handlers = usePointerDrag({
    getRect: getStageRect,
    onStart: () => onSelect(item.id),
    onMove: (dx, dy) => onDrag(item.id, dx, dy),
  })

  // The item is missing its subject — a deleted character or an asset that never loaded.
  if (item.kind === 'character' ? !character : !prop) return null

  const { scale } = item
  const boxX = -ANCHOR_X * scale
  const boxY = -ANCHOR_Y * scale
  const boxW = ART_W * scale
  const boxH = ART_H * scale

  // Keep the toolbar on stage: above the item unless that would clip off the top.
  const above = item.y + boxY - BAR_H - 12
  const barY = above >= EDGE ? boxY - BAR_H - 12 : boxY + boxH + 12
  const barX = clamp(-BAR_W / 2, EDGE - item.x, STAGE_W - BAR_W - EDGE - item.x)
  const barTop = clamp(item.y + barY, EDGE, STAGE_H - BAR_H - EDGE) - item.y

  const label = character ? character.name : (prop?.name ?? 'Item')

  return (
    <g data-item-id={item.id}>
      <g
        data-testid={`item-${item.id}`}
        transform={`translate(${round(item.x)} ${round(item.y)}) scale(${round(item.flipX ? -scale : scale)} ${round(scale)})`}
        className="cursor-grab touch-none"
        {...handlers}
      >
        {/* A generous, always-present hit area — art alone leaves too many dead pixels. */}
        <rect
          x={-ANCHOR_X} y={-ANCHOR_Y} width={ART_W} height={ART_H}
          fill="transparent"
        />
        {character ? (
          // A nested viewport pins the character's own 100%-sized <svg> to 400x600 units.
          <svg
            x={-ANCHOR_X} y={-ANCHOR_Y} width={ART_W} height={ART_H}
            viewBox={`0 0 ${ART_W} ${ART_H}`} overflow="visible"
          >
            <CharacterSvg character={character} catalog={catalog} quality="flat" />
          </svg>
        ) : (
          <g
            transform={`translate(${-ANCHOR_X} ${-ANCHOR_Y})`}
            dangerouslySetInnerHTML={{ __html: prop?.markup ?? '' }}
          />
        )}
      </g>

      {selected && (
        // Drawn outside the flipped group so the controls never end up mirrored. The
        // pointerdown is swallowed here or the stage background deselects the item before
        // the button's click ever fires.
        <g
          transform={`translate(${round(item.x)} ${round(item.y)})`}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <rect
            x={boxX} y={boxY} width={boxW} height={boxH} rx={16}
            fill="none" stroke="#7E90DC" strokeWidth={4} strokeDasharray="14 10"
            pointerEvents="none"
          />
          <foreignObject x={barX} y={barTop} width={BAR_W} height={BAR_H}>
            <div className="flex h-full items-center gap-2 rounded-pill bg-white/95 px-3 py-2 text-ink shadow-lg">
              <button
                type="button"
                className="rounded-pill bg-butter px-3 py-2 text-sm font-bold"
                onClick={() => onFlip(item.id)}
              >
                ↔ Flip
              </button>
              <button
                type="button"
                className="rounded-pill bg-mint px-3 py-2 text-sm font-bold text-white"
                onClick={() => onRaise(item.id)}
              >
                ⬆ Front
              </button>
              <label className="flex flex-1 items-center gap-2 text-xs font-semibold">
                <span aria-hidden="true">Size</span>
                <input
                  type="range"
                  className="w-full touch-none accent-peri"
                  aria-label={`Size of ${label}`}
                  min={MIN_SCALE} max={MAX_SCALE} step={0.05}
                  value={item.scale}
                  onChange={(e) => onScale(item.id, Number(e.target.value))}
                />
              </label>
              <button
                type="button"
                className="rounded-pill bg-coral px-3 py-2 text-sm font-bold text-white"
                onClick={() => onRemove(item.id)}
              >
                ✕ Remove
              </button>
            </div>
          </foreignObject>
        </g>
      )}
    </g>
  )
}
