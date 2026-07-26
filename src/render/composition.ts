import type { Catalog } from '../catalog/build'
import { LAYER_Z, type LayerName } from '../catalog/layers'
import {
  ACCESSORY_SLOTS, OVERRIDE_SLOTS, SLOTS, bundleKey,
  type BodySpec, type Character, type HeadSizeClass, type Slot,
} from '../catalog/types'
import { skinVars } from './skinTones'

/**
 * Reference head each accessory class is drawn against. Accessory artists place their
 * work over this circle; the renderer maps it onto whatever head the target body has.
 */
export interface RefHead { cx: number; cy: number; rx: number }
export const ACCESSORY_REF: Record<HeadSizeClass, RefHead> = {
  toddler: { cx: 200, cy: 268, rx: 82 },
  teen: { cx: 200, cy: 132, rx: 60 },
  adult: { cx: 200, cy: 91, rx: 56 },
}

export interface RenderLayer {
  key: string
  layer: LayerName
  z: number
  markup: string
  colors: Record<string, string>
  transform?: string
}

/**
 * Circle-to-circle map from the accessory's reference head onto this body's head.
 * Uniform scale, so nothing is ever distorted.
 */
export function headTransform(spec: BodySpec, ref: RefHead): string {
  const s = spec.head.rx / ref.rx
  const tx = spec.head.cx - ref.cx * s
  const ty = spec.head.cy - ref.cy * s
  return `translate(${round(tx)} ${round(ty)}) scale(${round(s)})`
}

const round = (n: number) => Math.round(n * 1000) / 1000

export function hiddenSlots(character: Character, catalog: Catalog): Set<Slot> {
  const hidden = new Set<Slot>()
  for (const slot of OVERRIDE_SLOTS) {
    if (hidden.has(slot)) continue
    const equipped = character.slots[slot]
    if (!equipped) continue
    const asset = catalog.byId[equipped.assetId]
    if (!asset) continue
    for (const s of asset.hides) hidden.add(s)
  }
  return hidden
}

export function composeCharacter(character: Character, catalog: Catalog): RenderLayer[] {
  const key = bundleKey(character.stage, character.bodyType)
  const spec = catalog.specs[key]
  const skin = skinVars(character.skinToneId)
  const layers: RenderLayer[] = []

  const body = catalog.bodies[key]
  if (body) {
    layers.push({
      key: `body:${body.id}`, layer: 'body', z: LAYER_Z.body,
      markup: body.markup, colors: skin,
    })
  }

  const hidden = hiddenSlots(character, catalog)

  for (const slot of SLOTS) {
    if (hidden.has(slot)) continue
    const equipped = character.slots[slot]
    if (!equipped) continue
    const asset = catalog.byId[equipped.assetId]
    if (!asset) continue

    const colors = { ...skin, ...equipped.colors }
    const transform =
      spec && ACCESSORY_SLOTS.includes(slot)
        ? headTransform(spec, ACCESSORY_REF[spec.headSizeClass])
        : undefined

    if (asset.layer === 'hair') {
      if (asset.backMarkup.trim()) {
        layers.push({
          key: `hair-back:${asset.id}`, layer: 'hair-back', z: LAYER_Z['hair-back'],
          markup: asset.backMarkup, colors,
        })
      }
      if (asset.markup.trim()) {
        layers.push({
          key: `hair-front:${asset.id}`, layer: 'hair-front', z: LAYER_Z['hair-front'],
          markup: asset.markup, colors,
        })
      }
    } else {
      layers.push({
        key: `${asset.layer}:${asset.id}`, layer: asset.layer, z: LAYER_Z[asset.layer],
        markup: asset.markup, colors, transform,
      })
    }
  }

  return layers.sort((a, b) => a.z - b.z)
}
