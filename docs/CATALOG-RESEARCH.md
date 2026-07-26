# Catalog Research — Breadth, Variety and a Proposed Family List

**Date:** 2026-07-26
**Status:** Research and proposal. Nothing here is authored yet.
**Companion documents:** `docs/FAMILIES.md` (the current catalog — unchanged by this document),
`docs/ASSET_CONTRACT.md` (authoring rules), `docs/superpowers/specs/2026-07-26-character-builder-design.md`.

This document exists to be read cold. If you are an agent about to draw SVGs, you need
sections **C**, **D** and the *Authoring rules that bite* box in **B** — the rest is the
reasoning behind them.

---

## A. Findings

### A.0 How to read the citations

Where a number is publicly documented I cite it. Where it is not — and for these products it
often is not — I say so explicitly and give a reasoned estimate. **Do not treat an estimate in
this document as a measured fact.**

### A.1 Toca Boca Life: World / Toca Boca World

*(Launched as Toca Life: World, Nov 2018; renamed Toca Boca World. Swedish studio, owned by
Spin Master — [Wikipedia](https://en.wikipedia.org/wiki/Toca_Boca).)*

**Category structure of the Character Creator.** Three colour-coded clusters
([Toca Life World Wiki: Character Creator](https://toca-life-world.fandom.com/wiki/Character_Creator)):

- **Body (yellow)** — height/age archetype (*tall, short, elderly, toddler* — only four, against
  our six), skin tone, and **prosthetic limbs and crutches** as separate left/right combinations.
- **Face & hair (cyan)** — hair (sub-tabs Short / Long / "Weird", each with colour), **beards and
  moustaches**, eyes, nose, eyebrows, mouth, and **face markings** (dimples, blush, wrinkles,
  each colourable).
- **Worn (red)** — clothing/outfits (casualwear, formal, dresses, sportswear, sleepwear,
  costumes, uniforms); headwear (caps, long-brimmed hats, uniform hats, beanies, costume hats,
  hair accessories, baby headwear); eyewear (glasses, sunglasses, masks, helmets, and
  **"headwear that hides the hair — hoodies, hijabs, headscarves"**).

**Two structural facts that matter enormously for us.** First, in the Character Creator,
**outfits are single-piece whole-body garments** — there is no tops/bottoms/shoes split at all.
Layered dressing arrived only with the **Outfit Designer (26 Nov 2024)**, which exposes shirts,
pants, skirts, coats, socks, jewellery and bags separately, in two body models (tall/short and
toddler), with up to 15–30 saved outfits
([wiki](https://toca-life-world.fandom.com/wiki/Outfit_Designer),
[Toca Boca help centre](https://tocaboca.helpshift.com/hc/en/3-toca-boca-world/faq/241-introducing-outfit-designer-your-new-tool-to-style-outfits/)).
Second, they carry **four body archetypes** where we carry twelve bundles. **We already have a
finer-grained, more combinable architecture than the product we are drawing inspiration from.**
Our problem is entirely the contents, not the structure.

**Counts.** No per-category breakdown is published. First-party aggregates only:

- "**More than 2,000 customization options**" plus 27 characters, via the **$4.99 Character
  Creator Upgrade**; free tier caps you at 3 saved characters
  ([help centre](https://tocaboca.helpshift.com/hc/en/3-toca-boca-world/faq/135-what-type-of-content-is-available-for-purchase-on-toca-boca-world/)).
- Apple's 2021 App of the Year story cites **2,200 options**
  ([App Store](https://apps.apple.com/us/story/id1591080175)); an earlier Apple story said "more
  than 1,500… expanding monthly" ([App Store](https://apps.apple.com/us/iphone/story/id1477262701));
  their 2019 Shorty Awards entry said "more than 1,000"
  ([Shorty Awards](https://shortyawards.com/4th-socialgood/character-creator-tool)).
- **Skin tone: 16 hues, "umber to light peach", plus a darkness slider** — the one concrete
  published count ([Common Sense Media](https://www.commonsensemedia.org/app-reviews/toca-life-world-build-stories)).
- The 2026 "Character Creator GLOW-UP" update **replaced 61 hairstyles, 56 outfits and 10 facial
  details** ([help centre](https://tocaboca.helpshift.com/hc/en/3-toca-boca-world/faq/379-character-creator-improvements-are-here-it-s-time-for-a-glow-up-1779808294/)).
  For scale, the in-world Hair Salon offers **54 hairstyles (20 short / 19 long / 15 "crazy") and
  37 dyes** ([wiki](https://toca-life-world.fandom.com/wiki/Hair_Salon)).

**⚠ Reasoned estimate, clearly labelled.** From the 2,000 aggregate minus published pack
contents, the base game likely ships on the order of **60–100 hairstyles, ~16 skin tones with a
slider, dozens each of eyes/noses/mouths/brows, a few hundred outfits and 100+ headwear/eyewear
items**, with the balance coming from paid Style Packs. Third-party figures ("80+ hairstyles",
"60+ face types") come from SEO and APK blogs and should not be trusted.

**How breadth accumulates: the Style Pack cadence.** Minor versions ship roughly every 2–3 weeks
([version history](https://toca-life-world.en.uptodown.com/android/versions)), with content
drops roughly biweekly. **Style Packs are the clothing unit.** The first, *Y2K Ready* (Aug 2023,
$0.99), contained 12 outfits, 10 accessories, **6 hairstyles**, 1 facial detail. Typical shape
since: 4–8 hairstyles and 12–16 garments per pack, one or two packs a month. **The lesson is
that this catalogue was never authored in one push** — it accreted at roughly a pack a
fortnight for years. Our 800-file proposal is several years of Toca's content cadence delivered
at once, which is only possible because agents draw in parallel.

**Inclusivity — stated principles.** Four core values including **Inclusion**: *"Everyone is
welcome in our world. Kids can be whoever they want to be. Everyone fits in and stands out"*
([tocaboca.com/about](https://www.tocaboca.com/about)). President/COO Caroline Ingeborn: *"We
want to make products for kids—not boys, not girls—just kids"*
([Joan Ganz Cooney Center, 2018](https://joanganzcooneycenter.org/2018/09/14/podcast-transcript-the-app-fairy-talks-to-toca-boca/)),
which also names the dimensions they track: gender, skin tone, hair texture, age, culture,
physical ability, family structure, body shape. Head of consumer products Mathilda Engman: *"We
don't want to impose any gender roles in the products we do"* and *"Not excluding half of the
population is actually more profitable"*
([Fast Company 2017](https://www.fastcompany.com/40474511/meet-toca-boca-the-weird-playful-gender-neutral-lifestyle-brand-for-kids),
[Fast Company 2016](https://www.fastcompany.com/3056346/how-app-makers-are-pioneering-gender-fluid-design-for-kids)).

**Gender: no aisles, and no gender step at all.** *"All clothing and hair options [are offered]
to all characters, rather than asking [players] to pick a gender and narrowing the options"* —
there is no gender selection screen and no locked combinations
([Shorty Awards](https://shortyawards.com/4th-socialgood/character-creator-tool)). The creator
opens on a **silhouette, not a default character**, and skin tone is **initially randomised** —
an explicit anti-default choice. Art director Karin Hagen and designer Petter Karlsson describe
the mantra as "very intentionally not make a pink icon"
([Crossplay / Patrick Klepek, 2023](https://www.crossplay.news/p/toca-boca-gender-norms-and-the-rise)).
Family units deliberately avoid "the stereotypical family of a mom, a dad, a son and a daughter"
([Mic, 2018](https://www.mic.com/articles/192172/game-developer-toca-boca-subverts-stereotypes-and-gender-norms-with-its-games-for-children)).

**Mobility and medical items, presented matter-of-factly.** In-creator: prosthetic limbs (arms
and legs, including transfemoral), crutches, glasses, hearing aids, dimples, blush, wrinkles.
On **28 Nov 2023** they added **two continuous glucose monitoring (CGM) systems for the upper
body** plus more prosthetics ([wiki](https://toca-life-world.fandom.com/wiki/Character_Creator)).
Prosthetics sit **among the first options you see**, and an external advisory board pushed two
specific recommendations: do not present lighter skin tones as more desirable than darker ones,
and expand beyond mobility-related attributes
([Apple, "Designed for Accessibility"](https://apps.apple.com/us/story/id1508033066)). The
design principle worth stealing verbatim: **"If it's a wheelchair, it should be fun in the same
way as an outfit."**

**⚠ Things I could not verify, and which the app appears not to do.**
- **Wheelchairs appear to be world *objects* a character sits in, not a creator-equipped body
  attribute.** Press coverage routinely lumps them in with creator options; the wiki does not.
- **No documented, named inventory of locs, cornrows, Bantu knots, twists or fades** in the
  World creator. Toca states that kids and parents asked for afro-textured hair and that adding
  it landed strongly ([Children's Design Guide case study](https://childrensdesignguide.org/toca-boca-story/)
  — *that host refused every connection from this environment; content is from search extracts
  only*), and Hair Salon 3 models kinky-coily texture with texture-specific tool physics, but
  style-by-style claims about the World creator are unconfirmed.
- **No turban, kufi or kippah documented anywhere.** Muslim players publicly ask for more hijab
  options. Head coverings are treated as ordinary wardrobe — which is the right model — but the
  breadth is thin. **This is a genuine gap and therefore an opportunity for us.**
- The widely-repeated "**seven areas of diversity**" advisory-board figure is **unverified** and
  no board member is publicly named.
- **No GLAAD recognition exists** for Toca Boca. A claimed Fast Company *Innovation by Design*
  honour could not be confirmed — treat as false pending a source. Verified awards: Apple iPhone
  App of the Year 2021 ([Apple Newsroom](https://www.apple.com/newsroom/2021/12/app-store-awards-honor-the-best-apps-and-games-of-2021/)),
  Webby 2020 Family & Kids, Kidscreen 2022 and 2025
  ([Kidscreen](https://awards.kidscreen.com/Winners/Winner/2025)).

**Criticism worth carrying.** Target shelved the "gender-neutral" Toca Boca apparel line under
Boys'/Girls' aisle labels anyway
([Equally Wed](https://equallywed.com/what-toca-boca-gets-right-but-target-gets-wrong-on-gender-neutral-clothing/)).
And most of the representation — prosthetics, CGMs, the wide wardrobe — sits behind the $4.99
upgrade. **We have no paywall, so every inclusive option we draw is available to every user by
default. That is a real advantage and we should use it.**

### A.2 The Sims 4 — Create-A-Sim

**Category taxonomy.** CAS separates worn items into slot-based categories — Tops, Bottoms,
Full Body (dresses, suits, tracksuits, robes, costumes), Shoes, Hats, Accessories (bracelets,
gloves, rings, nails, leggings, socks, skin effects), Glasses, Necklaces, Earrings, Makeup,
Tattoos. Style words like "blouse / polo / tank / button-up / sweatshirt" are **filter tags on
a single Tops slot**, not separate slots
([Sims Wiki: Create a Sim](https://sims.fandom.com/wiki/Create_a_Sim)).

**Outfit-occasion system.** Eight outfit categories — Everyday, Formal, Athletic, Sleep, Party,
Swimwear, Hot Weather, Cold Weather — plus a Career outfit reachable only by cheat. Each holds
five outfit slots, so 40 saved looks per Sim ([Sims Wiki: Clothes](https://sims.fandom.com/wiki/Clothes)).
This is an under-discussed source of *felt* richness: the same wardrobe is re-encountered in
different contexts rather than seen once.

**Life stages.** Newborn, Infant, Toddler, Child, Teen, Young Adult, Adult, Elder
([Sims Community](https://simscommunity.info/2025/08/26/the-sims-4-life-stages-lifespans/)).
Critically: *"Teen Sims also unlock most of the same clothing, hair, makeup, and other
Create-a-Sim items that are available to Young Adults and older."* The real asset boundaries
are therefore **Infant | Toddler | Child | Teen-and-up**, not one boundary per stage. Our six
stages should follow the same logic: newborn and toddler are genuinely different wardrobes;
teen through elder are mostly the same wardrobe with different tailoring.

**Graduated depth by age is normal.** The May 2025 Base Layers update shipped **8 items for
adults, 4 for children, 2 for toddlers** in the same new sub-category
([Life in Save Files](https://lifeinsavefiles.com/the-sims-4s-new-base-layers-feature-could-change-cas-and-custom-content-forever/)).
A younger stage having a smaller wardrobe is a design decision, not a gap.

**Infants update (March 2023)** added, specifically for infants: full-body onesies, dresses,
hooded outfits, **outfits that cover the hands** (the game's scratch-mitts analogue), tops and
bottoms mostly sold as matched sets, headpieces including a helmet, leggings, socks, glasses,
shoes, new wispy/thin/curly/long infant hair, teething-stage teeth, and **birthmarks on face
and body** ([Game Rant](https://gamerant.com/the-sims-4-infants-update-create-a-sim-cas-items/)).

**Elders.** The Golden Years Kit (May 2025, 27 CAS items) is the clearest published elder-specific
wardrobe: comfort clothing cut for elder body types, gardening and light-workout outfits,
**glasses with retainer chains**, a **toupee**, a **bonnet**, gardening gloves, hobby-coded
outfits ([Sims Community](https://simscommunity.info/2025/05/02/the-sims-4-golden-years-kit-review/),
[EA](https://www.ea.com/games/the-sims/the-sims-4-golden-years-kit)).

**Gender (2 June 2016).** Four independent settings — Physical Frame, Clothing Preference,
Pregnancy, Toilet Use — and **~700 previously gender-locked items unlocked for all Sims**
([SimsVIP](https://simsvip.com/2016/06/03/the-sims-4-gender-identity-same-sex-pregnancy-unisex-clothing/),
[LGBTQ Game Archive](https://lgbtqgamearchive.com/2016/06/24/gender-customization-in-the-sims/),
[NBC News](https://www.nbcnews.com/tech/video-games/sims-removes-gender-barriers-video-game-n584516)).
Press reaction was broadly positive; the surviving community complaint is technical — the frame
toggle is a body swap rather than a morph, and garments authored for one frame deform on the
other ([EA feature-refresh thread](https://forums.ea.com/discussions/the-sims-4-feedback-en/%E2%9A%99%EF%B8%8F-feature-refresh--gender-options-2016/11903447)).
**The lesson that matters for us: unlocking the catalogue across frames roughly doubled
effective wardrobe size at near-zero art cost, but only because the meshes already conformed.**
Our art is authored per body type, so we get the conformance for free and pay in files instead.

**⚠ Could not verify.** No credible per-category item counts exist for the Sims 4 *base game*.
No wiki, EA document or fan database publishes them. Per-pack counts are published (Adventure
Awaits = 157 pieces; Royalty & Legacy = 219 CAS assets) but do not answer "how many tops does a
new player start with". Treat any such figure you see as unsourced.

### A.3 Animal Crossing: New Horizons — the single most useful data point in this document

**Taxonomy.** Ten slots: Tops, Bottoms, Dress-Up (one-pieces, occupying both top and bottom),
Headwear, Accessories, Socks, Shoes, Bags, Umbrellas, Wet Suits
([Nookipedia](https://nookipedia.com/wiki/Clothing)).

**Counts, and the gap between them.** Fandom lists **4,692 clothing items**
([Fandom](https://animalcrossing.fandom.com/wiki/Clothing_(New_Horizons))). Nookipedia's
*unique-item* pages are far smaller: **Tops 342, Dress-Up 285, Headwear 284, Bottoms 152,
Shoes 113** ([tops](https://nookipedia.com/wiki/Category:New_Horizons_tops),
[bottoms](https://nookipedia.com/wiki/Category:New_Horizons_bottoms),
[headwear](https://nookipedia.com/wiki/Category:New_Horizons_headwear),
[shoes](https://nookipedia.com/wiki/Category:New_Horizons_shoes)). The difference is colour
variations — seasonal sets run 4 to 6 variants each
([Animal Crossing World](https://animalcrossingworld.com/guides/new-horizons/festivale-clothing-accessories-at-able-sisters-color-variants/)).
The 2.0 datamine found the same ratio: **~9,000 new "items", ~1,200 genuinely unique**
([Animal Crossing World](https://animalcrossingworld.com/2021/11/all-9000-new-items-in-version-2-0-animal-crossing-new-horizons-update-datamine/)).
**Roughly 75–85% of ACNH's headline catalogue is recolour.**

**And the silhouette count is tiny.** ACNH ships **six top shapes** — tank, short-sleeve tee,
long-sleeve dress shirt, sweater, hoodie, coat. The Custom Design Pro Editor exposes the entire
reusable mesh set: **15 shapes — 6 tops, 6 one-pieces (sleeveless / short-sleeve / long-sleeve /
round / balloon-hem dress, robe), 3 hats**
([Game Rant](https://gamerant.com/animal-crossing-new-horizons-pro-designs-how/),
[Fandom: Custom Designs](https://animalcrossing.fandom.com/wiki/Custom_Designs)).
Every villager and player shares one "tube body", which the
[Warwick Boar analysis](https://warwickboar.shorthandstories.com/-animal-crossing-new-horizons-virtual-fashion/index.html)
argues is deliberate — a neutral silhouette makes surface pattern legible.

**This is the key finding, and it cuts both ways for us.** ACNH gets away with 6 top shapes
because it has ~5 recolours per garment, a per-panel texture system, *and* a player-facing
custom-design editor that lets the community author the surface. We have none of those crutches
except recolour, and even that is currently crippled (see B.4). We therefore need **more
silhouette variety than ACNH, not less** — but we also need to steal ACNH's surface discipline,
because right now we have neither.

**Occasion vocabulary worth copying almost verbatim.** ACNH tags every item with one of six
Styles (Active, Cool, Cute, Elegant, Gorgeous, Simple) and Label's fashion check uses eleven
Themes: **Comfy, Everyday, Fairy Tale, Formal, Goth, Outdoorsy, Party, Sporty, Theatrical,
Vacation, Work** ([Nookipedia: Fashion check](https://nookipedia.com/wiki/Fashion_check)).
That is the cleanest published occasion+genre taxonomy from a shipped game.

### A.4 Gacha Club / Gacha Life

Layer-based rather than garment-based: Face (eyes, blush, mouth, eyebrows), **front hair and
back hair as separate slots**, Clothes (two stackable upper layers, plus Pants and Skirts),
Accessories (ears, wings, tail, hat, glasses, horns, halos), props
([Lunime Wiki](https://lunime.fandom.com/wiki/Gacha_Club)). Store copy claims "thousands of
dresses, shirts, hairstyles" and 600 poses
([App Store](https://apps.apple.com/us/app/gacha-club/id1527025761)) — marketing, not a count.
The genuine mechanic is that **every element is independently recolourable and stackable**, so
players synthesise garments that are not in the catalogue.
**⚠ No reliable per-category counts exist**; Lunime publishes none.

Note for us: our hair *is* already split front/back inside one file, but the two halves are
locked together. Splitting them into two selectable slots would be a large perceived-variety
win for zero new art — flagged in section C.7 as an engineering option, not proposed for v1.

### A.5 Mii Maker / Miitopia

Wii Mii Channel: **72 hairstyles, 48 eye types, 12 noses, 24 mouths**
([MiiWiki](https://miiwiki.org/wiki/Mii_Maker)). Miitopia 3DS: **132 hairstyles, 36 mouths,
18 noses** ([Miitopia Wiki](https://miitopia.fandom.com/wiki/Mii_Maker)). Small parts library,
but each part carries size / position / rotation / colour sliders, so the space is continuous.
Miitopia Switch added Makeup & Wigs: **8 stackable layers, up to 100 parts on one face, 100
extra colours** ([Makeup & Wigs](https://miitopia.fandom.com/wiki/Makeup_%26_Wigs)).

**The limit is the body, not the face.** Miis share one rigid body with height/build sliders
only; clothing is effectively a texture. Every viral Mii creation is a *face*. Our situation is
the mirror image: our faces are thin (5 eyes, 3 brows, 4 mouths) and our bodies are per-stage
and per-body-type, so our expressive bandwidth is below the neck. Both slots deserve
investment, but the body is where our architecture already pays for itself.

### A.6 Toca Hair Salon and Sago Mini

Toca Hair Salon is a **tool set, not a catalogue** — scissors, trimmer, shampoo, dryer; HS2 added
razor, curling iron, crimper, straightener and 9 hair colours; HS3 replaced the fixed colours
with **spray cans allowing dip-dye and fades in any colour**. Hair Salon 4 has 20 characters and
four stations, including trim/shave/regrow anywhere, curl/straighten/texturize, and freehand
face paint ([Common Sense Media](https://www.commonsensemedia.org/app-reviews/toca-hair-salon-4),
[App Store](https://apps.apple.com/us/app/toca-boca-hair-salon-4/id1485387513)).

Sago Mini is deliberately small: Babies Dress Up has **4 characters and "dozens of costumes"
yielding "hundreds of combinations"**, explicitly no-rules and no-fail
([sagomini.com](https://sagomini.com/article/babies-dress-up-letters-to-parents/)).
Combinability plus in-character reactions is the entire variety engine.

**Toca Boca World's Outfit Designer (26 Nov 2024)** is the most relevant single change in this
whole survey: it moved outfits from **atomic whole-body swaps to per-slot mixing** — shirts,
pants, skirts, coats, socks, jewellery, bags — with up to 30 saved outfits, authored separately
for tall, short and toddler body types
([Toca Life World Wiki](https://toca-life-world.fandom.com/wiki/Outfit_Designer),
[Toca Boca Help Center](https://tocaboca.helpshift.com/hc/en/3-toca-boca-world/faq/241-introducing-outfit-designer-your-new-tool-to-style-outfits/)).
We already have the slot architecture Toca had to retrofit. That is our structural advantage
and we are currently wasting it by filling the slots with near-identical shapes.

### A.7 Where perceived richness actually comes from

Ranked by strength of evidence across the systems above:

1. **Combinability (slot count) dominates.** Variety is multiplicative. Champions Online runs
   **28 costume categories**
   ([Game Developer](https://www.gamedeveloper.com/design/costume-customization-7-stylish-games-that-designers-should-study));
   Gacha's split front/back hair, Sims 4's separate glasses/necklace/earrings/gloves/socks
   slots, and Toca's Outfit Designer are all the same lever.
2. **Recolour is the cheapest multiplier and players discount it.** ACNH's measured ~4–6
   recolours per unique base is the cleanest number available. Cheap, necessary, and *not* a
   substitute for shape.
3. **Surface pattern substitutes for silhouette only when the silhouette is deliberately
   neutral** and the surface is high-bandwidth. ACNH is the proof case — and it needed
   per-panel UV mapping plus a community design editor to pull it off.
4. **Silhouette variety is the expensive one, and it is what caps a system.** Miis (one body)
   and ACNH (six top shapes) hit the same ceiling and both compensate elsewhere.
5. **Art-direction coherence converts quantity into perceived quality.** Without a controlled
   palette, more items reads as noise.

**⚠ Explicitly not found.** There is **no published rule of thumb** for how many distinct
garment silhouettes a wardrobe needs before it feels repetitive. I searched for one directly.
[designthegame.com's avatar-customization tutorial](https://www.designthegame.com/learning/tutorial/designing-identity-mechanics-avatar-customization-systems)
discusses combinatorial complexity but gives no numbers. Victoria Tran's GDC/GCAP 2019 talk
[*Why Fashion in (Most) Games Sucks, and Why You Should Care*](https://www.gdcvault.com/play/1025774/Why-Fashion-in-(Most)-Games)
([video](https://www.youtube.com/watch?v=Pr7rzcwOz_g)) argues fashion is an information channel
and criticises "information-poor" wardrobes, but is about semantics, not counts.

**My reasoned estimate, clearly labelled as such:** the observable industry pattern is roughly
**6–15 distinct silhouettes per body region**, treated as sufficient *when* paired with rich
surface treatment, free recolour and 8+ independent slots. We have 13 slots and free recolour,
so we should target the **upper half of that band — 12–16 genuinely distinct silhouettes per
garment slot** — and spend the rest of the budget on surface treatment rather than on more
shapes. That number is an inference from the counts in A.2–A.5, not a sourced guideline.

### A.8 Inclusive design — hair, head coverings, disability, gender

#### A.8.1 Hair texture — the most-criticised area in the whole category

**Do not build a 1a–4c ladder into the UI.** The Andre Walker typing system (1a straight → 4c
"almost no visible defined kink pattern") was created in the 1990s to market a product line and
is widely criticised for implying a hierarchy "which values Caucasian hair over other hair
types", for ignoring density, porosity and strand diameter, and for oversimplifying types 3–4
([Wikipedia](https://en.wikipedia.org/wiki/Andre_Walker_Hair_Typing_System),
[CurlsBot](https://www.curlsbot.com/blog/the-science-of-hair-typing),
[BlackHairSpot](https://blackhairspot.com/blog/hair-talk/andre-walker-hair-types/)).
Alternatives exist (L.O.I.S., FIA) explicitly built "to remove any negative undertones… compared
to numbered systems" ([L.O.I.S.](https://blackhairspot.com/blog/hair-talk/lois-hair-typing/)).
**Ship named silhouettes, not a numbered ladder.** Our family-name system already does this.

**The style vocabulary, with the distinctions an artist needs.** Confirmed named styles across
sources: afro, afro puffs, afro-puff ponytails, braid-outs, wash-n-gos, two-strand twists, flat
twists, sponge twists, Bantu knots, box braids, knotless box braids, cornrows, locs (free and
retwisted), faux locs, crochet locs, curly bobs, updos, frohawks, fades, tapers, twist-outs
([Pattern Beauty](https://patternbeauty.com/blogs/news/protective-hairstyles-101),
[Carol's Daughter](https://carolsdaughter.com/blogs/beauty-blog/your-guide-to-protective-hairstyles-for-natural-hair),
[Wikipedia: Protective hairstyle](https://en.wikipedia.org/wiki/Protective_hairstyle)).
Distinctions that change the drawing:

- **Box braids** are knotted at the root; **knotless braids** feed hair in down the shaft, so the
  root reads flat and the fall is softer.
- **Cornrows** are three-strand and flat to the scalp; **flat twists** are the two-strand flat
  equivalent.
- **Bantu knots** are sectioned twist-and-wrap spirals, originating with the Zulu people
  ([Wikipedia: Box braids](https://en.wikipedia.org/wiki/Box_braids)).

**The industry's documented failure modes — this is the checklist to draw against.**
Dove and A.M. Darke's **Open Source Afro Hair Library** produced **Code My Crown**, "the world's
first complete and free guide for coding textured hair and protective styles in video games" —
15 original sculpts with step-by-step instructions and cultural context. It names the failures
explicitly: **"matted Cornrows, bald patches instead of parts, giant disco 'Fros, and messy,
Unstyled Locs."** Supporting data: **85% of Black gamers say games misrepresent textured hair**;
74% of developers want to learn to code it; 8 in 10 gamers have felt excluded by hair portrayals
([Game Developer](https://www.gamedeveloper.com/business/code-my-crown-guide-released-for-black-hairstyles-in-games),
[PR Newswire](https://www.prnewswire.com/news-releases/dove-and-open-source-afro-hair-library-launch-code-my-crown-the-worlds-first-complete-and-free-guide-for-coding-textured-hair-and-protective-styles-in-video-games-301988181.html),
[The Grio](https://thegrio.com/2023/11/17/85-of-black-gamers-think-video-games-lack-accurate-representation-dove-is-helping-to-change-that/)).
The Library itself hosts 70+ free 3D models, several with wheelchair variants, under a custom
BOSS licence ([afrohairlibrary.org](https://afrohairlibrary.org/models/),
[licence](https://afrohairlibrary.org/license/)). *We cannot use the models — they are 3D and
under their own licence — but* ***Code My Crown is the reference an agent drawing `locs`,
`cornrows` or `afro` should read first.***

**Criticised and praised, for calibration.**
- *Elden Ring* — The Verge's Ash Parrish: unprecedented facial control "but only has one kinky
  hair option… an afro — and an ugly one at that"
  ([coverage](https://www.resetera.com/threads/the-verge-elden-rings-character-creator-fails-black-players.556963/) —
  *original Verge URL did not resolve*).
- *The Sims 4* — the community complaint that the afro "was based on cauliflower"
  ([CBC The Current](https://www.cbc.ca/radio/thecurrent/the-current-for-oct-19-2020-1.5767530/fed-up-with-afros-based-on-cauliflower-black-players-of-the-sims-eager-for-better-representation-1.5767896));
  the 2017 update's curls judged "not quite right… perfectly spherical"
  ([Kotaku](https://kotaku.com/sims-4-update-makes-it-easier-to-have-black-sims-but-t-1822803395)).
  It took until Dec 2020 for 100+ skin tones with HSV sliders, after campaigning by Xmiramira
  and EbonixSims ([PC Gamer](https://www.pcgamer.com/the-sims-4-adds-over-100-new-skin-tones-and-sliders/)),
  and 2024 for the Ebonix × Dark & Lovely "Play in Color" collaboration
  ([EA](https://www.ea.com/games/the-sims/the-sims-4/news/the-sims-dark-and-lovely)).
- *Monster Hunter World* added no Black hairstyles until ~2 years post-launch
  ([Vice](https://www.vice.com/en/article/black-hair-in-video-games/)).
- *Baldur's Gate 3* — mixed: some good locs, but "foundational understanding of Black hair"
  missing at the loc roots and in short styles
  ([The Mary Sue](https://www.themarysue.com/baldurs-gate-3-fizzled-out-on-black-hair/)).
- *Hogwarts Legacy* praised for Black hair options (same source).
- *ACNH* — the 2.0 update added braids, curls, buns, afros and afro puffs; reaction was largely
  positive ([Nylon](https://www.nylon.com/beauty/animal-crossing-new-horizons-is-finally-introducing-textured-hair-in-new-winter-update)).
  **But non-Black players calling the afro-puff style "space buns" caused real offence**
  ([Sportskeeda](https://www.sportskeeda.com/esports/animal-crossing-new-horizons-space-bun-controversy-explained)).
  **Naming rule for us: name a style from its actual cultural origin, never from a lookalike.**

**⚠ Could not verify** as documented *game-industry representation gaps*: 360 waves, high-top
fade, halo braid, wolf cut, shag, undercut, man-bun. They are real barber and salon styles; I
found no reporting tying them to character-creator criticism. They are in the proposal on
designer judgement.

#### A.8.2 Head coverings as everyday clothing

**Taxonomy, and the layering fact that matters**
([Wikipedia: Types of hijab](https://en.wikipedia.org/wiki/Types_of_hijab)):

- *Hair and neck covered, face exposed* — **hijab** (hair, neck, ears), **shayla** (long
  rectangular scarf wrapped and tucked at the shoulders), **al-amira** (two-piece: fitted cap
  plus tube scarf), **khimar** (circular with a face hole, falling to the waist).
- *Face-covering* — **niqab**, **bushiyya**. *(Out of scope for us: they conflict with the face
  slot and with a kids' character builder's need to show expression.)*
- *Body garments* — **abaya**, **jilbab**, **chador**. These belong in `onepiece`, not `headwear`.

The operative split for a layered renderer is **occluding vs stacking**: hijab, khimar, shayla,
turban, gele, tichel and bonnet **replace or fully occlude** the hair; kufi/taqiyah, kippah,
patka, tam, durag and half-headwraps **sit on top of** an unmodified hair silhouette. This maps
directly onto our engine — see C.7.1.

**Shipped precedent.** *The Sims 4*'s Sept 2019 fifth-anniversary free update is the clearest:
a **hijab** for feminine Sims, explicitly **"separate from female Sims' outfits"** and
mix-and-matchable with any other item, plus a knitted **kufi** and a high-collared shirt for
masculine Sims, made with a fashion consultant
([PCGamesN](https://www.pcgamesn.com/the-sims-4/fifth-birthday-update),
[SimsVIP](https://simsvip.com/2019/09/03/the-sims-4-new-muslim-inspired-content-coming-soon/)).
*FIFA 23* Title Update 16 (Aug 2023) shipped its first hijab-wearing player model, Morocco's
Nouhaïla Benzina ([VGC](https://www.videogameschronicle.com/news/fifa-23-adds-its-first-ever-hijab-wearing-player/)).
Osama Dorias' design guidance in Game Developer is the practical version: *"a Muslim can look
like anyone"*, include hijabs and khimars, and consult rather than guess
([Game Developer](https://www.gamedeveloper.com/design/how-and-why-you-should-better-represent-muslims-in-your-games)).

**⚠ Could not verify any mainstream first-party creator shipping Sikh dastar/pagri or a boy's
patka, kippah/yarmulke, tichel/mitpachat, gele/dhuku, dupatta, or a Rasta tam.** Sikh turban
assets exist only as fan-made Sims 4 content. **This is a documented, unfilled gap across the
whole category** — cheap for us to fill, and a genuine differentiator.

#### A.8.3 Disability, medical and skin representation

*The Sims 4*, all as free base-game updates: **hearing aids** for toddlers and up, **15 colour
variants**, assignable per ear or both, filed under a **"medical wearables"** tab; **glucose
monitors**; **binders and shapewear**; a **Body Scars** category including **top surgery scars**
([PCGamesN](https://www.pcgamesn.com/the-sims-4/update-top-surgery-shapewear-hearing-aids),
[Kotaku](https://kotaku.com/sims-4-update-console-pc-trans-inclusive-top-surgery-1850056313)).
**Vitiligo (Feb 2024): 61 variants** across face, torso, arms and legs, any skin tone, any age,
built with model Winnie Harlow
([CNN](https://www.cnn.com/2024/02/14/entertainment/sims-4-vitiligo-skin-cec/index.html)).
**⚠ Still no official wheelchairs, prosthetics, canes or crutches in The Sims 4** as far as I
could confirm; mods fill the gap ([Can I Play That](https://caniplaythat.com/2021/06/03/that-isnt-mii/)).

*Xbox Avatar Editor* is repeatedly cited as best-in-class: limb **casts**, **prosthetic arms and
legs**, **colour-customisable wheelchairs**
([CBC](https://www.cbc.ca/news/opinion/xbox-live-avatars-redesign-accessibility-1.4180249)).
*Apple Memoji* (iOS 15, Global Accessibility Awareness Day) added **cochlear implants, oxygen
tubes and a soft helmet**
([Apple Newsroom](https://www.apple.com/newsroom/2021/05/apple-previews-powerful-software-updates-designed-for-people-with-disabilities/)).
*Snapchat Bitmoji* (2022) shipped the "three most requested assistive devices" — **canes,
hearing aids and wheelchairs** — hearing aids in multiple colours, one ear or both, built with
**Disability:IN** and device users
([Snap Newsroom](https://newsroom.snap.com/bitmoji-broadens-representation)). *Meta avatars*
added cochlear implants and over-ear hearing aids.

**The negative examples define the bar.** *Miitopia / Mii Maker* has no wheelchair, prosthetics
or mobility aids at all. *ACNH* has a wheelchair **only as furniture the character cannot use**,
which Can I Play That calls tokenism (same source). **A mobility aid that is scenery rather than
something you wear is the documented failure mode** — which is why C.7.6 flags the honest cost
instead of proposing a prop-only shortcut as a solution.

Academic grounding: Mack et al., *Towards Inclusive Avatars: Disability Representation in Avatar
Platforms*, CHI 2023 — 18 disabled, chronically ill, neurodiverse and/or fat participants;
people want to represent disability **when the context feels safe**, use avatars to signal
access needs, and find options "limited or fully missing" on popular platforms
([ACM](https://dl.acm.org/doi/10.1145/3544548.3581481), [arXiv](https://arxiv.org/abs/2302.01880)).
AbleGamers' framing on tokenism: disabled characters are "often relegated to harmful stereotypes
or token roles", and authentic work means hiring disabled developers and artists
([AbleGamers](https://ablegamers.org/video-games-disability-representation/)). Overwatch's Pharah
is the cited example of matter-of-fact done right — her prosthetics' origin is simply never
explained.

**⚠ Could not verify in any first-party creator:** insulin pumps as such (only Sims' glucose
monitors and Toca's CGM), ostomy bags, feeding tubes, port scars, port-wine stains, alopecia,
Down syndrome facial features, blade prostheses, walkers, eye patches. All are legitimate gaps.

#### A.8.4 Gender-expansive wardrobe design

The three canonical precedents all point the same way:

- **The Sims 4, June 2016** — lifted masculine/feminine restrictions on **~700 items**, split
  identity into four independent axes (Physical Frame, Clothing Preference, Pregnancy, Toilet
  Use), and added a global toggle to turn the masculine/feminine filter off entirely
  ([SimsVIP](https://simsvip.com/2016/06/03/the-sims-4-gender-identity-same-sex-pregnancy-unisex-clothing/),
  [Engadget](https://www.engadget.com/2016-06-02-sims-4-gender-neutral-update.html)).
- **ACNH** — no gender gate at all; all hairstyles and facial parts are free and changeable at
  any time; **tops, bottoms and dresses became separate categories** so any body can wear any
  combination; the English text replaces "gender" with **"style"**
  ([Nintendo Wire](https://nintendowire.com/news/2019/06/12/animal-crossing-new-horizons-to-feature-full-character-customization-including-skin-tones-gender-neutral-hairstyles/),
  [AIPT](https://aiptcomics.com/2020/03/26/animal-crossing-new-horizons-non-binary-genderqueer-gender-options/)).
- **Toca Boca** — no gender step, no locked combinations (A.1).

The broader pattern the design community recommends is **decoupling the axes**: identity label,
body frame, voice, pronouns and wardrobe each independent. Baldur's Gate 3, Harvestella,
Wildermyth and Stardew Valley are the commonly-cited examples
([Game Rant](https://gamerant.com/nonbinary-friendly-character-creation-games/),
[The Gamer](https://www.thegamer.com/non-binary-character-options-in-games/)).

**⚠ Could not verify** a formal published wardrobe-design guideline from a named LGBTQ+
game-design organisation (GLAAD Gaming, IGDA LGBTQ+ SIG, Queerly Represent Me). The LGBTQ Video
Game Archive documents cases but issues no design specs. The practice above is inferred from
shipped titles and journalism, and I have labelled it as such in C.1.

#### A.8.5 The five rules that fall out of A.8

1. **Name assets by cultural origin, never by a lookalike label** (the "space buns" incident).
2. **Two kinds of head covering — occluding and stacking** — and head coverings are ordinary
   wardrobe, decoupled from outfits, exactly as the Sims 4 did in 2019.
3. **Put assistive devices in the main cosmetic flow, high in the list, with colour variants.**
   That is the operational definition of matter-of-fact inclusion, and it is what Xbox, Snap,
   Apple and Toca all did.
4. **No gendered aisles.** Separate tops/bottoms/dresses/shoes; one shared pool; style-not-gender
   labelling.
5. **Draw the roots and the parts.** The single most-cited textured-hair failure is not the
   overall shape — it is matted cornrows, missing partings and bald patches where a part should
   be. See D.6.

### A.9 Age-appropriate differentiation

**Newborn.** Retail taxonomy is the authority here, and it is strikingly one-piece-dominated:
*Babygrows & Sleepsuits; Bodysuits & Vests; Coats, Jackets & Pramsuits; Rompers & Dungarees;
Sets & Co-Ords; Socks & Tights; Bibs; Hats & Scratch Mitts*
([Next UK baby clothing](https://www.next.us/en/shop/baby/clothing)). Definitions
([The Mummy Bubble](https://themummybubble.co.uk/types-of-baby-clothes/)):

- **Bodysuit / vest / (US) onesie** — top with no legs, fastening over the nappy with a snap gusset.
- **Babygrow / sleepsuit / footie** — all-in-one with long sleeves and legs, usually footed.
- **Romper** — one-piece with open feet and hands.
- **Pramsuit / snowsuit** — one-piece cold-weather outfit.
- **Scratch mitts** — soft mittens, often built into sleepsuit cuffs.
- **Bloomers** — summer shorts covering the nappy.

Sleepwear has a safety rationale worth honouring in the art: the AAP prefers *"infant sleep
clothing, such as a wearable blanket or sleep sack"* over loose blankets, and swaddling should
stop once a baby rolls
([AAP](https://publications.aap.org/aapnews/news/20619/New-safe-sleep-recommendations-can-help),
[Consumer Reports](https://www.consumerreports.org/babies-kids/child-safety/swaddle-sleep-sack-safety-a9438047450/)).
Draw sleep sacks and swaddles; do not draw a baby under a loose blanket.
**⚠ Knotted gowns could not be verified in any source I reached** — I have kept `knot-gown` in
the proposal because it is a real and common garment, but flag it as unsourced here.

**Toddler.** The evidence base for "no belts, no zips, no laces" is developmental, not
fashion: ages 2–3 manage elastic-waist pull-ons; 3–5 need large fasteners (Velcro, elastic);
4–5 handle large front buttons and zips; small buttons, laces and belts often not until ~7
([CHOC developmental dressing skills, PDF](https://choc.org/wp-content/uploads/2014/11/Rehab-Developmental-dressing-skills.pdf),
[progression of dressing skills](https://connecticutoccupationaltherapist.com/progression-of-dressing-skills/)).
Distinct toddler retail categories: dungarees & rompers, pull-on shorts, layering leggings, and
— a genuinely separate UK category — **puddle suits, waterproofs and wellies**
([Muddy Puddles](https://muddypuddles.com/en-us),
[Mamas & Papas](https://www.mamasandpapas.com/collections/dungarees-rompers)).

**Teen.** Sourced trend vocabulary: baggy **cargo pants** with multiple pockets, baggy jeans
displacing skinny, **oversized tees** in bold print, **cropped tees and crop tops**, low-rise,
chunky sneakers, tie-dye
([The Teen Magazine](https://www.theteenmagazine.com/the-evolution-of-teen-fashion-from-y2k-to-tiktok-trends),
[Printful Y2K](https://www.printful.com/blog/y2k-fashion)).
**⚠ Band tees, hoodies, school uniform and sports kit are designer judgement, not sourced** —
I found no source enumerating them as a teen-specific retail category, though all are obviously
real.

**Adult / occupational.** Uniform-industry taxonomy: corporate polos and blazers; healthcare
**scrubs** and **lab coats**; hospitality **chef whites, waistcoats, aprons**; retail branded
polos, aprons and smocks; industrial **coveralls** and **hi-vis vests with reflective tape**
([Apparel Bus: types of uniforms](https://www.apparelbus.com/blog/types-of-uniforms),
[types of workwear](https://www.apparelbus.com/blog/types-of-workwear),
[UniFirst](https://unifirst.com/uniforms-workwear/)).

**Elder.** Two distinct streams, and they are not the same thing:

1. **Adaptive clothing** — a real garment category with real silhouettes: front-opening
   **dusters**, **back-wrap tops**, **open-back tops and dresses** with snaps placed off the
   spine, **side-zip trousers** with full-length side-seam zips, magnetic hidden fasteners
   replacing buttons, Velcro closures on footwear, non-slip shoes
   ([Silverts](https://www.silverts.com/), [Buck & Buck](https://www.buckandbuck.com/pages/general-adaptive-clothing),
   [Ovidis](https://ovidis.com/)).
2. **Comfort and hobby signalling** — the Golden Years list in A.2 (bonnet, glasses chain,
   gardening gloves, hobby outfits, cane).

**⚠ Waistcoats, pleated skirts, shawls, flat caps, bucket hats and gilets as elder markers are
my inference, not sourced.** They are in the proposal because they read instantly as "older" in
a stylised silhouette, which is what matters for us — but do not cite them as research.

### A.10 Costume archetypes and the IP line

**The legal frame.** Costumes are *useful articles*. Under *Star Athletica v. Varsity Brands* a
design feature is protectable only if it can be perceived as a work of art separate from the
useful article **and** would qualify as a protectable pictorial/graphic/sculptural work
([Columbia Journal of Law & the Arts](https://journals.library.columbia.edu/index.php/lawandarts/announcement/view/244),
[IPWatchdog](https://ipwatchdog.com/2018/07/18/costumes-copyrights-can-you-afford-to-wear-that/id=99278/),
[Osgoode IP](https://www.yorku.ca/osgoode/iposgoode/2020/10/28/forget-ghosts-goblins-and-ghouls-watch-out-for-patents-copyrights-and-trademarks-this-halloween/)).

**What makes a costume safely generic.** Simple animal suits and stock themes (witch, pumpkin,
skeleton) are generally not protectable — they are common concepts, and a child's pumpkin-torso
costume was held to be a useful article, i.e. just clothing. Risk attaches to (a) close
resemblance to a *specific* character from a copyrighted work, and (b) **trademark** — logos,
emblems, slogans, character names, or branding suggesting official licensing
([Foley Hoag](https://foleyhoag.com/news-and-insights/blogs/making-your-mark-blog/2017/october/halloween-costumes-and-copyright-5-things-you-should-know/),
[MMR Strategy](https://mmrstrategy.com/trademarks-and-halloween-costumes/)).

Mass-market retail practice confirms the naming strategy: Spirit Halloween sells
character-adjacent costumes under deliberately descriptive generic names — "Sidekick Bros.",
"Juice Demon", "Misfit Hipster", "Deep Sea Siren"
([NBC News](https://www.nbcnews.com/pop-culture/viral/fake-spirit-halloween-costumes-meme-parodies-pop-culture-knock-offs-rcna54168)).

**Rule for our catalog:** name by archetype and silhouette, never by character; no emblems, no
logos, and **no signature colour-plus-marking combination** — a red-and-blue suit with a web
pattern is a character reference even with a generic name on it. See B.6.

**Verified-generic animal archetypes** (each is a standing retail category, therefore safely
generic): bee, bird, bunny, butterfly, cat, chicken, cow, dinosaur, dog, dolphin, dragon, duck,
elephant, fish, frog, giraffe, horse, insect, ladybug, lion, monkey, mouse, octopus, owl, panda,
penguin, pig, reindeer, shark, sloth, turtle, unicorn, zebra
([FindCostume](https://findcostume.com/animal-costumes/),
[Wonder Costumes](https://www.wondercostumes.com/animal-costumes-ctacni.html),
[HalloweenCostumes.com](https://www.halloweencostumes.com/kids-animal-bug-costumes.html)).

**Verified occupational dress-up archetypes:** police, firefighter, doctor, nurse, vet,
construction worker, astronaut, chef, baker, server, pilot, farmer, scientist, judge, racer,
postal carrier, zookeeper, marine biologist, explorer, builder, cowboy, pirate
([HalloweenCostumes career day](https://www.halloweencostumes.com/career-day-costumes.html),
[Discount School Supply](https://www.discountschoolsupply.com/theme/career-costume)).
**⚠ Mechanic, sailor, gardener and artist-smock were not in the enumerated retail sets I
found** — plausible, unverified.

**Highest residual risk in the usual list:** the generic caped superhero (a chest emblem is
trademark exposure — keep the cape, draw no insignia) and the mermaid (fine as an archetype;
avoid the specific hair-colour + shell + name combination).

### A.11 Cultural and traditional dress

**Verified garment names with attribution**
([Ordnur](https://ordnur.com/apparel/traditional-clothes/),
[Google Arts & Culture](https://artsandculture.google.com/story/explore-traditional-clothing-from-around-the-world/1AXRnpTzzdkwJw),
[Fodor's](https://www.fodors.com/news/photos/13-traditional-national-costumes-from-around-the-world)):
sari, kurta, dhoti, salwar kameez, lehenga (South Asia); hanbok, kimono, yukata, hanfu, qipao,
áo dài (East/SE Asia); dashiki, agbada, boubou, kaftan (Africa); thobe, kandura, abaya
(Middle East); kilt, dirndl, lederhosen (Europe); poncho, huipil (Latin America).

**Doing it respectfully.** The
[Geena Davis Institute Playbook for Inclusive Game Design](https://geenadavisinstitute.org/research/the-gdi-playbook-for-inclusive-game-design/)
and [IGDA's Inclusive Game Design and Development](https://igda-website.s3.us-east-2.amazonaws.com/wp-content/uploads/2021/12/08124833/Inclusive-Game-Design-and-Development.pdf)
both make the same core recommendation: **any cultural reference or inspiration should be
reviewed by an expert of that culture before it ships.** Player-demand data supports the effort
— roughly half of players want more diverse characters and 45% have avoided a game they felt
was not made for them ([Axios](https://www.axios.com/2021/06/08/video-games-character-creators-diversity)).

The strongest precedent is the Sims 4 **Fashion Street Kit** (Oct 2021), co-created with Mumbai
fashion expert Shruti Sitara Singh, where the wrap skirt was modelled directly on how Koli
fishing-community women wear their saris
([EA](https://www.ea.com/games/the-sims/news/fashion-street-kit)). The failure mode is treating
identity as a costume — the "my culture is not a costume" material is explicit that skin
darkening, wig-based caricature and sacred regalia (e.g. war bonnets) are out of bounds
([Baylor](https://studentlife.web.baylor.edu/my-culture-not-costume),
[WVU](https://libguides.wvu.edu/Halloween/costumes)).

**Recommendation:** keep cultural dress in the **ordinary garment slots** (`top`, `onepiece`),
*never* in `costume`. Name garments by their correct endonym. Draw only everyday, widely-worn
garments — kurta, kaftan, thobe-style robe — and no ceremonial or sacred regalia. Anything
beyond that short list should be gated on a cultural-consultant review, and I have deliberately
kept the v1 proposal narrow for that reason.

---

## B. Diagnosis of our current catalog

### B.1 The headline problem: 8 tops, 3 silhouettes

This is measured, not asserted. In `src/assets/catalog/adult/female/top/`, **six of the eight
tops draw the identical torso path**:

```
M136 180 q0-32 34-32 h60 q34 0 34 32 v104 q0 34 -34 34 h-60 q-34 0 -34-34 z
```

`tee`, `hoodie`, `button-up`, `stripes`, `jersey` use that exact string; `sweater` uses
`M132 182 … 36 …`, which is the same rounded rectangle inflated by 4px. Sleeves are one of
three rectangles at identical coordinates: `height="68"` (tee), `height="74"` (jersey),
`height="158"/"160"` (hoodie, button-up, stripes, sweater). Only `tank` (straps) and
`overalls-top` (bib) have a different outline.

So the eight tops resolve to **three silhouettes**: *torso-block-with-sleeves*, *strappy tank*,
*bib*. Everything else is colour, a clip-path stripe, or a small applied detail. A player
scrolling the tray sees eight swatches of one shirt. **That is the entire reason the app reads
as bland**, and no amount of additional families in the same shape will fix it.

Bottoms are marginally better: six leg-tube variants (`jeans`, `joggers`, `leggings`, `cargo`,
`shorts`, `dungarees`) and two skirts (`skirt`, `pleated`) — **two silhouettes**, differentiated
by leg length and width.

Set against A.7: the industry pattern is 6–15 distinct silhouettes per body region. We have 3.

### B.2 `stripes` is the tell

`stripes` is a family in the `top` slot whose entire identity is a surface treatment applied to
the `tee` shape. It is not a garment; it is a texture that has been promoted to a garment
because the system had no other way to express "this shirt looks different". Every other top
carries at most one such detail. The correct model is the inverse: **silhouette defines the
family, surface treatment differentiates instances within it** — which is exactly what section
D specifies.

I am not proposing to delete `stripes` (it is authored in all 12 bundles and the family key is
load-bearing for stage switching). I am proposing that no new family is ever defined by its
pattern.

### B.3 One shared family list across twelve very different bodies

`docs/FAMILIES.md` applies one list to all twelve bundles. Consequences visible today:

- `adult/male` had to author `skirt` and `party-dress`.
- `newborn/female` had to author `button-up` — a collared, buttoned, cuffed shirt on a
  four-week-old.
- Newborns get `jeans`, `cargo` and `dress-shoes`, and get **no** sleepsuit, swaddle, sleep
  sack, bodysuit, nappy or booties — i.e. the entire actual newborn wardrobe is missing while
  the entire adult wardrobe is present.
- Elders get no cardigan, no comfort shoe, no adaptive garment.
- Every bundle authors exactly 10 hairstyles, so a teen has as few options as a newborn.

**But note the tension.** The brief calls `adult/male` authoring `skirt` a symptom. It is also
the one part of the current design that matches how the well-regarded creators actually work:
the Sims 4 unlocked ~700 items across frames (A.2), ACNH removed gendered clothing, and Toca
Boca ships no boy/girl aisle (A.1). **Keeping skirts and dresses on the male body is correct and
should be preserved.** The real defect is not that `adult/male` has a skirt; it is that
`newborn/male` has a skirt *and no sleepsuit*. The fix is stage differentiation, not gender
segregation — see the guardrail in C.1.

### B.4 The colour system is half-wired, and this is nearly free to fix

`src/ui/studio/StudioScreen.tsx:56` and `OptionTray.tsx:67` both read `asset.colors[0]` only.
The swatch row therefore exposes **one variable per asset**. A `jersey` declaring `c1,c2,c3`
lets the player change the body colour but never the number panel or the trim; `stripes` lets
you change the base but not the stripe.

Per A.7, recolour is the cheapest variety multiplier in the industry and ACNH gets ~4–6× out of
it. We are currently getting roughly 1×. **Exposing every declared variable in the swatch row is
the single highest-value-per-engineering-hour change available**, and it multiplies the entire
proposed catalog rather than adding to it. It is a UI change in two files, not an art change.

### B.5 Slot coverage gaps

Present: `eyes brows mouth hair top bottom onepiece shoes glasses headwear earrings necklace
costume` (`src/catalog/types.ts:16`). Missing, relative to what inclusive creators ship:
facial hair, face markings (freckles, vitiligo, birthmarks), mobility aids, and any
outerwear/layering slot. Section C.7 covers what fits into existing slots (more than you would
expect) and what genuinely needs engineering.

### B.6 An existing IP risk that should be fixed regardless of this proposal

Two costume families read as specific copyrighted characters despite generic display names:

| Family | `data-name` | Default palette |
|---|---|---|
| `spider` | "Web Runner Suit" | `--c1` red `#C4534B`, `--c3` dark navy `#23273A`, web pattern |
| `thunder-god` | "Storm Herald" | `--c1` red `#C0584F`, `--c2` blue `#4A5AA8` |

Per A.10, a generic name does not cure a signature colour-plus-marking combination, and the
*family keys themselves* (`spider`, `thunder-god`) are the clearest evidence of intent — they
appear in filenames, in `data-family`, and in any future export.

**Recommendation:** rename the families to match the already-generic display names
(`web-runner`, `storm-herald`) and re-key the default palettes away from the red/blue signature
— e.g. `web-runner` in teal and charcoal with a geometric lattice rather than a web. Renaming a
family is a file rename plus a `data-family` edit across 12 files; the palette change is a
default-value edit. Neither requires redrawing. This is cheap and should not wait for the
expansion.

### B.7 Authoring rules that bite — read before you draw

These are consequences of the existing engine that constrain everything in section C.

- **Costumes may not cover the face.** `costume` is z 80, above `face` (60) and `hair-front`
  (70). Costume art must stay below the bundle's shoulder line minus 8px. **Animal costumes
  therefore cannot have hoods in the `costume` slot** — the hood must be a `headwear` asset
  (z 100). C.6 exploits this.
- **`headwear` is authored per head-size class** (`toddler`, `teen`, `adult`), not per bundle,
  and is mapped onto the target head by a uniform circle-to-circle transform
  (`src/render/composition.ts:33`). Anything that drapes past the head — a long hijab, a
  shoulder-length headwrap tail — will scale by the *head* ratio, not the *shoulder* ratio, and
  will land wrong on bundles whose head-to-torso proportion differs most (newborn, toddler).
  **Keep head-mounted art within about 1.3 head radii of the head centre.**
- **`headwear` draws above `hair-front` but not above `hair-back`.** A hijab or bonnet will
  correctly cover the fringe and still have the back hair sticking out from behind the
  shoulders. See C.7 for the one-line fix.
- **`bottom` draws under `top`; `shoes` draw over trouser hems.** Never draw a foot into a
  bottom asset.
- **Long `hair-front` covers shoulder and upper-chest garment art.** Do not put a garment's
  only distinguishing detail on the collarbone.
- **Hair `<defs>` must live inside `<g data-part="back">` / `<g data-part="front">`**, not at
  the file root — the parser discards root-level defs on hair assets and the hair renders
  unpainted. This is the most expensive trap in the project.
- **`<pattern>`, `<clipPath>`, `<mask>` and gradients are all permitted.** `src/catalog/lint.ts`
  bans only `<filter>`, `filter=`, `<image>` and external hrefs. Every internal `id` must be
  prefixed with the asset id — this includes pattern ids.

---

## C. Proposed family list

### C.0 How the tiers work, and what they cost

| Tier | Authored in | Files per family |
|---|---|---|
| **Core** | all 12 bundles | 12 |
| **Growing set** — toddler → elder | 10 bundles | 10 |
| **Older set** — teen → elder | 8 bundles | 8 |
| **Feminine-leaning** | female, toddler → elder | 5 |
| **Masculine-leaning** | male, toddler → elder | 5 |
| **Stage-specific** | the named stages, both body types | 2 per stage |
| **Accessory** | 3 head-size classes | 3 |

`data-family` resolution already degrades gracefully: on a stage switch, a family with no
counterpart in the target bundle falls back to the first asset in the slot, and colours always
survive (design spec §5.3). So a non-core family is safe — the character simply changes garment
rather than becoming a stranger. **Core is the common spine, not a correctness requirement.**

The Growing/Older tiers are drawn straight from A.2: the Sims 4's real asset boundaries are
Infant | Toddler | Child | Teen-and-up. A newborn does not need a blazer, and pretending
otherwise is what produced `newborn/female/top/button-up.svg`.

### C.1 Guardrail: the leaning sets are a *fitting* split, never a *labelling* split

Every source in A.1, A.2 and A.8.4 points the same way. Toca Boca has **no gender step and no
locked combinations** — the creator opens on a silhouette, not a default character. ACNH has no
gender gate and its English text replaces the word "gender" with **"style"**. The Sims 4 unlocked
~700 items across frames in 2016 and added a switch to turn the masculine/feminine filter off
entirely. Our art is already authored per body type, so "feminine-leaning" here means **only**
"this cut is drawn to the female body spec". It must not become a UI category.

Three rules follow, and they are not optional:

1. **The UI never groups or labels options by gender.** The tray shows every asset in the slot
   for the current bundle, in one list.
2. **Skirts, dresses and one-pieces stay in the Core and Growing tiers — authored on both body
   types.** `skirt`, `pleated`, `sundress`, `party-dress`, `tiered-skirt`, `maxi-skirt`,
   `pencil-skirt`, `tutu`, `shirt-dress`, `pinafore` are all authored for male bundles too.
   This is the single most visible inclusivity decision in the proposal and it is deliberate.
3. **Leaning sets are reserved for cuts that genuinely depend on the body spec** — a
   `camisole`'s bust dart, a `ribbed-vest`'s shoulder width. When in doubt, put it in Core or
   Growing and draw it twice.

### C.2 Hair — target 15 (newborn) to 26 (elder) per bundle

Hair is the largest line item in this proposal and the highest-value one: it is where
representation lives (A.8) and where players spend the most time (A.5). Every entry below is a
**silhouette**, and textures are specified because a coily silhouette is genuinely a different
outline from a straight one — this is not a surface treatment.

**Core (all 12 bundles) — 14 families.** Ten already exist; four are new.

| Family | Silhouette | Status |
|---|---|---|
| `buzz` | Skin-close all-over crop; the skull shape reads through. | exists |
| `curls` | Short tight coils cropped close, textured bumpy outline. | exists |
| `afro` | Rounded halo of dense coils, symmetrical dome wider than the head. | exists |
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

> **Naming discipline.** `pigtails` and `afro-puffs` are deliberately two separate families
> rather than one generic "bunches". Per A.8.1, calling an afro-puff style by a lookalike name
> ("space buns") caused genuine offence in ACNH. Name a style from its own origin. The same rule
> means `cornrows`, `bantu-knots`, `locs` and `box-braids` keep their own names and never become
> "braid style 3".

**Growing set (toddler → elder, 10 bundles) — 6 new families.**

| Family | Silhouette |
|---|---|
| `afro-puffs` | Two round coily puffs standing off either side of the head above the ear line. |
| `locs` | Rope-like strands of even thickness hanging free, blunt ends, visible root separation. |
| `box-braids` | Long individual braids on a visible square parting grid, knotted at the root, falling past the shoulders. |
| `high-top-fade` | Flat-topped column of dense hair over shaved sides, hard front edge. |
| `bantu-knots` | A grid of small coiled cones standing off the scalp, with clean partings between sections. |
| `twist-out` | Shoulder-length defined two-strand spirals with crown volume, no parting. |

**Feminine-leaning (female toddler → elder, 5 bundles) — 4 new families.**

| Family | Silhouette |
|---|---|
| `half-up` | Top section gathered into a small knot, the rest hanging loose. |
| `braided-crown` | A braid wrapping the hairline like a band, remainder tucked away. |
| `curtain-long` | Centre-parted with two long face-framing sweeps over a waist-length back mass. |
| `high-puff` | All hair gathered into one round coily puff standing above the crown. |

**Masculine-leaning (male toddler → elder, 5 bundles) — 5 new families.**

| Family | Silhouette |
|---|---|
| `taper-fade` | Very short sides fading up to a slightly longer flat top, sharp hairline. |
| `waves-360` | Near-shaved with concentric ripples radiating from the crown. |
| `man-bun` | Sides swept back to a small high knot, forehead exposed, a loose strand or two. |
| `mop-shag` | Chin-length choppy layers under a heavy brow-covering fringe. |
| `undercut-sweep` | Shaved sides with one long swept-over top mass falling to one side. |

**Stage-specific — 2 new families.**

| Family | Stages | Silhouette |
|---|---|---|
| `bald-fuzz` | newborn | Bare scalp with a faint halo of down at the crown and nape. |
| `soft-set` | elder | Short tightly-set curls with lift at the temples and an exposed forehead. |

**Per-bundle totals:** newborn 15 · toddler 24 (f) / 25 (m) · teen 24 / 25 · adult 24 / 25 ·
midage 24 / 25 · elder 25 / 26. **New files: 157.**

### C.3 Tops — target 9 (newborn) to 22 per bundle

Silhouette is decided by four axes: **shoulder** (set-in / raglan / dropped / strap / none),
**closure** (closed / open front / half-placket / zip), **hem** (cropped / hip / past-hip /
thigh) and **volume** (fitted / straight / boxy / flared). No two families below share all four.

**Core (all 12 bundles) — the 8 existing families, unchanged.** `tee`, `hoodie`, `stripes`,
`button-up`, `tank`, `sweater`, `jersey`, `overalls-top`. **No new files.**

**Growing set (toddler → elder, 10 bundles) — 8 new families.**

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

**Older set (teen → elder, 8 bundles) — 2 new families.**

| Family | Silhouette |
|---|---|
| `blazer` | Structured square shoulders, notched lapels, open front over a shell. |
| `waistcoat` | Fitted sleeveless V-front with a pointed hem and a visible button line. |

**Feminine-leaning (female toddler → elder, 5 bundles) — 4 new families.**

| Family | Silhouette |
|---|---|
| `wrap-top` | Diagonal crossover front tied at the waist, deep V, three-quarter sleeves. |
| `puff-sleeve-blouse` | Narrow body with balloon volume ballooning at the shoulder into a tight cuff. |
| `crop-top` | Hem sitting above the natural waist, midriff bare, short sleeves. |
| `camisole` | Narrow spaghetti straps, straight or scalloped neckline, skimming hem. |

**Masculine-leaning (male toddler → elder, 5 bundles) — 4 new families.**

| Family | Silhouette |
|---|---|
| `henley` | Collarless three-button placket, long sleeves pushed up at the forearm. |
| `flannel-overshirt` | Boxy unbuttoned overshirt worn open over a tee, squared hem, chest pockets. |
| `ribbed-vest` | Wide-strap athletic vest with deep dropped armholes and a ribbed surface. |
| `bomber` | Blouson jacket with ribbed collar, cuffs and hem; body gently bloused above the hem. |

**Stage-specific — 1 new family.**

| Family | Stages | Silhouette |
|---|---|---|
| `wrap-vest` | newborn | Kimono-style crossover baby vest tied at the side, no fasteners at the neck. |

**Per-bundle totals:** newborn 9 · toddler 20 · teen/adult/midage/elder 22.
**New files: 138.**

> This lands at 22 tops for the adult bundles, slightly above the brief's 18–20. I think that is
> right: tops are the most-looked-at slot, and 22 tops across 12 genuinely distinct silhouettes
> is the upper half of the 6–15 band in A.7. If the budget needs trimming, cut the Older set
> (`blazer`, `waistcoat`, 16 files) rather than the Growing set.

### C.4 Bottoms — target 10 (newborn) to 18 per bundle

**No gendered tier here, deliberately** (see C.1). Skirts are exactly the place where a rigid
aisle would show, so every skirt is authored on both body types.

**Core (all 12 bundles) — the 8 existing families, unchanged.** `jeans`, `shorts`, `skirt`,
`joggers`, `cargo`, `leggings`, `pleated`, `dungarees`. **No new files.**

**Growing set (toddler → elder, 10 bundles) — 9 new families.**

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

**Stage-specific — 3 new families.**

| Family | Stages | Silhouette |
|---|---|---|
| `tutu` | toddler, teen | Short stiff skirt standing out horizontally from the hip in two net layers. |
| `nappy` | newborn | Padded brief with side tabs, high on the hip, bulky between the legs. |
| `knit-leggings` | newborn | Soft ribbed footless leggings gathered at the ankle, no waistband detail. |

**Per-bundle totals:** newborn 10 · toddler 18 · teen 18 · adult/midage/elder 17.
**New files: 98.**

### C.5 One-pieces — target 9 (newborn) to 12 per bundle

This is where the newborn wardrobe actually lives (A.9). The current 4 families are the whole
reason a newborn looks like a shrunken adult.

**Core (all 12 bundles) — the 4 existing families, unchanged.** `sundress`, `jumpsuit`,
`party-dress`, `romper`. **No new files.**

**Growing set (toddler → elder, 10 bundles) — 6 new families.**

| Family | Silhouette |
|---|---|
| `shirt-dress` | Collared button-through dress, straight to the knee, belted at the natural waist. |
| `pinafore` | Bib-fronted sleeveless A-line dress on shoulder straps, worn over a top. |
| `swimsuit` | One-piece scoop-back swim shape, high-cut leg, no skirt or ruffle. |
| `boiler-suit` | Utility all-in-one — collar, centre zip, straight legs, tie at the waist. |
| `robe` | Wrap-front dressing gown to mid-calf, shawl collar, tie belt, wide sleeves. |
| `kaftan` | Loose T-shaped robe falling straight from the shoulder to the calf, wide sleeves, slit neckline. |

**Older set (teen → elder, 8 bundles) — 2 new families.**

| Family | Silhouette |
|---|---|
| `maxi-dress` | Narrow column from a fitted bodice straight to the ankle. |
| `wrap-dress` | Diagonal crossover bodice tied at the waist, skirt falling to the knee. |

**Stage-specific — 6 new families.**

| Family | Stages | Silhouette |
|---|---|---|
| `sleepsuit` | newborn | Footed all-in-one, full-length popper line down one leg, closed feet, cuffed wrists. |
| `swaddle` | newborn | Tapered cocoon wrapping shoulders to hem, arms enclosed, no limbs visible. |
| `bodysuit` | newborn | Short-sleeved vest with a poppered gusset visible between the legs. |
| `knot-gown` | newborn | Open-hemmed gown gathered and knotted at the bottom, no leg division. |
| `sleep-sack` | newborn | Sleeveless wearable bag, wide flat hem, armholes cut at the shoulder. |
| `puddle-suit` | toddler | Waterproof hooded all-in-one, elasticated cuffs and ankles, bloused body. |

**Per-bundle totals:** newborn 9 · toddler 11 · teen/adult/midage/elder 12.
**New files: 88.**

### C.6 Shoes, costumes, face and accessories

#### Shoes — target 6 (newborn) to 14 per bundle

Shoes are the cheapest art in the catalog — roughly the bottom 60px of a 600px canvas — so
over-indexing here is unusually good value per file.

**Core (all 12) — the 5 existing families.** `sneakers`, `boots`, `sandals`, `dress-shoes`,
`slippers`. **No new files.**

**Growing set (toddler → elder, 10 bundles) — 6 new families.**

| Family | Silhouette |
|---|---|
| `high-tops` | Sneaker with a padded collar rising above the ankle bone and a long lace ladder. |
| `wellies` | Smooth tall rubber boot to mid-calf, no laces, small pull tab at the top. |
| `mary-janes` | Round-toed flat with a single instep strap and a small buckle. |
| `clogs` | Moulded slip-on, bulbous rounded toe, ventilation holes, heel strap. |
| `flip-flops` | Flat sole with a Y-thong between the toes; the foot is otherwise bare. |
| `snow-boots` | Bulky insulated boot with a soft cuff and a chunky lugged sole. |

**Older set (teen → elder, 8 bundles) — 2 new families.**

| Family | Silhouette |
|---|---|
| `heels` | Almond toe with a raised heel column lifting the heel clearly above the toe. |
| `platform-boots` | Chunky lug-soled boot on a thick slab sole raising the whole foot. |

**Stage-specific — 2 new families.**

| Family | Stages | Silhouette |
|---|---|---|
| `booties` | newborn | Soft rounded slipper-socks gathered at the ankle, no sole definition. |
| `comfort-shoes` | elder | Wide soft-topped shoe with a broad hook-and-loop strap and a cushioned sole. |

**Per-bundle:** newborn 6 · toddler 11 · teen/adult/midage 13 · elder 14. **New files: 80.**

#### Costumes — 5 (newborn) to 13 per bundle

Remember B.7: **costume art must stay below the shoulder line minus 8px.** Creature costumes
express the creature through the *body* — tail, belly panel, dorsal ridge, wings, paw cuffs —
and the head half of the costume is authored as a matching `headwear` family (see below).

**Core (all 12) — the 5 existing families**, with `spider` → `web-runner` and `thunder-god` →
`storm-herald` renamed and re-palettised per B.6. `dino`, `caped-hero`, `astronaut` unchanged.
**No new files** (renames and default-colour edits only).

**Growing set (toddler → elder, 10 bundles) — 8 new families.** All verified-generic per A.10.

| Family | Silhouette |
|---|---|
| `dragon` | Scaled bodysuit with a ridged dorsal crest down the back and a thick tapering tail. |
| `bee` | Rounded banded body with a plush striped abdomen and two rounded wings behind the shoulders. |
| `mermaid` | Scaled tail from the waist down flaring into a fluke at the ground line; shell bodice. |
| `knight` | Plated tabard with shoulder pauldrons over a mail-look body, belted at the waist. |
| `wizard` | Full-length robe flaring from the shoulders with wide draped sleeves and a star-scattered surface. |
| `chef` | Double-breasted jacket with a knotted neckerchief and a long waist apron. |
| `medic` | V-neck scrub tunic and drawstring trousers with a chest patch pocket and a lanyard. |
| `firefighter` | Heavy turnout coat with two horizontal reflective bands and a high storm collar. |

**Per-bundle:** newborn 5 · toddler → elder 13. **New files: 80.**

> 13 costumes is above the brief's 8–10. If the budget bites, the three occupational families
> (`chef`, `medic`, `firefighter` — 30 files) are the clean cut; they are also the best
> candidates for a phase 2 because they pair naturally with matching `headwear`.

#### Face — 19 per bundle (from 12)

Face art is the cheapest per file in the whole catalog and carries the character's entire
personality. Modest expansion only.

**eyes — 3 new (all 12 bundles).** `monolid` (smooth single-fold lid, crease hidden, wide flat
lash line) · `hooded` (upper lid partly covering the crease, short visible lid) · `upturned`
(outer corner lifting clearly above the inner). Total 8.

**brows — 2 new (all 12).** `thick` (dense straight-edged brow with a squared inner end) ·
`thin-arch` (fine high arch tapering to a point). Total 5.

**mouth — 2 new (all 12).** `open-laugh` (wide open mouth with a visible tongue shape) ·
`pout` (small pushed-forward mouth, lower lip fuller). Total 6.

**New files: 84.**

#### Accessories — authored once per head-size class (×3)

**glasses — 3 new.** `reading-half` (half-moon lenses low on the nose with a chain loop at the
temples — the elder marker from A.2) · `safety-goggles` (wide sealed lens band on a strap) ·
`eye-patch` (single soft oval pad on a diagonal strap). Total 8. **9 files.**

**headwear — 14 new.** This is where head coverings live, and per A.8.2 they are everyday
clothing that belongs beside the beanie in one undifferentiated list — exactly as The Sims 4
shipped its hijab in 2019, "separate from female Sims' outfits" and mix-and-matchable with
anything. No sub-section, no "cultural" tab, no ordering that puts them last.

**This block is also where we can beat the reference product.** A.8.2 records that I could find
**no mainstream first-party creator shipping a Sikh dastar/pagri, a kufi, a kippah, a tichel, a
gele or a Rasta tam** — Sikh turbans exist only as fan-made Sims content, and Muslim Toca players
publicly ask for more hijab options. Six of the fourteen families below fill a gap that the whole
category has left open, at 3 files each.

| Family | Silhouette | Covers hair? |
|---|---|---|
| `bucket-hat` | Soft downturned brim all round under a flat crown. | no |
| `flat-cap` | Low rounded crown pulled forward to a short stiff peak. | partial |
| `beret` | Soft round flat cap tilted to one side, no brim. | no |
| `bandana` | Triangle of cloth knotted at the back, covering the forehead. | partial |
| `hijab` | Draped scarf covering hair, ears and neck, pinned under the chin. | **yes** |
| `turban` | Wrapped fabric dome with a visible fold line across the front. | **yes** |
| `kufi` | Small brimless rounded cap sitting flat on the crown. | no |
| `kippah` | Small flat disc resting on the back of the crown. | no |
| `headwrap` | High tied wrap with a knotted or fanned crown. | **yes** |
| `bonnet` | Soft gathered satin cap covering the hair to the nape. | **yes** |
| `durag` | Close-fitting wrap tied at the front with long ties trailing behind. | **yes** |
| `flower-crown` | A ring of small blossoms across the hairline. | no |
| `animal-ears` | Slim band with two rounded ears standing up — pairs with the creature costumes. | no |
| `hard-hat` | Domed shell with a short front brim and a chin strap. | partial |

Total 18. **42 files.**

> **The five "yes" families need the engineering change in C.7.1.** Without it a hijab will
> render correctly over the fringe and leave the back hair hanging out from behind the
> shoulders. Author them anyway — the fix is one line and the art is unaffected.

**earrings — 4 new.** This slot is an *ear anchor*, which makes it exactly the right home for
hearing technology at zero engineering cost.

| Family | Silhouette |
|---|---|
| `hearing-aid` | Behind-the-ear body with a thin clear tube hooking into the ear canal. |
| `cochlear-implant` | Behind-the-ear processor with a round coil disc on the side of the head and a fine lead. |
| `hearing-aid-studs` | The same behind-the-ear body worn together with a small stud. |
| `ear-cuff` | A small band hugging the upper rim of the ear. |

Total 7. **12 files.** `hearing-aid-studs` exists because the slot holds one asset, so a player
otherwise has to choose between hearing aids and earrings — see C.7.3 for the proper fix.

**necklace — 4 new.** This slot is a neck anchor and sits above `top` and `costume` (z 85).

| Family | Silhouette |
|---|---|
| `scarf` | Soft loop around the neck with two short hanging ends. |
| `bib` | Rounded fabric bib fastened at the neck, covering the upper chest. *(toddler class only.)* |
| `bow-tie` | Small symmetric bow at the throat. |
| `lanyard` | Thin cord loop with a small rectangular card hanging at the chest. |

Total 7. **12 files.** Per B.7, keep all four within ~1.3 head radii of the head centre — a
long scarf drape will not scale correctly across bundles.

**Accessories new files: 75.**

### C.7 Engineering changes — flagged, costed, and separated from the art

Nothing in C.2–C.6 requires an engineering change. Everything below is optional and is called
out because the brief asked for it.

**C.7.1 — Let `headwear` hide `hair` (required for full-coverage head coverings).**
`src/catalog/types.ts:28` reads `OVERRIDE_SLOTS = ['costume', 'onepiece']`. `data-hides` is
parsed on every asset but only honoured for those two slots, so `data-hides="hair"` on a hijab
is silently ignored. The change is to add `'headwear'` to that array. `hiddenSlots()` is computed
before the render loop (`src/render/composition.ts:69`), so ordering is already correct.
**Cost: one line plus a test.** Without it, five of the eighteen headwear families render with
back hair escaping.

*Art note:* a `headwear` asset may declare `hair1`/`hair2` in its own `data-colors` and draw the
small amount of hair that should escape at the temples or nape. Those are separate variables
from the hidden hair asset's, so the player controls them independently — acceptable, and
arguably better.

**C.7.2 — Expose every declared colour variable in the swatch row.** Per B.4, the UI reads
`asset.colors[0]` only (`StudioScreen.tsx:56`, `OptionTray.tsx:67`). Rendering one swatch row
per declared variable multiplies the variety of the entire catalog. **Cost: a UI change in two
files. Highest value per hour of anything in this document.**

**C.7.3 — Split `earrings` into `earrings` + `ear-tech`.** One new slot at z 91, authored per
head class, so a player can wear hearing aids *and* earrings. Requires adding the slot to
`SLOTS`, `ACCESSORY_SLOTS`, `LAYER_Z` and the studio's category list. **Cost: small, ~4 files
touched, plus 3 files of art moved.** Until then, `hearing-aid-studs` is the workaround.

**C.7.4 — A `face-mark` slot for freckles, vitiligo and birthmarks.** Face markings scale with
the head, so like glasses they are authored **per head-size class, not per bundle** — 3 files
per family. New slot at z 62 (above `face`, below `hair-front`). Suggested families:
`freckles` (a scatter across the nose bridge and cheeks) · `vitiligo` (irregular pale patches
across one cheek, the chin and the brow) · `birthmark` (a single soft-edged patch on one cheek)
· `blush-cheeks` · `beauty-spot` · `laugh-lines` (elder classes) · `scar` (a fine pale line
across one brow) · `acne` (a light scatter across the forehead and chin). **8 families × 3
classes = 24 files.** Precedent is strong: Toca Boca ships **face markings** (dimples, blush,
wrinkles, each individually colourable) as a first-class creator category (A.1); The Sims 4
shipped infant **birthmarks** as inclusivity work (A.2) and **61 vitiligo variants** built with
Winnie Harlow (A.8.3). Note also that with `--skin1/2/3` always available to any asset, a
vitiligo or birthmark family can paint through the character's own skin ramp for free.

**C.7.5 — A `facial-hair` slot.** New slot at z 65 (above `face`, below `hair-front` so a long
fringe still overlaps correctly). Authored per head class, realistically the `teen` and `adult`
classes only. Suggested families: `stubble` · `moustache` · `goatee` · `full-beard` ·
`long-beard` · `sideburns`. **6 families × 2 classes = 12 files.** Toca Boca ships beards and
moustaches as a sub-tab of hair with their own colour control (A.1), so this is table stakes
rather than a stretch feature.

**C.7.6 — Mobility aids. This one is genuinely hard, and I recommend not faking it.**
A wheelchair must draw *behind* the body (frame, back wheel) and *in front* of it (front wheel,
footplate, armrest), so it cannot occupy a single layer. Doing it properly means a `mobility`
slot that contributes to two layers — z 15 and z 55 — using the same two-group file pattern
`hair` already uses. Families: `wheelchair`, `power-chair`, `cane`, `forearm-crutches`,
`walker`. These are body-shaped, so they are **per bundle**: 5 × 12 = 60 files, plus the
two-layer renderer change. *Limb difference and prosthetics are worse still* — a below-knee
prosthetic replaces part of the body silhouette, so it needs alternate **base bodies** (12 files
per variant) and cannot be a garment. I am flagging the honest cost rather than proposing a
shortcut.

**Cheap interim:** add `wheelchair`, `walking-frame` and `crutches` to `src/assets/props/`
(3 files, no engineering) so they can at least appear on the stage beside a character. **Label
this internally as a stopgap and do not ship it as the answer.** ACNH has a wheelchair *only* as
furniture the character cannot use, and Can I Play That names that exactly as tokenism (A.8.3).
Toca Boca appears to have the same limitation — their prosthetics and crutches are creator
options, but the wheelchair looks like a world object (A.1). Their stated principle is the one
to hold ourselves to: **"If it's a wheelchair, it should be fun in the same way as an outfit."**

**Cheap and genuinely worth doing now, however:** Toca's crutches *are* a worn creator option,
and a **forearm crutch or a walking cane is a single-layer item** — it sits beside the body, not
behind it. `forearm-crutches` and `cane` could ship in a single-layer `mobility` slot (z 55,
above `shoes`) without the two-layer renderer change, at 2 families × 12 bundles = **24 files**.
That is the highest-value slice of C.7.6 and I would take it before the wheelchair.

**C.7.7 — Split hair into `hair-front` and `hair-back` slots (not recommended for v1).** Gacha's
biggest variety lever (A.4). Our hair files already contain the two groups; making them two
selectable slots would multiply hair combinations with zero new art. But it breaks every
existing hair asset's family identity and the two halves would have to be drawn to combine
arbitrarily, which is a real art constraint. Noted as a future option, not proposed.

---

## D. Surface-treatment guidance

This is the section that fixes "bland", so it is prescriptive.

### D.1 The rule that governs everything else

> **Silhouette defines the family. Surface treatment differentiates instances within a family.
> Never the reverse.**

`stripes` (B.2) is the failure case: a surface treatment promoted to a family because there was
no other axis. From now on, if you cannot describe a proposed family in one sentence *without
naming a colour or a pattern*, it is not a family.

### D.2 The two-axis test — apply this before you draw

Every top-level garment silhouette is decided by four axes:

| Axis | Values |
|---|---|
| **Shoulder / sleeve** | none · strap · cap · short set-in · raglan · long · dropped/oversized · puff · draped |
| **Closure** | closed · full placket · half placket · zip · open front · crossover/wrap |
| **Hem** | cropped above waist · waist · hip · past hip · thigh · knee · calf · ankle |
| **Volume** | fitted · straight · boxy · flared/A-line · gathered |

**Two families in the same slot must differ on at least two of the four axes.** `tee` and
`stripes` differ on zero — that is the bug. `tee` (short set-in / closed / hip / straight) and
`crop-top` (short set-in / closed / cropped / fitted) differ on two. `poncho` (draped / closed /
thigh / flared) differs from everything.

For bottoms the axes are **rise** (low / natural / high / bib), **leg** (none-skirt / short /
knee / cropped / full), **width** (skin-close / straight / wide / flared / gathered-cuff) and
**hem treatment** (raw / cuffed / elasticated / ruffled). Same rule: two of four.

### D.3 The five surface tools, in order of how much they differentiate

Use these to separate garments *inside* a silhouette. All five are legal under
`src/catalog/lint.ts` — only `<filter>`, `filter=`, `<image>` and external references are
banned.

**1. Panel blocking (strongest).** Divide the garment body into 2–3 large flat regions that
follow the form — a contrast yoke across the chest, a raglan sleeve panel seamed from neck to
underarm, a colour-blocked lower half, a contrast placket band. Paint each region through a
different variable so the player controls it. This is the strongest tool because it changes what
the eye reads as the garment's *shape* without changing the outline. A `raglan` and a `tee` are
the same silhouette; a raglan yoke makes them read as different garments at thumbnail size.

**2. Trim and edge treatment.** Ribbed cuffs, collar, hem band, piping along a seam, a
contrast-bound neckline, a drawstring with two aglets, a zip pull, a waistband band of a
different width. Draw them as separate shapes, not as strokes on the body path — they need
their own gradient. **A 6–10px trim band in a contrasting value is the cheapest per-pixel
differentiation available.**

**3. Pattern fills.** Define `<pattern patternUnits="userSpaceOnUse">` in the asset's `<defs>`,
prefix the id (`adult-female-top-polo__dots`), and paint a shape clipped to the garment body
with it. Keep the motif **12–24px** at the 400×600 canvas — smaller than 10px turns to mush at
tray-thumbnail size and moirés on the stage. Pattern vocabulary that reads at this scale:
*even stripe · uneven/breton stripe · gingham check · small scattered dot · dense polka ·
chevron · argyle diamond · simple 4-petal floral · star scatter · heart scatter · leopard-ish
blob · plaid (two crossed bands)*. Paint the motif through `--c2` or `--c3` so it recolours with
the garment; never hardcode it.

**4. Applied graphic.** One large centred motif on the chest — a heart, star, moon, cloud,
lightning bolt, smiley, fruit, paw, rainbow arc, wave. **Maximum one per garment**, roughly
60–90px wide, centred at about x=200. This is the highest-personality tool and the easiest to
overuse. Never draw lettering: `<text>` is banned by the contract, and drawn lettering reads as
a logo, which is a trademark problem per A.10.

**5. Structural detail.** Pockets (patch / welt / kangaroo / cargo flap), a button line, a
visible seam, pleats, gathers, quilting channels, a belt loop, a tie belt, a knot. These carry
the least colour but the most "this is a real garment" signal, and they cost the least to draw.

### D.4 Concrete house rules

- **Every garment must use at least two of the five tools in D.3.** A single-fill body with a
  gradient is not finished.
- **Declare 3 colour variables on any garment carrying a pattern or a graphic** — `--c1` body,
  `--c2` shadow/secondary, `--c3` accent — and put the most recolour-worthy one **first** in
  `data-colors` (the swatch row drives `data-colors[0]`, and until C.7.2 lands it drives *only*
  that).
- **Value, not hue, does the separating.** The Soft Papercut gradient is light at the top and
  12–18% darker at the bottom. A trim or panel must sit at least **20% away in value** from the
  body it borders, or it disappears at thumbnail size. Two mid-tone pastels of different hue
  will read as one blob.
- **Thumbnail test.** Every asset is seen first at roughly 64×64 in the option tray. If two
  assets in the same slot are indistinguishable at that size, one of them is wasted. Check on
  the contact sheet (`/?dev=sheet`) before committing.
- **Detail belongs in the middle third of the torso.** Long `hair-front` covers the shoulders
  and collarbone (B.7); `bottom` is drawn under `top`, so the hem region is contested. The safe
  band is roughly y 200–300 on an adult bundle.
- **One `class="sp-shadow"` group per major form.** Pattern and trim shapes go *inside* the form's
  shadow group, not in their own — nested shadow groups compound and turn muddy.
- **Pattern fills need their own gradient underneath.** A flat `<pattern>` over a flat fill loses
  the papercut look. Draw: gradient body → pattern layer clipped to the body → highlight arc on
  top at 22–33% opacity.

### D.5 Worked example — six garments, one silhouette, all clearly different

To show the rules produce separation rather than just more shirts. All six are
*short-set-in-sleeve / closed / hip / straight*, i.e. the shape our current eight tops all share:

| Garment | Tools used | Reads as |
|---|---|---|
| `tee` | gradient body + highlight arc | the plain baseline |
| `polo` | trim (flat knit collar, 2-button placket) + structural (curved hem) | smarter, collared |
| `jersey` | panel blocking (contrast raglan-look yoke) + trim (contrast sleeve cuffs, V-neck bind) | sporty |
| `stripes` | pattern (even 16px stripe through `--c2`) + trim (contrast neck bind) | nautical |
| `henley` | trim (contrast placket band) + structural (3 buttons, no collar) | casual-masculine |
| `crop-top` | *(different silhouette — hem axis)* + pattern (small scattered dot) | teen |

Five of the six differ only by surface, and they still read as five garments. That is the target.

### D.6 Hair is different — surface treatment *is* the silhouette

Everything above concerns garments. Hair does not work the same way, and getting it wrong is
the single most-criticised thing in this whole product category (A.8.1).

**The outline itself carries texture.** A straight bob's hem is a smooth arc. A coily bob's hem
is a **bumpy, irregular outline** — small overlapping lobes, no two the same size. If you draw a
coily style with a smooth outer contour and then add curl squiggles inside it, you have drawn
straight hair with decoration on it. That is the "perfectly spherical afro / cauliflower" failure
The Sims 4 was criticised for. **Build the texture into the silhouette path, not on top of it.**

**Draw the roots and the partings.** Code My Crown's named failure modes are
*"matted Cornrows, bald patches instead of parts, giant disco 'Fros, and messy, Unstyled Locs"*.
Concretely, for our canvas:

- **`cornrows`** — the raised braid rows are the positive shape; the **scalp partings between
  them are visible negative space** painted in `--skin1`/`--skin2`, roughly 3–5px wide, running
  cleanly front-to-back and converging slightly at the nape. Rows should be evenly spaced and
  *deliberately placed*, never a hatch pattern.
- **`box-braids`** — a **visible square parting grid** at the crown, each braid emerging from
  its own box with a small knot at the root. Braids taper slightly and end bluntly.
- **`bantu-knots`** — sectioned cones with **triangular or square partings between sections**,
  each cone drawn as a coiled spiral, not a smooth ball.
- **`locs`** — even-thickness ropes with **separated roots**; each loc reads as an individual
  strand with its own slightly different length. Not a single mass with grooves cut into it.
- **`afro` / `afro-puffs` / `twist-out`** — irregular lobed outer contour, and a visible hairline
  at the temples. An afro is not a circle.
- **`high-top-fade` / `taper-fade` / `waves-360`** — the fade is a **value gradient in the hair
  itself**, from `--hair2` at the skin line up to `--hair1`, with a **hard clean front hairline**.
  A fade with a soft top edge and a fuzzy hairline reads as a mistake.

**Both `hair1` and `hair2` must do real work.** `--hair1` is the lit mass, `--hair2` is the
shadow *and* the texture-defining colour: partings, the underside of a curl lobe, the dark end
of a fade. A hair asset where `--hair2` is only a bottom gradient stop is under-drawn.

**Remember the two-group rule.** Gradients live inside `<g data-part="back">` and
`<g data-part="front">` with distinct ids per group; a root-level `<defs>` is silently discarded
and the hair renders unpainted (B.7). This has caught every agent who has drawn hair on this
project so far.

**Reference to read before drawing textured hair:**
[Code My Crown](https://www.gamedeveloper.com/business/code-my-crown-guide-released-for-black-hairstyles-in-games)
(Dove × Open Source Afro Hair Library). It is a free guide with cultural context and 360°
reference. **Read it; do not copy its models** — they are 3D and under their own BOSS licence,
and everything we ship must be original art.

---

## E. Cost estimate

### E.1 New files by slot

| Slot | Core (×12) | Growing (×10) | Older (×8) | Fem (×5) | Masc (×5) | Stage-specific | **New files** |
|---|---|---|---|---|---|---|---|
| hair | 4 → 48 | 6 → 60 | — | 4 → 20 | 5 → 25 | 2 → 4 | **157** |
| top | 0 | 8 → 80 | 2 → 16 | 4 → 20 | 4 → 20 | 1 → 2 | **138** |
| bottom | 0 | 9 → 90 | — | — | — | 3 → 8 | **98** |
| onepiece | 0 | 6 → 60 | 2 → 16 | — | — | 6 → 12 | **88** |
| shoes | 0 | 6 → 60 | 2 → 16 | — | — | 2 → 4 | **80** |
| costume | 0 | 8 → 80 | — | — | — | — | **80** |
| eyes / brows / mouth | 7 → 84 | — | — | — | — | — | **84** |
| **Catalog subtotal** | | | | | | | **725** |
| glasses / headwear / earrings / necklace (×3 classes) | | | | | | | **75** |
| **Total new files** | | | | | | | **800** |

### E.2 New files by bundle

| Bundle | face | hair | top | bottom | onepiece | shoes | costume | **total after** | now | **new** |
|---|---|---|---|---|---|---|---|---|---|---|
| newborn/female | 19 | 15 | 9 | 10 | 9 | 6 | 5 | **73** | 52 | 21 |
| newborn/male | 19 | 15 | 9 | 10 | 9 | 6 | 5 | **73** | 52 | 21 |
| toddler/female | 19 | 24 | 20 | 18 | 11 | 11 | 13 | **116** | 52 | 64 |
| toddler/male | 19 | 25 | 20 | 18 | 11 | 11 | 13 | **117** | 52 | 65 |
| teen/female | 19 | 24 | 22 | 18 | 12 | 13 | 13 | **121** | 52 | 69 |
| teen/male | 19 | 25 | 22 | 18 | 12 | 13 | 13 | **122** | 52 | 70 |
| adult/female | 19 | 24 | 22 | 17 | 12 | 13 | 13 | **120** | 52 | 68 |
| adult/male | 19 | 25 | 22 | 17 | 12 | 13 | 13 | **121** | 52 | 69 |
| midage/female | 19 | 24 | 22 | 17 | 12 | 13 | 13 | **120** | 52 | 68 |
| midage/male | 19 | 25 | 22 | 17 | 12 | 13 | 13 | **121** | 52 | 69 |
| elder/female | 19 | 25 | 22 | 17 | 12 | 14 | 13 | **122** | 52 | 70 |
| elder/male | 19 | 26 | 22 | 17 | 12 | 14 | 13 | **123** | 52 | 71 |
| **Catalog** | | | | | | | | **1,349** | 624 | **725** |
| accessories (3 classes × 40) | | | | | | | | **120** | 45 | **75** |
| bodies / props / backdrops | | | | | | | | **42** | 42 | 0 |
| **Project total** | | | | | | | | **1,511** | 711 | **800** |

### E.3 Suggested phasing

The brief anchors on ~700 new assets. The proposal is 800, so here is the split I would make:

**Phase 1 — 686 files.** Everything that fixes silhouette blandness, plus representation.
- hair 157 · tops 138 · bottoms 98 · one-pieces 88 · shoes 80 · accessories 75
- creature and fantasy costumes only (`dragon`, `bee`, `mermaid`, `knight`, `wizard`) = 50

**Phase 2 — 114 files.**
- occupational costumes (`chef`, `medic`, `firefighter`) = 30
- face expansion (3 eyes, 2 brows, 2 mouths) = 84

**Zero-art work that should happen before or alongside Phase 1**, in value order:
1. C.7.2 — expose all colour variables in the swatch row *(two files)*
2. C.7.1 — add `headwear` to `OVERRIDE_SLOTS` *(one line; five headwear families depend on it)*
3. B.6 — rename `spider` → `web-runner`, `thunder-god` → `storm-herald` and re-palettise
   *(24 file edits, no redrawing)*

**Optional Phase 3, engineering-gated** (from C.7, not in any total above):

| Item | Engineering | Files |
|---|---|---|
| `face-mark` slot — freckles, vitiligo, birthmark, blush, beauty-spot, laugh-lines, scar, acne | new slot at z 62, per head class | 24 |
| `facial-hair` slot — stubble, moustache, goatee, full-beard, long-beard, sideburns | new slot at z 65, per head class | 12 |
| `ear-tech` slot split | new slot at z 91 | 3 (moved) |
| `mobility` slot, single-layer subset — `cane`, `forearm-crutches` | new slot at z 55, per bundle | 24 |
| `mobility` slot, full — `wheelchair`, `power-chair`, `walker` | two-layer contribution (z 15 + z 55), same pattern as `hair` | 36 |
| Mobility props (stopgap only) | none | 3 |
| Limb difference / prosthetics | alternate base bodies — cannot be a garment | 12 per variant |

### E.4 Is this the right shape?

Two places where I have deliberately deviated from the brief's suggested numbers:

- **Newborn is much smaller than every other bundle (73 vs ~120), and that is the point.** The
  brief implied uniform per-bundle depth. A.2 and A.9 both say otherwise: the Sims 4 ships
  graduated depth by age (8 adult / 4 child / 2 toddler items in the same sub-category), and a
  real newborn wardrobe is one-piece-dominated with almost no separates. Giving a newborn 22
  tops would rebuild the current problem in a new shape.
- **Tops (22) and costumes (13) run above the suggested bands, and one-pieces (12) above
  8–10.** Tops because it is the most-looked-at slot; costumes because they are pure delight per
  file; one-pieces because that is where the newborn and sleepwear wardrobes live. Hair lands at
  24–26, just over the suggested 20–24 band, which I think is right given A.8.1 — hair is the
  most-criticised area in the whole category and the one where under-investment is most visible.

For calibration against the reference product: Toca Boca World ships an estimated 60–100
hairstyles across **four** body archetypes (A.1). We would ship 24–26 across **twelve** bundles,
i.e. roughly 157 hair files against their ~80 assets — the cost of fully-distinct-per-stage art.
That trade was made deliberately in the design spec §4.5 and it is what keeps the renderer
trivial; it just needs to be understood before anyone is surprised by the file count.

If the total has to come down further than Phase 1/2 allows, cut in this order — it removes the
least perceived variety per file: (1) the Older set across all slots, since teen-through-elder
already share the widest wardrobe (56 files); (2) the masculine- and feminine-leaning top sets,
folding two of each into Growing instead (20 files); (3) `snow-pants` and `snow-boots`, which
only pay off with a winter backdrop (20 files).
