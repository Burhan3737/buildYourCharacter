import type { Character, Scene } from '../catalog/types'

export const STORAGE_KEY = 'tocacraft.v1'
export const CURRENT_VERSION = 1

export interface Envelope {
  version: number
  characters: Character[]
  scene: Scene
}

export type SaveResult = { ok: true } | { ok: false; reason: 'quota' | 'unknown' }

export const emptyEnvelope = (): Envelope => ({
  version: CURRENT_VERSION,
  characters: [],
  scene: { backdropId: '', items: [] },
})

/**
 * version -> function that upgrades a payload of that version to version + 1.
 * Add an entry here whenever the schema changes; never edit an existing one.
 */
export const MIGRATIONS: Record<number, (data: Envelope) => Envelope> = {}

function migrate(data: Envelope): Envelope {
  let out = data
  while (out.version < CURRENT_VERSION) {
    const step = MIGRATIONS[out.version]
    if (!step) return { ...out, version: CURRENT_VERSION }
    out = step(out)
  }
  return out
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export function loadEnvelope(storage: Storage): Envelope {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return emptyEnvelope()

  const quarantine = (why: string): Envelope => {
    console.warn(`[tocacraft] ${why}; starting fresh. Payload kept at ${STORAGE_KEY}.corrupt`)
    try { storage.setItem(`${STORAGE_KEY}.corrupt`, raw) } catch { /* nothing more we can do */ }
    return emptyEnvelope()
  }

  let parsed: unknown
  try { parsed = JSON.parse(raw) } catch { return quarantine('stored state is not valid JSON') }
  if (!isRecord(parsed)) return quarantine('stored state is not an object')

  const scene = isRecord(parsed.scene) ? (parsed.scene as unknown as Scene) : emptyEnvelope().scene
  const characters = Array.isArray(parsed.characters)
    ? (parsed.characters.filter(isRecord) as unknown as Character[])
    : []

  return migrate({
    version: typeof parsed.version === 'number' ? parsed.version : CURRENT_VERSION,
    characters,
    scene: { backdropId: scene.backdropId ?? '', items: Array.isArray(scene.items) ? scene.items : [] },
  })
}

export function saveEnvelope(storage: Storage, env: Envelope): SaveResult {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ ...env, version: CURRENT_VERSION }))
    return { ok: true }
  } catch (err) {
    const name = (err as { name?: string }).name ?? ''
    const quota = name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED'
    return { ok: false, reason: quota ? 'quota' : 'unknown' }
  }
}
