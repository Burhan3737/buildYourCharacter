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
