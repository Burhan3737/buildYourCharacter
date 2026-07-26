import { buildCatalog, type Catalog } from '../../catalog/build'
import type { BodySpec, Character } from '../../catalog/types'

/**
 * Test-only fixture. A small but structurally complete catalog: three bundles so
 * stage/body-type retargeting has somewhere to land, a costume that hides the outfit,
 * and a shared accessory pool.
 */

const svg = (slot: string, layer: string, family: string, hides = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}" data-colors="c1"
    data-hides="${hides}">
    ${layer === 'hair'
    ? `<g data-part="back"><path class="mark-${family}-back" d="M0 0"/></g>
       <g data-part="front"><path class="mark-${family}" d="M0 0" fill="var(--c1, #111111)"/></g>`
    : `<path class="mark-${family}" d="M0 0" fill="var(--c1, #111111)"/>`}
  </svg>`

export const ADULT_SPEC: BodySpec = {
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

export function makeCatalog(): Catalog {
  return buildCatalog(
    {
      '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
      '/src/assets/bodies/adult/male/base.svg': svg('eyes', 'body', 'base'),
      '/src/assets/bodies/teen/female/base.svg': svg('eyes', 'body', 'base'),

      '/src/assets/catalog/adult/female/eyes/round.svg': svg('eyes', 'face', 'round'),
      '/src/assets/catalog/adult/female/eyes/wide.svg': svg('eyes', 'face', 'wide'),
      '/src/assets/catalog/adult/female/brows/soft.svg': svg('brows', 'face', 'soft'),
      '/src/assets/catalog/adult/female/mouth/smile.svg': svg('mouth', 'face', 'smile'),
      '/src/assets/catalog/adult/female/hair/bob.svg': svg('hair', 'hair', 'bob'),
      '/src/assets/catalog/adult/female/hair/curls.svg': svg('hair', 'hair', 'curls'),
      '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
      '/src/assets/catalog/adult/female/top/hoodie.svg': svg('top', 'top', 'hoodie'),
      '/src/assets/catalog/adult/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
      '/src/assets/catalog/adult/female/shoes/sneaker.svg': svg('shoes', 'shoes', 'sneaker'),
      '/src/assets/catalog/adult/female/onepiece/sundress.svg':
        svg('onepiece', 'onepiece', 'sundress', 'top,bottom'),
      '/src/assets/catalog/adult/female/costume/hero.svg':
        svg('costume', 'costume', 'hero', 'top,bottom,shoes'),

      '/src/assets/catalog/adult/male/top/tee.svg': svg('top', 'top', 'tee'),
      '/src/assets/catalog/adult/male/hair/bob.svg': svg('hair', 'hair', 'bob'),

      '/src/assets/catalog/teen/female/eyes/round.svg': svg('eyes', 'face', 'round'),
      '/src/assets/catalog/teen/female/top/tee.svg': svg('top', 'top', 'tee'),
      '/src/assets/catalog/teen/female/top/hoodie.svg': svg('top', 'top', 'hoodie'),

      '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
      '/src/assets/accessories/adult/headwear/cap.svg': svg('headwear', 'headwear', 'cap'),
    },
    {
      'adult-female': ADULT_SPEC,
      'adult-male': ADULT_SPEC,
      'teen-female': { ...ADULT_SPEC, headSizeClass: 'teen' },
    },
  )
}

export function makeCharacter(): Character {
  return {
    id: 'c1',
    name: 'Mia',
    stage: 'adult',
    bodyType: 'female',
    skinToneId: 'sand',
    slots: {
      eyes: { assetId: 'adult-female-eyes-round', colors: {} },
      top: { assetId: 'adult-female-top-tee', colors: { c1: '#7E90DC' } },
    },
    createdAt: 0,
    updatedAt: 0,
  }
}
