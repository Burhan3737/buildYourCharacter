export const LIFE_STAGES = ['newborn', 'toddler', 'teen', 'adult', 'midage', 'elder'] as const
export type LifeStage = (typeof LIFE_STAGES)[number]

export const STAGE_LABELS: Record<LifeStage, string> = {
  newborn: 'Newborn', toddler: 'Toddler', teen: 'Teen',
  adult: 'Adult', midage: 'Middle-aged', elder: 'Grandparent',
}

export const BODY_TYPES = ['female', 'male'] as const
export type BodyType = (typeof BODY_TYPES)[number]

export type BundleKey = `${LifeStage}-${BodyType}`
export const bundleKey = (stage: LifeStage, bodyType: BodyType): BundleKey =>
  `${stage}-${bodyType}`

export const SLOTS = [
  'eyes', 'brows', 'mouth',
  'hair', 'top', 'bottom', 'onepiece', 'shoes',
  'glasses', 'headwear', 'earrings', 'necklace',
  'costume',
] as const
export type Slot = (typeof SLOTS)[number]

/** Slots served by the shared head-mounted pool rather than a per-bundle folder. */
export const ACCESSORY_SLOTS: readonly Slot[] = ['glasses', 'headwear', 'earrings', 'necklace']

/**
 * Slots that can suppress other slots while equipped, in resolution order.
 * `hiddenSlots()` skips an override that is itself already hidden, so the order is
 * the precedence order: a costume that hides `headwear` beats that headwear's own
 * claim on the hair.
 */
export const OVERRIDE_SLOTS: readonly Slot[] = ['costume', 'onepiece', 'headwear']

export const HEAD_SIZE_CLASSES = ['toddler', 'teen', 'adult'] as const
export type HeadSizeClass = (typeof HEAD_SIZE_CLASSES)[number]

export interface Equipped {
  assetId: string
  colors: Record<string, string>
}

export interface Character {
  id: string
  name: string
  stage: LifeStage
  bodyType: BodyType
  skinToneId: string
  slots: Partial<Record<Slot, Equipped>>
  createdAt: number
  updatedAt: number
}

export interface SceneItem {
  id: string
  kind: 'character' | 'prop'
  refId: string
  x: number
  y: number
  scale: number
  flipX: boolean
  z: number
}

export interface Scene {
  backdropId: string
  items: SceneItem[]
}

export interface Point { x: number; y: number }
export interface Box { x: number; y: number; w: number; h: number }

export interface BodySpec {
  viewBox: [number, number, number, number]
  head: { cx: number; cy: number; rx: number; ry: number }
  eyeLine: number
  ears: [Point, Point]
  shoulders: [Point, Point]
  torso: Box
  hips: Box
  footLine: number
  headSizeClass: HeadSizeClass
}
