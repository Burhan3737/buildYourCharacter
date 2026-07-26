# TocaCraft — Character Builder & Stage

**Date:** 2026-07-26
**Status:** Approved design

A browser-based character creation studio in the spirit of Toca Boca. Users build fully
customised characters across six life stages, save a roster of them locally, and arrange
them on a backdrop with props. No backend, no accounts, no database — everything lives in
`localStorage`. Optimised for desktop and iPad (landscape and portrait).

---

## 1. Product scope

**In scope for v1:**

- Character studio: life stage, body type, skin tone, face, hair, clothing, accessories, costumes
- Character roster: create, rename, edit, duplicate, delete; unlimited characters
- Stage: pick a backdrop, drag saved characters and props onto it, arrange them
- "Surprise me" randomiser

**Explicitly out of scope for v1:**

- PNG export, JSON export/import, undo/redo (considered and deliberately deferred)
- Any backend, sync, accounts, or sharing
- Animation, posing, or character rigging beyond flip-horizontal
- Mobile phone layouts (desktop and iPad only)

---

## 2. Visual direction

**Soft Papercut.** Stacked flat shapes with vertical gradients and soft drop shadows, giving
a dimensional cut-felt look. Rounded silhouettes, pastel-leaning palette, no ink outlines.
Chosen over a flatter Toca-Boca-alike because it reads as a premium modern app rather than a
clone.

