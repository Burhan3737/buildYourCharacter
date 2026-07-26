# Research — Garment Expansion (tops · bottoms · one-pieces · shoes)

**Date:** 2026-07-27
**Status:** Research and proposal. No art is authored by this document, and it changes nothing in
`docs/FAMILIES.md`.
**Read with:** `docs/ASSET_CONTRACT.md` (binding authoring rules — especially **"Silhouette
first"**), `docs/FAMILIES.md` (the current catalogue), `docs/CATALOG-RESEARCH.md` (the previous
research round; this document builds on it and does not repeat it).

If you are an art agent about to draw, you need **§C** (the unlock requirement), **§D** (the new
families), **§E** (which slot each one goes in), **§F** (how your life stage differs) and **§H**
(what to redraw). Everything else is the reasoning.

Every asset in this document is authored at
`src/assets/catalog/<stage>/<bodyType>/<slot>/<family>.svg`.

---

## A. Findings and sources

### A.0 Method, and one honest caveat

The previous round (`docs/CATALOG-RESEARCH.md` §A) already surveyed the character creators —
Toca Boca World, The Sims 4, Animal Crossing: New Horizons, Gacha Club, Mii Maker — for
structure, counts and inclusive-design precedent. **That survey is not repeated here.** What this
round adds is the thing that survey did not do: a *garment-by-garment* comparison of our
catalogue against (a) the occasion taxonomies those products ship, and (b) the actual named
garments in real wardrobes.

**Caveat.** This session's web-search budget was exhausted after a single query, so the sourcing
below is direct fetches of reference pages rather than a broad search sweep. Where a claim is my
judgement rather than something I read, it is marked **⚠ judgement**. Do not cite a judgement
call as research.

### A.1 The occasion taxonomy, and where we sit against it

The two cleanest published occasion vocabularies in the category are already recorded in the
prior round: The Sims 4's eight outfit categories — *Everyday, Formal, Athletic, Sleep, Party,
Swimwear, Hot Weather, Cold Weather* — and Animal Crossing's eleven Label themes — *Comfy,
Everyday, Fairy Tale, Formal, Goth, Outdoorsy, Party, Sporty, Theatrical, Vacation, Work*
(`CATALOG-RESEARCH.md` §A.2, §A.3). Both are worth using as a **coverage checklist**, which is
what I have done.

Mapping the current 22/17/12/13 adult roster onto that checklist:

| Occasion | What we have today | Verdict |
|---|---|---|
| **Everyday** | tee, hoodie, button-up, polo, jeans, joggers, skirt, sneakers … | **Strong.** No action. |
| **Formal / eveningwear** | blazer, waistcoat, party-dress, maxi-dress, dress-shoes, heels | **Thin.** Nothing floor-length and full; no formal lace-up shoe; no long coat over the outfit. Party-dress stops at the knee. |
| **Sleepwear** | `robe`; and for newborns `sleepsuit`, `sleep-sack`, `swaddle`, `knot-gown` | **Empty above the newborn stage.** A toddler, teen, adult or grandparent literally cannot be dressed for bed except in a dressing gown. |
| **Swimwear** | `swimsuit` (one-piece), `swim-trunks` (bottom) | **One-and-a-half garments.** No two-piece, no cover-up, no rash top. |
| **Activewear** | jersey, ribbed-vest, joggers, bike-shorts, sweat-shorts, sneakers, high-tops | **Adequate for casual sport, empty for anything else.** No full-body athletic garment (dance, gym, ski base layer), no sport-specific footwear. |
| **Outerwear** | raincoat, zip-jacket, bomber, puffer-vest, poncho, snow-pants, snow-boots, wellies | **Adequate but short.** Every single outer layer stops at or above mid-thigh. There is no coat. |
| **Uniforms / occupations** | `chef`, `medic`, `firefighter` — all in the **costume** slot | **Structurally wrong.** A nurse's scrubs and a school blazer are ordinary clothes; putting them in `costume` means they hide `top`, `bottom` *and* `shoes` and cannot be mixed with anything. |
| **Seasonal** | winter is covered; summer is not | **Asymmetric.** Snow pants, snow boots, wellies, puffer vest — but no light summer layer, no cropped trouser, no open-back shoe. |
| **Cultural dress** | `kaftan` (onepiece), `poncho` (top) | **This is the headline gap. See A.5.** |

### A.2 Outerwear, sleepwear, swimwear, activewear, workwear — the named garments

