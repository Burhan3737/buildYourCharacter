export const LAYERS = [
  'hair-back', 'body', 'bottom', 'top', 'onepiece', 'shoes',
  'face', 'beard', 'hair-front', 'costume', 'necklace', 'earrings', 'glasses', 'headwear',
] as const
export type LayerName = (typeof LAYERS)[number]

/** Every layer holds at most one asset, so within-layer order is never ambiguous. */
export const LAYER_Z: Record<LayerName, number> = {
  'hair-back': 10,
  body: 20,
  bottom: 30,
  top: 40,
  onepiece: 45,
  shoes: 50,
  face: 60,
  // Above `face` is forced: below it the mouth punches through every beard. Below `hair-front`
  // is deliberate: long face-framing hair falls in front of the sideburn, which is what happens
  // on a head. See `docs/RESEARCH-HAIR.md` §D.2.
  beard: 65,
  'hair-front': 70,
  costume: 80,
  necklace: 85,
  earrings: 90,
  glasses: 95,
  headwear: 100,
}

const LAYER_SET: ReadonlySet<string> = new Set(LAYERS)
export const isLayerName = (v: string): v is LayerName => LAYER_SET.has(v)
