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

## There are no aisles — a hard requirement

> **Every family is authored in every bundle its tier covers, on BOTH body types. Body type may
> change drape and fit. It may never change availability.**

This is a build requirement, not a preference. A family listed at Core, Growing or Older tier in
`docs/FAMILIES.md` and missing from one body type's directory is a **defect**, in the same
category as a wrong `viewBox`. There is no fitting tier in this project. `fit-F` and `fit-M` have
been deleted and must never be reintroduced under any name.

**Why it is a correctness issue and not a values statement.** `data-family` is how a character
survives a stage or body change: `remapSlots` looks for the same family key in the target bundle's
pool, and clears the slot when it is not there. A family authored on one body and not the other
means a character silently loses that garment the moment the player switches body type — and
regains it on switching back, which reads as a bug and is one. The de-gendering in this revision
was forced by exactly that.

**Why the fitting argument does not hold.** It was tested. The head specs for `adult-female` and
`adult-male` are byte-identical (`cx 200, cy 91, rx 57, ry 59`, ears at `(149, 95)` and
`(251, 95)`, eyeLine `100`), and so are the teen, midage and elder pairs. A man bun and a half-up
knot are the same construction problem on the same ellipse. Torsos do differ, which is why drape
differs — a `camisole` on the male spec keeps its narrow straps and skimming hem and is cut for
that chest; a `ribbed-vest` on the female spec keeps its deep dropped armhole — but a differing
torso is a reason to redraw a garment, never a reason to omit it.

**What this means at your desk.** If you are drawing `adult/male`, you draw every skirt, every
gown, the `camisole`, the `sari` and the `jeogori`. If you are drawing `elder/female`, you draw
all twelve beards. If a family in your roster feels like it "belongs" to the other body type, that
feeling is the thing this rule exists to override. Draw the file.

The tray is one undifferentiated list per slot. No sub-tabs, no "cultural" section, no gendered
ordering, no ordering that puts anything last.

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
| `beard` | `beard` — z 65, above `face` and below `hair-front` (see "Facial hair" below) |
| `top` | `top` |
| `bottom` | `bottom` |
| `onepiece` | `onepiece`, with `data-hides="top,bottom"` |
| `shoes` | `shoes` |
| `costume` | `costume`, with `data-hides="top,bottom,shoes"` |
| `glasses` | `glasses` |
| `headwear` | `headwear` — may declare `data-hides="hair"` when the covering fully replaces the hair (hijab, turban, headwrap, bonnet, durag); otherwise `data-hides=""` |
| `earrings` | `earrings` |
| `necklace` | `necklace` |

## Facial hair

The `beard` slot exists and holds one asset at a time. It covers every facial-hair shape —
stubble, moustaches, goatees, partial and full beards — because each is reachable as a single
family. **The authoritative roster is `docs/FAMILIES.md` §2.4** (twelve families, Older tier,
teen → elder, both body types); `docs/RESEARCH-HAIR.md` §D and §E carry the reasoning behind the
slot and the deferred list.

**The four axes for this slot** — two families in the same `(bundle, beard)` must differ on at
least two of them, exactly as for garments:

| Axis | Values |
|---|---|
| **Upper lip** | bare · shadow · trimmed bar · overhanging the lip · flared or extended ends |
| **Chin & jaw coverage** | bare · tuft under the lip only · chin only · chin + jaw band · under-jaw curtain · full jaw and cheeks |
| **Cheek line** | none · jaw-only · low and clipped · natural mid-cheek · joined to the sideburn and hairline |
| **Length** | shadow · stubble · clipped short · to the throat · past the jaw · to mid-chest |

Cheek line is the money axis — six of the twelve families differ from a sibling on it. Express it
as a fraction of the distance from the jaw corner up to the ear anchor: *low* ≈ 25% (a clipped
line), *natural* ≈ 55% (untrimmed), *joined* = 100% (meeting the sideburn, as in `line-up`). **Set
it deliberately and keep it consistent across every bundle you author**, or `full-beard` reads as
a different family at teen than at elder.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="Full Beard" data-family="full-beard"
     data-slot="beard" data-layer="beard"
     data-colors="hair1,hair2" data-hides="">
