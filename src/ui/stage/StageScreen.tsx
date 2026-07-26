import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Catalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'
import { StageDrawer } from './StageDrawer'
import { StageItem } from './StageItem'
import { StageToolbar, type StageFrame } from './StageToolbar'
import { stageOrigin, stageScale, type RectLike } from './usePointerDrag'

export interface StageScreenProps {
  catalog: Catalog
}

const sameFrame = (a: StageFrame | null, b: StageFrame): boolean =>
  a !== null && a.scale === b.scale && a.left === b.left && a.top === b.top

/**
 * One `<svg viewBox="0 0 1600 1000">` scaled by CSS to fit whatever viewport it lands in.
 * Everything *drawn* on it is drawn into that same coordinate space, so nothing has to know
 * the screen size; `usePointerDrag` divides screen motion by the rendered scale on the way in.
 *
 * The selected item's controls are the deliberate exception: they are HTML in screen space,
 * overlaid on the stage but outside it, so they never shrink with it.
 */
export function StageScreen({ catalog }: StageScreenProps) {
  const scene = useAppStore((s) => s.scene)
  const characters = useAppStore((s) => s.characters)
  const setBackdrop = useAppStore((s) => s.setBackdrop)
  const addToScene = useAppStore((s) => s.addToScene)
  const dragItem = useAppStore((s) => s.dragItem)
  const scaleItem = useAppStore((s) => s.scaleItem)
  const flipSceneItem = useAppStore((s) => s.flipSceneItem)
  const raiseItem = useAppStore((s) => s.raiseItem)
  const removeSceneItem = useAppStore((s) => s.removeSceneItem)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [frame, setFrame] = useState<StageFrame | null>(null)

  const getStageRect = useCallback((): RectLike | null => {
    const el = svgRef.current
    return el ? el.getBoundingClientRect() : null
  }, [])

  /** Where the drawn stage sits inside the overlay host, in css pixels. */
  const measure = useCallback(() => {
    const el = svgRef.current
    const host = hostRef.current
    if (!el || !host) return
    const rect = el.getBoundingClientRect()
    const hostRect = host.getBoundingClientRect()
    const origin = stageOrigin(rect)
    const next: StageFrame = {
      scale: stageScale(rect),
      left: origin.left - hostRect.left,
      top: origin.top - hostRect.top,
    }
    setFrame((cur) => (sameFrame(cur, next) ? cur : next))
  }, [])

  useLayoutEffect(() => {
    measure()
    const el = svgRef.current
    // ResizeObserver covers the drawer opening and the stage box changing shape; the window
    // listener is the fallback for environments without it (jsdom).
    const observer = typeof ResizeObserver !== 'undefined' && el
      ? new ResizeObserver(() => measure())
      : null
    if (observer && el) observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // A selection can appear after a layout change the observer already reported.
  useEffect(() => { measure() }, [measure, selectedId])

  const backdrop = scene.backdropId ? catalog.byId[scene.backdropId] : undefined

  const ordered = useMemo(
    () => [...scene.items].sort((a, b) => a.z - b.z),
    [scene.items],
  )

  /** Selection always raises, so whatever you grab is the thing on top. */
  const select = useCallback((id: string) => {
    setSelectedId(id)
    raiseItem(id)
  }, [raiseItem])

  const remove = useCallback((id: string) => {
    setSelectedId((cur) => (cur === id ? null : cur))
    removeSceneItem(id)
  }, [removeSceneItem])

  const selected = selectedId ? scene.items.find((i) => i.id === selectedId) : undefined
  const selectedLabel = selected
    ? (selected.kind === 'character'
      ? characters.find((c) => c.id === selected.refId)?.name
      : catalog.byId[selected.refId]?.name) ?? 'Item'
    : ''

  return (
    <div data-testid="stage-screen" className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-2">
        <div
          ref={hostRef}
          className="relative flex h-full w-full items-center justify-center"
        >
          <svg
            ref={svgRef}
            data-testid="stage-svg"
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            preserveAspectRatio="xMidYMid meet"
            // Intrinsic size plus auto/max sizing keeps the element box exactly the stage's
            // aspect ratio, so its client rect is the drawn stage and pointer maths stays exact.
            width={STAGE_W}
            height={STAGE_H}
            className="h-auto w-auto max-h-full max-w-full touch-none select-none rounded-[2rem] shadow-inner"
            onPointerDown={() => setSelectedId(null)}
          >
            <rect x={0} y={0} width={STAGE_W} height={STAGE_H} className="fill-page" />

            {backdrop && (
              // The backdrop is markup, never an <image>: it stays vector, recolourable and
              // free of external requests. It is authored at the stage's own 1600x1000, so it
              // drops straight in — no nested viewport, no cover-crop eating the ground plane.
              <g
                data-testid="stage-backdrop"
                pointerEvents="none"
                dangerouslySetInnerHTML={{ __html: backdrop.markup }}
              />
            )}

            {ordered.map((item) => (
              <StageItem
                key={item.id}
                item={item}
                catalog={catalog}
                character={item.kind === 'character'
                  ? characters.find((c) => c.id === item.refId)
                  : undefined}
                selected={selectedId === item.id}
                getStageRect={getStageRect}
                onSelect={select}
                onDrag={dragItem}
              />
            ))}
          </svg>

          {selected && frame && (
            <div className="pointer-events-none absolute inset-0">
              <StageToolbar
                item={selected}
                label={selectedLabel}
                frame={frame}
                onScale={scaleItem}
                onFlip={flipSceneItem}
                onRaise={raiseItem}
                onRemove={remove}
              />
            </div>
          )}
        </div>
      </div>

      <StageDrawer
        catalog={catalog}
        characters={characters}
        backdropId={scene.backdropId}
        getStageRect={getStageRect}
        onSetBackdrop={setBackdrop}
        onAdd={(kind, refId, x, y) => addToScene(kind, refId, x, y)}
      />
    </div>
  )
}
