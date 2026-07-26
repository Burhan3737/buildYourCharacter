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
tools that this list assumes you are using.

**How to read this file**

| Section | What it gives you |
|---|---|
| §0 | Two rules that override everything else |
| §1 | The tiers — which bundles author which families |
| §2 | The master list, slot by slot: name · silhouette · tier |
| §3 | **Your exact file list**, one roster per bundle |
| §4 | The accessory pools and who owns them |

---

## 0. Two rules that are not negotiable

### 0.1 There are no aisles

There is no masculine catalogue and no feminine catalogue. **Skirts, dresses, one-pieces, tutus
and pinafores are authored on both body types**, and every asset a bundle authors is equippable
by any character in that bundle. `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`,
`pencil-skirt`, `tutu`, `sundress`, `party-dress`, `shirt-dress`, `pinafore`, `maxi-dress` and
`wrap-dress` are all drawn for male bundles too. This is deliberate, it is the single most
visible inclusivity decision in the catalogue, and it is not up for local reinterpretation.

Two tiers below are labelled **fit-F** and **fit-M**. Those are **fitting and drape** tiers, not
gender tiers. A family sits in one of them only when the garment's *construction* genuinely
depends on the body spec it is drawn against — a `camisole`'s bust shaping, a `ribbed-vest`'s
dropped armhole across a wider shoulder. They mean "this cut was drawn to that body spec", they
never become a UI category, they never gate what a player can wear, and **when in doubt a family
goes in Core or Growing and gets drawn twice**.

The tray shows every asset in the slot for the current bundle, in one undifferentiated list.
Head coverings sit beside the beanie. Hearing aids sit beside the hoop earrings. No sub-tabs, no
"cultural" section, no ordering that puts anything last.

### 0.2 A family is a silhouette, never a surface

If you cannot describe a family in one sentence **without naming a colour or a pattern**, it is
not a family. `stripes` is the catalogue's cautionary tale: a texture that got promoted to a
garment because there was no other axis available, and then got drawn on the `tee` body. It is
grandfathered — the key is load-bearing for stage switching and cannot be removed — and §2.3
gives it a real silhouette. **Nothing like it may ever be added.**

`src/catalog/silhouette.test.ts` enforces the mechanical floor: two assets in the same
`(bundle, slot)` may not be built from the same geometry, and "the same path inflated by 4px" is
the same geometry.

### 0.3 Costumes stay generic

Every costume is an **archetype**, never a specific character from anyone's copyrighted work.
No logos, no emblems, no chest insignia, no drawn lettering, and **no signature
colour-plus-marking combination** — a red-and-blue suit with a web on it is a character
reference however generic the name is. Animal and occupational archetypes are safe because they
are standing retail categories; a named character never is. Cultural dress belongs in `top` and
`onepiece` under its own endonym, never in `costume`.

---

## 1. Tiers — which bundles author a family

The twelve bundles are `<stage>/<bodyType>` for stage ∈ {newborn, toddler, teen, adult, midage,
elder} and bodyType ∈ {female, male}.

| Tier | Authored by | Bundles | Files |
|---|---|---|---|
| **Core** | every bundle | all 12 | 12 |
| **Growing** | toddler · teen · adult · midage · elder, both body types | 10 | 10 |
| **Older** | teen · adult · midage · elder, both body types | 8 | 8 |
| **fit-F** | toddler · teen · adult · midage · elder, **female** spec | 5 | 5 |
| **fit-M** | toddler · teen · adult · midage · elder, **male** spec | 5 | 5 |
| **Stage** | only the named stage(s), both body types | 2 per stage | 2 per stage |
| **Pool** | the 3 head-size classes, not per bundle | — | 3 |

A family with no counterpart in the target bundle degrades gracefully on a stage switch: the
character falls back to the first asset in the slot and keeps its colours. **Core is the common
spine, not a correctness requirement.** That is what makes Growing, Older and Stage safe.

Graduated depth by age is a design decision, not a gap. **A newborn bundle is deliberately much
smaller than an adult one** (73 families against ~120) because a real newborn wardrobe is
one-piece-dominated with almost no separates. Giving a newborn twenty-two tops would rebuild the
current problem in a new shape.

---

## 2. Master list

Existing families are marked *(exists)* — those files are already authored and are not part of
the 800. Everything unmarked is new art.

### 2.1 eyes — Core, 8 families

| Family | Silhouette | |
|---|---|---|
| `round` | Large circular aperture, lid clear of the iris top. | exists |
| `almond` | Narrow tilted oval, outer corner lifted, lid crease visible. | exists |
| `sleepy` | Heavy upper lid covering the top third of the aperture. | exists |
| `wide` | Oversized aperture with sclera visible all round the iris. | exists |
| `happy-arc` | Closed eye drawn as a single upward arc, no aperture at all. | exists |
| `monolid` | Smooth single-fold lid, crease hidden, wide flat lash line. | **new** |
| `hooded` | Upper lid partly covering the crease, short visible lid strip. | **new** |
| `upturned` | Outer corner lifting clearly above the inner corner. | **new** |

