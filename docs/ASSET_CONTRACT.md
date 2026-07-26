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
`adult-female` agent authoring their own hoodie must use the same family string.

**The canonical family list lives in `docs/FAMILIES.md`.** It gives every family's kebab-case
name (which is the filename), its slot, a one-line binding silhouette description, and exactly
which of the twelve bundles author it. Never invent a family, never rename one, and never
author a family for a bundle that is not listed against it — `data-family` resolution across
stages depends on all twelve bundles agreeing.

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
| `headwear` | `headwear` — may declare `data-hides="hair"` when the covering fully replaces the hair (hijab, turban, headwrap, bonnet, durag); otherwise `data-hides=""` |
| `earrings` | `earrings` |
| `necklace` | `necklace` |

## Slots that do not exist yet

Three categories that the catalogue research proposes have **no slot to live in**, and an SVG
author cannot create one. They are recorded here so nobody draws them into the wrong slot — a
beard on the `costume` layer would sit above the face, and a wheelchair on `shoes` would draw
in front of the legs and behind nothing.

**None of these appear in `docs/FAMILIES.md`'s rosters. Do not author them.**

| Wanted | Not yet supported — the engineering change it needs |
|---|---|
| **facial hair** (`stubble`, `moustache`, `goatee`, `full-beard`, `long-beard`, `sideburns`) | A new `facial-hair` slot at z 65 — above `face` (60), below `hair-front` (70) so a long fringe still overlaps correctly. Add to `SLOTS` and `ACCESSORY_SLOTS` in `src/catalog/types.ts`, to `LAYERS`/`LAYER_Z` in `src/catalog/layers.ts`, and to the studio's category list. Authored per head-size class, realistically `teen` and `adult` only: 6 families × 2 classes = 12 files. |
| **face markings** (`freckles`, `vitiligo`, `birthmark`, `blush-cheeks`, `beauty-spot`, `laugh-lines`, `scar`, `acne`) | A new `face-mark` slot at z 62 — above `face`, below `hair-front`. Same three files to touch. Markings scale with the head, so like `glasses` they are authored per head-size class: 8 families × 3 classes = 24 files. Note that `--skin1/2/3` are available to any asset, so these can paint through the character's own skin ramp for free. |
| **mobility aids** (`cane`, `forearm-crutches`, `wheelchair`, `power-chair`, `walker`) | A new `mobility` slot. `cane` and `forearm-crutches` are single-layer — they sit beside the body — and need only a slot at z 55, above `shoes`, authored per bundle: 2 × 12 = 24 files. `wheelchair`, `power-chair` and `walker` are **not** single-layer: the frame and back wheel draw behind the body and the front wheel, footplate and armrest draw in front of it, so the slot must contribute to two layers (z 15 and z 55) using the same two-group file pattern `hair` already uses. That is a renderer change, not just a slot. |
| **hearing technology worn *with* earrings** | An `ear-tech` slot at z 91, so `hearing-aid` and `ear-cuff` stop competing for one anchor. Until then `hearing-aid-studs` is the workaround family. |

A mobility aid that is scenery rather than something you wear is the documented failure mode
across this whole product category. If a stopgap prop is ever added under `src/assets/props/`,
it is a stopgap and must be labelled as one — it is not the answer.

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

## Silhouette first

This section exists because the catalogue failed at exactly one thing and it is measurable:
eight `adult/female` tops resolved to **three** silhouettes, because six of them drew the
identical torso path and were separated only by colour and a small applied detail. One of the
eight, `stripes`, was not a garment at all — it was a texture that had been promoted to a family
name because the system offered no other way to say "this shirt looks different".

Everything below is how that is prevented. It is enforced two ways: by
`src/catalog/silhouette.test.ts`, which fails the build on duplicated geometry, and by you,
reading the axes before you draw.

### The rule that governs everything else

> **Silhouette defines the family. Surface treatment differentiates instances within a family.
> Never the reverse.**

If you cannot describe a proposed garment in one sentence **without naming a colour or a
pattern**, it is not a garment — it is a surface treatment, and it does not get a family name.

### The four silhouette axes

Every top-level garment silhouette is decided by four axes:

| Axis | Values |
|---|---|
| **Shoulder / sleeve** | none · strap · cap · short set-in · raglan · long · dropped/oversized · puff · draped |
| **Closure** | closed · full placket · half placket · zip · open front · crossover/wrap |
| **Hem** | cropped above waist · waist · hip · past hip · thigh · knee · calf · ankle |
| **Volume** | fitted · straight · boxy · flared/A-line · gathered |

> **Two families in the same slot must differ on at least two of the four.**

Worked through: `tee` (short set-in / closed / hip / straight) and `stripes` (short set-in /
closed / hip / straight) differ on **zero** — that is the bug, in one line. `tee` and `crop-top`
(short set-in / closed / cropped / fitted) differ on two: hem and volume. `poncho` (draped /
closed / thigh / flared) differs from everything in the slot.

For `bottom` the axes are **rise** (low / natural / high / bib), **leg length** (none-skirt /
short / knee / cropped / full), **leg width** (skin-close / straight / wide / flared /
gathered-cuff) and **hem treatment** (raw / cuffed / elasticated / ruffled). Same rule: two of
four. `shoes` use **shaft height · toe shape · fastening · sole depth**.

Write your two axes down in an XML comment at the top of the file. If you cannot name two, you
are about to draw a duplicate.

### Never promote a surface treatment to a family name

**Banned outright.** No new family may be named after — or defined by — a pattern, a colour, a
print, a motif or a material finish. `stripes`, `polka`, `check`, `floral`, `denim`, `neon`,
`pastel`, `camo`, `glitter`, `tie-dye` and anything of that shape are not garments. A stripe is
something a `polo` *has*; it is not something a `polo` *is*.

`stripes` itself is grandfathered and cannot be removed: the family key is authored in all
twelve bundles and is load-bearing for stage switching. `docs/FAMILIES.md` §2.4 gives it a real
silhouette — the boat-neck long-sleeve top — and it is to be drawn as that, with the breton
banding as its surface. It is the only exception and there will not be another.

### The five surface tools, ranked

These separate garments *inside* a silhouette. All five are legal: `src/catalog/lint.ts` bans
only `<filter>`, `filter=`, `<image>` and external references, so `<pattern>`, `<clipPath>`,
`<mask>` and gradients are all available to you.

**1. Panel blocking — strongest.** Divide the garment body into 2–3 large flat regions that
follow the form: a contrast yoke across the chest, a raglan sleeve panel seamed from neck to
underarm, a colour-blocked lower half, a contrast placket band. Paint each region through a
different variable so the player controls it. This is the strongest tool because it changes what
the eye reads as the garment's *shape* without changing the outline — a raglan yoke makes a
raglan and a tee read as different garments at thumbnail size.

**2. Trim and edge treatment.** Ribbed cuffs, collar, hem band, piping along a seam, a
contrast-bound neckline, a drawstring with two aglets, a zip pull, a waistband of a different
width. Draw them as separate shapes, not as strokes on the body path — they need their own
gradient. A 6–10px trim band in a contrasting value is the cheapest per-pixel differentiation
available.

**3. Pattern fills.** See "Using `<pattern>`" below.

**4. Applied graphic.** One large centred motif on the chest — a heart, star, moon, cloud,
lightning bolt, smiley, fruit, paw, rainbow arc, wave. **Maximum one per garment**, roughly
60–90px wide, centred at about `x = 200`. Highest personality per pixel and the easiest to
overuse. **Never draw lettering:** `<text>` is banned, and drawn lettering reads as a logo,
which is a trademark problem, not a style choice.

**5. Structural detail.** Pockets (patch / welt / kangaroo / cargo flap), a button line, a
visible seam, pleats, gathers, quilting channels, a belt loop, a tie belt, a knot. These carry
the least colour but the most "this is a real garment" signal, and they cost the least to draw.

### House rules that follow

- **Every garment must use at least two of the five tools.** A single-fill body with a gradient
  on it is not a finished garment.
- **Declare three colour variables on any garment carrying a pattern or a graphic** — `--c1`
  body, `--c2` shadow/secondary, `--c3` accent — and put the most recolour-worthy one first in
  `data-colors`.
- **Value, not hue, does the separating.** A trim or panel must sit at least 20% away in value
  from the body it borders or it disappears at thumbnail size. Two mid-tone pastels of different
  hue read as one blob.
