import { describe, expect, it } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { hiddenSlots } from '../render/composition'
import { randomCharacter } from './randomizer'
import { SKIN_TONES } from '../render/skinTones'
import type { BodySpec } from '../catalog/types'

const svg = (slot: string, layer: string, family: string, hides = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}"
    data-colors="c1" data-hides="${hides}">
    ${layer === 'hair'
      ? '<g data-part="back"/><g data-part="front"><path d="M0 0" fill="var(--c1, #111111)"/></g>'
      : '<path d="M0 0" fill="var(--c1, #111111)"/>'}</svg>`

const spec: BodySpec = {
  viewBox: [0, 0, 400, 600], head: { cx: 200, cy: 88, rx: 57, ry: 58 }, eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 }, hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570, headSizeClass: 'adult',
}

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/eyes/round.svg': svg('eyes', 'face', 'round'),
  '/src/assets/catalog/adult/female/brows/soft.svg': svg('brows', 'face', 'soft'),
  '/src/assets/catalog/adult/female/mouth/smile.svg': svg('mouth', 'face', 'smile'),
  '/src/assets/catalog/adult/female/hair/bob.svg': svg('hair', 'hair', 'bob'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/adult/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
  '/src/assets/catalog/adult/female/shoes/boots.svg': svg('shoes', 'shoes', 'boots'),
  '/src/assets/catalog/adult/female/onepiece/sundress.svg': svg('onepiece', 'onepiece', 'sundress', 'top,bottom'),
  '/src/assets/catalog/adult/female/costume/thor.svg': svg('costume', 'costume', 'thor', 'top,bottom,shoes'),
  '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
}, { 'adult-female': spec })

/** Deterministic generator so assertions are stable. */
const seeded = (seed: number) => {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
}

describe('randomCharacter', () => {
  it('always fills the face slots', () => {
    for (let i = 0; i < 50; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      expect(c.slots.eyes).toBeDefined()
      expect(c.slots.brows).toBeDefined()
      expect(c.slots.mouth).toBeDefined()
    }
  })

  it('never equips a garment in a slot its own costume hides', () => {
    for (let i = 0; i < 200; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      for (const slot of hiddenSlots(c, catalog)) expect(c.slots[slot]).toBeUndefined()
    }
  })

  it('only references assets that exist', () => {
    for (let i = 0; i < 100; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      for (const eq of Object.values(c.slots)) expect(catalog.byId[eq!.assetId]).toBeDefined()
    }
  })

  it('picks a real skin tone', () => {
    const ids = new Set(SKIN_TONES.map((t) => t.id))
    for (let i = 0; i < 30; i++) {
      expect(ids.has(randomCharacter(catalog, seeded(i)).skinToneId)).toBe(true)
    }
  })

  it('assigns a colour for every variable an asset declares', () => {
    const c = randomCharacter(catalog, seeded(7), { stage: 'adult', bodyType: 'female' })
    for (const [, eq] of Object.entries(c.slots)) {
      for (const v of catalog.byId[eq!.assetId].colors) {
        expect(eq!.colors[v]).toMatch(/^#[0-9A-F]{6}$/i)
      }
    }
  })

  it('honours a requested stage and body type', () => {
    const c = randomCharacter(catalog, seeded(3), { stage: 'adult', bodyType: 'female' })
    expect(c.stage).toBe('adult')
    expect(c.bodyType).toBe('female')
  })

  it('is deterministic for a given rng seed', () => {
    const a = randomCharacter(catalog, seeded(42), { id: 'x', now: 0 })
    const b = randomCharacter(catalog, seeded(42), { id: 'x', now: 0 })
    expect(a).toEqual(b)
  })

  it('produces a usable name', () => {
    expect(randomCharacter(catalog, seeded(1)).name.length).toBeGreaterThan(0)
  })

  it('sometimes dresses the character in a one-piece', () => {
    const rolled = Array.from({ length: 400 }, (_, i) =>
      randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' }))
    expect(rolled.some((c) => c.slots.onepiece)).toBe(true)
  })

  it('still usually rolls a separate top and bottom', () => {
    const rolled = Array.from({ length: 400 }, (_, i) =>
      randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' }))
    expect(rolled.some((c) => c.slots.top && c.slots.bottom)).toBe(true)
  })

  it('never leaves a top or bottom visible under a one-piece', () => {
    for (let i = 0; i < 400; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      if (!c.slots.onepiece) continue
      expect(c.slots.top).toBeUndefined()
      expect(c.slots.bottom).toBeUndefined()
      for (const slot of hiddenSlots(c, catalog)) expect(c.slots[slot]).toBeUndefined()
    }
  })

  it('never combines a one-piece with a costume', () => {
    for (let i = 0; i < 400; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      expect(Boolean(c.slots.onepiece && c.slots.costume)).toBe(false)
    }
  })

  it('still gives a one-piece wearer shoes sometimes, since it does not hide them', () => {
    const withOnePiece = Array.from({ length: 400 }, (_, i) =>
      randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' }))
      .filter((c) => c.slots.onepiece)
    expect(withOnePiece.length).toBeGreaterThan(0)
    expect(withOnePiece.some((c) => c.slots.shoes)).toBe(true)
  })

  it('does not roll a one-piece when the bundle has none', () => {
    const noOnePiece = buildCatalog({
      '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
      '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
      '/src/assets/catalog/adult/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
    }, { 'adult-female': spec })
    for (let i = 0; i < 100; i++) {
      const c = randomCharacter(noOnePiece, seeded(i), { stage: 'adult', bodyType: 'female' })
      expect(c.slots.onepiece).toBeUndefined()
    }
  })
})