Reference palette (extend, don't replace): `#7E90DC` periwinkle, `#F4A79B` coral,
`#6BBFAD` mint, `#F7C873` butter, `#EFF3F8` page, `#3B2A22` ink.

**Quality tiers.** The studio renders at full quality with SVG filters. The stage renders in
*flat* mode — the same assets with filters suppressed — so many characters on screen at once
stay smooth. This is a CSS toggle, not a second set of art (see §4.3).

---

## 3. Layout

**Studio — icon rail + centre stage + option tray.**

- Left: vertical icon rail of categories (Face, Hair, Tops, Bottoms, Shoes, Accessories, Costumes)
- Top: life stage strip (six chips) plus body-type toggle
- Centre: the character, always visible, on a soft platform; Reset and Surprise-me beneath
- Right: fixed tray showing the selected category — colour swatch row above an option grid
- Bottom right: Save character

**Responsive rule:** below 900px width (iPad portrait), the right tray becomes a swipe-up
bottom drawer with the category chips as a horizontal scroller. The rail collapses into those
chips. One codebase, two arrangements — no second UI.

**Roster** is a responsive card grid of saved characters, each card rendering the live
character. **Stage** is a full-bleed backdrop with a collapsible drawer holding the character
roster and prop catalog to drag from.

---

## 4. Asset architecture

This is the core of the project. ~711 pieces of art are produced by parallel agents; the
architecture exists to make that safe.

### 4.1 One asset = one `.svg` file

Assets are standalone SVG files on disk, never TSX components. The catalog is **derived** at
build time:

```ts
import.meta.glob('/src/assets/**/*.svg', { query: '?raw', eager: true })
```

There is no hand-maintained registry file. An agent drops a file into its own folder and the
asset appears in the app. This is what allows a dozen agents to author concurrently with zero
merge conflicts — there is no shared file for them to contend on.

### 4.2 Metadata lives inside the art

No sidecar JSON. Data attributes on the SVG root:

```xml
<svg viewBox="0 0 400 600"
     data-name="Bob Cut"
     data-family="bob"
     data-slot="hair"
     data-colors="hair1,hair2"
     data-layer="hair-front"
     data-hides="">
```

| Attribute | Meaning |
|---|---|
| `data-name` | Display name in the tray |
| `data-family` | Cross-stage identity key (see §5.3) |
| `data-slot` | Which character slot this occupies |
| `data-colors` | Comma-separated colour variable names this asset consumes |
| `data-layer` | Z-stack layer name |
| `data-hides` | Comma-separated slots suppressed while equipped (costumes, one-pieces) |

### 4.3 Three lint rules, enforced as tests

With ~711 agent-authored files, these failures are silent and catastrophic. The lint script
runs in CI *and* as a Vitest suite.

1. **ID prefixing.** Every internal `id` must be prefixed with the asset's own id
   (`hair-adult-f-bob__grad1`). Assets are inlined into a single document; two gradients both
   named `grad1` will silently repaint each other's characters.
2. **No local `<filter>` definitions.** Shadows are opt-in via `class="sp-shadow"`, which
   resolves to one shared document-level filter. Flat mode works by having CSS stop applying
   that filter — impossible if assets define their own.
3. **Structural validity.** Required data-attrs present, `viewBox="0 0 400 600"`, parses as
   XML, no external references (`<image href="http…">`, external fonts), no raster embeds.

### 4.4 Recolouring

Assets never hardcode a tunable colour. They paint through CSS custom properties with
fallbacks so a file still renders correctly when opened standalone:

```xml
<path fill="var(--hair1, #43291F)" />
<path fill="var(--hair2, #6B4A3A)" />
```

The renderer sets these variables on a wrapper `<g>`. One SVG serves every colourway.
Variable namespaces: `--skin1/2/3`, `--hair1/2`, `--c1/2/3` for garments, `--eye1`, `--lip1`.

### 4.5 The body spec is the contract

Each of the 12 bundles (6 stages × 2 body types) publishes an anchor-point spec:

```jsonc
// specs/bodies/adult-female.json
{
  "viewBox": [0, 0, 400, 600],
  "head":      { "cx": 200, "cy": 150, "rx": 74, "ry": 78 },
  "eyeLine":   162,
  "ears":      [{ "x": 126, "y": 156 }, { "x": 274, "y": 156 }],
  "shoulders": [{ "x": 140, "y": 262 }, { "x": 260, "y": 262 }],
  "torso":     { "x": 138, "y": 254, "w": 124, "h": 150 },
  "hips":      { "x": 146, "y": 386, "w": 108, "h": 44 },
  "footLine":  556,
  "headSizeClass": "full"
}
```

Every garment in a bundle is **drawn to fit that bundle's spec exactly**. There is no runtime
fitting, scaling, or warping code anywhere in the renderer. This is the entire payoff of
choosing fully-distinct-per-stage art: the hard problem is solved by authoring, and the code
stays trivial.

`headSizeClass` is one of `small | mid | full` and is what lets head-mounted accessories be
shared (§4.7).

### 4.6 Layer order

A single z-stack, defined once in code. Assets declare membership via `data-layer`.

| Order | Layer | Notes |
|---|---|---|
| 10 | `hair-back` | behind the body |
| 20 | `body` | base body + skin |
| 30 | `bottom` | |
| 40 | `top` | |
| 45 | `onepiece` | dresses, jumpsuits |
| 50 | `shoes` | |
| 60 | `face` | eyes, brows, mouth |
| 70 | `hair-front` | |
| 80 | `costume` | |
| 85 | `necklace` | sits over the costume/top |
| 90 | `earrings` | |
| 95 | `glasses` | over hair-front, under headwear |
| 100 | `headwear` | hats, headbands |

Every layer holds at most one asset, so ordering within a layer is never ambiguous.

**Hair is authored as two groups in one file** — a `hair-back` group and a `hair-front` group.
The loader splits them and places each at its own z-position. Without this, long hair either
floats over the shoulders or vanishes behind the torso.

### 4.7 Shared head-mounted accessories

Glasses, headwear, earrings, and necklaces attach to head/neck anchors rather than the body
silhouette. They are authored once per `headSizeClass` (`small`, `mid`, `full`) instead of once
per bundle, and positioned from the target bundle's `head` and `ears` anchors. This removes
~135 files with no visual loss. All other categories remain fully per-bundle.

### 4.8 Directory layout

```
src/assets/
  bodies/<stage>/<bodyType>/base.svg
  catalog/<stage>/<bodyType>/<category>/<name>.svg   # eyes brows mouth hair top
                                                     # bottom onepiece shoes costume
  accessories/<headSizeClass>/<category>/<name>.svg  # glasses headwear earrings necklace
  props/<name>.svg
  backdrops/<name>.svg
specs/bodies/<stage>-<bodyType>.json
```

Each `<stage>/<bodyType>` folder is owned by exactly one agent.

### 4.9 Catalog volume

| Group | Per bundle | Bundles | Total |
|---|---|---|---|
| Base body | 1 | 12 | 12 |
| Face (5 eyes, 3 brows, 4 mouths) | 12 | 12 | 144 |
| Hair | 10 | 12 | 120 |
| Tops | 8 | 12 | 96 |
| Bottoms | 8 | 12 | 96 |
| One-pieces | 4 | 12 | 48 |
| Shoes | 5 | 12 | 60 |
| Costumes | 5 | 12 | 60 |
| Accessories (5 glasses, 4 headwear, 3 earrings, 3 necklace) | 15 | 3 classes | 45 |
| Props | — | — | 24 |
| Backdrops | — | — | 6 |
| **Total** | | | **711** |

---

## 5. Data model

### 5.1 Character

```ts
type LifeStage = 'newborn' | 'toddler' | 'teen' | 'adult' | 'midage' | 'elder'
type BodyType  = 'female' | 'male'

type Slot =
  | 'eyes' | 'brows' | 'mouth'
  | 'hair' | 'top' | 'bottom' | 'onepiece' | 'shoes'
  | 'glasses' | 'headwear' | 'earrings' | 'necklace'
  | 'costume'

interface Equipped {
  assetId: string
  colors: Record<string, string>   // e.g. { hair1: '#43291F', hair2: '#6B4A3A' }
}

interface Character {
  id: string
  name: string
  stage: LifeStage
  bodyType: BodyType
  skinToneId: string               // indexes a shared skin ramp -> --skin1/2/3
  slots: Partial<Record<Slot, Equipped>>
  createdAt: number
  updatedAt: number
}
```

Life stage display labels: Newborn, Toddler, Teen, Adult, Middle-aged, Grandparent.

### 5.2 Costumes and one-pieces are overrides, never replacements

An asset's `data-hides` lists slots suppressed while it is equipped. Equipping a Spider-Man
costume (`data-hides="top,bottom,shoes"`) hides those three slots at render time; the
underlying garments remain in `slots` untouched and reappear the moment the costume is
removed. A dress uses the same mechanism with `data-hides="top,bottom"`.

Hiding is purely a render-time filter. Nothing is ever deleted from the character.

### 5.3 `data-family` — how a character ages

Because assets are per-stage, switching a character from Teen to Adult would naively reset
every slot. Instead, each asset carries a `data-family` key that is shared by its counterparts
in other bundles (`bob`, `cargo-pants`, `hoodie`).

On a stage or body-type change, for each equipped slot:

1. Look up the same `data-family` in the target bundle. If found, equip it and carry colours across.
2. If the family has no counterpart in that bundle, fall back to the first asset in the slot.
3. If the slot has no assets in that bundle at all, clear the slot.

The result is that the character *grows up* rather than becoming a stranger. Colour choices
always survive, since colours are stored on the character, not the asset.

### 5.4 Scene

```ts
interface SceneItem {
  id: string
  kind: 'character' | 'prop'
  refId: string        // characterId or assetId
  x: number; y: number // stage-space coordinates
  scale: number
  flipX: boolean
  z: number
}

interface Scene {
  backdropId: string
  items: SceneItem[]
}
```

One scene in v1. A character deleted from the roster is removed from the scene at the same
time — the store enforces this so the scene can never reference a missing character.

### 5.5 Persistence

A single versioned envelope in `localStorage` under `tocacraft.v1`, written by Zustand's
`persist` middleware with `version` and a `migrate` function map, so future schema changes
never wipe a user's roster. Quota-exceeded errors are caught and surfaced to the user rather
than swallowed.

```ts
{ version: 1, characters: Character[], scene: Scene }
```

Characters store only asset **ids** and colours — never inlined SVG — so the payload stays
small regardless of catalog size.

---

## 6. Randomiser

"Surprise me" produces a complete, rule-valid character: it picks a body type and stage (or
respects the current one), a skin tone, and one asset per visible slot, honouring `data-hides`
so it can never generate a character wearing a costume *and* a visible shirt. Garment colours
are drawn from curated per-category palettes rather than pure random RGB, so results look
designed rather than noisy.

It doubles as the fastest smoke test of the entire catalog.

---

## 7. Technology

| Concern | Choice | Why |
|---|---|---|
| Build | Vite + TypeScript | `import.meta.glob` is what makes the derived catalog work |
| UI | React 18 | |
| State | Zustand + `persist` | Minimal boilerplate; localStorage persistence is built in |
| Styling | Tailwind | UI chrome only; character art is pure SVG |
| Dragging | Hand-rolled pointer events | Identical behaviour on desktop and iPad; no library needed |
| Testing | Vitest + Testing Library | |

No animation library. Transitions are CSS.

---

## 8. Module boundaries

Each unit has one purpose, a narrow interface, and is testable alone.

| Module | Responsibility | Depends on |
|---|---|---|
| `catalog/loader` | Glob SVGs, parse data-attrs, split hair groups, build the indexed catalog | — |
| `catalog/lint` | The three asset rules; runs as CI script and Vitest suite | — |
| `catalog/types` | `Character`, `Slot`, `Scene`, `BodySpec`, asset types | — |
| `render/CharacterSvg` | Compose equipped assets into one SVG by z-order; apply colour vars; honour `data-hides`; quality tier | catalog |
| `state/roster` | Character CRUD, family remapping on stage change, persistence | catalog/types |
| `state/scene` | Scene items, pure drag/z-order/scale reducers | catalog/types |
| `state/randomizer` | Rule-valid random character generation | catalog |
| `ui/studio` | Rail, stage-strip, option tray, colour swatches, responsive drawer | render, state |
| `ui/roster` | Character grid, create/duplicate/delete | render, state |
| `ui/stage` | Backdrop, draggable items, prop drawer | render, state |

`render/CharacterSvg` is the only module that knows how art is composed. `ui/*` never touches
raw SVG.

---

## 9. Error handling

| Failure | Behaviour |
|---|---|
| Asset id referenced by a character no longer exists | Slot renders empty; studio shows the slot as unselected. Never crashes. |
| `localStorage` quota exceeded | Caught; user sees a message explaining the save failed. Prior state stays intact. |
| Corrupt or unparseable persisted state | Falls back to empty roster rather than a white screen; corrupt payload preserved under `tocacraft.v1.corrupt` for diagnosis. |
| Malformed SVG in the catalog | Fails the lint test at build/CI time — never reaches the browser. |
| Scene references a deleted character | Prevented at the store level (§5.4). |

---

## 10. Testing strategy

Vitest, targeting the things that genuinely break:

- **Asset lint across all ~711 files** — the three rules of §4.3
- **Catalog loader** — attribute parsing, hair-back/hair-front splitting, index shape
- **Family remapping** — stage switches preserve families, fall back correctly on a missing
  family, clear on an empty slot, and always carry colours across
- **Costume overrides** — hide then restore round-trips the underlying outfit exactly
- **Randomiser** — output is always renderable and never violates `data-hides`
- **Persistence** — migration from a v1 fixture; corrupt-payload fallback
- **Scene reducers** — pure drag, scale, z-order and flip maths, tested without a DOM

Component tests cover tray selection and the responsive drawer breakpoint. No end-to-end
browser suite in v1.

---

## 11. Build plan — parallel streams

1. **Foundation** *(serial, blocking)* — repo scaffold, `catalog/types`, body-spec schema, the
   written asset contract, `catalog/lint`, `catalog/loader`, `render/CharacterSvg`. Every other
   stream codes against this. Nothing parallelises before it exists.
2. **Body specs** *(1 agent)* — the 12 anchor specs and 12 base bodies. Gates all wardrobe work.
3. **Art** *(12 parallel agents)* — one per `(stage, bodyType)` bundle, each owning its folder
   exclusively and free to spawn per-category subagents. Zero shared files, zero conflicts.
4. **Accessories, props, backdrops** *(2 agents, parallel with 3)*.
5. **App UI** *(3 parallel agents, parallel with 3 and 4)* — Studio, Stage, Roster+randomiser,
   built against placeholder assets.
6. **Integration and polish** *(serial)* — wire up, run full lint and test suites, iPad-portrait
   responsive pass.

Streams 3, 4 and 5 run concurrently and represent the bulk of the work.
