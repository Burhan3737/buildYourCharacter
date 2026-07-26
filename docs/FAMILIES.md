# Canonical Families

A **family** is one garment *silhouette*. It has a kebab-case name, that name is the filename,
and that name is the `data-family` string inside the file:

```
family  hoodie   →   src/assets/catalog/adult/female/top/hoodie.svg
                     <svg … data-family="hoodie" data-slot="top" …>
```

`data-family` is what makes a character age. Every bundle that authors a family draws its own
version of it, fitted to its own body spec, and the app swaps between them on a stage change.
Interpret a family for the age you are drawing — `hoodie` on a toddler is a chunky zip-front
sweat top, on a grandparent it is a looser one — but the **silhouette description is binding**:
if the description says "open front", every bundle's version is open-fronted.

Authoring rules live in `docs/ASSET_CONTRACT.md`. Read its **"Silhouette first"** section before
you draw anything in this document — it defines the four silhouette axes and the five surface
tools that this list assumes you are using. Read its **"Trademark guardrails"** section before
you draw anything in `costume`.

**How to read this file**

| Section | What it gives you |
|---|---|
| §0 | Three rules that override everything else |
| §1 | The tiers — which bundles author which families |
| §2 | The master list, slot by slot: name · silhouette · tier |
| §3 | **Your exact file list**, one roster per bundle |
| §4 | The accessory pools and who owns them |
| §5 | Totals |
| §6 | Families that are proposed but cannot be authored yet |

---

## 0. Three rules that are not negotiable

### 0.1 There are no aisles — and as of this revision there is no exception left anywhere

**Every family in this document is authored in every bundle its tier covers, on BOTH body
types.** There is no family in this catalogue that a female bundle authors and a male bundle
does not, or the reverse. Not one. This is the headline change in this revision and it is the
thing most likely to be quietly ignored, so it is stated first, in the largest terms available:

> **Body type may change drape and fit. It may never change availability.**

Until now four `top` families (`camisole`, `crop-top`, `puff-sleeve-blouse`, `wrap-top`) were
female-only and four (`bomber`, `flannel-overshirt`, `henley`, `ribbed-vest`) were male-only;
four hair families (`braided-crown`, `curtain-long`, `half-up`, `high-puff`) were female-only and
five (`man-bun`, `mop-shag`, `taper-fade`, `undercut-sweep`, `waves-360`) were male-only. **All
seventeen are now Growing tier and are authored on both bodies.** The `fit-F` and `fit-M` tiers
have been deleted from this document and must never be reintroduced under any name.

The evidence that killed them: the head specs for `adult-female` and `adult-male` are
byte-identical (`cx 200, cy 91, rx 57, ry 59`, ears at `(149, 95)` and `(251, 95)`, eyeLine
`100`), and the same holds for the teen, midage and elder pairs. A man bun and a half-up knot are
the same construction problem on the same ellipse. There was never a fitting difference to
justify; there was an aisle wearing a fitting tier's clothes.

**What "drape and fit" legitimately means.** A `camisole` on the male spec keeps its narrow
straps and skimming hem and is cut for that chest. A `ribbed-vest` on the female spec keeps its
deep dropped armhole. A `taper-fade` on a female bundle is a genuine fade — a value gradient in
the hair itself, `--hair2` at the skin line up to `--hair1`, with a hard clean front hairline —
not a soft-edged approximation. What you may not do is skip the file.

Concretely, and this list is not exhaustive: `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`,
`pencil-skirt`, `hoop-skirt`, `chima`, `sarong`, `tutu`, `sundress`, `party-dress`,
`shirt-dress`, `pinafore`, `maxi-dress`, `wrap-dress`, `sari`, `ball-gown`, `bridal-gown`,
`sack-gown`, `bustle-gown`, `empire-gown`, `flapper-dress`, `camisole`, `crop-top`, `wrap-top`,
`puff-sleeve-blouse`, `jeogori`, `apron-dress`, `valkyrie`, `gorgon` **are authored on male
bundles**, and `henley`, `bomber`, `ribbed-vest`, `flannel-overshirt`, `taper-fade`, `waves-360`,
`man-bun`, `undercut-sweep`, `mop-shag`, `stubble`, `full-beard`, `long-beard`, `moustache`,
`hoplite`, `berserker`, `jarl` **are authored on female bundles**. Facial hair in particular is a
styling option and not a gendered restriction — an `elder/female` character with `stubble` or a
`long-beard` is an accurate asset, not a joke one, and the whole `beard` slot exists on both
bodies of all eight bundles that carry it.

The tray shows every asset in the slot for the current bundle, in one undifferentiated list.
Head coverings sit beside the beanie. Hearing aids sit beside the hoop earrings. Beards sit in
the same tray for every character. No sub-tabs, no "cultural" section, no "for her" ordering, no
ordering that puts anything last.

### 0.2 A family is a silhouette, never a surface

If you cannot describe a family in one sentence **without naming a colour or a pattern**, it is
not a family. `stripes` is the catalogue's cautionary tale: a texture that got promoted to a
garment because there was no other axis available, and then got drawn on the `tee` body. It is
grandfathered — the key is load-bearing for stage switching and cannot be removed — and §2.5
gives it a real silhouette. **Nothing like it may ever be added.**

`src/catalog/silhouette.test.ts` enforces the mechanical floor: two assets in the same
`(bundle, slot)` may not be built from the same geometry, and "the same path inflated by 4px" is
the same geometry.

There is a second, harder floor that the test cannot check for you. **At a 64px picker thumbnail
one canvas unit is about 0.107 screen pixels**, so a 22-unit motif is 2.4 screen pixels — invisible.
Any feature that is meant to *identify* a family must be at least **40 canvas units**, and the
identity has to live in the outline. The contract's "The 40-unit practical floor" section has the
arithmetic and the consequences; read it before you decide what makes your family recognisable.

### 0.3 Costumes stay generic

Every costume is an **archetype**, never a specific character from anyone's copyrighted work.
No logos, no emblems, no chest insignia, no drawn lettering, and **no signature
colour-plus-marking combination**. Because `--c1/--c2/--c3` are player-tunable, it is the
*fallback* palette that carries the risk: the fallback is what a player sees in the picker, on
the contact sheet, in every screenshot, before anybody touches a swatch. A red-and-blue suit with
a web on it is a character reference however generic the family name is.

**The binding list of banned fallback pairings, and the `shield-warrior` do-not-draw list, live
in `docs/ASSET_CONTRACT.md` under "Trademark guardrails". Check your fallback triple against that
table before you pick colours, not after.**

Animal and occupational archetypes are safe because they are standing retail categories; a named
character never is. Classical Greece, Viking-age Scandinavia and pharaonic Egypt are in scope for
`costume` because they are historical periods with no living community whose identity is at stake
and they are standing museum-education categories. **Living cultural dress is not**: it belongs in
`top`, `bottom` and `onepiece` under its own endonym, never in `costume`. **Formalwear is not
either**: a tuxedo in `costume` would declare `data-hides="top,bottom,shoes"` and hide the shoes,
and for formalwear the shoes are the look — so `tailcoat`, `dinner-jacket`, `hoop-skirt` and the
seven gowns go to `top`, `bottom` and `onepiece`.

---

## 1. Tiers — which bundles author a family

The twelve bundles are `<stage>/<bodyType>` for stage ∈ {newborn, toddler, teen, adult, midage,
elder} and bodyType ∈ {female, male}.

| Tier | Authored by | Bundles | Files |
|---|---|---|---|
| **Core** | every bundle | all 12 | 12 |
| **Growing** | toddler · teen · adult · midage · elder, both body types | 10 | 10 |
| **Older** | teen · adult · midage · elder, both body types | 8 | 8 |
| **Stage** | only the named stage(s), both body types | 2 per stage | 2 per stage |
| **Pool** | the 3 head-size classes, not per bundle | — | 3 |

**There is no fitting tier and there will not be one.** See §0.1.

A family with no counterpart in the target bundle degrades gracefully on a stage switch: the
character falls back to the first asset in the slot and keeps its colours. **Core is the common
spine, not a correctness requirement.** That is what makes Growing, Older and Stage safe.

### 1.1 The age tiers, said plainly

Graduated depth by age is a design decision, not a gap.

- **Newborn is deliberately the smallest bundle and it is one-piece dominated.** 73 families
  against 226 at elder, because a real newborn wardrobe is one-piece-dominated with almost no
  separates: five of the six newborn-only families are `onepiece`. **Newborn authors nothing new
  in this revision.** No new hair family is Core, no new garment family belongs on a four-week-old,
  no costume in this expansion resolves at a newborn torso of 88×86 canvas units (about 14 device
  pixels of torso height at thumbnail size), and newborns author no facial hair. If you are a
  newborn agent, your task list for this pass is empty and that is the correct outcome. Giving a
  newborn twenty-two tops would rebuild the current problem in a new shape.
- **Toddler omits the adult-only families.** Everything at **Older** tier is absent from the
  toddler rosters: the two hair-thinning families, `blazer`, `waistcoat`, `tailcoat`,
  `dinner-jacket`, `maxi-dress`, `wrap-dress`, `sari`, `abaya`, `bustle-gown`, `empire-gown`,
  `flapper-dress`, `flare-jumpsuit`, `heels`, `platform-boots`, `wedges`, and the five Older
  costumes (`exo-frame`, `hoplite`, `gorgon`, `valkyrie`, `seeress`). Some are omitted because
  they read wrong on a toddler; most are omitted because their identity is a repeated fine
  rhythm — pteruges strips, plate joint gaps, mail, overlapping plumes, interlaced snakes — that
  collapses into mush on a 96×104 toddler torso.
- **Beards are teen and up.** `newborn/female`, `newborn/male`, `toddler/female` and
  `toddler/male` author **zero** files in the `beard` slot. Do not create
  `src/assets/catalog/newborn/*/beard/` or `src/assets/catalog/toddler/*/beard/` at all — not
  `stubble`, not a "soft fuzz" joke asset, not a costume beard. The empty directory is the guard:
  the tray shows "Nothing here yet", the randomizer cannot roll what is not there, and a bearded
  adult switched down to toddler simply loses the beard and regains it on the way back up.

---

## 2. Master list

Everything marked *(exists)* is already authored on disk and is not part of this expansion.
Everything marked **new** is art you author.

### 2.1 eyes — Core, 8 families · all exist

| Family | Silhouette |
|---|---|
| `round` | Large circular aperture, lid clear of the iris top. |
| `almond` | Narrow tilted oval, outer corner lifted, lid crease visible. |
| `sleepy` | Heavy upper lid covering the top third of the aperture. |
| `wide` | Oversized aperture with sclera visible all round the iris. |
| `happy-arc` | Closed eye drawn as a single upward arc, no aperture at all. |
| `monolid` | Smooth single-fold lid, crease hidden, wide flat lash line. |
| `hooded` | Upper lid partly covering the crease, short visible lid strip. |
| `upturned` | Outer corner lifting clearly above the inner corner. |

### 2.2 brows — Core, 5 families · mouth — Core, 6 families · all exist

| Family | Slot | Silhouette |
|---|---|---|
| `soft` | brows | Short, gently curved, tapered at both ends. |
| `straight` | brows | Level bar of even weight, squared ends. |
| `arched` | brows | High peak nearer the outer end, thinning to a point. |
| `thick` | brows | Dense straight-edged brow with a squared inner end. |
| `thin-arch` | brows | Fine high arch tapering to a point. |
| `smile` | mouth | Closed upward curve, no aperture. |
| `grin` | mouth | Wide open mouth with an upper tooth band. |
| `neutral` | mouth | Short level line, slight thickening at the centre. |
| `surprised` | mouth | Small vertical open oval. |
| `open-laugh` | mouth | Wide open mouth with a visible tongue shape. |
| `pout` | mouth | Small pushed-forward mouth, lower lip fuller. |

