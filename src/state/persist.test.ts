import { beforeEach, describe, expect, it, vi } from 'vitest'
import { STORAGE_KEY, emptyEnvelope, loadEnvelope, saveEnvelope } from './persist'

class MemoryStorage {
  map = new Map<string, string>()
  quotaAfter = Infinity
  getItem(k: string) { return this.map.get(k) ?? null }
  setItem(k: string, v: string) {
    if (this.map.size >= this.quotaAfter) {
      const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e
    }
    this.map.set(k, v)
  }
  removeItem(k: string) { this.map.delete(k) }
}

let s: MemoryStorage
beforeEach(() => { s = new MemoryStorage() })

describe('persistence', () => {
  it('returns an empty envelope when nothing is stored', () => {
    expect(loadEnvelope(s as unknown as Storage)).toEqual(emptyEnvelope())
  })

  it('round-trips an envelope', () => {
    const env = { ...emptyEnvelope(), scene: { backdropId: 'park', items: [] } }
    expect(saveEnvelope(s as unknown as Storage, env)).toEqual({ ok: true })
    expect(loadEnvelope(s as unknown as Storage).scene.backdropId).toBe('park')
  })

  it('reports quota failures instead of throwing', () => {
    s.quotaAfter = 0
    expect(saveEnvelope(s as unknown as Storage, emptyEnvelope())).toEqual({ ok: false, reason: 'quota' })
  })

  it('falls back to an empty envelope on corrupt json and quarantines the payload', () => {
    s.map.set(STORAGE_KEY, '{not json')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(loadEnvelope(s as unknown as Storage)).toEqual(emptyEnvelope())
    expect(s.getItem(`${STORAGE_KEY}.corrupt`)).toBe('{not json')
    warn.mockRestore()
  })

  it('falls back when the payload is valid json but the wrong shape', () => {
    s.map.set(STORAGE_KEY, '[1,2,3]')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(loadEnvelope(s as unknown as Storage)).toEqual(emptyEnvelope())
    warn.mockRestore()
  })

  it('drops characters that are not objects rather than failing the whole load', () => {
    s.map.set(STORAGE_KEY, JSON.stringify({ version: 1, characters: [null, { id: 'a' }], scene: { backdropId: '', items: [] } }))
    expect(loadEnvelope(s as unknown as Storage).characters).toHaveLength(1)
  })
})