### 2.2 brows — Core, 5 families · mouth — Core, 6 families

| Family | Slot | Silhouette | |
|---|---|---|---|
| `soft` | brows | Short, gently curved, tapered at both ends. | exists |
| `straight` | brows | Level bar of even weight, squared ends. | exists |
| `arched` | brows | High peak nearer the outer end, thinning to a point. | exists |
| `thick` | brows | Dense straight-edged brow with a squared inner end. | **new** |
| `thin-arch` | brows | Fine high arch tapering to a point. | **new** |
| `smile` | mouth | Closed upward curve, no aperture. | exists |
| `grin` | mouth | Wide open mouth with an upper tooth band. | exists |
| `neutral` | mouth | Short level line, slight thickening at the centre. | exists |
| `surprised` | mouth | Small vertical open oval. | exists |
| `open-laugh` | mouth | Wide open mouth with a visible tongue shape. | **new** |
| `pout` | mouth | Small pushed-forward mouth, lower lip fuller. | **new** |

### 2.3 hair — 14 Core + 6 Growing + 4 fit-F + 5 fit-M + 2 Stage

Every entry is a **silhouette**. Texture is specified because a coily silhouette is a genuinely
different outline from a straight one — see the contract's "Hair: the texture *is* the outline"
note before drawing any textured style.

**Naming discipline.** `pigtails` and `afro-puffs` are two separate families, not one generic
"bunches". Name a style from its own cultural origin, never from a lookalike. `cornrows`,
`bantu-knots`, `locs` and `box-braids` keep their own names and never become "braid style 3".

**Core (all 12 bundles) — 14**

| Family | Silhouette | |
|---|---|---|
| `buzz` | Skin-close all-over crop; the skull shape reads through. | exists |
| `curls` | Short tight coils cropped close, textured bumpy outline. | exists |
| `afro` | Rounded halo of dense coils, symmetrical dome wider than the head, lobed contour. | exists |
| `side-part` | Smooth short hair swept off a hard part, one side visibly longer. | exists |
| `pixie` | Above-jaw crop with a wispy fringe and a tapered nape. | exists |
| `bob` | Blunt jaw-length curtain, straight hem, nothing below the shoulders. | exists |
| `ponytail` | Swept back, a single mass falling behind one shoulder. | exists |
| `bun` | Pulled fully back into one knot; clean outline, ears exposed. | exists |
| `long-waves` | Centre mass falling past the shoulders in soft S-curves. | exists |
| `braids` | Two thick plaits falling forward over the shoulders. | exists |
| `top-tuft` | Short everywhere except a raised sprout at the crown. | **new** |
| `pigtails` | Two gathered tails of straight or wavy hair hanging either side of the head. | **new** |
| `cornrows` | Scalp-hugging raised braid rows running front-to-back with clean visible partings between them, ending in a small gathered tail. | **new** |
| `fringe-bowl` | Even all-round hemline with a heavy straight fringe at the brow. | **new** |

**Growing (toddler → elder) — 6, all new**

| Family | Silhouette |
|---|---|
| `afro-puffs` | Two round coily puffs standing off either side of the head above the ear line. |
| `locs` | Rope-like strands of even thickness hanging free, blunt ends, visible root separation. |
| `box-braids` | Long individual braids on a visible square parting grid, knotted at the root, falling past the shoulders. |
| `high-top-fade` | Flat-topped column of dense hair over shaved sides, hard front edge. |
| `bantu-knots` | A grid of small coiled cones standing off the scalp, with clean partings between sections. |
| `twist-out` | Shoulder-length defined two-strand spirals with crown volume, no parting. |

**fit-F (female spec, toddler → elder) — 4, all new**

| Family | Silhouette |
|---|---|
| `half-up` | Top section gathered into a small knot, the rest hanging loose. |
| `braided-crown` | A braid wrapping the hairline like a band, remainder tucked away. |
| `curtain-long` | Centre-parted with two long face-framing sweeps over a waist-length back mass. |
| `high-puff` | All hair gathered into one round coily puff standing above the crown. |

**fit-M (male spec, toddler → elder) — 5, all new**

| Family | Silhouette |
|---|---|
| `taper-fade` | Very short sides fading up to a slightly longer flat top, sharp hairline. |
| `waves-360` | Near-shaved with concentric ripples radiating from the crown. |
| `man-bun` | Sides swept back to a small high knot, forehead exposed, a loose strand or two. |
| `mop-shag` | Chin-length choppy layers under a heavy brow-covering fringe. |
| `undercut-sweep` | Shaved sides with one long swept-over top mass falling to one side. |

**Stage — 2, both new**

