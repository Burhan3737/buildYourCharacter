import { useCallback, useRef } from 'react'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'

/**
 * The stage is one `<svg viewBox="0 0 1600 1000">` stretched by CSS to fit the viewport, so
 * a pointer that travels 40 screen pixels has not travelled 40 stage units. Everything in
 * here exists to divide screen-space motion by the stage's current rendered scale.
 */

/** The slice of `DOMRect` this module needs — so tests can hand over a plain object. */
export interface RectLike {
  left: number
  top: number
  width: number
  height: number
}

/**
 * The slice of `React.PointerEvent` this module needs. Structural, so real pointer events
 * satisfy it and tests can build one without a `PointerEvent` constructor (jsdom has none).
 */
export interface DragPointerEvent {
  pointerId: number
  clientX: number
  clientY: number
  currentTarget: {
    setPointerCapture?: (pointerId: number) => void
    releasePointerCapture?: (pointerId: number) => void
  }
  stopPropagation: () => void
}

/**
 * Screen pixels per stage unit. The stage fits itself inside its box, so the limiting axis
 * sets the scale. 1 when the stage is unmeasured, so nothing ever divides by zero.
 */
export function stageScale(rect: RectLike | null | undefined): number {
  if (!rect || rect.width <= 0 || rect.height <= 0) return 1
  return Math.min(rect.width / STAGE_W, rect.height / STAGE_H)
}

/**
 * Top-left of the *drawn* stage in client coordinates. That is not the element's top-left
 * whenever the box is not the stage's aspect ratio: the drawing is centred and the leftover
 * is letterbox.
 */
export function stageOrigin(rect: RectLike | null | undefined): { left: number; top: number } {
  if (!rect) return { left: 0, top: 0 }
  const s = stageScale(rect)
  return {
    left: rect.left + (rect.width - STAGE_W * s) / 2,
    top: rect.top + (rect.height - STAGE_H * s) / 2,
  }
}

export function toStageDelta(
  rect: RectLike | null | undefined,
  dxScreen: number,
  dyScreen: number,
): { dx: number; dy: number } {
  const s = stageScale(rect)
  return { dx: dxScreen / s, dy: dyScreen / s }
}

export function toStagePoint(
  rect: RectLike | null | undefined,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const s = stageScale(rect)
  const origin = stageOrigin(rect)
  return { x: (clientX - origin.left) / s, y: (clientY - origin.top) / s }
}

export function isInsideRect(
  rect: RectLike | null | undefined,
  clientX: number,
  clientY: number,
): boolean {
  if (!rect) return false
  return clientX >= rect.left && clientX <= rect.left + rect.width
    && clientY >= rect.top && clientY <= rect.top + rect.height
}

export interface DragEndInfo {
  /** False for a tap: the pointer never left the slop radius. */
  moved: boolean
  clientX: number
  clientY: number
}

export interface PointerDragOptions {
  /** The stage's client rect, read fresh on every move so resizes need no listener. */
  getRect: () => RectLike | null
  onStart?: (e: DragPointerEvent) => void
  /** Stage-space motion since the previous move. */
  onMove?: (dx: number, dy: number) => void
  onEnd?: (info: DragEndInfo) => void
}

export interface PointerDragHandlers {
  onPointerDown: (e: DragPointerEvent) => void
  onPointerMove: (e: DragPointerEvent) => void
  onPointerUp: (e: DragPointerEvent) => void
  onPointerCancel: (e: DragPointerEvent) => void
}

/** Screen pixels of slop before a press counts as a drag rather than a tap. */
const TAP_SLOP = 4

/** Capture is best-effort: a detached node or a stale pointer id throws, and neither matters. */
function capture(e: DragPointerEvent, take: boolean): void {
  try {
    if (take) e.currentTarget.setPointerCapture?.(e.pointerId)
    else e.currentTarget.releasePointerCapture?.(e.pointerId)
  } catch {
    /* the pointer is already gone */
  }
}

interface ActiveDrag {
  pointerId: number
  x: number
  y: number
  moved: boolean
}

/**
 * One press-move-release gesture, pointer events only — identical on mouse, pen and touch.
 * Pair it with `touch-action: none` on the target so the browser never steals the gesture
 * for scrolling.
 */
export function usePointerDrag(options: PointerDragOptions): PointerDragHandlers {
  const latest = useRef(options)
  latest.current = options
  const active = useRef<ActiveDrag | null>(null)

  const onPointerDown = useCallback((e: DragPointerEvent) => {
    active.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY, moved: false }
    capture(e, true)
    e.stopPropagation()
    latest.current.onStart?.(e)
  }, [])

  const onPointerMove = useCallback((e: DragPointerEvent) => {
    const drag = active.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const dxScreen = e.clientX - drag.x
    const dyScreen = e.clientY - drag.y
    drag.x = e.clientX
    drag.y = e.clientY
    if (!drag.moved && Math.hypot(dxScreen, dyScreen) > TAP_SLOP) drag.moved = true
    if (dxScreen === 0 && dyScreen === 0) return
    const { dx, dy } = toStageDelta(latest.current.getRect(), dxScreen, dyScreen)
    latest.current.onMove?.(dx, dy)
  }, [])

  const onPointerUp = useCallback((e: DragPointerEvent) => {
    const drag = active.current
    if (!drag || drag.pointerId !== e.pointerId) return
    active.current = null
    capture(e, false)
    latest.current.onEnd?.({ moved: drag.moved, clientX: e.clientX, clientY: e.clientY })
  }, [])

  const onPointerCancel = useCallback((e: DragPointerEvent) => {
    const drag = active.current
    if (!drag || drag.pointerId !== e.pointerId) return
    active.current = null
    capture(e, false)
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }
}