### 2.3 hair — 14 Core + 23 Growing + 2 Older + 2 Stage = 41 families

Every entry is a **silhouette**. Texture is specified because a coily silhouette is a genuinely
different outline from a straight one — see the contract's "Hair: the texture *is* the outline"
note before drawing any textured style.

**Naming discipline.** `pigtails` and `afro-puffs` are two separate families, not one generic
"bunches". Name a style from its own cultural origin, never from a lookalike. `cornrows`,
`bantu-knots`, `locs`, `box-braids`, `senegalese-twists`, `fulani-braids`, `loc-bob`, `frohawk`
and `hime-cut` keep their own names and never become "braid style 3". **Never use "baby hair" as
a label anywhere in this project** — in Black hairstyling it means *edges*, the laid hairs at the
hairline, and the collision with infant fuzz is a live sensitivity. Our newborn family is
`bald-fuzz`, which is unambiguous. Bantu knots are **not** buns, and no twin-bun family is
proposed (the naming is unsettled and two high buns on textured hair get wrongly conflated with
Bantu knots).

**Core (all 12 bundles) — 14, all exist**

| Family | Silhouette |
|---|---|
| `buzz` | Skin-close all-over crop; the skull shape reads through. |
| `curls` | Short tight coils cropped close, textured bumpy outline. |
| `afro` | Rounded halo of dense coils, symmetrical dome wider than the head, lobed contour. |
| `side-part` | Smooth short hair swept off a hard part, one side visibly longer. |
| `pixie` | Above-jaw crop with a wispy fringe and a tapered nape. |
| `bob` | Blunt jaw-length curtain, straight hem, nothing below the shoulders. |
| `ponytail` | Swept back, a single mass falling behind one shoulder. |
| `bun` | Pulled fully back into one knot; clean outline, ears exposed. |
| `long-waves` | Centre mass falling past the shoulders in soft S-curves. |
| `braids` | Two thick plaits falling forward over the shoulders. |
| `top-tuft` | Short everywhere except a raised sprout at the crown. |
| `pigtails` | Two gathered tails of straight or wavy hair hanging either side of the head. |
| `cornrows` | Scalp-hugging raised braid rows running front-to-back with clean visible partings between them, ending in a small gathered tail. |
| `fringe-bowl` | Even all-round hemline with a heavy straight fringe at the brow. |

**Growing (toddler → elder, both bodies) — 23**

| Family | Silhouette | |
|---|---|---|
| `afro-puffs` | Two round coily puffs standing off either side of the head above the ear line. | exists |
| `locs` | Rope-like strands of even thickness hanging free, blunt ends, visible root separation. | exists |
| `box-braids` | Long individual braids on a visible square parting grid, knotted at the root, falling past the shoulders. | exists |
| `high-top-fade` | Flat-topped column of dense hair over shaved sides, hard front edge. | exists |
| `bantu-knots` | A grid of small coiled cones standing off the scalp, with clean partings between sections. | exists |
| `twist-out` | Shoulder-length defined two-strand spirals with crown volume, no parting. | exists |
| `half-up` | Top section gathered into a small knot, the rest hanging loose. | **new on male bundles** |
| `braided-crown` | A braid wrapping the hairline like a band, remainder tucked away. | **new on male bundles** |
| `curtain-long` | Centre-parted with two long face-framing sweeps over a waist-length back mass. | **new on male bundles** |
| `high-puff` | All hair gathered into one round coily puff standing above the crown. | **new on male bundles** |
| `taper-fade` | Very short sides fading up to a slightly longer flat top, sharp hairline. | **new on female bundles** |
| `waves-360` | Near-shaved with concentric ripples radiating from the crown. | **new on female bundles** |
| `man-bun` | Sides swept back to a small high knot, forehead exposed, a loose strand or two. | **new on female bundles** |
| `mop-shag` | Chin-length choppy layers under a heavy brow-covering fringe. | **new on female bundles** |
| `undercut-sweep` | Shaved sides with one long swept-over top mass falling to one side. | **new on female bundles** |
| `frohawk` | A narrow raised ridge of dense coils running crown to nape over close-faded sides, widest above the forehead and tapering to a point at the nape. | **new** |
| `senegalese-twists` | Smooth two-strand rope twists emerging from a visible sectioned grid at the crown, falling to mid-back and tapering to a fine point at every end. | **new** |
| `loc-bob` | Individual locs cut to a jaw-length weight line, the hem reading as a row of separated rope-ends rather than a continuous edge, crown flat and parted. | **new** |
| `fulani-braids` | Scalp rows running back from a clean centre part, the outer sections releasing into long free braids past the shoulders, small beaded cuffs at the ends. | **new** |
| `mullet` | Cropped close at the fringe and over the ears, with a loose longer tail hanging over the nape and collar. | **new** |
| `hime-cut` | Three distinct masses: a blunt fringe cut level at the brow, two straight sidelocks cut square at the cheek, and a long straight fall behind them. | **new** |
| `single-braid` | Hair drawn smooth off the face into one thick three-strand plait falling down the centre back to the waist, tapering to a tie. | **new** |
| `smooth-scalp` | A completely bare scalp, no hair mass at all — the skull and ears fully exposed, with a soft shadow where the hairline and nape would sit. | **new** |

> The nine **new on female bundles / new on male bundles** rows are the de-gendering. The
> silhouette description is unchanged and remains binding; only the drawing is new. `man-bun` on
> the female spec is **not** a redraw of `bun`, and `half-up` on the male spec is **not** a redraw
> of `ponytail` — the head specs are identical between each pair, so `silhouette.test.ts` compares
> your new file against every other hair asset in that bundle and **will** catch a lazy copy.

**Older (teen → elder, both bodies) — 2, both new**

| Family | Silhouette |
|---|---|
| `crown-thinning` | A dense horseshoe of hair round the temples and the nape with the crown bare, the hairline receded to two clear temple bays. |
| `fine-thinning` | Full-length hair kept at its own length all round, but sparse enough that the scalp reads clearly through it at the parting and across the crown; hairline intact, no temple bays. |

> **Both, on both bodies, or neither.** The horseshoe is the male-pattern shape
> (Hamilton–Norwood); diffuse thinning is the female-pattern shape (Ludwig). They are genuinely
> different geometry. Shipping only the horseshoe would put one body's shape on every body and
> call it inclusion — the same error §0.1 is fixing. Neither is elder-only: pattern loss affects
> about a quarter of women and half of men by 50, and a teen with either is unremarkable.
>
> `smooth-scalp` is Growing rather than Older because a deliberately bare scalp belongs at every
> age from toddler up — it is a haircut, and it is also what alopecia areata looks like, which is
> most commonly diagnosed in childhood.

**Stage — 2, both exist**

| Family | Stages | Silhouette |
|---|---|---|
| `bald-fuzz` | newborn | Bare scalp with a faint halo of down at the crown and nape. |
| `soft-set` | elder | Short tightly-set curls with lift at the temples and an exposed forehead. |

**Two silhouette-test warnings specific to this slot.** `smooth-scalp` has almost no major forms
and is the one family at real risk of colliding with `buzz` or `bald-fuzz`. **Draw no cap shape at
all** — the `back` group carries a soft nape shadow, the `front` group a faint temple hairline and
a crown highlight arc; if you find yourself drawing a dome you are drawing `buzz`. `fine-thinning`
has the opposite risk: it must not be `long-waves` with dots on it. **The scalp showing through is
negative space in the silhouette path itself**, not a texture laid over a solid mass — the same
instruction the contract already gives for `cornrows` partings.

### 2.4 beard — 12 Older families · **new slot**, all new

Axes for this slot: **upper lip · chin & jaw coverage · cheek line · length.**

**Authored by the eight bundles teen → elder, both body types. Newborn and toddler author none —
see §1.1.** Every beard declares `data-slot="beard" data-layer="beard" data-colors="hair1,hair2"
data-hides=""`, and is one group, not two. Anchoring, the jaw curve, the mouth band and the
long-beard floor are in `docs/ASSET_CONTRACT.md` under "The `beard` slot".

| Family | Silhouette |
|---|---|
| `stubble` | An even soft shadow of growth over the upper lip, chin, jaw and lower cheeks, with no defined edge anywhere and no mass standing off the face. |
| `moustache` | A trimmed bar of hair on the upper lip only, ends stopping level with the corners of the mouth; chin, jaw and cheeks bare. |
| `handlebar` | Upper lip only, the ends grown long and swept outward and upward well past the corners of the mouth; chin bare. |
| `walrus` | A thick moustache drooping down over the whole mouth to below the lower lip; chin, jaw and cheeks bare. |
| `goatee` | A rounded mass of hair on the chin only, clearly disconnected from the lip; upper lip, jaw and cheeks bare. |
| `circle-beard` | A moustache joined round both corners of the mouth to a rounded chin beard, enclosing the mouth in a closed ring; jaw and cheeks bare. |
| `chin-strap` | A narrow even band of hair following the jawline from ear to ear and round under the chin; upper lip bare, cheeks bare. |
| `chin-curtain` | A broad curtain covering the chin and the whole under-jaw from ear to ear, hanging just below the jawline; upper lip **completely bare**. |
| `mutton-chops` | Wide sideburns flaring down the cheeks and broadening toward the jaw corners, stopping short of the chin; chin and upper lip bare. |
| `line-up` | A short full beard with razor-hard straight edges — a sharp cheek line running down from the temple, a sharp neck line, and a hard-edged moustache — joined continuously to the sideburn. |
| `full-beard` | A moustache joined to a full beard covering the cheeks, jaw and chin, ending at the throat, with a natural mid-cheek line and a softly irregular hem; the moustache trimmed clear of the lip. |
| `long-beard` | A full beard hanging well below the jaw toward mid-chest, widening as it falls to a broad rounded hem, moustache untrimmed and overhanging the lip. |

Three of the twelve carry weight beyond their own row and their descriptions are unusually
binding. **`chin-curtain` is the only beard with a deliberately bare upper lip** — draw that lip
*clean*, not merely thin. **`full-beard`'s moustache is trimmed clear of the lip** — do not let it
drift into `long-beard` territory. **`line-up` is the Black barbering edge-up**, the natural
partner to `taper-fade` and `waves-360`; its edges are razor-straight *by definition* and it is
the one family exempt from the irregular-hem rule.

**Name the shape, never the identity.** There is no `sikh-beard` and no `amish-beard` in this
catalogue and there never will be. `turban` + `long-beard` is a Sikh character; `kufi` +
`full-beard` is a Muslim one; `flat-cap` + `chin-curtain` is an Amish one. The combination is the
representation, the combination is free, and no filename asserts anyone's religion.

**Two shapes are banned outright and may never be added: the toothbrush moustache and
`fu-manchu`.** Reasons are in the contract's "Trademark guardrails". Note the generative risk on
the first: if `moustache` is drawn too narrow it becomes the banned shape by accident. Keep the
bar's ends at the corners of the mouth, well outside the nose width.

### 2.5 top — 8 Core + 26 Growing + 4 Older + 1 Stage = 39 families

