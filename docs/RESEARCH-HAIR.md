# Hair Expansion and the `beard` Slot — Research and Proposal

**Date:** 2026-07-27
**Status:** Research and proposal. No art is authored and no source file is changed by this
document.
**Companion documents:** `docs/CATALOG-RESEARCH.md` (the previous round — this builds on it and
does not repeat it), `docs/FAMILIES.md` (the current catalogue), `docs/ASSET_CONTRACT.md`
(authoring rules).

Written to be read cold. If you are an art agent about to draw SVGs, the sections you need are
**C** (hair), **E** (facial hair) and **D.6–D.9** (where facial hair attaches, and what the file
header looks like). Everything else is the reasoning and the engineering.

**Two things this document changes about the project as it stands:**

1. **The nine body-type-locked hairstyles are unlocked.** `fit-F` and `fit-M` cease to exist in
   the `hair` slot. Every hair family is authored in every bundle that authors hair at all.
2. **A `beard` slot is added.** `docs/ASSET_CONTRACT.md`'s "Slots that do not exist yet" table
   promises a `facial-hair` slot authored per head-size class. **That row is superseded by §D** —
   the slot is named `beard`, and it is authored **per bundle**, not per head-size class. §D.3
   explains why. The z of 65 that row proposes is confirmed, on new evidence, in §D.2.

---

## 0. Two rules that are not negotiable

### 0.1 There are still no aisles — and for facial hair this is now evidenced, not assumed

`docs/FAMILIES.md` §0.1 says it for garments; this document extends it to the head. Facial hair
is a **styling option, not a gendered restriction**. Every `beard` family is authored on the
female body spec and the male body spec, both, and appears in one undifferentiated tray for
whoever is wearing that bundle. The `fit-F` / `fit-M` split in the hair slot was a fitting split
that hardened into an aisle; it is being removed, not extended.

The previous round established the general precedent (`docs/CATALOG-RESEARCH.md` §A.8.4). This
round found something sharper and specific to facial hair, and it changes the argument from "on
principle" to "on evidence":

