import { useId, useMemo } from 'react'
import type { Catalog } from '../../catalog/build'
import type { Character, SceneItem } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'
import { namespaceIds, sanitizeToken } from '../../render/namespaceIds'
import { usePointerDrag, type RectLike } from './usePointerDrag'

/** Every asset is authored in this box, bottom-aligned on the ground line. */
export const ART_W = 400
export const ART_H = 600
/** An item's (x, y) is the middle of its feet, so a drop lands where the finger is. */
export const ANCHOR_X = 200
export const ANCHOR_Y = 570

export interface StageItemProps {
  item: SceneItem
  catalog: Catalog
  /** The character this item points at, for `kind: 'character'`. */
  character?: Character
  selected: boolean
  getStageRect: () => RectLike | null
  onSelect: (id: string) => void
  onDrag: (id: string, dx: number, dy: number) => void
}

const round = (n: number) => Math.round(n * 1000) / 1000

export function StageItem({
  item, catalog, character, selected, getStageRect, onSelect, onDrag,
}: StageItemProps) {
  const prop = item.kind === 'prop' ? catalog.byId[item.refId] : undefined

  // Two copies of the same prop on the stage would otherwise inject duplicate element ids,
  // and every url(#…) in the document would resolve to the first one — same bug characters had.
  const token = sanitizeToken(useId())
  const propMarkup = useMemo(
    () => namespaceIds(prop?.markup ?? '', token),
    [prop?.markup, token],
  )

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

  return (
    <g data-item-id={item.id}>
      <g
        data-testid={`item-${item.id}`}
        transform={`translate(${round(item.x)} ${round(item.y)}) scale(${round(item.flipX ? -scale : scale)} ${round(scale)})`}
        className="cursor-grab touch-none"
        {...handlers}
      >
        {/*
          No hit rect. SVG's default `pointer-events: visiblePainted` makes the drawn art its
          own hit area, which is the only way a click on the left character reaches the left
          character: a full-bleed transparent rect is painted, so it swallowed every press
          landing anywhere in its 400x600 canvas — including over its neighbours' art.
        */}
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
            dangerouslySetInnerHTML={{ __html: propMarkup }}
          />
        )}
      </g>

      {selected && (
        // Drawn outside the flipped group so the outline is never mirrored. The controls
        // themselves are an HTML overlay in screen space — see StageToolbar.
        <rect
          transform={`translate(${round(item.x)} ${round(item.y)})`}
          x={boxX} y={boxY} width={boxW} height={boxH} rx={16}
          fill="none" stroke="#7E90DC" strokeWidth={4} strokeDasharray="14 10"
          pointerEvents="none"
        />
      )}
    </g>
  )
}
