import { describe, expect, it } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { remapSlots, retarget } from './familyRemap'
import type { BodySpec, Character } from '../catalog/types'

const svg = (slot: string, layer: string, family: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}" data-colors="">
    <path d="M0 0"/></svg>`

const spec = (headSizeClass: 'toddler' | 'teen' | 'adult'): BodySpec => ({
  viewBox: [0, 0, 400, 600], head: { cx: 200, cy: 88, rx: 56, ry: 58 }, eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 }, hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570, headSizeClass,
})

const catalog = buildCatalog({
  '/src/assets/catalog/teen/female/top/hoodie.svg': svg('top', 'top', 'hoodie'),
  '/src/assets/catalog/teen/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/teen/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
  '/src/assets/catalog/adult/female/top/hoodie.svg': svg('top', 'top', 'hoodie'),
  '/src/assets/catalog/adult/female/top/blazer.svg': svg('top', 'top', 'blazer'),
  // adult has no bottoms at all, and no counterpart for 'tee'
  '/src/assets/accessories/teen/glasses/round.svg': svg('glasses', 'glasses', 'round'),
  '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
  '/src/assets/accessories/adult/glasses/square.svg': svg('glasses', 'glasses', 'square'),
}, { 'teen-female': spec('teen'), 'adult-female': spec('adult') })

const teen: Character = {
  id: 'c1', name: 'Mia', stage: 'teen', bodyType: 'female', skinToneId: 'sand',
  slots: {
    top: { assetId: 'teen-female-top-hoodie', colors: { c1: '#FF0000' } },
    bottom: { assetId: 'teen-female-bottom-jeans', colors: {} },
    glasses: { assetId: 'accessories-teen-glasses-round', colors: {} },
  },
  createdAt: 0, updatedAt: 0,
}

describe('remapSlots', () => {
  const next = remapSlots(teen, { stage: 'adult', bodyType: 'female' }, catalog)

  it('keeps the same family when the target bundle has it', () => {
    expect(next.top?.assetId).toBe('adult-female-top-hoodie')
  })

  it('carries colours across', () => {
    expect(next.top?.colors).toEqual({ c1: '#FF0000' })
  })

  it('falls back to the first asset when the family is missing', () => {
    const noMatch = { ...teen, slots: { top: { assetId: 'teen-female-top-tee', colors: {} } } }
    const out = remapSlots(noMatch, { stage: 'adult', bodyType: 'female' }, catalog)
    expect(out.top?.assetId).toBe('adult-female-top-blazer')
  })

  it('clears a slot the target bundle cannot fill at all', () => {
    expect(next.bottom).toBeUndefined()
  })

  it('remaps head-mounted accessories through the shared pool by head class', () => {
    expect(next.glasses?.assetId).toBe('accessories-adult-glasses-round')
  })

  it('is a no-op when the target equals the source', () => {
    expect(remapSlots(teen, { stage: 'teen', bodyType: 'female' }, catalog)).toEqual(teen.slots)
  })
})

describe('retarget', () => {
  it('returns a new character with the target stage and remapped slots', () => {
    const out = retarget(teen, { stage: 'adult', bodyType: 'female' }, catalog)
    expect(out.stage).toBe('adult')
    expect(out.id).toBe(teen.id)
    expect(out.slots.top?.assetId).toBe('adult-female-top-hoodie')
    expect(teen.stage).toBe('teen')
  })
})
