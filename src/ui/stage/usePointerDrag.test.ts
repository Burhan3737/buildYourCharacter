import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'
import {
  stageScale, toStageDelta, toStagePoint, usePointerDrag,
  type DragPointerEvent, type RectLike,
} from './usePointerDrag'

/** 800px wide on screen for a 1600-unit stage => 1 screen px is 2 stage units. */
const RECT: RectLike = { left: 100, top: 50, width: 800, height: 500 }

const capture = { setPointerCapture: vi.fn(), releasePointerCapture: vi.fn() }

const ev = (clientX: number, clientY: number, pointerId = 7): DragPointerEvent => ({
  pointerId,
  clientX,
  clientY,
  currentTarget: capture,
  stopPropagation: vi.fn(),
})

describe('stageScale', () => {
  it('is the rendered width over the stage width', () => {
    expect(stageScale(RECT)).toBeCloseTo(800 / STAGE_W)
    expect(stageScale({ ...RECT, width: STAGE_W, height: STAGE_H })).toBe(1)
  })

  it('takes the limiting axis when the box is not the stage aspect ratio', () => {
    expect(stageScale({ ...RECT, width: STAGE_W, height: 500 })).toBe(0.5)
    expect(stageScale({ ...RECT, width: 800, height: STAGE_H })).toBe(0.5)
  })

  it('falls back to 1 for a missing or unmeasured rect (jsdom, hidden stage)', () => {
    expect(stageScale(null)).toBe(1)
    expect(stageScale({ ...RECT, width: 0 })).toBe(1)
    expect(stageScale({ ...RECT, height: 0 })).toBe(1)
  })
})

describe('toStageDelta', () => {
  it('divides a screen-space delta by the rendered scale', () => {
    expect(toStageDelta(RECT, 40, 30)).toEqual({ dx: 80, dy: 60 })
  })

  it('is the identity when the stage renders at 1:1', () => {
    expect(toStageDelta({ ...RECT, width: STAGE_W, height: STAGE_H }, 40, 30))
      .toEqual({ dx: 40, dy: 30 })
  })
})

describe('toStagePoint', () => {
  it('subtracts the rect origin before dividing by the rendered scale', () => {
    expect(toStagePoint(RECT, 500, 300)).toEqual({ x: 800, y: 500 })
    expect(toStagePoint(RECT, 100, 50)).toEqual({ x: 0, y: 0 })
  })

  it('accounts for letterboxing when the box is wider than the stage aspect', () => {
    // 1600x500 box: the stage draws 800x500, centred, so it starts 400px in.
    const wide: RectLike = { left: 0, top: 0, width: 1600, height: 500 }
    expect(toStagePoint(wide, 400, 0)).toEqual({ x: 0, y: 0 })
    expect(toStagePoint(wide, 800, 250)).toEqual({ x: STAGE_W / 2, y: 500 })
  })

  it('is the origin for a missing rect rather than a nonsense offset', () => {
    expect(toStagePoint(null, 0, 0)).toEqual({ x: 0, y: 0 })
  })
})

describe('usePointerDrag', () => {
  const setup = (overrides: Partial<Parameters<typeof usePointerDrag>[0]> = {}) => {
    const onMove = vi.fn()
    const onStart = vi.fn()
    const onEnd = vi.fn()
    const { result } = renderHook(() =>
      usePointerDrag({ getRect: () => RECT, onStart, onMove, onEnd, ...overrides }))
    return { onMove, onStart, onEnd, handlers: result.current }
  }

  it('reports moves in stage space, converted from the screen delta', () => {
    const { handlers, onMove } = setup()
    handlers.onPointerDown(ev(200, 100))
    handlers.onPointerMove(ev(240, 130))
    expect(onMove).toHaveBeenCalledWith(80, 60)
  })

  it('reports each move relative to the previous one', () => {
    const { handlers, onMove } = setup()
    handlers.onPointerDown(ev(200, 100))
    handlers.onPointerMove(ev(240, 130))
    handlers.onPointerMove(ev(250, 130))
    expect(onMove.mock.calls).toEqual([[80, 60], [20, 0]])
  })

  it('ignores moves before pointerdown', () => {
    const { handlers, onMove } = setup()
    handlers.onPointerMove(ev(240, 130))
    handlers.onPointerMove(ev(900, 900))
    expect(onMove).not.toHaveBeenCalled()
  })

  it('ignores moves belonging to a different pointer', () => {
    const { handlers, onMove } = setup()
    handlers.onPointerDown(ev(200, 100, 7))
    handlers.onPointerMove(ev(240, 130, 8))
    expect(onMove).not.toHaveBeenCalled()
  })

  it('captures the pointer on pointerdown and releases it on pointerup', () => {
    capture.setPointerCapture.mockClear()
    capture.releasePointerCapture.mockClear()
    const { handlers } = setup()
    handlers.onPointerDown(ev(200, 100))
    expect(capture.setPointerCapture).toHaveBeenCalledWith(7)
    expect(capture.releasePointerCapture).not.toHaveBeenCalled()
    handlers.onPointerUp(ev(200, 100))
    expect(capture.releasePointerCapture).toHaveBeenCalledWith(7)
  })

  it('ignores moves after pointerup', () => {
    const { handlers, onMove } = setup()
    handlers.onPointerDown(ev(200, 100))
    handlers.onPointerUp(ev(200, 100))
    handlers.onPointerMove(ev(400, 400))
    expect(onMove).not.toHaveBeenCalled()
  })

  it('ends with the release point and whether the pointer actually moved', () => {
    const { handlers, onEnd } = setup()
    handlers.onPointerDown(ev(200, 100))
    handlers.onPointerUp(ev(201, 100))
    expect(onEnd).toHaveBeenCalledWith({ moved: false, clientX: 201, clientY: 100 })

    handlers.onPointerDown(ev(200, 100))
    handlers.onPointerMove(ev(500, 300))
    handlers.onPointerUp(ev(500, 300))
    expect(onEnd).toHaveBeenLastCalledWith({ moved: true, clientX: 500, clientY: 300 })
  })

  it('calls onStart on pointerdown', () => {
    const { handlers, onStart } = setup()
    handlers.onPointerDown(ev(200, 100))
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('drops the drag on pointercancel without reporting an end', () => {
    const { handlers, onEnd, onMove } = setup()
    handlers.onPointerDown(ev(200, 100))
    handlers.onPointerCancel(ev(200, 100))
    handlers.onPointerMove(ev(400, 400))
    expect(onEnd).not.toHaveBeenCalled()
    expect(onMove).not.toHaveBeenCalled()
  })

  it('survives a target that does not implement pointer capture', () => {
    const { handlers, onMove } = setup()
    const bare: DragPointerEvent = {
      pointerId: 1, clientX: 0, clientY: 0, currentTarget: {}, stopPropagation: vi.fn(),
    }
    expect(() => handlers.onPointerDown(bare)).not.toThrow()
    handlers.onPointerMove({ ...bare, clientX: 10, clientY: 5 })
    expect(onMove).toHaveBeenCalledWith(20, 10)
    expect(() => handlers.onPointerUp({ ...bare, clientX: 10, clientY: 5 })).not.toThrow()
  })
})
