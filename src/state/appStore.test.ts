import { beforeEach, describe, expect, it, vi } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { useAppStore } from './appStore'
import type { BodySpec } from '../catalog/types'

const svg = (slot: string, layer: string, family: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}" data-colors="c1">
    ${layer === 'hair'
      ? '<g data-part="back"/><g data-part="front"><path d="M0 0" fill="var(--c1, #111)"/></g>'
      : '<path d="M0 0" fill="var(--c1, #111111)"/>'}</svg>`

const spec: BodySpec = {
  viewBox: [0, 0, 400, 600], head: { cx: 200, cy: 88, rx: 56, ry: 58 }, eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 }, hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570, headSizeClass: 'adult',
}

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/bodies/teen/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/eyes/round.svg': svg('eyes', 'face', 'round'),
  '/src/assets/catalog/adult/female/brows/soft.svg': svg('brows', 'face', 'soft'),
  '/src/assets/catalog/adult/female/mouth/smile.svg': svg('mouth', 'face', 'smile'),
  '/src/assets/catalog/adult/female/hair/bob.svg': svg('hair', 'hair', 'bob'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/teen/female/top/tee.svg': svg('top', 'top', 'tee'),
}, { 'adult-female': spec, 'teen-female': { ...spec, headSizeClass: 'teen' } })

const reset = () => useAppStore.setState({
  characters: [], scene: { backdropId: '', items: [] }, saveError: null,
})

beforeEach(reset)

describe('appStore', () => {
  it('creates a character with a unique id', () => {
    const a = useAppStore.getState().createCharacter(catalog)
    const b = useAppStore.getState().createCharacter(catalog)
    expect(a.id).not.toBe(b.id)
    expect(useAppStore.getState().characters).toHaveLength(2)
  })

  it('equips and unequips a slot', () => {
    const c = useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().equip(c.id, 'top', 'adult-female-top-tee', { c1: '#FF0000' })
    expect(useAppStore.getState().characters[0].slots.top?.colors.c1).toBe('#FF0000')
    useAppStore.getState().unequip(c.id, 'top')
    expect(useAppStore.getState().characters[0].slots.top).toBeUndefined()
  })

  it('bumps updatedAt on every edit', () => {
    const c = useAppStore.getState().createCharacter(catalog)
    const before = useAppStore.getState().characters[0].updatedAt
    useAppStore.getState().updateCharacter(c.id, { name: 'Zed' })
    expect(useAppStore.getState().characters[0].updatedAt).toBeGreaterThanOrEqual(before)
    expect(useAppStore.getState().characters[0].name).toBe('Zed')
  })

  it('remaps slots by family when the stage changes', () => {
    const c = useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().equip(c.id, 'top', 'adult-female-top-tee', {})
    useAppStore.getState().setStage(c.id, 'teen', catalog)
    const out = useAppStore.getState().characters[0]
    expect(out.stage).toBe('teen')
    expect(out.slots.top?.assetId).toBe('teen-female-top-tee')
  })

  it('duplicates a character under a new id and a new name', () => {
    const c = useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().updateCharacter(c.id, { name: 'Mia' })
    const copy = useAppStore.getState().duplicateCharacter(c.id)!
    expect(copy.id).not.toBe(c.id)
    expect(copy.name).toBe('Mia copy')
    expect(useAppStore.getState().characters).toHaveLength(2)
  })

  it('removes a deleted character from the scene', () => {
    const c = useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().addToScene('character', c.id, 100, 100)
    expect(useAppStore.getState().scene.items).toHaveLength(1)
    useAppStore.getState().deleteCharacter(c.id)
    expect(useAppStore.getState().characters).toHaveLength(0)
    expect(useAppStore.getState().scene.items).toHaveLength(0)
  })

  it('drags, scales, flips and raises scene items', () => {
    const c = useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().addToScene('character', c.id, 100, 100)
    const id = useAppStore.getState().scene.items[0].id
    useAppStore.getState().dragItem(id, 10, 20)
    useAppStore.getState().scaleItem(id, 1.5)
    useAppStore.getState().flipSceneItem(id)
    const item = useAppStore.getState().scene.items[0]
    expect([item.x, item.y, item.scale, item.flipX]).toEqual([110, 120, 1.5, true])
  })

  it('adds a valid random character', () => {
    // This fixture catalog only populates face assets for the adult-female bundle, so pin
    // Math.random to resolve stage/bodyType to 'adult'/'female' — addRandomCharacter itself
    // does not take a stage/bodyType, by design, so it can land anywhere in a real catalog.
    const rng = vi.spyOn(Math, 'random')
    rng.mockReturnValueOnce(0.5).mockReturnValueOnce(0).mockReturnValue(0)
    const c = useAppStore.getState().addRandomCharacter(catalog)
    rng.mockRestore()
    expect(c.slots.eyes).toBeDefined()
    expect(catalog.byId[c.slots.eyes!.assetId]).toBeDefined()
  })

  it('is a no-op for actions on an unknown character id', () => {
    expect(() => useAppStore.getState().equip('nope', 'top', 'x', {})).not.toThrow()
    expect(useAppStore.getState().characters).toHaveLength(0)
  })
})
