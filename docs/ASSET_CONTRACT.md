# TocaCraft Asset Contract

Every `.svg` in `src/assets/` obeys this document. The lint suite
(`src/catalog/lint.test.ts` + `src/catalog/assets.test.ts`) enforces it; a violation fails
the build.

## Canvas

- `viewBox="0 0 400 600"` exactly. Never any other value — **except backdrops**, which are
  the stage itself and are authored at `viewBox="0 0 1600 1000"`. See "Backdrops" below.
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

## Backdrops — the one canvas exception

Files under `src/assets/backdrops/` are **not** worn by anybody: they are the stage. The stage
is one `<svg viewBox="0 0 1600 1000">`, and the backdrop is injected into it **1:1** — no
scaling, no `preserveAspectRatio` trickery. So a backdrop is authored at the stage's own size:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"
     data-name="Park" data-family="park" data-slot="top" data-layer="top"
     data-colors="">
```

- **`viewBox="0 0 1600 1000"` exactly, and only for backdrops.** Everything else stays
  `0 0 400 600`. `lintAsset` picks the rule from the file's path, so authoring a backdrop at
  the asset size (or an asset at the stage size) fails the build.
- **Horizon / ground line at `y ≈ 620`.** The floor, sea-edge, skirting board or road kerb sits
  there, and the ground plane occupies everything below it. Characters land with their feet on
  the stage floor, so a horizon anywhere else leaves them hovering in sky or sunk into a wall.
- Fill the full width to the bleed. There is no letterboxing and no cropping: `x = 0` and
  `x = 1600` are both on screen, on every viewport.
- **Value contrast, not colour contrast.** A backdrop has to read as a place — sky above a
  clearly separate ground, with a few large legible forms — while staying quiet enough that
  the characters in front of it stay the subject. Keep it desaturated and mid-to-light in
  value; save the saturated house palette for the figures. A backdrop that is one near-white
  rectangle with two ghost shapes on it is a bug, not restraint.
- Keep the biggest, busiest shapes away from the centre band (`x` 500–1100, `y` 300–700) where
  characters usually stand.
- `data-slot="top"` and `data-layer="top"` are inert for backdrops — the catalog routes the
  file by its directory — but they are still required attributes, so keep them.
- Every other rule in this document still applies: id prefixing (`backdrops-park__…`), no
  `<filter>`, no `<image>`, no external references, no `<text>`, `var()` always with a
  fallback.

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
- Any `viewBox` other than `0 0 400 600` — or, under `src/assets/backdrops/`, any `viewBox`
  other than `0 0 1600 1000`
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

## Hard-won clarifications

Every one of these was discovered the expensive way while authoring the `adult/female`
reference bundle. Read them before you draw anything.

### 1. Gradients inside hair part-groups, never outside

`<defs>` placed at the root of a hair file is **silently discarded** — the parser extracts
only the contents of `<g data-part="back">` and `<g data-part="front">`, and renders them as
two independent layers. A gradient defined outside them survives lint and then produces
unpainted hair in the app.

Define gradients **inside each part group**, with distinct ids per group:

```xml
<g data-part="back">
  <defs><linearGradient id="adult-female-hair-bob__back-g">…</linearGradient></defs>
  <path fill="url(#adult-female-hair-bob__back-g)"/>
</g>
<g data-part="front">
  <defs><linearGradient id="adult-female-hair-bob__front-g">…</linearGradient></defs>
  <path fill="url(#adult-female-hair-bob__front-g)"/>
</g>
```

This is the single most dangerous trap in the contract.

### 2. The drawn body is the truth, not the JSON

`specs/bodies/*.json` gives you anchors, not an outline. The body you actually draw will
differ by a few pixels. **Author the base body first, then hand its real drawn coordinates to
whoever authors garments for that bundle.** A garment authored strictly from the JSON leaves a
visible sliver of skin at the waist or shoulder.

Garments should overlap the body they cover by 2–4px on every edge. Never leave a gap.

### 3. Fill the hips

The torso and the legs are separate forms with a gap between them. Your base body must draw a
hips block bridging that gap, or the character has a hole through the middle. Check your body
on the contact sheet with no clothing equipped.

### 4. One-variable assets cannot ramp light-to-dark

Eyes (`eye1`), brows (`hair2`), mouth (`lip1`) and many costume details declare a single
colour variable, so a two-stop gradient through that one variable is impossible. Two sanctioned
solutions — pick either:

- a gradient whose stops share the variable but differ in `stop-opacity`, or
- a flat `var()` fill with a separate non-tunable ink or white overlay at low opacity.

The "no flat single-fill shapes" rule does not apply to single-variable assets.

### 5. Strokes are allowed for detail, banned for silhouettes

"No outlines" means no keyline tracing the outer shape of a form. Strokes are fine and
expected for highlight arcs, drawstrings, stitching, glasses frames and similar linework.

### 6. Costumes must not cover the face

The costume layer (z 80) draws **above** the face (60) and hair-front (70). A mask or helmet
will erase the character's features. Costume art must stay **below the bundle's shoulder line
minus 8px** — no head coverage of any kind. Capes, hoods worn down, and collars are fine.

### 7. Put the primary colour first in `data-colors`

The studio's swatch row currently drives `data-colors[0]` only. List the dominant, most
recolour-worthy variable first; secondary variables keep their fallback values in the UI.

### 8. Layer order has art consequences

- `bottom` draws **under** `top` — tuck shirt art accordingly.
- `shoes` draw **over** trouser hems — do not draw a foot into a bottom asset.
- Long `hair-front` covers shoulder and chest garment art — do not rely on detail there.
- A contact-shadow ellipse drawn under a form is a plain shape, not `class="sp-shadow"`.
  The class opts into the app's shared drop-shadow filter; a drawn contact shadow is separate
  and both may be used together.

## Before you commit

```bash
npx vitest run src/catalog          # lint + parser + spec validation
npm run dev                         # then open /?dev=sheet and select your bundle
```

Every asset you authored must appear on the contact sheet, correctly positioned on the body,
with no clipping at the canvas edge.
