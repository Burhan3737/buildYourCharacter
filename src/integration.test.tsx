import { beforeEach, describe, expect, it } from 'vitest'
import { catalog } from './catalog/loader'
import { useAppStore } from './state/appStore'
import { composeCharacter, hiddenSlots } from './render/composition'
import { loadEnvelope } from './state/persist'
import {
  BODY_TYPES, LIFE_STAGES, SLOTS, bundleKey,
  type Slot,
} from './catalog/types'

/**
 * These run against the REAL catalog produced by import.meta.glob — every one of the
 * ~711 authored SVGs — rather than a fixture. They are the only tests that prove the
 * art, the loader, the renderer and the store agree with each other.
 */

const reset = () => {
  localStorage.clear()
  useAppStore.setState({
    characters: [], scene: { backdropId: '', items: [] }, saveError: null,
  })
}

beforeEach(reset)

describe('the real catalog', () => {
  it('loads every authored asset', () => {
    // A floor, not an exact count — the catalogue is expected to grow, and an exact
    // assertion just forces a test edit per asset. This still catches the failure that
    // matters: the glob silently loading nothing, or a bundle going missing wholesale.
    // Per-bundle completeness is asserted separately below.
    expect(Object.keys(catalog.byId).length).toBeGreaterThanOrEqual(1500)
  })

  it('has a body and a spec for all twelve bundles', () => {
    for (const stage of LIFE_STAGES) {
      for (const bodyType of BODY_TYPES) {
        const key = bundleKey(stage, bodyType)
        expect(catalog.bodies[key], `body missing for ${key}`).toBeDefined()
        expect(catalog.specs[key], `spec missing for ${key}`).toBeDefined()
      }
    }
  })

  it('fills every wardrobe slot in every bundle', () => {
    const wardrobe: Slot[] = [
      'eyes', 'brows', 'mouth', 'hair', 'top', 'bottom', 'onepiece', 'shoes', 'costume',
    ]
    for (const stage of LIFE_STAGES) {
      for (const bodyType of BODY_TYPES) {
        const key = bundleKey(stage, bodyType)
        for (const slot of wardrobe) {
          expect(
            catalog.bundle[key][slot].length,
            `${key} has no ${slot} assets`,
          ).toBeGreaterThan(0)
        }
      }
    }
  })

  /**
   * No facial hair is authored yet (`docs/RESEARCH-HAIR.md` §D.7 also bars it from the newborn
   * and toddler bundles permanently). An empty pool has to be an ordinary, renderable state
   * rather than a crash — that emptiness is what keeps a bearded infant unreachable.
   */
  it('carries a renderable beard pool in every bundle, empty or not', () => {
    for (const stage of LIFE_STAGES) {
      for (const bodyType of BODY_TYPES) {
        const key = bundleKey(stage, bodyType)
        expect(Array.isArray(catalog.bundle[key].beard), `${key} has no beard pool`).toBe(true)
        const character = {
          id: 't', name: 't', stage, bodyType, skinToneId: 'sand',
          slots: {}, createdAt: 0, updatedAt: 0,
        }
        expect(() => composeCharacter(character, catalog)).not.toThrow()
        expect(composeCharacter(character, catalog).some((l) => l.layer === 'beard')).toBe(false)
      }
    }
  })

  it('offers head-mounted accessories for every head size class', () => {
    for (const cls of ['toddler', 'teen', 'adult'] as const) {
      for (const slot of ['glasses', 'headwear', 'earrings', 'necklace'] as Slot[]) {
        expect(catalog.accessories[cls][slot].length, `${cls}/${slot}`).toBeGreaterThan(0)
      }
    }
  })

  it('has props and backdrops for the stage', () => {
    expect(catalog.props.length).toBeGreaterThan(0)
    expect(catalog.backdrops.length).toBeGreaterThan(0)
  })

  it('renders every single asset without throwing', () => {
    // The cheapest possible guard against one bad file breaking the whole app.
    for (const stage of LIFE_STAGES) {
      for (const bodyType of BODY_TYPES) {
        const key = bundleKey(stage, bodyType)
        for (const slot of SLOTS) {
          const pool = catalog.bundle[key][slot]
          for (const asset of pool) {
            const character = {
              id: 't', name: 't', stage, bodyType, skinToneId: 'sand',
              slots: { [slot]: { assetId: asset.id, colors: {} } },
              createdAt: 0, updatedAt: 0,
            }
            expect(
              () => composeCharacter(character, catalog),
              `${asset.id} failed to compose`,
            ).not.toThrow()
          }
        }
      }
    }
  })
})