- **Thumbnail test.** Every asset is seen first at roughly 64×64 in the option tray. If two
  assets in the same slot are indistinguishable at that size, one of them is wasted. Check the
  contact sheet (`/?dev=sheet`) before committing.
- **Detail belongs in the middle third of the torso** — roughly y 200–300 on an adult bundle.
  Long `hair-front` covers the shoulders and collarbone, and `bottom` is drawn under `top`, so
  the hem region is contested.
- **Pattern and trim shapes go *inside* the form's `sp-shadow` group**, not in their own. Nested
  shadow groups compound and turn muddy.
- **A pattern still needs a gradient underneath.** A flat `<pattern>` over a flat fill loses the
  papercut look. Draw: gradient body → pattern layer clipped to the body → highlight arc on top
  at 22–33% opacity.

### Using `<pattern>`

`<pattern>` is permitted and encouraged. Two things about it are non-negotiable.

**1. Pattern ids obey the id-prefix rule exactly like gradients.** Assets are inlined into one
document, and the same asset can appear on the stage many times over. An unprefixed or
duplicated pattern id will silently repaint another character's clothes — the same failure mode
as gradients, and just as confusing to debug.

```xml
<defs>
  <pattern id="adult-female-top-polo__dots" patternUnits="userSpaceOnUse"
           x="0" y="0" width="18" height="18">
    <circle cx="9" cy="9" r="3.5" fill="var(--c3, #7E90DC)"/>
  </pattern>
</defs>
```

The prefix is the asset id — its path under `src/assets/` with `catalog/` dropped and slashes
turned into dashes — followed by `__`, identically to the `IDs` section above. On a **hair**
asset the same trap as gradients applies: the `<defs>` holding a `<pattern>` must live *inside*
`<g data-part="back">` / `<g data-part="front">`, with distinct ids per group, or it is silently
discarded.

**2. Keep the motif 12–24px** at the 400×600 canvas. Below about 10px it turns to mush at
tray-thumbnail size and moirés on the stage. Above about 30px you have drawn an applied graphic,
not a pattern, and the "maximum one applied graphic" rule applies instead.

Pattern vocabulary that reads at this scale: *even stripe · uneven/breton stripe · gingham check
· small scattered dot · dense polka · chevron · argyle diamond · simple four-petal floral · star
scatter · heart scatter · leopard-ish blob · plaid (two crossed bands)*.

Paint the motif through `--c2` or `--c3` so it recolours with the garment. Never hardcode it.

### Worked example — five garments, one silhouette, all clearly different

To show that the rules produce separation rather than just more shirts. All five are
*short set-in sleeve / closed / hip / straight* — the exact shape our original eight tops all
shared — and they still read as five garments in the tray:

| Garment | Tools used | Reads as |
|---|---|---|
| `tee` | gradient body + highlight arc | the plain baseline |
| `polo` | trim (flat knit collar, two-button placket) + structural (curved hem) | smarter, collared |
| `jersey` | panel blocking (contrast raglan-look yoke) + trim (contrast sleeve cuffs, V-neck bind) | sporty |
| `stripes` | pattern (even 16px band through `--c2`) + trim (contrast neck bind) | nautical |
| `henley` | trim (contrast placket band) + structural (three buttons, no collar) | casual |

Note what this example is and is not. It shows how to make instances *inside* one silhouette
read differently — which is a skill you need, because a catalogue in which every garment has its
own outline would be exhausting. It is **not** permission to ship five families on one torso
path: those five sit in different tiers and different bundles, and where two of them do land in
the same `(bundle, slot)` they must still satisfy the two-of-four axis rule with a genuinely
redrawn body. Surface separates instances. It does not create a silhouette.

### Hair: the texture *is* the outline

Everything above concerns garments. Hair does not work the same way, and getting it wrong is
the single most-criticised thing in this product category.

**Build the texture into the silhouette path, not on top of it.** A straight bob's hem is a
smooth arc. A coily bob's hem is a **bumpy, irregular outline** — small overlapping lobes, no
two the same size. If you draw a coily style with a smooth outer contour and then add curl
squiggles inside it, you have drawn straight hair with decoration on it.

**Draw the roots and the partings.** The named industry failure modes are matted cornrows, bald
patches instead of parts, giant featureless afros and messy unstyled locs. Concretely, on our
canvas:

- **`cornrows`** — the raised braid rows are the positive shape; the **scalp partings between
  them are visible negative space** painted in `--skin1`/`--skin2`, roughly 3–5px wide, running
  cleanly front-to-back and converging slightly at the nape. Evenly spaced and deliberately
  placed, never a hatch pattern.
- **`box-braids`** — a **visible square parting grid** at the crown, each braid emerging from its
  own box with a small knot at the root. Braids taper slightly and end bluntly.
- **`bantu-knots`** — sectioned cones with triangular or square partings between sections, each
  cone drawn as a coiled spiral, not a smooth ball.
- **`locs`** — even-thickness ropes with **separated roots**; each loc reads as an individual
  strand with its own slightly different length. Not a single mass with grooves cut into it.
- **`afro` / `afro-puffs` / `twist-out`** — irregular lobed outer contour and a visible hairline
  at the temples. An afro is not a circle.
- **`high-top-fade` / `taper-fade` / `waves-360`** — the fade is a **value gradient in the hair
  itself**, from `--hair2` at the skin line up to `--hair1`, with a hard clean front hairline. A
  fade with a soft top edge and a fuzzy hairline reads as a mistake.

**Both `hair1` and `hair2` must do real work.** `--hair1` is the lit mass; `--hair2` is the
shadow *and* the texture-defining colour — partings, the underside of a curl lobe, the dark end
of a fade. A hair asset where `--hair2` is only a bottom gradient stop is under-drawn.

**Name a style from its own cultural origin, never from a lookalike.** `pigtails` and
`afro-puffs` are separate families. `cornrows`, `bantu-knots`, `locs` and `box-braids` keep
their own names and never become "braid style 3".

### What the test enforces

`src/catalog/silhouette.test.ts` groups every asset by `(bundle, slot)` and compares the major
forms — the filled shapes inside `class="sp-shadow"` groups. Trim, pattern, pockets and
highlights sit outside those groups and therefore **cannot rescue a duplicated silhouette**. It
fails on:

- **identical** — the same major forms, byte for byte;
- **nudged** — the same forms with every coordinate within a few pixels, i.e. one drawing
  offset or inflated (this is how `sweater` came to be `tee` plus 4px);
- **shared-primary** — the largest major form is byte-identical and the overall outline is
  unchanged, so the only differences are surface.

The failure message names both files and the four axes for that slot. There is a
`KNOWN_DUPLICATES` allow-list at the top of that file holding the **pre-existing** offenders
from before the expansion; those are a redraw backlog and each entry must be deleted as its art
is redrawn. **Never add to it.** A new pair means new art repeated old art, and the fix is to
redraw, not to widen the list.

The test is the floor, not the ceiling. Passing it means you did not copy a path. It does not
mean you satisfied the two-of-four axis rule — that is on you and on the contact sheet.

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

The studio now renders **one swatch row per declared variable**, in `data-colors` order, and the
first row is the one the player reaches for. List the dominant, most recolour-worthy variable
first — `--c1` body before `--c2` shadow before `--c3` accent.

Because every declared variable is exposed, declaring three on a patterned or graphic garment
genuinely multiplies its variety: a `polo` declaring `c1,c2,c3` gives the player the body, the
trim and the dot colour as three independent choices. Declare what you actually use, use what
you declare, and order it by prominence.

### 8. Layer order has art consequences

- `bottom` draws **under** `top` — tuck shirt art accordingly.
- `shoes` draw **over** trouser hems — do not draw a foot into a bottom asset.
- Long `hair-front` covers shoulder and chest garment art — do not rely on detail there.
- A contact-shadow ellipse drawn under a form is a plain shape, not `class="sp-shadow"`.
  The class opts into the app's shared drop-shadow filter; a drawn contact shadow is separate
  and both may be used together.

## Before you commit

```bash
npx vitest run src/catalog          # lint + parser + spec validation + silhouette variety
npm run dev                         # then open /?dev=sheet and select your bundle
```

Every asset you authored must appear on the contact sheet, correctly positioned on the body,
with no clipping at the canvas edge.

Then look at the sheet as a *tray*, not as a checklist: scan the row for the slot you just
filled and ask whether any two thumbnails read as the same garment. If they do, the silhouette
test may still have passed — it only catches copied geometry — and the fix is the same either
way. Redraw one of them against two of the four axes.
