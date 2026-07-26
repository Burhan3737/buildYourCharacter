# Research — Comedy, Novelty and Formalwear

**Date:** 2026-07-27
**Status:** Research and proposal. **No art is authored yet and `docs/FAMILIES.md` is unchanged.**
**Companion documents:** `docs/ASSET_CONTRACT.md` (authoring rules — binding),
`docs/FAMILIES.md` (the canonical family list), `docs/CATALOG-RESEARCH.md` §A.10 and §B.6
(the existing trademark rules and the two costumes that had to be re-keyed).

This document is written to be read cold by an art agent with no other context. If you are about
to draw, you need **§3** (the family list), **§4** (the rules that bite) and **§5** (counts). §1
and §2 are the reasoning.

---

## 0. The brief, and what it was interpreted as

The request was for *"funny assets — joker like clothes or some fancy clothes"*. That is two
families of request, and this document proposes both:

1. **Comedy and novelty** — jester, harlequin, clown, mime, animal onesies, food costumes,
   inflatable-look costumes, absurd oversized items, cartoonish disguises.
2. **Fancy and formal** — black tie, ballgowns, tailcoats, historical formal (rococo, regency,
   victorian, 1920s), disco, wedding.

**"Joker" is not proposed and must never be drawn.** The Joker is a DC Comics character and the
green-hair-plus-purple-tailcoat-plus-white-face-plus-red-grin combination is his signature. What
*is* proposed is the public-domain ancestry that character was built from: the **commedia
dell'arte harlequin**, the **medieval court jester**, the **circus clown**, and **Pierrot**.
Those are archetypes with a documented five-hundred-year history and no owner. §3 states, per
family, exactly how it stays on the safe side of that line, and §6 lists what was rejected.

This project has already had to strip two costumes that read as trademarked characters
(`spider` → `web-runner`, `thunder-god` → `storm-herald`; see `docs/CATALOG-RESEARCH.md` §B.6).
The lesson recorded there is the one that governs this document: **a generic display name does
not cure a signature colour-plus-marking combination.** Because `--c1/--c2/--c3` are player-
tunable anyway, no family here may rest its identity on a palette — which conveniently removes
the single largest source of trademark risk.

---

## 1. Findings

### 1.1 The harlequin: the diamonds are late, and they will not read at 64px