| Family | Stages | Silhouette |
|---|---|---|
| `bald-fuzz` | newborn | Bare scalp with a faint halo of down at the crown and nape. |
| `soft-set` | elder | Short tightly-set curls with lift at the temples and an exposed forehead. |

### 2.4 top — 8 Core + 8 Growing + 2 Older + 4 fit-F + 4 fit-M + 1 Stage

Axes for this slot: **shoulder/sleeve · closure · hem · volume.** Any two families here differ on
at least two of them.

**Core (all 12 bundles) — 8, all existing**

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

**Growing (toddler → elder) — 8, all new**

| Family | Silhouette |
|---|---|
| `zip-jacket` | Open-front track top with a centre zip line, stand collar, ribbed cuffs and hem. |
| `puffer-vest` | Sleeveless quilted gilet, horizontal channel seams, high stand collar, bare arms. |
| `cardigan` | Open-front knit with a wide V opening showing the layer beneath; patch pockets. |
| `polo` | Short two-button placket under a flat knit collar, short sleeves, curved hem. |
| `turtleneck` | Close-fitting body with a tall folded neck tube reaching the jaw. |
| `oversized-long-sleeve` | Boxy dropped-shoulder body, hem well below the hip, sleeves past the wrist. |
| `raincoat` | A-line hooded shell flaring from shoulder to mid-thigh, front snap placket. |
| `poncho` | One trapezoid of cloth falling from the shoulders, no sleeve division at all. |

**Older (teen → elder) — 2, both new**

| Family | Silhouette |
|---|---|
| `blazer` | Structured square shoulders, notched lapels, open front over a shell. |
| `waistcoat` | Fitted sleeveless V-front with a pointed hem and a visible button line. |

**fit-F (female spec, toddler → elder) — 4, all new**

| Family | Silhouette |
|---|---|
| `wrap-top` | Diagonal crossover front tied at the waist, deep V, three-quarter sleeves. |
| `puff-sleeve-blouse` | Narrow body with balloon volume at the shoulder gathering into a tight cuff. |
| `crop-top` | Hem sitting above the natural waist, midriff bare, short sleeves. |
| `camisole` | Narrow spaghetti straps, straight or scalloped neckline, skimming hem. |

**fit-M (male spec, toddler → elder) — 4, all new**

| Family | Silhouette |
|---|---|
| `henley` | Collarless three-button placket, long sleeves pushed up at the forearm. |
| `flannel-overshirt` | Boxy unbuttoned overshirt worn open over a tee, squared hem, chest pockets. |
| `ribbed-vest` | Wide-strap athletic vest with deep dropped armholes and a ribbed surface. |
| `bomber` | Blouson jacket with ribbed collar, cuffs and hem; body gently bloused above the hem. |

**Stage — 1, new**

| Family | Stages | Silhouette |
|---|---|---|
| `wrap-vest` | newborn | Kimono-style crossover baby vest tied at the side, no fasteners at the neck. |

### 2.5 bottom — 8 Core + 9 Growing + 3 Stage

Axes for this slot: **rise · leg length · leg width · hem treatment.**

There is no fit tier here, deliberately. Skirts are exactly where a rigid aisle would show, so
**every skirt is authored on both body types.**

**Core (all 12 bundles) — 8, all existing**

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

**Growing (toddler → elder) — 9, all new**

| Family | Silhouette |
|---|---|
| `wide-leg` | High waist falling in a straight wide column, hem breaking over the shoe. |
| `bike-shorts` | Close-fitting, cut straight across mid-thigh, no pockets or fly. |
| `tailored-trousers` | Clean-fronted trouser with a centre crease and a turn-up at the hem. |
| `sweat-shorts` | Loose above-the-knee shorts with a ribbed waistband and a drawcord. |
| `swim-trunks` | Mid-thigh shorts, elasticated waist, short side split at the hem. |
| `snow-pants` | Bulky insulated trousers, wide through the leg, elastic cuff sitting over the boot. |
| `tiered-skirt` | Two or three gathered ruffle tiers widening to a mid-calf hem. |
| `maxi-skirt` | Narrow column falling straight to the ankle with a single side slit. |
| `pencil-skirt` | Narrow straight skirt to the knee with a short back vent. |

**Stage — 3, all new**

| Family | Stages | Silhouette |
|---|---|---|
| `tutu` | toddler, teen | Short stiff skirt standing out horizontally from the hip in two net layers. |
| `nappy` | newborn | Padded brief with side tabs, high on the hip, bulky between the legs. |
| `knit-leggings` | newborn | Soft ribbed footless leggings gathered at the ankle, no waistband detail. |

### 2.6 onepiece — 4 Core + 6 Growing + 2 Older + 6 Stage

Axes for this slot: **shoulder/sleeve · closure · hem · volume.** This is where the newborn
wardrobe actually lives — five of the six Stage families are newborn-only, and they are the
reason a newborn stops looking like a shrunken adult.

Every one-piece declares `data-hides="top,bottom"`.

