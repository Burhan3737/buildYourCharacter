import { useLayoutEffect, useRef, useState } from 'react'
import type { SceneItem } from '../../catalog/types'
import { MAX_SCALE, MIN_SCALE, STAGE_H, STAGE_W } from '../../state/sceneOps'
import { ANCHOR_Y, ART_H } from './StageItem'

/**
 * Where the drawn stage sits inside the overlay host, in css pixels, and how many css pixels
 * one stage unit is worth. Built from `stageScale`/`stageOrigin` so the toolbar and the
 * pointer maths agree about where the stage actually is.
 */
export interface StageFrame {
  /** Css pixels per stage unit. */
  scale: number
  /** Offset of the drawn stage's top-left corner from the overlay host's top-left. */
  left: number
  top: number
}

export interface StageToolbarProps {
  item: SceneItem
  /** The character or prop name, for the slider's accessible name. */
  label: string
  frame: StageFrame
  onScale: (id: string, scale: number) => void
  onFlip: (id: string) => void
  onRaise: (id: string) => void
  onRemove: (id: string) => void
}

/** Gap between the item's art and the bar, and the bar's minimum inset from the stage edge. */
const GAP = 12
const PAD = 8
/** Used for the first paint, before the bar has been measured. */
const ESTIMATE = { w: 340, h: 60 }

/** Falls back to the low end when the stage is too small to fit the bar at all. */
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

/**
 * The selected item's controls, as plain HTML in **screen space**, absolutely positioned over
 * the stage but never inside it. Inside the stage `<svg>` a `foreignObject` toolbar is scaled
 * along with the stage — it measured 17px tall on a tablet — so the controls live out here and
 * keep a constant, touchable size at any stage scale.
 */
export function StageToolbar({
  item, label, frame, onScale, onFlip, onRaise, onRemove,
}: StageToolbarProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState(ESTIMATE)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    if (w > 0 && h > 0 && (w !== size.w || h !== size.h)) setSize({ w, h })
  })

  const s = frame.scale
  const stageW = STAGE_W * s
  const stageH = STAGE_H * s
  const centreX = frame.left + item.x * s
  const artTop = frame.top + (item.y - ANCHOR_Y * item.scale) * s
  const artBottom = frame.top + (item.y + (ART_H - ANCHOR_Y) * item.scale) * s

  // Above the item, unless that would push the bar off the top of the stage.
  const above = artTop - size.h - GAP
  const wanted = above >= frame.top + PAD ? above : artBottom + GAP
  const top = clamp(wanted, frame.top + PAD, frame.top + stageH - size.h - PAD)
  const left = clamp(centreX - size.w / 2, frame.left + PAD, frame.left + stageW - size.w - PAD)

  const touch = { minWidth: 44, minHeight: 44 }

  return (
    <div
      ref={ref}
      data-testid="stage-toolbar"
      className="pointer-events-auto absolute flex items-center gap-2 rounded-pill bg-white/95 px-3 py-2 text-ink shadow-lg"
      style={{ left, top }}
      // Swallowed here or the stage background deselects the item before the click fires.
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="rounded-pill bg-butter px-4 text-sm font-bold"
        style={touch}
        onClick={() => onFlip(item.id)}
      >
        ↔ Flip
      </button>
      <button
        type="button"
        className="rounded-pill bg-mint px-4 text-sm font-bold text-white"
        style={touch}
        onClick={() => onRaise(item.id)}
      >
        ⬆ Front
      </button>
      <label className="flex items-center gap-2 text-xs font-semibold">
        <span aria-hidden="true">Size</span>
        <input
          type="range"
          className="w-24 touch-none accent-peri"
          style={touch}
          aria-label={`Size of ${label}`}
          min={MIN_SCALE} max={MAX_SCALE} step={0.05}
          value={item.scale}
          onChange={(e) => onScale(item.id, Number(e.target.value))}
        />
      </label>
      <button
        type="button"
        className="rounded-pill bg-coral px-4 text-sm font-bold text-white"
        style={touch}
        onClick={() => onRemove(item.id)}
      >
        ✕ Remove
      </button>
    </div>
  )
}