Axes for this slot: **shoulder/sleeve · closure · hem · volume.** Any two families here differ on
at least two of them.

**Core (all 12 bundles) — 8, all exist**

| Family | Silhouette |
|---|---|
| `tee` | Short set-in sleeves, closed crew neck, straight body ending at the hip. |
| `hoodie` | Long sleeves, closed pullover front, hood lying flat behind the neck, kangaroo pocket, hem at the hip. |
| `stripes` | **Legacy key, real garment:** wide boat neckline, long straight sleeves, boxy body to the hip. Draw it as the *boat-neck long-sleeve top*; the breton banding is its surface treatment, not its identity. |
| `button-up` | Flat collar over a full button placket, long cuffed sleeves, straight hem at the hip. |
| `tank` | Strap shoulders, no sleeve, scooped neckline, fitted body to the hip. |
| `sweater` | Chunky knit, dropped long sleeves, ribbed cuffs and a deep ribbed hem band, boxy volume. |
| `jersey` | Short raglan sleeves seamed neck-to-underarm, V-neck bind, straight boxy body. |
| `overalls-top` | Square bib panel on two over-shoulder straps, no sleeves, flat hem at the waist. |

**Growing (toddler → elder, both bodies) — 26**

| Family | Silhouette | |
|---|---|---|
| `zip-jacket` | Open-front track top with a centre zip line, stand collar, ribbed cuffs and hem. | exists |
| `puffer-vest` | Sleeveless quilted gilet, horizontal channel seams, high stand collar, bare arms. | exists |
| `cardigan` | Open-front knit with a wide V opening, hem at the hip, patch pockets. **The opening resolves as skin or as an integral shell drawn in the same file — never as a phantom layer.** | exists |
| `polo` | Short two-button placket under a flat knit collar, short sleeves, curved hem. | exists |
| `turtleneck` | Close-fitting body with a tall folded neck tube reaching the jaw. | exists |
| `oversized-long-sleeve` | Boxy dropped-shoulder body, hem well below the hip, sleeves past the wrist. | exists |
| `raincoat` | A-line hooded shell flaring from shoulder to mid-thigh, front snap placket. | exists |
| `poncho` | One trapezoid of cloth falling from the shoulders, no sleeve division at all. | exists |
| `wrap-top` | Diagonal crossover front tied at the waist, deep V, three-quarter sleeves. | **new on male bundles** |
| `puff-sleeve-blouse` | Narrow body with balloon volume at the shoulder gathering into a tight cuff. | **new on male bundles** |
| `crop-top` | Hem sitting above the natural waist, midriff bare, short sleeves. | **new on male bundles** |
| `camisole` | Narrow spaghetti straps set wide, straight or scalloped upper edge, skimming bias-cut body falling below the hip. | **new on male bundles** |
| `henley` | Collarless three-button placket, long sleeves pushed up at the forearm. | **new on female bundles** |
| `flannel-overshirt` | Boxy unbuttoned overshirt worn open over a tee, squared hem, chest pockets. | **new on female bundles** |
| `ribbed-vest` | Wide-strap athletic vest with the armhole cut deep and low into the ribs, boxy body. | **new on female bundles** |
| `bomber` | Blouson jacket with ribbed collar, cuffs and hem; body gently bloused above the hem. | **new on female bundles** |
| `long-coat` | Long set-in sleeves over a full button placket, notched collar, straight column falling to mid-calf, single back vent. | **new** |
| `duster-cardigan` | Unfastened open-front knit with a dropped shoulder, no collar and no buttons, two low patch pockets, hanging to mid-calf in a soft drape. | **new** |
| `smock-top` | Narrow yoke across the chest with the whole body gathered onto it, swinging wide to a high-hip hem; short set-in or cap sleeves. | **new** |
| `bolero` | Open-front short jacket cut off above the natural waist, three-quarter sleeves, no fastening, curved front edges. | **new** |
| `tabard` | Two flat panels, front and back, joined only at the shoulders and completely open down both sides, hip hem, no sleeve. | **new** |
| `swim-top` | Banded swim top on narrow shoulder ties, straight upper edge, hem at the underbust, no sleeve. | **new** |
| `kurta` | Straight tunic to mid-thigh or knee, band collar over a short front placket, long straight sleeves, deep side slits from the hip. | **new** |
| `dashiki` | Pull-on tunic with a wide V panel at the neck, short wide sleeves cut straight from the body, boxy body to mid-thigh with short side vents. | **new** |
| `jeogori` | Very short wrap jacket ending just below the bust, wide crossover front held by a single long ribbon tie, gently curved sleeve line. | **new** |
| `haori` | Open-front hip-length jacket with wide square sleeve panels hanging free below the arm, straight front edges meeting at a short chest cord, no buttons. | **new** |

**Older (teen → elder, both bodies) — 4**

| Family | Silhouette | |
|---|---|---|
| `blazer` | Structured square shoulders, notched lapels, open front over a shell. | exists |
| `waistcoat` | Fitted sleeveless V-front with a pointed hem and a visible button line. | exists |
| `tailcoat` | Square built-up shoulders and wide peaked lapels over a front that cuts away horizontally at the natural waist, with two long tails hanging behind to the back of the knee; worn open, no fastening. | **new** |
| `dinner-jacket` | Square shoulders under an unbroken rounded shawl collar that rolls from the neck to a single closed button at the natural waist; straight sleeves; hem just past the hip; no vent. | **new** |

**Stage — 1, exists**

| Family | Stages | Silhouette |
|---|---|---|
| `wrap-vest` | newborn | Kimono-style crossover baby vest tied at the side, no fasteners at the neck. |

**Notes that bite in this slot.**

- **`jeogori` is wrapped left over right**, and so is `yukata` in §2.7. Right-over-left is how the
  dead are dressed. Check your reference; it costs nothing and getting it wrong is noticed
  immediately.
- **`jeogori` + `chima` must be drawn to a shared line.** The `chima` band sits above the bust, so
  the `jeogori` hem must fall clear of the band's top edge on every bundle. Agree one y-value per
  bundle before drawing either, or the pair reads as a jacket tucked into a strapless dress.
- **Open-front tops resolve the opening as skin or as an integral shell — never as a phantom
  shirt.** `bolero`, `haori`, `duster-cardigan`, `tabard` and the existing `cardigan` all leave
  the chest or the ribs exposed. Paint that region through `--skin1`/`--skin2` (always available),
  **or** draw a shell inside the same file painted through `--c2`/`--c3` so the player controls
  it. Never leave a hole; never hard-code a shell colour.
- **`long-coat` and `duster-cardigan` are `top` assets and are therefore suppressed whenever a
  `onepiece` is equipped.** A coat over a dress is not possible today. That is a real limitation
  and it is recorded in the contract under "The deferred `overlayer` slot". Do not work around it
  by drawing a dress into a coat file.
- **`tabard` is the interim answer for `apron` and for hi-vis.** An apron is definitionally a
  layer over other clothes and cannot be authored until `overlayer` exists; a tabard is a garment
  in its own right and delivers the hi-vis vest, the sports bib, the shop smock and the medieval
  surcoat reads without pretending to be a layer.
- **`tailcoat`'s tails are two separate panels with a visible gap between them at the back.** At
  tray size that gap is what says "tails" rather than "long coat".

### 2.6 bottom — 8 Core + 17 Growing + 3 Stage = 28 families

Axes for this slot: **rise · leg length · leg width · hem treatment.**

There is no fitting tier here and never was. **Every skirt is authored on both body types.**

**Core (all 12 bundles) — 8, all exist**

| Family | Silhouette |
|---|---|
| `jeans` | Natural rise, full-length straight leg, plain hem, structured waistband. |
| `shorts` | Natural rise, mid-thigh, straight leg, rolled cuff. |
| `skirt` | Natural rise, no leg division, A-line flare to just above the knee. |
| `joggers` | Natural rise, full length, tapering to a gathered elasticated ankle cuff. |
| `cargo` | Natural rise, full length, relaxed wide leg with flapped thigh pockets. |
| `leggings` | High rise, full length, skin-close, plain ankle hem. |
| `pleated` | Natural rise, no leg division, knife-pleated flare to the knee. |
| `dungarees` | Bib rise over the shoulders on two straps, full-length straight leg. |

**Growing (toddler → elder, both bodies) — 17**

| Family | Silhouette | |
|---|---|---|
| `wide-leg` | High waist falling in a straight wide column, hem breaking over the shoe. | exists |
| `bike-shorts` | Close-fitting, cut straight across mid-thigh, no pockets or fly. | exists |
| `tailored-trousers` | Clean-fronted trouser with a centre crease and a turn-up at the hem. | exists |
| `sweat-shorts` | Loose above-the-knee shorts with a ribbed waistband and a drawcord. | exists |
| `swim-trunks` | Mid-thigh shorts, elasticated waist, short side split at the hem. | exists |
| `snow-pants` | Bulky insulated trousers, wide through the leg, elastic cuff sitting over the boot. | exists |
| `tiered-skirt` | Two or three gathered ruffle tiers widening to a mid-calf hem. | exists |
| `maxi-skirt` | Narrow column falling straight to the ankle with a single side slit. | exists |
| `pencil-skirt` | Narrow straight skirt to the knee with a short back vent. | exists |
| `capris` | Natural rise, straight narrow leg cut off at mid-calf, plain or single turn-up hem. | **new** |
| `culottes` | High rise, knee-length, leg so wide and flat that it reads as a skirt until the centre split shows. | **new** |
| `flares` | Low rise, full length, close through the thigh and knee then flaring sharply from the knee to a wide floor-brushing hem. | **new** |
| `swim-bottoms` | High rise, no leg at all, skin-close brief with a high-cut leg opening and a plain bound edge. | **new** |
| `shalwar` | Natural drawstring rise gathered into deep pleats, enormously full through the hip and thigh, narrowing sharply to a plain close ankle band — a triangle, not a tube. | **new** |
| `chima` | Wrapped skirt whose band sits above the bust, falling from there in one gathered column to the ankle, closed with a long tie. | **new** |
| `sarong` | A length of cloth wrapped at the waist and knotted at one hip, falling straight to mid-calf with a visible overlap edge down one leg. | **new** |
| `hoop-skirt` | High rise, no leg division; a rigid dome standing well clear of the leg on all sides and sweeping the ground line, with three or four horizontal hoop channel seams. | **new** |

**Stage — 3, all exist**

| Family | Stages | Silhouette |
|---|---|---|
| `tutu` | toddler, teen | Short stiff skirt standing out horizontally from the hip in two net layers. |
| `nappy` | newborn | Padded brief with side tabs, high on the hip, bulky between the legs. |
| `knit-leggings` | newborn | Soft ribbed footless leggings gathered at the ankle, no waistband detail. |

> `swim-top` (§2.5) + `swim-bottoms` is the two-piece. The swim-top hem sits at the underbust and
> the midriff is deliberately bare; `swim-bottoms` sits at the natural waist and does not close
> the gap. Both must read as finished garments worn alone.
>
> `hoop-skirt` exists so a player can build a gown from separates — `dinner-jacket` over a ball
> skirt — rather than being forced into `onepiece`. Its dome must clear the widest point of the
> body by at least 40 canvas units per side or it is a maxi-skirt.

### 2.7 onepiece — 4 Core + 15 Growing + 8 Older + 6 Stage = 33 families

Axes for this slot: **shoulder/sleeve · closure · hem · volume.** This is where the newborn
wardrobe actually lives — five of the six Stage families are newborn-only.