**Core (all 12 bundles) — 4, all existing**

| Family | Silhouette |
|---|---|
| `sundress` | Strap shoulders, closed, fitted bodice over an A-line skirt to the knee. |
| `jumpsuit` | Covered shoulders, centre front closure, full-length straight legs, belted waist. |
| `party-dress` | Cap sleeves, fitted bodice, gathered full skirt standing away from the leg. |
| `romper` | Short set-in sleeves, button placket, short cuffed legs at mid-thigh. |

**Growing (toddler → elder) — 6, all new**

| Family | Silhouette |
|---|---|
| `shirt-dress` | Collared button-through dress, straight to the knee, belted at the natural waist. |
| `pinafore` | Bib-fronted sleeveless A-line dress on shoulder straps, worn over a top. |
| `swimsuit` | One-piece scoop-back swim shape, high-cut leg, no skirt or ruffle. |
| `boiler-suit` | Utility all-in-one — collar, centre zip, straight legs, tie at the waist. |
| `robe` | Wrap-front dressing gown to mid-calf, shawl collar, tie belt, wide sleeves. |
| `kaftan` | Loose T-shaped robe falling straight from the shoulder to the calf, wide sleeves, slit neckline. |

**Older (teen → elder) — 2, both new**

| Family | Silhouette |
|---|---|
| `maxi-dress` | Narrow column from a fitted bodice straight to the ankle. |
| `wrap-dress` | Diagonal crossover bodice tied at the waist, skirt falling to the knee. |

**Stage — 6, all new**

| Family | Stages | Silhouette |
|---|---|---|
| `sleepsuit` | newborn | Footed all-in-one, full-length popper line down one leg, closed feet, cuffed wrists. |
| `swaddle` | newborn | Tapered cocoon wrapping shoulders to hem, arms enclosed, no limbs visible. |
| `bodysuit` | newborn | Short-sleeved vest with a poppered gusset visible between the legs. |
| `knot-gown` | newborn | Open-hemmed gown gathered and knotted at the bottom, no leg division. |
| `sleep-sack` | newborn | Sleeveless wearable bag, wide flat hem, armholes cut at the shoulder. |
| `puddle-suit` | toddler | Waterproof hooded all-in-one, elasticated cuffs and ankles, bloused body. |

> Draw sleep sacks and swaddles. **Never draw a baby under a loose blanket** — infant sleep
> guidance is explicit that a wearable blanket replaces loose bedding, and the art should honour
> that.

### 2.7 shoes — 5 Core + 6 Growing + 2 Older + 2 Stage

Axes for this slot: **shaft height · toe shape · fastening · sole depth.** Shoes are the
cheapest art in the catalogue — roughly the bottom 60px of a 600px canvas — so this slot is
unusually good value per file. `shoes` draw *over* trouser hems; never draw a foot into a
`bottom` asset.

**Core (all 12 bundles) — 5, all existing**

| Family | Silhouette |
|---|---|
| `sneakers` | Low-cut lace-up, rounded toe, thick banded sole. |
| `boots` | Shaft rising above the ankle bone, rounded toe, chunky sole. |
| `sandals` | Open upper of two or three straps, flat thin sole, toes exposed. |
| `dress-shoes` | Low-cut slip-on, tapered toe, thin sole, no visible fastening. |
| `slippers` | Soft collapsed collar, rounded toe, no sole definition. |

**Growing (toddler → elder) — 6, all new**

| Family | Silhouette |
|---|---|
| `high-tops` | Sneaker with a padded collar rising above the ankle bone and a long lace ladder. |
| `wellies` | Smooth tall rubber boot to mid-calf, no laces, small pull tab at the top. |
| `mary-janes` | Round-toed flat with a single instep strap and a small buckle. |
| `clogs` | Moulded slip-on, bulbous rounded toe, ventilation holes, heel strap. |
| `flip-flops` | Flat sole with a Y-thong between the toes; the foot is otherwise bare. |
| `snow-boots` | Bulky insulated boot with a soft cuff and a chunky lugged sole. |

**Older (teen → elder) — 2, both new**

| Family | Silhouette |
|---|---|
| `heels` | Almond toe with a raised heel column lifting the heel clearly above the toe. |
| `platform-boots` | Chunky lug-soled boot on a thick slab sole raising the whole foot. |

**Stage — 2, both new**

| Family | Stages | Silhouette |
|---|---|---|
| `booties` | newborn | Soft rounded slipper-socks gathered at the ankle, no sole definition. |
| `comfort-shoes` | elder | Wide soft-topped shoe with a broad hook-and-loop strap and a cushioned sole. |

### 2.8 costume — 5 Core + 8 Growing

**Costume art must stay below the bundle's shoulder line minus 8px.** The costume layer draws
above the face and the front hair, so a mask or helmet erases the character's features. Express
a creature through the **body** — tail, belly panel, dorsal ridge, wings, paw cuffs. The head
half lives in `headwear` (`animal-ears`, `hard-hat`), which draws in the right place.