describe('end-to-end character lifecycle', () => {
  it('creates, dresses, ages, stages, deletes and persists', () => {
    const store = useAppStore.getState()

    // --- create -----------------------------------------------------------
    const character = store.createCharacter(catalog)
    expect(useAppStore.getState().characters).toHaveLength(1)

    // --- dress ------------------------------------------------------------
    const adultTop = catalog.bundle['adult-female'].top.find((a) => a.family === 'hoodie')!
    expect(adultTop).toBeDefined()
    store.equip(character.id, 'top', adultTop.id, { c1: '#FF0000' })
    expect(useAppStore.getState().characters[0].slots.top?.assetId).toBe(adultTop.id)

    // --- age: the same family must survive the stage change ---------------
    store.setStage(character.id, 'teen', catalog)
    const aged = useAppStore.getState().characters[0]
    expect(aged.stage).toBe('teen')
    expect(catalog.byId[aged.slots.top!.assetId].family).toBe('hoodie')
    expect(aged.slots.top!.assetId).toMatch(/^teen-female-top-/)
    expect(aged.slots.top!.colors.c1).toBe('#FF0000')   // colour choices survive ageing

    // --- costume overrides, non-destructively ------------------------------
    const costume = catalog.bundle['teen-female'].costume[0]
    store.equip(character.id, 'costume', costume.id, {})
    const dressed = useAppStore.getState().characters[0]
    expect(hiddenSlots(dressed, catalog).has('top')).toBe(true)
    expect(composeCharacter(dressed, catalog).some((l) => l.layer === 'top')).toBe(false)
    expect(dressed.slots.top).toBeDefined()            // hidden, never destroyed

    store.unequip(character.id, 'costume')
    const undressed = useAppStore.getState().characters[0]
    expect(composeCharacter(undressed, catalog).some((l) => l.layer === 'top')).toBe(true)

    // --- stage ------------------------------------------------------------
    store.setBackdrop(catalog.backdrops[0].id)
    store.addToScene('character', character.id, 400, 500)
    expect(useAppStore.getState().scene.items).toHaveLength(1)

    // --- persistence round-trip -------------------------------------------
    const saved = loadEnvelope(localStorage)
    expect(saved.characters).toHaveLength(1)
    expect(saved.characters[0].slots.top?.colors.c1).toBe('#FF0000')
    expect(saved.scene.items).toHaveLength(1)

    // rehydrate into a blank store, as a page reload would
    useAppStore.setState({ characters: [], scene: { backdropId: '', items: [] } })
    useAppStore.getState().hydrate(localStorage)
    expect(useAppStore.getState().characters).toHaveLength(1)
    expect(useAppStore.getState().scene.items).toHaveLength(1)

    // --- delete cascades into the scene ------------------------------------
    useAppStore.getState().deleteCharacter(character.id)
    expect(useAppStore.getState().characters).toHaveLength(0)
    expect(useAppStore.getState().scene.items).toHaveLength(0)
  })

  it('ages a character through all six stages without losing its identity', () => {
    const store = useAppStore.getState()
    const character = store.createCharacter(catalog)
    const hair = catalog.bundle['adult-female'].hair.find((a) => a.family === 'bob')!
    store.equip(character.id, 'hair', hair.id, { hair1: '#43291F' })

    for (const stage of LIFE_STAGES) {
      useAppStore.getState().setStage(character.id, stage, catalog)
      const current = useAppStore.getState().characters[0]
      const equipped = current.slots.hair
      expect(equipped, `hair lost at ${stage}`).toBeDefined()
      expect(catalog.byId[equipped!.assetId].family).toBe('bob')
      expect(equipped!.colors.hair1).toBe('#43291F')
      expect(() => composeCharacter(current, catalog)).not.toThrow()
    }
  })
})

describe('randomizer against the real catalog', () => {
  it('produces renderable, rule-valid characters every time', () => {
    for (let i = 0; i < 200; i++) {
      const character = useAppStore.getState().addRandomCharacter(catalog)
      const hidden = hiddenSlots(character, catalog)
      for (const slot of hidden) {
        expect(character.slots[slot], `${slot} should be hidden but was equipped`).toBeUndefined()
      }
      const layers = composeCharacter(character, catalog)
      expect(layers.some((l) => l.layer === 'body')).toBe(true)
      expect(layers.some((l) => l.layer === 'face')).toBe(true)
    }
  })
})