```

- **It is authored per bundle, not head-mounted.** A beard file lives at
  `src/assets/catalog/<stage>/<bodyType>/beard/<family>.svg`, exactly like a garment. It is
  **not** in `ACCESSORY_SLOTS` and gets no `headTransform`: a long beard reaches mid-chest, and
  scaling it by the head ratio would land it wrong on any bundle whose head-to-torso proportion
  differs from the reference.
- **Anchor it to the jaw, chin and upper lip of your own bundle's drawn body**, not to a table.
  The chin sits at `head.cy + head.ry`, the jaw corners at
  `(head.cx ± 0.74·head.rx, head.cy + 0.53·head.ry)` with the chin as the control point, and the
  sideburn roots at `ears[0]` / `ears[1]` — but clarification 2 below is binding: the drawn body
  is the truth, so measure the jaw curve off `bodies/<stage>/<bodyType>/base.svg` and the mouth
  box off that bundle's own `mouth/` art before drawing. Overlap every edge by 2–4px; never
  leave a sliver of skin along the jaw. No beard falls below mid-torso (`torso.y + 0.5·torso.h`).
- **Declare `hair1,hair2`, in that order.** `--hair1` is the lit mass, `--hair2` the shadow and
  the texture-defining colour — the philtrum gap, the chin whorl. Declaring `hair*` is also what
  gives the tray the hair colour ramp for free. The beard's colours are stored separately from
  the head hair's and are never auto-matched, so a white beard on dark hair is allowed.
- **One group, not two.** `data-part="back"` / `data-part="front"` is a `hair`-only requirement,
  and so a root-level `<defs>` is safe here — the discard-the-defs trap applies only to
  `data-layer="hair"`.
- **`data-hides=""`, always.** A beard hides nothing, and nothing hides a beard: headwear that
  declares `data-hides="hair"` covers the hair and leaves the chin alone.
- **Newborn and toddler bundles must never author facial hair.** Do not create
  `src/assets/catalog/newborn/*/beard/` or `src/assets/catalog/toddler/*/beard/` at all — not
  stubble, not a joke asset, not a costume beard. The teen floor is the rule; the empty pool is
  what enforces it, and it is what stops the randomiser and the stage-change remap from ever
  producing a bearded infant.

## Slots that do not exist yet

Four categories that the catalogue research proposes have **no slot to live in**, and an SVG
author cannot create one. They are recorded here so nobody draws them into the wrong slot — a
face marking on the `costume` layer would sit above the face, and a wheelchair on `shoes` would
draw in front of the legs and behind nothing.

**None of these appear in `docs/FAMILIES.md`'s rosters. Do not author them.**

| Wanted | Not yet supported — the engineering change it needs |
|---|---|
| **layered outerwear** (`apron`; and re-homing `long-coat` and `duster-cardigan`) | The deferred **`overlayer`** slot — see the section immediately below for the exact change and the interim answer. |
| **face markings** (`freckles`, `vitiligo`, `birthmark`, `blush-cheeks`, `beauty-spot`, `laugh-lines`, `scar`, `acne`) | A new `face-mark` slot at z 62 — above `face`, below `hair-front`. Same three files to touch. Markings scale with the head, so like `glasses` they are authored per head-size class: 8 families × 3 classes = 24 files. Note that `--skin1/2/3` are available to any asset, so these can paint through the character's own skin ramp for free. **Two further pieces of evidence for this slot:** a clown's whiteface and a mime's painted face are the entire readable half of both archetypes and cannot be drawn today, and `clown-nose` has had to borrow the `glasses` slot (`docs/FAMILIES.md` §4.1) at the cost of the player's glasses. |
| **mobility aids** (`cane`, `forearm-crutches`, `wheelchair`, `power-chair`, `walker`) | A new `mobility` slot. `cane` and `forearm-crutches` are single-layer — they sit beside the body — and need only a slot at z 55, above `shoes`, authored per bundle: 2 × 12 = 24 files. `wheelchair`, `power-chair` and `walker` are **not** single-layer: the frame and back wheel draw behind the body and the front wheel, footplate and armrest draw in front of it, so the slot must contribute to two layers (z 15 and z 55) using the same two-group file pattern `hair` already uses. That is a renderer change, not just a slot. |
| **hearing technology worn *with* earrings** | An `ear-tech` slot at z 91, so `hearing-aid` and `ear-cuff` stop competing for one anchor. Until then `hearing-aid-studs` is the workaround family. |

A mobility aid that is scenery rather than something you wear is the documented failure mode
across this whole product category. If a stopgap prop is ever added under `src/assets/props/`,
it is a stopgap and must be labelled as one — it is not the answer.

### The deferred `overlayer` slot — a known limitation

**Stated plainly: you cannot wear a coat over a dress in this app, and you cannot wear an apron
over anything at all.** This is the single most-requested layering combination in the genre and
the one thing our slot architecture cannot express. It was considered for this revision and
**deliberately deferred**; the change is recorded here so it is not re-derived, and the dependent
families are absent from `docs/FAMILIES.md` on purpose.

**Why.** `top` is z 40 and is suppressed by `onepiece` (z 45, `data-hides="top,bottom"`). There is
no layer above `onepiece` that a garment can occupy. So `long-coat` and `duster-cardigan` — which
ship in `top`, correctly, given the engine as it stands — vanish the moment a dress is equipped.

**The exact change, if it is ever done.**

1. `src/catalog/types.ts` — add `'overlayer'` to the `SLOTS` tuple. It is a per-bundle body slot,
   so it must **not** go in `ACCESSORY_SLOTS`.
2. `src/catalog/layers.ts` — add `'overlayer'` to `LAYERS` **in position between `onepiece` and
   `shoes`, not appended**, and give it `LAYER_Z['overlayer'] = 47`. `layers.test.ts` asserts
   `LAYER_Z` is strictly ascending in declaration order, so appending fails immediately. z 47
   places it above `onepiece` (45) and below `shoes` (50), so a coat draws over a dress and the
   shoe still draws over the coat hem, which is correct.
3. Confirm that `onepiece` never lists `overlayer` in its `data-hides`, and **add `overlayer` to
   `costume`'s `data-hides`** — a costume should suppress it.
4. Add the slot to the studio's category list (`src/ui/studio/categories.ts`) and to
   `SLOT_LABELS` in `OptionTray.tsx`, which is typed `Record<Slot, string>` and will otherwise
   fail to compile.
5. Check `silhouette.test.ts`'s `(bundle, slot)` grouping picks the new slot up — it is generic
   over `SLOTS`, so it should be free.

**Families it would unlock, at 10 files each:** `apron` (bib apron on two neck-and-waist ties,
open at the back and the sides, hem at the knee), plus re-homing `long-coat` and `duster-cardigan`
from `top`.

**The interim answer is `tabard`.** A tabard is a garment in its own right — two flat panels
joined only at the shoulders, completely open down both sides — not a layer pretending to be one,
and it delivers the hi-vis vest, the sports bib, the shop smock and the medieval surcoat reads. It
ships in `top` at Growing tier. **Do not work around the missing slot by drawing a dress into a
coat file, or an implied shirt into an apron file** — either one locks that garment's colour and
shape forever.

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
four. `shoes` use **shaft height · toe shape · fastening · sole depth**. `beard` uses **upper lip ·
chin & jaw coverage · cheek line · length** — the values are tabulated under "Facial hair" above.
`hair` uses **crown · length · volume · parting/hem**, where crown is how the mass is organised at
the scalp (no parting · centre part · side/hard part · fringe · shaved or faded sides · sectioned
grid · scalp rows · three-section · bare) and parting/hem is how it ends (blunt continuous ·
tapered to a point · lobed/irregular · separated strand-ends · knotted · tied · beaded · none).

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

### The 40-unit practical floor

There is a second floor the test cannot check for you, and it is arithmetic.

The picker shows every asset at roughly **64×64**. The canvas is 600 units tall, so the scale is
about **0.107 screen pixels per canvas unit**.

| Canvas size | Screen size in the tray | Verdict |
|---|---|---|
| 12–24u (a legal `<pattern>` motif) | 1.3–2.6 px | **texture only** — never an identity |
| 40u | ~4.3 px | the practical floor for "I can see that" |
| 60u | ~6.4 px | a confident, countable feature |
| 120u (adult torso width) | ~13 px | the reference measure |

> **Any feature that is meant to *identify* a family must be at least 40 canvas units. Below that
> it is decoration, and it cannot be the thing that tells two families apart.**

A 22-unit harlequin diamond is 2.4 screen pixels — undifferentiated texture in the picker. That is
why `harlequin`'s identity in the tray is its outline (the skin-close continuous one-piece, the
horizontal waist seam, the small ruff) and the diamonds are a bonus visible only on the stage. The
same arithmetic decides a dozen other things: a jester's hem tab must be ≥30u deep, a clown's ruff
must project ≥45u beyond the neck on each side, a ball gown's dome must clear the widest point of
the body by ≥40u per side, a bustle must project ≥50u behind the hip line, a hoop skirt's dome
≥40u per side, and a plate joint band needs ≥3 device pixels, which is why `exo-frame` is Older
tier rather than Growing.

**Identity lives in the outline.** Surface — pattern, trim, an applied graphic — separates
*instances inside* a silhouette, which is a real and necessary skill. It never creates a
silhouette, and it never rescues one at 64px. This is the practical reason several genuinely
iconic shapes are in `docs/FAMILIES.md` §6 rather than in the roster: `soul-patch` is roughly two
screen pixels, `pencil-moustache` is indistinguishable from `moustache`, and `sideburns` is the
same story — `mutton-chops` is the legible member of that group and it is the one that ships.

**Verify, do not trust the table.** These figures are computed from the canvas dimensions and
`specs/bodies/adult-female.json`, not measured off the running app. Check
`/?dev=sheet` before treating any threshold as exact.

### The costume face ceiling

`costume` is z 80 and draws **above** `face` (60) and `hair-front` (70). A mask, cowl, helmet,
beak, muzzle or hood-worn-up **erases the character's features**, and there is no workaround
inside the slot.

**Costume art must stay below the bundle's shoulder line minus 8px.** Read
`specs/bodies/<stage>-<bodyType>.json` and take `shoulders[0].y`. The numbers, precomputed:

| Bundle | shoulder `y` | costume art must stay at `y ≥` | jaw (head bottom) at `y` |
|---|---|---|---|
| newborn/female · newborn/male | 424 | **416** | 418 |
| toddler/female · toddler/male | 352 | **344** | 346 |
| teen/female · teen/male | 200 | **192** | 194 |
| adult/female · adult/male | 156 | **148** | 150 |
| midage/female · midage/male | 168 | **160** | 162 |
| elder/female · elder/male | 190 | **182** | 184 |

Note what the table says: **the ceiling sits about 2px above the jaw on every bundle.** A standing
collar may rise to the jawline and stop. It may not reach the mouth. The calibration references
are `adult/female/costume/caped-hero.svg`, whose torso starts at `y = 148` exactly, and
`wizard.svg`, whose topmost geometry is at `y = 150`.

**Copy your bundle's ceiling into an XML comment at the top of every costume file you draw.**

**The three sanctioned resolutions.**

1. **Push the identity down into the body.** A hoplite is not the Corinthian helmet, it is the
   moulded cuirass and the strip skirt. A berserker is not the bear's head, it is the shaggy lobed
   hem of the pelt jerkin. A clown is not the whiteface, it is the ballooning romper and the ruff.
   This is the primary answer for almost every family.
2. **Hood worn down, collar worn low.** A hood pooled in a fabric roll behind the neck reads as
   "hooded" from the silhouette alone — the same trick `hoodie` already uses in `top`. This is the
   sanctioned hood pattern for the whole catalogue. `disguise-coat`'s turned-up collar frames the
   jaw **from below** and stops at the ceiling; `oversized-suit`'s shoulder pads exaggerate
   **outward**, not up; `pierrot`'s collaret is a flat disc spreading outward from the ceiling.
3. **Author the head half as a companion `headwear` family.** It draws at z 100 on the head
   anchor, where it belongs. **`headwear` also draws above the face**, so a companion helmet must
   be open-faced: no nasal bar, no cheek plate over the cheekbone, no visor, no beak, no muzzle.

**`top` (40), `bottom` (30) and `onepiece` (45) all draw *under* the face (60) and have no face
constraint at all.** That is a further reason formalwear belongs in those slots rather than in
`costume`, and it is why the seven gowns are one-pieces.

### Trademark guardrails

Read this before you draw anything in `costume`, and before you pick a fallback colour anywhere.

**The rule that most people get backwards.** `--c1`, `--c2` and `--c3` are player-tunable, which
sounds like it removes trademark risk. **It does the opposite.** The fallback values are what a
player sees in the picker, on the contact sheet, in every screenshot and in every marketing image
before anybody touches a swatch. The fallback *is* the costume's identity for the first several
seconds of its life. **A signature palette is what creates risk, and the fallback is what people
see first.**

Two consequences follow directly:

- **A family may not be identifiable by its colours.** If you can only tell two costumes apart at
  their defaults, you have drawn one costume twice.
- **Fallbacks come from the house palette** — `#7E90DC` periwinkle, `#F4A79B` coral, `#6BBFAD`
  mint, `#F7C873` butter, `#3B2A22` ink — and are chosen to *avoid* the combinations below, not to
  approach them. **Check your triple against this table before you pick colours, not after.**

