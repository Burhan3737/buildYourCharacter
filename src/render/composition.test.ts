import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildCatalog } from '../catalog/build'
import { ACCESSORY_REF, composeCharacter, headTransform, hiddenSlots } from './composition'
import {
  BODY_TYPES, HEAD_SIZE_CLASSES, LIFE_STAGES, bundleKey,
  type BodySpec, type Character, type HeadSizeClass,
} from '../catalog/types'

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
  head: { cx: 200, cy: 88, rx: 57, ry: 58 }, eyeLine: 96,
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
  // A full-coverage head covering has to be able to suppress the hair underneath it.
  '/src/assets/accessories/adult/headwear/hijab.svg': svg('headwear', 'headwear', 'hijab', 'hair'),
  '/src/assets/accessories/adult/headwear/cap.svg': svg('headwear', 'headwear', 'cap'),
  '/src/assets/catalog/adult/female/costume/mascot.svg':
    svg('costume', 'costume', 'mascot', 'headwear'),
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

/**
 * Head-mounted art is drawn once per head size class and mapped onto every bundle in that
 * class by `headTransform`, which only knows about the head circle. So a bundle may only
 * borrow a class if that same transform also lands the class's *eye line* on its own —
 * otherwise every brim, lens and band in the pool sits at the wrong height on the face, and
 * nothing in the suite notices because the files themselves are all still valid.
 *
 * `newborn` is the case this guards: it declares `headSizeClass: "toddler"` with an rx of 88
 * against the toddler reference of 82, and is only legitimate because its eye line rides at
 * the same fraction of the head.
 */
describe('head size classes', () => {
  const readSpec = (bundle: string): BodySpec =>
    JSON.parse(readFileSync(join(process.cwd(), 'specs', 'bodies', `${bundle}.json`), 'utf8'))

  const bundles = LIFE_STAGES.flatMap((s) => BODY_TYPES.map((b) => bundleKey(s, b)))

  it('takes each reference head straight from its namesake stage', () => {
    for (const cls of HEAD_SIZE_CLASSES) {
      for (const bodyType of BODY_TYPES) {
        const { head } = readSpec(bundleKey(cls, bodyType))
        expect({ cls, ...ACCESSORY_REF[cls] }).toEqual({ cls, cx: head.cx, cy: head.cy, rx: head.rx })
      }
    }
  })

  // The reference eye line for a class is the eye line of the stage it is named after.
  const refEyeLine = Object.fromEntries(
    HEAD_SIZE_CLASSES.map((cls) => [cls, readSpec(bundleKey(cls, 'female')).eyeLine]),
  ) as Record<HeadSizeClass, number>

  it.each(bundles)('%s lands its class reference head and eye line on its own face', (bundle) => {
    const spec = readSpec(bundle)
    const ref = ACCESSORY_REF[spec.headSizeClass]
    const m = headTransform(spec, ref).match(/translate\((-?[\d.]+) (-?[\d.]+)\) scale\(([\d.]+)\)/)
    expect(m).not.toBeNull()
    const tx = Number(m![1]); const ty = Number(m![2]); const s = Number(m![3])

    const map = (y: number) => y * s + ty
    expect(Math.abs(ref.cx * s + tx - spec.head.cx)).toBeLessThan(0.5)
    expect(Math.abs(map(ref.cy) - spec.head.cy)).toBeLessThan(0.5)
    expect(Math.abs(ref.rx * s - spec.head.rx)).toBeLessThan(0.5)
    // Same head shape, so a hat drawn on the class's skull still follows this one.
    const refSpec = readSpec(bundleKey(spec.headSizeClass, 'female'))
    expect(Math.abs(refSpec.head.ry * s - spec.head.ry)).toBeLessThan(3)
    // And the eye line the art was drawn against lands on this bundle's real eye line.
    expect(Math.abs(map(refEyeLine[spec.headSizeClass]) - spec.eyeLine)).toBeLessThan(3)
  })
})

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

  it('honours data-hides on headwear', () => {
    const c = {
      ...base,
      slots: { ...base.slots, headwear: { assetId: 'accessories-adult-headwear-hijab', colors: {} } },
    }
    expect([...hiddenSlots(c, catalog)]).toEqual(['hair'])
  })

  it('leaves the hair alone for headwear that declares no hides', () => {
    const c = {
      ...base,
      slots: { ...base.slots, headwear: { assetId: 'accessories-adult-headwear-cap', colors: {} } },
    }
    expect(hiddenSlots(c, catalog).size).toBe(0)
  })

  it('does not apply headwear that is itself hidden by a costume', () => {
    const c = {
      ...base,
      slots: {
        ...base.slots,
        costume: { assetId: 'adult-female-costume-mascot', colors: {} },
        headwear: { assetId: 'accessories-adult-headwear-hijab', colors: {} },
      },
    }
    // The costume wins: the headwear goes, and takes its claim on the hair with it.
    expect([...hiddenSlots(c, catalog)]).toEqual(['headwear'])
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

  it('drops both hair layers when the headwear covers the hair', () => {
    const c = {
      ...base,
      slots: { ...base.slots, headwear: { assetId: 'accessories-adult-headwear-hijab', colors: {} } },
    }
    const layers = composeCharacter(c, catalog)
    expect(layers.some((l) => l.layer === 'hair-back')).toBe(false)
    expect(layers.some((l) => l.layer === 'hair-front')).toBe(false)
    expect(layers.some((l) => l.layer === 'headwear')).toBe(true)
  })

  it('keeps the hair under headwear that does not declare it hidden', () => {
    const c = {
      ...base,
      slots: { ...base.slots, headwear: { assetId: 'accessories-adult-headwear-cap', colors: {} } },
    }
    const layers = composeCharacter(c, catalog)
    expect(layers.some((l) => l.layer === 'hair-back')).toBe(true)
    expect(layers.some((l) => l.layer === 'hair-front')).toBe(true)
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
