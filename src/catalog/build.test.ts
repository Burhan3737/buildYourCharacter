import { describe, expect, it } from 'vitest'
import { buildCatalog } from './build'
import type { BodySpec } from './types'

const svg = (o: Partial<Record<string, string>>) => `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 600" data-name="${o.name ?? 'X'}" data-family="${o.family ?? 'x'}"
  data-slot="${o.slot}" data-layer="${o.layer}" data-colors="">
  ${o.slot === 'hair' ? '<g data-part="back"/><g data-part="front"/>' : '<path d="M0 0"/>'}
</svg>`

const spec: BodySpec = {
  viewBox: [0, 0, 400, 600],
  head: { cx: 200, cy: 88, rx: 56, ry: 58 },
  eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 },
  hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570,
  headSizeClass: 'adult',
}

const files = {
  '/src/assets/bodies/adult/female/base.svg': svg({ slot: 'eyes', layer: 'body' }),
  '/src/assets/catalog/adult/female/top/hoodie.svg': svg({ slot: 'top', layer: 'top', family: 'hoodie' }),
  '/src/assets/catalog/adult/female/top/tee.svg': svg({ slot: 'top', layer: 'top', family: 'tee' }),
  '/src/assets/catalog/adult/female/hair/bob.svg': svg({ slot: 'hair', layer: 'hair', family: 'bob' }),
  '/src/assets/accessories/adult/glasses/round.svg': svg({ slot: 'glasses', layer: 'glasses' }),
  '/src/assets/props/beach-ball.svg': svg({ slot: 'top', layer: 'top' }),
  '/src/assets/backdrops/park.svg': svg({ slot: 'top', layer: 'top' }),
}

describe('buildCatalog', () => {
  const cat = buildCatalog(files, { 'adult-female': spec })

  it('indexes every asset by id', () => {
    expect(Object.keys(cat.byId)).toHaveLength(7)
    expect(cat.byId['adult-female-top-hoodie'].name).toBe('X')
  })

  it('groups bundle assets by slot', () => {
    expect(cat.bundle['adult-female'].top.map((a) => a.family)).toEqual(['hoodie', 'tee'])
    expect(cat.bundle['adult-female'].hair).toHaveLength(1)
  })

  it('sorts each slot pool by name for stable tray order', () => {
    const names = cat.bundle['adult-female'].top.map((a) => a.id)
    expect(names).toEqual([...names].sort())
  })

  it('keeps bodies out of the wearable pools', () => {
    expect(cat.bodies['adult-female']?.id).toBe('bodies-adult-female-base')
    expect(cat.bundle['adult-female'].eyes).toEqual([])
  })

  it('routes accessories by head size class', () => {
    expect(cat.accessories.adult.glasses).toHaveLength(1)
    expect(cat.accessories.toddler.glasses).toEqual([])
  })

  it('collects props and backdrops', () => {
    expect(cat.props.map((a) => a.id)).toEqual(['props-beach-ball'])
    expect(cat.backdrops.map((a) => a.id)).toEqual(['backdrops-park'])
  })

  it('attaches body specs', () => {
    expect(cat.specs['adult-female']?.headSizeClass).toBe('adult')
  })

  it('gives every bundle key an entry even when it has no assets', () => {
    expect(cat.bundle['newborn-male'].top).toEqual([])
  })

  it('throws with the file path when an asset fails to parse', () => {
    expect(() => buildCatalog({ '/src/assets/props/bad.svg': '<svg><x></svg>' }, {}))
      .toThrow(/props\/bad\.svg/)
  })
})
