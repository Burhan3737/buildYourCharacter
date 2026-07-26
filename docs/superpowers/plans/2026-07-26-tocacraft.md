# TocaCraft Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-based Toca Boca-style character studio — six life stages, two body types, full wardrobe, plus a drag-and-drop stage — persisting entirely to `localStorage`.

**Architecture:** Every art asset is a standalone `.svg` file carrying its own metadata in root `data-*` attributes; the catalog is derived at build time by `import.meta.glob`, so there is no shared registry file and a dozen art agents can author concurrently without merge conflicts. All garments are drawn to fit a published per-bundle body spec, so the renderer contains no fitting maths. A lint suite over all ~711 assets runs as a real test.

**Tech Stack:** Vite, React 18, TypeScript, Zustand (+ `persist`), Tailwind CSS, Vitest, @testing-library/react, jsdom.

## Global Constraints

- Node 20+. Package manager: `npm`.
- Every asset SVG uses exactly `viewBox="0 0 400 600"`. No exceptions.
- Every `id` inside an asset must be prefixed `<assetId>__`.
- No asset may contain a `<filter>` element or a `filter=` attribute. Shadows are opt-in via `class="sp-shadow"`.
- No asset may reference external resources (`<image>`, `http(s)` hrefs, external fonts).
- Tunable colours are painted as `var(--name, #fallback)` — the fallback is mandatory.
- Ground line for every standing figure is `y = 570`. Figures are bottom-aligned, not centred.
- Target breakpoints: desktop ≥ 1024px, iPad landscape 1024px, iPad portrait 768px. Below 900px the studio tray becomes a bottom drawer.
- Life stage keys: `newborn | toddler | teen | adult | midage | elder`. Display labels: Newborn, Toddler, Teen, Adult, Middle-aged, Grandparent.
- All new code is TypeScript with `strict: true`. No `any` in committed code.
- Commit after every task. Conventional Commits (`feat:`, `test:`, `chore:`, `art:`).

## File Structure

| Path | Responsibility |
|---|---|
| `src/catalog/types.ts` | `LifeStage`, `BodyType`, `Slot`, `Character`, `Scene`, `BodySpec` |
| `src/catalog/layers.ts` | Layer names and z-order |
| `src/catalog/parse.ts` | One SVG string → `AssetRecord` (incl. hair back/front split) |
| `src/catalog/lint.ts` | The asset rules, as pure functions over raw SVG text |
| `src/catalog/build.ts` | `buildCatalog(files, specs)` — pure, no Vite |
| `src/catalog/loader.ts` | The `import.meta.glob` call; exports the singleton `catalog` |
| `src/render/skinTones.ts` | Skin ramp definitions, `skinVars()` |
| `src/render/composition.ts` | `Character` → ordered `RenderLayer[]`, honours `data-hides` |
| `src/render/CharacterSvg.tsx` | Composes layers into one `<svg>`; quality tier |
| `src/render/ShadowDefs.tsx` | The single shared `#sp-drop` filter, mounted once |
| `src/state/persist.ts` | Versioned envelope, migrations, safe storage |
| `src/state/familyRemap.ts` | Slot remapping across stage/body-type changes |
| `src/state/randomizer.ts` | Rule-valid random character (injectable RNG) |
| `src/state/sceneOps.ts` | Pure drag / scale / z-order / flip reducers |
| `src/state/appStore.ts` | Zustand store: character CRUD + scene, one persisted envelope |
| `src/ui/App.tsx` | Shell, screen switching, shadow defs |
| `src/ui/roster/*` | Character grid screen |
| `src/ui/studio/*` | Rail, stage strip, option tray, swatches, drawer |
| `src/ui/stage/*` | Backdrop, draggable items, prop drawer |
| `src/dev/ContactSheet.tsx` | Dev-only route rendering every asset in a bundle |
| `docs/ASSET_CONTRACT.md` | The authoring contract every art agent reads |
| `specs/bodies/<stage>-<bodyType>.json` | The 12 anchor specs |

---

## Phase 1 — Foundation (serial; blocks everything else)

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/ui/App.tsx`, `src/index.css`, `postcss.config.js`
- Test: `src/smoke.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: a working `npm test`, `npm run dev`, `npm run build`. Vitest configured with `environment: 'jsdom'` and globals enabled — every later task depends on this.

- [ ] **Step 1: Create the project files**

`package.json`:

```json
{
  "name": "tocacraft",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "vitest": "^2.1.8"
  }
}
```

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

`src/test-setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noEmit": true,
    "skipLibCheck": true,
    "types": ["vitest/globals", "vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}
```

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>TocaCraft</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`postcss.config.js`:

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

`tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        peri: '#7E90DC', coral: '#F4A79B', mint: '#6BBFAD',
        butter: '#F7C873', page: '#EFF3F8', ink: '#3B2A22',
      },
      borderRadius: { pill: '999px' },
    },
  },
  plugins: [],
}
```

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; }
body { background: theme('colors.page'); color: theme('colors.ink');
       -webkit-tap-highlight-color: transparent; overscroll-behavior: none; }