Every costume declares `data-hides="top,bottom,shoes"`.

Re-read §0.3 before drawing any of these.

**Core (all 12 bundles) — 5, all existing**

| Family | Silhouette |
|---|---|
| `web-runner` | Full bodysuit with a raised collar and a geometric lattice over torso and legs. Teal and charcoal; **no web motif, no red-and-blue, no chest emblem.** |
| `storm-herald` | Sleeveless armoured tunic with a shoulder mantle and a short cape, wide belt. **No emblem, no red-and-blue.** |
| `caped-hero` | Fitted bodysuit with a long shoulder-fastened cape and a wide belt; **plain chest, no insignia of any kind.** |
| `dino` | Rounded belly-panel bodysuit with a ridged dorsal crest and a thick tapering tail. |
| `astronaut` | Bulky sealed suit with a chest control panel, ribbed joints and a soft neck ring. No helmet. |

**Growing (toddler → elder) — 8, all new**

| Family | Silhouette |
|---|---|
| `dragon` | Scaled bodysuit with a ridged dorsal crest down the back and a thick tapering tail. |
| `bee` | Rounded banded body with a plush striped abdomen and two rounded wings behind the shoulders. |
| `mermaid` | Scaled tail from the waist down flaring into a fluke at the ground line; shell bodice. |
| `knight` | Plated tabard with shoulder pauldrons over a mail-look body, belted at the waist. |
| `wizard` | Full-length robe flaring from the shoulders with wide draped sleeves and a scattered star surface. |
| `chef` | Double-breasted jacket with a knotted neckerchief and a long waist apron. |
| `medic` | V-neck scrub tunic and drawstring trousers with a chest patch pocket and a lanyard. |
| `firefighter` | Heavy turnout coat with two horizontal reflective bands and a high storm collar. |

> `dino` and `dragon` are both scaled bodysuits with a crest and a tail. They are separate
> families because they differ on **volume** (dino is a rounded soft body, dragon is angular and
> plated) and **shoulder** (dragon carries wing stubs). If yours do not differ on two axes,
> redraw one — the silhouette test will tell you.

---

## 3. Bundle rosters — your exact file list

Each line is `slot (count): family · family · …`. Every family becomes one file at
`src/assets/catalog/<stage>/<bodyType>/<slot>/<family>.svg`. **Existing** counts are files that
already exist; **new** is what you author.

### 3.1 newborn/female — 73 files (52 exist, **21 new**)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (15):** bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl · bald-fuzz
- **top (9):** tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top · wrap-vest
- **bottom (10):** jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees · nappy · knit-leggings
- **onepiece (9):** sundress · jumpsuit · party-dress · romper · sleepsuit · swaddle · bodysuit · knot-gown · sleep-sack
- **shoes (6):** sneakers · boots · sandals · dress-shoes · slippers · booties
- **costume (5):** web-runner · storm-herald · caped-hero · dino · astronaut

*New here:* monolid · hooded · upturned · thick · thin-arch · open-laugh · pout · top-tuft ·
pigtails · cornrows · fringe-bowl · bald-fuzz · wrap-vest · nappy · knit-leggings · sleepsuit ·
swaddle · bodysuit · knot-gown · sleep-sack · booties.

### 3.2 newborn/male — 73 files (52 exist, **21 new**)

Identical roster and identical new-file list to §3.1 — every family named there, drawn to the
`newborn-male` body spec. `skirt`, `pleated`, `sundress` and `party-dress` are authored here
too; see §0.1.

### 3.3 toddler/female — 116 files (52 exist, **64 new**) + the `toddler` headwear pool (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (24):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-F 4* half-up · braided-crown · curtain-long · high-puff
- **top (20):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *fit-F 4* wrap-top · puff-sleeve-blouse · crop-top · camisole
- **bottom (18):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt — *stage* tutu
- **onepiece (11):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *stage* puddle-suit
- **shoes (11):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

*Plus 14 new files in the shared `accessories/toddler/headwear/` pool — see §4.*
**Bundle total authored by this agent: 78 new files.**

### 3.4 toddler/male — 117 files (52 exist, **65 new**) + the `toddler` glasses/earrings/necklace pools (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (25):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-M 5* taper-fade · waves-360 · man-bun · mop-shag · undercut-sweep
- **top (20):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *fit-M 4* henley · flannel-overshirt · ribbed-vest · bomber
- **bottom (18):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt — *stage* tutu
- **onepiece (11):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *stage* puddle-suit
- **shoes (11):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

