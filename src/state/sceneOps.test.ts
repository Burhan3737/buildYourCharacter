import { describe, expect, it } from 'vitest'
import {
  MAX_SCALE, MIN_SCALE, STAGE_H, STAGE_W,
  addItem, bringToFront, flipItem, moveItem, removeByRef, removeItem, setScale, topZ,
} from './sceneOps'
import type { Scene } from '../catalog/types'

const scene = (): Scene => ({
  backdropId: 'park',
  items: [
    { id: 'a', kind: 'character', refId: 'c1', x: 100, y: 200, scale: 1, flipX: false, z: 1 },
    { id: 'b', kind: 'prop', refId: 'ball', x: 300, y: 400, scale: 1, flipX: false, z: 2 },
  ],
})

describe('sceneOps', () => {
  it('adds an item on top', () => {
    const s = addItem(scene(), { id: 'c', kind: 'prop', refId: 'tree', x: 0, y: 0 })
    expect(s.items).toHaveLength(3)
    expect(s.items[2].z).toBe(topZ(s))
    expect(s.items[2].scale).toBe(1)
    expect(s.items[2].flipX).toBe(false)
  })

  it('moves an item by a delta', () => {
    const s = moveItem(scene(), 'a', 25, -50)
    expect(s.items[0].x).toBe(125)
    expect(s.items[0].y).toBe(150)
  })

  it('clamps movement to the stage', () => {
    const s = moveItem(scene(), 'a', -9999, 9999)
    expect(s.items[0].x).toBe(0)
    expect(s.items[0].y).toBe(STAGE_H)
    expect(moveItem(scene(), 'b', 9999, 0).items[1].x).toBe(STAGE_W)
  })

  it('clamps scale to the allowed range', () => {
    expect(setScale(scene(), 'a', 99).items[0].scale).toBe(MAX_SCALE)
    expect(setScale(scene(), 'a', 0).items[0].scale).toBe(MIN_SCALE)
    expect(setScale(scene(), 'a', 1.5).items[0].scale).toBe(1.5)
  })

  it('flips an item horizontally', () => {
    expect(flipItem(scene(), 'a').items[0].flipX).toBe(true)
    expect(flipItem(flipItem(scene(), 'a'), 'a').items[0].flipX).toBe(false)
  })

  it('brings an item to the front without disturbing array order', () => {
    const s = bringToFront(scene(), 'a')
    expect(s.items[0].id).toBe('a')
    expect(s.items[0].z).toBeGreaterThan(s.items[1].z)
  })

  it('is a no-op for an unknown id', () => {
    const before = scene()
    expect(moveItem(before, 'zzz', 10, 10)).toEqual(before)
  })

  it('removes by item id and by referenced entity', () => {
    expect(removeItem(scene(), 'a').items.map((i) => i.id)).toEqual(['b'])
    expect(removeByRef(scene(), 'c1').items.map((i) => i.id)).toEqual(['b'])
  })

  it('never mutates the input scene', () => {
    const before = scene()
    moveItem(before, 'a', 10, 10)
    expect(before.items[0].x).toBe(100)
  })
})