This project has paid for getting it wrong once: `spider` and `thunder-god` had to be stripped and
re-keyed to `web-runner` and `storm-herald` because a generic display name did not cure a
red-and-navy web suit or a red-and-blue armoured tunic. **A generic display name does not cure a
signature colour-plus-marking combination.**

#### Banned fallback pairings in the `costume` slot

| Banned default pairing | Why |
|---|---|
| red + navy, red + royal blue | claimed by several publishers' flagship characters |
| red + gold / red + brass, especially with a circular chest disc | armoured-tech character |
| red + blue + gold, with white stars | warrior-princess character |
| blue + white + red with a circular chest field | shield-bearing patriot character |
| green + black, ring-lit | ring-powered character |
| black + yellow, or black + grey with a scalloped hem | cowled vigilante character |
| green + purple with a torn hem | strongman-monster character |
| all-green with a hood | archer character |
| purple + black with a chevron | archer character |
| orange scale over green legs | aquatic character |
| silver/chrome monochrome, seamless | cosmic character |
| red cape + grey ring-mail + a row of circular chest discs | thunder-god character |
| green + gold, horned | trickster character |
| white + pale blue armour with a winged helm | winged-warrior character |
| green hair + purple tailcoat + orange or green waistcoat + white face + red grin, in any combination | clown-villain character. `jester`, `harlequin` and `tailcoat` all sit near this and must all stay clear of it. |
| pale blue, or yellow, or pink-with-a-gold-bodice, on `ball-gown` / `hoop-skirt` / `bridal-gown` | named animated princess palettes |
| `frost-giant` defaulted to blue | blue is what makes a frost giant read as a specific studio's version. Its fallback is **mint, deliberately.** If it only works in blue, it is not a silhouette. |

