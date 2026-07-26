import { SLOTS, type Slot } from './types'
import { isLayerName, type LayerName } from './layers'

export class AssetParseError extends Error {}

export interface AssetRecord {
  id: string
  name: string
  family: string
  slot: Slot
  /** 'hair' is a pseudo-layer; composition expands it to hair-back + hair-front. */
  layer: LayerName | 'hair'
  colors: string[]
  hides: Slot[]
  /** Children of <svg>, or the front group for hair. */
  markup: string
  /** The back group for hair; '' for everything else. */
  backMarkup: string
}

/** '/src/assets/catalog/adult/female/hair/bob.svg' -> 'adult-female-hair-bob' */
export function assetIdFromPath(path: string): string {
  return path
    .replace(/^.*\/assets\//, '')
    .replace(/\.svg$/, '')
    .split('/')
    .filter((seg) => seg !== 'catalog')
    .join('-')
}

const splitList = (raw: string): string[] =>
  raw.split(',').map((s) => s.trim()).filter(Boolean)

const serializer = new XMLSerializer()
const innerMarkup = (el: Element): string =>
  Array.from(el.childNodes).map((n) => serializer.serializeToString(n)).join('')

export function parseAsset(id: string, raw: string): AssetRecord {
  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml')
  if (doc.getElementsByTagName('parsererror').length > 0) {
    throw new AssetParseError(`${id}: not well-formed XML`)
  }
  const root = doc.documentElement
  if (root.localName !== 'svg') {
    throw new AssetParseError(`${id}: root is <${root.localName}>, expected <svg>`)
  }

  const attr = (n: string) => root.getAttribute(n) ?? ''
  const slot = attr('data-slot')
  if (!(SLOTS as readonly string[]).includes(slot)) {
    throw new AssetParseError(`${id}: unknown data-slot "${slot}"`)
  }
  const layerAttr = attr('data-layer')

  let markup: string
  let backMarkup = ''

  if (layerAttr === 'hair') {
    const groups = Array.from(root.children).filter((el) => el.localName === 'g')
    const back = groups.find((g) => g.getAttribute('data-part') === 'back')
    const front = groups.find((g) => g.getAttribute('data-part') === 'front')
    if (!back) throw new AssetParseError(`${id}: hair asset missing <g data-part="back">`)
    if (!front) throw new AssetParseError(`${id}: hair asset missing <g data-part="front">`)
    backMarkup = innerMarkup(back)
    markup = innerMarkup(front)
  } else {
    if (!isLayerName(layerAttr)) {
      throw new AssetParseError(`${id}: unknown data-layer "${layerAttr}"`)
    }
    markup = innerMarkup(root)
  }

  return {
    id,
    name: attr('data-name') || id,
    family: attr('data-family') || id,
    slot: slot as Slot,
    layer: layerAttr as LayerName | 'hair',
    colors: splitList(attr('data-colors')),
    hides: splitList(attr('data-hides')) as Slot[],
    markup,
    backMarkup,
  }
}