Every one-piece declares `data-hides="top,bottom"`. **It does not hide shoes, and that is the
point**: it is why all seven gowns are here rather than in `costume`.

**Core (all 12 bundles) — 4, all exist**

| Family | Silhouette |
|---|---|
| `sundress` | Strap shoulders, closed, fitted bodice over an A-line skirt to the knee. |
| `jumpsuit` | Covered shoulders, centre front closure, full-length straight legs, belted waist. |
| `party-dress` | Cap sleeves, fitted bodice, gathered full skirt standing away from the leg, knee hem. |
| `romper` | Short set-in sleeves, button placket, short cuffed legs at mid-thigh. |

**Growing (toddler → elder, both bodies) — 15**

| Family | Silhouette | |
|---|---|---|
| `shirt-dress` | Collared button-through dress, straight to the knee, belted at the natural waist. | exists |
| `pinafore` | Bib-fronted sleeveless A-line dress on shoulder straps, worn over a top. | exists |
| `swimsuit` | One-piece scoop-back swim shape, high-cut leg, no skirt or ruffle. | exists |
| `boiler-suit` | Utility all-in-one — collar, centre zip, straight legs, tie at the waist. | exists |
| `robe` | Wrap-front dressing gown to mid-calf, shawl collar, tie belt, wide sleeves. | exists |
| `kaftan` | Loose T-shaped robe falling straight from the shoulder to the calf, wide sleeves, slit neckline. | exists |
| `ball-gown` | Bare shoulders under a straight strapless band across the top of the bust, fitted bodice coming to a point at the waist, and a hugely bouffant dome skirt standing away from the leg and sweeping the ground line. | **new** |
| `nightgown` | Loose gown falling from a shoulder yoke straight to mid-calf with no waist at all, short set-in or cap sleeves, plain round neck. | **new** |
| `sleep-onesie` | Footed hooded all-in-one with a full-length front zip from throat to crotch, ribbed cuffs, closed feet, softly bloused body. | **new** |
| `unitard` | Skin-close all-in-one from shoulder to ankle with no waist seam and no closure, scoop neck, long or short sleeves. | **new** |
| `thobe` | Ankle-length straight column, narrow long set-in sleeves, band collar over a short buttoned placket, no waist. | **new** |
| `yukata` | Full-length wrapped robe closed **left over right**, flat overlapping band collar running from the neck to the waist, wide rectangular sleeve panels hanging well below the arm, held by a broad flat sash. | **new** |
| `ao-dai` | Long fitted tunic split to the waist at both sides over wide trousers drawn into the same file, mandarin collar, long narrow sleeves. | **new** |
| `bridal-gown` | Long sheer set-in sleeves and a high round neckline over a body fitted through the hip to the knee, then flaring hard into a trumpet, with a train sweeping behind the ground line. | **new** |
| `sack-gown` | Elbow-length pagoda sleeves ending in two or three stacked ruffle cuffs; the robe front hangs open to reveal a triangular stomacher and petticoat wedge; the skirt held out wide side-to-side and flat front-to-back, reaching the ground; two box pleats falling loose from the shoulders at the back. | **new** |

**Older (teen → elder, both bodies) — 8**

| Family | Silhouette | |
|---|---|---|
| `maxi-dress` | Narrow column from a fitted bodice straight to the ankle. | exists |
| `wrap-dress` | Diagonal crossover bodice tied at the waist, skirt falling to the knee. | exists |
| `sari` | Draped cloth wrapped at the waist into hand-gathered pleats with the pallu carried diagonally over one shoulder, over a fitted short blouse and a petticoat drawn into the same file. | **new** |
| `abaya` | Open-front ankle-length robe falling straight from the shoulder, long straight sleeves, no waist, edges meeting without a fastening. | **new** |
| `bustle-gown` | Long fitted sleeves and a high closed neckline over a body flat at the front, with a large draped mass projecting sharply behind the hip and falling to a short train; skirt narrow at the front to the ground. | **new** |
| `empire-gown` | Short puffed cap sleeves; a very short bodice with a horizontal seam sitting directly under the bust; from that seam a gathered narrow skirt falls straight to the ankle. | **new** |
| `flapper-dress` | Narrow straps over bare shoulders; a straight tube with no waist shaping at all falling to a horizontal seam at the hip; below that seam a separate fringed panel band hanging to mid-calf. | **new** |
| `flare-jumpsuit` | A halter neck leaving the shoulders and upper back bare, fitted through torso and thigh, then flaring hard from the knee into a wide bell that covers the shoe. | **new** |

**Stage — 6, all exist**

| Family | Stages | Silhouette |
|---|---|---|
| `sleepsuit` | newborn | Footed all-in-one, full-length popper line down one leg, closed feet, cuffed wrists. |
| `swaddle` | newborn | Tapered cocoon wrapping shoulders to hem, arms enclosed, no limbs visible. |
| `bodysuit` | newborn | Short-sleeved vest with a poppered gusset visible between the legs. |
| `knot-gown` | newborn | Open-hemmed gown gathered and knotted at the bottom, no leg division. |
| `sleep-sack` | newborn | Sleeveless wearable bag, wide flat hem, armholes cut at the shoulder. |
| `puddle-suit` | toddler | Waterproof hooded all-in-one, elasticated cuffs and ankles, bloused body. |

**Notes that bite in this slot.**

- Draw sleep sacks and swaddles. **Never draw a baby under a loose blanket** — infant sleep
  guidance is explicit that a wearable blanket replaces loose bedding, and the art should honour
  that.
- **`sari` and `abaya` are Older** because both are garments for older wearers in practice. A
  toddler equivalent exists in both traditions but is a genuinely different garment, not a scaled
  sari — do not fake one. Use the common **Nivi** drape for `sari` (waist pleats, pallu over the
  left shoulder) and say so in `data-name`; over eighty regional drapes exist and no single one is
  "the" sari. The choli and petticoat **must** be drawn into the same file, painted through `--c2`
  or `--c3` so the player can still contrast them. `ao-dai`'s trousers likewise.
- **`kaftan` keeps its mid-calf hem, wide draped sleeves and slit neckline**, so `thobe` (ankle,
  narrow set-in sleeves, band collar) and `abaya` (ankle, open front) read apart from it. **`robe`
  keeps its shawl collar, soft tie belt and calf hem**, so `yukata` (ankle, flat overlapping band
  collar, wide flat sash, hanging rectangular sleeve panels) reads apart from it.
- **`bridal-gown` must read as a wedding gown when recoloured black.** White is a default, not an
  identity; the trumpet line and the train do the work a palette never could. The **veil is head
  art and lives in `headwear`** (§4.2) — do not draw a veil in this file.
- **`bustle-gown` is the only front-to-back asymmetric outline in the catalogue.** Its rear
  projection must clear the hip line by at least 50 canvas units.
- **`flare-jumpsuit`'s bell must end above the sole** (about y 545 on an adult bundle) so
  `platform-boots` still reads underneath it.
- **Do not add a powdered wig to `sack-gown`.** That is `hair` and out of scope.

### 2.8 shoes — 5 Core + 12 Growing + 3 Older + 2 Stage = 22 families

Axes for this slot: **shaft height · toe shape · fastening · sole depth.** Shoes are the
cheapest art in the catalogue — roughly the bottom 60px of a 600px canvas — so this slot is
unusually good value per file. `shoes` draw *over* trouser hems; never draw a foot into a
`bottom` asset.

**Core (all 12 bundles) — 5, all exist**

| Family | Silhouette |
|---|---|
| `sneakers` | Low-cut lace-up, rounded toe, thick banded sole. |
| `boots` | Shaft rising above the ankle bone, rounded toe, chunky sole. |
| `sandals` | Two or three straps over a closed heel counter with an ankle buckle, flat thin sole, toes exposed. |
| `dress-shoes` | Low-cut slip-on loafer with a raised vamp, a visible apron seam across the toe, tapered toe, low stacked block heel. |
| `slippers` | Soft collapsed collar, rounded toe, no sole definition. |

**Growing (toddler → elder, both bodies) — 12**

| Family | Silhouette | |
|---|---|---|
| `high-tops` | Sneaker with a padded collar rising above the ankle bone and a long lace ladder. | exists |
| `wellies` | Smooth tall rubber boot to mid-calf, no laces, small pull tab at the top. | exists |
| `mary-janes` | Chunky round-toed flat with a small heel and a single instep strap with a buckle. | exists |
| `clogs` | Moulded slip-on, bulbous rounded toe, ventilation holes, heel strap. | exists |
| `flip-flops` | Flat sole with a Y-thong between the toes; the foot is otherwise bare. | exists |
| `snow-boots` | Bulky insulated boot with a soft cuff and a chunky lugged sole. | exists |
| `tall-boots` | Smooth shaft rising to just below the knee, tapered toe, no lacing, thin stacked sole. | **new** |
| `ballet-flats` | Very low scooped topline exposing the whole instep, rounded toe, no fastening at all, sole barely thicker than the upper. | **new** |
| `slides` | Backless — one broad band across the instep and nothing behind the heel — on a thick contoured footbed. | **new** |
| `oxfords` | Low-cut lace-up with closed lacing under the vamp, a squared toe cap seam and a visible welted sole edge. | **new** |
| `cleats` | Low sport shoe on a studded plate sole, close-fitting upper, laces crossing off-centre. | **new** |
| `ice-skates` | Above-ankle padded boot on a thin blade standing clear of the sole, long hooked lace ladder. | **new** |

**Older (teen → elder, both bodies) — 3**

| Family | Silhouette | |
|---|---|---|
| `heels` | Almond toe with a raised heel column lifting the heel clearly above the toe. | exists |
| `platform-boots` | Chunky lug-soled boot on a thick slab sole raising the whole foot. | exists |
| `wedges` | Ankle-strapped shoe on a continuous solid wedge sole that rises from the toe to the heel with no gap beneath the arch. | **new** |

**Stage — 2, both exist**

| Family | Stages | Silhouette |
|---|---|---|
| `booties` | newborn | Soft rounded slipper-socks gathered at the ankle, no sole definition. |
| `comfort-shoes` | elder | Wide soft-topped shoe with a broad hook-and-loop strap and a cushioned sole. |

> **Three existing families are redrawn by this expansion, not renamed.** `dress-shoes` moves
> toward the loafer read its description already permitted, so it stops colliding with
> `ballet-flats` and stops leaving `oxfords` doing all the formal work. `sandals` gains a closed
> heel counter and an ankle buckle so its straps resolve into a sandal rather than a third slide.
> `mary-janes` keeps a chunky round toe with a small heel and a clear instep strap so
> `ballet-flats` — flat, strapless, scooped low — reads apart from it. The family keys and the
> broad reads are unchanged; only the drawn outline changes.
>
> `oxfords` on a toddler get a hook-and-loop strap where the lacing would be. See §3.0.

### 2.9 costume — 5 Core + 34 Growing + 5 Older = 44 families

**Costume art must stay below the bundle's shoulder line minus 8px.** The costume layer draws
above the face and the front hair, so a mask, cowl, helmet, beak, muzzle or hood-worn-up erases
the character's features. There is no workaround inside the slot. **The per-bundle ceiling table
is in `docs/ASSET_CONTRACT.md` under "The costume face ceiling" — copy your bundle's number into
an XML comment at the top of your file before you draw anything.**

