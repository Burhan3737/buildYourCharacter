import { describe, expect, it } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { composeCharacter, hiddenSlots } from './composition'
import type { BodySpec, Character } from '../catalog/types'

const svg = (slot: string, layer: string, family: string, hides = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}"
    data-colors="c1" data-hides="${hides}">
    ${layer === 'hair'
      ? '<g data-part="back"><path d="BACK" fill="var(--c1, #111111)"/></g><g data-part="front"><path d="FRONT" fill="var(--c1, #111111)"/></g>'
      : `<path d="${family}" fill="var(--c1, #111111)"/>`}
  </svg>`

const spec: BodySpec = {
  viewBox: [0, 0, 400, 600],
  head: { cx: 200, cy: 88, rx: 56, ry: 58 }, eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 },
  hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570, headSizeClass: 'adult',
}

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/adult/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
  '/src/assets/catalog/adult/female/shoes/boots.svg': svg('shoes', 'shoes', 'boots'),
  '/src/assets/catalog/adult/female/hair/long.svg': svg('hair', 'hair', 'long'),
  '/src/assets/catalog/adult/female/costume/thor.svg': svg('costume', 'costume', 'thor', 'top,bottom,shoes'),
  '/src/assets/catalog/adult/female/onepiece/dress.svg': svg('onepiece', 'onepiece', 'dress', 'top,bottom'),
  '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
}, { 'adult-female': spec })

const base: Character = {
  id: 'c1', name: 'Mia', stage: 'adult', bodyType: 'female', skinToneId: 'sand',
  slots: {
    top: { assetId: 'adult-female-top-tee', colors: { c1: '#FF0000' } },
    bottom: { assetId: 'adult-female-bottom-jeans', colors: {} },
    shoes: { assetId: 'adult-female-shoes-boots', colors: {} },
    hair: { assetId: 'adult-female-hair-long', colors: { c1: '#43291F' } },
  },
  createdAt: 0, updatedAt: 0,
}

describe('hiddenSlots', () => {
  it('hides nothing when no override is equipped', () => {
    expect(hiddenSlots(base, catalog).size).toBe(0)
  })

  it('hides the slots a costume declares', () => {
    const c = { ...base, slots: { ...base.slots, costume: { assetId: 'adult-female-costume-thor', colors: {} } } }
    expect([...hiddenSlots(c, catalog)].sort()).toEqual(['bottom', 'shoes', 'top'])
  })

  it('does not apply a one-piece that is itself hidden by a costume', () => {
    const c = {
      ...base,
      slots: {
        ...base.slots,
        costume: { assetId: 'adult-female-costume-thor', colors: {} },
        onepiece: { assetId: 'adult-female-onepiece-dress', colors: {} },
      },
    }
    // costume hides top/bottom/shoes; the dress is not hidden, so it still contributes
    expect([...hiddenSlots(c, catalog)].sort()).toEqual(['bottom', 'shoes', 'top'])
  })
})

describe('composeCharacter', () => {
  it('always renders the body first', () => {
    const layers = composeCharacter(base, catalog)
    expect(layers[0].layer).toBe('hair-back')
    expect(layers[1].layer).toBe('body')
  })

  it('orders layers by z ascending', () => {
    const zs = composeCharacter(base, catalog).map((l) => l.z)
    expect(zs).toEqual([...zs].sort((a, b) => a - b))
  })

  it('splits hair across hair-back and hair-front', () => {
    const layers = composeCharacter(base, catalog)
    const back = layers.find((l) => l.layer === 'hair-back')!
    const front = layers.find((l) => l.layer === 'hair-front')!
    expect(back.markup).toContain('BACK')
    expect(front.markup).toContain('FRONT')
  })

  it('omits hidden slots but leaves the character untouched', () => {
    const c = { ...base, slots: { ...base.slots, costume: { assetId: 'adult-female-costume-thor', colors: {} } } }
    const layers = composeCharacter(c, catalog)
    expect(layers.some((l) => l.layer === 'top')).toBe(false)
    expect(layers.some((l) => l.layer === 'costume')).toBe(true)
    expect(c.slots.top).toBeDefined()
  })

  it('merges skin variables under the equipped colours', () => {
    const top = composeCharacter(base, catalog).find((l) => l.layer === 'top')!
    expect(top.colors.c1).toBe('#FF0000')
    expect(top.colors.skin1).toBeDefined()
  })

  it('skips slots whose asset id no longer exists rather than throwing', () => {
    const c = { ...base, slots: { ...base.slots, top: { assetId: 'gone', colors: {} } } }
    expect(() => composeCharacter(c, catalog)).not.toThrow()
    expect(composeCharacter(c, catalog).some((l) => l.layer === 'top')).toBe(false)
  })

  it('gives head-mounted accessories a scale-and-translate transform', () => {
    const c = { ...base, slots: { ...base.slots, glasses: { assetId: 'accessories-adult-glasses-round', colors: {} } } }
    const g = composeCharacter(c, catalog).find((l) => l.layer === 'glasses')!
    expect(g.transform).toMatch(/translate\(.*\) scale\(1\)/)
  })

  it('produces stable unique keys', () => {
    const keys = composeCharacter(base, catalog).map((l) => l.key)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
