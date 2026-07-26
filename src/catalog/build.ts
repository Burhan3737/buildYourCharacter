import { assetIdFromPath, parseAsset, type AssetRecord } from './parse'
import {
  BODY_TYPES, HEAD_SIZE_CLASSES, LIFE_STAGES, SLOTS, bundleKey,
  type BodySpec, type BundleKey, type HeadSizeClass, type Slot,
} from './types'

export type SlotPools = Record<Slot, AssetRecord[]>

export interface Catalog {
  byId: Record<string, AssetRecord>
  bundle: Record<BundleKey, SlotPools>
  accessories: Record<HeadSizeClass, SlotPools>
  bodies: Partial<Record<BundleKey, AssetRecord>>
  specs: Partial<Record<BundleKey, BodySpec>>
  props: AssetRecord[]
  backdrops: AssetRecord[]
}

export const emptySlotMap = (): SlotPools =>
  Object.fromEntries(SLOTS.map((s) => [s, [] as AssetRecord[]])) as SlotPools

export function buildCatalog(
  files: Record<string, string>,
  specs: Record<string, BodySpec> = {},
): Catalog {
  const bundle = Object.fromEntries(
    LIFE_STAGES.flatMap((st) => BODY_TYPES.map((bt) => [bundleKey(st, bt), emptySlotMap()])),
  ) as Record<BundleKey, SlotPools>

  const accessories = Object.fromEntries(
    HEAD_SIZE_CLASSES.map((c) => [c, emptySlotMap()]),
  ) as Record<HeadSizeClass, SlotPools>

  const cat: Catalog = {
    byId: {}, bundle, accessories, bodies: {},
    specs: specs as Catalog['specs'], props: [], backdrops: [],
  }

  for (const path of Object.keys(files).sort()) {
    const id = assetIdFromPath(path)
    let asset: AssetRecord
    try {
      asset = parseAsset(id, files[path])
    } catch (err) {
      throw new Error(`${path}: ${(err as Error).message}`)
    }
    cat.byId[id] = asset

    const rel = path.replace(/^.*\/assets\//, '').replace(/\.svg$/, '')
    const seg = rel.split('/')

    if (seg[0] === 'bodies') {
      cat.bodies[bundleKey(seg[1] as never, seg[2] as never)] = asset
    } else if (seg[0] === 'catalog') {
      bundle[bundleKey(seg[1] as never, seg[2] as never)][asset.slot].push(asset)
    } else if (seg[0] === 'accessories') {
      accessories[seg[1] as HeadSizeClass][asset.slot].push(asset)
    } else if (seg[0] === 'props') {
      cat.props.push(asset)
    } else if (seg[0] === 'backdrops') {
      cat.backdrops.push(asset)
    }
  }

  return cat
}