A player who recolours a costume into any of those has done that themselves. Shipping it that way
is us doing it.

#### Shapes and markings banned outright, at any colour

- **No emblem, crest, monogram, chest insignia or applied chest graphic on any heroic costume.**
  Applied graphics are effectively banned in this slot: a centred chest motif on a heroic costume
  *is* an emblem.
- **No drawn lettering anywhere.** `<text>` is banned by lint, and drawn lettering reads as a logo,
  which is a trademark problem rather than a style choice.
- **No lightning bolt on a chest** — `speedster` carries calf vanes and one raked diagonal seam
  instead. **No glowing circular chest reactor** — `exo-frame`'s chest plate is a plain bevelled
  panel. **No scalloped or bat-winged cape hem, no pointed ear shapes** — `shadow-agent` keeps the
  asymmetry and drops all of it. **No mechanical or feathered metal wings** — `sky-glider`'s
  membrane is plain cloth with drawn rib seams.
- **No horned or winged helmet**, in `costume` or in `headwear`. Both are 19th-century Romantic
  invention rather than Norse archaeology, and the winged version is a trademark tell besides.
- **The toothbrush moustache — narrow, tall, no wider than the nose — may never be drawn.** At our
  flat-vector scale the silhouette is unavoidably a specific historical reference and there is no
  styling that de-risks it. Note the generative risk: if `moustache` is drawn too narrow it becomes
  this by accident. **Keep the bar's ends at the corners of the mouth, well outside the nose
  width.** **`fu-manchu` is likewise banned** — the name and its associations are a racial
  caricature, and the underlying shape is not proposed under any name.