Tristano Martinelli's original Arlecchino (late 16th c.) wore **"a linen costume of colourful
patches"** — irregular patches, not a lattice — with a hare-tail cap ornament and a black leather
half-mask. The regular rhombus lattice we now think of as "harlequin" is a **17th-century Paris
adaptation** by Dominique Biancolelli: *"the rhombus shape of the patches arose by adaptation to
the Paris fashion of the 17th century"*
([Wikipedia: Harlequin](https://en.wikipedia.org/wiki/Harlequin)).

The garment itself is a **close-fitting two-piece reading as one continuous suit** — jacket and
breeches in matching cloth with a waist seam — plus a wooden sword (*batte*, the original
"slapstick") on a leather belt, and in some variants a large three-tiered collarette.

**The load-bearing finding for us:** the contract caps pattern motifs at 12–24 canvas units
(`ASSET_CONTRACT.md`, "Using `<pattern>`"). At tray size, 600 canvas units map to ~64 screen
pixels — a scale of about **0.107 px per canvas unit** — so a 22-unit diamond is **2.4 screen
pixels**. The diamonds become undifferentiated texture in the picker. **Harlequin's identity in
the tray must therefore be carried entirely by its outline**: the skin-close continuous
one-piece, the horizontal waist seam, and the small ruff at the throat. The diamonds are a
bonus visible only on the stage.

### 1.2 The jester: "motley" is a fabric, and the diamonds were borrowed from harlequin

Motley was *"a woollen fabric of mixed colours"* made in England from the 14th–17th centuries,
and recent scholarship suggests it was *"one pattern with different coloured threads running
through it"* rather than a check. Wikipedia is explicit that the popular red/green/blue diamond
image *"derived from the harlequin character in commedia dell'arte"* and that motley **"did not
have to be checkered"** — i.e. the modern jester look is **theatrical convention, not history**
([Wikipedia: Motley](https://en.wikipedia.org/wiki/Motley)).

The jester's documented, non-fabric signifiers are the **cap and bells** and the **marotte**
(fool's sceptre), both of which *"mirrored the royal crown and sceptre wielded by a monarch"* and
were *"symbols denoting their status and protection under the law"*
([Wikipedia: Jester](https://en.wikipedia.org/wiki/Jester)). Period images — e.g. Heinrich
Vogtherr the Younger's woodcut, c. 1540 — show *"a fool's cap, motley and white tights"*.

**Consequence for us:** we cannot define `jester` by a diamond pattern (it is a surface, it is
banned by §0.2 of `FAMILIES.md`, and it is harlequin's anyway). We define it by the **dagged hem**
— the deep pointed tabs at the doublet hem and sleeve cuffs, each ending in a bell — which is a
genuine silhouette and is unmistakable in outline. The belled cap goes to `headwear`.

### 1.3 The clown: three traditions, one of which is safe to draw

- **Whiteface** descends from Pierrot. Joseph Grimaldi established it in **1801**, *"painting a
  white base over his face, neck and chest before adding red triangles on the cheeks, thick
  eyebrows and large red lips."*
- **Auguste** is the bumbling foil, established by **Tom Belling in the 1870s**, and it is the
  template for the modern circus clown: *"red nose, white makeup around the eyes and mouth, and
  oversized clothes and shoes"* — plus loud patterns and **braces**, used to signal clumsiness.
- **Character / tramp / hobo** clowns are an American circus development using flesh-tone base
  and comic props rather than paint
  ([Wikipedia: Clown](https://en.wikipedia.org/wiki/Clown)).

**The whole readable half of the auguste is makeup, and we cannot draw makeup.** The costume
layer is z 80 and draws *above* the face (z 60); `ASSET_CONTRACT.md` §6 forbids any head coverage
at all, and `face-mark` is listed under "Slots that do not exist yet". So the proposed `clown`
family is **the garment only** — oversized romper, ruff, pom-pom buttons — and the red nose is
handled separately (§4.2). The **tramp/hobo** tradition is deliberately not proposed: its
canonical form (bowler + toothbrush moustache + cane + tight short jacket) is Chaplin's Little
Tramp, a specific character. See §6.

### 1.4 Pierrot: the one comedy archetype that is pure garment

Pierrot performs *"unmasked, with a whitened face"* and wears *"a loose white blouse with large
buttons and wide white pantaloons"*, usually with *"a frilled collaret"*. Jean-Gaspard Deburau
(Paris, 1820s–40s) *"dispensed with the frilled collaret, substituted a skullcap for a hat, and
greatly increased the wide cut of both blouse and trousers"*
([Wikipedia: Pierrot](https://en.wikipedia.org/wiki/Pierrot)).

That last clause is the gift: **Deburau's own innovation was to make the silhouette bigger.**
Volume *is* the family. The oversized round buttons in a vertical line and the flat disc of the
collaret give two more outline events at tray size.

### 1.5 The ruff is the single best comedy neckpiece in the catalogue

A ruff is *"a tightly gathered collar set into formal or informal pleats"*, linen cambric,
starched, later shaped with heated cone-shaped goffering irons into figure-of-eight folds. Mid-
16th to mid-17th century; by the 1590s **"cartwheel ruffs"** measured *"a foot or more wide"* and
needed wire *supportasses*. Crucially, ruffs were **detachable** so they could be laundered
separately — and they survived in fashion's afterlife specifically *"within theatrical costume
traditions for clown and Pierrot characters"*
([Wikipedia: Ruff (clothing)](https://en.wikipedia.org/wiki/Ruff_(clothing))).

**A detachable neck ring that draws above everything is exactly what our `necklace` slot is.**
Proposing `ruff` as a `necklace` family costs 3 files (pool-authored) and makes *every* outfit in
the catalogue available in a comedy register. It is the highest value-per-file item in this
document.

### 1.6 Modern mime

The stock silent-mime look is *"tight black and white clothing with white facial makeup"*
([Wikipedia: Mime artist](https://en.wikipedia.org/wiki/Mime_artist)). Marcel Marceau's **Bip**,
created **1947** at the Théâtre de Poche, wore *"a striped pullover and a battered, be-flowered
silk opera hat"* ([Wikipedia: Marcel Marceau](https://en.wikipedia.org/wiki/Marcel_Marceau)).
The horizontal-banded top plus braces is generic street-performer shorthand; **the crushed opera
hat with the red flower is Bip's specific signature and is not proposed** (§6).

### 1.7 Novelty: onesies, food and inflatables

- **Kigurumi** splits into two things: professional **mascot costumes** (着ぐるみ, the original
  sense) and **"cosplay pajamas… a type of Japanese onesie that resembles an animal"**
  ([Wikipedia: Kigurumi](https://en.wikipedia.org/wiki/Kigurumi)). The sleepwear onesie is the
  one to draw: it is a standing retail category, and leaving the *species* to the player (via
  `--c1/--c2/--c3` plus the already-planned `animal-ears` headwear) is both cheaper and safer
  than drawing any particular creature.
- **Inflatable costumes** use *"a battery-powered blower that sucks air into the costume"* and
  *"usually stand 9–10 feet tall when inflated"*; bestsellers are T-Rex, sumo, ballerina, cow,
  pig, chicken ([Wikipedia: Inflatable costume](https://en.wikipedia.org/wiki/Inflatable_costume)).
  The reason they work is pure silhouette: a near-spherical body with **thin ribbed tube limbs
  held out away from it**. That is an outline no other costume in our catalogue has, which makes
  it excellent tray value.
- **Food costumes** are a barrel/tabard construction — a rigid convex slab hung from the
  shoulders with the limbs entirely outside it. Again: outline, not surface.

### 1.8 Formalwear construction — what actually distinguishes each garment

**White tie.** A *"black double-breasted barathea wool or ultrafine herringbone tailcoat with
silk faced peak lapels"*. The front **cuts away horizontally at the waist**, tails hang behind,
and — the detail most people get wrong — **it has no front buttons and is never fastened**; it is
worn open over a low-cut white piqué waistcoat that *"should not be visible below the front of
the tailcoat"*. Trousers carry *"two galon down the outside of both legs"*. Women wear
*"a full-length evening dress"* ([Wikipedia: White tie](https://en.wikipedia.org/wiki/White_tie)).

**Black tie.** A dinner jacket with **either a shawl collar or a peaked lapel** in silk grosgrain
or satin; *"the peaked lapel and shawl collar are equally authentic and correct, with the latter
being slightly less formal."* Most formal form is **single-breasted, one button only, jetted
pockets, ventless**. Trousers take *"a single braid of silk"* on the outer seam, no turn-ups, no
belt loops. **Either a cummerbund or a low-cut waistcoat — never both**
([Wikipedia: Black tie](https://en.wikipedia.org/wiki/Black_tie)).

> Note what this means for us: **the silk facing and the braid stripe are surface treatments.**
> Under `FAMILIES.md` §0.2 they cannot found a family. "Tuxedo trousers" is `tailored-trousers`
> with a stripe on it, and it is not proposed. The **shawl collar** is a silhouette (an unbroken
> curved roll from neck to a single button, versus the stepped V of a notched lapel), and it is.

**Ball gown.** *"Cut off the shoulder with a low décolletage, exposed arms, and long bouffant
styled skirts"*, full-length, historically supported by petticoats and crinolines
([Wikipedia: Ball gown](https://en.wikipedia.org/wiki/Ball_gown)).

**Rococo — *robe à la française* / sack-back gown.** Back fabric *"arranged in box pleats which
fell loose from the shoulder to the floor"* (Watteau pleats); front **open to display a
decorative stomacher and petticoat**; worn over *"a wide square hoop or panniers"*; elbow-length
sleeves with scalloped ruffles and separate lace *engageantes*. By the 1770s it was *"second only
to court dress in its formality"*
([Wikipedia: Sack-back gown](https://en.wikipedia.org/wiki/Robe_%C3%A0_la_fran%C3%A7aise)).
**The panniers are the point: this silhouette is wide side-to-side and flat front-to-back** — a
rectangle, not a dome. Nothing else in our `onepiece` slot looks like that.

**Regency (1795–1820).** The **empire silhouette**: *"a fitted bodice and high waist"* directly
under the bust, skirt falling loosely below, narrow in front with fullness gathered at the raised
back waist; short sleeves or bare arms with long gloves; muslin
([Wikipedia: 1795–1820 in Western fashion](https://en.wikipedia.org/wiki/1795%E2%80%931820_in_Western_fashion)).

**Victorian — the bustle.** *"A padded undergarment or wire frame used to add fullness, or
support the drapery, at the back."* Two periods: **1869–1876** and **1881–1889**, the latter
*"reaching preposterous proportions"* in 1885. The resulting profile is **flat at the front with
a dramatic rear projection** and often a train
([Wikipedia: Bustle](https://en.wikipedia.org/wiki/Bustle)). This is the only **front-to-back
asymmetric** outline in the whole proposal and is therefore very cheap to tell apart.

**1920s flapper.** *"Straight and loose"*, *"dropping the waistline to the hips"* — a boyish tube
rather than a shaped body. Hems rose to *"just below the knee"* by **1927**. Signature
accessories: *"many layers of beaded necklaces"*, the **cloche hat**, headbands
([Wikipedia: Flapper](https://en.wikipedia.org/wiki/Flapper)). **The dropped-waist seam is a
silhouette event; the fringe and beading are surface.**

**Disco (1970s).** Men: *"shiny polyester shirts with colorful patterns and pointy, extra wide
collars"*; the leisure suit *"form-fitted"* at waist and seat with the leg *"flared… in a bell
bottom style, to permit freedom of movement."* Women: *"backless halter tops, disco pants… or
body-hugging spandex bodywear or 'catsuits'"*, plus *"glitter makeup, sequins, or gold lamé"* and
**platform shoes** ([Wikipedia: Disco](https://en.wikipedia.org/wiki/Disco)). Sequins and lamé
are surface; the **halter neck + hard knee-break bell leg** is the silhouette, and `platform-boots`
already exists in `shoes`.

**Wedding.** The white dress follows **Queen Victoria's 1840 wedding** — *"a white gown trimmed
with Honiton lace"*, widely illustrated and then widely copied
([Wikipedia: Wedding dress](https://en.wikipedia.org/wiki/Wedding_dress)). Modern "wedding white"
spans *"eggshell, ecru, and ivory"* — which is a reminder that **white is a default, not an
identity**; the family must survive being recoloured black.

### 1.9 The 64-pixel arithmetic, stated once

The picker shows each asset at roughly **64×64**. The canvas is 600 units tall, so the scale is
about **0.107 screen pixels per canvas unit**. Therefore:

| Canvas size | Screen size at tray | Verdict |
|---|---|---|
| 12–24u (a legal `<pattern>` motif) | 1.3–2.6 px | **texture only** — never an identity |
| 40u | ~4.3 px | the practical floor for "I can see that" |
| 60u | ~6.4 px | a confident, countable feature |
| 120u (adult torso width) | ~13 px | the reference measure |

**Every family below is designed so that its identity survives at 40u+.** Concretely: a jester's
hem tab must be ≥30u deep, a clown's ruff must project ≥45u beyond the neck on each side, a ball
gown's dome must clear the widest point of the body by ≥40u per side, and a bustle must project
≥50u behind the hip line. If a proposed feature is smaller than 40u, it is decoration and cannot
be the thing that tells two families apart.

---

## 2. Slot placement — the decision that matters most

Getting this wrong means a player cannot put a tuxedo jacket with different trousers. The
recommendation is a hard split:

### 2.1 Comedy and novelty → `costume`

**All ten comedy families go in `costume`** (`data-hides="top,bottom,shoes"`).

Justification: each is a *character archetype* with no separable real-garment existence. Nobody
wears half a clown. They sit correctly beside `dino`, `wizard`, `knight` and `astronaut`, which
are the same kind of thing. `costume` hiding shoes is correct here — an inflatable suit or a
food tabard genuinely subsumes the footwear, and a clown's shoes are a gag we cannot draw anyway
(see §4.3).

**One exception considered and rejected:** `mime` looks separable (banded top + braces + cropped
trousers). It stays in `costume` because its identity is the *combination*, and splitting it
would require a "braces" `top` family that collides with `overalls-top` on the shoulder axis
while adding nothing.

### 2.2 Formalwear → `top`, `bottom` and `onepiece`. **Never `costume`.**

This is the strong recommendation of this document, for four reasons:

1. **`costume` hides shoes.** Formalwear is the one category where the shoe is part of the look —
   `dress-shoes`, `heels`, `platform-boots` all already exist. A tuxedo in `costume` would forbid
   the player from choosing any of them. That alone settles it.
2. **Mix-and-match is the entire point of formalwear.** A tailcoat over jeans, a dinner jacket
   over a hoop skirt, a tuxedo jacket with joggers — these are looks a player *wants*, and they
   are only reachable if the jacket is a `top`.
3. **These are real garments, not archetypes.** §0.3 of `FAMILIES.md` reserves `costume` for
   archetypes explicitly, and directs cultural and ordinary dress to `top` and `onepiece`. A
   tailcoat is ordinary dress that happens to be formal.
4. **§0.1, no aisles.** Splitting formalwear across `top`/`bottom`/`onepiece` automatically makes
   every combination available on every body type, with no extra work.

Concretely:

| Garment | Slot | Why |
|---|---|---|
| Tailcoat | `top` | A jacket. `top` draws over `bottom`, so the tails hang correctly over any trousers or skirt. |
| Dinner jacket (tuxedo jacket) | `top` | A jacket. Pairs with existing `waistcoat`, `tailored-trousers`, `bow-tie` (necklace). |
| Hooped/crinoline skirt | `bottom` | A skirt. Lets a player build a gown from parts, and pair a dinner jacket with a ball skirt. |
| Ball gown, bridal gown, sack gown, bustle gown, empire gown, flapper dress | `onepiece` | Bodice and skirt are one constructed garment with a continuous outline; splitting them would produce two families neither of which reads. `data-hides="top,bottom"` leaves shoes selectable. |
| Disco flare jumpsuit | `onepiece` | Same reason as `jumpsuit`, which is already there. |
| Tuxedo trousers | **not proposed** | `tailored-trousers` + a braid stripe. A stripe is a surface (§0.2). |
| Formal waistcoat | **not proposed** | `waistcoat` already exists; formality is a facing, i.e. surface. |
| Wide-collar disco shirt | **not proposed** | `button-up` with a bigger collar. Trim, not silhouette. |

### 2.3 Heads → `headwear` (pool), and one borrowed slot

`headwear` is **not per bundle**. It is authored once per head-size class (`toddler`, `teen`,
`adult`) at `src/assets/accessories/<class>/headwear/<family>.svg` and mapped by a uniform
circle-to-circle transform, so **3 files per family, not 10 or 12** — and everything must stay
within about **1.3 head radii** of the head centre. See §4.4 for the arithmetic and what it kills.

---

## 3. Proposed families

Two families in the same `(bundle, slot)` must differ on **at least two** of *shoulder/sleeve ·
closure · hem · volume* (for `bottom`: *rise · leg length · leg width · hem treatment*). Each
entry below names its nearest sibling and the two axes. **Write those two axes into an XML
comment at the top of the file**, as `wizard.svg` does.

### 3.1 Comedy and novelty — `costume` slot, tier **Growing** (toddler → elder, both body types, 10 files each)

Every one declares `data-slot="costume" data-layer="costume" data-hides="top,bottom,shoes"` and
keeps all art at or below `y = shoulderY − 8` (§4.1).

---

**`jester`** — *Jester's Motley*

- **Silhouette:** A boxy doublet over close hose, its hip hem cut into four or five deep pointed
  tabs (dags), each tab ending in a small round bell; the sleeve cuffs are cut into the same
  points, with a bell at each.
- **Nearest sibling:** `harlequin`. **Axes: hem** (deep dagged tabs breaking the outline vs. an
  uninterrupted waist seam) **+ volume** (boxy doublet standing away from close hose vs. skin-close
  throughout).
- **Trademark:** The medieval fool is public domain and unowned. Identity rests on the **dagged
  tab hem**, which is a construction, not a palette or a pattern — and per §1.2 the diamond
  motley people associate with jesters is borrowed from harlequin and is not historical anyway.
  Explicitly: **no green-and-purple default, no white face, no red grin, no crown.** Nothing
  about this family may point at any comic-book character.
- **Face rule:** The belled cap is the whole problem, and it is solved by moving it out — see
  `jester-hood` in §3.3. The costume file draws **no head art of any kind**; a small standing
  scalloped collar at the neck (top edge at `shoulderY − 8`) is the visual hand-off to the hood.
- **Surface tools:** panel blocking (vertical split of the doublet body through `--c1`/`--c2`) +
  trim (the bells and the tab edging in `--c3`).

**`harlequin`** — *Harlequin Suit*

- **Silhouette:** A skin-close one-piece from a narrow standing collar to the ankle, with a single
  horizontal waist seam and tapered wrists and ankles; a small soft gathered ruff at the throat.
- **Nearest sibling:** `jester`. **Axes: closure** (one continuous suit, no break in the outline
  vs. a separate doublet hem) **+ volume** (skin-close vs. boxy). Also unlike `web-runner`, which
  is a bodysuit with a raised collar: **hem** is identical, so it must differ on **volume**
  (harlequin has a waist seam and softer, rounder limb taper) **+ closure** (harlequin's ruff and
  waist seam break the suit into three regions; web-runner is one unbroken lattice) — check this
  one carefully on the contact sheet, it is the closest pair in the slot.
- **Trademark:** Commedia dell'arte, late 16th c., public domain; explicitly cited as such in
  `docs/CATALOG-RESEARCH.md` §A.10's logic (stock theatrical archetypes are common concepts). The
  diamond lattice is drawn through `--c2`/`--c3` as a `<pattern>` and is fully recolourable, so
  there is **no signature colour combination**. **No black leather half-mask** (banned by the face
  rule anyway), **no batte/slapstick prop**, no bat, no playing-card motif.
- **Face rule:** Nothing above the collarbone. The ruff sits at the base of the neck, under the
  ceiling. A player who wants the big ruff adds the `ruff` necklace over it (§3.3) — so **draw
  the built-in ruff low and shallow** (≤25u projection) or the two will fight.
- **Surface tools:** pattern (a 20–24u diamond lattice, clipped to the body, over a gradient) +
  trim (a contrast waist band and neck bind).

**`clown`** — *Circus Clown Suit*

- **Silhouette:** A hugely oversized closed romper — dropped shoulders, sleeves and legs
  ballooning to gathered cuffs at wrist and ankle — with a deep gathered ruff at the neck and
  three oversized pom-pom buttons in a vertical line down the centre front.
- **Nearest sibling:** `pierrot`. **Axes: shoulder** (dropped, no sleeve head vs. a draped bell
  sleeve) **+ volume** (a gathered barrel that is widest at the hip vs. a straight column).
- **Trademark:** The **auguste** template — *"oversized clothes and shoes"* plus braces, Tom
  Belling, 1870s (§1.3) — is a standing retail category and is what makes it safe. Explicitly
  banned in this file: **no yellow-suit-plus-red-ruff default**, no specific film clown, no
  striped stockings paired with a fixed palette, **no face art, no wig, no red nose in this file**.
- **Face rule:** All three of the clown's most famous features (white face, red nose, frizz wig)
  are head art and none of them may appear here. The nose is handled as an optional `glasses`
  asset (§3.3, §4.2); the wig is **rejected outright** (§6).
- **Surface tools:** structural (the three pom-poms and the gathered cuff rings) + trim (a
  contrast ruff and cuff bands in `--c3`); optionally a large 20u dot `<pattern>` on the body.

**`pierrot`** — *Pierrot Blouse*

- **Silhouette:** A loose straight blouse to the hip with wide three-quarter bell sleeves and a
  large flat frilled disc collaret lying on the shoulders, over very wide gathered pantaloons that
  fall in a straight column to the ankle.
- **Nearest sibling:** `clown`. **Axes: shoulder** (draped bell sleeve vs. dropped) **+ volume**
  (straight column, widest at the shoulder vs. gathered barrel, widest at the hip).
- **Trademark:** 17th-century commedia; Deburau's version dates to the 1820s–40s (§1.4). Fully
  public domain. Default palette must **not** be white-on-white with black pom-poms — that is one
  step from a specific look; use a house-palette default and let the player go white.
- **Face rule:** The whitened face cannot be drawn (`face-mark` is an unbuilt slot, per
  `ASSET_CONTRACT.md`). The collaret is a *flat disc lying on the shoulders*, not a standing ruff,
  so it naturally sits under the ceiling — draw its top edge at `shoulderY − 8` and let it spread
  outward, not upward.
- **Surface tools:** trim (the collaret frill scallops and the sleeve-edge frills) + structural
  (four oversized round buttons in a vertical line at 60–70u spacing).

**`mime`** — *Street Mime*

- **Silhouette:** A close boat-neck long-sleeve banded body under two narrow braces, tucked into
  high-waisted straight trousers cropped clear above the ankle, with a white cuff band at each
  wrist reading as a glove edge.
- **Nearest sibling:** `harlequin`. **Axes: closure** (visible brace straps and a waistband break
  across the middle vs. one seamless suit) **+ hem** (cropped above the ankle, leaving a clear
  gap vs. full to the ankle).
- **Trademark:** Horizontal banding + braces is generic street-performer shorthand and a standing
  retail costume category. **Bip's crushed opera hat with a red flower is Marceau's specific
  signature and is not part of this family** (§6). No named character, no signature palette — the
  bands are drawn through `--c2` and recolour freely.
- **Face rule:** No head art. The **existing `beret` headwear family** completes the look at zero
  additional cost — say so in the picker name if the studio supports hints.
- **Surface tools:** pattern (even 16–20u horizontal banding through `--c2`, clipped to the body)
  + structural (the two brace straps and the visible high waistband).

**`critter-onesie`** — *Critter Onesie*

- **Silhouette:** A thick plush all-in-one with a full-length centre zip, a contrast belly panel,
  bulky cuffed wrists and ankles, a short round tail at the hip, and a soft hood **lying flat down
  across the shoulders**.
- **Nearest sibling:** `dino`. **Axes: closure** (a visible full-length centre zip splitting the
  body vs. a closed bodysuit) **+ volume** (thick plush that holds the arms away from the torso
  vs. a fitted rounded bodysuit).
- **Trademark:** Generic animal onesie / kigurumi sleepwear is a standing retail category
  (§1.7). **The species is deliberately unspecified** — the player picks it via `--c1/--c2/--c3`
  and the existing `animal-ears` headwear. Drawing no particular creature is both safer and
  cheaper. No mascot, no branded character.
- **Face rule:** `ASSET_CONTRACT.md` §6 permits **"hoods worn down"**. The hood is drawn as a flat
  mass across the upper back and shoulders, entirely at or below `shoulderY − 8`. Do **not** draw
  it up; do not draw a face inside it. Ears live in `headwear`.
- **Surface tools:** panel blocking (the contrast belly panel through `--c2`) + trim (ribbed cuff
  and ankle bands, and the zip line with a pull tag in `--c3`).

**`food-costume`** — *Snack Suit*

- **Silhouette:** One large convex slab hung free from two narrow shoulder straps, covering torso
  to mid-thigh, with the arms and legs entirely outside it, and a small stalk-and-leaf finial
  standing at the top edge.
- **Nearest sibling:** `critter-onesie`. **Axes: shoulder** (strap-hung, sleeveless, arms bare vs.
  a long plush sleeve) **+ volume** (a rigid free-hanging slab that does not follow the body vs. a
  gathered plush body that does).
- **Trademark:** Generic produce shapes are common concepts and were held in the case law summary
  in `docs/CATALOG-RESEARCH.md` §A.10 to be useful articles, i.e. just clothing. **No brand
  mascot, no fast-food character, no drawn lettering** (`<text>` is banned anyway, and drawn
  lettering reads as a logo).
- **Face rule:** Nothing above the straps. The stalk finial is at the *top of the slab*, roughly
  chest height — **it is not on the head** and must not approach it.
- **Surface tools:** panel blocking (a segmented wedge or slice division through `--c1`/`--c2`) +
  structural (the two straps, and the raised stalk with a leaf).

**`inflatable-suit`** — *Inflatable Suit*

- **Silhouette:** A near-spherical body from armpit to knee, with narrow ribbed tube arms held out
  away from the body at about 45° and narrow ribbed tube legs, gathered to a tight neck ring; a
  small round fan pod at the waist.
- **Nearest sibling:** `clown`. **Axes: shoulder** (rigid tube arms held away from the torso,
  changing the outline vs. dropped sleeves hanging along it) **+ volume** (a sphere vs. a barrel).
- **Trademark:** Inflatables are a retail commodity (§1.7). Because the *species* is not drawn —
  it is a plain inflated body — there is nothing to attach a character to. **No branded mascot, no
  team logo, no character face on the belly.**
- **Face rule:** The tight neck ring is the top of the asset and sits at `shoulderY − 8`. Nothing
  above it. This family is the strongest single silhouette in the proposal at tray size and needs
  no head art at all.
- **Surface tools:** structural (the horizontal ribbing rings on the limbs and the fan pod) +
  trim (a contrast neck ring and limb-end cuffs in `--c3`). A soft white highlight arc on the
  sphere does a lot of work here.

**`oversized-suit`** — *Too-Big Suit*

- **Silhouette:** An open-front lapelled jacket several sizes too large — shoulders projecting
  well outside the body, sleeves swallowing the hands, a single enormous button at the waist, hem
  at mid-calf — over trousers that puddle in folds at the ground line.
- **Nearest sibling:** `clown`. **Axes: closure** (open-front jacket with visible lapels and a
  layer beneath vs. a closed romper) **+ hem** (a coat hem at mid-calf over separate puddling
  trousers vs. a gathered ankle cuff).
- **Trademark:** The too-big suit is a vaudeville gag with no owner. **The tramp variant is
  rejected** — no bowler hat, no cane, no toothbrush moustache, no tight short jacket (§6). Keep
  the gag purely dimensional.
- **Face rule:** No head art. Note the jacket's projecting shoulders sit near the ceiling — the
  shoulder pads must top out at `shoulderY − 8` and gain their exaggeration by going **outward**,
  not up.
- **Surface tools:** structural (the one huge button, the collapsed sleeve folds, the puddled
  trouser breaks) + trim (contrast lapel facing and a pocket square).

**`disguise-coat`** — *Very Convincing Disguise*

- **Silhouette:** A long straight over-wide coat buttoned to the throat with the wide collar
  turned up around the jaw line, a tie belt knotted at the front, hem at mid-calf, and no hands
  visible — the sleeves end in pocket openings.
- **Nearest sibling:** `oversized-suit`. **Axes: closure** (belted and closed to the throat vs.
  open-fronted) **+ volume** (a straight narrow column vs. a wide sagging boxy jacket).
- **Trademark:** Generic trench coat. **No named detective, no specific film spy, no monogram.**
  The joke is the proportion and the turned-up collar; it needs nothing else.
- **Face rule:** The turned-up collar is the risk in this family. **It must stop at
  `shoulderY − 8`** — it frames the jaw from below and never reaches it. Do not draw it rising past
  the chin; the face and the front hair draw *underneath* the costume layer and would be erased.
  Pair with the existing `sunglasses` (glasses) and `flat-cap` (headwear) for the full gag.
- **Surface tools:** structural (the tie belt with a knot and two hanging ends, the storm flap,
  the epaulettes) + trim (a contrast collar underside and cuff straps).

### 3.2 Fancy and formal

#### `top` — tier **Older** (teen → elder, both body types, 8 files each)

**`tailcoat`** — *Tailcoat*

- **Silhouette:** Square built-up shoulders and wide peaked lapels over a front that cuts away
  horizontally at the natural waist, with two long tails hanging behind to the back of the knee;
  worn open, no fastening.
- **Nearest sibling:** `blazer` (structured square shoulders, notched lapels, open front, hip hem).
  **Axes: hem** (waist in front, knee behind — two distinct lengths in one garment vs. hip all
  round) **+ volume** (nipped and fitted through the waist vs. straight).
- **Trademark:** Standard white-tie construction, documented since the 19th century, no owner.
  The one thing to avoid: **a purple or green tailcoat over an orange waistcoat is the Joker.**
  The default palette must be a house-palette neutral and the art must carry no card, diamond or
  grin motif of any kind.
- **Face rule:** N/A — `top` is z 30 and draws under the face. No constraint.
- **Layer note:** `top` draws **over** `bottom`, so the tails hang correctly over `jeans`,
  `tailored-trousers` or `hoop-skirt`. Draw the tails as two separate panels with a visible gap
  between them at the back — at tray size that gap is what says "tails" rather than "long coat".
- **Surface tools:** panel blocking (silk-facing lapel panel through `--c2`) + structural (the
  cutaway front edge, the two tail panels, two waist buttons at the back).

**`dinner-jacket`** — *Dinner Jacket*

- **Silhouette:** Square shoulders under an unbroken rounded shawl collar that rolls from the neck
  to a single closed button at the natural waist; straight sleeves; hem just past the hip; no vent.
- **Nearest sibling:** `blazer`. **Axes: closure** (closed on one button with a continuous
  unbroken collar roll vs. open front with a stepped notched lapel) **+ hem** (past the hip,
  covering the seat vs. at the hip).
- **Trademark:** Black tie is a documented dress code, not a design (§1.8). No emblem, no crest,
  no boutonnière that reads as a specific character's.
- **Face rule:** N/A.
- **Pairs with:** existing `waistcoat` (top — but note only one `top` may be worn, so the
  waistcoat is an alternative, not a layer), `tailored-trousers` (bottom), `bow-tie` (necklace,
  already planned), `dress-shoes` (shoes).
- **Surface tools:** panel blocking (the shawl collar as its own gradient region through `--c2`,
  which is the whole silhouette read at 64px) + trim (jetted pocket welts, one button, a pocket
  square in `--c3`).

#### `bottom` — tier **Growing** (toddler → elder, both body types, 10 files)

**`hoop-skirt`** — *Hooped Skirt*

- **Silhouette:** High rise, no leg division; a rigid dome standing well clear of the leg on all
  sides and sweeping the ground line, with three or four horizontal hoop channel seams.
- **Nearest sibling:** `maxi-skirt` (natural rise, no leg division, narrow column to the ankle,
  side slit). **Axes: leg width** (a dome clearing the body by ≥40u per side vs. a narrow column)
  **+ hem treatment** (a smooth ground-sweeping edge that hides the feet vs. a plain ankle hem with
  a slit).
- **Trademark:** Structural underwear made outerwear; no owner. Avoid any single fixed
  colour-plus-crest that reads as a named animated princess — **the default must be a house
  neutral**, not pale blue, not yellow, not pink-with-a-gold-bodice.
- **Face rule:** N/A.
- **Why it exists:** it is the part that makes `dinner-jacket` + ball skirt possible, and it lets
  a player build a gown from separates rather than being forced into `onepiece`.
- **Surface tools:** structural (the horizontal hoop channel seams, which also do the 64px work)
  + trim (a waistband of contrasting width and a hem band).

#### `onepiece` — `data-hides="top,bottom"`; **shoes stay selectable**, which is the point

Tier **Growing** (10 files each) for the three that are also children's dress-up staples; tier
**Older** (8 files each) for the four that are adult-occasion or era-specific.

**`ball-gown`** *(Growing, 10)* — *Ball Gown*

- **Silhouette:** A straight strapless band across the top of the bust, bare shoulders and arms, a
  fitted bodice coming to a point at the waist, and a hugely bouffant dome skirt sweeping the
  ground line.
- **Nearest sibling:** `party-dress` (cap sleeves, fitted bodice, gathered full skirt to the knee).
  **Axes: shoulder** (none — a clean horizontal top edge vs. cap sleeves) **+ hem** (ground-
  sweeping vs. knee).
- **Trademark:** *"Cut off the shoulder with a low décolletage, exposed arms, and long bouffant
  styled skirts"* is a garment definition (§1.8), not a design. Same caution as `hoop-skirt`
  regarding named animated princess palettes.
- **Face rule:** N/A — `onepiece` is z 25, under the face.
- **Surface tools:** panel blocking (bodice vs. skirt through `--c1`/`--c2`) + trim (a contrast
  waist point band and a hem sweep band); optionally a fine 14u scatter `<pattern>` on the skirt.

**`bridal-gown`** *(Growing, 10)* — *Wedding Gown*

- **Silhouette:** Long sheer set-in sleeves and a high round neckline over a body fitted through
  the hip to the knee, then flaring hard into a trumpet, with a train sweeping behind the ground
  line.
- **Nearest sibling:** `ball-gown`. **Axes: shoulder** (long set-in sleeve vs. bare) **+ volume**
  (fitted through the hip with a knee break vs. a dome from the waist).
- **Trademark:** Post-1840 Victorian convention (§1.8), no owner. **White is a default, not the
  identity** — the family must read as a wedding gown when recoloured black, which the trumpet
  line and the train achieve and a palette never could. No lace pattern that copies a specific
  designer's.
- **Face rule:** N/A. **The veil is head art and is a separate `headwear` family** (§3.3) — do not
  draw a veil in this file; it would either be clipped or scale wrongly.
- **Surface tools:** trim (a scalloped hem edge and a neckline bind) + structural (the knee break
  seam and the train panel drawn as a separate shape behind the skirt).

**`sack-gown`** *(Growing, 10)* — *Court Gown*

- **Silhouette:** Elbow-length pagoda sleeves ending in two or three stacked lace ruffle cuffs; the
  robe front hangs open to reveal a triangular stomacher and petticoat wedge; the skirt is held out
  **wide side-to-side on panniers and flat front-to-back**, reaching the ground; two box pleats
  fall loose from the shoulders at the back.
- **Nearest sibling:** `ball-gown`. **Axes: closure** (an open robe front with a visible triangular
  centre panel vs. closed) **+ volume** (a wide flat rectangle vs. a round dome).
- **Trademark:** *Robe à la française*, 1670s–1770s (§1.8); public domain by centuries. No court
  crest, no specific portrait's gown.
- **Face rule:** N/A. Do **not** add a powdered wig — that is `hair` and out of scope here.
- **Surface tools:** panel blocking (the stomacher wedge as its own region through `--c3`) + trim
  (the stacked engageante ruffles at each elbow and a robings edge down both front openings).

**`bustle-gown`** *(Older, 8)* — *Bustle Gown*

- **Silhouette:** Long fitted sleeves and a high closed neckline over a body flat at the front, with
  a large draped mass projecting sharply behind the hip and falling to a short train; skirt narrow
  at the front to the ground.
- **Nearest sibling:** `ball-gown`. **Axes: shoulder** (long fitted sleeve vs. bare) **+ volume**
  (asymmetric, front-flat with a ≥50u rear projection vs. a symmetric dome).
- **Trademark:** 1869–1876 and 1881–1889 (§1.8), public domain. No specific period portrait.
- **Face rule:** N/A.
- **Why it is cheap to tell apart:** it is the **only front-to-back asymmetric outline** in the
  entire catalogue. At 64px that alone identifies it.
- **Surface tools:** structural (the swagged overskirt drape lines and the rear projection seam) +
  trim (a button line up the closed front and a pleated hem ruffle).

**`empire-gown`** *(Older, 8)* — *Empire Gown*

- **Silhouette:** Short puffed cap sleeves; a very short bodice with a horizontal seam sitting
  directly under the bust; from that seam a gathered narrow skirt falls straight to the ankle.
- **Nearest sibling:** `maxi-dress` (narrow column from a fitted bodice straight to the ankle).
  **Axes: shoulder** (a puffed cap sleeve standing away from the arm vs. none) **+ volume**
  (gathered from a high seam vs. fitted through the waist).
- **Trademark:** 1795–1820 (§1.8), public domain. No specific novel adaptation's costume.
- **Face rule:** N/A.
- **Surface tools:** trim (a contrast band along the high waist seam — at ~120u wide and ~14u tall
  this is the single most legible feature and must be at least 20% off the body in value) +
  structural (the gathers radiating from the seam, and a small hem ruffle).

**`flapper-dress`** *(Older, 8)* — *Flapper Dress*

- **Silhouette:** Narrow straps over bare shoulders; a straight tube with **no waist shaping at
  all** falling to a horizontal seam at the hip; below that seam a separate fringed panel band
  hanging to mid-calf.
- **Nearest sibling:** `sundress` (strap shoulders, fitted bodice, A-line skirt to the knee).
  **Axes: volume** (a straight unshaped tube with a dropped-waist seam vs. a fitted bodice over an
  A-line flare) **+ hem** (mid-calf vs. knee).
- **Trademark:** 1920s, fully public domain. Fringe and beading are surface tools drawn through
  `--c2`/`--c3` and recolour freely — they are not the identity, the dropped-waist seam is.
- **Face rule:** N/A. The **cloche hat and headband are head art** — the existing `beanie` and
  `headband` headwear families cover them adequately; **no new headwear is proposed for this**.
- **Surface tools:** structural (the dropped-waist seam and the vertical fringe strands, each
  ~6u wide across the full hip width) + trim (a beaded neckline bind); the existing `beads`
  necklace family completes it.

**`flare-jumpsuit`** *(Older, 8)* — *Dance Floor Jumpsuit*

- **Silhouette:** A halter neck leaving the shoulders and upper back bare, fitted through torso and
  thigh, then flaring hard from the knee into a wide bell that covers the shoe.
- **Nearest sibling:** `jumpsuit` (covered shoulders, centre front closure, full-length straight
  legs, belted waist). **Axes: shoulder** (halter, bare shoulders vs. covered) **+ volume** (a hard
  knee break into a bell leg vs. a straight leg).
- **Trademark:** 1970s disco is an era, not a property (§1.8). Sequins and lamé are surface and
  are drawn through `--c3`. **No band logo, no film-poster pose, no fixed white-suit default.**
- **Face rule:** N/A.
- **Pairs with:** the existing `platform-boots` (shoes) — but note the bell hem covers the shoe, so
  draw the flare to end at ~y 545 on an adult bundle and let the platform sole show beneath.
- **Surface tools:** panel blocking (a contrast halter bodice through `--c2`) + pattern (a 14–18u
  scattered sparkle motif through `--c3`, clipped to the body, over a gradient).

### 3.3 Pool families — authored once per head-size class, **3 files each**

These live at `src/assets/accessories/<class>/<slot>/<family>.svg` for `class` ∈
{`toddler`, `teen`, `adult`}. **Keep all art within ~1.3 head radii of the head centre** (§4.4).

**`jester-hood`** — `headwear`, `data-hides="hair"`

- **Silhouette:** A close hood over the crown with three soft points — one falling forward over the
  brow and one to each side — each ending in a small round bell.
- **Justification for the slot:** this is the belled cap the `jester` costume cannot carry. The
  `costume` layer draws above the face; `headwear` (z 100) is the only slot that puts head art in
  the right place. It hugs the skull, so it fits the transform budget comfortably.
- **`data-hides="hair"`** because it covers the crown and ears completely. It may declare
  `hair1`/`hair2` itself and draw a little hair escaping at the nape.
- **Trademark:** generic fool's cap; no crown, no specific character's hat.
- **Nearest sibling:** `beanie` (close knit dome with a rolled brim band). Differs on the three
  belled points, which change the outline entirely.

**`veil`** — `headwear`, `data-hides=""`

- **Silhouette:** A narrow band at the hairline with a gathered sheer fall behind it, reaching to
  just past the jaw and no further.
- **Justification for the slot:** it is head-mounted. It cannot be part of `bridal-gown` because a
  `onepiece` cannot draw above the shoulders.
- **Constraint that shapes it:** the transform budget (§4.4) is about **74 canvas units** from the
  head centre on an adult bundle. A floor-length or shoulder-length veil breaks that and lands
  wrong on newborn and toddler, whose head-to-torso ratio differs most. **Draw a short crown veil,
  not a cathedral one.** Say so in the file comment so nobody "fixes" it later.
- **Trademark:** universal wedding item, no owner.

**`ruff`** — `necklace`, and **the best value in this document**

- **Silhouette:** A wide flat pleated disc encircling the neck, projecting evenly on all sides.
- **Justification for the slot:** historically the ruff was a **detachable** item laundered
  separately (§1.5), and `necklace` is a neck anchor that draws **above `top` and `costume`**.
  Putting it here makes every garment in the catalogue wearable in a comedy register for 3 files.
- **Nearest sibling:** `choker` (a close flat band at the base of the neck). Differs on projection
  — the ruff clears the neck by 45–70u, the choker by ~4u.
- **Authoring warning:** `clown`, `harlequin` and `pierrot` all carry their own built-in neck
  treatment. **Draw those built-in ones low and shallow (≤25u projection)** so a `ruff` necklace
  layered over them reads as one bigger ruff rather than two colliding ones.
- **Trademark:** Elizabethan, public domain.

**`clown-nose`** — `glasses`, **proposed with a stated trade-off**

- **Silhouette:** A single soft ball centred on the nose, with a faint highlight.
- **Justification for the slot, and the honest caveat:** there is no face slot. `glasses` is
  anchored to the face by the same circle-to-circle transform and draws above it. **There is
  precedent:** `eye-patch` is already a planned `glasses` family and is not glasses either. The
  cost is real — equipping the nose costs the player their glasses, and the slot holds one asset.
  Recommend shipping it anyway (3 files, and it is the single most-requested clown feature), and
  recording it in `ASSET_CONTRACT.md`'s "Slots that do not exist yet" as further evidence for a
  `face-mark` slot. **If the reviewer prefers not to borrow the slot, drop this one family; the
  `clown` costume stands without it.**
- **Trademark:** the red nose is the generic auguste marker (§1.3), not any character's. It must
  paint through a tunable variable, not a hardcoded red.

---

## 4. Rules that bite — read before drawing

### 4.1 The no-face-covering ceiling, with the actual number

`costume` is z 80 and draws **above** `face` (60) and `hair-front` (70). A mask, hood-up or helmet
**erases the character's features**. The contract's rule is: costume art stays **below the
bundle's shoulder line minus 8px**.

Read `specs/bodies/<stage>-<bodyType>.json` and take `shoulders[0].y`. **Worked example —
`adult-female`: `shoulders` are at `y = 156`, so the ceiling is `y = 148`.** Check `wizard.svg`:
its topmost geometry is at `y = 150`. That is the pattern to copy.

How each comedy family resolves it:

| Family | The head-adjacent element | Resolution |
|---|---|---|
| `jester` | belled cap | Moved to `headwear` as **`jester-hood`**. Costume draws a scalloped standing collar topping out at the ceiling. |
| `harlequin` | half-mask, ruff | Mask **dropped entirely**. Ruff drawn low and shallow at the ceiling. |
| `clown` | white face, red nose, frizz wig | Face: impossible, dropped. Nose: optional **`glasses`** family. Wig: **rejected** (§6). Costume is garment-only. |
| `pierrot` | whitened face, collaret | Face dropped. Collaret drawn as a **flat disc spreading outward** from the ceiling, never upward. |
| `mime` | white face, beret | Face dropped. Beret: **already exists** in `headwear`. |
| `critter-onesie` | hood, ears | Hood drawn **down**, flat across the shoulders (explicitly permitted). Ears: **already exists** as `animal-ears`. |
| `food-costume` | none | The stalk finial is at chest height on the slab, not on the head. |
| `inflatable-suit` | none | The gathered neck ring is the top of the asset, at the ceiling. |
| `oversized-suit` | none | Shoulder pads exaggerate **outward**, not up. |
| `disguise-coat` | turned-up collar | Collar frames the jaw **from below** and stops at the ceiling. Pairs with existing `sunglasses` + `flat-cap`. |

**Formalwear has no face problem at all**, because `top` (z 30), `bottom` (z 20) and `onepiece`
(z 25) all draw *under* the face. This is a further argument for §2.2's slot split.

### 4.2 One asset per slot

The tray holds one asset per slot. `clown-nose` in `glasses` means no glasses. `ruff` in
`necklace` means no `bow-tie`. Say this in the picker copy if the studio supports it; it is not a
bug and it is not worth an engineering change here.

### 4.3 What we cannot draw, and must stop wanting to

- **Clown shoes.** They belong in `shoes`, but `costume` declares `data-hides="top,bottom,shoes"`,
  so a costume-equipped character has no shoes at all. An `oversized-shoes` family in `shoes`
  would be invisible whenever the clown costume is worn. **Not proposed.** If it is ever wanted,
  the clown costume must draw the feet itself — but that fights the `shoes`-over-hems rule and is
  not worth it.
- **Face paint of any kind.** `face-mark` is an unbuilt slot (`ASSET_CONTRACT.md`, "Slots that do
  not exist yet"). Every proposed family is designed to be fully readable without it.
- **Facial hair.** Same — unbuilt slot. Relevant because several historical formal looks want it.

### 4.4 The head transform budget — arithmetic, and what it kills

`headwear`, `glasses`, `earrings` and `necklace` are authored **once per head-size class** and
mapped onto the target head by a uniform circle-to-circle transform. The guidance is **~1.3 head
radii from the head centre**.

For `adult-female`: `head.rx = 57`, `head.cy = 91`. So the budget radius is
**1.3 × 57 ≈ 74 units**, i.e. everything must fit inside a circle centred at `(200, 91)` with
radius 74. The scalp is at `y = 32`, so there are only about **15 units of headroom above the
head** — roughly **1.6 screen pixels** at tray size.

**This kills the top hat.** A top hat needs a crown of 60–70 units to read as one; drawn inside
budget it becomes a bowler, and drawn correctly it scales by the head ratio and lands absurdly on
the newborn and toddler bundles. See §6. `jester-hood` and `veil` both survive because they hug
the skull rather than standing off it.

### 4.5 Layering consequences specific to these families

- **Long `hair-front` covers the shoulders and upper chest.** Do not put a family's only
  distinguishing feature there. This bites `inflatable-suit` (whose raglan tube shoulders are its
  identity) hardest — carry the read in the **sphere and the limb angle**, not the shoulder seam.
- **`necklace` draws above `costume`.** This is why `ruff` works, and why the built-in ruffs must
  be shallow (§3.3).
- **`top` draws over `bottom`.** `tailcoat`'s tails and `dinner-jacket`'s hem hang correctly over
  any bottom. Draw the tails as two panels with a visible gap.
- **`shoes` draw over trouser hems.** `flare-jumpsuit`'s bell must end above the sole so
  `platform-boots` still reads.
- **`onepiece` does not hide shoes.** That is deliberate and is the reason all seven gowns are
  `onepiece` rather than `costume`.

### 4.6 House style reminders that these families stress

- **Vertical gradients, no silhouette outlines, rounded forms** ("Soft Papercut").
- **Every garment must use at least two of the five surface tools.** Each family above names its
  two.
- **Value, not hue, separates.** A trim band must be ≥20% away in value from what it borders. This
  matters most on `empire-gown` (whose identity is one 14u-tall band) and `flapper-dress` (one
  seam).
- **Pattern and trim shapes go inside the form's `sp-shadow` group.** Do not nest shadow groups.
- **Declare three colour variables** on anything carrying a pattern or a graphic, primary first.
- **Prefix every `id`** — gradients *and* patterns — with the asset id plus `__`.
- **No `<text>`.** Drawn lettering reads as a logo and is a trademark problem, not a style choice.

---

## 5. Counts

### 5.1 By family

| # | Family | Slot | Tier | Files |
|---|---|---|---|---|
| **Comedy and novelty — 13 families, 109 files** | | | | |
| 1 | `jester` | costume | Growing | 10 |
| 2 | `harlequin` | costume | Growing | 10 |
| 3 | `clown` | costume | Growing | 10 |
| 4 | `pierrot` | costume | Growing | 10 |
| 5 | `mime` | costume | Growing | 10 |
| 6 | `critter-onesie` | costume | Growing | 10 |
| 7 | `food-costume` | costume | Growing | 10 |
| 8 | `inflatable-suit` | costume | Growing | 10 |
| 9 | `oversized-suit` | costume | Growing | 10 |
| 10 | `disguise-coat` | costume | Growing | 10 |
| 11 | `jester-hood` | headwear | Pool | 3 |
| 12 | `ruff` | necklace | Pool | 3 |
| 13 | `clown-nose` | glasses | Pool | 3 |
| **Fancy and formal — 11 families, 91 files** | | | | |
| 14 | `tailcoat` | top | Older | 8 |
| 15 | `dinner-jacket` | top | Older | 8 |
| 16 | `hoop-skirt` | bottom | Growing | 10 |
| 17 | `ball-gown` | onepiece | Growing | 10 |
| 18 | `bridal-gown` | onepiece | Growing | 10 |
| 19 | `sack-gown` | onepiece | Growing | 10 |
| 20 | `bustle-gown` | onepiece | Older | 8 |
| 21 | `empire-gown` | onepiece | Older | 8 |
| 22 | `flapper-dress` | onepiece | Older | 8 |
| 23 | `flare-jumpsuit` | onepiece | Older | 8 |
| 24 | `veil` | headwear | Pool | 3 |
| | **Total** | | | **200** |

Tier definitions are `FAMILIES.md` §1: **Growing** = toddler·teen·adult·midage·elder × both body
types (10 bundles); **Older** = teen·adult·midage·elder × both (8 bundles); **Pool** = the 3
head-size classes.

**Newborn authors nothing from this document.** A newborn wardrobe is deliberately minimal
(5 costumes, no `top`-slot formalwear), and none of these families belong there.

### 5.2 By slot

| Slot | New families | New files |
|---|---|---|
| `costume` | 10 | 100 |
| `onepiece` | 7 | 62 |
| `top` | 2 | 16 |
| `bottom` | 1 | 10 |
| `headwear` (pool) | 2 | 6 |
| `necklace` (pool) | 1 | 3 |
| `glasses` (pool) | 1 | 3 |
| **Total** | **24** | **200** |

### 5.3 Per bundle

| Bundle | Costume | Top | Bottom | Onepiece | Pool | **Authored** |
|---|---|---|---|---|---|---|
| newborn/female | — | — | — | — | — | **0** |
| newborn/male | — | — | — | — | — | **0** |
| toddler/female | 10 | — | 1 | 3 | 2 (headwear) | **16** |
| toddler/male | 10 | — | 1 | 3 | 2 (glasses+necklace) | **16** |
| teen/female | 10 | 2 | 1 | 7 | 2 (headwear) | **22** |
| teen/male | 10 | 2 | 1 | 7 | 2 (glasses+necklace) | **22** |
| adult/female | 10 | 2 | 1 | 7 | 2 (headwear) | **22** |
| adult/male | 10 | 2 | 1 | 7 | 2 (glasses+necklace) | **22** |
| midage/female | 10 | 2 | 1 | 7 | — | **20** |
| midage/male | 10 | 2 | 1 | 7 | — | **20** |
| elder/female | 10 | 2 | 1 | 7 | — | **20** |
| elder/male | 10 | 2 | 1 | 7 | — | **20** |
| | | | | | | **200** |

Pool ownership follows `FAMILIES.md` §4: the **female** agent of each stage owns that class's
`headwear` (`jester-hood`, `veil`); the **male** agent owns `glasses`/`earrings`/`necklace`
(`clown-nose`, `ruff`).

### 5.4 Effect on slot sizes

| Slot | Roster now (adult bundle) | After |
|---|---|---|
| `costume` | 13 | **23** |
| `onepiece` | 12 | **19** |
| `top` | 22 | **24** |
| `bottom` | 17 | **18** |

`costume` nearly doubles. That is the right place to spend, because it is the slot the request was
actually about and because ten genuinely different outlines is exactly what the "Silhouette first"
section asks for.

---

## 6. Rejected, and why

Recording these so they do not come back.

**Rejected on trademark grounds:**

1. **Anything reading as the DC Joker** — green hair + purple tailcoat + orange or green waistcoat
   + white face + red grin, in any combination, under any name. This is the specific request that
   started the brief and it is the one thing that must not be drawn. `jester` and `harlequin`
   deliver the same *idea* from the public-domain ancestry.
2. **A clown wig `hair` family** (bald crown with two large frizzy side puffs). The wig alone is
   the signature of several specific, named, still-trading clown characters; a silhouette that
   specific cannot be made generic, and because `--hair1/--hair2` are tunable we cannot even use
   colour to distance it. The `clown` costume works without it.
3. **The tramp / Little Tramp ensemble** — bowler + toothbrush moustache + cane + tight short
   jacket + turned-out oversized shoes. That is Chaplin's Tramp, a specific character with active
   estate protection. `oversized-suit` keeps the too-big gag and drops every one of those markers.
4. **Bip's crushed opera hat with a red flower.** Marcel Marceau's specific character signature
   (1947). `mime` uses the existing generic `beret` instead.
5. **A specific film clown** — a ruffed yellow suit with a fixed red trim and pointed collar
   points, or any clown drawn with a specific film's face. Not proposed in any form.
6. **A named animated princess palette** on `ball-gown` or `hoop-skirt`. The garments are fine;
   the fixed pale-blue / yellow / pink-with-gold-bodice defaults are not. Defaults must come from
   the house palette.
7. **Any drawn lettering, crest, emblem or monogram** on the formalwear. Already banned by the
   contract; restated because dinner jackets and bridal gowns invite it.

**Rejected on catalogue-discipline grounds (not trademark):**

8. **`top-hat`** — deferred, not refused. The head transform budget is ~74 units from the head
   centre, leaving ~15 units of headroom above an adult scalp (§4.4). A top hat needs 60–70. Drawn
   in budget it is a bowler; drawn correctly it lands wrong on newborn and toddler. If the product
   wants it, that is a conversation about the transform, not an art task.
9. **`tiara`** — a ring of small points across the front hairline is silhouette-identical to the
   already-planned `flower-crown`. The difference is entirely surface, which §0.2 forbids.
10. **`morning-coat`** — differs from `tailcoat` on one axis only (a curved cutaway rather than a
    horizontal one). One cutaway family is enough.
11. **"Tuxedo trousers"** — `tailored-trousers` with a braid stripe. A stripe is a surface, and
    `stripes` is the catalogue's cautionary tale.
12. **"Sequin gown" / "glitter dress" / "lamé jumpsuit"** — surface treatments, banned outright by
    the contract's "Never promote a surface treatment to a family name". Sequins are drawn as a
    `<pattern>` through `--c3` **on** `ball-gown` or `flare-jumpsuit`; they are not a family.
13. **"Formal waistcoat"** — `waistcoat` exists; formality is a facing.
14. **"Wide-collar disco shirt"** — `button-up` with bigger trim.
15. **`oversized-shoes`** — invisible whenever a costume is worn (§4.3).
16. **A `harlequin` half-mask and a `clown` face** — impossible under the face rule, and no slot
    exists to hold them.

---

## 7. Sources

- [Wikipedia: Harlequin](https://en.wikipedia.org/wiki/Harlequin)
- [Wikipedia: Jester](https://en.wikipedia.org/wiki/Jester)
- [Wikipedia: Motley](https://en.wikipedia.org/wiki/Motley)
- [Wikipedia: Clown](https://en.wikipedia.org/wiki/Clown)
- [Wikipedia: Pierrot](https://en.wikipedia.org/wiki/Pierrot)
- [Wikipedia: Mime artist](https://en.wikipedia.org/wiki/Mime_artist)
- [Wikipedia: Marcel Marceau](https://en.wikipedia.org/wiki/Marcel_Marceau)
- [Wikipedia: Ruff (clothing)](https://en.wikipedia.org/wiki/Ruff_(clothing))
- [Wikipedia: Kigurumi](https://en.wikipedia.org/wiki/Kigurumi)
- [Wikipedia: Inflatable costume](https://en.wikipedia.org/wiki/Inflatable_costume)
- [Wikipedia: White tie](https://en.wikipedia.org/wiki/White_tie)
- [Wikipedia: Black tie](https://en.wikipedia.org/wiki/Black_tie)
- [Wikipedia: Ball gown](https://en.wikipedia.org/wiki/Ball_gown)
- [Wikipedia: Sack-back gown (robe à la française)](https://en.wikipedia.org/wiki/Robe_%C3%A0_la_fran%C3%A7aise)
- [Wikipedia: 1795–1820 in Western fashion](https://en.wikipedia.org/wiki/1795%E2%80%931820_in_Western_fashion)
- [Wikipedia: Bustle](https://en.wikipedia.org/wiki/Bustle)
- [Wikipedia: Flapper](https://en.wikipedia.org/wiki/Flapper)
- [Wikipedia: Disco](https://en.wikipedia.org/wiki/Disco)
- [Wikipedia: Wedding dress](https://en.wikipedia.org/wiki/Wedding_dress)

Internal: `docs/ASSET_CONTRACT.md`; `docs/FAMILIES.md`; `docs/CATALOG-RESEARCH.md` §A.10
(costume archetypes and the IP line), §B.6 (the two costumes that had to be re-keyed), §B.7
(authoring rules that bite); `specs/bodies/adult-female.json` (the shoulder and head numbers used
in §4.1 and §4.4); `src/assets/catalog/adult/female/costume/wizard.svg` (house-style reference).

**⚠ Sourcing note.** The Wikipedia articles above are the primary evidence for the historical
construction claims and are quoted directly where they are load-bearing. The **64-pixel
arithmetic in §1.9 and §4.4 is my own calculation** from the canvas dimensions in
`ASSET_CONTRACT.md` and `specs/bodies/adult-female.json`, not a measurement of the running app —
verify it on `/?dev=sheet` before treating the thresholds as exact. The slot recommendations in
§2 are design judgement, reasoned from the contract, not sourced.

---

## 8. What an art agent does next

Nothing in this document is authored. Before any of it is drawn:

1. A reviewer confirms the slot split in §2 — in particular that formalwear goes to
   `top`/`bottom`/`onepiece` and not to `costume`.
2. A reviewer rules on `clown-nose` borrowing the `glasses` slot (§3.3).
3. The 24 families are added to `docs/FAMILIES.md` §2 and to the twelve rosters in §3, and the
   totals in §5 of that document are updated. **This document does not do that.**
4. Only then does anyone open an SVG.

When you do draw: read `docs/ASSET_CONTRACT.md` "Silhouette first" first, put your two axes in an
XML comment at the top of the file, and check `/?dev=sheet` as a tray — not as a checklist —
before committing.
