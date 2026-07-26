import { create } from 'zustand'
import type { Catalog } from '../catalog/build'
import {
  bundleKey,
  type BodyType, type Character, type LifeStage, type Scene, type SceneItem, type Slot,
} from '../catalog/types'
import { DEFAULT_SKIN_ID } from '../render/skinTones'
import { retarget } from './familyRemap'
import { randomCharacter } from './randomizer'
import { loadEnvelope, saveEnvelope, type SaveResult } from './persist'
import {
  addItem, bringToFront, flipItem, moveItem, removeByRef, removeItem, setScale,
} from './sceneOps'

let counter = 0
const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`

export interface AppState {
  characters: Character[]
  scene: Scene
  saveError: 'quota' | 'unknown' | null

  hydrate: (storage: Storage) => void
  dismissSaveError: () => void

  createCharacter: (catalog: Catalog) => Character
  addRandomCharacter: (catalog: Catalog) => Character
  updateCharacter: (id: string, patch: Partial<Omit<Character, 'id'>>) => void
  equip: (id: string, slot: Slot, assetId: string, colors: Record<string, string>) => void
  unequip: (id: string, slot: Slot) => void
  setStage: (id: string, stage: LifeStage, catalog: Catalog) => void
  setBodyType: (id: string, bodyType: BodyType, catalog: Catalog) => void
  duplicateCharacter: (id: string) => Character | undefined
  deleteCharacter: (id: string) => void

  setBackdrop: (backdropId: string) => void
  addToScene: (kind: SceneItem['kind'], refId: string, x: number, y: number) => void
  dragItem: (id: string, dx: number, dy: number) => void
  scaleItem: (id: string, scale: number) => void
  flipSceneItem: (id: string) => void
  raiseItem: (id: string) => void
  removeSceneItem: (id: string) => void
}

/** Default character: the first available option in every face slot, nothing else. */
function starterCharacter(catalog: Catalog): Character {
  const stage: LifeStage = 'adult'
  const bodyType: BodyType = 'female'
  const pools = catalog.bundle[bundleKey(stage, bodyType)]
  const slots: Character['slots'] = {}
  for (const slot of ['eyes', 'brows', 'mouth'] as Slot[]) {
    const first = pools[slot][0]
    if (first) slots[slot] = { assetId: first.id, colors: {} }
  }
  const now = Date.now()
  return {
    id: newId('char'), name: 'New character', stage, bodyType,
    skinToneId: DEFAULT_SKIN_ID, slots, createdAt: now, updatedAt: now,
  }
}

export const useAppStore = create<AppState>((set, get) => {
  /** Persist after every mutation. Storage is read lazily so tests can run headless. */
  const persist = () => {
    if (typeof localStorage === 'undefined') return
    const { characters, scene } = get()
    const result: SaveResult = saveEnvelope(localStorage, { version: 1, characters, scene })
    if (!result.ok) set({ saveError: result.reason })
  }

  const mutate = (id: string, fn: (c: Character) => Character) => {
    set((s) => ({
      characters: s.characters.map((c) =>
        c.id === id ? { ...fn(c), updatedAt: Date.now() } : c),
    }))
    persist()
  }

  const onScene = (fn: (scene: Scene) => Scene) => {
    set((s) => ({ scene: fn(s.scene) }))
    persist()
  }

  return {
    characters: [],
    scene: { backdropId: '', items: [] },
    saveError: null,

    hydrate: (storage) => {
      const env = loadEnvelope(storage)
      set({ characters: env.characters, scene: env.scene })
    },
    dismissSaveError: () => set({ saveError: null }),

    createCharacter: (catalog) => {
      const c = starterCharacter(catalog)
      set((s) => ({ characters: [...s.characters, c] }))
      persist()
      return c
    },

    addRandomCharacter: (catalog) => {
      const c = randomCharacter(catalog, Math.random, { id: newId('char'), now: Date.now() })
      set((s) => ({ characters: [...s.characters, c] }))
      persist()
      return c
    },

    updateCharacter: (id, patch) => mutate(id, (c) => ({ ...c, ...patch })),

    equip: (id, slot, assetId, colors) =>
      mutate(id, (c) => ({ ...c, slots: { ...c.slots, [slot]: { assetId, colors } } })),

    unequip: (id, slot) =>
      mutate(id, (c) => {
        const slots = { ...c.slots }
        delete slots[slot]
        return { ...c, slots }
      }),

    setStage: (id, stage, catalog) =>
      mutate(id, (c) => retarget(c, { stage, bodyType: c.bodyType }, catalog)),

    setBodyType: (id, bodyType, catalog) =>
      mutate(id, (c) => retarget(c, { stage: c.stage, bodyType }, catalog)),

    duplicateCharacter: (id) => {
      const source = get().characters.find((c) => c.id === id)
      if (!source) return undefined
      const now = Date.now()
      const copy: Character = {
        ...source,
        id: newId('char'),
        name: `${source.name} copy`,
        slots: structuredClone(source.slots),
        createdAt: now, updatedAt: now,
      }
      set((s) => ({ characters: [...s.characters, copy] }))
      persist()
      return copy
    },

    deleteCharacter: (id) => {
      set((s) => ({
        characters: s.characters.filter((c) => c.id !== id),
        scene: removeByRef(s.scene, id),   // the scene can never outlive its character
      }))
      persist()
    },

    setBackdrop: (backdropId) => onScene((sc) => ({ ...sc, backdropId })),
    addToScene: (kind, refId, x, y) =>
      onScene((sc) => addItem(sc, { id: newId('item'), kind, refId, x, y })),
    dragItem: (id, dx, dy) => onScene((sc) => moveItem(sc, id, dx, dy)),
    scaleItem: (id, scale) => onScene((sc) => setScale(sc, id, scale)),
    flipSceneItem: (id) => onScene((sc) => flipItem(sc, id)),
    raiseItem: (id) => onScene((sc) => bringToFront(sc, id)),
    removeSceneItem: (id) => onScene((sc) => removeItem(sc, id)),
  }
})