- **The Sims 4's celebrated June 2016 gender unlock did not cover facial hair.** The patch note
  reads *"All Create a Sim assets (tops, bottoms, accessories, hairs, shoes… all) are now
  available to either gender"*
  ([patch notes](https://simscommunity.info/2016/06/02/the-sims-4-june-2016-update-patch-notes/),
  [overview](https://simscommunity.info/2016/06/02/the-sims-4-june-2016-update-gender-customization-overview/)).
  Facial hair is not in that list, and the Facial Hair category remained tied to the masculine
  setting. We know this because the **mod ecosystem that grew to fix it still exists**:
  "Facial hairs enabled for female frames"
  ([listing](https://sims4updates.net/facial-hair/facial-hairs-enabled-for-female-frames-at-deeliteful-simmer/)),
  "Facial Hair for All", "Beards as Skin Details, for All Genders", and — the one that makes the
  point unanswerable — **"Beards for trans men [Female Frame]"** on
  [Mod The Sims](https://modthesims.info/browse/ts4/381/). One of those mods had to re-home
  beards into the *face-paint* category to get them onto a feminine frame at all. That is
  players doing unpaid engineering to undo a restriction the developer left in place.
- **Players have asked for exactly this, in exactly these words.** An EA forum request:
  *"Detach facial hair customization from gender. Create a third and/or neutral option for
  clothing preference."*
- **The academic literature is on the same side.** *Binary Barriers: Avatar Creation and Play for
  Nonbinary Video Game Players* (2025, 25 nonbinary players interviewed)
  ([Sage](https://journals.sagepub.com/doi/full/10.1177/15554120251322209)) and *Often
  Discouraged, Never Refused?* (ACM, 2024)
  ([ACM](https://dl.acm.org/doi/10.1145/3772318.3790841)) both find avatar systems failing to
  accommodate identities their creators did not enumerate.
- **There is a straightforward, non-pathologising physiological reason too.** Wikipedia's
  [Facial hair](https://en.wikipedia.org/wiki/Facial_hair) article records that women commonly
  develop noticeable facial hair after menopause, and describes hirsutism as an ordinary
  hormonal variation. An `elder/female` character with a `stubble` or a `wispy-chin` is not a
  joke asset; it is an accurate one.

**No mainstream creator surveyed in either round ships facial hair as a default, ungated option
on feminine-presenting bodies.** We can, at zero extra cost, because our art is authored per
bundle anyway. It is one of the cheapest genuine differentiators available to this project.

### 0.2 A family is a silhouette, never a surface

Unchanged from `docs/ASSET_CONTRACT.md`. **Two families in the same `(bundle, slot)` must differ
on at least two of the four axes for that slot.** §B.2 gives the four axes for `hair`; §E.1 gives
the four for `beard`. Not one family below is separated from its siblings by colour or by
texture-pattern alone — where a family exists because a texture produces a genuinely different
*outline*, the proposal names the second and third axis it also differs on, in a column an art
agent can check.

---

## A. Findings

### A.0 How to read the sourcing in this round

The previous round (`docs/CATALOG-RESEARCH.md` §A) did the broad survey — Toca Boca World, The
Sims 4, ACNH, Gacha Club, Mii Maker, Toca Hair Salon, Sago Mini — and established the
representation literature: Code My Crown, the Andre Walker critique, the Sims 4 skin-tone and
vitiligo campaigns, Mack et al. CHI 2023, the Geena Davis Institute and IGDA playbooks. **All of
that stands and is not repeated.** This round asked two narrower questions: what a complete hair
catalogue contains, and what a facial-hair slot has to be.

Sourced claims carry a URL. Judgement is labelled *judgement*. **Do not cite something labelled
judgement as research.**

One process note, stated because it affects what you can trust below. The session's web-search
budget was exhausted, so research was done by fetching sources directly. That worked well for
Wikipedia, GitHub, Nookipedia and vendor documentation, and badly for Fandom wikis (HTTP 402),
Dove's own Code My Crown PDF (403), and several beauty-press domains. Where a claim rests on a
search-index snippet rather than an opened page it is marked **[snippet]**; where a question
could not be answered it is marked **[unverified]** rather than guessed at. Several are.

### A.1 Facial hair as a slot — what shipped products actually do

| Product | Facial hair? | How |
|---|---|---|
| **Toca Boca World** | Yes | "Beards and mustaches" with its own **Color** control, inside the cyan **Face & hair** cluster next to hair, eyes, nose, brows and face markings ([wiki](https://toca-life-world.fandom.com/wiki/Character_Creator)) **[snippet]** |
| **The Sims 4** | Yes | Own CAS category, **teen → elder only**, and — see §0.1 — historically masculine-locked |
| **ACNH** | **Yes, but as accessories** | `Rounded Beard` (980 Bells, Able Sisters, auto-matches hair colour) and `Pirate Beard` (added in the 1.3.0 Summer update) are **face-accessory items** ([Nookipedia](https://nookipedia.com/wiki/Item:Rounded_Beard_(New_Horizons))) **[snippet]** |
| **Mii Maker / Miitopia** | Yes | 3DS: 5 moustaches, 5 beards, 8 colours. **Switch splits moustache and beard into separate categories.** Both carry position and size sliders ([Miitopia wiki](https://miitopia.wikitide.org/wiki/Mii_Maker)) |
| **Roblox** | **No** | `AccessoryType` has 20 values including **Eyebrow** and **Eyelash** — and no Beard ([Roblox docs](https://create.roblox.com/docs/reference/engine/enums/AccessoryType)). Beards ship as third-party UGC face accessories |
| **Gacha Club** | **No** | No facial-hair category; players ask for one and work around its absence |
| **Fortnite** | n/a | No character creator at all — facial hair is baked into a preset skin |

Four things fall out of that table and they decide most of §D and §E.

**One — Toca Boca puts facial hair in the hair category, and so should we.** That is the closest
analogue product this project has, and §D.4 follows it.

**Two — ACNH is the cautionary tale, and it is a better argument for a dedicated slot than any
amount of theory.** ACNH's beards are *accessories*, so they compete for the face-accessory slot
with glasses and masks: a player must choose between a beard and their glasses. That is exactly
the failure mode `docs/FAMILIES.md` §4.3 already documents for us in a different slot —
`hearing-aid-studs` exists only because hearing aids and earrings compete for one anchor, and
the contract calls it "a workaround for a missing `ear-tech` slot, not a design". **Do not solve
facial hair by hanging it off an existing slot. It needs its own, which is what §D specifies.**

**Three — Toca Boca's own flagship 2025 creator update skipped facial hair entirely.** The
"Character Creator GLOW-UP" enumerates **61 updated hairstyles, 56 refreshed outfits, a new
curated colour palette and 10 refreshed facial details (blushes, eyebrows, noses)**, plus a
randomiser producing ~73% fewer overly-random characters
([Toca Boca help centre](https://tocaboca.helpshift.com/hc/faq/379-character-creator-improvements-are-here-it-s-time-for-a-glow-up-1779808294/)).
Beards and moustaches are not mentioned. Community tutorials also indicate some Toca facial-hair
items sit behind the paid Creator pack **[weak source]**. **We have no paywall, so every family
in §E is available to every user by default.**

**Four — the Switch Mii Maker split moustache from beard**, and that split is what makes the two
religiously-significant combinations in §A.3 reachable. §D.9 addresses whether we should follow.

*Unverified:* per-option counts for Toca Boca and for Sims 4 base game; whether Toca's beard
colour shares the hair palette; whether Memoji, Bitmoji or Meta avatars gate facial hair by
preset — all three have facial hair in practice but none document it on an official page.

### A.2 Facial-hair taxonomy — the best-sourced part of this document

[Wikipedia: List of facial hairstyles](https://en.wikipedia.org/wiki/List_of_facial_hairstyles)
is a complete, **shape-based** taxonomy: every entry is defined by which parts of the face are
covered, which is exactly the axis system this catalogue needs. It is the reference to read
before drawing §E. Condensed, with the definitions verbatim where they are load-bearing:

**Moustaches** (upper lip; chin and cheeks bare) — *chevron*, filling nose-to-lip and extending
"to the edges of upper lips, but no further"; *pyramid*, the straight-edged, wider-at-the-bottom
chevron; *painter's brush*, "top is round, but the bottom is straight"; *lampshade*, a steeper
trapezoid; *english*, "wide… gets narrow on the sides, but is mostly straight"; *hungarian*, big
and bushy; *walrus*, "whiskers that are thick, bushy, and droop over the mouth"; *handlebar*,
ends "grown much longer and often flared out"; *imperial*, a thicker curled handlebar; *dali*,
"narrow moustache that points upwards"; *pencil*, "a thin line of hair, usually just above the
line of the upper lip"; *horseshoe*, "a full moustache with ends that extend down in parallel
straight lines… down to the jawline"; *zapata*, ends drooping toward the jaw.

**Goatee family** (chin, no cheeks) — *soul patch*, "grown just below the lower lip, but does not
grow past the chin"; *goat patch* / chin puff, on the chin directly beneath the mouth; *goatee*,
"incorporates hair on the chin but not the cheeks"; *circle beard*, "a goatee in which the
moustache is allowed to connect to the hair on the chin"; *van dyke*, a goatee "in which the chin
hair is disconnected from the moustache hair"; *anchor*, trimmed "to resemble an anchor";
*balbo*, an extended van dyke "which wraps around the mouth, with the ends of the moustache (and
sometimes also the jawline) flared out"; *zappa*, a wide soul patch plus a full moustache.

**Partial beards** — *chin strap*, "sideburns which are connected to each other by a narrow line
of hair along the jaw, resembling a helmet strap"; *chin curtain*, "a full beard without a
moustache or neck hair, sometimes called a 'lion's mane'"; *shenandoah*, "a fuller version of the
chin curtain in which only the moustache is shaved", explicitly "often associated with the Amish
community"; *mutton chops*, "a more elaborate growth of sideburns which also grow larger toward
the chin"; *friendly mutton chops*, "muttonchops which are connected by a moustache, but no chin
hair"; *sidewhiskers*, hanging "well below the jawline"; *sideburns*, "the patch of hair in front
of the ears which connects a beard to the hair of one's head"; *neckbeard*, no facial hair at all
but hair on the neck and under the jaw; *monkey tail*, asymmetric with a gap on one side only;
*panini / tiger stripe*, a beard with shaved parallel lines.

**Full beards** — *verdi*, "a short beard where the moustache is disconnected from rest of the
facial hair"; *garibaldi*, which "evenly extends below the chin, but no more than 20 cm";
*ned kelly*, "a beard with the length of more than 20 cm"; *ducktail*, "where the middle part
hangs from chin leaving it pointed", including sideburns; *hollywoodian*, "a full beard that
features a goatee, full mustache and horizontal chinstrap with all hairs on the upper cheeks and
sideburns removed"; *forkbeard / french fork*, "a pointed beard that is split by a curl at the
chin", noted as originating from Iran; *three pronged beard*, three braided forks;
*dwarven beard*, Ned Kelly length with braiding.

**Stubble** is one entry, not three: "any length of hair which is long enough to be seen, but
short enough to not fully cover the skin beneath", with *five o'clock shadow* and *designer
stubble* both meaning "stubble which is very short". The light/medium/heavy gradation is a
grooming-industry convention, not a canonical split — cite
[Beardbrand](https://www.beardbrand.com/blogs/urbanbeardsman/beard-styles) for it, not Wikipedia.

**Terms in common use that are *not* in the canonical taxonomy**, and which this proposal
therefore avoids as family names: *boxed beard*, *corporate beard*, *bandholz* (coined by
Beardbrand's own founder), *royale*, *yeard*.

**Two structural facts that decide the axes in §E.1.**

- **The moustache axis is independent of the beard axis.** `chin-curtain` (chin covered, lip
  bare) and `friendly-chops` (lip covered, chin bare) are its two ends, and several families in
  the taxonomy are distinguished by nothing else.
- **The cheek line is the second independent axis.** *hollywoodian* is defined entirely by
  removing the upper cheeks and sideburns from an otherwise full beard; *verdi*, *garibaldi* and
  *ned kelly* differ mainly on length. Cheek line and length together separate almost every full
  beard from every other one.

#### Two shapes that are banned outright

**The toothbrush moustache — narrow, tall, no wider than the nose — is not to be drawn, ever.**
Wikipedia is explicit that Chaplin popularised it and that "Adolf Hitler's subsequent adoption…
would eventually lead to unpopularity of what would later be known as the 'Hitler moustache'"
([toothbrush moustache](https://en.wikipedia.org/wiki/Toothbrush_moustache)). At our flat-vector
scale the silhouette is unavoidably that reference; there is no styling that de-risks it. It is
absent from §E.2 and §E.3 and may never be added. **Note the generative risk as well:** if
`moustache` is drawn too narrow it becomes this by accident. Keep the `moustache` bar's ends at
the corners of the mouth, well outside the nose width.

**`fu manchu` is likewise excluded** — the name and its associations are a racial caricature. The
underlying shape (a thin moustache with long tendrils past the jaw) is not proposed under any
name.

*pornstache* is a real shape with an unusable name; it is simply a heavy chevron and needs no
separate family.

### A.3 Facial hair and culture — ship the shape, let the player assemble the identity

Sourced positions:

- **Sikhism — *kesh*.** Uncut hair is one of the Five Ks ordained by Guru Gobind Singh in 1699,
  and explicitly includes "the hair on the head and also the beard and mustache"
  ([Kesh](https://en.wikipedia.org/wiki/Kesh_(Sikhism))). Head hair is knotted into a *joora*,
  held with a *kangha* and covered by a *dastar*; younger Sikhs wear a *patka*. Beard tying or
  rolling is common practice **[weak source — a grooming blog; get a Sikh-organisation source
  before this is drawn]**.
- **Judaism — *payot*.** From Leviticus 19:27; the Talmud (Makkot 20a) defines them as "hair in
  front of the ears extending to beneath the cheekbone, on a level with the nose"
  ([Payot](https://en.wikipedia.org/wiki/Payot)). **Styles differ sharply by community** —
  Hasidic long and curled, Belz wrapped around the ear, Skver twisted into tight front coils,
  Yemenite (*simanim*) long thin twists reaching the upper arm, Lithuanian cut short. Beard rules
  and payot rules are halakhically separate.
- **Islam — the sunnah beard.** Sahih Muslim 259a: *"Trim closely the moustache, and let the
  beard grow"* ([sunnah.com](https://sunnah.com/muslim:259a); also
  [Tirmidhi 2763](https://sunnah.com/tirmidhi:2763)). Shia guidance permits trimming and forbids
  shaving ([Beard](https://en.wikipedia.org/wiki/Beard)). **The shape is a full beard with a
  deliberately short moustache that does not overhang the lip.**
- **Amish — the chin curtain, no moustache.** Amish men shave until marriage and then grow a
  beard permanently as a marital marker, and "continue to shave their moustaches in order to
  avoid historical associations with military facial hair"
  ([Facial hair](https://en.wikipedia.org/wiki/Facial_hair)). Wikipedia's canonical name for the
  shape is *shenandoah*.

**The design consequence is the same one the previous round reached for head coverings
(`docs/CATALOG-RESEARCH.md` §A.8.2) and for cultural dress (§A.11): name the family by its shape,
and let the player assemble the identity.** We do not need — and should not draw — a family
called `sikh-beard` or `amish-beard`. We need `long-beard`, `full-beard` and `chin-curtain` drawn
well, and we already ship `turban`, `kufi`, `kippah`, `bonnet` and `flat-cap` in `headwear`.
`turban` + `long-beard` is a Sikh character. `kufi` + `full-beard` is a Muslim one.
`flat-cap` + `chin-curtain` is an Amish one. **The combination is the representation, the
combination is free, and no filename asserts anyone's religion.**

**Two combinations are load-bearing and must each be reachable as a single asset**, because our
slot holds one asset at a time: **a beard with a deliberately bare upper lip** (`chin-curtain`)
and **a full beard with a short, non-overhanging moustache** (`full-beard`). Both are in §E.2.
This is the strongest argument for eventually splitting `moustache` out as its own slot, which
§D.9 records honestly rather than pretending the single slot has no cost.

*Deliberately deferred pending cultural review, per the precedent in
`docs/CATALOG-RESEARCH.md` §A.11:* a Sikh rolled-and-tied beard, and *payot* — which are head
hair worn forward of the ear and would belong in `hair`, not `beard`, and which are
community-variant enough (four materially different silhouettes above) that a generic version
reads as caricature. Both are in §E.3.

### A.4 Layer order — direct evidence, and why we take the opposite decision

**There is no published industry guidance on z-ordering facial hair.** Both research passes
searched for it specifically and found nothing — no engine documentation, no design-system spec,
no vendor guidance. That is worth stating plainly rather than implying a standard exists.

What does exist is a readable implementation. **`avataaars`** — the most-copied open-source
layered-SVG avatar system, and the engine behind DiceBear's `avataaars` style — composes as
`Skin → Clothe → Face → Top`, where `Face` is `Mouth → Nose → Eyes → Eyebrow`
([`src/avatar/index.tsx`](https://github.com/fangpenlin/avataaars/blob/master/src/avatar/index.tsx)).
**Facial hair is filed under `src/avatar/top/facialHair/` — architecturally part of the hair
group, not the face group** — and inside each hairstyle component the hair is drawn first and
`<FacialHair />` after it. In
[`LongHairStraight.tsx`](https://github.com/fangpenlin/avataaars/blob/master/src/avatar/top/LongHairStraight.tsx)
the order is literally *hair mask path → `<HairColor>` → hair shadow → `<FacialHair />` →
`{children}`. **So avataaars draws the beard on top of the hair, including hair that falls past
the jaw.**

**We should not copy that, and the reason is instructive.** `avataaars` has **one** hair layer.
Its hairstyles are a single group above the whole head, so a long style drapes over the jaw with
nothing behind it; a beard drawn below would simply vanish under `LongHairStraight`. Putting
facial hair on top is a **compensation for the absence of a back/front hair split**, not a
considered z-order — as their own docs concede by implication, the alternative would require
per-hairstyle occlusion masks.

We already have the split avataaars lacks. `hair-back` (10) is what falls behind the shoulders;
`hair-front` (70) is, in our contract's own words, "fringe, top, side locks" — the hair mass in
front of the head. Facial hair grows from the surface of the face, behind that mass. §D.2 takes
the opposite decision to avataaars for exactly that reason, and the reason is that we have the
layer they are missing.

Two points from avataaars we *do* adopt: beard strictly above the face group (non-negotiable — a
walrus or a full beard must cover the mouth), and glasses and headwear strictly above the beard
(otherwise a moustache pokes through a nose bridge). Our existing `glasses` 95 and `headwear` 100
already satisfy both.

### A.5 Hair — what the previous round left open

`docs/CATALOG-RESEARCH.md` §A.8.1 is authoritative on textured hair and is not repeated. This
round closed four things.

#### A.5.1 Code My Crown's actual style list — recovered, and it is a direct check on our catalogue

The guide (Dove × Open Source Afro Hair Library, launched 15 November 2023 — 200 pages, sculpts
by Black 3D artists, 360° photo mapping, cultural context; lead developer Isaac Olander, OSAHL
founded by A.M. Darke; built on a survey of 1,002 gamers / 300 Black gamers / 160 developers, in
which **85% of Black gamers said games represent textured hair poorly** and **74% of developers
said they would improve it if taught how**
([PR Newswire](https://www.prnewswire.com/news-releases/dove-and-open-source-afro-hair-library-launch-code-my-crown-the-worlds-first-complete-and-free-guide-for-coding-textured-hair-and-protective-styles-in-video-games-301988181.html),
[Game Developer](https://www.gamedeveloper.com/business/code-my-crown-guide-released-for-black-hairstyles-in-games)))
has never had its sculpt list published in any article. It is recoverable from the top-level
directory names of the [official repository](https://github.com/dove-us/code-my-crown):

`Afro_Fade` · `Afro_Puff_Split_Bangs` · `Bantu_Knots` · **`Braided_Bob`** · `Braided_Fade` ·
`Cornrows_Accent_Braids` · `Curly_Bangs` · **`Curly_Bob`** · `HalfUp_HalfDown` ·
`Headwrap_Natural_Curls` · **`Loc_Bob`** · `LowPonytail_Swoop_Bang` · `Natural_Locs` ·
`Stitch_Cornrows_Fade` · `Twist_Out` · **`Twists`**

*(That is 16 directories against a press figure of 15 sculpts. The discrepancy is unresolved —
**do not print either number as fact.**)*

Checked against our catalogue, we already have counterparts for eleven of them. **Two gaps are
unmistakable and both are now in §C.2:**

- **`Twists` — twists worn *in*.** We have `twist-out`, which is twists *taken down*, a
  completely different outline. Twists as an installed style — the single most common protective
  style in the world — have no family. This is `senegalese-twists` in §C.2.
- **`Braided_Bob`, `Curly_Bob`, `Loc_Bob` — three of sixteen sculpts are bob-length textured
  hair, and we have none.** Our `bob` is a blunt straight curtain with a smooth hem. A textured
  bob is not a recolour of it: individual ropes or braids cut to a jaw weight line produce a
  chopped, gappy hem of separated strand-ends, not a continuous edge. §C.2 proposes `loc-bob` as
  the representative of this group and §C.5 records the other two as the strongest Phase 2
  candidates in the whole slot.

The repo also ships **texture reference plates as transition pairs** — `3A_ends_3B`,
`3B_ends_3C`, `3C_ends_3A`, `4B_ends_4A`, `4B_4C` — alongside the plain 1/2A–C/3A–C/4A–C set.
**Real heads are not one curl type; the pattern changes along the strand and between crown and
nape.** That is a drawing instruction, and it is in §C.6.

Each sculpt ships eight standard camera logs: `FRONT`, `SIDE_LEFT`, `SIDE_RIGHT`, `BACK`, `TOP`,
`3_4_Left`, `3_4_Right`, `DETAIL_1/2`. We draw front-on only, so most of that does not apply —
but "check the crown and the nape, not just the front" does.

Only A.M. Darke's own wording of the failure modes could be verified: *"How else can we explain
the ubiquity of matted Cornrows, bald patches instead of parts, giant disco 'Fros, and the messy,
Unstyled Locs?"*, adding that the rarity of a common fade or twist-out signals that "Black
players and our culture are an afterthought" ([Game Developer](https://www.gamedeveloper.com/business/code-my-crown-guide-released-for-black-hairstyles-in-games)).
The guide's own chapters and glossary could not be reached — Dove's PDF is 403 from every
server-side route. **Someone should download it from a browser before §C.2 is drawn.** The guide
won a D&AD Wood Pencil in 2025 and its case study claims it reached 34,000 employees across major
studios ([D&AD](https://www.dandad.org/work/d-ad-awards-archive/code-my-crown)); there is no
evidence of a content update or v2.

Worth noting as a counter-model: the [Open Source Afro Hair Library](https://afrohairlibrary.org/models/)
catalogues its ~70 models **as people** — "The Therapist", "The Park Ranger", "The Game Designer
(with wheelchair option)", plus named individuals — not as style SKUs, with "Super Duper" and
"Regular Degular" fidelity variants. That is a deliberate anti-taxonomy, and a reasonable
argument that parameter axes are a compression scheme optimised around the styles they were
designed for. Our family system is a middle path: named styles, not axes, but a catalogue rather
than a cast.

#### A.5.2 Hair loss — the largest remaining hole, and it is two shapes, not one

The catalogue has 31 hair families and not one expresses a receded hairline, a thinning crown or
a deliberately bare scalp. `buzz` is a close crop. `bald-fuzz` is newborn-only. Six life stages
including `midage` and `elder`, and nothing.

The clinical shape data matters here, because it corrects an error I would otherwise have made:

- **Male pattern loss** (Hamilton-Norwood, 7 stages) presents as "either a receding front
  hairline, loss of hair on the crown and vertex of the scalp, or a combination of both",
  progressing to a persistent rim at the sides and rear — the **Hippocratic wreath**, i.e. a
  horseshoe.
- **Female pattern loss** (Ludwig, 3 grades) is a **different silhouette entirely**: "a diffuse
  thinning of the hair across the entire scalp" **without pronounced hairline recession**.
- By age 50 it affects about half of men and a quarter of women.
  ([Pattern hair loss](https://en.wikipedia.org/wiki/Pattern_hair_loss))

**Shipping only the horseshoe would put the male-pattern shape on every body and call it
inclusion.** The diffuse-thinning shape — full length, scalp reading through at the part and
crown — is genuinely different geometry and is the one nearly every creator lacks. §C.2 proposes
**both**, `crown-thinning` and `fine-thinning`, and — per §0.1 — **both on both body types**. A
receding hairline is not a male trait any more than a skirt is a female one.

Two supporting findings:

- **ACNH added "bald" only in the 1.6.0 Free Winter Update**, in the *Top 6 Stylish Hairstyles*
  pack — **the same pack that first added an Afro and cornrows**, roughly a year after launch, to
  a base roster of 8 default styles that had neither ([Nookipedia](https://nookipedia.com/wiki/Hairstyle);
  ACNH ships 48 hairstyles in total). Bald and textured hair were the same afterthought.
- **The Sims 4's Golden Years Kit** (1 May 2025, 27 CAS items, "styles tailored just for" elder
  Sims — [EA](https://www.ea.com/games/the-sims/the-sims-4/buy/addon/the-sims-4-golden-years-kit))
  **shipped no new hairstyles at all.** Its only hair-adjacent items are a toupee in the default
  swatches, plus bonnets and headscarves; the Sims Community reviewer's own grandmother called
  the pieces "really dated and missed the mark—too stereotypical 'old lady frill'"
  ([review](https://simscommunity.info/2025/05/02/the-sims-4-golden-years-kit-review/)).
  **The most recent major elder-focused paid content in the biggest life-sim on the market
  shipped with zero elder hair.** A toupee, and nothing for the head underneath it.

*Judgement, not research:* alopecia specifically is a gap by absence — neither pass found
published criticism of its omission the way textured hair has been criticised. The two families
are proposed on design judgement, on the clinical shape data above, and on the ACNH/Sims pattern.

#### A.5.3 Fades are three axes, and we already have enough of them

[Cultured Grooming](https://culturedgrooming.com/types-of-fades/) parameterises fades exactly as
a creator would want: **height** (low = "half an inch to one inch above the ear"; mid = "at the
temple"; high = "two to three inches above the ear"), **floor** (skin/bald = down to bare skin;
shadow = never reaches skin), and **shape** (straight, drop = arcs downward toward the back,
burst = radiates around the ear, temp = temples and sideburns only). Wikipedia's
[Regular haircut](https://en.wikipedia.org/wiki/Fade_(haircut)) adds **edging** — "the design of
the lower edge of hair growth from the sideburns around the ears and across the nape" — which is
the **line-up / edge-up**, and confirms the *hi-top fade* and *Caesar* as named Black barbering
styles with their own lineage rather than generic cuts.

**The conclusion is that we should not add a fourth fade.** `taper-fade`, `high-top-fade` and
`waves-360` already span the height and floor axes, and a fourth would differ from `taper-fade`
on fade height alone — one axis. What is worth taking from this section is the vocabulary: the
edge-up is a *hairline treatment*, which is why `line-up` is a **beard** family in §E.2 and not a
hair one.

#### A.5.4 Naming — two live sensitivities, one of which changes a decision

- **Bantu knots are not buns.** They are knots on square or triangular parts, not gathered
  ponytail buns ([Bantu knots](https://en.wikipedia.org/wiki/Bantu_knots)), and the documented
  offence pattern is fashion media renaming them ("twisted mini buns"), exactly as cornrows
  became "boxer braids" and durags became "urban tie caps". **[the specific Marc Jacobs /
  Mane Addicts citations could not be opened — verify before printing them; the general principle
  is uncontroversial]**
- **"Space buns" carries two problems at once.** The style relates to the East Asian *odango*
  ([Odango](https://www.wikiwand.com/en/articles/Odango_(hairstyle))), and separately, two high
  buns on textured hair get conflated with Bantu knots. **This is why this proposal deliberately
  does not add a twin-bun family.** If it is wanted later it needs its own name settled first,
  its own geometry, and it must never be modelled as a variant of `bantu-knots`.
- **"Baby hair" is a terminology collision.** In Black hairstyling it means *edges* — the short
  hairs at the hairline, laid with gel into a sculptural design, traced to Josephine Baker in the
  1920s ([Olaplex](https://olaplex.com/blogs/news/laying-edges-how-to-history)). In a life-stage
  context it means infant fuzz. **Do not use "baby hair" as a label anywhere in this project.**
  Our newborn family is `bald-fuzz`, which is unambiguous.

#### A.5.5 Two physical facts that change how you draw

- **Shrinkage.** "The more coiled the hair texture, the higher its shrinkage"
  ([Afro-textured hair](https://en.wikipedia.org/wiki/Afro-textured_hair)) — the same true length
  reads dramatically shorter at 4C than at 1. A coily family drawn to the same hem line as a
  straight one will look under-drawn. `loc-bob` and `senegalese-twists` in §C.2 are specified at
  the length they *read*, not a nominal one.
- **Grey hair changes texture, not just colour.** It gets coarser and wirier **[weak source — a
  hair blog]**, which is the practical reason an elder character is not a palette swap of an
  adult one. Our `soft-set` already encodes this; nothing else needs to.

*Unverified, and recorded as gaps in the literature rather than gaps in products:* infant and
toddler hair representation (no source of any kind, academic or industry, was found); starter /
budding / mature loc stages; frohawk (a real style with no reputable definition available);
sponge and twist coils. Baldur's Gate 3, Fortnite, Infinity Nikki and Zenless Zone Zero were
**not researched**, not cleared — their absence here is not evidence of no criticism.

---

## B. Diagnosis — what we are missing

### B.1 The nine locked families

Confirmed on disk today:

| Bundle | hair files |
|---|---|
| newborn/female · newborn/male | 15 · 15 |
| toddler/female · toddler/male | 24 · 25 |
| teen/female · teen/male | 24 · 25 |
| adult/female · adult/male | 24 · 25 |
| midage/female · midage/male | 24 · 25 |
| elder/female · elder/male | 25 · 26 |

The asymmetry is the `fit-F` / `fit-M` tiers. Four families (`braided-crown`, `curtain-long`,
`half-up`, `high-puff`) exist only on the female spec; five (`man-bun`, `mop-shag`, `taper-fade`,
`undercut-sweep`, `waves-360`) exist only on the male spec.

**None of the nine passes the test `docs/FAMILIES.md` §0.1 sets for a fitting tier.** That test
is "the garment's *construction* genuinely depends on the body spec" — a camisole's bust shaping,
a dropped armhole across a wider shoulder. Hair sits on a head, and **the head specs for
`adult-female` and `adult-male` are byte-identical**: `cx 200, cy 91, rx 57, ry 59`, ears at
`(149, 95)` and `(251, 95)`, eyeLine `100`. The same holds for the teen pair, the midage pair and
the elder pair. There is no fitting difference to justify. A man bun and a half-up knot are the
same construction problem on the same ellipse.

So the nine are an aisle wearing a fitting tier's clothes. **`fit-F` and `fit-M` are removed from
the `hair` slot entirely and all nine become `Growing`** (toddler → elder, both body types, 10
bundles). That is 45 files: 25 to give the female bundles the five male-locked styles, 20 to give
the male bundles the four female-locked ones.

Note what this buys and what it does not. It adds **zero new silhouettes**; it makes nine
existing silhouettes reachable by twice as many characters. That is why it is accounted
separately from §C.2 in every total below.

### B.2 The four hair axes, and where the catalogue is empty

For garments the axes are shoulder/closure/hem/volume. For hair, read them as:

| Axis | Values |
|---|---|
| **Crown** | how the mass is organised at the scalp: no parting · centre part · side/hard part · fringe · shaved or faded sides · sectioned grid · scalp rows · three-section · bare |
| **Length** | skin-close · crop · ear · jaw · shoulder · past-shoulder · mid-back · waist · **or different front-to-back** |
| **Volume** | skin-close · close cap · rounded halo · narrow ridge · full column · free-hanging separated strands · gathered/knotted · thinned · absent |
| **Parting / hem** | how it ends: blunt continuous · tapered to a point · lobed/irregular · separated strand-ends · knotted · tied · beaded · none |

Plotting the 31 existing families onto that grid leaves eight genuinely empty cells. Six were
found by working the grid; two (5 and 8) were found by checking against Code My Crown, which is
the better method and the reason §A.5.1 exists.

1. **Volume = narrow ridge — empty.** `high-top-fade` is a full-width flat column;
   `undercut-sweep` is one mass swept sideways. Nothing is a *narrow raised ridge running crown
   to nape*. A frohawk is one of the most common hairstyles on a child's head anywhere in the
   world and the catalogue cannot draw it.
2. **Length = different front-to-back — empty.** Every family is one length all round. No mullet,
   and nothing else that says "short at the face, long at the nape".
3. **Crown = three-section — empty.** `fringe-bowl` is one even hemline with a fringe cut into
   it. Nothing has a fringe, separate cheek-length sidelocks *and* a long back mass as three
   distinct forms.
4. **Volume = thinned or absent — empty.** §A.5.2, and it is two cells, not one: horseshoe and
   diffuse.
5. **Hem = tapered fine points on a sectioned grid — empty.** `locs` are even-thickness ropes
   with blunt ends; `box-braids` are blunt and knotted at the root. Two-strand twists worn *in*
   taper to a fine point. `twist-out` is the style taken *down*, a different outline entirely.
   Code My Crown ships `Twists` and `Twist_Out` as two separate sculpts for exactly this reason.
6. **Crown = scalp rows feeding into free length — empty.** `cornrows` ends in a small gathered
   tail; `box-braids` has no scalp rows at all. The very common hybrid has no family.
7. **A single plait down the back — empty.** `braids` is two plaits worn *forward*; `ponytail` is
   a loose mass. One thick centre-back plait is arguably the most widely worn long hairstyle on
   earth.
8. **Textured hair at bob length — empty.** §A.5.1. Three of Code My Crown's sixteen sculpts sit
   here and we have zero.

### B.3 What is *not* missing, so nobody adds it

- **Texture twins.** There is no `coily-bob` beside `bob` and there must not be. Where a texture
  produces a genuinely different outline the catalogue already gives it its own *named* family
  with its own crown and volume — `afro`, `curls`, `twist-out`, `bantu-knots`. A family whose
  only difference from a sibling is tighter curl is banned by §0.2. (`loc-bob` in §C.2 is not
  this: it differs from `bob` on hem *and* volume, which is stated in its row.)
- **More fades.** §A.5.3. Three spans the axes; a fourth would differ on fade height alone.
- **More buns.** `bun`, `man-bun`, `high-puff`, `braided-crown` and `half-up` cover gathered
  volume at four crown positions. And see §A.5.4 on why twin buns specifically are not proposed.
- **Newborn hair.** Newborn deliberately authors 15 and gains nothing here. `docs/FAMILIES.md` §1
  is explicit that graduated depth by age is a design decision, and a newborn does not have a
  mullet.

---

## C. Proposed hair families

### C.1 De-gendering the nine — 45 files, no new silhouettes

`fit-F` and `fit-M` are deleted from the `hair` slot. All nine move to **Growing** (toddler ·
teen · adult · midage · elder, both body types — 10 bundles each). Silhouette descriptions are
unchanged from `docs/FAMILIES.md` §2.3 and remain binding.

| Family | Silhouette (unchanged) | New files |
|---|---|---|
| `braided-crown` | A braid wrapping the hairline like a band, remainder tucked away. | 5 male |
| `curtain-long` | Centre-parted with two long face-framing sweeps over a waist-length back mass. | 5 male |
| `half-up` | Top section gathered into a small knot, the rest hanging loose. | 5 male |
| `high-puff` | All hair gathered into one round coily puff standing above the crown. | 5 male |
| `man-bun` | Sides swept back to a small high knot, forehead exposed, a loose strand or two. | 5 female |
| `mop-shag` | Chin-length choppy layers under a heavy brow-covering fringe. | 5 female |
| `taper-fade` | Very short sides fading up to a slightly longer flat top, sharp hairline. | 5 female |
| `undercut-sweep` | Shaved sides with one long swept-over top mass falling to one side. | 5 female |
| `waves-360` | Near-shaved with concentric ripples radiating from the crown. | 5 female |

**Total: 45 files** (25 on female bundles, 20 on male bundles), at
`src/assets/catalog/<stage>/<bodyType>/hair/<family>.svg` for stage ∈ {toddler, teen, adult,
midage, elder}.

**Authoring note.** `man-bun` on the female spec is not a redraw of `bun`, and `half-up` on the
male spec is not a redraw of `ponytail`. The head specs are identical between each pair, so the
silhouette test compares the new file against every other hair asset in that bundle and **will**
catch a lazy copy. Draw the family as described, to that body's own drawn hairline. `taper-fade`
on a female bundle in particular must be a genuine fade — a value gradient in the hair itself,
`--hair2` at the skin line up to `--hair1`, with a hard clean front hairline
(`docs/ASSET_CONTRACT.md`, "Hair: the texture *is* the outline"). Per §A.5.3, its fade height is
mid: the blend starts at the temple.

### C.2 Ten new hair families — 96 files

Eight are **Growing** (toddler → elder, 10 bundles). Two are **Older** (teen → elder, 8 bundles).
The right-hand column names the two-or-more axes separating each family from its nearest sibling,
per §0.2 — an art agent should be able to check the work, and the silhouette test will.

**Growing (toddler → elder, 10 bundles each) — 8 families, 80 files**

| Family | Silhouette | Separated from its nearest sibling by |
|---|---|---|
| `frohawk` | A narrow raised ridge of dense coils running crown to nape over close-faded sides, widest above the forehead and tapering to a point at the nape. | vs `high-top-fade`: **volume** (narrow ridge vs full-width column) + **crown** (faded round to the nape vs a hard front edge only). vs `undercut-sweep`: **volume** + **parting**. |
| `senegalese-twists` | Smooth two-strand rope twists emerging from a visible sectioned grid at the crown, falling to mid-back and tapering to a fine point at every end. | vs `locs`: **hem** (fine tapered points vs blunt even ends) + **crown** (visible section grid vs free root separation). vs `twist-out`: **length** + **volume** (installed ropes vs a taken-down stretched mass). |
| `loc-bob` | Individual locs cut to a jaw-length weight line, the hem reading as a row of separated rope-ends rather than a continuous edge, crown flat and parted. | vs `bob`: **hem** (separated strand-ends vs one blunt continuous edge) + **volume** (individual ropes vs a single curtain mass). vs `locs`: **length** + **hem** (a cut weight line vs free uneven fall). |
| `fulani-braids` | Scalp rows running back from a clean centre part, the outer sections releasing into long free braids past the shoulders, small beaded cuffs at the ends. | vs `cornrows`: **length** (long free fall vs a small gathered tail) + **volume** (flat crown over a hanging mass vs flat throughout). vs `box-braids`: **crown** (rows plus a centre part vs a square grid) + **volume**. |
| `mullet` | Cropped close at the fringe and over the ears, with a loose longer tail hanging over the nape and collar. | vs `mop-shag`: **length** (short front / long back vs uniform chin-length) + **crown** (no heavy fringe). vs `pixie`: **length** + **hem** (a loose tail vs a tapered nape). |
| `hime-cut` | Three distinct masses: a blunt fringe cut level at the brow, two straight sidelocks cut square at the cheek, and a long straight fall behind them. | vs `fringe-bowl`: **length** (a long back mass vs one even hemline) + **crown** (three sections vs one). vs `curtain-long`: **crown** (blunt fringe vs centre part) + **hem** (squared vs swept). |
| `single-braid` | Hair drawn smooth off the face into one thick three-strand plait falling down the centre back to the waist, tapering to a tie. | vs `braids`: **crown** (one centre-back plait vs two worn forward) + **volume**. vs `ponytail`: **volume** (plaited vs a loose mass) + **hem** (tapered and tied vs free). |
| `smooth-scalp` | A completely bare scalp, no hair mass at all — the skull and ears fully exposed, with a soft shadow where the hairline and nape would sit. | vs `buzz`: **volume** (absent vs a close cap) + **crown** (no hairline shape at all vs a stubble hairline reading as hair). vs `bald-fuzz`: **crown** + **volume** (`bald-fuzz` carries a halo of down at crown and nape). |

**Older (teen → elder, 8 bundles each) — 2 families, 16 files**

| Family | Silhouette | Separated from its nearest sibling by |
|---|---|---|
| `crown-thinning` | A dense horseshoe of hair round the temples and the nape with the crown bare, the hairline receded to two clear temple bays. | vs `smooth-scalp`: **volume** (a substantial side mass vs none) + **crown** (horseshoe vs bare). vs `soft-set`: **crown** (bare crown vs full) + **volume**. |
| `fine-thinning` | Full-length hair kept at its own length all round, but sparse enough that the scalp reads clearly through it at the parting and across the crown; hairline intact, no temple bays. | vs `crown-thinning`: **crown** (hairline intact vs receded) + **length** (full length retained vs crown bare) + **volume** (diffusely sparse vs absent in one zone). vs `soft-set`: **volume** + **hem**. |

**Why two hair-loss families and not one.** §A.5.2: the horseshoe is the male-pattern shape
(Hamilton-Norwood) and diffuse thinning is the female-pattern shape (Ludwig), and they are
genuinely different geometry. Shipping only the horseshoe would be putting one body's shape on
every body and calling it inclusion — the same error §B.1 is fixing. **Both are authored on both
body types**, and neither is elder-only: pattern loss affects about a quarter of women and half
of men by 50, and a teen with either is unremarkable.

**Why `smooth-scalp` is Growing and the thinning pair is Older.** A deliberately bare scalp
belongs at every age from toddler up — it is a haircut, and it is also what alopecia areata looks
like, most commonly diagnosed in childhood. Gatekeeping it to adults would repeat the mistake
§B.1 is fixing. A receded or diffusely thinned pattern is a different thing and reads wrong on a
toddler, so it starts at teen.

### C.3 A specific silhouette-test warning for `smooth-scalp`

It has almost no major forms, which makes it the one family in this proposal at real risk of
colliding with `buzz` or `bald-fuzz` under `src/catalog/silhouette.test.ts`. **Draw no cap shape
at all.** The `back` group carries a soft nape shadow; the `front` group carries a faint temple
hairline and a highlight arc across the crown. Both painted through `--hair2` at low opacity over
the skin the body already drew, with `--hair1` doing the sheen. If you find yourself drawing a
dome, you are drawing `buzz`.

`fine-thinning` has the opposite risk: it must not be `long-waves` with dots on it. **The scalp
showing through is negative space in the silhouette path itself**, not a texture laid over a
solid mass — the same instruction the contract already gives for `cornrows` partings.

### C.4 Naming discipline, restated

`docs/FAMILIES.md` §2.3's rule stands and applies to all ten: **name a style from its own
cultural origin, never from a lookalike.** `senegalese-twists`, `fulani-braids`, `frohawk`,
`loc-bob` and `hime-cut` keep their own names and never become "twist style 2". §A.5.4 has the
three live sensitivities: Bantu knots are not buns, "space buns" carries two separate problems
(which is why no twin-bun family is proposed), and **"baby hair" means edges, not infant fuzz,
and must not be used as a label anywhere in this project.**

### C.5 Deferred hair — documented, not authored

Recorded so the list is not re-derived. Each at Growing tier would cost 10 files.

| Family | Note |
|---|---|
| `braided-bob` · `curly-bob` | The other two of Code My Crown's three bob-length textured sculpts (§A.5.1). **These are the strongest Phase 2 candidates in the whole hair slot** — the gap they fill is documented by the single most authoritative reference in this space. |
| `braided-fade` | Braids on top over faded sides — a two-zone silhouette with a hard boundary. Also a Code My Crown sculpt. Competes with `frohawk` on the same axes and should arrive after it. |
| `stitch-cornrows` | Cornrows with visible horizontal ladder-rungs. **Same silhouette as `cornrows`, different surface** — under §0.2 this is a surface treatment, not a family, and should be an instance rather than a new key. Recorded here so nobody proposes it as a family. |
| twin buns / `odango` | Blocked on naming, not on merit. §A.5.4. |
| `wolf-cut` | Shag layering plus mullet front-to-back contrast plus a fringe ([Wikipedia](https://en.wikipedia.org/wiki/Wolf_cut)). Overlaps `mop-shag` and `mullet` on two axes each; would need careful redrawing to earn a key. |
| Sikh `patka` over a *joora*; *payot* | **Gated on cultural review**, per §A.3 and the precedent in `docs/CATALOG-RESEARCH.md` §A.11. Note `patka` is a head covering and belongs in `headwear`, where `turban` already lives. |

### C.6 Drawing notes for §C.2

- **Read Code My Crown before drawing `frohawk`, `senegalese-twists`, `loc-bob` or
  `fulani-braids`** ([Game Developer summary](https://www.gamedeveloper.com/business/code-my-crown-guide-released-for-black-hairstyles-in-games);
  guide at dove.com/CodeMyCrown). **Do not copy its models** — they are 3D and under their own
  BOSS licence, and everything we ship is original art.
- **Curl pattern is not uniform down a strand or across a head** (§A.5.1). A twist or a loc that
  is the same width and the same wave from root to tip reads as rope, not hair. Vary it.
- **Shrinkage** (§A.5.5): draw the coily families at the length they *read*, not a nominal one.
  `loc-bob` sits at the jaw; `senegalese-twists` at mid-back; both look shorter than a straight
  style of the same nominal length and that is correct.
- **The failure modes are named and specific** (§A.5.1): matted cornrows, bald patches instead of
  parts, giant featureless afros, messy unstyled locs. For `fulani-braids` in particular, the
  centre part and the two contradictory row directions are the whole style — draw the partings as
  visible negative space in `--skin1`/`--skin2`, 3–5px wide, exactly as the contract already
  specifies for `cornrows`.

### C.7 Hair after this proposal

| Bundle | hair now | hair after |
|---|---|---|
| newborn/female · newborn/male | 15 · 15 | 15 · 15 (unchanged) |
| toddler/female · toddler/male | 24 · 25 | 37 · 37 |
| teen/female · teen/male | 24 · 25 | 39 · 39 |
| adult/female · adult/male | 24 · 25 | 39 · 39 |
| midage/female · midage/male | 24 · 25 | 39 · 39 |
| elder/female · elder/male | 25 · 26 | 40 · 40 |

Every bundle at a given stage now authors an identical hair roster. The only remaining
per-bundle differences in the slot are the two `Stage` families, `bald-fuzz` (newborn) and
`soft-set` (elder) — stage differences, not body-type differences.

**Is 39 too many?** `docs/CATALOG-RESEARCH.md` §A.7 estimated 12–16 distinct silhouettes per
garment slot, and §E.4 of that document already argued hair should sit above the band. Four
things justify 39. **First**, 9 of the increase is de-gendering, which adds no new silhouette at
all — the *distinct family count* goes from 31 to 41, and any one bundle sees 39 or 40 of them.
**Second**, hair is the most-criticised area in this product category and the one where
under-investment is most visible (§A.5, and `docs/CATALOG-RESEARCH.md` §A.8.1). **Third**, for
calibration: ACNH ships 48 hairstyles across its whole game
([Nookipedia](https://nookipedia.com/wiki/Hairstyle)) and Toca's in-world Hair Salon alone offers
54. **Fourth**, the two most recent data points in the industry both point at under-supply, not
over-supply: ACNH shipped an Afro, cornrows and bald in the same afterthought pack a year post
launch, and The Sims 4's 2025 elder kit shipped no hair whatsoever (§A.5.2). 41 distinct families
is not extravagant for the slot that carries the most identity.

---

## D. The `beard` slot — complete engineering specification

Five files must change and one notably must not. Everything below is checked against the code as
it stands at `0ac0ab0`.

### D.1 `src/catalog/types.ts` — the slot

Add `'beard'` to `SLOTS`, immediately after `'hair'`:

```ts
export const SLOTS = [
  'eyes', 'brows', 'mouth',
  'hair', 'beard', 'top', 'bottom', 'onepiece', 'shoes',
  'glasses', 'headwear', 'earrings', 'necklace',
  'costume',
] as const
```

**Do not add it to `ACCESSORY_SLOTS`.** `docs/ASSET_CONTRACT.md`'s "Slots that do not exist yet"
table says to, and that instruction is wrong — see §D.3.

**Do not add it to `OVERRIDE_SLOTS`.** A beard hides nothing; every beard asset declares
`data-hides=""`. Nor should anything hide a beard: a full-coverage `headwear` asset declaring
`data-hides="hair"` covers the hair and must leave the beard alone (a hijab or a turban does not
cover a chin), and a `costume` is confined to below the shoulder line minus 8px so it cannot
reach the jaw.

Array position is not load-bearing for rendering — `composeCharacter` sorts by `z` at the end —
but `SLOTS` order drives `remapSlots`' iteration and the `ContactSheet` column order, so putting
`beard` next to `hair` keeps both readable.

### D.2 `src/catalog/layers.ts` — the layer, and the z-position argument

```ts
export const LAYERS = [
  'hair-back', 'body', 'bottom', 'top', 'onepiece', 'shoes',
  'face', 'beard', 'hair-front', 'costume', 'necklace', 'earrings', 'glasses', 'headwear',
] as const

export const LAYER_Z: Record<LayerName, number> = {
  'hair-back': 10,
  body: 20,
  bottom: 30,
  top: 40,
  onepiece: 45,
  shoes: 50,
  face: 60,
  beard: 65,          // above face (60), below hair-front (70)
  'hair-front': 70,
  costume: 80,
  necklace: 85,
  earrings: 90,
  glasses: 95,
  headwear: 100,
}
```

> **`beard` must be inserted into the `LAYERS` array in that position, not appended.**
> `src/catalog/layers.test.ts` asserts that `LAYER_Z` is *strictly ascending in declaration
> order*. Appending `'beard'` at the end of the array with `z: 65` fails that test immediately.

#### The recommended z is **65**. Here is the argument.

**Why above `face` (60).** This half is forced. `face` carries `eyes`, `brows` and `mouth`. A
beard has to cover the jaw and the chin, and a moustache has to sit *over* the upper lip. Below
60, the mouth asset would punch through every full beard and every moustache would disappear
behind the lip. `walrus` is defined by drooping over the mouth and would be impossible.
`stubble` is a soft wash across the jaw and lower cheeks that must sit on top of the skin *and*
on top of the mouth's corner shadow to read at all. Above 60 is not a judgement call, and
avataaars agrees — it draws facial hair after its entire `Face` group (§A.4).

**Why below `hair-front` (70), which is the real question.**

Take the two cases the brief names.

*A moustache versus a mouth asset.* Settled by the paragraph above: 65 > 60, the moustache covers
the lip, `walrus` correctly droops over the whole aperture. `hair-front` is irrelevant here — no
hairstyle in the catalogue puts hair on the philtrum.

*A long beard versus long side hair.* This is where the decision is made. Take `curtain-long`,
whose silhouette is "centre-parted with two long face-framing sweeps over a waist-length back
mass". Those sweeps live in the `front` group and run down the sides of the face — roughly
x 145–175 and x 225–255 on an adult bundle, against a head spanning x 143–257. A `full-beard`
occupies roughly x 158–242. The two overlap only on the beard's outer edge: the cheek line and
the sideburn connection, x 158–175 and x 225–242.

- **At 65**, the hair sweep draws over the beard's outer edge. The beard reads as emerging from
  *underneath* the hair, which is what happens on a head — hair falling forward past the ear
  hangs in front of the sideburn. The chin, the moustache and the whole lower mass — every part
  carrying the family's identity — stay fully visible, because no hairstyle in the catalogue
  reaches the centre of the chin.
- **At 75** (above `hair-front`), the beard's cheek edge draws over the hair curtain. A wide
  beard cuts a notch out of the hair on both sides and reads as pasted on. And nothing is gained:
  the fringe styles that `hair-front` is mostly made of (`fringe-bowl`, `mop-shag`, `hime-cut`)
  sit at the brow, 40–60px above anything a beard touches, so raising the beard above them
  changes nothing at all for them.

**The only styles that interact are exactly the ones where occlusion is correct. z 65.**

**The counter-evidence, and why it does not apply.** `avataaars` draws facial hair **above** the
hair, including hair that falls past the jaw (§A.4, verified in
[`LongHairStraight.tsx`](https://github.com/fangpenlin/avataaars/blob/master/src/avatar/top/LongHairStraight.tsx)).
It has to: it has a single hair layer and no back/front split, so a beard drawn below would
vanish under any long style, and the alternative would require per-hairstyle occlusion masks.
**Their ordering is a compensation for a missing layer, not a considered z-order.** We have the
layer they are missing. Copying their conclusion would import a workaround for a limitation we do
not have. This is also, incidentally, the only empirical data point that exists — both research
passes searched specifically for published z-order guidance on facial hair and found none, which
is worth saying plainly rather than implying a standard.

**Two secondary consequences, both correct.**

- 65 > `top` (40) and `onepiece` (45), so a long beard hangs over a shirt collar. Right.
- 65 < `costume` (80), so a costume's storm collar covers a long beard's tip. Acceptable —
  `costume` is an override slot that replaces the whole outfit anyway.
- 65 < `glasses` (95) and `headwear` (100), so a moustache never pokes through a nose bridge and
  a beard never covers a hat. Both correct, and both are the behaviour avataaars also lands on.

**Optional test to add** to `src/catalog/layers.test.ts`, mirroring the existing assertions:

```ts
it('puts the beard above the face and below the front hair', () => {
  expect(LAYER_Z.beard).toBeGreaterThan(LAYER_Z.face)
  expect(LAYER_Z.beard).toBeLessThan(LAYER_Z['hair-front'])
})
```

### D.3 `src/render/composition.ts` — **verified: no change required**

I read the file and traced every branch. A `beard` asset is an ordinary single-layer, per-bundle
asset and each branch already handles it:

- `composeCharacter` iterates `SLOTS`, so `beard` is picked up the moment it is in that array.
- `asset.layer === 'hair'` is false, so it takes the `else` branch and pushes one layer at
  `LAYER_Z[asset.layer]` — 65. There is **no** two-group `data-part` split; a beard is one group.
- `transform` is computed only when `ACCESSORY_SLOTS.includes(slot)`. Because we are **not**
  adding `beard` to `ACCESSORY_SLOTS`, `transform` stays `undefined` and the art renders at its
  authored coordinates. Correct — a beard is drawn against its own bundle's jaw.
- `hiddenSlots()` walks `OVERRIDE_SLOTS`, which we are not touching.
- The final `.sort((a, b) => a.z - b.z)` places it between `face` and `hair-front`.

`src/catalog/build.ts` needs nothing either: `emptySlotMap()` is built from `SLOTS`, and
`buildCatalog` routes by directory, so `src/assets/catalog/adult/male/beard/goatee.svg` lands in
`bundle['adult-male'].beard` automatically. `src/catalog/parse.ts` and `src/catalog/lint.ts`
validate `data-slot` and `data-layer` against `SLOTS` and `isLayerName`, both of which pick the
new entries up for free.

**Why per-bundle and not per head-size class.** `docs/ASSET_CONTRACT.md` currently proposes
authoring facial hair per head-size class like `glasses`. That is wrong for three reasons.

1. **A beard is not confined to the head.** A `long-beard` reaches mid-chest, and `headTransform`
   scales by the *head* ratio — which would land it in the wrong place on any bundle whose
   head-to-torso proportion differs from the reference. That is exactly the failure
   `docs/FAMILIES.md` §4 already warns about for long hijab tails, with the same 1.3-head-radii
   limit that a long beard would breach.
2. **There are only three head classes and one of them (`toddler`) serves the newborn and toddler
   bundles**, which must author no facial hair at all. A shared pool would make §D.7 impossible
   to enforce structurally — the only guard would be a runtime check somebody eventually removes.
3. **The jaw and chin are drawn geometry that differs between the female and male body art** even
   where the head ellipse matches, and `docs/ASSET_CONTRACT.md`'s own "the drawn body is the
   truth, not the JSON" clarification says to fit against it.

Per bundle costs more files and is the only correct answer.

### D.4 The studio — `categories.ts`, and the two other UI files you must not forget

**`src/ui/studio/categories.ts` — `beard` joins the existing `hair` category. It does not get
its own rail button.**

```ts
{ key: 'hair', label: 'Hair', icon: '💇', slots: ['hair', 'beard'] },
```

Reasons, in order of weight:

1. **Precedent.** Toca Boca World puts beards and moustaches inside its "Face & hair" cluster
   next to hair, not in a category of their own (§A.1). That is the closest analogue product this
   project has and it made the same call.
2. **The tray already does this.** `OptionTray` renders one `<section>` per slot in the active
   category — `face` renders three, `accessories` renders four. A two-slot `hair` category gives
   a "Hair" section and a "Facial hair" section under one rail button, with no component change
   at all.
3. **Colour.** `OptionTray.paletteFor()` gives the hair ramp to any variable whose name starts
   with `hair`. A beard declaring `hair1,hair2` therefore gets `HAIR_PALETTE` for free, and
   putting the two swatch rows in one panel is what lets a player match — or deliberately not
   match — beard to hair.
4. **The rail is 70px wide** on desktop and a horizontal chip scroller below 900px. A ninth
   button is affordable but not free, and the payoff is nil when the content belongs with hair.

*Known cosmetic consequence:* on newborn and toddler bundles the "Facial hair" section renders
`OptionTray`'s existing "Nothing here yet" placeholder. That is honest and correct rather than
broken, and it is the same thing the tray does for any empty pool. An optional two-line polish is
to skip a zero-pool section when its category has more than one slot; not worth blocking on.

**`src/ui/studio/OptionTray.tsx` — `SLOT_LABELS` is typed `Record<Slot, string>`, so this is a
compile error until you add it:**

```ts
export const SLOT_LABELS: Record<Slot, string> = {
  …
  hair: 'Hair', beard: 'Facial hair', top: 'Top', …
}
```

**`src/state/randomizer.ts` — recommended, not required.** Add facial hair to `OPTIONAL`:

```ts
{ slot: 'beard', chance: 0.2 },
```

Without it, "Surprise me" never rolls a beard. With it, note the safety property in §D.7: on
newborn and toddler bundles `poolFor('beard')` returns `[]`, `pick` returns `undefined`, and
`equip` returns early — so **the randomizer cannot produce a bearded infant even by accident, and
no special-casing by stage is needed.** The empty pool is the guard.

**`src/catalog/silhouette.test.ts` — two small additions.** `beard` goes into
`SILHOUETTE_SLOTS` so beards are policed like every other wardrobe slot, and into the `AXES` map
so the failure message names the right four axes:

```ts
beard: 'upper lip · chin & jaw coverage · cheek line · length',
```

Nothing goes in `KNOWN_DUPLICATES`. There are no pre-existing beards, so the allow-list stays
empty for this slot forever.

### D.5 Summary of the change

| File | Change | Required? |
|---|---|---|
| `src/catalog/types.ts` | `'beard'` in `SLOTS`, after `'hair'` | **yes** |
| `src/catalog/layers.ts` | `'beard'` in `LAYERS` between `face` and `hair-front`; `beard: 65` in `LAYER_Z` | **yes** |
| `src/ui/studio/categories.ts` | `slots: ['hair', 'beard']` on the `hair` category | **yes** |
| `src/ui/studio/OptionTray.tsx` | `beard: 'Facial hair'` in `SLOT_LABELS` | **yes** (compile error otherwise) |
| `src/catalog/silhouette.test.ts` | `beard` in `SILHOUETTE_SLOTS` and in `AXES` | **yes** |
| `src/catalog/layers.test.ts` | a z-position assertion | recommended |
| `src/state/randomizer.ts` | `{ slot: 'beard', chance: 0.2 }` | recommended |
| `src/render/composition.ts` | **none** | — |
| `src/catalog/build.ts`, `parse.ts`, `lint.ts` | **none** | — |
| `ACCESSORY_SLOTS`, `OVERRIDE_SLOTS` | **none** | — |

One cosmetic wart worth knowing about: `rowLabel()` in `OptionTray.tsx` composes
`"${SLOT_LABELS[slot]} ${colorVarLabel(variable)}"`, so a beard's `hair1` row gets the
screen-reader label "Facial hair Hair". Harmless, visually invisible (the visible label is just
"Hair"), fixable later by keying `COLOR_VAR_LABELS` per slot. Not worth blocking on.

### D.6 Anchoring — where a beard attaches

`BodySpec` carries no chin or mouth anchor, so derive them. The three you need:

- **`chinY = head.cy + head.ry`** — the bottom of the head ellipse.
- **The jaw corners**, where the jawline leaves the ear line and curves in. Measured off the
  drawn `adult/male` body — whose jaw path is literally `d="M158 122 Q200 150 242 122"` — this is
  **`(head.cx ± 0.74·head.rx, head.cy + 0.53·head.ry)`**, with the chin as the quadratic control
  point at `(head.cx, chinY)`. **That curve is the beard's lower boundary for every jaw-following
  family.**
- **The sideburn root** — `ears[0]` and `ears[1]`, straight from the spec.

Precomputed for the eight bundles that author facial hair:

| Bundle | head cx,cy | rx,ry | eyeLine | ear y | **chin y** | **jaw corners** | shoulder y | **long-beard floor** |
|---|---|---|---|---|---|---|---|---|
| teen/female | 200, 132 | 60, 62 | 142 | 136 | **194** | (156, 165) (244, 165) | 200 | 269 |
| teen/male | 200, 132 | 60, 62 | 142 | 136 | **194** | (156, 165) (244, 165) | 200 | 269 |
| adult/female | 200, 91 | 57, 59 | 100 | 95 | **150** | (158, 122) (242, 122) | 156 | 230 |
| adult/male | 200, 91 | 57, 59 | 100 | 95 | **150** | (158, 122) (242, 122) | 156 | 230 |
| midage/female | 200, 102 | 58, 60 | 111 | 106 | **162** | (157, 134) (243, 134) | 168 | 243 |
| midage/male | 200, 102 | 58, 60 | 111 | 106 | **162** | (157, 134) (243, 134) | 168 | 243 |
| elder/female | 200, 125 | 57, 59 | 134 | 129 | **184** | (158, 156) (242, 156) | 190 | 260 |
| elder/male | 200, 125 | 57, 59 | 134 | 129 | **184** | (158, 156) (242, 156) | 190 | 260 |

The **long-beard floor** is `torso.y + 0.5 · torso.h` — the mid-torso line. **No beard extends
below it.** Two reasons: below that a beard stops reading as facial hair and starts reading as a
garment, and `docs/ASSET_CONTRACT.md` reserves y 200–300 on an adult body as the band where
garment detail lives, so a beard that keeps falling buries the front of every top in the
catalogue.

**The mouth.** `BodySpec` does not carry it, so measure it. On `adult/female` the drawn mouth
occupies roughly **y 112–133, x 176–224** (read out of `mouth/smile.svg`). As a fraction that is
`eyeLine + 0.24…0.66 × (chinY − eyeLine)` vertically and `±0.42 · head.rx` horizontally, giving:

| Bundle | mouth band (y) | mouth width (x) |
|---|---|---|
| teen (both) | 154 – 176 | 175 – 225 |
| adult (both) | 112 – 133 | 176 – 224 |
| midage (both) | 123 – 145 | 176 – 224 |
| elder (both) | 146 – 167 | 176 – 224 |

> **These are a starting point, not the truth.** `docs/ASSET_CONTRACT.md` clarification 2 is
> binding: the drawn body is the truth, not the JSON. Before you draw, open your own bundle's
> `bodies/<stage>/<bodyType>/base.svg` and `catalog/<stage>/<bodyType>/mouth/neutral.svg` and
> measure the jaw curve and the mouth box off the actual paths. A beard fitted from the table
> above and never checked against the art leaves a sliver of skin along the jaw, which is the
> exact failure clarification 2 documents for garments.

**Overlap rule.** Like a garment, a beard overlaps the form it sits on by 2–4px on every edge —
past the jaw curve, past the ear anchor, past the lip line. Never leave a gap.

**The cheek line** — the top edge of the beard — is the axis that separates most full beards from
each other (§A.2, §E.1). Express it as a fraction of the distance from the jaw corner up to the
ear anchor: *low* ≈ 25% (a clipped, corporate line), *natural* ≈ 55% (an untrimmed beard),
*joined* = 100% (meeting the sideburn and the hairline, as in `line-up`).

### D.7 **Newborn and toddler bundles author no facial hair. None.**

This is not a budget decision and there is no edge case.

**`newborn/female`, `newborn/male`, `toddler/female` and `toddler/male` author zero files in the
`beard` slot.** Do not create `src/assets/catalog/newborn/*/beard/` or
`src/assets/catalog/toddler/*/beard/` at all. Not `stubble`, not a "soft fuzz" joke asset, not a
costume beard. **If you are the agent for one of those four bundles, your facial-hair task list is
empty and that is the correct outcome.**

The teen floor is the right one and it is evidenced. Facial hair develops on a documented
schedule — first at the corners of the upper lip around 10–14, spreading across the whole lip by
14–16, reaching the cheeks and under the lower lip at 14–17, and the chin and lower face at 16–19
([Facial hair](https://en.wikipedia.org/wiki/Facial_hair)). **The Sims 4 gates its facial-hair
category to teen–elder** for the same reason, stated independently in two mod descriptions
("Enabled teen-elder"; "All sims aged teen and up now have access to the facial hair category").
No creator found in either research pass offers facial hair on an infant or toddler life stage —
though note that this is an absence of counter-examples rather than a published rule anywhere,
and note also that **ACNH is a partial counter-example in spirit**: because its beards are
*accessories* rather than a stage-gated slot, a young avatar can equip a full pirate beard.
That is precisely the architecture we are declining in §D.3.

Three properties make our version structural rather than merely stated:

1. The four directories do not exist, so `buildCatalog` puts nothing in
   `bundle['newborn-male'].beard`.
2. The tray renders "Nothing here yet" for an empty pool — visibly and correctly empty.
3. `remapSlots` clears a slot whose target pool is empty (`if (pool.length === 0) continue`), so
   an adult character wearing a `full-beard` who is switched down to toddler simply loses it, and
   regains it on switching back up because the family key survives on the way out. The randomizer
   is covered by the same emptiness (§D.4).

A costume beard for a `wizard` is not an exception — it is a `beard` asset on a teen or older
bundle, worn with the costume.

### D.8 The file header, and the one hair trap that does *not* apply

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="Full Beard"
     data-family="full-beard"
     data-slot="beard"
     data-layer="beard"
     data-colors="hair1,hair2"
     data-hides="">
  <defs>
    <linearGradient id="adult-male-beard-full-beard__mass" x1="0" y1="0" x2="0" y2="1">…</linearGradient>
  </defs>
  <g class="sp-shadow">
    <path d="…" fill="url(#adult-male-beard-full-beard__mass)"/>
  </g>
</svg>
```

- **One group, not two.** `data-part="back"` / `data-part="front"` is a `hair`-only requirement.
  A beard has no back half.
- **A root-level `<defs>` is fine here.** The most expensive trap in the project — root defs
  silently discarded — applies **only** to assets whose `data-layer` is `hair`, because
  `parseAsset` extracts the two part-groups and throws the rest away. For every other layer it
  takes `innerMarkup(root)`, which keeps the defs. Beards take the ordinary path.
- **Declare `hair1,hair2`, in that order.** `--hair1` is the lit mass; `--hair2` is the shadow
  *and* the texture-defining colour — the philtrum gap between a moustache's two halves, the
  underside of a coil lobe, the chin whorl. A beard where `--hair2` is only a bottom gradient stop
  is under-drawn, exactly as for hair. Declaring `hair*` also buys the hair colour ramp in the
  tray for free (§D.4).
- **`--skin1/2/3` are always available and never declared.** `stubble` in particular is mostly
  `--hair2` at low opacity over the skin the body already painted.
- **Id prefix** is the path with `catalog/` dropped and slashes turned to dashes, exactly as
  everywhere else: `adult-male-beard-full-beard__…`.
- **The colours are independent of the head hair's.** `slots.beard.colors` and `slots.hair.colors`
  are separate records, so a player can put a white beard on dark hair and the app will never
  silently sync them. That is the behaviour we want; it matches Toca's separate beard colour
  control, and it is deliberately *unlike* ACNH's `Rounded Beard`, which auto-matches hair colour
  and takes the choice away. It also means the studio will not auto-match — worth knowing before
  someone files it as a bug.

### D.9 The single-slot cost, stated honestly

Our `beard` slot holds one asset, so a player cannot combine `moustache` with `goatee`. That is a
real limitation and it has a real precedent in this project: `hearing-aid-studs` exists only
because hearing aids and earrings compete for one anchor, and `docs/FAMILIES.md` §4.3 calls it
"a workaround for a missing `ear-tech` slot, not a design". The same honesty applies here.

**The recommendation is still one slot for now**, for three reasons. Every named shape in §A.2 is
reachable as a single family, including both of the religiously load-bearing combinations from
§A.3 (`chin-curtain` for the bare-lip beard, `full-beard` for the short-moustache one). Two slots
would double the tray sections and the engineering. And each family would have to be drawn to
composite with any partner in the other slot, which is a genuine art constraint — the same one
that made `docs/CATALOG-RESEARCH.md` §C.7.7 decline splitting hair into front and back slots.

**The future fix, recorded so it is not re-derived:** a `moustache` slot at **z 66** — above
`beard` (65), below `hair-front` (70) — authored per bundle on the same eight bundles. The
Nintendo Switch Mii Maker split moustache from beard for exactly this reason (§A.1). If it is
ever done, the `beard` families whose identity is the moustache (`moustache`, `handlebar`,
`walrus`) move across, and `circle-beard` and `full-beard` decompose into a beard plus a
moustache. **Do not do this in the same pass as adding `beard`** — ship the slot, see whether the
combination is actually missed.

---

## E. Proposed facial-hair families

### E.1 The four beard axes

Two families in the same `(bundle, beard)` must differ on at least two of:

| Axis | Values |
|---|---|
| **Upper lip** | bare · shadow · trimmed bar · overhanging the lip · flared or extended ends |
| **Chin & jaw coverage** | bare · tuft under the lip only · chin only · chin + jaw band · under-jaw curtain · full jaw and cheeks |
| **Cheek line** | none · jaw-only · low and clipped · natural mid-cheek · joined to the sideburn and hairline |
| **Length** | shadow · stubble · clipped short · to the throat · past the jaw · to mid-chest |

This is the set that goes into `AXES` in `src/catalog/silhouette.test.ts` (§D.4). It falls
straight out of the taxonomy in §A.2, where the presence or absence of a moustache and the height
of the cheek line are the two distinctions the sources rely on most.

### E.2 Phase 1 — 12 families, `Older` tier (teen · adult · midage · elder, both body types)

Every family is authored in **all eight** bundles that carry facial hair. There is no fitting
split and no gender split (§0.1). 12 × 8 = **96 files**.

| Family | Silhouette | Separated from its nearest sibling by |
|---|---|---|
| `stubble` | An even soft shadow of growth over the upper lip, chin, jaw and lower cheeks, with no defined edge anywhere and no mass standing off the face. | vs `line-up`: **length** + **cheek line** (no edge vs razor-hard). vs `full-beard`: **length** + **coverage**. |
| `moustache` | A trimmed bar of hair on the upper lip only, ends stopping level with the corners of the mouth; chin, jaw and cheeks bare. | The baseline of the moustache group. **Keep the ends at the mouth corners** — a narrow version becomes the banned shape in §A.2. |
| `handlebar` | Upper lip only, the ends grown long and swept outward and upward well past the corners of the mouth; chin bare. | vs `moustache`: **upper lip** (flared extended ends vs a stopped bar) + **length**. |
| `walrus` | A thick moustache drooping down over the whole mouth to below the lower lip; chin, jaw and cheeks bare. | vs `moustache`: **upper lip** (overhanging vs trimmed above the lip) + **length**. vs `handlebar`: **upper lip** + **length**. |
| `goatee` | A rounded mass of hair on the chin only, clearly disconnected from the lip; upper lip, jaw and cheeks bare. | vs `moustache`: **upper lip** + **chin coverage** — a complete inversion. |
| `circle-beard` | A moustache joined round both corners of the mouth to a rounded chin beard, enclosing the mouth in a closed ring; jaw and cheeks bare. | vs `goatee`: **upper lip** (joined vs bare) + **coverage** (a closed ring). |
| `chin-strap` | A narrow even band of hair following the jawline from ear to ear and round under the chin; upper lip bare, cheeks bare. | vs `circle-beard`: **coverage** (the jaw edge vs round the mouth) + **cheek line** (runs to the ear vs none). |
| `chin-curtain` | A broad curtain covering the chin and the whole under-jaw from ear to ear, hanging just below the jawline; upper lip **completely bare**. | vs `chin-strap`: **length** (a hanging curtain vs a narrow band) + **coverage**. vs `full-beard`: **upper lip** + **cheek line**. |
| `mutton-chops` | Wide sideburns flaring down the cheeks and broadening toward the jaw corners, stopping short of the chin; chin and upper lip bare. | vs `chin-curtain`: **chin coverage** (bare vs covered) + **cheek line** (high and flared vs jaw-only). |
| `line-up` | A short full beard with razor-hard straight edges — a sharp cheek line running down from the temple, a sharp neck line, and a hard-edged moustache — joined continuously to the sideburn. | vs `full-beard`: **cheek line** (razor-hard and joined vs natural and irregular) + **length** (clipped even vs to the throat). |
| `full-beard` | A moustache joined to a full beard covering the cheeks, jaw and chin, ending at the throat, with a natural mid-cheek line and a softly irregular hem; the moustache trimmed clear of the lip. | The baseline of the full-beard group. |
| `long-beard` | A full beard hanging well below the jaw toward mid-chest, widening as it falls to a broad rounded hem, moustache untrimmed and overhanging the lip. | vs `full-beard`: **length** (mid-chest vs throat) + **upper lip** (overhanging vs trimmed) + **volume**. |

Three of the twelve carry weight beyond their own row. **`chin-curtain` is the only beard with a
deliberately bare upper lip** and is what makes the Amish/*shenandoah* shape reachable (§A.3);
its lip must be drawn *clean*, not merely thin. **`full-beard`'s moustache is trimmed clear of
the lip**, which is what makes the sunnah shape reachable; do not let it drift into `long-beard`
territory. **`line-up` is the Black barbering edge-up** (§A.5.3) and is the natural partner to
`taper-fade` and `waves-360`; its edges are razor-straight *by definition* and it is the one
family exempt from the irregular-hem rule below.

**Drawing notes that apply to all twelve.**

- **The outline carries the texture, exactly as for hair.** A beard drawn as one smooth blob is
  the facial-hair version of the "perfectly spherical afro" failure `docs/ASSET_CONTRACT.md`
  names. Every hem needs visible strand or lobe irregularity — small overlapping lobes of unequal
  size on a coarse beard, finer serration on a fine one. `line-up` is the sole deliberate
  exception.
- **Thumbnail test, and it bites harder here than anywhere else.** Every asset is first seen at
  about 64×64 in the tray, where the whole head is maybe 20px across. A soul patch would be two
  pixels. That is why `soul-patch`, `sideburns` and `pencil-moustache` are all in §E.3 despite
  being iconic — at our display size they are indistinguishable from clean-shaven. Every family
  in §E.2 was chosen partly for reading at 64px.
- **Draw the parting.** A moustache has two halves with a philtrum gap between them; a full beard
  has a chin whorl. `--hair2` does that work. A moustache drawn as one unbroken lozenge reads as
  a smudge.
- **Cheek line is the money axis.** Six of the twelve differ from a sibling on it. Set it
  deliberately using the fraction in §D.6 and keep it consistent across every bundle you author,
  or `full-beard` reads as a different family at teen than at elder.
- **No `<text>`, no drawn lettering, no character reference.** `docs/FAMILIES.md` §0.3 applies to
  faces too — a specific moustache-plus-hair combination that reads as a named real or fictional
  person is a reference however generic the family name is.
- **Two shapes are banned outright: the toothbrush moustache and fu manchu.** §A.2 gives the
  reasons. Neither appears in §E.2 or §E.3 and neither may ever be added.

### E.3 Deferred — documented, not authored

Real styles from §A.2, recorded so the catalogue has a roadmap and nobody re-derives the list.
**Do not author them in this pass.** Each at `Older` tier would cost 8 files.

| Family | Why deferred |
|---|---|
| `coil-beard` | A dense short beard of tight coils with a lobed irregular contour, a high natural cheek line and no defined neck edge. Differs from `line-up` on cheek line and edge definition, and from `full-beard` on volume and hem. **This one matters for representation and should lead Phase 2**, not trail it. |
| `horseshoe` | A moustache with two straight bars running down past the mouth corners to the jaw. The strongest silhouette left on the table and the best single Phase 2 candidate after `coil-beard`. |
| `patchy` | Uneven islands of growth with clear bare gaps — the 10–17 developmental stage from §D.7 made into a shape: a wisp at each corner of the upper lip, a sparse chin patch, a broken cheek line. A genuinely teen-specific silhouette and good inclusion; deferred only because it is hard to read at 64px. |
| `pencil-moustache` | A hairline-weight line; indistinguishable from `moustache` at tray size. |
| `soul-patch` | Roughly 2px at tray size. |
| `sideburns` | Same. `mutton-chops` is the legible member of this group and ships in Phase 1. **`docs/FAMILIES.md` §6 names `sideburns` as one of six promised facial-hair families; this document supersedes that list** — the other five (`stubble`, `moustache`, `goatee`, `full-beard`, `long-beard`) all land in §E.2. |
| `van-dyke` | A chin point plus a disconnected moustache. Differs from `circle-beard` on closure and chin shape — fine, but a third member of a group that already has two. |
| `friendly-chops` | Mutton chops joined by a moustache. Differs from `mutton-chops` on the lip axis *only*, unless the chop shape is genuinely redrawn. Needs care to earn a key. |
| `ducktail` · `forked` | Long beards tapering to one point / splitting into two tails. Both good; both compete with `long-beard` on the same axis and should arrive together so the group reads as a set. |
| `braided-beard` | A long beard gathered into one or two plaits with a visible binding. High delight per file, pairs with `wizard` and `knight`. |
| `wispy-chin` | A few long sparse strands from the chin only. Differs from `goatee` on volume and length. Reads as elder without being elder-gated, and per §0.1 it is one of the families that makes `elder/female` facial hair land as ordinary rather than as a gag. |
| Sikh rolled-and-tied beard · *payot* | **Gated on cultural review**, per §A.3. *Payot* is head hair worn forward of the ear and belongs in `hair`, not `beard`, if it is added at all — and it is four materially different silhouettes, not one. |

### E.4 What Phase 1 gives a player

Combined with `headwear` as it already stands, the twelve families in §E.2 assemble most of the
identities §A.3 describes without a single family being named after anyone's religion:
`turban` + `long-beard`; `kippah` + `full-beard`; `kufi` + `full-beard`; `flat-cap` +
`chin-curtain`; `bandana` + `line-up`. **The combination is the representation.** That is the
argument for slots over presets, and once the slot exists it is free.

---

## F. File-count estimate

### F.1 By slot and tier

| Slot | Work | Tier | Families | Bundles each | Files |
|---|---|---|---|---|---|
| hair | de-gender the female-locked four | Growing → male bundles | 4 | 5 | **20** |
| hair | de-gender the male-locked five | Growing → female bundles | 5 | 5 | **25** |
| hair | new families | Growing (toddler → elder) | 8 | 10 | **80** |
| hair | new families | Older (teen → elder) | 2 | 8 | **16** |
| beard | new slot, Phase 1 | Older (teen → elder) | 12 | 8 | **96** |
| | | | | **Total** | **237** |

Hair subtotal **141**; facial hair subtotal **96**.

### F.2 By bundle — this is your file list

| Bundle | hair now | hair new | hair after | beard new | **new files** |
|---|---|---|---|---|---|
| newborn/female | 15 | 0 | 15 | 0 | **0** |
| newborn/male | 15 | 0 | 15 | 0 | **0** |
| toddler/female | 24 | 13 | 37 | 0 | **13** |
| toddler/male | 25 | 12 | 37 | 0 | **12** |
| teen/female | 24 | 15 | 39 | 12 | **27** |
| teen/male | 25 | 14 | 39 | 12 | **26** |
| adult/female | 24 | 15 | 39 | 12 | **27** |
| adult/male | 25 | 14 | 39 | 12 | **26** |
| midage/female | 24 | 15 | 39 | 12 | **27** |
| midage/male | 25 | 14 | 39 | 12 | **26** |
| elder/female | 25 | 15 | 40 | 12 | **27** |
| elder/male | 26 | 14 | 40 | 12 | **26** |
| **Total** | **277** | **141** | **418** | **96** | **237** |

Reading the "hair new" column: a **female** bundle from toddler up gains the five male-locked
families plus the eight new Growing families (13), plus the two thinning families from teen up
(15). A **male** bundle gains the four female-locked families plus the same eight (12), plus the
same two from teen up (14).

**The newborn bundles gain nothing, and that is correct.** No new hair family is `Core`, newborn
deliberately authors 15 (`docs/FAMILIES.md` §1 — graduated depth by age is a design decision),
and newborns author no facial hair (§D.7). The two newborn agents have no work in this pass.

### F.3 Against the ~200 anchor, and the exact trim

237 is about 18% above the ~200 the brief anchors on. That is deliberate — §A.5.1's Code My Crown
check and §A.5.2's two-shapes-not-one correction both added families after the first pass — but
here is the exact cut, so the decision is yours and not mine:

**Phase 1 at 201 files.** Drop four families:

| Drop | Tier | Files | Why it is the right cut |
|---|---|---|---|
| `hime-cut` | Growing | 10 | Fills a real empty cell, but the one whose absence is least visible against `fringe-bowl` and `curtain-long`. |
| `single-braid` | Growing | 10 | Same — genuinely absent, but the least *conspicuously* absent. |
| `chin-strap` | Older | 8 | The partial-beard group is where Phase 1 is deepest relative to how often the styles are chosen. |
| `mutton-chops` | Older | 8 | Same group. Note this leaves the whole sideburn axis unrepresented, so if only one of these two goes, keep `mutton-chops`. |

**237 − 36 = 201.** Everything else stays.

**Do not cut §C.1.** De-gendering the nine is the correctness fix the whole proposal is built
around, and trimming it leaves the aisle half-standing, which is worse than either end state.
**Do not cut `smooth-scalp`, `crown-thinning` or `fine-thinning`** either — 34 files carry the
single largest remaining representation gap in the slot (§A.5.2), and the pair has to ship
together or we ship one body's baldness for everybody.

---

## G. Documentation that must be updated when this lands

This document proposes; it changes nothing. When the work is done, three documents need edits.

**`docs/ASSET_CONTRACT.md`**

1. Add `| beard | beard |` to the slots-and-layers table.
2. **Delete the "facial hair" row from "Slots that do not exist yet"**, including its
   `facial-hair` name and its per-head-size-class instruction, both of which §D.3 supersedes. The
   `face-mark`, `mobility` and `ear-tech` rows stay.
3. Add a short "Facial hair is one group" note mirroring "Hair is two groups", making the point
   in §D.8 that a root-level `<defs>` is safe on a beard and unsafe only on hair.
4. Add the beard axes from §E.1 alongside the existing per-slot axis lists, and the two banned
   shapes from §A.2 alongside the existing IP guidance.

**`docs/FAMILIES.md`**

1. §2.3 — delete the `fit-F` and `fit-M` hair sub-tables and move all nine families into
   **Growing**. Change the heading from `14 Core + 6 Growing + 4 fit-F + 5 fit-M + 2 Stage` to
   `14 Core + 15 Growing + 2 Stage`, then add the ten families from §C.2 (8 Growing, 2 Older).
2. New §2.9 — the `beard` slot: the twelve families from §E.2, the `Older` tier, the four axes,
   and the newborn/toddler prohibition from §D.7 stated *in the section itself*, not in a
   footnote.
3. §3.1–§3.12 — every roster's `hair` line, plus a `beard` line on the eight bundles that author
   one. The newborn and toddler rosters get **no** `beard` line at all, which is the clearest
   possible signal to an agent reading only its own roster.
4. §5 — the totals tables.
5. §6 — remove facial hair from "families that cannot be authored yet"; face markings and
   mobility aids stay. Note there that `sideburns` moved to the deferred list in §E.3 rather than
   shipping.

**`docs/CATALOG-RESEARCH.md`** — §C.7.5 (a `facial-hair` slot at z 65, per head class, 12 files)
is superseded by §D of this document on the slot name, the authoring granularity and the file
count. **The z of 65 is unchanged and is now argued from evidence rather than asserted.** Leave
the section in place as history and add a pointer.
