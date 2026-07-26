import type { Scene, SceneItem } from '../catalog/types'

/** Stage coordinate space. The rendered stage scales this to fit the viewport. */
export const STAGE_W = 1600
export const STAGE_H = 1000
export const MIN_SCALE = 0.4
export const MAX_SCALE = 2

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const topZ = (scene: Scene): number =>
  scene.items.reduce((max, i) => Math.max(max, i.z), 0)

const update = (scene: Scene, id: string, fn: (item: SceneItem) => SceneItem): Scene => {
  if (!scene.items.some((i) => i.id === id)) return scene
  return { ...scene, items: scene.items.map((i) => (i.id === id ? fn(i) : i)) }
}

export interface NewItem {
  id: string
  kind: SceneItem['kind']
  refId: string
  x: number
  y: number
}

export const addItem = (scene: Scene, item: NewItem): Scene => ({
  ...scene,
  items: [...scene.items, {
    ...item,
    x: clamp(item.x, 0, STAGE_W),
    y: clamp(item.y, 0, STAGE_H),
    scale: 1,
    flipX: false,
    z: topZ(scene) + 1,
  }],
})

export const moveItem = (scene: Scene, id: string, dx: number, dy: number): Scene =>
  update(scene, id, (i) => ({
    ...i,
    x: clamp(i.x + dx, 0, STAGE_W),
    y: clamp(i.y + dy, 0, STAGE_H),
  }))

export const setScale = (scene: Scene, id: string, scale: number): Scene =>
  update(scene, id, (i) => ({ ...i, scale: clamp(scale, MIN_SCALE, MAX_SCALE) }))

export const flipItem = (scene: Scene, id: string): Scene =>
  update(scene, id, (i) => ({ ...i, flipX: !i.flipX }))

export const bringToFront = (scene: Scene, id: string): Scene =>
  update(scene, id, (i) => ({ ...i, z: topZ(scene) + 1 }))

export const removeItem = (scene: Scene, id: string): Scene => ({
  ...scene, items: scene.items.filter((i) => i.id !== id),
})

/** Used when a character is deleted from the roster. */
export const removeByRef = (scene: Scene, refId: string): Scene => ({
  ...scene, items: scene.items.filter((i) => i.refId !== refId),
})
