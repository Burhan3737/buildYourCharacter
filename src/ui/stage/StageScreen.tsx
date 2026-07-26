import { useCallback, useMemo, useRef, useState } from 'react'
import type { Catalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'
import { StageDrawer } from './StageDrawer'
import { StageItem } from './StageItem'
import type { RectLike } from './usePointerDrag'

export interface StageScreenProps {
  catalog: Catalog
}

/**
 * One `<svg viewBox="0 0 1600 1000">` scaled by CSS to fit whatever viewport it lands in.
 * Everything on it is drawn into that same coordinate space, so nothing has to know the
 * screen size; `usePointerDrag` divides screen motion by the rendered scale on the way in.
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

  const getStageRect = useCallback((): RectLike | null => {
    const el = svgRef.current
    return el ? el.getBoundingClientRect() : null
  }, [])

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

  return (
    <div data-testid="stage-screen" className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-2">
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
            // free of external requests. `slice` fills the wider stage from a 400x600 asset.
            <g data-testid="stage-backdrop" pointerEvents="none">
              <svg
                viewBox="0 0 400 600" width={STAGE_W} height={STAGE_H}
                preserveAspectRatio="xMidYMid slice"
                dangerouslySetInnerHTML={{ __html: backdrop.markup }}
              />
            </g>
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
              onScale={scaleItem}
              onFlip={flipSceneItem}
              onRaise={raiseItem}
              onRemove={remove}
            />
          ))}
        </svg>
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
