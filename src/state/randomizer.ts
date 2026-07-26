import type { Catalog } from '../catalog/build'
import type { AssetRecord } from '../catalog/parse'
import {
  ACCESSORY_SLOTS, BODY_TYPES, LIFE_STAGES, OVERRIDE_SLOTS, bundleKey,
  type BodyType, type Character, type LifeStage, type Slot,
} from '../catalog/types'
import { SKIN_TONES } from '../render/skinTones'
import { GARMENT_PALETTE, HAIR_PALETTE, NAMES } from './palettes'

export type Rng = () => number

export interface RandomOptions {
  stage?: LifeStage
  bodyType?: BodyType
  id?: string
  name?: string
  now?: number
}

/** Slots that must always be filled, in the order they are rolled. */
const REQUIRED: readonly Slot[] = ['eyes', 'brows', 'mouth', 'hair']
/** Slots rolled only when neither a costume nor a one-piece was chosen. */
const OUTFIT: readonly Slot[] = ['top', 'bottom', 'shoes']
/** How often a non-costumed character wears a dress or jumpsuit instead of a top+bottom. */
const ONE_PIECE_CHANCE = 0.3
/** Slots rolled with a probability rather than always. */
const OPTIONAL: readonly { slot: Slot; chance: number }[] = [
  { slot: 'glasses', chance: 0.25 },
  { slot: 'headwear', chance: 0.2 },
  { slot: 'earrings', chance: 0.15 },
  { slot: 'necklace', chance: 0.15 },
]

const pick = <T,>(rng: Rng, xs: readonly T[]): T | undefined =>
  xs.length ? xs[Math.floor(rng() * xs.length)] : undefined

export function randomCharacter(
  catalog: Catalog, rng: Rng, opts: RandomOptions = {},
): Character {
  const stage = opts.stage ?? pick(rng, LIFE_STAGES)!
  const bodyType = opts.bodyType ?? pick(rng, BODY_TYPES)!
  const headClass = catalog.specs[bundleKey(stage, bodyType)]?.headSizeClass

  const poolFor = (slot: Slot): AssetRecord[] =>
    ACCESSORY_SLOTS.includes(slot)
      ? (headClass ? catalog.accessories[headClass][slot] : [])
      : catalog.bundle[bundleKey(stage, bodyType)][slot]

  const slots: Character['slots'] = {}

  const equip = (slot: Slot) => {
    const asset = pick(rng, poolFor(slot))
    if (!asset) return
    const ramp = slot === 'hair' ? HAIR_PALETTE : GARMENT_PALETTE
    const colors: Record<string, string> = {}
    for (const v of asset.colors) colors[v] = pick(rng, ramp)!
    slots[slot] = { assetId: asset.id, colors }
  }

  for (const slot of REQUIRED) equip(slot)

  // A costume replaces the whole outfit; roll it first so the outfit roll can be skipped.
  const costumes = poolFor('costume')
  const wearsCostume = costumes.length > 0 && rng() < 0.2
  if (wearsCostume) {
    equip('costume')
  } else {
    // A one-piece (dress, jumpsuit) replaces the top and bottom but not the shoes.
    const onePieces = poolFor('onepiece')
    const wearsOnePiece = onePieces.length > 0 && rng() < ONE_PIECE_CHANCE
    if (wearsOnePiece) {
      equip('onepiece')
      equip('shoes')
    } else {
      for (const slot of OUTFIT) equip(slot)
    }
  }

  for (const { slot, chance } of OPTIONAL) {
    if (rng() < chance) equip(slot)
  }

  // Belt and braces: never leave a slot equipped that an override hides.
  for (const override of OVERRIDE_SLOTS) {
    const equipped = slots[override]
    const asset = equipped && catalog.byId[equipped.assetId]
    for (const hidden of asset?.hides ?? []) delete slots[hidden]
  }

  const now = opts.now ?? 0
  return {
    id: opts.id ?? `rnd-${Math.floor(rng() * 1e9).toString(36)}`,
    name: opts.name ?? pick(rng, NAMES)!,
    stage, bodyType,
    skinToneId: pick(rng, SKIN_TONES)!.id,
    slots,
    createdAt: now, updatedAt: now,
  }
}
