# TocaCraft

A browser-based character creation studio in the spirit of Toca Boca. Build characters across
six life stages, save a roster of them, and arrange them on a backdrop with props.

No backend, no accounts, no database — everything persists to `localStorage`. Optimised for
desktop and iPad (landscape and portrait).

```bash
npm install
npm run dev      # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck and produce `dist/` |
| `npm test` | Full suite — 1663 tests, including a lint pass over every asset |
| `npm run lint:assets` | Just the asset lint, for a fast art-only check |

## What's in it

- **Roster** — create, edit, duplicate and delete characters. Unlimited, all local.
- **Studio** — life stage, body type, skin tone, face, hair, clothing, accessories, costumes.
- **Stage** — pick a backdrop, drag characters and props in, arrange them.
- **Surprise me** — one button rolls a complete, valid random character.

## The art system

711 hand-authored SVGs live under `src/assets/`. The thing worth understanding is that
**there is no registry**. The catalog is derived at build time:

```ts
import.meta.glob('/src/assets/**/*.svg', { query: '?raw', eager: true })
```

Each asset carries its own metadata in root `data-*` attributes, so **adding a new asset means
dropping an `.svg` into the right folder — there is no file to register it in**. That is what
let a dozen agents author the catalog concurrently without merge conflicts.

Two ideas do most of the work:

- **The body spec is the contract.** Each of the 12 bundles (6 stages × 2 body types) publishes
  anchor points in `specs/bodies/`, and every garment in that bundle is drawn to fit them
  exactly. The renderer contains no fitting maths — the hard problem is solved by authoring.
- **`data-family` is why characters age instead of resetting.** A `bob` haircut exists
  separately in all twelve bundles. Switching a character from teen to adult looks up the same
  family in the new bundle, so your character grows up rather than becoming a stranger. Colour
  choices live on the character, so they always survive.

Costumes and dresses declare `data-hides`, which suppresses other slots at render time only —
the outfit underneath is never destroyed, and reappears when the costume comes off.

Full authoring rules: **[`docs/ASSET_CONTRACT.md`](docs/ASSET_CONTRACT.md)**. Canonical asset
names: **[`docs/FAMILIES.md`](docs/FAMILIES.md)**. Both are enforced by
`src/catalog/assets.test.ts`, which lints all 711 files on every test run — malformed art
fails the build rather than reaching the browser.

## Reviewing art

```
npm run dev  →  http://localhost:5173/?dev=sheet
```

A dev-only contact sheet that renders every asset in a bundle on that bundle's base body.
Pick a life stage and body type to review a whole wardrobe at a glance. Deep-linkable with
`?dev=sheet&stage=toddler`.

## Layout

```
src/catalog/    parse, lint and index the asset tree
src/render/     compose a character into one SVG; skin ramps; quality tiers
src/state/      Zustand store, persistence, family remapping, randomizer, scene reducers
src/ui/         roster, studio and stage screens
src/dev/        the contact sheet
specs/bodies/   the 12 anchor specs
docs/           design spec, implementation plan, asset contract, family list
```

## Performance note

The studio renders at full quality with SVG drop-shadow filters. The stage renders the same
assets in *flat* mode, where a CSS rule simply stops applying the shared filter — which is why
no asset is permitted to define a `<filter>` of its own. That keeps many characters on screen
at once smooth.
