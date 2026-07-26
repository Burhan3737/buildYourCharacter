import { describe, expect, it } from 'vitest'
import { LAYERS, LAYER_Z, isLayerName } from './layers'

describe('layer order', () => {
  it('assigns a z to every layer name', () => {
    for (const l of LAYERS) expect(typeof LAYER_Z[l]).toBe('number')
  })

  it('is strictly ascending in declaration order', () => {
    const zs = LAYERS.map((l) => LAYER_Z[l])
    for (let i = 1; i < zs.length; i++) expect(zs[i]).toBeGreaterThan(zs[i - 1])
  })

  it('puts hair-back behind the body and hair-front in front of it', () => {
    expect(LAYER_Z['hair-back']).toBeLessThan(LAYER_Z.body)
    expect(LAYER_Z['hair-front']).toBeGreaterThan(LAYER_Z.body)
  })

  /**
   * `docs/RESEARCH-HAIR.md` §D.2. Above `face` is forced — otherwise the mouth asset punches
   * through every full beard and a moustache disappears behind the lip. Below `hair-front` is
   * deliberate — long face-framing hair falls in front of the sideburn, so the only styles that
   * interact with a beard at all are the ones where occlusion is the correct reading.
   */
  it('puts the beard above the face and below the front hair', () => {
    expect(LAYER_Z.beard).toBeGreaterThan(LAYER_Z.face)
    expect(LAYER_Z.beard).toBeLessThan(LAYER_Z['hair-front'])
  })

  it('puts headwear above glasses and glasses above hair-front', () => {
    expect(LAYER_Z.headwear).toBeGreaterThan(LAYER_Z.glasses)
    expect(LAYER_Z.glasses).toBeGreaterThan(LAYER_Z['hair-front'])
  })

  it('recognises valid layer names and rejects junk', () => {
    expect(isLayerName('costume')).toBe(true)
    expect(isLayerName('hair')).toBe(false)
    expect(isLayerName('nonsense')).toBe(false)
  })
})