> `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `tutu`, `sundress`,
> `party-dress`, `shirt-dress` and `pinafore` are authored on this body too.
> See §0.1 — there are no aisles.

*Plus 11 new files across `accessories/toddler/{glasses,earrings,necklace}/` — see §4.*
**Bundle total authored by this agent: 76 new files.**

### 3.5 teen/female — 121 files (52 exist, **69 new**) + the `teen` headwear pool (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (24):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-F 4* half-up · braided-crown · curtain-long · high-puff
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-F 4* wrap-top · puff-sleeve-blouse · crop-top · camisole
- **bottom (18):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt — *stage* tutu
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (13):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

*Plus 14 new files in `accessories/teen/headwear/` — see §4.*
**Bundle total authored by this agent: 83 new files.**

### 3.6 teen/male — 122 files (52 exist, **70 new**) + the `teen` glasses/earrings/necklace pools (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (25):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-M 5* taper-fade · waves-360 · man-bun · mop-shag · undercut-sweep
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-M 4* henley · flannel-overshirt · ribbed-vest · bomber
- **bottom (18):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt — *stage* tutu
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (13):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

> `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `tutu`, `sundress`,
> `party-dress`, `shirt-dress`, `pinafore`, `maxi-dress` and `wrap-dress` are authored on this
> body too. See §0.1 — there are no aisles.

*Plus 11 new files across `accessories/teen/{glasses,earrings,necklace}/` — see §4.*
**Bundle total authored by this agent: 81 new files.**

### 3.7 adult/female — 120 files (52 exist, **68 new**) + the `adult` headwear pool (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (24):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-F 4* half-up · braided-crown · curtain-long · high-puff
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-F 4* wrap-top · puff-sleeve-blouse · crop-top · camisole
- **bottom (17):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (13):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

*Plus 14 new files in `accessories/adult/headwear/` — see §4.*
**Bundle total authored by this agent: 82 new files.**

### 3.8 adult/male — 121 files (52 exist, **69 new**) + the `adult` glasses/earrings/necklace pools (§4)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (25):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-M 5* taper-fade · waves-360 · man-bun · mop-shag · undercut-sweep
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-M 4* henley · flannel-overshirt · ribbed-vest · bomber
- **bottom (17):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (13):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

> `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `sundress`,
> `party-dress`, `shirt-dress`, `pinafore`, `maxi-dress` and `wrap-dress` are authored on this
> body too. See §0.1 — there are no aisles.

*Plus 11 new files across `accessories/adult/{glasses,earrings,necklace}/` — see §4.*
**Bundle total authored by this agent: 80 new files.**

### 3.9 midage/female — 120 files (52 exist, **68 new**)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (24):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-F 4* half-up · braided-crown · curtain-long · high-puff
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-F 4* wrap-top · puff-sleeve-blouse · crop-top · camisole
- **bottom (17):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (13):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

No accessory pool. **Bundle total authored by this agent: 68 new files.**

### 3.10 midage/male — 121 files (52 exist, **69 new**)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (25):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-M 5* taper-fade · waves-360 · man-bun · mop-shag · undercut-sweep
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-M 4* henley · flannel-overshirt · ribbed-vest · bomber
- **bottom (17):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (13):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

> `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `sundress`,
> `party-dress`, `shirt-dress`, `pinafore`, `maxi-dress` and `wrap-dress` are authored on this
> body too. See §0.1 — there are no aisles.

No accessory pool. **Bundle total authored by this agent: 69 new files.**

### 3.11 elder/female — 122 files (52 exist, **70 new**)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (25):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-F 4* half-up · braided-crown · curtain-long · high-puff — *stage* soft-set
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-F 4* wrap-top · puff-sleeve-blouse · crop-top · camisole
- **bottom (17):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (14):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots — *stage* comfort-shoes
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

`cardigan`, `robe`, `waistcoat`, `poncho`, `comfort-shoes`, plus `reading-half` and `bonnet`
from the accessory pools, are the families that read as "older". Only `soft-set` and
`comfort-shoes` are elder-*only* — the rest are ordinary wardrobe that any bundle can wear.

No accessory pool. **Bundle total authored by this agent: 70 new files.**

### 3.12 elder/male — 123 files (52 exist, **71 new**)

- **eyes (8):** round · almond · sleepy · wide · happy-arc · monolid · hooded · upturned
- **brows (5):** soft · straight · arched · thick · thin-arch
- **mouth (6):** smile · grin · neutral · surprised · open-laugh · pout
- **hair (26):** *core 14* bob · pixie · long-waves · ponytail · curls · afro · buzz · side-part · braids · bun · top-tuft · pigtails · cornrows · fringe-bowl — *growing 6* afro-puffs · locs · box-braids · high-top-fade · bantu-knots · twist-out — *fit-M 5* taper-fade · waves-360 · man-bun · mop-shag · undercut-sweep — *stage* soft-set
- **top (22):** *core 8* tee · hoodie · stripes · button-up · tank · sweater · jersey · overalls-top — *growing 8* zip-jacket · puffer-vest · cardigan · polo · turtleneck · oversized-long-sleeve · raincoat · poncho — *older 2* blazer · waistcoat — *fit-M 4* henley · flannel-overshirt · ribbed-vest · bomber
- **bottom (17):** *core 8* jeans · shorts · skirt · joggers · cargo · leggings · pleated · dungarees — *growing 9* wide-leg · bike-shorts · tailored-trousers · sweat-shorts · swim-trunks · snow-pants · tiered-skirt · maxi-skirt · pencil-skirt
- **onepiece (12):** *core 4* sundress · jumpsuit · party-dress · romper — *growing 6* shirt-dress · pinafore · swimsuit · boiler-suit · robe · kaftan — *older 2* maxi-dress · wrap-dress
- **shoes (14):** *core 5* sneakers · boots · sandals · dress-shoes · slippers — *growing 6* high-tops · wellies · mary-janes · clogs · flip-flops · snow-boots — *older 2* heels · platform-boots — *stage* comfort-shoes
- **costume (13):** *core 5* web-runner · storm-herald · caped-hero · dino · astronaut — *growing 8* dragon · bee · mermaid · knight · wizard · chef · medic · firefighter