Express a creature or a role through the **body** — tail, belly panel, dorsal ridge, wings, paw
cuffs, pteruges, a strip skirt, a shaggy hem. Three sanctioned resolutions, used throughout this
list: push the identity down into the body; draw a hood **worn down** as a fabric roll behind the
neck; or author the head half as a companion `headwear` family (§4.2), which draws at z 100 on
the head anchor where it belongs.

Every costume declares `data-hides="top,bottom,shoes"`.

**Re-read §0.3 and the contract's "Trademark guardrails" before drawing any of these. Applied
graphics are effectively banned in this slot** — a centred chest motif on a heroic costume is an
emblem, and an emblem is the trademark problem.

**Core (all 12 bundles) — 5, all exist**

| Family | Silhouette |
|---|---|
| `web-runner` | Full bodysuit with a raised collar and a geometric lattice over torso and legs. **No web motif, no red-and-blue, no chest emblem.** |
| `storm-herald` | Sleeveless armoured tunic with a shoulder mantle and a short cape, wide belt. **No emblem, no red-and-blue.** |
| `caped-hero` | Fitted bodysuit with a long shoulder-fastened cape and a wide belt; **plain chest, no insignia of any kind.** |
| `dino` | Rounded belly-panel bodysuit with a ridged dorsal crest and a thick tapering tail. |
| `astronaut` | Bulky sealed suit with a chest control panel, ribbed joints and a soft neck ring. No helmet. |

**Growing (toddler → elder, both bodies) — 34**

*Creature and occupational — 8, all exist*

| Family | Silhouette |
|---|---|
| `dragon` | Scaled bodysuit with a ridged dorsal crest down the back and a thick tapering tail; angular and plated, wing stubs at the shoulder. |
| `bee` | Rounded banded body with a plush striped abdomen and two rounded wings behind the shoulders. |
| `mermaid` | Scaled tail from the waist down flaring into a fluke at the ground line; shell bodice. |
| `knight` | Plated tabard with rounded shoulder pauldrons over a mail-look body, belted at the waist. |
| `wizard` | Full-length robe flaring from the shoulders with wide draped sleeves and a scattered star surface. |
| `chef` | Double-breasted jacket with a knotted neckerchief and a long waist apron. |
| `medic` | V-neck scrub tunic and drawstring trousers with a chest patch pocket and a lanyard. |
| `firefighter` | Heavy turnout coat with two horizontal reflective bands and a high storm collar. |

*Original heroic archetypes — 5, all new. Roles, never people.*

| Family | Silhouette |
|---|---|
| `speedster` | Skin-close sleeveless bodysuit with deep-scooped armholes and a high closed neck, ankle hem, and a pair of swept fin-vanes standing off the outer calf of each leg. |
| `strongarm` | Heavy sleeveless harness-vest with a broad flat plate yoke across each shoulder, open down both sides and cross-laced from armpit to waist, over a wide buckled belt and full-length straight trousers with a turned cuff. |
| `shadow-agent` | Asymmetric wrap-front bodysuit crossing right over left to a low fastening at one hip, one long sleeve and one bare arm with a wide wrist wrap, ankle hem, and a narrow half-cape hanging from the single covered shoulder to the calf. |
| `ranger` | Sleeveless hooded jerkin worn open over a long-sleeved under-layer, the hood pooled in a thick roll at the nape, a diagonal quiver strap across the chest, a wide bracer on one forearm, and a hem split into two tails at mid-thigh over close trousers. |
| `sky-glider` | Fitted ankle-length bodysuit with a broad fabric membrane stretched from each wrist to the hip and a third membrane spanning between the knees, so the standing figure reads as a single wide triangle from shoulder to ankle; rib seams fan across each membrane. |

*Greek — 5, all new*

| Family | Silhouette |
|---|---|
| `chiton` | Ankle-length draped tube fastened along the top of both arms by a row of five or six small round pins, so the cloth falls in a scalloped pseudo-sleeve to the elbow; belted twice, once under the bust and once at the waist, with a bloused fold spilling over the upper belt. |
| `peplos` | Sleeveless rectangle pinned at each shoulder by one large pin, with a deep overfold hanging to the waist and reading as a second horizontal hem, belted over the fold, and open down one whole side with a vertical slit from hem to hip; ankle hem, bare arms. |
| `winged-messenger` | Short single-shoulder tunic pinned at one shoulder only, leaving the other shoulder and arm entirely bare, hem at mid-thigh; a rectangular mantle pinned at the right shoulder with a single round fibula and swinging back and out; winged cuffs at both ankles. |
| `shield-warrior` | Long-sleeved close tunic to mid-thigh worn over narrow full-length trousers tucked into soft ankle boots, with a crescent shield slung flat across the back so a curved crescent edge shows past each hip, and a wide diagonal baldric. |
| `satyr` | Bare-chested above a shaggy pelt that begins at the waist in a deeply lobed, irregular horizontal edge and covers both legs to the ankle in a bumpy, uneven outline; a long horse tail falling behind from the small of the back; an animal skin knotted over one shoulder and hanging to the opposite hip. |

*Norse — 4, all new*

| Family | Silhouette |
|---|---|
| `apron-dress` | Ankle-length long-sleeved underdress beneath a shorter sleeveless woollen overdress hung from two short front straps that meet a pair of domed oval brooches at the collarbone, with a swag of beads strung between the brooches and a small cluster of tools on a chain at one hip; the overdress hem at mid-calf leaves a clear band of underdress showing beneath it. |
| `berserker` | Sleeveless shaggy pelt jerkin worn open over a long-sleeved under-tunic, its hem falling to mid-thigh in a deeply lobed irregular edge, cinched by a wide leather belt with a knife and pouch hanging from it, over close trousers cross-bound from knee to ankle with leg wraps. |
| `jarl` | Knee-length fitted wool tunic with a keyhole neck and long sleeves rucked past the wrist, deep woven trim bands at neck, cuff and hem, over narrow trousers; a rectangular cloak worn offset over the left shoulder only, leaving the right arm entirely free, and pinned at the right shoulder with a single ring brooch. |
| `frost-giant` | Bulky closed knee-length overcoat with a thick shaggy shoulder collar, chest and forearms crusted with angular rime plates that jut outward from the outline in irregular spikes, and a hem cut into uneven downward-pointing icicle teeth over thickly wrapped legs. |

*Egyptian — 2, both new*

| Family | Silhouette |
|---|---|
| `pharaonic` | Finely pleated linen kilt to the knee with a stiff triangular front apron standing out flat from the body, bare torso, a broad flat semicircular collar covering both shoulders and the upper chest, wide plain armlets above each elbow, and a narrow beaded belt. |
| `mummy` | Whole body covered in overlapping wrapped bandage strips running in alternating diagonals, arms and legs bound separately to the wrist and ankle, with four or five ragged loose ends trailing free from the forearm, hip and calf; no closure and no fastening anywhere. |

*Comedy and novelty — 10, all new*

| Family | Silhouette |
|---|---|
| `jester` | A boxy doublet over close hose, its hip hem cut into four or five deep pointed tabs, each tab ending in a small round bell; the sleeve cuffs are cut into the same points, with a bell at each. |
| `harlequin` | A skin-close one-piece from a narrow standing collar to the ankle, with a single horizontal waist seam and tapered wrists and ankles; a small soft gathered ruff at the throat. |
| `clown` | A hugely oversized closed romper — dropped shoulders, sleeves and legs ballooning to gathered cuffs at wrist and ankle — with a deep gathered ruff at the neck and three oversized pom-pom buttons in a vertical line down the centre front. |
| `pierrot` | A loose straight blouse to the hip with wide three-quarter bell sleeves and a large flat frilled disc collaret lying on the shoulders, over very wide gathered pantaloons falling in a straight column to the ankle. |
| `mime` | A close boat-neck long-sleeve banded body under two narrow braces, tucked into high-waisted straight trousers cropped clear above the ankle, with a cuff band at each wrist reading as a glove edge. |
| `critter-onesie` | A thick plush all-in-one with a full-length centre zip, a contrast belly panel, bulky cuffed wrists and ankles, a short round tail at the hip, and a soft hood lying flat down across the shoulders. |
| `food-costume` | One large convex slab hung free from two narrow shoulder straps, covering torso to mid-thigh, with the arms and legs entirely outside it, and a small stalk-and-leaf finial standing at the top edge. |
| `inflatable-suit` | A near-spherical body from armpit to knee, with narrow ribbed tube arms held out away from the body at about 45° and narrow ribbed tube legs, gathered to a tight neck ring; a small round fan pod at the waist. |
| `oversized-suit` | An open-front lapelled jacket several sizes too large — shoulders projecting well outside the body, sleeves swallowing the hands, a single enormous button at the waist, hem at mid-calf — over trousers that puddle in folds at the ground line. |
| `disguise-coat` | A long straight over-wide coat buttoned to the throat with the wide collar turned up around the jaw line, a tie belt knotted at the front, hem at mid-calf, and no hands visible — the sleeves end in pocket openings. |

**Older (teen → elder, both bodies) — 5, all new**

| Family | Silhouette |
|---|---|
| `exo-frame` | Segmented hard-shell exosuit — one moulded chest plate, ring-jointed shoulder caps, forearm gauntlets and separate thigh and shin plates, each shell divided from the next by a visible narrow band of dark under-layer at every joint. |
| `hoplite` | Sleeveless moulded cuirass narrowing sharply at the waist, with two stiff shoulder flaps folded forward from the back and laced down to the chest, a skirt of eight to ten separate overlapping rectangular strips at the hip with visible gaps between them, and a hard greave plate down each shin. |
| `gorgon` | Sleeveless close column dress with a high plain neckline, whose hem breaks at mid-calf into four thick tapering serpent coils that curl outward and rest splayed on the ground line; a wide belt of interlaced snakes at the waist. |
| `valkyrie` | Knee-length sleeveless mail shirt split front and back for riding, over a long-sleeved underdress to the ankle, with a short shoulder cape of overlapping leaf-shaped plumes lying flat across the upper back and a broad belt with a round shield slung behind so a disc edge shows past one hip. |
| `seeress` | Full-length open-fronted mantle closed by a single strap across the chest, its hem weighted by a band of small set stones, over a long straight underdress; a flat fur collar lying across both shoulders, deep fur-turned cuffs, and a linked charm belt at the waist with one large pouch hanging from it and tall laced boots ending in heavy round knobs. |

**Why those five are Older.** Every one is identified by a repeated fine rhythm that does not
survive a toddler torso at thumbnail size: `exo-frame`'s joint gaps, `hoplite`'s eight-to-ten
strip skirt, `gorgon`'s four interlaced belt snakes and four hem coils (also the family most
likely to frighten a very young player), `valkyrie`'s stacked mail-and-plume textures, `seeress`'s
dense list of small elements. The toddler torso is 96×104 canvas units against the adult's
120×160 — about 16 device pixels of torso height at a 64px thumbnail against 26. Draw them where
they can be seen.

**Pairs in this slot that will collide if you are careless, and how they are separated.**