- **Avoid the words "super hero" / "superhero" in any `data-name` string.** Two publishers jointly
  registered the mark in 1981 and have protected it aggressively; a 2024 default judgement
  cancelling it is not a merits ruling and should not be relied on. Use "Hero", "Suit", "Runner",
  "Frame" or a role noun.

#### `shield-warrior` — the do-not-draw list

`shield-warrior` (Greek, `costume`, Growing) was flagged as the **highest residual trademark risk
in the whole expansion** and is the reason the family was renamed away from `amazon`. It must be
drawn to the brief exactly.

**Do not draw, in any combination:**

- a strapless bustier;
- a star motif, anywhere, at any size;
- a tiara (head-mounted and out of slot regardless — and `tiara` is refused as a `headwear` family
  besides, being silhouette-identical to `flower-crown`);
- wide matching metal bracers on both wrists;
- a coiled rope or lasso at the hip;
- a red + blue + gold fallback palette.

**Any two of those together is a specific character.** The silhouette that ships — a trousered,
long-sleeved, fully-covered rider with a crescent shield slung flat across the back and a wide
diagonal baldric — is the opposite of that costume on every axis, which is exactly why it was
chosen. **Keep the trousers and keep the sleeves.** The Phrygian cap is not proposed as a
companion headwear family; `beanie` and `bandana` already occupy that outline space.