> `skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `sundress`,
> `party-dress`, `shirt-dress`, `pinafore`, `maxi-dress` and `wrap-dress` are authored on this
> body too. See §0.1 — there are no aisles.

No accessory pool. **Bundle total authored by this agent: 71 new files.**

---

## 4. Accessory pools — authored once per head-size class

`glasses`, `headwear`, `earrings` and `necklace` are **not** per bundle. They are authored once
for each of the three head-size classes (`toddler`, `teen`, `adult`) at
`src/assets/accessories/<class>/<slot>/<family>.svg`, and mapped onto the target head by a
uniform circle-to-circle transform.

**Because of that transform, keep head-mounted art within about 1.3 head radii of the head
centre.** Anything that drapes past the head — a long hijab tail, a shoulder-length wrap end, a
trailing scarf — scales by the *head* ratio, not the shoulder ratio, and lands wrong on the
bundles whose head-to-torso proportion differs most (newborn, toddler).

**Ownership.** Each class is authored by the agents for the matching stage:

| Pool | headwear (14 new) | glasses + earrings + necklace (11 new) |
|---|---|---|
| `accessories/toddler` | toddler/female agent | toddler/male agent |
| `accessories/teen` | teen/female agent | teen/male agent |
| `accessories/adult` | adult/female agent | adult/male agent |

### 4.1 glasses — 8 families (5 exist, 3 new) × 3 classes = 9 new files

| Family | Silhouette | |
|---|---|---|
| `round` | Two circular lenses on a thin bridge. | exists |
| `square` | Two rectangular lenses with slightly rounded corners. | exists |
| `cat-eye` | Lenses swept up and out to a point at the outer corner. | exists |
| `sport` | Single wide wrap lens band on thick temples. | exists |
| `sunglasses` | Two dark rounded-rectangle lenses on a heavy frame. | exists |
| `reading-half` | Half-moon lenses low on the nose with a chain loop at the temples. | **new** |
| `safety-goggles` | Wide sealed lens band on a strap running round the head. | **new** |
| `eye-patch` | Single soft oval pad on a diagonal strap. | **new** |

### 4.2 headwear — 18 families (4 exist, 14 new) × 3 classes = 42 new files

Head coverings are ordinary wardrobe. They sit in this one list beside the beanie, in no
special order and under no sub-heading.

| Family | Silhouette | Covers hair | |
|---|---|---|---|
| `beanie` | Close knit dome with a rolled brim band. | partial | exists |
| `cap` | Rounded crown with a stiff curved front peak. | partial | exists |
| `headband` | Narrow band across the crown behind the fringe. | no | exists |
| `sun-hat` | Wide soft brim all round under a shallow crown. | partial | exists |
| `bucket-hat` | Soft downturned brim all round under a flat crown. | no | **new** |
| `flat-cap` | Low rounded crown pulled forward to a short stiff peak. | partial | **new** |
| `beret` | Soft round flat cap tilted to one side, no brim. | no | **new** |
| `bandana` | Triangle of cloth knotted at the back, covering the forehead. | partial | **new** |
| `hijab` | Draped scarf covering hair, ears and neck, pinned under the chin. | **yes** | **new** |
| `turban` | Wrapped fabric dome with a visible fold line across the front. | **yes** | **new** |
| `kufi` | Small brimless rounded cap sitting flat on the crown. | no | **new** |
| `kippah` | Small flat disc resting on the back of the crown. | no | **new** |
| `headwrap` | High tied wrap with a knotted or fanned crown. | **yes** | **new** |
| `bonnet` | Soft gathered satin cap covering the hair to the nape. | **yes** | **new** |
| `durag` | Close-fitting wrap tied at the front with long ties trailing behind. | **yes** | **new** |
| `flower-crown` | A ring of small blossoms across the hairline. | no | **new** |
| `animal-ears` | Slim band with two rounded ears standing up; pairs with the creature costumes. | no | **new** |
| `hard-hat` | Domed shell with a short front brim and a chin strap. | partial | **new** |

> **The five "yes" families must declare `data-hides="hair"`.** `headwear` is in
> `OVERRIDE_SLOTS`, so that attribute is honoured: the hair asset underneath is suppressed
> entirely, front and back, and the covering reads correctly instead of leaving back hair
> hanging out from behind the shoulders. The other thirteen families declare `data-hides=""` and
> stack over an unmodified hair silhouette.
>
> A full-coverage headwear asset may also declare `hair1`/`hair2` in its own `data-colors` and
> draw the small amount of hair that should escape at the temples or nape. Those are separate
> variables from the hidden hair asset's, so the player controls them independently.

### 4.3 earrings — 7 families (3 exist, 4 new) × 3 classes = 12 new files

This slot is an **ear anchor**, which makes it the right home for hearing technology at zero
engineering cost. Draw these matter-of-factly, in the same style and with the same care as the
jewellery. They are wardrobe, not medical illustration.

| Family | Silhouette | |
|---|---|---|
| `studs` | A single small dot at the lobe. | exists |
| `hoops` | An open ring hanging from the lobe. | exists |
| `drops` | A short stem with a shaped pendant below the lobe. | exists |
| `hearing-aid` | Behind-the-ear body with a thin clear tube hooking into the ear canal. | **new** |
| `cochlear-implant` | Behind-the-ear processor with a round coil disc on the side of the head and a fine lead. | **new** |
| `hearing-aid-studs` | The same behind-the-ear body worn together with a small stud. | **new** |
| `ear-cuff` | A small band hugging the upper rim of the ear. | **new** |

> `hearing-aid-studs` exists only because the slot holds one asset, so a player would otherwise
> have to choose between hearing aids and earrings. It is a workaround for a missing `ear-tech`
> slot, not a design.

### 4.4 necklace — 7 families (3 exist, 4 new) × 3 classes = 12 new files

Neck anchor, drawn above `top` and `costume`. Same 1.3-head-radii limit — a long scarf drape
will not scale correctly across bundles, so keep the ends short.

| Family | Silhouette | |
|---|---|---|
| `pendant` | A fine chain with a single shaped drop at the throat. | exists |
| `beads` | An even row of round beads sitting on the collarbone. | exists |
| `choker` | A close flat band at the base of the neck. | exists |
| `scarf` | Soft loop around the neck with two short hanging ends. | **new** |
| `bib` | Rounded fabric bib fastened at the neck, covering the upper chest. | **new** |
| `bow-tie` | Small symmetric bow at the throat. | **new** |
| `lanyard` | Thin cord loop with a small rectangular card hanging at the chest. | **new** |

---

## 5. Totals

| Slot | Existing | New | After |
|---|---|---|---|
| eyes · brows · mouth | 144 | 84 | 228 |
| hair | 120 | 157 | 277 |
| top | 96 | 138 | 234 |
| bottom | 96 | 98 | 194 |
| onepiece | 48 | 88 | 136 |
| shoes | 60 | 80 | 140 |
| costume | 60 | 80 | 140 |
| accessory pools (×3 classes) | 45 | 75 | 120 |
| **Total** | **669** | **800** | **1,469** |

Per bundle, counting the accessory pool each agent owns:

| Bundle | Families in bundle | New files authored |
|---|---|---|
| newborn/female | 73 | 21 |
| newborn/male | 73 | 21 |
| toddler/female | 116 | 78 (64 + 14 pool) |
| toddler/male | 117 | 76 (65 + 11 pool) |
| teen/female | 121 | 83 (69 + 14 pool) |
| teen/male | 122 | 81 (70 + 11 pool) |
| adult/female | 120 | 82 (68 + 14 pool) |
| adult/male | 121 | 80 (69 + 11 pool) |
| midage/female | 120 | 68 |
| midage/male | 121 | 69 |
| elder/female | 122 | 70 |
| elder/male | 123 | 71 |
| **Total** | | **800** |

Bodies, props and backdrops (42 files) are unchanged and are not part of this expansion.

---

## 6. Families that are proposed but cannot be authored yet

These need an engineering change first and are **deliberately absent from every roster above**.
Do not author them. The change each one needs is recorded in `docs/ASSET_CONTRACT.md`,
"Slots that do not exist yet".

- **facial hair** — `stubble`, `moustache`, `goatee`, `full-beard`, `long-beard`, `sideburns`.
- **face markings** — `freckles`, `vitiligo`, `birthmark`, `blush-cheeks`, `beauty-spot`,
  `laugh-lines`, `scar`, `acne`.
- **mobility aids** — `cane`, `forearm-crutches`, `wheelchair`, `power-chair`, `walker`.

Adding a slot is not something an art agent can do from inside an SVG, and drawing these into an
existing slot would put a beard on the costume layer or a wheelchair on the shoes layer. Wait
for the slot.