| Pair | Separated by |
|---|---|
| `dino` / `dragon` | volume (rounded soft vs angular plated) + shoulder (dragon carries wing stubs) |
| `satyr` / `berserker` | hem (shag to the ankle vs thigh jerkin over trousers) + shoulder (one knotted skin vs full sleeveless jerkin) |
| `berserker` / `frost-giant` | volume (soft shaggy lobes vs hard angular spikes) + hem (lobed thigh edge vs icicle teeth at the knee) |
| `harlequin` / `web-runner` | volume (waist seam, softer limb taper) + closure (ruff and waist seam break the suit into three regions vs one unbroken lattice) — **the closest pair in the slot; check it on the contact sheet** |
| `clown` / `pierrot` | shoulder (dropped vs draped bell sleeve) + volume (gathered barrel widest at the hip vs straight column widest at the shoulder) |
| `oversized-suit` / `disguise-coat` | closure (open-fronted vs belted and closed to the throat) + volume (wide sagging boxy vs straight narrow column) |
| `chiton` / `peplos` / `winged-messenger` | pin count and position + hem; the fastening point *is* the axis in this group |
| `hoplite` / `pharaonic` | volume (moulded 3D cuirass vs flat drape with a hard triangular projection) + shoulder (forward-folded flaps vs a wide flat disc collar) |

**Drawing the shag.** `satyr` and `berserker` both need it, and it obeys the hair rule: **build
the texture into the silhouette path, not on top of it.** Small overlapping lobes of unequal size
along the outer contour. A smooth leg with squiggles drawn inside it is a failed satyr, in exactly
the way a smooth-contoured coily bob is a failed bob.

**`satyr` correctness note.** Horse tail and horse ears, not goat — goat legs and horns are the
Roman faun. And classical satyrs are nude with exaggerated genitalia; **we are drawing a
children's dress-up satyr** — pelt from the waist down, skin over the shoulder, nothing else. Say
so in the file comment so the next agent does not "correct" it back toward the source.

**`mummy` cultural note.** Keep the family key `mummy` because it is the retail category name the
picker needs to be findable under, but set `data-name` to **"Bandage Wrap"**, and draw cloth only
— no exposed remains, no skull, no decay, no green pallor. No wrapped head and no face bandages;
the neckline stops at the ceiling and the character's face is fully visible above a wrapped collar.

**`pharaonic` cultural note.** In scope because pharaonic Egypt is a historical period with no
living community whose religious identity is at stake. **Do not draw a specific identifiable
ruler** — no cartouche, no crook-and-flail, no uraeus — and do not draw the "glamour-Cleopatra"
version. This is a knee-length linen kilt and a collar, drawn with the same matter-of-factness as
the `chef`.

**Do not draw props.** There is no prop or hand anchor in this project. No staff for `seeress`, no
bow for `ranger`, no batte for `harlequin`, no cane for `oversized-suit`. A prop authored into a
costume will not align with the hand on any bundle, and scenery-instead-of-worn-item is the
documented failure mode of this whole product category.

---

## 3. Bundle rosters — your exact file list

Each line is `slot (count): family · family · …`. Every family becomes one file at
`src/assets/catalog/<stage>/<bodyType>/<slot>/<family>.svg`. **Existing** counts are files that
already exist on disk; **new** is what you author in this pass.

### 3.0 What changes with age, besides scale

The family's silhouette description is binding in every bundle. These change; the axis values do
not.

**Fastening is developmental, not stylistic.**

| Stage | Fastening you draw |
|---|---|
| toddler | Elastic waists, drawcords with fat aglets, one or two oversized front buttons, hook-and-loop tabs, poppers along a shoulder or gusset. **No laces, no belts, no small button lines.** `oxfords` on a toddler get a hook-and-loop strap where the lacing would be. |
| teen | Everything, and more of it — visible zip pulls, double drawcords, multiple pockets, a stacked buckle. Detail density is highest here on purpose. |
| adult | The garment's own canonical fastening, drawn crisply. This is the reference draft. |
| midage | The same fastening, quieter — fewer pulls, less hardware. |
| elder | Front and side openings in preference to overhead pull-ons wherever the family permits; a broad hook-and-loop strap replacing a lace; an elastic waist replacing a fly; a longer back rise on trousers. |

**Proportion is not scale.** A toddler has no defined waist and a large head, so waistlines ride
up to the lower ribs and neck openings are proportionally much wider — a toddler `kurta` must
clear a head that is a third of the body height. An elder's shoulder line drops and narrows and
the upper back rounds slightly, so set-in sleeves sit further inboard and sleeve heads soften.

**Hem placement is to a landmark, never to a pixel count.** "Knee" means the *bundle's own* knee
anchor. A toddler `kurta` at mid-thigh and an adult `kurta` at the knee are the same family
correctly interpreted; a toddler `kurta` at the adult's absolute y-value is a nightgown.

**Volume relative to the body.** Toddler reads one size loose with turned-up cuffs and extra ease
over a nappy at the hip. Teen deliberately exaggerates. Midage softens the waist and upper arm and
lengthens hems slightly. Elder is looser through the upper arm and body, longer at the hem, with
fewer cropped hems.

**Detail density.** Toddler: one large motif, big trim, nothing fiddly. Teen: the busiest — this
is where applied graphics and pattern belong. Adult: restrained and structural. Midage and elder:
trim over graphic, texture over print.

**What must NOT differ.** Do not make the elder version of a family frumpy, drab or shapeless.
`flares`, `dashiki`, `ball-gown` and `hoplite` on a grandparent are the same garments. Do not
withhold a family from a stage because it "seems" too young or too old — tier membership is
decided in §2 and nowhere else. Do not change the axis values: if your toddler `culottes` end up
mid-thigh and narrow, you have drawn shorts.

---

### 3.1 newborn/female — 73 families (73 exist, **0 new**)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (15):** *core 14* buzz · curls · afro · side-part · pixie · bob · ponytail · bun · long-waves · braids · top-tuft · pigtails · cornrows · fringe-bowl — *stage* bald-fuzz
- **beard (0):** **none. Do not create the directory.**
- **top (9):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *stage* wrap-vest
- **bottom (10):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *stage* nappy · knit-leggings
- **onepiece (9):** *core 4* sundress · jumpsuit · party-dress · romper — *stage* sleepsuit · swaddle · bodysuit · knot-gown · sleep-sack
- **shoes (6):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *stage* booties
- **costume (5):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut

**Bundle total authored by this agent: 0 new files.** That is the correct outcome — see §1.1.

### 3.2 newborn/male — 73 families (73 exist, **0 new**)

Identical roster and identical zero new-file list to §3.1, drawn to the `newborn-male` body spec.
`skirt`, `pleated`, `sundress` and `party-dress` already exist here; see §0.1.

**Bundle total authored by this agent: 0 new files.**

---

### 3.3 toddler/female — 192 families (116 exist, **76 new**) + the `toddler` headwear pool (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (37):** *core 14* buzz · curls · afro · side-part · pixie · bob · ponytail · bun · long-waves · braids · top-tuft · pigtails · cornrows · fringe-bowl — *growing 23* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out · half-up · braided-crown · curtain-long · high-puff · **taper-fade** · **waves-360** · **man-bun** · **mop-shag** · **undercut-sweep** · **frohawk** · **senegalese-twists** · **loc-bob** · **fulani-braids** · **mullet** · **hime-cut** · **single-braid** · **smooth-scalp**
- **beard (0):** **none. Do not create the directory.**
- **top (34):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 26* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho · wrap-top · puff-sleeve-blouse · crop-top · camisole · **henley** · **flannel-overshirt** · **ribbed-vest** · **bomber** · **long-coat** · **duster-cardigan** · **smock-top** · **bolero** · **tabard** · **swim-top** · **kurta** · **dashiki** · **jeogori** · **haori**
- **bottom (26):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 17* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt · **capris** · **culottes** · **flares** · **swim-bottoms** · **shalwar** · **chima** · **sarong** · **hoop-skirt** — *stage* tutu
- **onepiece (20):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 15* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan · **ball-gown** · **nightgown** · **sleep-onesie** · **unitard** · **thobe** · **yukata** · **ao-dai** · **bridal-gown** · **sack-gown** — *stage* puddle-suit
- **shoes (17):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 12* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots · **tall-boots** · **ballet-flats** · **slides** · **oxfords** · **cleats** · **ice-skates**
- **costume (39):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 34* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter · **speedster** · **strongarm** · **shadow-agent** · **ranger** · **sky-glider** · **chiton** · **peplos** · **winged-messenger** · **shield-warrior** · **satyr** · **apron-dress** · **berserker** · **jarl** · **frost-giant** · **pharaonic** · **mummy** · **jester** · **harlequin** · **clown** · **pierrot** · **mime** · **critter-onesie** · **food-costume** · **inflatable-suit** · **oversized-suit** · **disguise-coat**

*New here (76):* hair 13 — taper-fade · waves-360 · man-bun · mop-shag · undercut-sweep ·
frohawk · senegalese-twists · loc-bob · fulani-braids · mullet · hime-cut · single-braid ·
smooth-scalp. top 14 — henley · flannel-overshirt · ribbed-vest · bomber · long-coat ·
duster-cardigan · smock-top · bolero · tabard · swim-top · kurta · dashiki · jeogori · haori.
bottom 8. onepiece 9. shoes 6. costume 26.

*Plus 8 new files in the shared `accessories/toddler/headwear/` pool — see §4.*
**Bundle total authored by this agent: 84 new files (76 + 8 pool).**

### 3.4 toddler/male — 192 families (117 exist, **75 new**) + the `toddler` glasses/necklace pools (§4)

Roster is **identical to §3.3** — every family named there, drawn to the `toddler-male` body spec.
Read §3.3's lists as your own; the only difference is which families are new to this body.

*New here (75):* hair 12 — half-up · braided-crown · curtain-long · high-puff · frohawk ·
senegalese-twists · loc-bob · fulani-braids · mullet · hime-cut · single-braid · smooth-scalp.
top 14 — wrap-top · puff-sleeve-blouse · crop-top · camisole · long-coat · duster-cardigan ·
smock-top · bolero · tabard · swim-top · kurta · dashiki · jeogori · haori. bottom 8. onepiece 9.
shoes 6. costume 26.

