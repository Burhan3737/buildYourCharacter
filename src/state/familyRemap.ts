import type { Catalog } from '../catalog/build'
import type { AssetRecord } from '../catalog/parse'
import {
  ACCESSORY_SLOTS, SLOTS, bundleKey,
  type BodyType, type Character, type LifeStage, type Slot,
} from '../catalog/types'

export interface RemapTarget { stage: LifeStage; bodyType: BodyType }

function poolFor(slot: Slot, target: RemapTarget, catalog: Catalog): AssetRecord[] {
  if (ACCESSORY_SLOTS.includes(slot)) {
    const cls = catalog.specs[bundleKey(target.stage, target.bodyType)]?.headSizeClass
    return cls ? catalog.accessories[cls][slot] : []
  }
  return catalog.bundle[bundleKey(target.stage, target.bodyType)][slot]
}

export function remapSlots(
  character: Character, target: RemapTarget, catalog: Catalog,
): Character['slots'] {
  const out: Character['slots'] = {}

  for (const slot of SLOTS) {
    const equipped = character.slots[slot]
    if (!equipped) continue

    const pool = poolFor(slot, target, catalog)
    if (pool.length === 0) continue          // target cannot fill this slot — clear it

    const family = catalog.byId[equipped.assetId]?.family
    const match = family ? pool.find((a) => a.family === family) : undefined
    out[slot] = { assetId: (match ?? pool[0]).id, colors: { ...equipped.colors } }
  }

  return out
}

export function retarget(
  character: Character, target: RemapTarget, catalog: Catalog,
): Character {
  return {
    ...character,
    stage: target.stage,
    bodyType: target.bodyType,
    slots: remapSlots(character, target, catalog),
    updatedAt: character.updatedAt,
  }
}