- **Outerwear.** Wikipedia's coat article enumerates *overcoat, topcoat, trench, pea coat, duffel,
  parka, car coat, Chesterfield, covert, mackintosh/raincoat* — an overcoat being "a large coat
  worn over the ordinary clothing" as the outermost garment
  ([Coat](https://en.wikipedia.org/wiki/Coat_(clothing))). The distinguishing axis across almost
  all of them is **length below the hip**, which is precisely the axis we have zero coverage on.
- **Sleepwear.** Named types: *pyjamas* ("loose fitting, two-piece garments"), *nightgown*
  ("loose hanging nightwear"), *nightshirt* ("loose fitting shirt reaching to below the knees"),
  *adult onesie* ("all-in-one footed sleepsuit … similar to an infant onesie or children's
  blanket sleeper"), *robe/peignoir*, *bed jacket*, and for children the *blanket sleeper* and
  *footed pyjamas* ([Nightwear](https://en.wikipedia.org/wiki/Nightwear)). Note what this says
  about slot: a pyjama **set** is a top plus a bottom, but a nightgown and a footed onesie are
  one-pieces.
- **Swimwear.** *One-piece, bikini, tankini, swim trunks, board shorts, jammers, rash guard/rash
  vest, wetsuit, swim dress*, plus the *burkini*, "full-body coverage … created in Australia for
  modest swimming", motivated both by religious preference and by sun protection
  ([Swimsuit](https://en.wikipedia.org/wiki/Swimsuit)). A two-piece is a `top` + a `bottom` in
  our architecture and costs two families, not one.
- **Activewear.** *Tracksuit, sports bra, leotard/tights, swimsuit, wetsuit, ski suit, team
  jersey, cycling kit, shorts, keikogi/gi*
  ([Sportswear](https://en.wikipedia.org/wiki/Sportswear_(activewear))). The genuinely distinct
  outline we lack is the **full-body skin-close garment** — leotard, unitard, ski base layer,
  cycling skinsuit — which is one silhouette serving several sports.
- **Workwear.** Scrubs are "a short-sleeve V-necked shirt" over drawstring or elastic-waisted
  trousers, with a related *lab coat* and a *warm-up jacket*
  ([Scrubs](https://en.wikipedia.org/wiki/Scrubs_(clothing))). Aprons come in *bib*, *waist*,
  *pinafore* ("two holes for the arms that is tied or buttoned in the back"), *cobbler/tabard*
  ("protects both front and back, fastened with side ties") and *smock* forms
  ([Apron](https://en.wikipedia.org/wiki/Apron)). **The tabard is the important one** — it is a
  garment in its own right rather than a layer, and it is the same outline as a hi-vis vest, a
  sports bib and a supermarket smock.
- **Uniforms.** School uniform components internationally are "button-up shirts, trousers …
  blouses and pleated skirts … with both wearing blazers", plus ties, and in South Asia the
  shalwar kameez is an explicit uniform option
  ([School uniform](https://en.wikipedia.org/wiki/School_uniform)). **⚠ judgement:** this means
  school uniform needs *no new families at all* — it is `button-up` + `pleated` + `blazer` +
  a formal lace-up shoe, styled. Uniform is a *combination*, not a silhouette.

### A.3 Silhouette vocabulary — the shapes the industry actually names

These are the reference lists I checked our axes against.

- **Dresses.** *A-line* (fitted bodice, flares above the hips), *sheath* (form-fitting
  throughout), *empire* (fitted to the bust, flaring immediately beneath it), *shift* (hangs
  straight from the shoulders, no waist), *ball gown* (fitted bodice, full skirt flaring from the
  waist), *trumpet/mermaid* (fitted to mid-thigh, then flared)
  ([MasterClass](https://www.masterclass.com/articles/essential-guide-to-dress-silhouettes),
  [The Knot](https://www.theknot.com/content/wedding-dress-silhouettes),
  [SewGuide](https://sewguide.com/dress-silhouettes/)).
- **Skirts.** *A-line, pencil, circle, pleated, wrap, tiered, godet, gored, culotte, tulip,
  prairie, sarong ("wrapped around the body and tied on one hip"), kilt-skirt, hobble, skort*,
  at *micro / mini / midi / maxi* lengths ([Skirt](https://en.wikipedia.org/wiki/Skirt)).
- **Trousers.** *Jeans, dress trousers, khakis, chinos, leggings, overalls, sweatpants, harem
  pants ("loose-fitting, wide-leg"), cargo, breeches/plus-fours, shorts*, with pleat, turn-up and
  fly variations ([Trousers](https://en.wikipedia.org/wiki/Trousers)).
- **Shoes.** *Oxford* (closed lacing), *derby* (open lacing), *loafer* (slip-on), *Mary Jane*
  (instep strap), *sneaker/trainer*, *moccasin*, *espadrille* ("braided jute soles and a fabric
  upper"), *sandal*, *clog*, *ballet flat*, *mule* (backless), *Chelsea* (elastic sides),
  *cowboy*, *ankle*, *knee-high*, *work boot*, *cleats*, *geta/zori*, *huaraches*
  ([Shoe](https://en.wikipedia.org/wiki/Shoe)).

### A.4 Adaptive clothing — the elder differentiator that is a *silhouette*, not a fit

Adaptive garments are distinguished by **construction, not size**: open-back clothing "which
allows the clothing to be put on frontwards, eliminating the need to bend or rotate muscles or
joints"; "a longer rise in the back of trousers to accommodate wheelchair users"; "buttons and
zippers … replaced with easy touch Velcro or magnetic closures"; wrap tops that avoid pulling
over the head; and footwear where "Velcro closures [are] the most common feature"
([Adaptive clothing](https://en.wikipedia.org/wiki/Adaptive_clothing)). The stated user group
explicitly includes "age (elderly people may have trouble with opening and closing buttons)".

This is what makes §F's grandparent guidance concrete rather than "draw it baggier".

### A.5 Cultural dress — the largest single gap in the catalogue

**The measured fact.** Across 22 tops, 17 bottoms and 12 one-pieces in the adult bundles, there
are **two** garments of non-Western origin: `kaftan` and `poncho`. And `poncho` is described in
`FAMILIES.md` purely as "one trapezoid of cloth falling from the shoulders" — it is not named or
drawn as the Andean and Mesoamerican garment it descends from. Effectively, the wardrobe of
everywhere outside Western dress is represented by one robe.

That is a bigger deal than it looks, because the prior round already established that this is an
area where the reference products are also weak and where we can straightforwardly beat them
(`CATALOG-RESEARCH.md` §A.8.2, §A.11).

**Garments verified as genuinely everyday, with the shape detail an artist needs:**

| Garment | Origin / where worn | Shape (from source) |
|---|---|---|
| **Kurta / shalwar kameez** | Pakistan (national dress), Afghanistan, north India, Bangladesh, Nepal, diaspora; **worn by both men and women as everyday clothing** | Kameez is "a long shirt or tunic", straight-cut or dress-like, with side openings (*chaak*) that give "greater freedom of movement"; often a mandarin collar and set-in sleeves. Shalwar is "wide at the top, and narrow at the ankle", drawstring or elastic, pleating at the waist. The *dupatta* is a separate long scarf; the *churidar* is the tight-fitting trouser alternative. ([Shalwar kameez](https://en.wikipedia.org/wiki/Shalwar_kameez)) |
| **Thawb / thobe / dishdasha / kandura** | Arabian peninsula, Iraq, Levant, Oman, Maghreb; "worn year-round", white or beige for everyday | "A long-sleeved, ankle-length robe"; collar and sleeves stiffened for formality; placket fastened with buttons or a zip; UAE and Omani versions omit the collar and use a frog closure with a tassel. ([Thawb](https://en.wikipedia.org/wiki/Thawb)) |
| **Abaya** | Gulf and wider | "A simple, loose over-garment, essentially a robe-like dress" covering the whole body except head, feet and hands; either draped from the shoulders or cut "as a long kaftan"; **front-open and front-closed variants both exist**. ([Abaya](https://en.wikipedia.org/wiki/Abaya)) |
| **Dashiki** | West Africa; "popularized and claimed by communities in the African diaspora"; has "formal and informal versions", the informal ones "worn in daily life" | Loose pullover covering the top half of the body, "an ornate V-shaped collar, and tailored and embroidered neck and sleeve lines". Related: *sokoto* drawstring trousers, *grand boubou/agbada* worn over it, *Senegalese kaftan*. ([Dashiki](https://en.wikipedia.org/wiki/Dashiki)) |
| **Jeogori + chima (hanbok)** | Korea; modern everyday "saenghwal hanbok" exists, and children's hanbok is standard for first birthdays | *Jeogori*: "the basic upper garment … worn by both men and women", now cut very short, tied with *goreum* fabric strings at the front centre. *Chima*: skirt of rectangular panels "pleated or gathered into the chima-malgi (waistband)". *Baji*: loose trousers. *Po/durumagi*: outer robe. ([Hanbok](https://en.wikipedia.org/wiki/Hanbok)) |
| **Yukata** | Japan; "casual summer kimono", worn to summer festivals and bathhouses, machine washable | "Straight seams and wide sleeves"; unlined cotton or linen; **wrapped proper left over proper right** and secured with a single-layer obi; worn with geta and no socks. ([Yukata](https://en.wikipedia.org/wiki/Yukata)) |
| **Sari** | India, Bangladesh, Sri Lanka, Nepal, Pakistan; "fashionable in the Indian subcontinent and … also considered formal attire" | "An un-stitched stretch of woven fabric arranged over the body", 4.5–9 yards, worn over a fitted *choli* blouse and a petticoat; the common **Nivi** drape wraps at the waist, hand-gathers pleats, and takes the *pallu* over the shoulder, often leaving part of the midriff visible. Over 80 regional drapes exist. ([Sari](https://en.wikipedia.org/wiki/Sari)) |
| **Áo dài** | Vietnam; **"the required uniform for female teachers … and female students in common high schools in the South"**, plus flight attendants, receptionists and hotel staff | "A long split tunic worn over silk trousers", form-fitting since the 1950s, splits at both sides, simple or boat collar. ([Áo dài](https://en.wikipedia.org/wiki/%C3%81o_d%C3%A0i)) |
| **Sarong / wrap** | Southeast Asia, South Asia, East Africa, Pacific | A skirt "wrapped around the body and tied on one hip" ([Skirt](https://en.wikipedia.org/wiki/Skirt)); the same construction as a lungi, kanga or pareo, and doubles as a beach cover-up. |
| **Poncho / ruana / gabán / jorongo / serape** | Andes, Patagonia, Mexico; "used since pre-Hispanic times for warmth" | "A single large sheet of fabric with an opening in the center for the head", often hooded. ([Poncho](https://en.wikipedia.org/wiki/Poncho)) |

**Flagged: needs care, or do not include.**

- **`huipil` — do not add as a family.** Huipil designs "generally identify the indigenous group
  and a community of the wearer"; some communities enforce explicit prohibitions, e.g. Jamiltepec
  in Oaxaca "prohibits women from other areas wearing locally-made huipils"; master weavers guard
  the most complex patterns within their communities
  ([Huipil](https://en.wikipedia.org/wiki/Huipil)). A generic drawn huipil is either an
  unattributed community's design or a hollow shape. The loose square-cut tunic read we would
  have wanted from it is already served by `dashiki` and `kurta`.
- **`cheongsam`/`qipao` — deprioritised.** It is real and beautiful, but the source frames its
  modern use as formal and ceremonial — "airline uniforms … wedding ceremonies, Chinese New Year
  celebrations, beauty pageants and formal events"
  ([Cheongsam](https://en.wikipedia.org/wiki/Cheongsam)) — which puts it further from "everyday
  clothing" than the garments above. Hold for a later round with a consultant.
- **`áo dài` — include, with the note that it is uniform and formal wear, not casual daily
  wear.** The source is explicit that many consider it "not suitable for everyday activities".
  Including it as a school-and-work garment is accurate; including it as a beach outfit is not.
- **Do not include, under any framing:** war bonnets and any Native American regalia; religious
  vestments and ritual garments (cassocks, monastic habits, tallit, tefillin); face-covering
  veils (also blocked by our face slot); and any garment whose identity *is* a specific
  community's woven design — named-clan tartan setts, particular kente patterns, Adinkra symbols
  or Māori kōwhaiwhai used as an applied chest graphic. The contract already bans surface-defined
  families; this is the cultural-harm version of the same rule.
- **Never in `costume`.** `FAMILIES.md` §0.3 already says cultural dress belongs in `top` and
  `onepiece` under its own endonym. That holds for every family in §D.
- **Review gate.** The prior round recorded the Geena Davis Institute and IGDA guidance that any
  cultural reference "should be reviewed by an expert of that culture before it ships"
  (`CATALOG-RESEARCH.md` §A.11). Treat the cultural block in §D as **drawn but not shipped**
  until that review happens. The strongest shipped precedent named there — the Sims 4 Fashion
  Street Kit, co-created with a Mumbai fashion expert — is what good looks like.

**⚠ Note on the folk-costume trap.** Wikipedia's own [Folk costume](https://en.wikipedia.org/wiki/Folk_costume)
article mostly documents *ceremonial* use — hanbok "worn for ceremonies and special occasions",
and so on. That is exactly the frame to avoid. Every family in §D's cultural block was chosen
because its *own* article documents current everyday, school or work use, and each must be drawn
as clothes someone wore to the shops, not as a museum piece.

---

## B. Diagnosis — where the silhouettes actually collide

This section is measured against the four axes the contract defines for each slot. I coded every
existing family in the adult roster; the tables below are the evidence.

### B.1 Tops — the hem axis is almost unused, and `gathered` is entirely unused

The contract's hem values are *cropped · waist · hip · past hip · thigh · knee · calf · ankle*.
Coding all 26 top families (the 22 in a bundle today, plus the four locked to the other body
type):

| Hem value | Families | Count |
|---|---|---|
| cropped | `crop-top` | 1 |
| waist | `overalls-top`, `wrap-top` | 2 |
| **hip** | `tee`, `stripes`, `hoodie`, `turtleneck`, `sweater`, `button-up`, `polo`, `jersey`, `henley`, `tank`, `ribbed-vest`, `camisole`, `puff-sleeve-blouse`, `cardigan`, `zip-jacket`, `bomber`, `flannel-overshirt`, `waistcoat`, `puffer-vest` | **19** |
| past hip | `oversized-long-sleeve`, `blazer` | 2 |
| thigh | `raincoat`, `poncho` | 2 |
| knee / calf / ankle | — | **0** |

**Nineteen of twenty-six tops end at the hip.** Three of the eight available hem values are used
by nothing at all. Volume is worse: of the five values (*fitted · straight · boxy · flared ·
gathered*), **`gathered` is used by zero top families** — `puff-sleeve-blouse` gathers the
*sleeve* onto a straight body, which is a sleeve treatment, not a body volume.

### B.2 The plain closed hip-length cluster fails the two-of-four rule on paper

The brief already identified `tee`, `hoodie`, `turtleneck` and `sweater` as the weakest cluster.
Coded, it is worse than "weak" — it is a contract violation waiting to be caught:

| Family | Shoulder | Closure | Hem | Volume |
|---|---|---|---|---|
| `tee` | short set-in | closed | hip | straight |
| `hoodie` | long | closed | hip | straight |
| `turtleneck` | long | closed | hip | fitted |
| `sweater` | dropped | closed | hip | boxy |
| `stripes` | long | closed | hip | boxy |

- `tee` vs `hoodie` differ on **one** axis (shoulder).
- `hoodie` vs `turtleneck` differ on **one** axis (volume).
- `sweater` vs `stripes` differ on **one** axis (shoulder).

The hood, the neck tube and the rib bands are doing all the separating, and every one of those is
**trim** — which `silhouette.test.ts` explicitly discounts, because trim sits outside the
`sp-shadow` major-form groups. These four survive the automated test only because their paths
were drawn separately; they do not survive the axis rule. **Adding a fifth closed hip-length top
to this shelf would be the single worst thing this expansion could do.** §H says what to do
instead.

### B.3 Bottoms — no leg length between "short" and "full", no low rise, no flare

| Axis | Values in use | Values unused |
|---|---|---|
| Rise | natural (×14), high (×2), bib (×1) | **low** |
| Leg length | short (×4), full (×7), skirt (×6) | **knee, cropped/mid-calf** |
| Leg width | skin-close (×2), straight (×5), wide (×3), tapered (×1) | **flared** |
| Hem treatment | plain, cuffed, elasticated, ruffled — all used | — |

There is nothing between a mid-thigh short and a full-length trouser: no capri, no culotte, no
knee-length short. `low` rise and `flared` width are both unused, and they are the two axis
values that together define an entire recognisable trouser silhouette. Every one of our six
skirts is fixed at the waist and closed — **there is no wrapped bottom of any kind.**

### B.4 One-pieces — seven dresses, one swim shape, no sleepwear above the newborn stage

The twelve adult one-pieces are: `sundress`, `party-dress`, `shirt-dress`, `wrap-dress`,
`pinafore`, `maxi-dress` (six dresses), `kaftan`, `robe` (two robes), `jumpsuit`, `boiler-suit`,
`romper` (three all-in-ones) and `swimsuit`.

The dress shelf is already deep, and it is the *hem* that is crowded: four of the six stop at the
knee. What is missing is not another dress — it is **the floor** (nothing full and floor-length),
**the bed** (no nightgown, no footed onesie), and **the body** (nothing skin-close full-length —
no leotard, unitard, ski base layer or cycling skinsuit).

### B.5 Shoes — the shaft-height axis stops at mid-calf and the sole axis has one setting

| Axis | Coverage |
|---|---|
| Shaft height | none (×5: sandals, dress-shoes, flip-flops, mary-janes, clogs) · low (×2) · above-ankle (×4) · mid-calf (×1: `wellies`) · **knee: 0** |
| Toe shape | rounded (×9), tapered (×2), almond (×1), bulbous (×1) — reasonable |
| Fastening | laces (×3), strap/buckle (×2), hook-and-loop (×1), thong (×1), pull-on (×2), none (×4) — reasonable, but **nothing backless** |
| Sole depth | thin (×2), banded (×3), chunky/lugged (×5), platform (×1) — **nothing minimal, nothing studded, nothing bladed** |

There is also a live collision: `dress-shoes` is specified as "low-cut slip-on, tapered toe, thin
sole, **no visible fastening**", which means we have no laced formal shoe at all, and it sits
uncomfortably close to any future ballet flat. See §H.

### B.6 The summary judgement

We do not need more garments occupying the hip-length closed torso block. We need garments that
**go past the knee**, **gather**, **wrap**, **crop**, **open at the side**, **sit skin-close over
the whole body**, and **rise above the ankle bone on the leg**. Every family in §D was chosen
against that list, and each one names the two axes it separates on.

---

## C. Requirement — unlock the eight body-locked tops

`FAMILIES.md` §2.4 currently places eight top families in **fit-F** and **fit-M** tiers:

- fit-F (female bundles only): `camisole`, `crop-top`, `puff-sleeve-blouse`, `wrap-top`
- fit-M (male bundles only): `bomber`, `flannel-overshirt`, `henley`, `ribbed-vest`

This is the last body-type restriction in the catalogue — bottoms, one-pieces, shoes and costumes
are already authored identically on both bodies — and it contradicts §0.1's own statement that
there are no aisles.

> **Requirement: all eight families move into the Growing tier (toddler → elder, both body
> types).** Every garment family must exist in every bundle that authors its tier. A family is
> drawn with body-appropriate drape — a `camisole` on the male spec keeps its narrow straps and
> skimming hem and is cut for that chest; a `ribbed-vest` on the female spec keeps its dropped
> armhole — but **no family is ever withheld from a bundle**. The `fit-F` and `fit-M` tiers cease
> to exist.

**Cost: 40 files** — 4 families × 5 bundles for each direction (toddler, teen, adult, midage,
elder). These are counted in §G as **unlock** files, separately from new families, because the
silhouette description and the family key already exist; only the drawing is new.

Note the knock-on for §H: once `camisole`, `tank` and `ribbed-vest` all exist in the same
`(bundle, slot)`, three strap tops separate mainly on strap width and rib texture. That needs a
redraw, not a tolerance.

---

## D. Proposed new families

Every row gives the kebab-case name (which is the filename and the `data-family` string), the
slot, a binding one-line silhouette that names no colour and no pattern, **the two axes it
separates on** (write these into the XML comment at the top of your file, as the contract
requires), and the tier.

Tiers, unchanged from `FAMILIES.md` §1:

| Tier | Bundles | Files per family |
|---|---|---|
| **Growing** | toddler · teen · adult · midage · elder, both body types | 10 |
| **Older** | teen · adult · midage · elder, both body types | 8 |

**No new family is proposed for the newborn bundles.** A newborn wardrobe is one-piece-dominated
and deliberately smaller (`FAMILIES.md` §1); nothing in this expansion belongs on a four-week-old.

### D.1 top — 10 new families

**Silhouette-widening (6)**

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `long-coat` | Long set-in sleeves over a full button placket, notched collar, straight column falling to **mid-calf**, single back vent. | **hem** (calf — first in the slot) · **volume** (long straight column) | Growing |
| `duster-cardigan` | Unfastened open-front knit with a dropped shoulder, no collar and no buttons, two low patch pockets, hanging to **mid-calf** in a soft drape. | **hem** (calf) · **shoulder** (dropped, unstructured) | Growing |
| `smock-top` | Narrow yoke across the chest with the whole body **gathered** onto it, swinging wide to a high-hip hem; short set-in or cap sleeves. | **volume** (gathered — first in the slot) · **shoulder** (cap/short over a yoke seam) | Growing |
| `bolero` | Open-front short jacket cut off **above the natural waist**, three-quarter sleeves, no fastening, curved front edges. | **hem** (cropped) · **closure** (open front) | Growing |
| `tabard` | Two flat panels, front and back, joined only at the shoulders and **completely open down both sides**, hip hem, no sleeve. | **shoulder** (none, panel-hung) · **closure** (open sides) | Growing |
| `swim-top` | Banded swim top on narrow shoulder ties, straight upper edge, hem at the **underbust**, no sleeve. | **hem** (underbust) · **volume** (banded, skin-close) | Growing |

**Cultural dress (4)** — see §A.5 for sourcing and the review gate. Draw these as ordinary
clothes, in the house style, with no community-specific woven motif.

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `kurta` | Straight tunic to **mid-thigh or knee**, band collar over a short front placket, long straight sleeves, deep side slits from the hip. | **hem** (knee) · **closure** (half placket on a tunic body) | Growing |
| `dashiki` | Pull-on tunic with a wide V panel at the neck, **short wide sleeves cut straight from the body**, boxy body to mid-thigh with short side vents. | **shoulder** (wide cut-on sleeve, no armhole) · **hem** (thigh) | Growing |
| `jeogori` | Very short wrap jacket ending **just below the bust**, wide crossover front held by a single long ribbon tie, gently curved sleeve line. | **hem** (cropped, above the ribs) · **closure** (crossover) | Growing |
| `haori` | Open-front hip-length jacket with **wide square sleeve panels hanging free below the arm**, straight front edges meeting at a short chest cord, no buttons. | **shoulder** (hanging square panel) · **closure** (open front, corded) | Growing |

> **`yukata` is wrapped left-over-right.** Right-over-left is how the dead are dressed in Japan.
> The same applies to `jeogori`'s crossover: check your reference and get the direction right. It
> costs nothing and getting it wrong is the kind of error that is noticed immediately.

### D.2 bottom — 7 new families

**Silhouette-widening (4)**

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `capris` | Natural rise, straight narrow leg cut off **at mid-calf**, plain or single turn-up hem. | **leg length** (cropped — first in the slot) · **leg width** (narrow straight) | Growing |
| `culottes` | High rise, **knee-length**, leg so wide and flat that it reads as a skirt until the centre split shows. | **leg length** (knee) · **leg width** (very wide, A-line) | Growing |
| `flares` | **Low rise**, full length, close through the thigh and knee then **flaring sharply from the knee** to a wide floor-brushing hem. | **rise** (low — first in the slot) · **leg width** (flared — first in the slot) | Growing |
| `swim-bottoms` | High rise, **no leg at all**, skin-close brief with a high-cut leg opening and a plain bound edge. | **leg length** (none) · **leg width** (skin-close brief) | Growing |

**Cultural dress (3)**

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `shalwar` | Natural drawstring rise gathered into deep pleats, **enormously full through the hip and thigh, narrowing sharply to a plain close ankle band** — a triangle, not a tube. | **leg width** (very wide → narrow taper) · **hem treatment** (plain narrow band, no rib) | Growing |
| `chima` | Wrapped skirt whose band sits **above the bust**, falling from there in one gathered column to the ankle, closed with a long tie. | **rise** (above the bust — the highest in the slot) · **leg length** (ankle skirt) | Growing |
| `sarong` | A length of cloth **wrapped at the waist and knotted at one hip**, falling straight to mid-calf with a visible overlap edge down one leg. | **hem treatment** (knotted wrap with an open overlap) · **leg length** (mid-calf) | Growing |

### D.3 onepiece — 9 new families

Every one-piece declares `data-hides="top,bottom"`.

**Silhouette-widening (4)**

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `ball-gown` | Fitted bodice over a **full skirt standing away from the leg from the natural waist to the floor**, cap or off-shoulder neckline. | **hem** (floor) · **volume** (full standing skirt) | Growing |
| `nightgown` | Loose gown falling from a **shoulder yoke** straight to mid-calf with no waist at all, short set-in or cap sleeves, plain round neck. | **volume** (unwaisted shift) · **hem** (calf) | Growing |
| `sleep-onesie` | Footed hooded all-in-one with a **full-length front zip from throat to crotch**, ribbed cuffs, **closed feet**, softly bloused body. | **hem** (closed foot — first in the slot) · **shoulder** (integral hood) | Growing |
| `unitard` | **Skin-close all-in-one from shoulder to ankle with no waist seam and no closure**, scoop neck, long or short sleeves. | **volume** (skin-close) · **closure** (none, pull-on) | Growing |

**Cultural dress (5)**

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `thobe` | **Ankle-length** straight column, narrow long set-in sleeves, band collar over a short buttoned placket, no waist. | **hem** (ankle) · **closure** (short band-collar placket) | Growing |
| `yukata` | Full-length wrapped robe closed **left over right**, flat overlapping band collar running from the neck to the waist, **wide rectangular sleeve panels hanging well below the arm**, held by a broad flat sash. | **shoulder** (hanging rectangular panel) · **hem** (ankle) | Growing |
| `ao-dai` | Long fitted tunic **split to the waist at both sides** over wide trousers drawn into the same file, mandarin collar, long narrow sleeves. | **hem** (ankle tunic over trouser) · **closure** (side-split, high mandarin) | Growing |
| `sari` | Draped cloth wrapped at the waist into hand-gathered pleats with the **pallu carried diagonally over one shoulder**, over a fitted short blouse and a petticoat drawn into the same file. | **closure** (unstitched diagonal drape) · **volume** (asymmetric) | **Older** |
| `abaya` | **Open-front** ankle-length robe falling straight from the shoulder, long straight sleeves, no waist, edges meeting without a fastening. | **closure** (open front on a full-length body) · **hem** (ankle) | **Older** |

> **`sari` and `abaya` are Older-tier** because both are garments for older wearers in practice.
> A toddler equivalent exists in both traditions but is a genuinely different garment, not a
> scaled sari — do not fake one.
>
> **Drawing the `sari`:** use the common **Nivi** drape (waist pleats, pallu over the left
> shoulder). Over eighty regional drapes exist and no single one is "the" sari; say in the
> `data-name` that it is a Nivi drape. The choli and petticoat **must be drawn into the same
> file** — see §E.

### D.4 shoes — 7 new families

| Family | Silhouette | Separates on | Tier |
|---|---|---|---|
| `tall-boots` | Smooth shaft rising **to just below the knee**, tapered toe, no lacing, thin stacked sole. | **shaft height** (knee — the tallest in the slot) · **sole depth** (thin) | Growing |
| `ballet-flats` | Very low **scooped topline** exposing the whole instep, rounded toe, **no fastening at all**, sole barely thicker than the upper. | **sole depth** (minimal) · **fastening** (none, scooped) | Growing |
| `slides` | **Backless** — one broad band across the instep and nothing behind the heel — on a thick contoured footbed. | **fastening** (backless, single band) · **sole depth** (thick footbed) | Growing |
| `oxfords` | Low-cut lace-up with **closed lacing under the vamp**, a squared toe cap seam and a visible welted sole edge. | **fastening** (closed lacing) · **toe shape** (squared cap) | Growing |
| `cleats` | Low sport shoe on a **studded plate sole**, close-fitting upper, laces crossing off-centre. | **sole depth** (studded plate) · **toe shape** (low tapered sport) | Growing |
| `ice-skates` | Above-ankle padded boot on a **thin blade standing clear of the sole**, long hooked lace ladder. | **sole depth** (blade) · **shaft height** (above ankle, stiff) | Growing |
| `wedges` | Ankle-strapped shoe on a **continuous solid wedge sole** that rises from the toe to the heel with no gap beneath the arch. | **sole depth** (continuous wedge) · **fastening** (ankle strap) | **Older** |

---

## E. Layering reads — which slot, and what draws over what

The engine, restated: `bottom` (z 30) → `top` (z 40) → `onepiece` (z 45, `data-hides="top,bottom"`)
→ `shoes` (z 50). There is no layer above `onepiece` that a garment can occupy.

### E.1 Slot assignment for every proposal

| Slot | Families |
|---|---|
| **top** | `long-coat`, `duster-cardigan`, `smock-top`, `bolero`, `tabard`, `swim-top`, `kurta`, `dashiki`, `jeogori`, `haori` |
| **bottom** | `capris`, `culottes`, `flares`, `swim-bottoms`, `shalwar`, `chima`, `sarong` |
| **onepiece** | `ball-gown`, `nightgown`, `sleep-onesie`, `unitard`, `thobe`, `yukata`, `ao-dai`, `sari`, `abaya` |
| **shoes** | `tall-boots`, `ballet-flats`, `slides`, `oxfords`, `cleats`, `ice-skates`, `wedges` |

### E.2 The ambiguous ones, resolved

- **A tunic (`kurta`, `dashiki`) — `top`.** It draws over `bottom` and its hem reaches the knee,
  so the trouser leg still shows below. No engine change needed. Draw the hem opaque; do not rely
  on the bottom asset showing through a slit.
- **`jeogori` + `chima` — `top` + `bottom`, and they must be drawn to a shared line.** The chima
  band sits above the bust, so **the jeogori hem must fall clear of the chima band's top edge on
  every bundle**. Agree one y-value per bundle before drawing either. If the jeogori hem lands
  below the band, the pair reads as a jacket tucked into a strapless dress.
- **`swim-top` + `swim-bottoms` — `top` + `bottom`.** The swim-top hem sits at the underbust and
  the midriff is deliberately bare; `swim-bottoms` sits at the natural waist and does not close
  the gap. Both must read as finished garments worn alone.
- **A sari — `onepiece`, with the choli and petticoat drawn into the same file.** The drape covers
  the whole body, so it cannot be a `top`; but if it is a bare one-piece, the blouse underneath
  vanishes and the garment is wrong. Draw all three layers into the one file and paint the choli
  through a separate variable (`--c2` or `--c3`) so the player can still contrast it.
- **`abaya`, `thobe`, `yukata`, `ao-dai` — `onepiece`.** All four are worn over other clothes in
  life, but all four visually cover those clothes completely, so hiding `top` and `bottom` is the
  correct read. `ao-dai`'s trousers are drawn into the file for the same reason as the sari's
  petticoat.
- **A long cardigan or coat over a dress — CANNOT BE DONE.** `duster-cardigan` and `long-coat` are
  `top` assets, so they read correctly over trousers and skirts, and are **suppressed entirely
  whenever a `onepiece` is equipped**. This is a real limitation and it is the single most
  requested layering combination in the genre. It needs an engineering change — see §I.1. Do not
  work around it by drawing a dress into a coat file.
- **An apron — DO NOT AUTHOR IT.** A bib apron is definitionally a layer over other clothes. As a
  `top` it would suppress the shirt it is supposed to be worn over, and drawing an implied shirt
  into the apron file locks that shirt's colour and shape forever. It needs the same change as
  §I.1. **Interim answer: `tabard`.** A tabard is a garment in its own right — flat panels, open
  sides — and it delivers the hi-vis vest, the sports bib, the shop smock and the medieval surcoat
  reads without pretending to be a layer.
- **Open-front tops must resolve the opening as skin, not as a phantom shirt.** `bolero`, `haori`,
  `duster-cardigan`, `tabard` — and, note, the *existing* `cardigan`, whose binding description
  says "showing the layer beneath", which is something our engine cannot deliver — all leave the
  chest or the ribs exposed. Paint that region through `--skin1`/`--skin2` (always available to
  any asset), **or** draw an integral shell inside the same file and paint it through `--c2` or
  `--c3` so the player controls it. Never leave a hole, and never hard-code a shell colour.
- **`long-coat` hem vs `shoes`.** Shoes are z 50, above `top`, so the shoe draws over the coat
  hem. That is correct — keep the coat hem at mid-calf so the boot shaft and the shoe both read.
- **`tall-boots` vs long bottoms.** Shoes draw over trouser hems by design. A knee-high boot will
  cover most of `capris`, `flares` and `chima`. That is correct behaviour and not a bug; just do
  not put a bottom's only distinguishing detail below the knee.

---

## F. Age-appropriate differentiation — what changes besides scale

The rule: **the family's silhouette description is binding in every bundle.** What follows changes
proportion, construction and detail density — never the axis values that define the family.

### F.1 The five things that legitimately differ

**1. Fastening, and it is developmental, not stylistic.** The prior round sourced the dressing-skill
progression (`CATALOG-RESEARCH.md` §A.9): 2–3 year olds manage elastic pull-ons; 3–5 need large
Velcro or elastic; 4–5 handle large front buttons and zips; small buttons, laces and belts often
not until about seven. At the other end, adaptive-clothing practice replaces small buttons with
magnetic or hook-and-loop closures and puts full-length zips in the side seam of trousers
([Adaptive clothing](https://en.wikipedia.org/wiki/Adaptive_clothing)).

| Stage | Fastening you draw |
|---|---|
| toddler | Elastic waists, drawcords with fat aglets, one or two oversized front buttons, hook-and-loop tabs, poppers along a shoulder or gusset. **No laces, no belts, no small button lines.** `oxfords` on a toddler get a hook-and-loop strap where the lacing would be. |
| teen | Everything, and more of it — visible zip pulls, double drawcords, multiple pockets, a stacked buckle. Detail density is highest here on purpose. |
| adult | The garment's own canonical fastening, drawn crisply. This is the reference draft. |
| midage | The same fastening, quieter — fewer pulls, less hardware. |
| grandparent | Front and side openings in preference to overhead pull-ons wherever the family permits; a broad hook-and-loop strap replacing a lace; an elastic waist replacing a fly; a longer back rise on trousers. |

**2. Proportion, which is not the same as scale.** A toddler has no defined waist and a large head,
so waistlines ride up to the lower ribs and neck openings are proportionally much wider — a
toddler `kurta` must clear a head that is a third of the body height. An elder's shoulder line
drops and narrows and the upper back rounds slightly, so set-in sleeves sit further inboard and
sleeve heads soften.

**3. Hem placement is to a landmark, never to a pixel count.** "Knee" means the *bundle's own* knee
anchor. A toddler `kurta` at mid-thigh and an adult `kurta` at the knee are the same family
correctly interpreted; a toddler `kurta` at the adult's absolute y-value is a nightgown.

**4. Volume relative to the body.** Toddler garments read one size loose with turned-up cuffs and
extra ease over a nappy at the hip. Teen garments deliberately exaggerate — oversized where the
adult is straight, cropped where the adult is hip-length, and volumes deliberately mismatched
(wide top over skin-close bottom). Midage softens the waist and upper arm and lengthens hems
slightly. Elder is looser through the upper arm and body, longer at the hem, with fewer cropped
hems and less exposed skin.

**5. Detail density and where it sits.** Toddler: one large motif, big trim, nothing fiddly. Teen:
the busiest — this is where applied graphics and pattern belong. Adult: restrained and structural.
Midage and elder: trim over graphic; texture over print.

### F.2 Worked example — `dashiki` across four stages

| Stage | How it differs |
|---|---|
| toddler | Hem at mid-thigh, very wide through the body, sleeve barely past the shoulder, a popper at one shoulder so it clears the head, one large simple V panel, no side vents. |
| teen | Oversized: hem dropped to the knee, sleeve wider and longer, side vents cut high to the hip so the layer beneath shows, V panel enlarged and off-centred. |
| adult | The canonical draft: hem at mid-thigh, crisp V panel, short wide cut-on sleeve, short side vents. |
| grandparent | Same hem but cut fuller and squarer through the body; sleeve looser at the opening; hem at the hip rather than mid-thigh so it clears a chair seat; V panel narrower and set slightly higher. |

### F.3 What must NOT differ

- Do not make the elder version of a family frumpy, drab or shapeless. `flares`, `dashiki` and
  `ball-gown` on a grandparent are the same garments; the prior round's guidance holds — the
  families that *read* as older (`cardigan`, `robe`, `waistcoat`, `comfort-shoes`) are ordinary
  wardrobe any bundle can wear, and only two families in the whole catalogue are elder-only.
- Do not withhold a family from a stage because it "seems" too young or too old. Tier membership
  is decided in §D and nowhere else.
- Do not change the axis values. If your toddler `culottes` end up mid-thigh and narrow, you have
  drawn shorts.

---

## G. Counts

### G.1 New files by slot

| Slot | Unlock (§C) | New families | Growing (×10) | Older (×8) | **New files** |
|---|---|---|---|---|---|
| top | 40 | 10 | 10 → 100 | — | **140** |
| bottom | — | 7 | 7 → 70 | — | **70** |
| onepiece | — | 9 | 7 → 70 | 2 → 16 | **86** |
| shoes | — | 7 | 6 → 60 | 1 → 8 | **68** |
| **Total** | **40** | **33** | | | **364** |

### G.2 Per-bundle rosters after this expansion

| Bundle | top | bottom | onepiece | shoes | **new files here** |
|---|---|---|---|---|---|
| newborn/female | 9 | 10 | 9 | 6 | **0** |
| newborn/male | 9 | 10 | 9 | 6 | **0** |
| toddler/female | 20 → **34** | 18 → **25** | 11 → **18** | 11 → **17** | **34** |
| toddler/male | 20 → **34** | 18 → **25** | 11 → **18** | 11 → **17** | **34** |
| teen/female | 22 → **36** | 18 → **25** | 12 → **21** | 13 → **20** | **37** |
| teen/male | 22 → **36** | 18 → **25** | 12 → **21** | 13 → **20** | **37** |
| adult/female | 22 → **36** | 17 → **24** | 12 → **21** | 13 → **20** | **37** |
| adult/male | 22 → **36** | 17 → **24** | 12 → **21** | 13 → **20** | **37** |
| midage/female | 22 → **36** | 17 → **24** | 12 → **21** | 13 → **20** | **37** |
| midage/male | 22 → **36** | 17 → **24** | 12 → **21** | 13 → **20** | **37** |
| elder/female | 22 → **36** | 17 → **24** | 12 → **21** | 14 → **21** | **37** |
| elder/male | 22 → **36** | 17 → **24** | 12 → **21** | 14 → **21** | **37** |
| **Total** | | | | | **364** |

Per bundle that is 4 unlock + 10 top + 7 bottom + 7 or 9 onepiece + 6 or 7 shoes.

### G.3 Suggested phasing, if the number has to come down

1. **Phase 0 — the unlock (40 files).** Do this first regardless of everything else. It removes
   the last body-type restriction in the catalogue and it needs no new silhouette decisions.
2. **Phase 1 — the silhouette-widening families (140 files):** `long-coat`, `duster-cardigan`,
   `smock-top`, `bolero`, `tabard`, `swim-top` (60); `capris`, `culottes`, `flares`,
   `swim-bottoms` (40); `ball-gown`, `nightgown`, `sleep-onesie`, `unitard` (40). These are the
   families that fix §B, and none of them needs a cultural review.
3. **Phase 2 — shoes (68 files).** Cheapest art per file in the catalogue; the whole slot is the
   bottom 60px of the canvas.
4. **Phase 3 — the cultural block (116 files), gated on review.** `kurta`, `dashiki`, `jeogori`,
   `haori` (40); `shalwar`, `chima`, `sarong` (30); `thobe`, `yukata`, `ao-dai` (30); `sari`,
   `abaya` (16). Draw them, then hold them until §A.5's review gate clears.

   40 + 140 + 68 + 116 = 364.

**⚠ judgement — a caution about the top count.** This lands the teen-through-elder bundles at 36
tops. The prior round's inferred industry band was 12–16 genuinely distinct silhouettes per body
region (`CATALOG-RESEARCH.md` §A.7). Thirty-six tops cannot all be distinct silhouettes, and
pretending otherwise is how we got here. The honest position is that a bundle of 36 tops is
carrying roughly 20 distinct outlines with two or three surface-differentiated instances on the
busiest of them — which is legitimate under the contract, **but only if §H happens.** If the
budget forces a cut, cut new top families before anything else and do the redraws instead.

---

## H. Redraw, do not add

These are existing assets. Nothing here is a new family and nothing here changes a family key.

### H.1 The plain closed hip-length cluster — the priority

`tee`, `hoodie`, `turtleneck` and `sweater` currently differ from each other on **one** axis at a
time (§B.2). Push each onto a different pair of values. The family names and the broad reads stay;
only the drawn outline changes.

| Family | Redraw it as | Now differs from `tee` on |
|---|---|---|
| `tee` | Unchanged — the baseline. Short set-in / closed / hip / straight. | — |
| `hoodie` | **Dropped shoulder, hem past the hip**, with the hood drawn as a genuine three-dimensional mass standing proud behind the neck and reading in the outline, not as a flat shape appliquéd on the back. | shoulder + hem |
| `turtleneck` | **Fitted through the body, hem past the hip**, with the neck tube drawn as a raised cylinder that clears the shoulder line and changes the outline above the collarbone. | volume + hem |
| `sweater` | **Boxy and dropped, hem at the waist**, with the deep rib band pulling the hem *narrower than the chest* so the outline is a trapezoid rather than a rectangle. | shoulder + volume + hem |
| `stripes` | Confirm it is drawn as the **boat-neck** long-sleeve boxy top the contract specifies: the wide horizontal neckline must cut across the shoulder points and change the outline. If it currently reads as a tee with bands on it, that is the whole bug in one asset. | shoulder + volume |

### H.2 The three strap tops — required by the §C unlock

Once `tank`, `camisole` and `ribbed-vest` all exist in every bundle, they separate on strap width
and rib texture, both of which are trim.

- `tank` — keep. Scooped neck, narrow set straps, fitted to the hip. The baseline.
- `ribbed-vest` — redraw with the **armhole cut deep and low into the ribs** and a boxy body. The
  armhole depth is an outline change; the rib is not.
- `camisole` — redraw as a **skimming bias-cut body with a straight or scalloped upper edge and a
  hem falling below the hip**, on spaghetti ties set wide.

### H.3 Footwear collisions created by §D.4

- **`dress-shoes`** — currently "low-cut slip-on, tapered toe, thin sole, no visible fastening",
  which will collide with `ballet-flats` and leaves `oxfords` doing all the formal work. Redraw it
  toward the **loafer** read its description already permits: raised vamp, visible apron seam
  across the toe, low stacked block heel. Same family, same description, a distinguishable shoe.
- **`sandals` / `flip-flops` / `slides`** — three open uppers. Give each its own fastening:
  `flip-flops` keeps the Y-thong, `slides` is the backless single band, and **`sandals` should be
  redrawn with a closed heel counter and an ankle buckle** so its "two or three straps" resolve
  into an ankle-strapped sandal rather than a third slide.
- **`mary-janes` vs `ballet-flats`** — keep `mary-janes` on a chunky round toe with a small heel
  and a clear instep strap; `ballet-flats` is flat, strapless and scooped low across the instep.

### H.4 One-piece collisions created by §D.3

- **`kaftan`** must keep its **mid-calf** hem, wide draped sleeves and slit neckline, so that
  `thobe` (ankle, narrow set-in sleeves, band collar) and `abaya` (ankle, open front) read apart
  from it.
- **`robe`** must keep its **shawl collar, soft tie belt at the natural waist and calf hem**, so
  that `yukata` (ankle, flat overlapping band collar, wide flat sash, hanging rectangular sleeve
  panels) reads apart from it. If the two end up the same drawing with a different belt, redraw
  the yukata's sleeve panels until they carry it.

### H.5 A description that cannot currently be honoured

`cardigan`'s binding silhouette says "showing **the layer beneath**". There is no layer beneath —
`top` holds exactly one asset. Either the opening shows skin, or the file draws its own shell.
`FAMILIES.md` should be amended to say which (that is a documentation change for whoever owns that
file, not something an art agent should decide per bundle), and until it is, follow §E.2: paint
the opening through `--skin1`/`--skin2`, or draw an integral shell painted through `--c2`/`--c3`.

---

## I. Engineering changes — flagged, not authored

Per the brief, nothing below is in the authoring list in §D. Do not draw any of it.

### I.1 An `overlayer` slot — needed for coats and cardigans over dresses, and for aprons

**Why.** `top` (z 40) is suppressed by `onepiece` (z 45, `data-hides="top,bottom"`). So a long
coat or a duster cardigan cannot be worn over any dress, and an apron cannot be worn over anything
at all. This is the most-wanted layering combination in the genre and the only one our slot
architecture cannot express.

**Exact change.**

1. `src/catalog/types.ts` — add `'overlayer'` to the `SLOTS` tuple. It is a per-bundle body slot,
   so it must **not** go in `ACCESSORY_SLOTS`.
2. `src/catalog/layers.ts` — add `'overlayer'` to `LAYERS` and give it `LAYER_Z['overlayer'] = 47`.
   That places it above `onepiece` (45) and below `shoes` (50), so a coat draws over a dress and
   the shoe still draws over the coat hem, which is correct.
3. Confirm that neither `onepiece` nor `costume` ever lists `overlayer` in its `data-hides`; add
   `overlayer` to `costume`'s `data-hides` if a costume should suppress it (it should).
4. Add the slot to the studio's category list so it appears in the tray.
5. Extend `silhouette.test.ts`'s `(bundle, slot)` grouping to cover the new slot — it is generic
   over `SLOTS`, so this should be free, but check it.

**Families it would then unlock, at 10 files each:** `apron` (bib apron on two neck-and-waist ties,
open at the back and the sides, hem at the knee), and re-homing `long-coat` and `duster-cardigan`
from `top` to `overlayer`. **Not proposed for this round** — §D authors both coats in `top`, which
is the correct call given the engine as it stands today.

### I.2 Nothing else in this document needs an engine change

Every other family in §D fits an existing slot with existing semantics. The changes already
recorded in `ASSET_CONTRACT.md` under "Slots that do not exist yet" (facial hair, face markings,
mobility aids, `ear-tech`) are unaffected by this proposal and are not restated here.

---

## J. Considered and rejected — with the reason

Included so nobody re-proposes these.

| Proposal | Slot | Why not |
|---|---|---|
| `guayabera` | top | Its identity is four patch pockets and two vertical *alforza* pleat rows ([Guayabera](https://en.wikipedia.org/wiki/Guayabera)) — both surface, both banned as family-defining. Against `button-up` it differs on barely one axis. It is a great **instance** of `button-up`; draw it as one. |
| `huipil` | top | Designs identify a specific community and some communities prohibit outside use (§A.5). Not ours to genericise. |
| `cheongsam` / `qipao` | onepiece | Documented modern use is formal and ceremonial, not everyday (§A.5). Hold for a consultant-reviewed round. |
| `kilt` | bottom | Differs from `pleated` on wrap-closure and a flat front apron, which is two axes on paper but reads identically at 64px in the tray. Also carries clan-specific tartan expectations we cannot meet without a surface-defined family. |
| `cape` | top | Collides with `poncho` at thumbnail size — both are a sleeveless shoulder-hung flare, and the open front seam is not enough to separate them. |
| `parka` | top | Sits between `raincoat` (thigh, flared, hooded) and `long-coat` (calf, straight). Differs from `raincoat` on closure alone. |
| `off-shoulder` / `halter-top` | top | Both put their whole identity in the neckline, which the silhouette test discounts as trim. Against `camisole` and `swim-top` they gain about one axis. |
| `pyjama-top` + `pyjama-pants` | top / bottom | A pyjama set is `button-up` + a loose trouser with piping — and piping is trim. Sleepwear is served properly by `nightgown` and `sleep-onesie` in `onepiece`, which are real distinct silhouettes. |
| `scrub-top` | top | V-neck plus a patch pocket on a straight boxy body is `tee` with trim. Occupational dress is served by `tabard` plus the existing `medic` costume. |
| `bermuda-shorts` | bottom | Falls between `shorts` (mid-thigh) and `capris` (mid-calf) and differs from each on roughly one axis. |
| `circle-skirt` | bottom | The skirt shelf already carries six families (`skirt`, `pleated`, `tiered-skirt`, `maxi-skirt`, `pencil-skirt`, `tutu`). A smooth mid-calf flare is one axis from `tiered-skirt`. |
| `leotard` | onepiece | Effectively identical to `swimsuit` — strap / closed / leg-line / fitted. `unitard` (full-length, skin-close) carries the activewear read instead. |
| `drop-waist-dress` | onepiece | The dress shelf is the most crowded in the catalogue; a hip seam is structural detail, not an axis. |
| `chelsea-boots` | shoes | One axis from `boots` (elastic gusset instead of laces). |
| `geta` / cultural footwear | shoes | Would ship footwear for exactly one of the traditions in §D's cultural block, which reads worse than shipping none. `sandals` and `slippers` already cover the flat-thonged and soft-soled outlines. Revisit as a set, with review, or not at all. |
| `apron` | — | Needs the `overlayer` slot (§I.1). `tabard` is the interim answer. |
| `hi-vis-vest` | top | Its identity is reflective banding — a surface treatment. `tabard` is the silhouette; hi-vis is one of its instances. |

---

## Sources

Fetched directly for this round:

- [Coat (clothing)](https://en.wikipedia.org/wiki/Coat_(clothing))
- [Nightwear](https://en.wikipedia.org/wiki/Nightwear)
- [Swimsuit](https://en.wikipedia.org/wiki/Swimsuit)
- [Sportswear (activewear)](https://en.wikipedia.org/wiki/Sportswear_(activewear))
- [Scrubs (clothing)](https://en.wikipedia.org/wiki/Scrubs_(clothing))
- [Apron](https://en.wikipedia.org/wiki/Apron)
- [School uniform](https://en.wikipedia.org/wiki/School_uniform)
- [Adaptive clothing](https://en.wikipedia.org/wiki/Adaptive_clothing)
- [Skirt](https://en.wikipedia.org/wiki/Skirt)
- [Trousers](https://en.wikipedia.org/wiki/Trousers)
- [Shoe](https://en.wikipedia.org/wiki/Shoe)
- [Folk costume](https://en.wikipedia.org/wiki/Folk_costume)
- [Shalwar kameez](https://en.wikipedia.org/wiki/Shalwar_kameez)
- [Sari](https://en.wikipedia.org/wiki/Sari)
- [Thawb](https://en.wikipedia.org/wiki/Thawb)
- [Abaya](https://en.wikipedia.org/wiki/Abaya)
- [Dashiki](https://en.wikipedia.org/wiki/Dashiki)
- [Hanbok](https://en.wikipedia.org/wiki/Hanbok)
- [Yukata](https://en.wikipedia.org/wiki/Yukata)
- [Áo dài](https://en.wikipedia.org/wiki/%C3%81o_d%C3%A0i)
- [Cheongsam](https://en.wikipedia.org/wiki/Cheongsam)
- [Huipil](https://en.wikipedia.org/wiki/Huipil)
- [Guayabera](https://en.wikipedia.org/wiki/Guayabera)
- [Poncho](https://en.wikipedia.org/wiki/Poncho)
- [MasterClass — Essential Guide to Dress Silhouettes](https://www.masterclass.com/articles/essential-guide-to-dress-silhouettes)
- [The Knot — Wedding Dress Silhouettes](https://www.theknot.com/content/wedding-dress-silhouettes)
- [SewGuide — Dress Silhouettes](https://sewguide.com/dress-silhouettes/)

Carried forward from the previous round rather than re-researched — see `docs/CATALOG-RESEARCH.md`
for the full citations: the Sims 4 outfit-occasion categories and life-stage boundaries (§A.2),
Animal Crossing's Style and Theme vocabulary and its silhouette-vs-surface tradeoff (§A.3), Toca
Boca World's creator structure and inclusivity principles (§A.1), the perceived-richness ranking
and the 12–16 silhouettes-per-slot inference (§A.7), Code My Crown and the textured-hair failure
modes (§A.8.1), head coverings as everyday wardrobe (§A.8.2), the *Star Athletica* costume/IP line
(§A.10), the Geena Davis Institute and IGDA cultural-review recommendation and the Sims 4 Fashion
Street Kit precedent (§A.11), and the dressing-skills and adaptive-clothing evidence for age
differentiation (§A.9).