> `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `hoop-skirt`, `chima`,
> `sarong`, `tutu`, `sundress`, `party-dress`, `shirt-dress`, `pinafore`, `ball-gown`,
> `bridal-gown`, `sack-gown`, `camisole`, `crop-top`, `wrap-top`, `puff-sleeve-blouse`, `jeogori`
> and `apron-dress` are authored on this body too. See §0.1 — there are no aisles.

*Plus 2 new files across `accessories/toddler/{glasses,necklace}/` — see §4.*
**Bundle total authored by this agent: 77 new files (75 + 2 pool).**

---

### 3.5 teen/female — 225 families (121 exist, **104 new**) + the `teen` headwear pool (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (39):** *core 14* buzz · curls · afro · side-part · pixie · bob · ponytail · bun · long-waves · braids · top-tuft · pigtails · cornrows · fringe-bowl — *growing 23* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out · half-up · braided-crown · curtain-long · high-puff · **taper-fade** · **waves-360** · **man-bun** · **mop-shag** · **undercut-sweep** · **frohawk** · **senegalese-twists** · **loc-bob** · **fulani-braids** · **mullet** · **hime-cut** · **single-braid** · **smooth-scalp** — *older 2* **crown-thinning** · **fine-thinning**
- **beard (12), ALL NEW:** **stubble** · **moustache** · **handlebar** · **walrus** · **goatee** · **circle-beard** · **chin-strap** · **chin-curtain** · **mutton-chops** · **line-up** · **full-beard** · **long-beard**
- **top (38):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 26* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho · wrap-top · puff-sleeve-blouse · crop-top · camisole · **henley** · **flannel-overshirt** · **ribbed-vest** · **bomber** · **long-coat** · **duster-cardigan** · **smock-top** · **bolero** · **tabard** · **swim-top** · **kurta** · **dashiki** · **jeogori** · **haori** — *older 4* blazer · waistcoat · **tailcoat** · **dinner-jacket**
- **bottom (26):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 17* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt · **capris** · **culottes** · **flares** · **swim-bottoms** · **shalwar** · **chima** · **sarong** · **hoop-skirt** — *stage* tutu
- **onepiece (27):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 15* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan · **ball-gown** · **nightgown** · **sleep-onesie** · **unitard** · **thobe** · **yukata** · **ao-dai** · **bridal-gown** · **sack-gown** — *older 8* maxi-dress · wrap-dress · **sari** · **abaya** · **bustle-gown** · **empire-gown** · **flapper-dress** · **flare-jumpsuit**
- **shoes (20):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 12* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots · **tall-boots** · **ballet-flats** · **slides** · **oxfords** · **cleats** · **ice-skates** — *older 3* heels · platform-boots · **wedges**
- **costume (44):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 34* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter · **speedster** · **strongarm** · **shadow-agent** · **ranger** · **sky-glider** · **chiton** · **peplos** · **winged-messenger** · **shield-warrior** · **satyr** · **apron-dress** · **berserker** · **jarl** · **frost-giant** · **pharaonic** · **mummy** · **jester** · **harlequin** · **clown** · **pierrot** · **mime** · **critter-onesie** · **food-costume** · **inflatable-suit** · **oversized-suit** · **disguise-coat** — *older 5* **exo-frame** · **hoplite** · **gorgon** · **valkyrie** · **seeress**

*New here (104):* hair 15 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31.

*Plus 8 new files in `accessories/teen/headwear/` — see §4.*
**Bundle total authored by this agent: 112 new files (104 + 8 pool).**

### 3.6 teen/male — 225 families (122 exist, **103 new**) + the `teen` glasses/necklace pools (§4)

Roster is **identical to §3.5**, drawn to the `teen-male` body spec.

*New here (103):* hair 14 (half-up · braided-crown · curtain-long · high-puff · frohawk ·
senegalese-twists · loc-bob · fulani-braids · mullet · hime-cut · single-braid · smooth-scalp ·
crown-thinning · fine-thinning) · beard 12 · top 16 (wrap-top · puff-sleeve-blouse · crop-top ·
camisole · long-coat · duster-cardigan · smock-top · bolero · tabard · swim-top · kurta · dashiki ·
jeogori · haori · tailcoat · dinner-jacket) · bottom 8 · onepiece 15 · shoes 7 · costume 31.

> Every skirt, every gown, `camisole`, `crop-top`, `wrap-top`, `puff-sleeve-blouse`, `jeogori`,
> `sari`, `apron-dress`, `valkyrie` and `gorgon` are authored on this body too. See §0.1.

*Plus 2 new files across `accessories/teen/{glasses,necklace}/` — see §4.*
**Bundle total authored by this agent: 105 new files (103 + 2 pool).**

---

### 3.7 adult/female — 224 families (120 exist, **104 new**) + the `adult` headwear pool (§4)

Roster is **identical to §3.5** with one difference: **no `tutu`**, so `bottom` is 25 rather
than 26.

- **eyes (8) · brows (5) · mouth (6):** as §3.5
- **hair (39):** as §3.5
- **beard (12), ALL NEW:** as §3.5
- **top (38):** as §3.5
- **bottom (25):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 17* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt · **capris** · **culottes** · **flares** · **swim-bottoms** · **shalwar** · **chima** · **sarong** · **hoop-skirt**
- **onepiece (27) · shoes (20) · costume (44):** as §3.5

*New here (104):* hair 15 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31.

*Plus 8 new files in `accessories/adult/headwear/` — see §4.*
**Bundle total authored by this agent: 112 new files (104 + 8 pool).**

### 3.8 adult/male — 224 families (121 exist, **103 new**) + the `adult` glasses/necklace pools (§4)

Roster is **identical to §3.7**, drawn to the `adult-male` body spec.

*New here (103):* hair 14 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31 —
the same lists as §3.6.

> Every skirt, every gown, `camisole`, `crop-top`, `wrap-top`, `puff-sleeve-blouse`, `jeogori`,
> `sari`, `apron-dress`, `valkyrie` and `gorgon` are authored on this body too. See §0.1.

*Plus 2 new files across `accessories/adult/{glasses,necklace}/` — see §4.*
**Bundle total authored by this agent: 105 new files (103 + 2 pool).**

---

### 3.9 midage/female — 224 families (120 exist, **104 new**)

Roster is **identical to §3.7**. No accessory pool.

*New here (104):* hair 15 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31.

**Bundle total authored by this agent: 104 new files.**

### 3.10 midage/male — 224 families (121 exist, **103 new**)

Roster is **identical to §3.7**, drawn to the `midage-male` body spec. No accessory pool.

*New here (103):* hair 14 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31.

> Every skirt and every gown are authored on this body too. See §0.1.

**Bundle total authored by this agent: 103 new files.**

---

### 3.11 elder/female — 226 families (122 exist, **104 new**)

Roster is **identical to §3.7** plus the two elder Stage families.

- **eyes (8) · brows (5) · mouth (6):** as §3.5
- **hair (40):** the 39 of §3.5 — *plus stage* soft-set
- **beard (12), ALL NEW:** as §3.5. **An elder character with `stubble`, `wispy` growth or a
  `long-beard` is an ordinary asset on this body. Draw all twelve.**
- **top (38) · bottom (25) · onepiece (27):** as §3.7
- **shoes (21):** the 20 of §3.7 — *plus stage* comfort-shoes
- **costume (44):** as §3.5

*New here (104):* hair 15 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31.

`cardigan`, `duster-cardigan`, `robe`, `waistcoat`, `poncho`, `long-coat`, `nightgown`,
`comfort-shoes`, plus `reading-half` and `bonnet` from the accessory pools, are the families that
*read* as older. Only `soft-set` and `comfort-shoes` are elder-*only* — everything else is
ordinary wardrobe any bundle can wear, and nothing here gets drawn frumpier because of the stage.

**Bundle total authored by this agent: 104 new files.**

### 3.12 elder/male — 226 families (123 exist, **103 new**)

Roster is **identical to §3.11**, drawn to the `elder-male` body spec.

*New here (103):* hair 14 · beard 12 · top 16 · bottom 8 · onepiece 15 · shoes 7 · costume 31.

> Every skirt and every gown are authored on this body too. See §0.1.

**Bundle total authored by this agent: 103 new files.**

---

## 4. Accessory pools — authored once per head-size class

`glasses`, `headwear`, `earrings` and `necklace` are **not** per bundle. They are authored once
for each of the three head-size classes (`toddler`, `teen`, `adult`) at
`src/assets/accessories/<class>/<slot>/<family>.svg`, and mapped onto the target head by a
uniform circle-to-circle transform.

**Because of that transform, keep head-mounted art within about 1.3 head radii of the head
centre.** On an adult bundle `head.rx = 57` and `head.cy = 91`, so the budget is a circle centred
at `(200, 91)` with radius ≈ **74 canvas units** — and since the scalp is at `y = 32`, that leaves
only about **15 units of headroom above the head**, roughly 1.6 screen pixels at tray size.
Anything that drapes past the head — a long hijab tail, a shoulder-length wrap end, a trailing
scarf, a cathedral veil, a tall hat crown — scales by the *head* ratio, not the shoulder ratio,
and lands wrong on the bundles whose head-to-torso proportion differs most (newborn, toddler).

**Ownership.** Each class is authored by the agents for the matching stage:

| Pool | headwear (8 new) | glasses + earrings + necklace (2 new) |
|---|---|---|
| `accessories/toddler` | toddler/female agent | toddler/male agent |
| `accessories/teen` | teen/female agent | teen/male agent |
| `accessories/adult` | adult/female agent | adult/male agent |

### 4.1 glasses — 9 families (8 exist, 1 new) × 3 classes = 3 new files

| Family | Silhouette | |
|---|---|---|
| `round` | Two circular lenses on a thin bridge. | exists |
| `square` | Two rectangular lenses with slightly rounded corners. | exists |
| `cat-eye` | Lenses swept up and out to a point at the outer corner. | exists |
| `sport` | Single wide wrap lens band on thick temples. | exists |
| `sunglasses` | Two dark rounded-rectangle lenses on a heavy frame. | exists |
| `reading-half` | Half-moon lenses low on the nose with a chain loop at the temples. | exists |
| `safety-goggles` | Wide sealed lens band on a strap running round the head. | exists |
| `eye-patch` | Single soft oval pad on a diagonal strap. | exists |
| `clown-nose` | A single soft ball centred on the nose, with a faint highlight. | **new** |

> `clown-nose` is not glasses, and neither is `eye-patch` — this slot is the only face anchor we
> have, and the precedent is already set. The cost is real and is stated openly: the slot holds
> one asset, so equipping the nose costs the player their glasses. Ship it anyway; it is the
> single most-requested clown feature and the `clown` costume is designed to stand without it.
> **Paint the ball through a tunable variable, never a hardcoded red.** This is further evidence
> for the `face-mark` slot recorded in §6.

### 4.2 headwear — 26 families (18 exist, 8 new) × 3 classes = 24 new files

Head coverings are ordinary wardrobe. They sit in this one list beside the beanie, in no
special order and under no sub-heading.

| Family | Silhouette | Covers hair | |
|---|---|---|---|
| `beanie` | Close knit dome with a rolled brim band. | partial | exists |
| `cap` | Rounded crown with a stiff curved front peak. | partial | exists |
| `headband` | Narrow band across the crown behind the fringe. | no | exists |
| `sun-hat` | Wide soft brim all round under a shallow crown. | partial | exists |
| `bucket-hat` | Soft downturned brim all round under a flat crown. | no | exists |
| `flat-cap` | Low rounded crown pulled forward to a short stiff peak. | partial | exists |
| `beret` | Soft round flat cap tilted to one side, no brim. | no | exists |
| `bandana` | Triangle of cloth knotted at the back, covering the forehead. | partial | exists |
| `hijab` | Draped scarf covering hair, ears and neck, pinned under the chin. | **yes** | exists |
| `turban` | Wrapped fabric dome with a visible fold line across the front. | **yes** | exists |
| `kufi` | Small brimless rounded cap sitting flat on the crown. | no | exists |
| `kippah` | Small flat disc resting on the back of the crown. | no | exists |
| `headwrap` | High tied wrap with a knotted or fanned crown. | **yes** | exists |
| `bonnet` | Soft gathered satin cap covering the hair to the nape. | **yes** | exists |
| `durag` | Close-fitting wrap tied at the front with long ties trailing behind. | **yes** | exists |
| `flower-crown` | A ring of small blossoms across the hairline. | no | exists |
| `animal-ears` | Slim band with two rounded ears standing up; pairs with the creature costumes. | no | exists |
| `hard-hat` | Domed shell with a short front brim and a chin strap. | partial | exists |
| `laurel-wreath` | Two sprays of paired pointed leaves sweeping back from the brow and meeting over each temple, open at the back of the crown. | no | **new** |
| `attic-helm` | Open-faced rounded cap with hinged cheek pieces swung **up** and back against the sides, and a transverse crest running ear to ear over the crown. | partial | **new** |
| `spangen-cap` | Rounded cap of four riveted panels under a plain brow band, no nasal and no guard of any kind. | partial | **new** |
| `serpent-locks` | A dense mass of short thick snakes radiating outward from the crown in place of hair, heads at the tips, irregular lobed contour. | **yes** | **new** |
| `beast-hood` | An animal skin pushed back off the face, the beast's upper snout and rounded ears sitting on the crown like a cap with the open jaw arching above the brow. | **yes** | **new** |
| `nemes` | Striped headcloth over the crown with two **short** lappets falling in front of the ears and a bound tail behind. | **yes** | **new** |
| `jester-hood` | A close hood over the crown with three soft points — one falling forward over the brow and one to each side — each ending in a small round bell. | **yes** | **new** |
| `veil` | A narrow band at the hairline with a gathered sheer fall behind it, reaching to just past the jaw and no further. | no | **new** |

> **The nine "yes" families must declare `data-hides="hair"`.** `headwear` is in
> `OVERRIDE_SLOTS`, so that attribute is honoured: the hair asset underneath is suppressed
> entirely, front and back, and the covering reads correctly instead of leaving back hair
> hanging out from behind the shoulders. The other seventeen declare `data-hides=""` and stack
> over an unmodified hair silhouette.
>
> A full-coverage headwear asset may also declare `hair1`/`hair2` in its own `data-colors` and
> draw the small amount of hair that should escape at the temples or nape. Those are separate
> variables from the hidden hair asset's, so the player controls them independently.
>
> **`headwear` draws at z 100, above the face.** These are open-faced too: no nasal bar, no cheek
> plate over the cheekbone, no visor, no beak, no muzzle. `attic-helm`'s cheek pieces are drawn
> swung **up**. `beast-hood` is drawn **pushed back**, snout on the crown like a cap.
>
> **`veil` is a short crown veil, not a cathedral one** — the transform budget is ~74 canvas units
> from the head centre and a shoulder-length fall breaks it. Say so in your file comment so nobody
> "fixes" it later. **`nemes`' lappets end above the collarbone**, for the same reason.
>
> **A beard is never hidden by headwear.** A hijab or a turban does not cover a chin. Full-coverage
> families hide `hair` only.

**Explicitly not proposed**, so nobody re-derives them: a Corinthian helmet or a Gjermundbu
spectacle guard (both cover the face; `attic-helm` and `spangen-cap` are the open alternatives);
any winged or horned helm (19th-century Romantic invention, and a trademark tell besides); a
petasos or a broad-brimmed wanderer's hat (both too close to `sun-hat`); a Phrygian cap (too close
to `beanie` and `bandana`); a lambskin hood (too close to `bonnet`); a **top hat** (needs a 60–70
unit crown against ~15 units of headroom — deferred as a transform conversation, not an art task);
a **tiara** (silhouette-identical to `flower-crown`; the difference is entirely surface); and a
**clown wig** (the frizz-and-bald-crown silhouette is the signature of specific still-trading
characters and cannot be made generic).

### 4.3 earrings — 7 families, all exist, 0 new

This slot is an **ear anchor**, which makes it the right home for hearing technology at zero
engineering cost. Draw these matter-of-factly, in the same style and with the same care as the
jewellery. They are wardrobe, not medical illustration.

| Family | Silhouette |
|---|---|
| `studs` | A single small dot at the lobe. |
| `hoops` | An open ring hanging from the lobe. |
| `drops` | A short stem with a shaped pendant below the lobe. |
| `hearing-aid` | Behind-the-ear body with a thin clear tube hooking into the ear canal. |
| `cochlear-implant` | Behind-the-ear processor with a round coil disc on the side of the head and a fine lead. |
| `hearing-aid-studs` | The same behind-the-ear body worn together with a small stud. |
| `ear-cuff` | A small band hugging the upper rim of the ear. |

> `hearing-aid-studs` exists only because the slot holds one asset, so a player would otherwise
> have to choose between hearing aids and earrings. It is a workaround for a missing `ear-tech`
> slot, not a design.

### 4.4 necklace — 8 families (7 exist, 1 new) × 3 classes = 3 new files

Neck anchor, drawn above `top` and `costume`. Same 1.3-head-radii limit — a long scarf drape will
not scale correctly across bundles, so keep the ends short.

| Family | Silhouette | |
|---|---|---|
| `pendant` | A fine chain with a single shaped drop at the throat. | exists |
| `beads` | An even row of round beads sitting on the collarbone. | exists |
| `choker` | A close flat band at the base of the neck. | exists |
| `scarf` | Soft loop around the neck with two short hanging ends. | exists |
| `bib` | Rounded fabric bib fastened at the neck, covering the upper chest. | exists |
| `bow-tie` | Small symmetric bow at the throat. | exists |
| `lanyard` | Thin cord loop with a small rectangular card hanging at the chest. | exists |
| `ruff` | A wide flat pleated disc encircling the neck, projecting evenly on all sides, clearing the neck by 45–70 canvas units. | **new** |

> `ruff` is the best value per file in this expansion: because `necklace` draws **above** `top`
> and `costume`, three files make every garment in the catalogue wearable in a comedy register.
> Historically the ruff was a detachable item laundered separately, so the slot is also correct.
>
> **Authoring warning:** `clown`, `harlequin` and `pierrot` all carry a built-in neck treatment.
> **Draw those built-in ones low and shallow (≤25 units of projection)** so a `ruff` layered over
> them reads as one bigger ruff rather than two colliding ones.

---

## 5. Totals

### 5.1 By slot

| Slot | Existing | New | After |
|---|---|---|---|
| eyes · brows · mouth | 228 | 0 | 228 |
| hair | 277 | 141 | 418 |
| **beard** | 0 | **96** | 96 |
| top | 234 | 156 | 390 |
| bottom | 194 | 80 | 274 |
| onepiece | 136 | 138 | 274 |
| shoes | 140 | 68 | 208 |
| costume | 140 | 300 | 440 |
| accessory pools (×3 classes) | 120 | 30 | 150 |
| **Total** | **1,469** | **1,009** | **2,478** |

Bodies, props and backdrops (42 files) are unchanged and are not part of this expansion.

### 5.2 By bundle

Counting the accessory pool each agent owns.

| Bundle | Families in bundle | New files authored |
|---|---|---|
| newborn/female | 73 | **0** |
| newborn/male | 73 | **0** |
| toddler/female | 192 | 84 (76 + 8 pool) |
| toddler/male | 192 | 77 (75 + 2 pool) |
| teen/female | 225 | 112 (104 + 8 pool) |
| teen/male | 225 | 105 (103 + 2 pool) |
| adult/female | 224 | 112 (104 + 8 pool) |
| adult/male | 224 | 105 (103 + 2 pool) |
| midage/female | 224 | 104 |
| midage/male | 224 | 103 |
| elder/female | 226 | 104 |
| elder/male | 226 | 103 |
| **Total** | | **1,009** |

### 5.3 Where the 1,009 comes from

| Work | Files |
|---|---|
| De-gendering the nine locked `hair` families (no new silhouettes) | 45 |
| De-gendering the eight locked `top` families (no new silhouettes) | 40 |
| New `hair` families (10) | 96 |
| New `beard` slot (12 families × 8 bundles) | 96 |
| New `top` families (12) | 116 |
| New `bottom` families (8) | 80 |
| New `onepiece` families (15) | 138 |
| New `shoes` families (7) | 68 |
| New `costume` families (31) | 300 |
| New pool families (10 across headwear/glasses/necklace) | 30 |
| **Total** | **1,009** |

**85 of those 1,009 files add no new silhouette at all** — they are the de-gendering, and they
exist so that seventeen existing silhouettes are reachable by twice as many characters. Do not cut
them; trimming the unlock leaves the aisle half-standing, which is worse than either end state.

**105 new distinct families** — 10 hair, 12 beard, 12 top, 8 bottom, 15 onepiece, 7 shoes,
31 costume, 10 pool — taking the catalogue from 183 distinct families to 288.

---

## 6. Families that are proposed but cannot be authored yet

These need an engineering change first and are **deliberately absent from every roster above**.
Do not author them. The change each one needs is recorded in `docs/ASSET_CONTRACT.md`,
"Slots that do not exist yet".

- **face markings** — `freckles`, `vitiligo`, `birthmark`, `blush-cheeks`, `beauty-spot`,
  `laugh-lines`, `scar`, `acne`. Also the whole readable half of a clown and a mime: white face,
  red triangles, painted brows. `clown-nose` in `glasses` (§4.1) is a borrowed slot and is further
  evidence for this one.
- **mobility aids** — `cane`, `forearm-crutches`, `wheelchair`, `power-chair`, `walker`.
- **layered outerwear** — `apron`, and re-homing `long-coat` and `duster-cardigan` from `top`.
  Needs the deferred **`overlayer`** slot. `tabard` is the interim answer for the apron read, and
  the two coats ship in `top` today, which is the correct call given the engine as it stands.
- **hearing technology worn *with* earrings** — the `ear-tech` slot; `hearing-aid-studs` is the
  workaround family.

Facial hair is **no longer on this list**. The `beard` slot exists (§2.4). Note that `sideburns`
— one of the six families the previous revision of this document promised — did **not** ship;
`mutton-chops` is the legible member of that group and the rest are in the deferred list below.

**Deferred but authorable the day someone decides to** — recorded so the list is not re-derived,
not because anything blocks them:

| Slot | Deferred families |
|---|---|
| `hair` | `braided-bob` · `curly-bob` (the strongest Phase 2 candidates in the whole slot) · `braided-fade` · `wolf-cut` · twin buns (blocked on naming) · Sikh `patka` and *payot* (gated on cultural review). **`stitch-cornrows` is not deferred, it is refused** — same silhouette as `cornrows`, different surface, so it is an instance and never a family. |
| `beard` | `coil-beard` (**should lead Phase 2**) · `horseshoe` · `patchy` · `wispy-chin` · `van-dyke` · `friendly-chops` · `ducktail` · `forked` · `braided-beard` · `pencil-moustache`, `soul-patch` and `sideburns` (all below the 40-unit floor) · Sikh rolled-and-tied beard (gated on cultural review). |
| `top`/`onepiece` | `huipil` and `cheongsam` — **excluded, not deferred.** Huipil designs identify a specific community and some communities explicitly prohibit outside use; the loose square-cut tunic read is already served by `dashiki` and `kurta`. Cheongsam's documented modern use is formal and ceremonial rather than everyday; hold for a consultant-reviewed round. |
| `costume` | `celtic-warrior` (deferred — only the torc could be sourced; a `torc` necklace family would deliver most of the value for one-tenth the files). |
| `necklace` | `torc` · `broad-collar`. Cheap and useful; decide separately. |

**Never, under any framing:** war bonnets and any Native American regalia; Mesoamerican eagle- or
jaguar-warrior regalia, including a "generic feathered warrior" softening of it; religious
vestments and ritual garments; face-covering veils; tengu and other yōkai whose identity is living
religious vesture; and any garment whose identity *is* a specific community's woven design —
named-clan tartan setts, particular kente patterns, Adinkra symbols, Māori kōwhaiwhai. The
contract bans surface-defined families; this is the cultural-harm version of the same rule.

**Cultural review gate.** The families named by endonym in §2.5, §2.6 and §2.7 — `kurta`,
`dashiki`, `jeogori`, `haori`, `shalwar`, `chima`, `sarong`, `thobe`, `yukata`, `ao-dai`, `sari`,
`abaya` — are **drawn but held from release** until an expert of that culture has reviewed them.
Draw them as clothes someone wore to the shops, not as museum pieces, with no community-specific
woven motif. That gate applies to shipping, not to authoring: do the art.