#### Cultural guardrails, which are the same rule wearing different clothes

Classical Greece, Viking-age Scandinavia and pharaonic Egypt are in scope for `costume` because
they are historical periods with no living community whose identity is at stake, and reconstructing
their everyday dress is scholarship rather than caricature.

**Living cultural dress is never a costume.** It belongs in `top`, `bottom` and `onepiece` under
its own endonym. So does formalwear, for a different and equally hard reason: `costume` declares
`data-hides="top,bottom,shoes"`, and for formalwear the shoes are the look.

**Never drawn, under any framing:** war bonnets and any Native American regalia; Mesoamerican
eagle- or jaguar-warrior regalia (sacred military vesture of a colonised people with living
descendant communities — and not to be softened into a "generic feathered warrior" either, which
is the same costume with the honesty removed); religious vestments and ritual garments, including
yamabushi vesture and therefore the tengu; face-covering veils; and any garment whose identity *is*
a specific community's woven design — named-clan tartan setts, particular kente patterns, Adinkra
symbols, Māori kōwhaiwhai. The "never promote a surface treatment to a family name" rule above is
the same principle; this is its cultural-harm form.

Families named by endonym are **drawn but held from release** until an expert of that culture has
reviewed them. That gate applies to shipping, not to authoring.

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

**The per-bundle numbers, and the three sanctioned ways to pay for this rule rather than merely
obey it, are in "The costume face ceiling" above.** `headwear` (z 100) draws above the face too,
so a companion helmet must be open-faced as well.

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
