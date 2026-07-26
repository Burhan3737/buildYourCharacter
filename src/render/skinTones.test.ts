import { describe, expect, it } from 'vitest'
import { SKIN_TONES, DEFAULT_SKIN_ID, skinVars } from './skinTones'

describe('skin tones', () => {
  it('offers a broad ramp with unique ids', () => {
    expect(SKIN_TONES.length).toBeGreaterThanOrEqual(7)
    expect(new Set(SKIN_TONES.map((t) => t.id)).size).toBe(SKIN_TONES.length)
  })

  it('gives every tone three valid hex shades', () => {
    for (const t of SKIN_TONES) {
      for (const v of [t.skin1, t.skin2, t.skin3]) expect(v).toMatch(/^#[0-9A-F]{6}$/i)
    }
  })

  it('maps a tone id to the three css variables', () => {
    expect(skinVars(SKIN_TONES[0].id)).toEqual({
      skin1: SKIN_TONES[0].skin1, skin2: SKIN_TONES[0].skin2, skin3: SKIN_TONES[0].skin3,
    })
  })

  it('falls back to the default tone for an unknown id', () => {
    expect(skinVars('nope')).toEqual(skinVars(DEFAULT_SKIN_ID))
  })
})