/* Quality tiers — the ONLY place the shared shadow filter is applied. */
.quality-high .sp-shadow { filter: url(#sp-drop); }
.quality-flat .sp-shadow { filter: none; }
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
```

`src/ui/App.tsx`:

```tsx
export function App() {
  return <div className="p-8 text-2xl font-bold">TocaCraft</div>
}
```

- [ ] **Step 2: Write the smoke test**

`src/smoke.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

describe('toolchain', () => {
  it('runs tests in a DOM environment', () => {
    const el = document.createElement('div')
    el.textContent = 'ok'
    expect(el.textContent).toBe('ok')
  })

  it('has DOMParser and XMLSerializer available for asset parsing', () => {
    expect(typeof DOMParser).toBe('function')
    expect(typeof XMLSerializer).toBe('function')
  })
})
```

- [ ] **Step 3: Install and run**

Run: `npm install && npm test`
Expected: 2 tests pass.

- [ ] **Step 4: Verify the dev server builds**

Run: `npm run build`
Expected: exits 0, writes `dist/`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite + react + ts + tailwind + vitest"
```

---

### Task 2: Core types and layer order

**Files:**
- Create: `src/catalog/types.ts`, `src/catalog/layers.ts`
- Test: `src/catalog/layers.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `LIFE_STAGES`, `BODY_TYPES`, `SLOTS`, `HEAD_SIZE_CLASSES`, `ACCESSORY_SLOTS`, types `LifeStage`, `BodyType`, `Slot`, `BundleKey`, `HeadSizeClass`, `Equipped`, `Character`, `SceneItem`, `Scene`, `BodySpec`; and `LAYERS`, `LayerName`, `LAYER_Z`, `isLayerName()`. Every later task imports from these two files.

- [ ] **Step 1: Write the failing test**

`src/catalog/layers.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/catalog/layers.test.ts`
Expected: FAIL — cannot resolve `./layers`.

- [ ] **Step 3: Write `src/catalog/types.ts`**

```ts
export const LIFE_STAGES = ['newborn', 'toddler', 'teen', 'adult', 'midage', 'elder'] as const
export type LifeStage = (typeof LIFE_STAGES)[number]

export const STAGE_LABELS: Record<LifeStage, string> = {
  newborn: 'Newborn', toddler: 'Toddler', teen: 'Teen',
  adult: 'Adult', midage: 'Middle-aged', elder: 'Grandparent',
}

export const BODY_TYPES = ['female', 'male'] as const
export type BodyType = (typeof BODY_TYPES)[number]

export type BundleKey = `${LifeStage}-${BodyType}`
export const bundleKey = (stage: LifeStage, bodyType: BodyType): BundleKey =>
  `${stage}-${bodyType}`

export const SLOTS = [
  'eyes', 'brows', 'mouth',
  'hair', 'top', 'bottom', 'onepiece', 'shoes',
  'glasses', 'headwear', 'earrings', 'necklace',
  'costume',
] as const
export type Slot = (typeof SLOTS)[number]

/** Slots served by the shared head-mounted pool rather than a per-bundle folder. */
export const ACCESSORY_SLOTS: readonly Slot[] = ['glasses', 'headwear', 'earrings', 'necklace']

/** Slots that can suppress other slots while equipped, in resolution order. */
export const OVERRIDE_SLOTS: readonly Slot[] = ['costume', 'onepiece']

export const HEAD_SIZE_CLASSES = ['toddler', 'teen', 'adult'] as const
export type HeadSizeClass = (typeof HEAD_SIZE_CLASSES)[number]

export interface Equipped {
  assetId: string
  colors: Record<string, string>
}

export interface Character {
  id: string
  name: string
  stage: LifeStage
  bodyType: BodyType
  skinToneId: string
  slots: Partial<Record<Slot, Equipped>>
  createdAt: number
  updatedAt: number
}

export interface SceneItem {
  id: string
  kind: 'character' | 'prop'
  refId: string
  x: number
  y: number
  scale: number
  flipX: boolean
  z: number
}

export interface Scene {
  backdropId: string
  items: SceneItem[]
}

export interface Point { x: number; y: number }
export interface Box { x: number; y: number; w: number; h: number }

export interface BodySpec {
  viewBox: [number, number, number, number]
  head: { cx: number; cy: number; rx: number; ry: number }
  eyeLine: number
  ears: [Point, Point]
  shoulders: [Point, Point]
  torso: Box
  hips: Box
  footLine: number
  headSizeClass: HeadSizeClass
}
```

- [ ] **Step 4: Write `src/catalog/layers.ts`**

```ts
export const LAYERS = [
  'hair-back', 'body', 'bottom', 'top', 'onepiece', 'shoes',
  'face', 'hair-front', 'costume', 'necklace', 'earrings', 'glasses', 'headwear',
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
  'hair-front': 70,
  costume: 80,
  necklace: 85,
  earrings: 90,
  glasses: 95,
  headwear: 100,
}

const LAYER_SET: ReadonlySet<string> = new Set(LAYERS)
export const isLayerName = (v: string): v is LayerName => LAYER_SET.has(v)
```

- [ ] **Step 5: Run the test**

Run: `npx vitest run src/catalog/layers.test.ts`
Expected: 5 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/catalog/types.ts src/catalog/layers.ts src/catalog/layers.test.ts
git commit -m "feat: add core catalog types and layer z-order"
```

---

### Task 3: Asset parser

Turns one raw SVG string into an `AssetRecord`. The only tricky part is hair: a hair asset
declares `data-layer="hair"` and contains two top-level groups, `<g data-part="back">` and
`<g data-part="front">`, which are split onto separate layers.

**Files:**
- Create: `src/catalog/parse.ts`
- Test: `src/catalog/parse.test.ts`

**Interfaces:**
- Consumes: `Slot`, `SLOTS` from `catalog/types`; `LayerName`, `isLayerName` from `catalog/layers`.
- Produces: `AssetRecord`, `AssetParseError`, `assetIdFromPath(path: string): string`, `parseAsset(id: string, raw: string): AssetRecord`. `AssetRecord` is the currency of the whole catalog — `build.ts`, `composition.ts` and every UI tray consume it.

- [ ] **Step 1: Write the failing test**

`src/catalog/parse.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { assetIdFromPath, parseAsset, AssetParseError } from './parse'

const top = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
  data-name="Hoodie" data-family="hoodie" data-slot="top"
  data-layer="top" data-colors="c1,c2" data-hides="">
  <g class="sp-shadow"><rect id="adult-female-top-hoodie__body" x="1" y="2" width="3" height="4" fill="var(--c1, #7E90DC)"/></g>
  <path d="M0 0" fill="var(--c2, #6B7FD0)"/>
</svg>`

const hair = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
  data-name="Long Waves" data-family="long-waves" data-slot="hair"
  data-layer="hair" data-colors="hair1">
  <g data-part="back"><path d="M1 1" fill="var(--hair1, #43291F)"/></g>
  <g data-part="front"><path d="M2 2" fill="var(--hair1, #43291F)"/></g>
</svg>`

describe('assetIdFromPath', () => {
  it('derives a dash-joined id and drops the catalog segment', () => {
    expect(assetIdFromPath('/src/assets/catalog/adult/female/hair/bob.svg'))
      .toBe('adult-female-hair-bob')
  })
  it('handles the shared accessory and prop pools', () => {
    expect(assetIdFromPath('/src/assets/accessories/adult/glasses/round.svg'))
      .toBe('accessories-adult-glasses-round')
    expect(assetIdFromPath('/src/assets/props/beach-ball.svg')).toBe('props-beach-ball')
  })
})

describe('parseAsset', () => {
  it('reads metadata off the root element', () => {
    const a = parseAsset('adult-female-top-hoodie', top)
    expect(a.name).toBe('Hoodie')
    expect(a.family).toBe('hoodie')
    expect(a.slot).toBe('top')
    expect(a.layer).toBe('top')
    expect(a.colors).toEqual(['c1', 'c2'])
    expect(a.hides).toEqual([])
  })

  it('captures the root children as markup and leaves the <svg> tag behind', () => {
    const a = parseAsset('adult-female-top-hoodie', top)
    expect(a.markup).toContain('sp-shadow')
    expect(a.markup).not.toContain('<svg')
    expect(a.backMarkup).toBe('')
  })

  it('splits hair into back and front markup', () => {
    const a = parseAsset('adult-female-hair-long', hair)
    expect(a.layer).toBe('hair')
    expect(a.backMarkup).toContain('M1 1')
    expect(a.backMarkup).not.toContain('M2 2')
    expect(a.markup).toContain('M2 2')
    expect(a.markup).not.toContain('M1 1')
  })

  it('accepts a hair asset with an empty back group', () => {
    const short = hair.replace('<path d="M1 1" fill="var(--hair1, #43291F)"/>', '')
    const a = parseAsset('adult-female-hair-crop', short)
    expect(a.backMarkup.trim()).toBe('')
    expect(a.markup).toContain('M2 2')
  })

  it('parses a multi-value data-hides list', () => {
    const costume = top
      .replace('data-slot="top"', 'data-slot="costume"')
      .replace('data-layer="top"', 'data-layer="costume"')
      .replace('data-hides=""', 'data-hides="top, bottom ,shoes"')
    expect(parseAsset('x', costume).hides).toEqual(['top', 'bottom', 'shoes'])
  })

  it('throws on malformed XML', () => {
    expect(() => parseAsset('x', '<svg><path></svg>')).toThrow(AssetParseError)
  })

  it('throws on an unknown slot', () => {
    expect(() => parseAsset('x', top.replace('data-slot="top"', 'data-slot="hat"')))
      .toThrow(/unknown data-slot/)
  })

  it('throws on an unknown layer', () => {
    expect(() => parseAsset('x', top.replace('data-layer="top"', 'data-layer="middle"')))
      .toThrow(/unknown data-layer/)
  })

  it('throws when a hair asset is missing its part groups', () => {
    const bad = hair.replace('data-part="front"', 'data-part="middle"')
    expect(() => parseAsset('x', bad)).toThrow(/data-part="front"/)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/catalog/parse.test.ts`
Expected: FAIL — cannot resolve `./parse`.

- [ ] **Step 3: Write `src/catalog/parse.ts`**

Note `XMLSerializer` rather than `innerHTML`: on an XML document, `innerHTML` is unreliable
across jsdom versions, and serialising child nodes is exact.

```ts
import { SLOTS, type Slot } from './types'
import { isLayerName, type LayerName } from './layers'

export class AssetParseError extends Error {}

export interface AssetRecord {
  id: string
  name: string
  family: string
  slot: Slot
  /** 'hair' is a pseudo-layer; composition expands it to hair-back + hair-front. */
  layer: LayerName | 'hair'
  colors: string[]
  hides: Slot[]
  /** Children of <svg>, or the front group for hair. */
  markup: string
  /** The back group for hair; '' for everything else. */
  backMarkup: string
}

/** '/src/assets/catalog/adult/female/hair/bob.svg' -> 'adult-female-hair-bob' */
export function assetIdFromPath(path: string): string {
  return path
    .replace(/^.*\/assets\//, '')
    .replace(/\.svg$/, '')
    .split('/')
    .filter((seg) => seg !== 'catalog')
    .join('-')
}

const splitList = (raw: string): string[] =>
  raw.split(',').map((s) => s.trim()).filter(Boolean)

const serializer = new XMLSerializer()
const innerMarkup = (el: Element): string =>
  Array.from(el.childNodes).map((n) => serializer.serializeToString(n)).join('')

export function parseAsset(id: string, raw: string): AssetRecord {
  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml')
  if (doc.getElementsByTagName('parsererror').length > 0) {
    throw new AssetParseError(`${id}: not well-formed XML`)
  }
  const root = doc.documentElement
  if (root.localName !== 'svg') {
    throw new AssetParseError(`${id}: root is <${root.localName}>, expected <svg>`)
  }

  const attr = (n: string) => root.getAttribute(n) ?? ''
  const slot = attr('data-slot')
  if (!(SLOTS as readonly string[]).includes(slot)) {
    throw new AssetParseError(`${id}: unknown data-slot "${slot}"`)
  }
  const layerAttr = attr('data-layer')

  let markup: string
  let backMarkup = ''

  if (layerAttr === 'hair') {
    const groups = Array.from(root.children).filter((el) => el.localName === 'g')
    const back = groups.find((g) => g.getAttribute('data-part') === 'back')
    const front = groups.find((g) => g.getAttribute('data-part') === 'front')
    if (!back) throw new AssetParseError(`${id}: hair asset missing <g data-part="back">`)
    if (!front) throw new AssetParseError(`${id}: hair asset missing <g data-part="front">`)
    backMarkup = innerMarkup(back)
    markup = innerMarkup(front)
  } else {
    if (!isLayerName(layerAttr)) {
      throw new AssetParseError(`${id}: unknown data-layer "${layerAttr}"`)
    }
    markup = innerMarkup(root)
  }

  return {
    id,
    name: attr('data-name') || id,
    family: attr('data-family') || id,
    slot: slot as Slot,
    layer: layerAttr as LayerName | 'hair',
    colors: splitList(attr('data-colors')),
    hides: splitList(attr('data-hides')) as Slot[],
    markup,
    backMarkup,
  }
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/catalog/parse.test.ts`
Expected: 11 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/catalog/parse.ts src/catalog/parse.test.ts
git commit -m "feat: parse asset SVGs into records with hair back/front split"
```

---

### Task 4: Asset lint

Five rules over raw SVG text. This is the single most important test in the project: with
~711 agent-authored files, all of these failures are silent in the browser.

**Files:**
- Create: `src/catalog/lint.ts`
- Test: `src/catalog/lint.test.ts`

**Interfaces:**
- Consumes: `assetIdFromPath` from `catalog/parse`; `SLOTS` from `catalog/types`; `isLayerName` from `catalog/layers`.
- Produces: `LintIssue { file, rule, message }`, `lintAsset(file: string, raw: string): LintIssue[]`, `SKIN_VARS`. Task 30 runs this over the real catalog.

- [ ] **Step 1: Write the failing test**

`src/catalog/lint.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { lintAsset } from './lint'

const FILE = '/src/assets/catalog/adult/female/top/hoodie.svg'
const ID = 'adult-female-top-hoodie'

const good = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
  data-name="Hoodie" data-family="hoodie" data-slot="top"
  data-layer="top" data-colors="c1,c2">
  <defs><linearGradient id="${ID}__g1"><stop offset="0" stop-color="#fff"/></linearGradient></defs>
  <g class="sp-shadow">
    <rect x="1" y="2" width="3" height="4" fill="var(--c1, #7E90DC)"/>
    <path d="M0 0" fill="var(--c2, #6B7FD0)"/>
  </g>
</svg>`

const rules = (file: string, raw: string) => lintAsset(file, raw).map((i) => i.rule)

describe('lintAsset', () => {
  it('passes a conforming asset', () => {
    expect(lintAsset(FILE, good)).toEqual([])
  })

  it('rejects a wrong viewBox', () => {
    expect(rules(FILE, good.replace('0 0 400 600', '0 0 512 512'))).toContain('structure')
  })

  it('rejects missing required attributes', () => {
    expect(rules(FILE, good.replace('data-family="hoodie" ', ''))).toContain('structure')
  })

  it('rejects an unprefixed id', () => {
    expect(rules(FILE, good.replace(`${ID}__g1`, 'g1'))).toContain('id-prefix')
  })

  it('names the offending id in the message', () => {
    const issues = lintAsset(FILE, good.replace(`${ID}__g1`, 'g1'))
    expect(issues[0].message).toContain('g1')
  })

  it('rejects a locally defined filter', () => {
    const bad = good.replace('<defs>', '<defs><filter id="x"><feDropShadow/></filter>')
    expect(rules(FILE, bad)).toContain('no-local-filter')
  })

  it('rejects a filter attribute', () => {
    expect(rules(FILE, good.replace('<g class="sp-shadow">', '<g filter="url(#sp-drop)">')))
      .toContain('no-local-filter')
  })

  it('rejects external references', () => {
    const bad = good.replace('</g>', '<image href="https://x.test/a.png"/></g>')
    expect(rules(FILE, bad)).toContain('no-external')
  })

  it('rejects a declared colour that is never used', () => {
    expect(rules(FILE, good.replace('data-colors="c1,c2"', 'data-colors="c1,c2,c3"')))
      .toContain('colors')
  })

  it('rejects a used colour variable that is never declared', () => {
    expect(rules(FILE, good.replace('data-colors="c1,c2"', 'data-colors="c1"')))
      .toContain('colors')
  })

  it('allows skin variables without declaring them', () => {
    const body = good.replace('fill="var(--c2, #6B7FD0)"', 'fill="var(--skin2, #EDB490)"')
                     .replace('data-colors="c1,c2"', 'data-colors="c1"')
    expect(lintAsset(FILE, body)).toEqual([])
  })

  it('requires a fallback in every var() paint', () => {
    expect(rules(FILE, good.replace('var(--c1, #7E90DC)', 'var(--c1)'))).toContain('colors')
  })

  it('reports malformed XML as a single structure issue', () => {
    const issues = lintAsset(FILE, '<svg><path></svg>')
    expect(issues).toHaveLength(1)
    expect(issues[0].rule).toBe('structure')
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/catalog/lint.test.ts`
Expected: FAIL — cannot resolve `./lint`.

- [ ] **Step 3: Write `src/catalog/lint.ts`**

```ts
import { assetIdFromPath } from './parse'
import { SLOTS } from './types'
import { isLayerName } from './layers'

export interface LintIssue {
  file: string
  rule: 'structure' | 'id-prefix' | 'no-local-filter' | 'no-external' | 'colors'
  message: string
}

/** Provided by the body, never declared by a garment. */
export const SKIN_VARS = ['skin1', 'skin2', 'skin3'] as const

const REQUIRED_ATTRS = ['data-name', 'data-family', 'data-slot', 'data-layer'] as const
const VAR_USE = /var\(\s*--([a-zA-Z0-9_-]+)\s*(,[^)]*)?\)/g

export function lintAsset(file: string, raw: string): LintIssue[] {
  const issues: LintIssue[] = []
  const id = assetIdFromPath(file)
  const add = (rule: LintIssue['rule'], message: string) => issues.push({ file, rule, message })

  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml')
  if (doc.getElementsByTagName('parsererror').length > 0) {
    add('structure', 'not well-formed XML')
    return issues
  }
  const root = doc.documentElement
  if (root.localName !== 'svg') {
    add('structure', `root is <${root.localName}>, expected <svg>`)
    return issues
  }

  // --- structure -----------------------------------------------------------
  if (root.getAttribute('viewBox') !== '0 0 400 600') {
    add('structure', `viewBox is "${root.getAttribute('viewBox')}", expected "0 0 400 600"`)
  }
  for (const a of REQUIRED_ATTRS) {
    if (!root.getAttribute(a)) add('structure', `missing required attribute ${a}`)
  }
  const slot = root.getAttribute('data-slot') ?? ''
  if (slot && !(SLOTS as readonly string[]).includes(slot)) {
    add('structure', `unknown data-slot "${slot}"`)
  }
  const layer = root.getAttribute('data-layer') ?? ''
  if (layer && layer !== 'hair' && !isLayerName(layer)) {
    add('structure', `unknown data-layer "${layer}"`)
  }
  if (layer === 'hair') {
    const parts = Array.from(root.children)
      .filter((el) => el.localName === 'g')
      .map((el) => el.getAttribute('data-part'))
    for (const p of ['back', 'front']) {
      if (!parts.includes(p)) add('structure', `hair asset missing <g data-part="${p}">`)
    }
  }

  const all = Array.from(root.querySelectorAll('*'))

  // --- id-prefix -----------------------------------------------------------
  for (const el of all) {
    const elId = el.getAttribute('id')
    if (elId && !elId.startsWith(`${id}__`)) {
      add('id-prefix', `id "${elId}" must start with "${id}__"`)
    }
  }

  // --- no-local-filter -----------------------------------------------------
  for (const el of all) {
    if (el.localName === 'filter') add('no-local-filter', 'assets may not define <filter>')
    if (el.hasAttribute('filter')) {
      add('no-local-filter', 'use class="sp-shadow" instead of a filter attribute')
    }
  }

  // --- no-external ---------------------------------------------------------
  for (const el of all) {
    if (el.localName === 'image') add('no-external', '<image> is not allowed')
    const href = el.getAttribute('href') ?? el.getAttribute('xlink:href') ?? ''
    if (/^(https?:)?\/\//.test(href)) add('no-external', `external reference "${href}"`)
  }

  // --- colors --------------------------------------------------------------
  const declared = new Set(
    (root.getAttribute('data-colors') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  )
  const used = new Set<string>()
  for (const m of raw.matchAll(VAR_USE)) {
    used.add(m[1])
    if (!m[2]) add('colors', `var(--${m[1]}) is missing its fallback value`)
  }
  for (const d of declared) {
    if (!used.has(d)) add('colors', `data-colors declares "${d}" but it is never used`)
  }
  for (const u of used) {
    if (!declared.has(u) && !(SKIN_VARS as readonly string[]).includes(u)) {
      add('colors', `var(--${u}) is used but not listed in data-colors`)
    }
  }

  return issues
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/catalog/lint.test.ts`
Expected: 13 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/catalog/lint.ts src/catalog/lint.test.ts
git commit -m "feat: add asset lint rules for structure, ids, filters, externals and colours"
```

---

### Task 5: Catalog assembly

`buildCatalog` is pure and takes plain maps, so it is fully testable without Vite.

**Files:**
- Create: `src/catalog/build.ts`
- Test: `src/catalog/build.test.ts`

**Interfaces:**
- Consumes: `parseAsset`, `assetIdFromPath`, `AssetRecord`; types from `catalog/types`.
- Produces: `Catalog`, `buildCatalog(files: Record<string,string>, specs: Record<string, BodySpec>): Catalog`, `emptySlotMap()`. Shape of `Catalog`:
  - `byId: Record<string, AssetRecord>`
  - `bundle: Record<BundleKey, Record<Slot, AssetRecord[]>>`
  - `accessories: Record<HeadSizeClass, Record<Slot, AssetRecord[]>>`
  - `bodies: Partial<Record<BundleKey, AssetRecord>>`
  - `specs: Partial<Record<BundleKey, BodySpec>>`
  - `props: AssetRecord[]`, `backdrops: AssetRecord[]`

- [ ] **Step 1: Write the failing test**

`src/catalog/build.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildCatalog } from './build'
import type { BodySpec } from './types'

const svg = (o: Partial<Record<string, string>>) => `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 600" data-name="${o.name ?? 'X'}" data-family="${o.family ?? 'x'}"
  data-slot="${o.slot}" data-layer="${o.layer}" data-colors="">
  ${o.slot === 'hair' ? '<g data-part="back"/><g data-part="front"/>' : '<path d="M0 0"/>'}
</svg>`

const spec: BodySpec = {
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

const files = {
  '/src/assets/bodies/adult/female/base.svg': svg({ slot: 'eyes', layer: 'body' }),
  '/src/assets/catalog/adult/female/top/hoodie.svg': svg({ slot: 'top', layer: 'top', family: 'hoodie' }),
  '/src/assets/catalog/adult/female/top/tee.svg': svg({ slot: 'top', layer: 'top', family: 'tee' }),
  '/src/assets/catalog/adult/female/hair/bob.svg': svg({ slot: 'hair', layer: 'hair', family: 'bob' }),
  '/src/assets/accessories/adult/glasses/round.svg': svg({ slot: 'glasses', layer: 'glasses' }),
  '/src/assets/props/beach-ball.svg': svg({ slot: 'top', layer: 'top' }),
  '/src/assets/backdrops/park.svg': svg({ slot: 'top', layer: 'top' }),
}

describe('buildCatalog', () => {
  const cat = buildCatalog(files, { 'adult-female': spec })

  it('indexes every asset by id', () => {
    expect(Object.keys(cat.byId)).toHaveLength(7)
    expect(cat.byId['adult-female-top-hoodie'].name).toBe('X')
  })

  it('groups bundle assets by slot', () => {
    expect(cat.bundle['adult-female'].top.map((a) => a.family)).toEqual(['hoodie', 'tee'])
    expect(cat.bundle['adult-female'].hair).toHaveLength(1)
  })

  it('sorts each slot pool by name for stable tray order', () => {
    const names = cat.bundle['adult-female'].top.map((a) => a.id)
    expect(names).toEqual([...names].sort())
  })

  it('keeps bodies out of the wearable pools', () => {
    expect(cat.bodies['adult-female']?.id).toBe('bodies-adult-female-base')
    expect(cat.bundle['adult-female'].eyes).toEqual([])
  })

  it('routes accessories by head size class', () => {
    expect(cat.accessories.adult.glasses).toHaveLength(1)
    expect(cat.accessories.toddler.glasses).toEqual([])
  })

  it('collects props and backdrops', () => {
    expect(cat.props.map((a) => a.id)).toEqual(['props-beach-ball'])
    expect(cat.backdrops.map((a) => a.id)).toEqual(['backdrops-park'])
  })

  it('attaches body specs', () => {
    expect(cat.specs['adult-female']?.headSizeClass).toBe('adult')
  })

  it('gives every bundle key an entry even when it has no assets', () => {
    expect(cat.bundle['newborn-male'].top).toEqual([])
  })

  it('throws with the file path when an asset fails to parse', () => {
    expect(() => buildCatalog({ '/src/assets/props/bad.svg': '<svg><x></svg>' }, {}))
      .toThrow(/props\/bad\.svg/)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/catalog/build.test.ts`
Expected: FAIL — cannot resolve `./build`.

- [ ] **Step 3: Write `src/catalog/build.ts`**

```ts
import { assetIdFromPath, parseAsset, type AssetRecord } from './parse'
import {
  BODY_TYPES, HEAD_SIZE_CLASSES, LIFE_STAGES, SLOTS, bundleKey,
  type BodySpec, type BundleKey, type HeadSizeClass, type Slot,
} from './types'

export type SlotPools = Record<Slot, AssetRecord[]>

export interface Catalog {
  byId: Record<string, AssetRecord>
  bundle: Record<BundleKey, SlotPools>
  accessories: Record<HeadSizeClass, SlotPools>
  bodies: Partial<Record<BundleKey, AssetRecord>>
  specs: Partial<Record<BundleKey, BodySpec>>
  props: AssetRecord[]
  backdrops: AssetRecord[]
}

export const emptySlotMap = (): SlotPools =>
  Object.fromEntries(SLOTS.map((s) => [s, [] as AssetRecord[]])) as SlotPools

export function buildCatalog(
  files: Record<string, string>,
  specs: Record<string, BodySpec> = {},
): Catalog {
  const bundle = Object.fromEntries(
    LIFE_STAGES.flatMap((st) => BODY_TYPES.map((bt) => [bundleKey(st, bt), emptySlotMap()])),
  ) as Record<BundleKey, SlotPools>

  const accessories = Object.fromEntries(
    HEAD_SIZE_CLASSES.map((c) => [c, emptySlotMap()]),
  ) as Record<HeadSizeClass, SlotPools>

  const cat: Catalog = {
    byId: {}, bundle, accessories, bodies: {},
    specs: specs as Catalog['specs'], props: [], backdrops: [],
  }

  for (const path of Object.keys(files).sort()) {
    const id = assetIdFromPath(path)
    let asset: AssetRecord
    try {
      asset = parseAsset(id, files[path])
    } catch (err) {
      throw new Error(`${path}: ${(err as Error).message}`)
    }
    cat.byId[id] = asset

    const rel = path.replace(/^.*\/assets\//, '').replace(/\.svg$/, '')
    const seg = rel.split('/')

    if (seg[0] === 'bodies') {
      cat.bodies[bundleKey(seg[1] as never, seg[2] as never)] = asset
    } else if (seg[0] === 'catalog') {
      bundle[bundleKey(seg[1] as never, seg[2] as never)][asset.slot].push(asset)
    } else if (seg[0] === 'accessories') {
      accessories[seg[1] as HeadSizeClass][asset.slot].push(asset)
    } else if (seg[0] === 'props') {
      cat.props.push(asset)
    } else if (seg[0] === 'backdrops') {
      cat.backdrops.push(asset)
    }
  }

  return cat
}
```

Paths are iterated in sorted order, so every pool is name-sorted without a second pass —
that is what keeps tray order stable between builds.

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/catalog/build.test.ts`
Expected: 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/catalog/build.ts src/catalog/build.test.ts
git commit -m "feat: assemble the indexed catalog from asset files and body specs"
```

---

### Task 6: The Vite glob loader

A thin, untestable-by-design edge. Keeping it separate from `build.ts` is what lets every
other test run without Vite.

**Files:**
- Create: `src/catalog/loader.ts`, `src/assets/.gitkeep`, `specs/bodies/.gitkeep`
- Modify: `src/ui/App.tsx`

**Interfaces:**
- Consumes: `buildCatalog`.
- Produces: `export const catalog: Catalog` — the singleton every UI module imports.

- [ ] **Step 1: Write `src/catalog/loader.ts`**

```ts
import { buildCatalog, type Catalog } from './build'
import type { BodySpec } from './types'

const files = import.meta.glob('/src/assets/**/*.svg', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const specFiles = import.meta.glob('/specs/bodies/*.json', {
  import: 'default', eager: true,
}) as Record<string, BodySpec>

const specs = Object.fromEntries(
  Object.entries(specFiles).map(([path, spec]) => [
    path.replace(/^.*\/bodies\//, '').replace(/\.json$/, ''),
    spec,
  ]),
)

export const catalog: Catalog = buildCatalog(files, specs)
```

- [ ] **Step 2: Prove it loads by showing the count in the app shell**

`src/ui/App.tsx`:

```tsx
import { catalog } from '../catalog/loader'

export function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">TocaCraft</h1>
      <p className="mt-2 text-sm opacity-70">
        {Object.keys(catalog.byId).length} assets loaded
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Verify the build compiles with an empty asset tree**

Run: `npm run build`
Expected: exits 0. An empty glob is valid — it yields `0 assets loaded`.

- [ ] **Step 4: Commit**

```bash
git add src/catalog/loader.ts src/ui/App.tsx src/assets/.gitkeep specs/bodies/.gitkeep
git commit -m "feat: derive the catalog from the asset tree via import.meta.glob"
```

---

### Task 7: Skin tones

**Files:**
- Create: `src/render/skinTones.ts`
- Test: `src/render/skinTones.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `SkinTone`, `SKIN_TONES: SkinTone[]`, `DEFAULT_SKIN_ID`, `skinVars(id: string): Record<string,string>`.

- [ ] **Step 1: Write the failing test**

`src/render/skinTones.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/render/skinTones.test.ts`
Expected: FAIL — cannot resolve `./skinTones`.

- [ ] **Step 3: Write `src/render/skinTones.ts`**

`skin1` is the lit face colour, `skin2` the shaded side (ears, neck, under-arm), `skin3` the
blush/warmth accent.

```ts
export interface SkinTone {
  id: string
  name: string
  skin1: string
  skin2: string
  skin3: string
}

export const SKIN_TONES: SkinTone[] = [
  { id: 'porcelain', name: 'Porcelain', skin1: '#FBE3CE', skin2: '#EFCDB2', skin3: '#F0A79B' },
  { id: 'sand',      name: 'Sand',      skin1: '#F7D2B0', skin2: '#E7B892', skin3: '#EC9A8D' },
  { id: 'honey',     name: 'Honey',     skin1: '#EFB98C', skin2: '#DA9C6C', skin3: '#DE8878' },
  { id: 'amber',     name: 'Amber',     skin1: '#D79A6A', skin2: '#BE7F50', skin3: '#C4715F' },
  { id: 'clay',      name: 'Clay',      skin1: '#B87A4F', skin2: '#9C6039', skin3: '#A65B48' },
  { id: 'cocoa',     name: 'Cocoa',     skin1: '#8C5734', skin2: '#6F4124', skin3: '#7E4433' },
  { id: 'espresso',  name: 'Espresso',  skin1: '#603A22', skin2: '#472817', skin3: '#552F20' },
  { id: 'ebony',     name: 'Ebony',     skin1: '#412618', skin2: '#2C1810', skin3: '#3A1F16' },
]

export const DEFAULT_SKIN_ID = 'sand'

const BY_ID = new Map(SKIN_TONES.map((t) => [t.id, t]))
const DEFAULT = BY_ID.get(DEFAULT_SKIN_ID)!

export function skinVars(id: string): Record<string, string> {
  const t = BY_ID.get(id) ?? DEFAULT
  return { skin1: t.skin1, skin2: t.skin2, skin3: t.skin3 }
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/render/skinTones.test.ts`
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/render/skinTones.ts src/render/skinTones.test.ts
git commit -m "feat: add skin tone ramps and css variable mapping"
```

---

### Task 8: Composition

Turns a `Character` into an ordered list of render layers. Owns two rules: `data-hides`
suppression, and the head-mounted accessory transform.

**Files:**
- Create: `src/render/composition.ts`
- Test: `src/render/composition.test.ts`

**Interfaces:**
- Consumes: `Catalog` from `catalog/build`; `LAYER_Z`, `LayerName`; `SLOTS`, `OVERRIDE_SLOTS`, `ACCESSORY_SLOTS`, `bundleKey`, `Character`, `Slot`; `skinVars`.
- Produces: `RenderLayer { key, layer, z, markup, colors, transform }`, `hiddenSlots(character, catalog): Set<Slot>`, `composeCharacter(character, catalog): RenderLayer[]`, `headTransform(spec, refRx): string`.

- [ ] **Step 1: Write the failing test**

`src/render/composition.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { composeCharacter, hiddenSlots } from './composition'
import type { BodySpec, Character } from '../catalog/types'

const svg = (slot: string, layer: string, family: string, hides = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}"
    data-colors="c1" data-hides="${hides}">
    ${layer === 'hair'
      ? '<g data-part="back"><path d="BACK" fill="var(--c1, #111111)"/></g><g data-part="front"><path d="FRONT" fill="var(--c1, #111111)"/></g>'
      : `<path d="${family}" fill="var(--c1, #111111)"/>`}
  </svg>`

const spec: BodySpec = {
  viewBox: [0, 0, 400, 600],
  head: { cx: 200, cy: 88, rx: 56, ry: 58 }, eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 },
  hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570, headSizeClass: 'adult',
}

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/adult/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
  '/src/assets/catalog/adult/female/shoes/boots.svg': svg('shoes', 'shoes', 'boots'),
  '/src/assets/catalog/adult/female/hair/long.svg': svg('hair', 'hair', 'long'),
  '/src/assets/catalog/adult/female/costume/thor.svg': svg('costume', 'costume', 'thor', 'top,bottom,shoes'),
  '/src/assets/catalog/adult/female/onepiece/dress.svg': svg('onepiece', 'onepiece', 'dress', 'top,bottom'),
  '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
}, { 'adult-female': spec })

const base: Character = {
  id: 'c1', name: 'Mia', stage: 'adult', bodyType: 'female', skinToneId: 'sand',
  slots: {
    top: { assetId: 'adult-female-top-tee', colors: { c1: '#FF0000' } },
    bottom: { assetId: 'adult-female-bottom-jeans', colors: {} },
    shoes: { assetId: 'adult-female-shoes-boots', colors: {} },
    hair: { assetId: 'adult-female-hair-long', colors: { c1: '#43291F' } },
  },
  createdAt: 0, updatedAt: 0,
}

describe('hiddenSlots', () => {
  it('hides nothing when no override is equipped', () => {
    expect(hiddenSlots(base, catalog).size).toBe(0)
  })

  it('hides the slots a costume declares', () => {
    const c = { ...base, slots: { ...base.slots, costume: { assetId: 'adult-female-costume-thor', colors: {} } } }
    expect([...hiddenSlots(c, catalog)].sort()).toEqual(['bottom', 'shoes', 'top'])
  })

  it('does not apply a one-piece that is itself hidden by a costume', () => {
    const c = {
      ...base,
      slots: {
        ...base.slots,
        costume: { assetId: 'adult-female-costume-thor', colors: {} },
        onepiece: { assetId: 'adult-female-onepiece-dress', colors: {} },
      },
    }
    // costume hides top/bottom/shoes; the dress is not hidden, so it still contributes
    expect([...hiddenSlots(c, catalog)].sort()).toEqual(['bottom', 'shoes', 'top'])
  })
})

describe('composeCharacter', () => {
  it('always renders the body first', () => {
    const layers = composeCharacter(base, catalog)
    expect(layers[0].layer).toBe('hair-back')
    expect(layers[1].layer).toBe('body')
  })

  it('orders layers by z ascending', () => {
    const zs = composeCharacter(base, catalog).map((l) => l.z)
    expect(zs).toEqual([...zs].sort((a, b) => a - b))
  })

  it('splits hair across hair-back and hair-front', () => {
    const layers = composeCharacter(base, catalog)
    const back = layers.find((l) => l.layer === 'hair-back')!
    const front = layers.find((l) => l.layer === 'hair-front')!
    expect(back.markup).toContain('BACK')
    expect(front.markup).toContain('FRONT')
  })

  it('omits hidden slots but leaves the character untouched', () => {
    const c = { ...base, slots: { ...base.slots, costume: { assetId: 'adult-female-costume-thor', colors: {} } } }
    const layers = composeCharacter(c, catalog)
    expect(layers.some((l) => l.layer === 'top')).toBe(false)
    expect(layers.some((l) => l.layer === 'costume')).toBe(true)
    expect(c.slots.top).toBeDefined()
  })

  it('merges skin variables under the equipped colours', () => {
    const top = composeCharacter(base, catalog).find((l) => l.layer === 'top')!
    expect(top.colors.c1).toBe('#FF0000')
    expect(top.colors.skin1).toBeDefined()
  })

  it('skips slots whose asset id no longer exists rather than throwing', () => {
    const c = { ...base, slots: { ...base.slots, top: { assetId: 'gone', colors: {} } } }
    expect(() => composeCharacter(c, catalog)).not.toThrow()
    expect(composeCharacter(c, catalog).some((l) => l.layer === 'top')).toBe(false)
  })

  it('gives head-mounted accessories a scale-and-translate transform', () => {
    const c = { ...base, slots: { ...base.slots, glasses: { assetId: 'accessories-adult-glasses-round', colors: {} } } }
    const g = composeCharacter(c, catalog).find((l) => l.layer === 'glasses')!
    expect(g.transform).toMatch(/translate\(.*\) scale\(1\)/)
  })

  it('produces stable unique keys', () => {
    const keys = composeCharacter(base, catalog).map((l) => l.key)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/render/composition.test.ts`
Expected: FAIL — cannot resolve `./composition`.

- [ ] **Step 3: Write `src/render/composition.ts`**

```ts
import type { Catalog } from '../catalog/build'
import { LAYER_Z, type LayerName } from '../catalog/layers'
import {
  ACCESSORY_SLOTS, OVERRIDE_SLOTS, SLOTS, bundleKey,
  type BodySpec, type Character, type HeadSizeClass, type Slot,
} from '../catalog/types'
import { skinVars } from './skinTones'

/**
 * Reference head each accessory class is drawn against. Accessory artists place their
 * work over this circle; the renderer maps it onto whatever head the target body has.
 */
export interface RefHead { cx: number; cy: number; rx: number }
export const ACCESSORY_REF: Record<HeadSizeClass, RefHead> = {
  toddler: { cx: 200, cy: 268, rx: 82 },
  teen: { cx: 200, cy: 132, rx: 60 },
  adult: { cx: 200, cy: 91, rx: 57 },
}

export interface RenderLayer {
  key: string
  layer: LayerName
  z: number
  markup: string
  colors: Record<string, string>
  transform?: string
}

/**
 * Circle-to-circle map from the accessory's reference head onto this body's head.
 * Uniform scale, so nothing is ever distorted.
 */
export function headTransform(spec: BodySpec, ref: RefHead): string {
  const s = spec.head.rx / ref.rx
  const tx = spec.head.cx - ref.cx * s
  const ty = spec.head.cy - ref.cy * s
  return `translate(${round(tx)} ${round(ty)}) scale(${round(s)})`
}

const round = (n: number) => Math.round(n * 1000) / 1000

export function hiddenSlots(character: Character, catalog: Catalog): Set<Slot> {
  const hidden = new Set<Slot>()
  for (const slot of OVERRIDE_SLOTS) {
    if (hidden.has(slot)) continue
    const equipped = character.slots[slot]
    if (!equipped) continue
    const asset = catalog.byId[equipped.assetId]
    if (!asset) continue
    for (const s of asset.hides) hidden.add(s)
  }
  return hidden
}

export function composeCharacter(character: Character, catalog: Catalog): RenderLayer[] {
  const key = bundleKey(character.stage, character.bodyType)
  const spec = catalog.specs[key]
  const skin = skinVars(character.skinToneId)
  const layers: RenderLayer[] = []

  const body = catalog.bodies[key]
  if (body) {
    layers.push({
      key: `body:${body.id}`, layer: 'body', z: LAYER_Z.body,
      markup: body.markup, colors: skin,
    })
  }

  const hidden = hiddenSlots(character, catalog)

  for (const slot of SLOTS) {
    if (hidden.has(slot)) continue
    const equipped = character.slots[slot]
    if (!equipped) continue
    const asset = catalog.byId[equipped.assetId]
    if (!asset) continue

    const colors = { ...skin, ...equipped.colors }
    const transform =
      spec && ACCESSORY_SLOTS.includes(slot)
        ? headTransform(spec, ACCESSORY_REF[spec.headSizeClass])
        : undefined

    if (asset.layer === 'hair') {
      if (asset.backMarkup.trim()) {
        layers.push({
          key: `hair-back:${asset.id}`, layer: 'hair-back', z: LAYER_Z['hair-back'],
          markup: asset.backMarkup, colors,
        })
      }
      if (asset.markup.trim()) {
        layers.push({
          key: `hair-front:${asset.id}`, layer: 'hair-front', z: LAYER_Z['hair-front'],
          markup: asset.markup, colors,
        })
      }
    } else {
      layers.push({
        key: `${asset.layer}:${asset.id}`, layer: asset.layer, z: LAYER_Z[asset.layer],
        markup: asset.markup, colors, transform,
      })
    }
  }

  return layers.sort((a, b) => a.z - b.z)
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/render/composition.test.ts`
Expected: 11 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/render/composition.ts src/render/composition.test.ts
git commit -m "feat: compose characters into ordered render layers with hide rules"
```

---

### Task 9: CharacterSvg renderer

**Files:**
- Create: `src/render/ShadowDefs.tsx`, `src/render/CharacterSvg.tsx`
- Test: `src/render/CharacterSvg.test.tsx`

**Interfaces:**
- Consumes: `composeCharacter`, `RenderLayer`; `Catalog`; `Character`.
- Produces: `<ShadowDefs />` (mount exactly once per document), `<CharacterSvg character catalog quality? className? title? />` where `quality: 'high' | 'flat'` defaults to `'high'`.

- [ ] **Step 1: Write the failing test**

`src/render/CharacterSvg.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { buildCatalog } from '../catalog/build'
import { CharacterSvg } from './CharacterSvg'
import type { Character } from '../catalog/types'

const svg = (slot: string, layer: string, family: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}" data-colors="c1">
    <path class="mark-${family}" d="M0 0" fill="var(--c1, #111111)"/>
  </svg>`

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
})

const character: Character = {
  id: 'c1', name: 'Mia', stage: 'adult', bodyType: 'female', skinToneId: 'sand',
  slots: { top: { assetId: 'adult-female-top-tee', colors: { c1: '#FF0000' } } },
  createdAt: 0, updatedAt: 0,
}

describe('CharacterSvg', () => {
  it('renders one root svg with the canonical viewBox', () => {
    const { container } = render(<CharacterSvg character={character} catalog={catalog} />)
    const root = container.querySelector('svg')!
    expect(root.getAttribute('viewBox')).toBe('0 0 400 600')
  })

  it('injects each layer’s markup', () => {
    const { container } = render(<CharacterSvg character={character} catalog={catalog} />)
    expect(container.querySelector('.mark-base')).not.toBeNull()
    expect(container.querySelector('.mark-tee')).not.toBeNull()
  })

  it('applies equipped colours as css variables on the layer group', () => {
    const { container } = render(<CharacterSvg character={character} catalog={catalog} />)
    const groups = Array.from(container.querySelectorAll('g'))
    const tee = groups.find((g) => g.querySelector('.mark-tee'))!
    expect(tee.style.getPropertyValue('--c1')).toBe('#FF0000')
    expect(tee.style.getPropertyValue('--skin1')).not.toBe('')
  })

  it('defaults to the high quality class and honours flat', () => {
    const a = render(<CharacterSvg character={character} catalog={catalog} />)
    expect(a.container.querySelector('svg')!.classList.contains('quality-high')).toBe(true)
    const b = render(<CharacterSvg character={character} catalog={catalog} quality="flat" />)
    expect(b.container.querySelector('svg')!.classList.contains('quality-flat')).toBe(true)
  })

  it('exposes an accessible title', () => {
    const { getByTitle } = render(<CharacterSvg character={character} catalog={catalog} />)
    expect(getByTitle('Mia')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/render/CharacterSvg.test.tsx`
Expected: FAIL — cannot resolve `./CharacterSvg`.

- [ ] **Step 3: Write `src/render/ShadowDefs.tsx`**

The one and only filter in the application. Assets opt in with `class="sp-shadow"`; the
`.quality-*` CSS rules from Task 1 decide whether it is applied.

```tsx
export function ShadowDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <filter id="sp-drop" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3A4A66" floodOpacity="0.26" />
        </filter>
      </defs>
    </svg>
  )
}
```

- [ ] **Step 4: Write `src/render/CharacterSvg.tsx`**

```tsx
import { useMemo, type CSSProperties } from 'react'
import type { Catalog } from '../catalog/build'
import type { Character } from '../catalog/types'
import { composeCharacter } from './composition'

export interface CharacterSvgProps {
  character: Character
  catalog: Catalog
  quality?: 'high' | 'flat'
  className?: string
  title?: string
}

const toCssVars = (colors: Record<string, string>): CSSProperties =>
  Object.fromEntries(
    Object.entries(colors).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties

export function CharacterSvg({
  character, catalog, quality = 'high', className, title,
}: CharacterSvgProps) {
  const layers = useMemo(
    () => composeCharacter(character, catalog),
    [character, catalog],
  )

  return (
    <svg
      viewBox="0 0 400 600"
      className={`${quality === 'high' ? 'quality-high' : 'quality-flat'} ${className ?? ''}`}
      role="img"
    >
      <title>{title ?? character.name}</title>
      {layers.map((l) => (
        <g
          key={l.key}
          style={toCssVars(l.colors)}
          transform={l.transform}
          dangerouslySetInnerHTML={{ __html: l.markup }}
        />
      ))}
    </svg>
  )
}
```

`dangerouslySetInnerHTML` is safe here: every string originates from a repo-local `.svg` file
that the lint suite has already proved contains no external references and no script.

- [ ] **Step 5: Mount `ShadowDefs` in the shell**

In `src/ui/App.tsx`, render `<ShadowDefs />` as the first child of the root element.

- [ ] **Step 6: Run the test**

Run: `npx vitest run src/render/CharacterSvg.test.tsx`
Expected: 5 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/render/CharacterSvg.tsx src/render/ShadowDefs.tsx src/render/CharacterSvg.test.tsx src/ui/App.tsx
git commit -m "feat: render composed characters as a single svg with quality tiers"
```

---

### Task 10: Dev contact sheet

Reviewing ~711 agent-authored assets by clicking through the studio is impossible. This is a
dev-only screen that renders every asset in a bundle on the base body, so an art bundle can be
eyeballed in one screenshot. Every art task in Phase 3 uses it as its visual gate.

**Files:**
- Create: `src/dev/ContactSheet.tsx`
- Modify: `src/ui/App.tsx`

**Interfaces:**
- Consumes: `catalog`, `CharacterSvg`, `SKIN_TONES`, `LIFE_STAGES`, `BODY_TYPES`.
- Produces: `<ContactSheet />`, reachable at `?dev=sheet`.

- [ ] **Step 1: Write `src/dev/ContactSheet.tsx`**

```tsx
import { useState } from 'react'
import { catalog } from '../catalog/loader'
import { CharacterSvg } from '../render/CharacterSvg'
import {
  BODY_TYPES, LIFE_STAGES, SLOTS, STAGE_LABELS, bundleKey,
  type BodyType, type Character, type LifeStage, type Slot,
} from '../catalog/types'
import { DEFAULT_SKIN_ID } from '../render/skinTones'

const blank = (stage: LifeStage, bodyType: BodyType, slot?: Slot, assetId?: string): Character => ({
  id: 'sheet', name: assetId ?? 'base', stage, bodyType, skinToneId: DEFAULT_SKIN_ID,
  slots: slot && assetId ? { [slot]: { assetId, colors: {} } } : {},
  createdAt: 0, updatedAt: 0,
})

export function ContactSheet() {
  const [stage, setStage] = useState<LifeStage>('adult')
  const [bodyType, setBodyType] = useState<BodyType>('female')
  const pools = catalog.bundle[bundleKey(stage, bodyType)]

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap gap-2">
        {LIFE_STAGES.map((s) => (
          <button key={s} onClick={() => setStage(s)}
            className={`rounded-pill px-3 py-1 text-sm ${s === stage ? 'bg-peri text-white' : 'bg-white'}`}>
            {STAGE_LABELS[s]}
          </button>
        ))}
        {BODY_TYPES.map((b) => (
          <button key={b} onClick={() => setBodyType(b)}
            className={`rounded-pill px-3 py-1 text-sm ${b === bodyType ? 'bg-coral text-white' : 'bg-white'}`}>
            {b}
          </button>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide opacity-60">Base body</h2>
        <div className="w-40 rounded-xl bg-white p-2">
          <CharacterSvg character={blank(stage, bodyType)} catalog={catalog} />
        </div>
      </section>

      {SLOTS.map((slot) => (
        pools[slot].length > 0 && (
          <section key={slot} className="mb-8">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide opacity-60">
              {slot} · {pools[slot].length}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
              {pools[slot].map((a) => (
                <figure key={a.id} className="rounded-xl bg-white p-2">
                  <CharacterSvg character={blank(stage, bodyType, slot, a.id)} catalog={catalog} />
                  <figcaption className="mt-1 truncate text-center text-xs opacity-60">{a.name}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Route to it from the shell**

In `src/ui/App.tsx`, before the normal shell:

```tsx
if (new URLSearchParams(window.location.search).get('dev') === 'sheet') {
  return <><ShadowDefs /><ContactSheet /></>
}
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`, open `http://localhost:5173/?dev=sheet`
Expected: stage and body-type buttons render; sections are empty until Phase 3 lands art. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/dev/ContactSheet.tsx src/ui/App.tsx
git commit -m "feat: add dev contact sheet for reviewing whole art bundles"
```

---

### Task 11: Persistence

**Files:**
- Create: `src/state/persist.ts`
- Test: `src/state/persist.test.ts`

**Interfaces:**
- Consumes: `Character`, `Scene`.
- Produces: `STORAGE_KEY`, `CURRENT_VERSION`, `Envelope { version, characters, scene }`, `emptyEnvelope()`, `loadEnvelope(storage): Envelope`, `saveEnvelope(storage, env): SaveResult` where `SaveResult = { ok: true } | { ok: false; reason: 'quota' | 'unknown' }`, `MIGRATIONS`.

- [ ] **Step 1: Write the failing test**

`src/state/persist.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/state/persist.test.ts`
Expected: FAIL — cannot resolve `./persist`.

- [ ] **Step 3: Write `src/state/persist.ts`**

```ts
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
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/state/persist.test.ts`
Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/state/persist.ts src/state/persist.test.ts
git commit -m "feat: add versioned localStorage envelope with migrations and safe fallbacks"
```

---

### Task 12: Family remapping

The rule that makes a character *grow up* rather than reset when its stage changes.

**Files:**
- Create: `src/state/familyRemap.ts`
- Test: `src/state/familyRemap.test.ts`

**Interfaces:**
- Consumes: `Catalog`; `ACCESSORY_SLOTS`, `SLOTS`, `bundleKey`, `Character`, `LifeStage`, `BodyType`.
- Produces: `remapSlots(character, target: { stage; bodyType }, catalog): Character['slots']`, `retarget(character, target, catalog): Character`.

- [ ] **Step 1: Write the failing test**

`src/state/familyRemap.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { remapSlots, retarget } from './familyRemap'
import type { BodySpec, Character } from '../catalog/types'

const svg = (slot: string, layer: string, family: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}" data-colors="">
    <path d="M0 0"/></svg>`

const spec = (headSizeClass: 'toddler' | 'teen' | 'adult'): BodySpec => ({
  viewBox: [0, 0, 400, 600], head: { cx: 200, cy: 88, rx: 56, ry: 58 }, eyeLine: 96,
  ears: [{ x: 144, y: 92 }, { x: 256, y: 92 }],
  shoulders: [{ x: 140, y: 156 }, { x: 260, y: 156 }],
  torso: { x: 138, y: 150, w: 124, h: 150 }, hips: { x: 146, y: 290, w: 108, h: 44 },
  footLine: 570, headSizeClass,
})

const catalog = buildCatalog({
  '/src/assets/catalog/teen/female/top/hoodie.svg': svg('top', 'top', 'hoodie'),
  '/src/assets/catalog/teen/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/teen/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
  '/src/assets/catalog/adult/female/top/hoodie.svg': svg('top', 'top', 'hoodie'),
  '/src/assets/catalog/adult/female/top/blazer.svg': svg('top', 'top', 'blazer'),
  // adult has no bottoms at all, and no counterpart for 'tee'
  '/src/assets/accessories/teen/glasses/round.svg': svg('glasses', 'glasses', 'round'),
  '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
  '/src/assets/accessories/adult/glasses/square.svg': svg('glasses', 'glasses', 'square'),
}, { 'teen-female': spec('teen'), 'adult-female': spec('adult') })

const teen: Character = {
  id: 'c1', name: 'Mia', stage: 'teen', bodyType: 'female', skinToneId: 'sand',
  slots: {
    top: { assetId: 'teen-female-top-hoodie', colors: { c1: '#FF0000' } },
    bottom: { assetId: 'teen-female-bottom-jeans', colors: {} },
    glasses: { assetId: 'accessories-teen-glasses-round', colors: {} },
  },
  createdAt: 0, updatedAt: 0,
}

describe('remapSlots', () => {
  const next = remapSlots(teen, { stage: 'adult', bodyType: 'female' }, catalog)

  it('keeps the same family when the target bundle has it', () => {
    expect(next.top?.assetId).toBe('adult-female-top-hoodie')
  })

  it('carries colours across', () => {
    expect(next.top?.colors).toEqual({ c1: '#FF0000' })
  })

  it('falls back to the first asset when the family is missing', () => {
    const noMatch = { ...teen, slots: { top: { assetId: 'teen-female-top-tee', colors: {} } } }
    const out = remapSlots(noMatch, { stage: 'adult', bodyType: 'female' }, catalog)
    expect(out.top?.assetId).toBe('adult-female-top-blazer')
  })

  it('clears a slot the target bundle cannot fill at all', () => {
    expect(next.bottom).toBeUndefined()
  })

  it('remaps head-mounted accessories through the shared pool by head class', () => {
    expect(next.glasses?.assetId).toBe('accessories-adult-glasses-round')
  })

  it('is a no-op when the target equals the source', () => {
    expect(remapSlots(teen, { stage: 'teen', bodyType: 'female' }, catalog)).toEqual(teen.slots)
  })
})

describe('retarget', () => {
  it('returns a new character with the target stage and remapped slots', () => {
    const out = retarget(teen, { stage: 'adult', bodyType: 'female' }, catalog)
    expect(out.stage).toBe('adult')
    expect(out.id).toBe(teen.id)
    expect(out.slots.top?.assetId).toBe('adult-female-top-hoodie')
    expect(teen.stage).toBe('teen')
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/state/familyRemap.test.ts`
Expected: FAIL — cannot resolve `./familyRemap`.

- [ ] **Step 3: Write `src/state/familyRemap.ts`**

```ts
import type { Catalog } from '../catalog/build'
import type { AssetRecord } from '../catalog/parse'
import {
  ACCESSORY_SLOTS, SLOTS, bundleKey,
  type BodyType, type Character, type LifeStage, type Slot,
} from '../catalog/types'

export interface RemapTarget { stage: LifeStage; bodyType: BodyType }

function poolFor(slot: Slot, target: RemapTarget, catalog: Catalog): AssetRecord[] {
  if (ACCESSORY_SLOTS.includes(slot)) {
    const cls = catalog.specs[bundleKey(target.stage, target.bodyType)]?.headSizeClass
    return cls ? catalog.accessories[cls][slot] : []
  }
  return catalog.bundle[bundleKey(target.stage, target.bodyType)][slot]
}

export function remapSlots(
  character: Character, target: RemapTarget, catalog: Catalog,
): Character['slots'] {
  const out: Character['slots'] = {}

  for (const slot of SLOTS) {
    const equipped = character.slots[slot]
    if (!equipped) continue

    const pool = poolFor(slot, target, catalog)
    if (pool.length === 0) continue          // target cannot fill this slot — clear it

    const family = catalog.byId[equipped.assetId]?.family
    const match = family ? pool.find((a) => a.family === family) : undefined
    out[slot] = { assetId: (match ?? pool[0]).id, colors: { ...equipped.colors } }
  }

  return out
}

export function retarget(
  character: Character, target: RemapTarget, catalog: Catalog,
): Character {
  return {
    ...character,
    stage: target.stage,
    bodyType: target.bodyType,
    slots: remapSlots(character, target, catalog),
    updatedAt: character.updatedAt,
  }
}
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/state/familyRemap.test.ts`
Expected: 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/state/familyRemap.ts src/state/familyRemap.test.ts
git commit -m "feat: remap character slots by family when stage or body type changes"
```

---

### Task 13: Randomizer

**Files:**
- Create: `src/state/randomizer.ts`, `src/state/palettes.ts`
- Test: `src/state/randomizer.test.ts`

**Interfaces:**
- Consumes: `Catalog`; `hiddenSlots`; `SKIN_TONES`; types.
- Produces: `GARMENT_PALETTE`, `HAIR_PALETTE`, `randomCharacter(catalog, rng, opts?): Character` where `opts?: { stage?, bodyType?, id?, name?, now? }` and `rng: () => number`.

- [ ] **Step 1: Write the failing test**

`src/state/randomizer.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildCatalog } from '../catalog/build'
import { hiddenSlots } from '../render/composition'
import { randomCharacter } from './randomizer'
import { SKIN_TONES } from '../render/skinTones'
import type { BodySpec } from '../catalog/types'

const svg = (slot: string, layer: string, family: string, hides = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}"
    data-colors="c1" data-hides="${hides}">
    ${layer === 'hair'
      ? '<g data-part="back"/><g data-part="front"><path d="M0 0" fill="var(--c1, #111111)"/></g>'
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
  '/src/assets/catalog/adult/female/eyes/round.svg': svg('eyes', 'face', 'round'),
  '/src/assets/catalog/adult/female/brows/soft.svg': svg('brows', 'face', 'soft'),
  '/src/assets/catalog/adult/female/mouth/smile.svg': svg('mouth', 'face', 'smile'),
  '/src/assets/catalog/adult/female/hair/bob.svg': svg('hair', 'hair', 'bob'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
  '/src/assets/catalog/adult/female/bottom/jeans.svg': svg('bottom', 'bottom', 'jeans'),
  '/src/assets/catalog/adult/female/shoes/boots.svg': svg('shoes', 'shoes', 'boots'),
  '/src/assets/catalog/adult/female/costume/thor.svg': svg('costume', 'costume', 'thor', 'top,bottom,shoes'),
  '/src/assets/accessories/adult/glasses/round.svg': svg('glasses', 'glasses', 'round'),
}, { 'adult-female': spec })

/** Deterministic generator so assertions are stable. */
const seeded = (seed: number) => {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
}

describe('randomCharacter', () => {
  it('always fills the face slots', () => {
    for (let i = 0; i < 50; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      expect(c.slots.eyes).toBeDefined()
      expect(c.slots.brows).toBeDefined()
      expect(c.slots.mouth).toBeDefined()
    }
  })

  it('never equips a garment in a slot its own costume hides', () => {
    for (let i = 0; i < 200; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      for (const slot of hiddenSlots(c, catalog)) expect(c.slots[slot]).toBeUndefined()
    }
  })

  it('only references assets that exist', () => {
    for (let i = 0; i < 100; i++) {
      const c = randomCharacter(catalog, seeded(i), { stage: 'adult', bodyType: 'female' })
      for (const eq of Object.values(c.slots)) expect(catalog.byId[eq!.assetId]).toBeDefined()
    }
  })

  it('picks a real skin tone', () => {
    const ids = new Set(SKIN_TONES.map((t) => t.id))
    for (let i = 0; i < 30; i++) {
      expect(ids.has(randomCharacter(catalog, seeded(i)).skinToneId)).toBe(true)
    }
  })

  it('assigns a colour for every variable an asset declares', () => {
    const c = randomCharacter(catalog, seeded(7), { stage: 'adult', bodyType: 'female' })
    for (const [, eq] of Object.entries(c.slots)) {
      for (const v of catalog.byId[eq!.assetId].colors) {
        expect(eq!.colors[v]).toMatch(/^#[0-9A-F]{6}$/i)
      }
    }
  })

  it('honours a requested stage and body type', () => {
    const c = randomCharacter(catalog, seeded(3), { stage: 'adult', bodyType: 'female' })
    expect(c.stage).toBe('adult')
    expect(c.bodyType).toBe('female')
  })

  it('is deterministic for a given rng seed', () => {
    const a = randomCharacter(catalog, seeded(42), { id: 'x', now: 0 })
    const b = randomCharacter(catalog, seeded(42), { id: 'x', now: 0 })
    expect(a).toEqual(b)
  })

  it('produces a usable name', () => {
    expect(randomCharacter(catalog, seeded(1)).name.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/state/randomizer.test.ts`
Expected: FAIL — cannot resolve `./randomizer`.

- [ ] **Step 3: Write `src/state/palettes.ts`**

Curated ramps, not raw RGB — random hex produces mud, and this is the difference between the
button feeling designed and feeling broken.

```ts
export const GARMENT_PALETTE = [
  '#7E90DC', '#6B7FD0', '#F4A79B', '#E8877A', '#6BBFAD', '#4FA894',
  '#F7C873', '#E8A93F', '#C98BC9', '#A96FA9', '#8FB8E8', '#5E97D6',
  '#F2E3D0', '#D8DEEA', '#5B6479', '#3B4358',
]

export const HAIR_PALETTE = [
  '#2C1810', '#43291F', '#6B4A3A', '#8B5A2B', '#B07A3F', '#E0B663',
  '#D9D2C5', '#9AA3B2', '#C1553C', '#7E90DC', '#C98BC9', '#6BBFAD',
]

export const NAMES = [
  'Mia', 'Otto', 'Juno', 'Rex', 'Nia', 'Bruno', 'Pip', 'Coco',
  'Milo', 'Sage', 'Bo', 'Wren', 'Kai', 'Iris', 'Ravi', 'Luna',
]
```

- [ ] **Step 4: Write `src/state/randomizer.ts`**

```ts
import type { Catalog } from '../catalog/build'
import type { AssetRecord } from '../catalog/parse'
import {
  ACCESSORY_SLOTS, BODY_TYPES, LIFE_STAGES, bundleKey,
  type BodyType, type Character, type LifeStage, type Slot,
} from '../catalog/types'
import { SKIN_TONES } from '../render/skinTones'
import { GARMENT_PALETTE, HAIR_PALETTE, NAMES } from './palettes'

export type Rng = () => number

export interface RandomOptions {
  stage?: LifeStage
  bodyType?: BodyType
  id?: string
  name?: string
  now?: number
}

/** Slots that must always be filled, in the order they are rolled. */
const REQUIRED: readonly Slot[] = ['eyes', 'brows', 'mouth', 'hair']
/** Slots rolled only when no costume was chosen. */
const OUTFIT: readonly Slot[] = ['top', 'bottom', 'shoes']
/** Slots rolled with a probability rather than always. */
const OPTIONAL: readonly { slot: Slot; chance: number }[] = [
  { slot: 'glasses', chance: 0.25 },
  { slot: 'headwear', chance: 0.2 },
  { slot: 'earrings', chance: 0.15 },
  { slot: 'necklace', chance: 0.15 },
]

const pick = <T,>(rng: Rng, xs: readonly T[]): T | undefined =>
  xs.length ? xs[Math.floor(rng() * xs.length)] : undefined

export function randomCharacter(
  catalog: Catalog, rng: Rng, opts: RandomOptions = {},
): Character {
  const stage = opts.stage ?? pick(rng, LIFE_STAGES)!
  const bodyType = opts.bodyType ?? pick(rng, BODY_TYPES)!
  const headClass = catalog.specs[bundleKey(stage, bodyType)]?.headSizeClass

  const poolFor = (slot: Slot): AssetRecord[] =>
    ACCESSORY_SLOTS.includes(slot)
      ? (headClass ? catalog.accessories[headClass][slot] : [])
      : catalog.bundle[bundleKey(stage, bodyType)][slot]

  const slots: Character['slots'] = {}

  const equip = (slot: Slot) => {
    const asset = pick(rng, poolFor(slot))
    if (!asset) return
    const ramp = slot === 'hair' ? HAIR_PALETTE : GARMENT_PALETTE
    const colors: Record<string, string> = {}
    for (const v of asset.colors) colors[v] = pick(rng, ramp)!
    slots[slot] = { assetId: asset.id, colors }
  }

  for (const slot of REQUIRED) equip(slot)

  // A costume replaces the whole outfit; roll it first so the outfit roll can be skipped.
  const costumes = poolFor('costume')
  const wearsCostume = costumes.length > 0 && rng() < 0.2
  if (wearsCostume) {
    equip('costume')
  } else {
    for (const slot of OUTFIT) equip(slot)
  }

  for (const { slot, chance } of OPTIONAL) {
    if (rng() < chance) equip(slot)
  }

  // Belt and braces: never leave a slot equipped that an override hides.
  const equippedCostume = slots.costume && catalog.byId[slots.costume.assetId]
  for (const hidden of equippedCostume?.hides ?? []) delete slots[hidden]

  const now = opts.now ?? 0
  return {
    id: opts.id ?? `rnd-${Math.floor(rng() * 1e9).toString(36)}`,
    name: opts.name ?? pick(rng, NAMES)!,
    stage, bodyType,
    skinToneId: pick(rng, SKIN_TONES)!.id,
    slots,
    createdAt: now, updatedAt: now,
  }
}
```

- [ ] **Step 5: Run the test**

Run: `npx vitest run src/state/randomizer.test.ts`
Expected: 8 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/state/randomizer.ts src/state/palettes.ts src/state/randomizer.test.ts
git commit -m "feat: add rule-valid character randomizer with curated palettes"
```

---

### Task 14: Scene operations

Pure reducers, so all the drag maths is testable without a DOM.

**Files:**
- Create: `src/state/sceneOps.ts`
- Test: `src/state/sceneOps.test.ts`

**Interfaces:**
- Consumes: `Scene`, `SceneItem`.
- Produces: `STAGE_W`, `STAGE_H`, `MIN_SCALE`, `MAX_SCALE`, `addItem`, `moveItem`, `setScale`, `flipItem`, `bringToFront`, `removeItem`, `removeByRef`, `topZ`.

- [ ] **Step 1: Write the failing test**

`src/state/sceneOps.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/state/sceneOps.test.ts`
Expected: FAIL — cannot resolve `./sceneOps`.

- [ ] **Step 3: Write `src/state/sceneOps.ts`**

```ts
import type { Scene, SceneItem } from '../catalog/types'

/** Stage coordinate space. The rendered stage scales this to fit the viewport. */
export const STAGE_W = 1600
export const STAGE_H = 1000
export const MIN_SCALE = 0.4
export const MAX_SCALE = 2

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const topZ = (scene: Scene): number =>
  scene.items.reduce((max, i) => Math.max(max, i.z), 0)

const update = (scene: Scene, id: string, fn: (item: SceneItem) => SceneItem): Scene => {
  if (!scene.items.some((i) => i.id === id)) return scene
  return { ...scene, items: scene.items.map((i) => (i.id === id ? fn(i) : i)) }
}

export interface NewItem {
  id: string
  kind: SceneItem['kind']
  refId: string
  x: number
  y: number
}

export const addItem = (scene: Scene, item: NewItem): Scene => ({
  ...scene,
  items: [...scene.items, {
    ...item,
    x: clamp(item.x, 0, STAGE_W),
    y: clamp(item.y, 0, STAGE_H),
    scale: 1,
    flipX: false,
    z: topZ(scene) + 1,
  }],
})

export const moveItem = (scene: Scene, id: string, dx: number, dy: number): Scene =>
  update(scene, id, (i) => ({
    ...i,
    x: clamp(i.x + dx, 0, STAGE_W),
    y: clamp(i.y + dy, 0, STAGE_H),
  }))

export const setScale = (scene: Scene, id: string, scale: number): Scene =>
  update(scene, id, (i) => ({ ...i, scale: clamp(scale, MIN_SCALE, MAX_SCALE) }))

export const flipItem = (scene: Scene, id: string): Scene =>
  update(scene, id, (i) => ({ ...i, flipX: !i.flipX }))

export const bringToFront = (scene: Scene, id: string): Scene =>
  update(scene, id, (i) => ({ ...i, z: topZ(scene) + 1 }))

export const removeItem = (scene: Scene, id: string): Scene => ({
  ...scene, items: scene.items.filter((i) => i.id !== id),
})

/** Used when a character is deleted from the roster. */
export const removeByRef = (scene: Scene, refId: string): Scene => ({
  ...scene, items: scene.items.filter((i) => i.refId !== refId),
})
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/state/sceneOps.test.ts`
Expected: 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/state/sceneOps.ts src/state/sceneOps.test.ts
git commit -m "feat: add pure scene reducers for move, scale, flip and z-order"
```

---

### Task 15: Application store

Roster and scene live in one store because they persist to one envelope and because deleting a
character must remove it from the scene atomically — the invariant from the spec that the scene
can never reference a missing character.

**Files:**
- Create: `src/state/appStore.ts`
- Test: `src/state/appStore.test.ts`

**Interfaces:**
- Consumes: `loadEnvelope`, `saveEnvelope`, `emptyEnvelope`; `sceneOps`; `retarget`; `randomCharacter`; `catalog` (injected, not imported, so tests stay Vite-free).
- Produces: `useAppStore` with state `{ characters, scene, saveError }` and actions
  `createCharacter(catalog)`, `addRandomCharacter(catalog)`, `updateCharacter(id, patch)`,
  `equip(id, slot, assetId, colors)`, `unequip(id, slot)`, `setStage(id, stage, catalog)`,
  `setBodyType(id, bodyType, catalog)`, `duplicateCharacter(id)`, `deleteCharacter(id)`,
  `setBackdrop(id)`, `addToScene(kind, refId, x, y)`, `dragItem(id, dx, dy)`,
  `scaleItem(id, s)`, `flipSceneItem(id)`, `raiseItem(id)`, `removeSceneItem(id)`,
  plus `hydrate(storage)` and `dismissSaveError()`.

- [ ] **Step 1: Write the failing test**

`src/state/appStore.test.ts`:

```ts
import { beforeEach, describe, expect, it } from 'vitest'
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
    const c = useAppStore.getState().addRandomCharacter(catalog)
    expect(c.slots.eyes).toBeDefined()
    expect(catalog.byId[c.slots.eyes!.assetId]).toBeDefined()
  })

  it('is a no-op for actions on an unknown character id', () => {
    expect(() => useAppStore.getState().equip('nope', 'top', 'x', {})).not.toThrow()
    expect(useAppStore.getState().characters).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/state/appStore.test.ts`
Expected: FAIL — cannot resolve `./appStore`.

- [ ] **Step 3: Write `src/state/appStore.ts`**

```ts
import { create } from 'zustand'
import type { Catalog } from '../catalog/build'
import {
  SLOTS, bundleKey,
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
```

Note `SLOTS` is imported for the `Slot` type surface only if unused — remove the import if
`noUnusedLocals` complains.

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/state/appStore.test.ts`
Expected: 9 tests PASS.

- [ ] **Step 5: Hydrate on boot**

In `src/ui/App.tsx`, call `useAppStore.getState().hydrate(localStorage)` once inside a
`useEffect(() => { ... }, [])` at the top of the component.

- [ ] **Step 6: Run the whole suite**

Run: `npm test`
Expected: every suite from Tasks 1–15 passes.

- [ ] **Step 7: Commit**

```bash
git add src/state/appStore.ts src/state/appStore.test.ts src/ui/App.tsx
git commit -m "feat: add application store for roster and scene with persistence"
```

---

## Phase 2 — Contract and body specs (serial; gates all art)

### Task 16: Asset contract and the 12 body specs

Twelve JSON files plus the document every Phase 3 agent reads. No art yet — this is the
geometry all art is drawn against.

**Files:**
- Create: `specs/bodies/{newborn,toddler,teen,adult,midage,elder}-{female,male}.json` (12 files)
- Create: `docs/ASSET_CONTRACT.md`
- Test: `src/catalog/bodySpec.test.ts`

**Interfaces:**
- Consumes: `BodySpec` from `catalog/types`.
- Produces: 12 validated `BodySpec` JSON files and `docs/ASSET_CONTRACT.md`. Every Phase 3 task depends on both.

**Canonical geometry.** Canvas is `0 0 400 600`, centreline `x = 200`, ground `y = 570` for
every stage — figures are bottom-aligned so switching stage looks like growth, not a jump.

| Stage | Top of head | headRx | headRy | headCy | eyeLine | shoulderY | shoulder ½-width F/M | torso y/h | hips y/h | Head class |
|---|---|---|---|---|---|---|---|---|---|---|
| newborn | 250 | 88 | 84 | 334 | 352 | 424 | 44 / 46 | 418 / 86 | 496 / 34 | toddler |
| toddler | 190 | 82 | 78 | 268 | 286 | 352 | 48 / 50 | 346 / 104 | 442 / 40 | toddler |
| teen | 70 | 60 | 62 | 132 | 142 | 200 | 56 / 62 | 194 / 150 | 336 / 48 | teen |
| adult | 32 | 57 | 59 | 91 | 100 | 156 | 60 / 70 | 150 / 160 | 302 / 52 | adult |
| midage | 42 | 58 | 60 | 102 | 111 | 168 | 62 / 72 | 162 / 162 | 316 / 58 | adult |
| elder | 66 | 57 | 59 | 125 | 134 | 190 | 56 / 64 | 184 / 152 | 328 / 50 | adult |

Ears sit at `y = headCy + 4`, `x = 200 ± (headRx − 6)`.

- [ ] **Step 1: Write the failing validation test**

`src/catalog/bodySpec.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { BODY_TYPES, HEAD_SIZE_CLASSES, LIFE_STAGES, bundleKey, type BodySpec } from './types'

const DIR = join(process.cwd(), 'specs', 'bodies')
const read = (f: string): BodySpec => JSON.parse(readFileSync(join(DIR, f), 'utf8'))

describe('body specs', () => {
  it('has exactly one file per bundle', () => {
    const files = readdirSync(DIR).filter((f) => f.endsWith('.json')).sort()
    const want = LIFE_STAGES.flatMap((s) => BODY_TYPES.map((b) => `${bundleKey(s, b)}.json`)).sort()
    expect(files).toEqual(want)
  })

  const files = readdirSync(DIR).filter((f) => f.endsWith('.json'))

  it.each(files)('%s uses the canonical canvas and ground line', (f) => {
    const s = read(f)
    expect(s.viewBox).toEqual([0, 0, 400, 600])
    expect(s.footLine).toBe(570)
  })

  it.each(files)('%s is anatomically ordered head -> shoulders -> torso -> hips -> feet', (f) => {
    const s = read(f)
    expect(s.head.cy).toBeLessThan(s.shoulders[0].y)
    expect(s.shoulders[0].y).toBeLessThanOrEqual(s.torso.y + 8)
    expect(s.torso.y).toBeLessThan(s.hips.y)
    expect(s.hips.y + s.hips.h).toBeLessThan(s.footLine)
  })

  it.each(files)('%s keeps the head inside the canvas', (f) => {
    const s = read(f)
    expect(s.head.cy - s.head.ry).toBeGreaterThanOrEqual(0)
    expect(s.head.cx - s.head.rx).toBeGreaterThanOrEqual(0)
    expect(s.head.cx + s.head.rx).toBeLessThanOrEqual(400)
  })

  it.each(files)('%s centres the figure and puts the eye line on the face', (f) => {
    const s = read(f)
    expect(s.head.cx).toBe(200)
    expect(s.torso.x + s.torso.w / 2).toBe(200)
    expect(s.eyeLine).toBeGreaterThan(s.head.cy - s.head.ry)
    expect(s.eyeLine).toBeLessThan(s.head.cy + s.head.ry)
  })

  it.each(files)('%s declares a known head size class and symmetric ears', (f) => {
    const s = read(f)
    expect(HEAD_SIZE_CLASSES).toContain(s.headSizeClass)
    expect(s.ears[0].x + s.ears[1].x).toBe(400)
    expect(s.ears[0].y).toBe(s.ears[1].y)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/catalog/bodySpec.test.ts`
Expected: FAIL — `specs/bodies` contains no JSON files.

- [ ] **Step 3: Write the 12 spec files**

`specs/bodies/adult-female.json` — the exemplar; produce the other eleven from the table above
using the identical key order.

```json
{
  "viewBox": [0, 0, 400, 600],
  "head": { "cx": 200, "cy": 91, "rx": 57, "ry": 59 },
  "eyeLine": 100,
  "ears": [{ "x": 149, "y": 95 }, { "x": 251, "y": 95 }],
  "shoulders": [{ "x": 140, "y": 156 }, { "x": 260, "y": 156 }],
  "torso": { "x": 140, "y": 150, "w": 120, "h": 160 },
  "hips": { "x": 146, "y": 302, "w": 108, "h": 52 },
  "footLine": 570,
  "headSizeClass": "adult"
}
```

Derive each remaining file mechanically:
- `head.cx` is always 200; `head.cy`, `rx`, `ry`, `eyeLine` come from the table.
- `ears` = `[{ x: 200 - (rx - 6), y: headCy + 4 }, { x: 200 + (rx - 6), y: headCy + 4 }]`.
- `shoulders` = `[{ x: 200 - halfW, y: shoulderY }, { x: 200 + halfW, y: shoulderY }]` using the F or M column.
- `torso` = `{ x: 200 - halfW, y: <torso y>, w: 2 * halfW, h: <torso h> }`.
- `hips` = `{ x: 200 - hipHalf, y: <hips y>, w: 2 * hipHalf, h: <hips h> }`, where `hipHalf` is `halfW - 6` for female bodies and `halfW - 12` for male bodies — female hips read wider relative to the shoulders, male narrower.
- `headSizeClass` from the table's last column.

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/catalog/bodySpec.test.ts`
Expected: all 12 files pass all six checks (61 assertions).

- [ ] **Step 5: Write `docs/ASSET_CONTRACT.md`**

This is the single document every art agent reads. It must be complete on its own — an art
agent will not have this plan.

````markdown
# TocaCraft Asset Contract

Every `.svg` in `src/assets/` obeys this document. The lint suite
(`src/catalog/lint.test.ts` + `src/catalog/assets.test.ts`) enforces it; a violation fails
the build.

## Canvas

- `viewBox="0 0 400 600"` exactly. Never any other value.
- Centreline is `x = 200`. Ground is `y = 570`. Figures stand on the ground line — they are
  bottom-aligned, not centred, so a character switching life stage grows rather than jumps.
- Draw against the body spec for your bundle: `specs/bodies/<stage>-<bodyType>.json`.
  A garment for `adult-female` is drawn to fit `adult-female` and nothing else. There is no
  runtime fitting — if it does not line up in the file, it does not line up in the app.

## Required root attributes

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="Bob Cut"          <!-- shown in the picker -->
     data-family="bob"            <!-- shared with counterparts in OTHER stages -->
     data-slot="hair"             <!-- see slot list -->
     data-layer="hair"            <!-- see layer list -->
     data-colors="hair1,hair2"    <!-- every tunable var you use -->
     data-hides="">               <!-- slots suppressed while worn; usually empty -->
```

`data-family` is what makes a character age. If you author `hoodie` for `teen-female`, the
`adult-female` agent authoring their own hoodie must use the same family string. Families are
listed per category in this document so all twelve bundles agree.

## Slots and layers

| `data-slot` | `data-layer` |
|---|---|
| `eyes`, `brows`, `mouth` | `face` |
| `hair` | `hair` (special — see below) |
| `top` | `top` |
| `bottom` | `bottom` |
| `onepiece` | `onepiece`, with `data-hides="top,bottom"` |
| `shoes` | `shoes` |
| `costume` | `costume`, with `data-hides="top,bottom,shoes"` |
| `glasses` | `glasses` |
| `headwear` | `headwear` |
| `earrings` | `earrings` |
| `necklace` | `necklace` |

## Hair is two groups

A hair asset declares `data-layer="hair"` and contains exactly two top-level groups. Either
may be empty, but both must be present.

```xml
<svg ... data-slot="hair" data-layer="hair" data-colors="hair1,hair2">
  <g data-part="back"><!-- what falls behind the shoulders --></g>
  <g data-part="front"><!-- fringe, top, side locks --></g>
</svg>
```

## Colour

Never hardcode a tunable colour. Paint through a CSS variable **with a fallback** — the
fallback is mandatory and is what makes the file look right when opened on its own.

```xml
<path fill="var(--hair1, #43291F)"/>
<path fill="var(--hair2, #6B4A3A)"/>
```

| Variable | Meaning | Declared by |
|---|---|---|
| `--skin1` | lit skin | the body only — garments may use it but never declare it |
| `--skin2` | shaded skin (ears, neck, under-arm) | the body only |
| `--skin3` | blush / warmth accent | the body only |
| `--hair1` | main hair colour | hair assets |
| `--hair2` | hair shadow | hair assets |
| `--c1` `--c2` `--c3` | garment main / shadow / accent | garments, costumes, props |
| `--eye1` | iris | eye assets |
| `--lip1` | lips | mouth assets |

Everything in `data-colors` must actually be used, and everything used must be declared —
except the three skin variables, which are always available.

## Shadows

Assets never define a `<filter>` and never set a `filter=` attribute. Add
`class="sp-shadow"` to any group that should cast the house drop shadow. One shared filter
lives in the app; the stage turns it off wholesale for performance, which only works if no
asset defines its own.

```xml
<g class="sp-shadow">
  <path d="…" fill="var(--c1, #7E90DC)"/>
</g>
```

## IDs

Every `id` inside a file must start with the asset's own id followed by `__`. The asset id is
its path under `src/assets/` with `catalog/` dropped and slashes turned into dashes:

`src/assets/catalog/adult/female/hair/bob.svg` → `adult-female-hair-bob`

```xml
<linearGradient id="adult-female-hair-bob__grad1">
```

Assets are inlined into one document. Two files both using `id="grad1"` will silently repaint
each other's characters — this is the most common and most confusing failure in the project.

## Forbidden

- `<image>`, external `href`s, web fonts, `<script>`, raster data URIs
- `<filter>` elements and `filter=` attributes
- `<text>` — all lettering must be drawn as paths
- Any `viewBox` other than `0 0 400 600`
- `var(--x)` without a fallback

## House style — Soft Papercut

- Stacked flat shapes with **vertical linear gradients**, light at the top, ~12–18% darker at
  the bottom. No flat single-fill shapes on major forms.
- No outlines or strokes on silhouettes. Separation comes from shadow and value, not line.
- Generously rounded corners; nothing sharp except deliberate accents.
- One `class="sp-shadow"` group per major form (head, torso, each limb, hair). Do not nest
  shadow groups — the shadows compound and turn muddy.
- A soft white highlight arc at ~22–33% opacity on the upper surface of large forms.
- Palette: `#7E90DC` periwinkle, `#F4A79B` coral, `#6BBFAD` mint, `#F7C873` butter,
  `#3B2A22` ink. Garment colours are tunable, so choose fallbacks from this family.

## Before you commit

```bash
npx vitest run src/catalog          # lint + parser + spec validation
npm run dev                         # then open /?dev=sheet and select your bundle
```

Every asset you authored must appear on the contact sheet, correctly positioned on the body,
with no clipping at the canvas edge.
````

- [ ] **Step 6: Commit**

```bash
git add specs/bodies docs/ASSET_CONTRACT.md src/catalog/bodySpec.test.ts
git commit -m "feat: add 12 body specs and the asset authoring contract"
```

---

### Task 17: Catalog-wide gate and family vocabulary

The lint rules from Task 4 apply to one file. This runs them over the real asset tree, and
adds the cross-bundle checks that only make sense once many agents have contributed. It must
exist *before* Phase 3 so every art agent has a gate to run.

**Files:**
- Create: `src/catalog/assets.test.ts`, `docs/FAMILIES.md`
- Modify: `package.json` (add `"lint:assets": "vitest run src/catalog/assets.test.ts"`)

**Interfaces:**
- Consumes: `lintAsset`, `assetIdFromPath`, `parseAsset`; `node:fs`.
- Produces: `npm run lint:assets`, and `docs/FAMILIES.md` as the canonical family list.

- [ ] **Step 1: Write `docs/FAMILIES.md`**

Every bundle authors the same families so `data-family` matching works across stages. Names
are lowercase kebab-case and are also the filenames.

```markdown
# Canonical Families

Each bundle (`<stage>/<bodyType>`) authors one asset per family listed here. The file is named
after the family: family `bob` lives at `.../hair/bob.svg` with `data-family="bob"`.

Interpret each family for the age you are drawing — a `hoodie` on a newborn is a hooded
onesie top, on a grandparent it is a looser zip-up. Same family, same slot, age-appropriate art.

## eyes (5)
round · almond · sleepy · wide · happy-arc

## brows (3)
soft · straight · arched

## mouth (4)
smile · grin · neutral · surprised

## hair (10)
bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun

## top (8)
tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top

## bottom (8)
jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees

## onepiece (4)
sundress · jumpsuit · party-dress · romper

## shoes (5)
sneakers · boots · sandals · dress-shoes · slippers

## costume (5)
spider · thunder-god · caped-hero · dino · astronaut

## Accessory pool (authored once per head class, not per bundle)

### glasses (5)
round · square · cat-eye · sport · sunglasses

### headwear (4)
beanie · cap · headband · sun-hat

### earrings (3)
studs · hoops · drops

### necklace (3)
pendant · beads · choker
```

Costume names are generic on purpose — this is original art in the spirit of the archetypes,
not a reproduction of any trademarked character design.

- [ ] **Step 2: Write the failing test**

`src/catalog/assets.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { lintAsset } from './lint'
import { assetIdFromPath, parseAsset } from './parse'

const ROOT = join(process.cwd(), 'src', 'assets')
const files = globSync('**/*.svg', { cwd: ROOT })
  .map((f) => `/src/assets/${f.split(sep).join('/')}`)

const read = (webPath: string) =>
  readFileSync(join(process.cwd(), webPath.replace(/^\//, '')), 'utf8')

describe('asset catalog', () => {
  it('has at least one asset once Phase 3 begins', () => {
    // Passes trivially while the tree is empty; becomes meaningful as art lands.
    expect(Array.isArray(files)).toBe(true)
  })

  it.each(files)('%s passes lint', (f) => {
    expect(lintAsset(f, read(f))).toEqual([])
  })

  it.each(files)('%s parses', (f) => {
    expect(() => parseAsset(assetIdFromPath(f), read(f))).not.toThrow()
  })

  it('has unique asset ids across the whole tree', () => {
    const ids = files.map(assetIdFromPath)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
  })

  it('names every file after its own data-family', () => {
    const bad: string[] = []
    for (const f of files) {
      if (f.includes('/bodies/') || f.includes('/props/') || f.includes('/backdrops/')) continue
      const a = parseAsset(assetIdFromPath(f), read(f))
      const base = f.split('/').pop()!.replace(/\.svg$/, '')
      if (a.family !== base) bad.push(`${f}: data-family="${a.family}" but filename is "${base}"`)
    }
    expect(bad).toEqual([])
  })

  it('gives every wardrobe family the same slot in every bundle', () => {
    const slotByFamily = new Map<string, string>()
    const conflicts: string[] = []
    for (const f of files) {
      if (!f.includes('/catalog/')) continue
      const a = parseAsset(assetIdFromPath(f), read(f))
      const seen = slotByFamily.get(a.family)
      if (seen && seen !== a.slot) conflicts.push(`${a.family}: ${seen} vs ${a.slot} (${f})`)
      else slotByFamily.set(a.family, a.slot)
    }
    expect(conflicts).toEqual([])
  })
})
```

`globSync` from `node:fs` requires Node 22. On Node 20, install `tinyglobby` as a dev
dependency and import `globSync` from there instead — the rest of the file is unchanged.

- [ ] **Step 3: Run it against the empty tree**

Run: `npm run lint:assets`
Expected: PASS with 4 non-parameterised tests and zero per-file cases. An empty tree is valid.

- [ ] **Step 4: Commit**

```bash
git add src/catalog/assets.test.ts docs/FAMILIES.md package.json
git commit -m "test: add catalog-wide asset gate and canonical family vocabulary"
```

---

## Phase 3 — Art production (parallel)

Tasks 18–31 run concurrently. Each owns a disjoint folder, so there are no merge conflicts and
no ordering constraints between them. Every art task shares the same shape:

**Every art task's definition of done:**
1. `npx vitest run src/catalog` passes — lint, parse, uniqueness, family/slot agreement.
2. `npm run dev` → `/?dev=sheet` with the bundle selected shows every asset correctly placed
   on the body, nothing clipped at the canvas edge, nothing floating.
3. Committed with an `art:` prefix.

**Every art task's required reading:** `docs/ASSET_CONTRACT.md`, `docs/FAMILIES.md`, and the
bundle's own `specs/bodies/<bundle>.json`.

Art agents should spawn one subagent per category (eyes, brows, mouth, hair, top, bottom,
onepiece, shoes, costume) since categories are independent files.

### Task 18: Reference bundle — `adult/female`

Do this one **first and alone**. It sets the visual bar the other eleven match, and it is the
first end-to-end proof that the contract, lint, loader and renderer actually work together.

**Files:**
- Create: `src/assets/bodies/adult/female/base.svg`
- Create: `src/assets/catalog/adult/female/eyes/{round,almond,sleepy,wide,happy-arc}.svg`
- Create: `src/assets/catalog/adult/female/brows/{soft,straight,arched}.svg`
- Create: `src/assets/catalog/adult/female/mouth/{smile,grin,neutral,surprised}.svg`
- Create: `src/assets/catalog/adult/female/hair/{bob,pixie,long-waves,ponytail,curls,afro,buzz,side-part,braids,bun}.svg`
- Create: `src/assets/catalog/adult/female/top/{tee,hoodie,stripes,button-up,tank,sweater,jersey,overalls-top}.svg`
- Create: `src/assets/catalog/adult/female/bottom/{jeans,shorts,skirt,joggers,cargo,leggings,pleated,dungarees}.svg`
- Create: `src/assets/catalog/adult/female/onepiece/{sundress,jumpsuit,party-dress,romper}.svg`
- Create: `src/assets/catalog/adult/female/shoes/{sneakers,boots,sandals,dress-shoes,slippers}.svg`
- Create: `src/assets/catalog/adult/female/costume/{spider,thunder-god,caped-hero,dino,astronaut}.svg`

53 files. Geometry from `specs/bodies/adult-female.json`: head `cx 200 cy 91 rx 57 ry 59`,
eye line `100`, ears at `x 149/251 y 95`, shoulders `x 140/260 y 156`, torso `x 140 y 150 w 120
h 160`, hips `x 146 y 302 w 108 h 52`, ground `570`.

- [ ] **Step 1: Author the base body**

`src/assets/bodies/adult/female/base.svg` — the exemplar for the entire project's house style.
Note the vertical gradients, the `sp-shadow` groups per major form, the prefixed ids, and the
skin variables.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="Adult Female Body" data-family="base" data-slot="eyes"
     data-layer="body" data-colors="">
  <defs>
    <linearGradient id="bodies-adult-female-base__skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--skin1, #F7D2B0)"/>
      <stop offset="1" stop-color="var(--skin2, #E7B892)"/>
    </linearGradient>
  </defs>

  <!-- legs -->
  <g class="sp-shadow">
    <rect x="168" y="340" width="28" height="212" rx="14" fill="url(#bodies-adult-female-base__skin)"/>
    <rect x="204" y="340" width="28" height="212" rx="14" fill="url(#bodies-adult-female-base__skin)"/>
  </g>
  <!-- feet -->
  <g class="sp-shadow">
    <rect x="160" y="544" width="42" height="26" rx="13" fill="var(--skin2, #E7B892)"/>
    <rect x="198" y="544" width="42" height="26" rx="13" fill="var(--skin2, #E7B892)"/>
  </g>
  <!-- arms -->
  <g class="sp-shadow">
    <rect x="118" y="164" width="26" height="176" rx="13" fill="url(#bodies-adult-female-base__skin)"/>
    <rect x="256" y="164" width="26" height="176" rx="13" fill="url(#bodies-adult-female-base__skin)"/>
  </g>
  <!-- neck -->
  <rect x="186" y="132" width="28" height="34" rx="12" fill="var(--skin2, #E7B892)"/>
  <!-- torso -->
  <g class="sp-shadow">
    <path d="M140 178 q0-28 30-28 h60 q30 0 30 28 v96 q0 36 -30 36 h-60 q-30 0 -30-36 z"
          fill="url(#bodies-adult-female-base__skin)"/>
  </g>
  <!-- ears -->
  <ellipse cx="149" cy="95" rx="11" ry="13" fill="var(--skin2, #E7B892)"/>
  <ellipse cx="251" cy="95" rx="11" ry="13" fill="var(--skin2, #E7B892)"/>
  <!-- head -->
  <g class="sp-shadow">
    <ellipse cx="200" cy="91" rx="57" ry="59" fill="url(#bodies-adult-female-base__skin)"/>
  </g>
  <!-- upper-surface highlight -->
  <path d="M166 52 q26 -20 62 -14" stroke="#FFFFFF" stroke-opacity="0.26" stroke-width="8"
        fill="none" stroke-linecap="round"/>
  <!-- cheeks -->
  <ellipse cx="166" cy="108" rx="11" ry="7" fill="var(--skin3, #EC9A8D)" opacity="0.5"/>
  <ellipse cx="234" cy="108" rx="11" ry="7" fill="var(--skin3, #EC9A8D)" opacity="0.5"/>
</svg>
```

`data-slot="eyes"` on a body is a harmless formality — bodies are routed by path, never by
slot, and `buildCatalog` keeps them out of the wearable pools.

- [ ] **Step 2: Author one garment as the wardrobe exemplar**

`src/assets/catalog/adult/female/top/hoodie.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="Hoodie" data-family="hoodie" data-slot="top"
     data-layer="top" data-colors="c1,c2" data-hides="">
  <defs>
    <linearGradient id="adult-female-top-hoodie__body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--c1, #7E90DC)"/>
      <stop offset="1" stop-color="var(--c2, #6B7FD0)"/>
    </linearGradient>
  </defs>
  <g class="sp-shadow">
    <!-- sleeves, drawn from the shoulder anchors down the arms -->
    <rect x="114" y="160" width="34" height="120" rx="17" fill="url(#adult-female-top-hoodie__body)"/>
    <rect x="252" y="160" width="34" height="120" rx="17" fill="url(#adult-female-top-hoodie__body)"/>
    <!-- body, fitted to torso x140 y150 w120 h160 -->
    <path d="M136 180 q0-32 34-32 h60 q34 0 34 32 v104 q0 34 -34 34 h-60 q-34 0 -34-34 z"
          fill="url(#adult-female-top-hoodie__body)"/>
    <!-- hood behind the neck -->
    <path d="M168 152 q32 22 64 0 q-6 30 -32 30 q-26 0 -32-30 z" fill="var(--c2, #6B7FD0)"/>
  </g>
  <!-- pocket -->
  <path d="M170 246 h60 v26 q0 8 -8 8 h-44 q-8 0 -8-8 z" fill="var(--c2, #6B7FD0)"/>
  <!-- highlight -->
  <path d="M150 172 q50 18 100 0" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="7"
        fill="none" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 3: Author the remaining 51 files**

Follow `docs/ASSET_CONTRACT.md` and `docs/FAMILIES.md`. Per-category anchoring for this bundle:

| Category | Anchor to |
|---|---|
| eyes | eye line `y = 100`, pupils at `x = 178` and `x = 222`; `data-colors="eye1"` |
| brows | `y ≈ 82`, following the eye spacing; `data-colors="hair2"` |
| mouth | `y ≈ 118`, centred on `x = 200`; `data-colors="lip1"` |
| hair | head ellipse `cx 200 cy 91 rx 57 ry 59`; back group may fall to `y ≈ 320` |
| top | shoulders `y 156`, torso `x 140 w 120`, hem at `y ≈ 318` |
| bottom | hips `x 146 y 302 w 108`, hem between `y 400` (shorts) and `y 548` (full length) |
| onepiece | shoulders down to `y ≈ 430`; `data-hides="top,bottom"` |
| shoes | ground line `y 570`, feet at `x 160–202` and `x 198–240` |
| costume | full figure, shoulders `156` to ground `570`; `data-hides="top,bottom,shoes"` |

- [ ] **Step 4: Run the gate**

Run: `npx vitest run src/catalog`
Expected: PASS — 53 new files lint clean, parse, have unique ids, and match their filenames.

- [ ] **Step 5: Review on the contact sheet**

Run: `npm run dev`, open `/?dev=sheet`, select Adult + female.
Expected: base body renders; every category section is populated; nothing clipped or floating.

- [ ] **Step 6: Commit**

```bash
git add src/assets/bodies/adult/female src/assets/catalog/adult/female
git commit -m "art: add the adult/female reference bundle"
```

---

### Tasks 19–29: The remaining eleven bundles

Each task below is independent and may run concurrently with all the others and with Tasks
30–31. Each produces 53 files in its own folder:

```
src/assets/bodies/<stage>/<bodyType>/base.svg
src/assets/catalog/<stage>/<bodyType>/eyes/{round,almond,sleepy,wide,happy-arc}.svg
src/assets/catalog/<stage>/<bodyType>/brows/{soft,straight,arched}.svg
src/assets/catalog/<stage>/<bodyType>/mouth/{smile,grin,neutral,surprised}.svg
src/assets/catalog/<stage>/<bodyType>/hair/{bob,pixie,long-waves,ponytail,curls,afro,buzz,side-part,braids,bun}.svg
src/assets/catalog/<stage>/<bodyType>/top/{tee,hoodie,stripes,button-up,tank,sweater,jersey,overalls-top}.svg
src/assets/catalog/<stage>/<bodyType>/bottom/{jeans,shorts,skirt,joggers,cargo,leggings,pleated,dungarees}.svg
src/assets/catalog/<stage>/<bodyType>/onepiece/{sundress,jumpsuit,party-dress,romper}.svg
src/assets/catalog/<stage>/<bodyType>/shoes/{sneakers,boots,sandals,dress-shoes,slippers}.svg
src/assets/catalog/<stage>/<bodyType>/costume/{spider,thunder-god,caped-hero,dino,astronaut}.svg
```

**Interfaces:**
- Consumes: `docs/ASSET_CONTRACT.md`, `docs/FAMILIES.md`, `specs/bodies/<bundle>.json`, and `src/assets/bodies/adult/female/base.svg` + `.../top/hoodie.svg` from Task 18 as the style reference.
- Produces: 53 assets whose `data-family` values match `docs/FAMILIES.md` exactly, so Task 12's family remapping resolves across every stage.

**Steps, identical for each of the eleven tasks:**

- [ ] **Step 1: Read the contract**

Read `docs/ASSET_CONTRACT.md` and `docs/FAMILIES.md` in full, then open
`src/assets/bodies/adult/female/base.svg` and `src/assets/catalog/adult/female/top/hoodie.svg`
— those two files are the house style, and this bundle must look like it belongs beside them.

- [ ] **Step 2: Author the base body**

Use the geometry block for your bundle below. Vertical gradient skin, `sp-shadow` group per
major form (head, torso, arms, legs, feet), ids prefixed `bodies-<stage>-<bodyType>-base__`,
`data-colors=""`, skin painted with `var(--skin1, …)` / `var(--skin2, …)` / `var(--skin3, …)`.

- [ ] **Step 3: Author the 52 wardrobe and face assets**

One file per family in `docs/FAMILIES.md`. Interpret each family for this age — a `hoodie` on
a newborn is a hooded onesie top; on a grandparent it is a looser zip-up. Same family string,
age-appropriate art. Ids prefixed `<stage>-<bodyType>-<category>-<family>__`.

- [ ] **Step 4: Run the gate**

Run: `npx vitest run src/catalog`
Expected: PASS. A failure names the exact file and rule.

- [ ] **Step 5: Review on the contact sheet**

Run: `npm run dev`, open `/?dev=sheet`, select this stage and body type.
Expected: every category populated, everything anchored to the body, nothing clipped at the
canvas edge, nothing floating off the figure.

- [ ] **Step 6: Commit**

```bash
git add src/assets/bodies/<stage>/<bodyType> src/assets/catalog/<stage>/<bodyType>
git commit -m "art: add the <stage>/<bodyType> bundle"
```

---

#### Geometry blocks

Ground line is `570` and centreline is `x = 200` in every block. "Top hem" is where a shirt
ends; "bottom hem range" spans shortest (shorts) to longest (full-length trousers).

**Task 19 — `adult/male`**
Head `cx 200 cy 91 rx 57 ry 59` · eye line `100`, pupils `178 / 222` · brows `82` · mouth `118`
· ears `149 / 251 @ 95` · shoulders `130 / 270 @ 156` · torso `x 130 y 150 w 140 h 160`, top hem
`318` · hips `x 142 y 302 w 116 h 52`, bottom hem range `400–548` · onepiece hem `430` · feet
`x 158–202` and `x 198–242 @ 570`. Broader shoulders and a straighter torso taper than
`adult/female`; same head.

**Task 20 — `teen/female`**
Head `cx 200 cy 132 rx 60 ry 62` · eye line `142`, pupils `177 / 223` · brows `124` · mouth `160`
· ears `146 / 254 @ 136` · shoulders `144 / 256 @ 200` · torso `x 144 y 194 w 112 h 150`, top hem
`352` · hips `x 150 y 336 w 100 h 48`, bottom hem range `420–548` · onepiece hem `440` · feet
`x 160–202` and `x 198–240 @ 570`. Slightly larger head relative to the body than the adult;
lankier limbs.

**Task 21 — `teen/male`**
Head `cx 200 cy 132 rx 60 ry 62` · eye line `142`, pupils `177 / 223` · brows `124` · mouth `160`
· ears `146 / 254 @ 136` · shoulders `138 / 262 @ 200` · torso `x 138 y 194 w 124 h 150`, top hem
`352` · hips `x 150 y 336 w 100 h 48`, bottom hem range `420–548` · onepiece hem `440` · feet
`x 158–202` and `x 198–242 @ 570`.

**Task 22 — `midage/female`**
Head `cx 200 cy 102 rx 58 ry 60` · eye line `111`, pupils `177 / 223` · brows `93` · mouth `129`
· ears `148 / 252 @ 106` · shoulders `138 / 262 @ 168` · torso `x 138 y 162 w 124 h 162`, top hem
`332` · hips `x 144 y 316 w 112 h 58`, bottom hem range `414–548` · onepiece hem `430` · feet
`x 160–202` and `x 198–240 @ 570`. Slightly fuller torso and softer silhouette than the adult;
add a subtle laugh-line accent to the face at `y ≈ 120` using `var(--skin2, …)` at low opacity.

**Task 23 — `midage/male`**
Head `cx 200 cy 102 rx 58 ry 60` · eye line `111`, pupils `177 / 223` · brows `93` · mouth `129`
· ears `148 / 252 @ 106` · shoulders `128 / 272 @ 168` · torso `x 128 y 162 w 144 h 162`, top hem
`332` · hips `x 140 y 316 w 120 h 58`, bottom hem range `414–548` · onepiece hem `430` · feet
`x 158–202` and `x 198–242 @ 570`.

**Task 24 — `elder/female`**
Head `cx 200 cy 125 rx 57 ry 59` · eye line `134`, pupils `178 / 222` · brows `116` · mouth `152`
· ears `149 / 251 @ 129` · shoulders `144 / 256 @ 190` · torso `x 144 y 184 w 112 h 152`, top hem
`344` · hips `x 150 y 328 w 100 h 50`, bottom hem range `426–548` · onepiece hem `430` · feet
`x 160–202` and `x 198–240 @ 570`. Narrower shoulders and a gentle forward stoop — shift the
head 4px toward the viewer's left of centre in the *body art only*, never in the spec anchors.
Default hair fallbacks in this bundle use the silver end of the ramp (`#D9D2C5`, `#9AA3B2`).

**Task 25 — `elder/male`**
Head `cx 200 cy 125 rx 57 ry 59` · eye line `134`, pupils `178 / 222` · brows `116` · mouth `152`
· ears `149 / 251 @ 129` · shoulders `136 / 264 @ 190` · torso `x 136 y 184 w 128 h 152`, top hem
`344` · hips `x 148 y 328 w 104 h 50`, bottom hem range `426–548` · onepiece hem `430` · feet
`x 158–202` and `x 198–242 @ 570`. Same stoop and silver-leaning hair fallbacks as Task 24.

**Task 26 — `toddler/female`**
Head `cx 200 cy 268 rx 82 ry 78` · eye line `286`, pupils `168 / 232` · brows `268` · mouth `304`
· ears `124 / 276 @ 272` · shoulders `152 / 248 @ 352` · torso `x 152 y 346 w 96 h 104`, top hem
`458` · hips `x 158 y 442 w 84 h 40`, bottom hem range `470–548` · onepiece hem `490` · feet
`x 166–200` and `x 200–234 @ 570`. Very large head, short limbs, high waist. Hair sits on a much
bigger skull — do not scale adult hair down, redraw it.

**Task 27 — `toddler/male`**
Head `cx 200 cy 268 rx 82 ry 78` · eye line `286`, pupils `168 / 232` · brows `268` · mouth `304`
· ears `124 / 276 @ 272` · shoulders `150 / 250 @ 352` · torso `x 150 y 346 w 100 h 104`, top hem
`458` · hips `x 162 y 442 w 76 h 40`, bottom hem range `470–548` · onepiece hem `490` · feet
`x 166–200` and `x 200–234 @ 570`.

**Task 28 — `newborn/female`**
Head `cx 200 cy 334 rx 88 ry 84` · eye line `352`, pupils `166 / 234` · brows `334` · mouth `370`
· ears `118 / 282 @ 338` · shoulders `156 / 244 @ 424` · torso `x 156 y 418 w 88 h 86`, top hem
`512` · hips `x 162 y 496 w 76 h 34`, bottom hem range `526–548` · onepiece hem `530` · feet
`x 170–200` and `x 200–230 @ 570`. The most extreme proportions in the project — head is more
than half the total height. `bottom` families read as nappy-shorts and footed trousers;
`shoes` read as booties and soft soles. Hair families are sparse wisps, not full styles.

**Task 29 — `newborn/male`**
Head `cx 200 cy 334 rx 88 ry 84` · eye line `352`, pupils `166 / 234` · brows `334` · mouth `370`
· ears `118 / 282 @ 338` · shoulders `154 / 246 @ 424` · torso `x 154 y 418 w 92 h 86`, top hem
`512` · hips `x 166 y 496 w 68 h 34`, bottom hem range `526–548` · onepiece hem `530` · feet
`x 170–200` and `x 200–230 @ 570`. Same sparse-hair and soft-sole treatment as Task 28.

---

### Task 30: Shared head-mounted accessories

Authored once per head class, not per bundle. The renderer maps each class's reference head
onto the target body with a uniform scale-and-translate, so these files must be drawn over the
reference circle exactly.

**Files:**
- Create: `src/assets/accessories/{toddler,teen,adult}/glasses/{round,square,cat-eye,sport,sunglasses}.svg`
- Create: `src/assets/accessories/{toddler,teen,adult}/headwear/{beanie,cap,headband,sun-hat}.svg`
- Create: `src/assets/accessories/{toddler,teen,adult}/earrings/{studs,hoops,drops}.svg`
- Create: `src/assets/accessories/{toddler,teen,adult}/necklace/{pendant,beads,choker}.svg`

45 files (15 per class × 3 classes).

**Interfaces:**
- Consumes: `docs/ASSET_CONTRACT.md`, `docs/FAMILIES.md`, and `ACCESSORY_REF` from `src/render/composition.ts`.
- Produces: 45 assets. Task 8's `headTransform` positions them; Task 12's remapping moves them between head classes by family.

**Reference heads.** Draw over the circle for your class and nothing else:

| Class | Reference head | Eye line | Ears | Neck base |
|---|---|---|---|---|
| `toddler` | `cx 200 cy 268 rx 82` | `286` | `124 / 276 @ 272` | `346` |
| `teen` | `cx 200 cy 132 rx 60` | `142` | `146 / 254 @ 136` | `194` |
| `adult` | `cx 200 cy 91 rx 57` | `100` | `149 / 251 @ 95` | `150` |

Style differs by class and that is the whole point of having three: toddler frames are chunky
and round, teen frames are trend-led, adult frames are slim. Do not draw one set and rescale it.

- [ ] **Step 1: Author the exemplar**

`src/assets/accessories/adult/glasses/round.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="Round" data-family="round" data-slot="glasses"
     data-layer="glasses" data-colors="c1" data-hides="">
  <g class="sp-shadow">
    <circle cx="178" cy="100" r="20" fill="none" stroke="var(--c1, #3B4358)" stroke-width="5"/>
    <circle cx="222" cy="100" r="20" fill="none" stroke="var(--c1, #3B4358)" stroke-width="5"/>
    <path d="M198 100 h4" stroke="var(--c1, #3B4358)" stroke-width="5" stroke-linecap="round"/>
    <path d="M158 96 h-12" stroke="var(--c1, #3B4358)" stroke-width="5" stroke-linecap="round"/>
    <path d="M242 96 h12" stroke="var(--c1, #3B4358)" stroke-width="5" stroke-linecap="round"/>
  </g>
</svg>
```

The temple arms end at the ear anchors (`x 149 / 251`), which is what makes the piece read as
worn rather than pasted on.

- [ ] **Step 2: Author the remaining 44 files**

Anchor rules per category: `glasses` on the eye line, temples to the ears · `headwear` sits on
the skull, brim above the eye line, crown above `cy − rx` · `earrings` hang from the ear
anchors · `necklace` sits at the neck base, curving no wider than `± rx × 0.55`.

- [ ] **Step 3: Run the gate**

Run: `npx vitest run src/catalog`
Expected: PASS.

- [ ] **Step 4: Verify placement across stages**

Run: `npm run dev`, open `/?dev=sheet`, and check the `glasses`, `headwear`, `earrings` and
`necklace` sections on Adult, Teen and Toddler.
Expected: each piece sits correctly on that stage's head. This is the one place the plan uses
runtime fitting, so it is the one place to look hardest.

- [ ] **Step 5: Commit**

```bash
git add src/assets/accessories
git commit -m "art: add shared head-mounted accessories for three head classes"
```

---

### Task 31: Props and backdrops

**Files:**
- Create: `src/assets/props/*.svg` — 24 files:
  `armchair, sofa, table, stool, bed, lamp, rug, plant, tree, bush, ball, kite, balloon, cake, pizza, ice-cream, cup, book, teddy, blocks, dog, cat, bird, skateboard`
- Create: `src/assets/backdrops/*.svg` — 6 files: `park, bedroom, kitchen, beach, street, space`

**Interfaces:**
- Consumes: `docs/ASSET_CONTRACT.md`.
- Produces: 30 assets. `buildCatalog` routes them to `catalog.props` and `catalog.backdrops`; Task 35's stage screen consumes both.

Props and backdrops are not worn, so `data-slot` and `data-family` are formalities — set
`data-slot="top"`, `data-layer="top"`, and `data-family` to the filename. Every other contract
rule still applies, including the id prefix and the shadow class.

- [ ] **Step 1: Author the props**

Props are drawn to sit on the ground line at `y = 570` in their own `0 0 400 600` canvas, so a
prop dropped on the stage aligns with characters standing beside it. Scale them so the largest
(`sofa`, `tree`) fills most of the canvas width and the smallest (`cup`, `book`) occupies
roughly a fifth of it — relative size is baked into the art, since the stage's default scale
is `1` for everything.

- [ ] **Step 2: Author the backdrops**

Backdrops fill the full canvas edge to edge with no transparent margin, and carry a clear
horizon around `y = 400` so characters standing on the stage floor read as grounded. Keep them
low-contrast — they sit behind every character and must not compete.

- [ ] **Step 3: Run the gate**

Run: `npx vitest run src/catalog`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/assets/props src/assets/backdrops
git commit -m "art: add stage props and backdrops"
```

---

## Phase 4 — Application UI (parallel with Phase 3)

These tasks depend only on Phases 1–2. They run against whatever art exists — an empty or
partial catalog renders empty trays, not errors, which is exactly what the fallback rules in
Tasks 8 and 12 guarantee.

### Task 32: App shell and navigation

**Files:**
- Modify: `src/ui/App.tsx`
- Create: `src/ui/Nav.tsx`, `src/ui/SaveErrorBanner.tsx`
- Test: `src/ui/App.test.tsx`

**Interfaces:**
- Consumes: `useAppStore`, `ShadowDefs`, `ContactSheet`, `catalog`.
- Produces: `Screen = 'roster' | 'studio' | 'stage'`, `useScreen()` hook exported from `App.tsx` — `{ screen, editingId, goRoster(), goStudio(id), goStage() }`. Tasks 33–36 mount inside this shell.

- [ ] **Step 1: Write the failing test**

`src/ui/App.test.tsx`:

```tsx
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { useAppStore } from '../state/appStore'

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({ characters: [], scene: { backdropId: '', items: [] }, saveError: null })
})

describe('App shell', () => {
  it('starts on the roster', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /characters/i })).toBeInTheDocument()
  })

  it('navigates to the stage and back', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /stage/i }))
    expect(screen.getByTestId('stage-screen')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /characters/i }))
    expect(screen.getByRole('heading', { name: /characters/i })).toBeInTheDocument()
  })

  it('mounts the shared shadow filter exactly once', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('#sp-drop')).toHaveLength(1)
  })

  it('shows a banner when a save fails and lets it be dismissed', async () => {
    const user = userEvent.setup()
    render(<App />)
    useAppStore.setState({ saveError: 'quota' })
    expect(await screen.findByRole('alert')).toHaveTextContent(/storage is full/i)
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/ui/App.test.tsx`
Expected: FAIL — no roster heading.

- [ ] **Step 3: Write `src/ui/SaveErrorBanner.tsx`**

```tsx
import { useAppStore } from '../state/appStore'

export function SaveErrorBanner() {
  const saveError = useAppStore((s) => s.saveError)
  const dismiss = useAppStore((s) => s.dismissSaveError)
  if (!saveError) return null

  return (
    <div role="alert"
         className="flex items-center gap-3 bg-coral px-4 py-2 text-sm text-white">
      <span>
        {saveError === 'quota'
          ? 'Storage is full — your last change was not saved. Delete a character to free space.'
          : 'Your last change could not be saved.'}
      </span>
      <button onClick={dismiss} className="ml-auto rounded-pill bg-white/25 px-3 py-1">
        Dismiss
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/ui/Nav.tsx`**

```tsx
export interface NavProps {
  screen: 'roster' | 'studio' | 'stage'
  onRoster: () => void
  onStage: () => void
}

export function Nav({ screen, onRoster, onStage }: NavProps) {
  const cls = (active: boolean) =>
    `rounded-pill px-4 py-2 text-sm font-semibold ${active ? 'bg-peri text-white' : 'bg-white'}`

  return (
    <nav className="flex items-center gap-2 px-4 py-3">
      <span className="mr-2 text-lg font-black tracking-tight">TocaCraft</span>
      <button className={cls(screen === 'roster')} onClick={onRoster}>Characters</button>
      <button className={cls(screen === 'stage')} onClick={onStage}>Stage</button>
    </nav>
  )
}
```

- [ ] **Step 5: Write `src/ui/App.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { catalog } from '../catalog/loader'
import { ContactSheet } from '../dev/ContactSheet'
import { ShadowDefs } from '../render/ShadowDefs'
import { useAppStore } from '../state/appStore'
import { Nav } from './Nav'
import { SaveErrorBanner } from './SaveErrorBanner'
import { RosterScreen } from './roster/RosterScreen'
import { StudioScreen } from './studio/StudioScreen'
import { StageScreen } from './stage/StageScreen'

export type Screen = 'roster' | 'studio' | 'stage'

export function App() {
  const [screen, setScreen] = useState<Screen>('roster')
  const [editingId, setEditingId] = useState<string | null>(null)
  const hydrate = useAppStore((s) => s.hydrate)

  useEffect(() => { hydrate(localStorage) }, [hydrate])

  if (new URLSearchParams(window.location.search).get('dev') === 'sheet') {
    return <><ShadowDefs /><ContactSheet /></>
  }

  const goStudio = (id: string) => { setEditingId(id); setScreen('studio') }

  return (
    <div className="flex h-full flex-col">
      <ShadowDefs />
      <SaveErrorBanner />
      <Nav screen={screen}
           onRoster={() => setScreen('roster')}
           onStage={() => setScreen('stage')} />
      <main className="min-h-0 flex-1">
        {screen === 'roster' && <RosterScreen catalog={catalog} onEdit={goStudio} />}
        {screen === 'studio' && editingId && (
          <StudioScreen catalog={catalog} characterId={editingId}
                        onDone={() => setScreen('roster')} />
        )}
        {screen === 'stage' && <StageScreen catalog={catalog} />}
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Run the test**

Run: `npx vitest run src/ui/App.test.tsx`
Expected: 4 tests PASS (once Tasks 33–36 land their screens; until then, stub each screen as a
`<div data-testid="…-screen" />` so the shell test can pass on its own).

- [ ] **Step 7: Commit**

```bash
git add src/ui/App.tsx src/ui/Nav.tsx src/ui/SaveErrorBanner.tsx src/ui/App.test.tsx
git commit -m "feat: add app shell, navigation and save-error banner"
```

---

### Task 33: Roster screen

**Files:**
- Create: `src/ui/roster/RosterScreen.tsx`, `src/ui/roster/CharacterCard.tsx`
- Test: `src/ui/roster/RosterScreen.test.tsx`

**Interfaces:**
- Consumes: `useAppStore`, `CharacterSvg`, `Catalog`, `STAGE_LABELS`.
- Produces: `<RosterScreen catalog onEdit />`, `<CharacterCard character catalog onEdit onDuplicate onDelete />`.

- [ ] **Step 1: Write the failing test**

`src/ui/roster/RosterScreen.test.tsx`:

```tsx
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { buildCatalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { RosterScreen } from './RosterScreen'

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg':
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="B"
      data-family="base" data-slot="eyes" data-layer="body" data-colors="">
      <path d="M0 0"/></svg>`,
})

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({ characters: [], scene: { backdropId: '', items: [] }, saveError: null })
})

describe('RosterScreen', () => {
  it('shows an empty state with a create action', async () => {
    const user = userEvent.setup()
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    expect(screen.getByText(/no characters yet/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /new character/i }))
    expect(useAppStore.getState().characters).toHaveLength(1)
  })

  it('opens the studio for a newly created character', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    render(<RosterScreen catalog={catalog} onEdit={onEdit} />)
    await user.click(screen.getByRole('button', { name: /new character/i }))
    expect(onEdit).toHaveBeenCalledWith(useAppStore.getState().characters[0].id)
  })

  it('renders one card per character with its name and stage', () => {
    useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().updateCharacter(useAppStore.getState().characters[0].id, { name: 'Mia' })
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    const card = screen.getByTestId(`card-${useAppStore.getState().characters[0].id}`)
    expect(within(card).getByText('Mia')).toBeInTheDocument()
    expect(within(card).getByText(/adult/i)).toBeInTheDocument()
  })

  it('duplicates a character', async () => {
    const user = userEvent.setup()
    useAppStore.getState().createCharacter(catalog)
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /duplicate/i }))
    expect(useAppStore.getState().characters).toHaveLength(2)
  })

  it('asks for confirmation before deleting', async () => {
    const user = userEvent.setup()
    useAppStore.getState().createCharacter(catalog)
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(useAppStore.getState().characters).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: /^confirm$/i }))
    expect(useAppStore.getState().characters).toHaveLength(0)
  })

  it('adds a random character', async () => {
    const user = userEvent.setup()
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /surprise me/i }))
    expect(useAppStore.getState().characters).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run src/ui/roster`
Expected: FAIL — cannot resolve `./RosterScreen`.

- [ ] **Step 3: Write `src/ui/roster/CharacterCard.tsx`**

```tsx
import { useState } from 'react'
import type { Catalog } from '../../catalog/build'
import { STAGE_LABELS, type Character } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'

export interface CharacterCardProps {
  character: Character
  catalog: Catalog
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

export function CharacterCard({
  character, catalog, onEdit, onDuplicate, onDelete,
}: CharacterCardProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <figure data-testid={`card-${character.id}`}
            className="flex flex-col rounded-2xl bg-white p-3 shadow-sm">
      <button onClick={() => onEdit(character.id)}
              className="rounded-xl bg-page p-2"
              aria-label={`Edit ${character.name}`}>
        <CharacterSvg character={character} catalog={catalog} className="h-48 w-full" />
      </button>

      <figcaption className="mt-2">
        <div className="truncate font-semibold">{character.name}</div>
        <div className="text-xs opacity-60">
          {STAGE_LABELS[character.stage]} · {character.bodyType}
        </div>
      </figcaption>

      <div className="mt-3 flex gap-2 text-xs">
        <button className="rounded-pill bg-page px-3 py-1"
                onClick={() => onDuplicate(character.id)}>Duplicate</button>
        {confirming ? (
          <>
            <button className="rounded-pill bg-coral px-3 py-1 text-white"
                    onClick={() => onDelete(character.id)}>Confirm</button>
            <button className="rounded-pill bg-page px-3 py-1"
                    onClick={() => setConfirming(false)}>Cancel</button>
          </>
        ) : (
          <button className="rounded-pill bg-page px-3 py-1"
                  onClick={() => setConfirming(true)}>Delete</button>
        )}
      </div>
    </figure>
  )
}
```

- [ ] **Step 4: Write `src/ui/roster/RosterScreen.tsx`**

```tsx
import type { Catalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { CharacterCard } from './CharacterCard'

export interface RosterScreenProps {
  catalog: Catalog
  onEdit: (id: string) => void
}

export function RosterScreen({ catalog, onEdit }: RosterScreenProps) {
  const characters = useAppStore((s) => s.characters)
  const create = useAppStore((s) => s.createCharacter)
  const addRandom = useAppStore((s) => s.addRandomCharacter)
  const duplicate = useAppStore((s) => s.duplicateCharacter)
  const remove = useAppStore((s) => s.deleteCharacter)

  return (
    <div className="h-full overflow-y-auto px-4 pb-10">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-black">Characters</h1>
        <div className="ml-auto flex gap-2">
          <button className="rounded-pill bg-white px-4 py-2 text-sm font-semibold"
                  onClick={() => addRandom(catalog)}>🎲 Surprise me</button>
          <button className="rounded-pill bg-coral px-4 py-2 text-sm font-bold text-white"
                  onClick={() => onEdit(create(catalog).id)}>New character</button>
        </div>
      </div>

      {characters.length === 0 ? (
        <p className="mt-16 text-center opacity-60">
          No characters yet — make your first one.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
          {characters.map((c) => (
            <CharacterCard key={c.id} character={c} catalog={catalog}
                           onEdit={onEdit} onDuplicate={duplicate} onDelete={remove} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Run the test**

Run: `npx vitest run src/ui/roster`
Expected: 6 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/ui/roster
git commit -m "feat: add the character roster screen"
```

---

### Task 34: Studio screen

Layout A from the spec: icon rail, life-stage strip, centre stage, right option tray.

**Files:**
- Create: `src/ui/studio/StudioScreen.tsx`, `src/ui/studio/CategoryRail.tsx`, `src/ui/studio/StageStrip.tsx`, `src/ui/studio/OptionTray.tsx`, `src/ui/studio/SwatchRow.tsx`, `src/ui/studio/categories.ts`
- Test: `src/ui/studio/StudioScreen.test.tsx`

**Interfaces:**
- Consumes: `useAppStore`, `CharacterSvg`, `Catalog`, `LIFE_STAGES`, `STAGE_LABELS`, `BODY_TYPES`, `SKIN_TONES`, `GARMENT_PALETTE`, `HAIR_PALETTE`, `ACCESSORY_SLOTS`.
- Produces: `<StudioScreen catalog characterId onDone />`; `CATEGORIES: { key, label, icon, slots: Slot[] }[]` from `categories.ts`, reused by Task 35.

`src/ui/studio/categories.ts`:

```ts
import type { Slot } from '../../catalog/types'

export interface Category { key: string; label: string; icon: string; slots: Slot[] }

export const CATEGORIES: Category[] = [
  { key: 'face', label: 'Face', icon: '🙂', slots: ['eyes', 'brows', 'mouth'] },
  { key: 'hair', label: 'Hair', icon: '💇', slots: ['hair'] },
  { key: 'top', label: 'Tops', icon: '👕', slots: ['top'] },
  { key: 'bottom', label: 'Bottoms', icon: '👖', slots: ['bottom'] },
  { key: 'onepiece', label: 'Dresses', icon: '👗', slots: ['onepiece'] },
  { key: 'shoes', label: 'Shoes', icon: '👟', slots: ['shoes'] },
  { key: 'accessories', label: 'Extras', icon: '🕶️', slots: ['glasses', 'headwear', 'earrings', 'necklace'] },
  { key: 'costume', label: 'Costumes', icon: '🦸', slots: ['costume'] },
]
```

**Behaviour the tests must cover:**

- [ ] **Step 1: Write `src/ui/studio/StudioScreen.test.tsx`** covering:
  1. renders the character and its name
  2. clicking a rail category switches the tray contents
  3. clicking an option in the tray equips it on the character in the store
  4. clicking the equipped option again unequips it
  5. changing life stage calls `setStage` and the character keeps its family (assert the new `assetId` belongs to the new bundle)
  6. changing body type calls `setBodyType`
  7. a skin swatch updates `skinToneId`
  8. a colour swatch updates the equipped slot's `colors`
  9. "Surprise me" replaces every slot on **this** character without creating a new one
  10. slots hidden by an equipped costume render as disabled in the tray with a "hidden by costume" note
  11. Done calls `onDone`

- [ ] **Step 2: Run to confirm failure**

Run: `npx vitest run src/ui/studio`
Expected: FAIL.

- [ ] **Step 3: Build the components**

`CategoryRail` — vertical list of `CATEGORIES` buttons, active one highlighted, `aria-pressed`
reflecting selection.

`StageStrip` — the six `LIFE_STAGES` as chips using `STAGE_LABELS`, plus a female/male toggle.

`SwatchRow` — a row of round colour buttons; takes `colors: string[]`, `value`, `onChange`.

`OptionTray` — for the active category, one section per slot in `category.slots`. Each section
renders `SwatchRow` (skin tones for `face`, `HAIR_PALETTE` for `hair`, `GARMENT_PALETTE`
otherwise) above a grid of option tiles. Each tile renders `<CharacterSvg>` of the current
character with only that slot swapped, so the preview is a true preview. Pool comes from
`catalog.bundle[bundleKey(stage, bodyType)][slot]`, except for `ACCESSORY_SLOTS` which read
`catalog.accessories[spec.headSizeClass][slot]`. A slot present in `hiddenSlots(character,
catalog)` renders disabled with the note.

`StudioScreen` — grid `70px 1fr 300px`; rail, then a column holding `StageStrip` over the
character; tray on the right. Beneath the character: Reset (clears every slot but keeps stage,
body type and skin), Surprise me, and Done.

- [ ] **Step 4: Run the tests**

Run: `npx vitest run src/ui/studio`
Expected: 11 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/ui/studio
git commit -m "feat: add the character studio screen"
```

---

### Task 35: Studio responsive drawer

**Files:**
- Modify: `src/ui/studio/StudioScreen.tsx`
- Create: `src/ui/useMediaQuery.ts`, `src/ui/studio/TrayDrawer.tsx`
- Test: `src/ui/studio/TrayDrawer.test.tsx`, `src/ui/useMediaQuery.test.ts`

**Interfaces:**
- Consumes: `CATEGORIES`, `OptionTray`.
- Produces: `useMediaQuery(query: string): boolean`, `<TrayDrawer>`. Below 900px the rail collapses into a horizontal chip scroller and the tray becomes a bottom drawer.

- [ ] **Step 1: Write the tests**

`useMediaQuery.test.ts`: returns the initial `matches`, updates on a `change` event, and
removes its listener on unmount. Stub `window.matchMedia` since jsdom does not implement it.

`TrayDrawer.test.tsx`: renders collapsed by default; the handle expands it; the category chips
are horizontally scrollable; expanding does not unmount the character.

- [ ] **Step 2: Run to confirm failure**

Run: `npx vitest run src/ui/useMediaQuery.test.ts src/ui/studio/TrayDrawer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/ui/useMediaQuery.ts
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query).matches
      : false,
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
```

In `StudioScreen`, `const narrow = useMediaQuery('(max-width: 899px)')`. When `narrow`, render
`<TrayDrawer>` wrapping the same `<OptionTray>` and swap `CategoryRail` for the chip scroller.
The character element must be the same React subtree in both branches so switching orientation
on an iPad does not remount it.

- [ ] **Step 4: Run the tests**

Run: `npx vitest run src/ui`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/ui/useMediaQuery.ts src/ui/studio
git commit -m "feat: collapse the studio tray into a bottom drawer on narrow screens"
```

---

### Task 36: Stage screen

**Files:**
- Create: `src/ui/stage/StageScreen.tsx`, `src/ui/stage/StageItem.tsx`, `src/ui/stage/StageDrawer.tsx`, `src/ui/stage/usePointerDrag.ts`
- Test: `src/ui/stage/StageScreen.test.tsx`, `src/ui/stage/usePointerDrag.test.ts`

**Interfaces:**
- Consumes: `useAppStore`, `sceneOps` constants, `CharacterSvg`, `Catalog`.
- Produces: `<StageScreen catalog />` rendering `data-testid="stage-screen"`.

**Key decisions:**
- The stage is one `<svg viewBox="0 0 1600 1000">` — `STAGE_W`/`STAGE_H` from Task 14 — scaled by CSS to fit the viewport. Screen-space pointer deltas are converted to stage space by dividing by the current rendered scale, which `usePointerDrag` reads from `getBoundingClientRect()`.
- Characters render with `quality="flat"`, so no SVG filters run on the stage.
- Pointer events only — `pointerdown` / `pointermove` / `pointerup` with `setPointerCapture`. This is identical on mouse and touch, which is why no drag library is needed.
- Selecting an item calls `raiseItem` so the dragged thing is always on top.
- Items render sorted by `z`.

- [ ] **Step 1: Write the tests**

`usePointerDrag.test.ts`: converts screen delta to stage delta using a stubbed rect; ignores
moves before `pointerdown`; releases capture on `pointerup`.

`StageScreen.test.tsx`: renders the backdrop picker; dragging an item calls `dragItem` with the
converted delta; tapping an item raises it; the scale slider calls `scaleItem`; flip toggles
`flipX`; remove deletes the item; dropping a character from the drawer calls `addToScene`;
characters render with the `quality-flat` class.

- [ ] **Step 2: Run to confirm failure**

Run: `npx vitest run src/ui/stage`
Expected: FAIL.

- [ ] **Step 3: Implement**

`StageDrawer` — a collapsible bottom panel with two tabs, Characters (the roster) and Props
(`catalog.props`), plus the backdrop picker (`catalog.backdrops`). Tapping an entry adds it at
the stage centre; dragging it in adds it at the drop point.

`StageItem` — a `<g transform="translate(x y) scale(±scale)">` wrapping either a
`<CharacterSvg quality="flat">` or a prop's markup. When selected, draws a selection ring plus
inline flip / bring-to-front / remove buttons and a scale slider.

`StageScreen` — backdrop `<image>`-free: the chosen backdrop's markup is injected as the first
child group. Then items sorted by `z`. Deselect on background tap.

- [ ] **Step 4: Run the tests**

Run: `npx vitest run src/ui/stage`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/ui/stage
git commit -m "feat: add the drag-and-drop stage screen"
```

---

## Phase 5 — Integration

### Task 37: Wire up, verify, polish

**Files:**
- Modify: `src/ui/App.tsx` (remove screen stubs), `README.md` (create)
- Test: `src/integration.test.tsx`

- [ ] **Step 1: Write the integration test**

`src/integration.test.tsx` — one test that exercises the real flow against the real catalog:
create a character → equip a top → switch stage to `teen` → assert the top's family survived →
add to the scene → delete the character → assert the scene item went with it → reload from
`localStorage` and assert the roster round-tripped.

- [ ] **Step 2: Run the full suite**

Run: `npm test`
Expected: every suite passes, including the ~711-case asset lint.

- [ ] **Step 3: Typecheck and build**

Run: `npm run build`
Expected: exits 0 with no TypeScript errors.

- [ ] **Step 4: Manual responsive pass**

Run: `npm run dev`. Check at 1440px (desktop), 1024px (iPad landscape) and 768px (iPad
portrait): the studio tray becomes a drawer below 900px, nothing overflows horizontally, and
the stage remains draggable by touch.

- [ ] **Step 5: Write `README.md`**

Cover: what the app is, `npm install && npm run dev`, the asset contract in one paragraph with
a link to `docs/ASSET_CONTRACT.md`, how to add a new asset (drop an SVG in the right folder —
no registration step), and `/?dev=sheet`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: wire screens together and add integration coverage"
```

---

## Spec coverage

| Spec section | Tasks |
|---|---|
| §1 Scope — studio, roster, stage, randomiser | 33, 34, 36, 13 |
| §2 Visual direction — Soft Papercut, quality tiers | 16 (contract), 18, 9 |
| §3 Layout — rail/stage/tray, responsive drawer | 34, 35 |
| §4.1–4.2 SVG assets, metadata in art | 3, 5, 6, 16 |
| §4.3 Lint rules | 4, 17 |
| §4.4 Recolouring | 4, 7, 9 |
| §4.5 Body spec contract | 16 |
| §4.6 Layer order, hair split | 2, 3, 8 |
| §4.7 Shared accessories | 8, 30 |
| §4.8–4.9 Directory layout, volume | 5, 18–31 |
| §5.1 Character model | 2 |
| §5.2 Costume overrides | 8 |
| §5.3 `data-family` ageing | 12, 17 |
| §5.4 Scene model | 14 |
| §5.5 Persistence | 11, 15 |
| §6 Randomiser | 13 |
| §7 Technology | 1 |
| §8 Module boundaries | all |
| §9 Error handling | 8, 11, 15, 32 |
| §10 Testing strategy | 2–17, 32–37 |
| §11 Build plan | phases 1–5 |

