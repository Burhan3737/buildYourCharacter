# Research — Heroic and Mythological Costumes

**Status:** proposal. No art has been authored and `docs/FAMILIES.md` has not been changed.
Nothing in this document is canon until it is merged into `docs/FAMILIES.md` §2.8 and §3.

**Read these first, in this order:** `docs/ASSET_CONTRACT.md` (the whole thing, especially
"Silhouette first" and "Hard-won clarifications" §6), `docs/FAMILIES.md` §0.2 and §0.3, and
`docs/CATALOG-RESEARCH.md` §A.10. This document assumes all of them and repeats only the parts
that bite hardest on this particular expansion.

---

## 0. The three rules that decide everything here

### 0.1 Marvel and DC are off the table, completely

The brief that generated this research asked for "Marvel, DC, Greek myth, Norse". **Two of those
four are not available to us and never will be.** Marvel and DC characters, their names, their
costumes, their emblems, their silhouettes and their signature colour-plus-marking combinations
are protected, and this project has already paid for getting it wrong once: the families `spider`
and `thunder-god` had to be stripped and re-keyed to `web-runner` and `storm-herald` because a
generic display name did not cure a red-and-navy web suit or a red-and-blue armoured tunic
(`docs/CATALOG-RESEARCH.md` §B.6).

What we are proposing instead is **the genre, not the roster**. The superhero costume is a
vocabulary — bodysuit, cape, mantle, gauntlet, bracer, plate, sash, belt, boot cuff, wing — and
that vocabulary belongs to nobody. Recombining it into archetypes named after *powers and roles*
produces characters that are ours. Naming them after people produces a lawsuit.

The other two, Greek and Norse, are **fully public domain**, unusually well documented, and give
us silhouettes that nothing else in the catalogue is close to. They are the bulk of the value in
this expansion.

### 0.2 The colour trap, restated

Costume colour is tunable through `--c1`, `--c2`, `--c3`. That sounds like it removes trademark
risk. **It does the opposite of that, and this is the single most misunderstood point in the
brief.**

The fallback values are what a player sees in the picker, in the contact sheet, in every
screenshot and in every marketing image before anybody touches a swatch. The fallback *is* the
costume's identity for the first several seconds of its life. So:

- **A family may not be identifiable by its colours.** If you can only tell two of these apart
  when they are at their defaults, you have drawn one costume twice.
- **Fallbacks come from the house palette** — `#7E90DC` periwinkle, `#F4A79B` coral, `#6BBFAD`
  mint, `#F7C873` butter, `#3B2A22` ink — and are chosen to *avoid* the combinations below, not
  to approach them.

**Fallback combinations that are banned outright in the `costume` slot:**

| Banned default pairing | Why |
|---|---|
| red + navy, red + royal blue | Spider-Man, Superman, Captain Marvel |
| red + gold / red + brass | Iron Man |
| red + blue + gold, with white stars | Wonder Woman |
| blue + white + red with a circular chest field | Captain America |
| green + black, ring-lit | Green Lantern |
| black + yellow, black + grey with a scalloped hem | Batman |
| green + purple, torn hem | Hulk |
| all-green with a hood | Green Arrow |
| purple + black with a chevron | Hawkeye |
| orange scale over green legs | Aquaman |
| silver/chrome monochrome, seamless | Silver Surfer |
| red cape + grey ring-mail + row of circular chest discs | Marvel Thor |
| green + gold, horned | Marvel Loki |
| white + pale blue armour with a winged helm | Marvel Valkyrie |

Any pairing above is banned as a *default*. A player who recolours a costume into Batman's palette
has done that themselves; shipping it that way is us doing it.

### 0.3 The costume layer draws above the face. Nothing covers the head.

`costume` is z 80, above `face` (60) and `hair-front` (70). A mask, cowl, helmet, beak, muzzle or
hood-worn-up in this slot **erases the character's features**. There is no workaround inside the
slot.

The hard number is **shoulder line minus 8px**, per bundle:

| Bundle | shoulder `y` | costume art must stay at `y ≥` | jaw (head bottom) at `y` |
|---|---|---|---|
| newborn/female · newborn/male | 424 | **416** | 418 |
| toddler/female · toddler/male | 352 | **344** | 346 |
| teen/female · teen/male | 200 | **192** | 194 |
| adult/female · adult/male | 156 | **148** | 150 |
| midage/female · midage/male | 168 | **160** | 162 |
| elder/female · elder/male | 190 | **182** | 184 |

Note what that table actually says: **the ceiling sits about 2px above the jaw on every bundle.**
So a standing collar may rise to the jawline and stop. It may not reach the mouth. Verify against
the existing reference: `adult/female/costume/caped-hero.svg` draws its torso from `y=148` exactly
— that file is the calibration for the limit.

**Three sanctioned resolutions, used throughout this proposal:**

1. **Push the identity down into the body.** A hoplite is not the Corinthian helmet, it is the
   moulded cuirass and the strip skirt of pteruges. A berserker is not the bear's head, it is the
   shaggy lobed hem of the pelt jerkin. This is the primary answer for almost every family below.
2. **Hood worn down, collar worn low.** A hood pooled at the nape reads as "hooded" from the
   silhouette of the fabric roll behind the neck — the same trick `hoodie` already uses in `top`.
3. **Author the head half as a companion `headwear` family** at `src/assets/accessories/<class>/
   headwear/`, which draws at z 100 on the head anchor where it belongs. §5 of this document
   proposes six of these. **`headwear` also draws above the face**, so a companion helmet must be
   open-faced: no nasal bar, no cheek plate over the cheekbone, no visor, no beak, no muzzle. A
   beast hood is drawn *pushed back*, with the animal's upper snout sitting on the crown like a
   cap — which is exactly how Herakles' lionskin and the Torslunda wolf-warrior are drawn in the
   original sources anyway.

### 0.4 Cultural sensitivity — what is in and what is out

`docs/FAMILIES.md` §0.3 says cultural dress belongs in `top` and `onepiece` under its own endonym,
**never** in `costume`. That rule exists to stop living identities from becoming dress-up.

Classical Greece, Viking-age Scandinavia and pharaonic Egypt sit on the other side of that line:
they are **historical periods with no living community whose identity is at stake**, they are
standing museum-education and school-play categories, and reconstructing their everyday dress from
archaeology is scholarship, not caricature. That is the basis on which they are proposed for
`costume` here.

Three traditions the brief asked me to consider are **rejected on cultural-sensitivity grounds**
and are written up in §6 with reasons: **Japanese yōkai** (the tengu's entire visual identity is
the vestments of the yamabushi, who are living Shugendō practitioners), **Mesoamerican eagle- and
jaguar-warrior regalia** (explicitly sacred, and the "war bonnet" failure mode named in
`docs/CATALOG-RESEARCH.md` §A.11), and **Slavic rusalka** (rejected on silhouette grounds as well
— see §6).

---

## 1. Findings

### 1.1 Ancient Greek dress — what the sources actually say

The Greek wardrobe is a small number of rectangles fastened in different places, and *where it is
fastened* is precisely the silhouette axis we need. This is unusually convenient for us.

**Peplos.** A single rectangle of wool folded loosely down one side, **left open down the other**,
pinned at *both* shoulders with large pins and belted at the waist. The fold at the top creates the
*apoptygma*, an overfold that hangs to roughly the waist and reads as a second horizontal hem.
Spartan versions were shorter and slit at the sides.
([Ancient Greek dress](https://en.wikipedia.org/wiki/Ancient_Greek_dress))

**Chiton, Doric vs Ionic.** The Doric chiton is a single rectangle pinned at the shoulders. The
**Ionic chiton is the one worth drawing**: it is "draped without the fold and held in place from
neck to wrist by several small pins or buttons" — a *row of fastening points running down the top
of the arm*, which produces a gathered pseudo-sleeve found nowhere else in this catalogue. A large
belt (*zoster*) could sit high under the bust or low at the waist; the cloth exceeded the wearer's
height and the surplus was pulled up over the belt to blouse. Women wore it to the ankle; men wore
it long in the Archaic period and knee-length later, except priests, charioteers and the elderly.
([Chiton](https://en.wikipedia.org/wiki/Chiton_(garment)))

**Exomis.** The single-shoulder variant — pinned at one shoulder only, leaving the other shoulder
and arm entirely bare. Worker's and traveller's dress.

**Himation.** A rectangular mantle, **not pinned at all** — it stays up by drape. Men wore it over
the left shoulder and wrapped round the body "except for their right arms"; leaving the left
shoulder bare read as barbarous, and letting it drag past the ankles read as vulgar. Less
voluminous than a Roman toga.
([Himation](https://en.wikipedia.org/wiki/Himation))

**Chlamys.** A seamless bordered rectangle "about the size of a blanket", **pinned with a fibula at
the right shoulder**, worn by young soldiers, messengers and (iconically) Hermes. It could be
wrapped round the arm as a light shield.
([Chlamys](https://en.wikipedia.org/wiki/Chlamys))

**Hoplite panoply.** The *aspis* is 80–100 cm across and weighs 6.5–8 kg — a shield nearly as tall
as a small child, which is why it must be drawn slung, not held. Body armour is either a bronze
bell or muscled cuirass, or the cheaper *linothorax* of layered linen about 5 mm thick. Bronze
greaves on the shins for the wealthy. The Corinthian helmet was standard early on but was
**superseded by the lighter Chalcidian and the open Pilos** — a fact that solves our face-covering
problem, because the later helmets leave the face clear.
([Hoplite](https://en.wikipedia.org/wiki/Hoplite))

**Aegis.** Not a breastplate. "An animal's skin thrown over Athena's shoulders and arms,
occasionally with a border of snakes", with a gorgoneion at the centre and, per Homer, "a hundred
tassels of pure gold". A Pompeian fresco shows Alexander wearing one thrown diagonally across
shoulder armour — so it reads as an **asymmetric scaled bib with a snake-head fringe**.
([Aegis](https://en.wikipedia.org/wiki/Aegis))

**Gorgon.** Archaic gorgons are frontal, with tusks or fangs, snake curls *or* actual snakes from
the head, **wings**, and a **belt of snakes at the waist**. From the 5th century BC the depiction
turns beautiful rather than monstrous, and by the 4th the full-bodied gorgon largely vanishes,
leaving only the gorgoneion as a shield emblem.
([Gorgon](https://en.wikipedia.org/wiki/Gorgon))

**Satyr.** In Archaic and Classical art satyrs have the **ears and tail of a horse**, not a goat,
on otherwise human legs; the goat legs, hooves and horns are the *Roman faun*, and satyrs only
acquire them in the Hellenistic period through conflation with Pan. They wear the *nebris*, a
skin, and appear with wreaths and the aulos.
([Satyr](https://en.wikipedia.org/wiki/Satyr))

**Talaria and petasos.** Early vase painting gives Hermes boots with a curved strap at the top
edge; the literal wings attached to bare ankles are a Hellenistic and Roman development. The
winged *petasos* traveller's hat is a separate, head-mounted element.
([Talaria](https://en.wikipedia.org/wiki/Talaria))

**Laurel wreath.** Bay laurel, "worn as a chaplet around the head, or as a garland around the
neck", ancient depictions often **horseshoe-shaped rather than a closed ring**. Greek use is for
athletic and artistic victors and for Apollo; Roman use is martial. Distinct from the Olympic
olive *kotinos* and from the oak civic crown.
([Laurel wreath](https://en.wikipedia.org/wiki/Laurel_wreath))

**Pythia.** "A short plain white dress", face veiled in purple during purification, holding laurel
leaves and a dish of spring water, seated on a tall gilded tripod.
([Pythia](https://en.wikipedia.org/wiki/Pythia))

**Minotaur.** Classical Greek art is consistent: **human body, bull's head and tail**. Garments are
not specified in the sources I could reach.
([Minotaur](https://en.wikipedia.org/wiki/Minotaur))

**Amazons.** ⚠ **Partly unverified.** The article I could reach confirms only that mounted-warrior
depictions appear on vases from around 550 BCE, become a popular motif after Marathon, and that a
Phrygian cap and a *labrys* axe appear in at least one later depiction. **The commonly repeated
account — that Amazon depictions shift from Greek hoplite dress to eastern "Scythian" patterned
trousers and sleeved tunics — I could not confirm from the sources available in this session.**
Treat the trousered Amazon below as a design decision, not a sourced reconstruction, and re-check
it before authoring. ([Amazons](https://en.wikipedia.org/wiki/Amazons))

### 1.2 Norse and Viking-age dress — what the sources actually say

**Men.** The *kyrtill* tunic is wool, cut from multiple sewn pieces, **relatively tight through the
chest** with fitted sleeves that extend "well past the wrists", a high **keyhole neckline** closed
by a button-and-loop, and a skirt from thigh to knee — longer meant wealthier. A linen undertunic
was worn beneath, deliberately cut longer in sleeve and skirt so it showed past the overtunic as a
display of affluence. Trousers ranged from tight to baggy, sometimes with **built-in socks** and
heel stirrups, no fly and no pockets. *Winingas* leg wraps wound knee to foot, especially in the
east. Turnshoes, usually ankle-height.

**Cloaks** are large wool rectangles, **worn offset so the right arm is unencumbered** for weapons,
pinned at the right shoulder with a penannular brooch. Belts are narrow — roughly 3/4 inch — with a
knife and a pouch, because nothing had pockets.

**Women.** An ankle-length linen shift under a **shorter woollen suspended dress** (*hangerok* /
*smokkr*), held up by straps: the **rear straps are long, the front straps are much shorter**, and
they meet at a pair of domed **oval ("turtle") brooches** at the collarbone. Glass or amber beads
were commonly strung in a swag between the two brooches, and keys, scissors, needles and knives
hung from cords or chains off them. Head coverings were normal, from a knotted kerchief upward, and
appear to have marked marital status.

**Both.** Tablet-woven braid in bright colours trimmed necklines, cuffs and hems — this is the
period's characteristic surface treatment and it maps perfectly onto our "trim and edge treatment"
tool. Bright colour signalled wealth; *blár* meant a blue-black so dark it reads as near-black.
([Hurstwic — Clothing in the Viking Age](http://www.hurstwic.org/history/articles/daily_living/text/clothing.htm))

**Arms and armour.** Round shields 75–90 cm across with an iron boss, of light wood, often
rim-bound. Mail byrnies in four-on-one construction, expensive and rare — one near-complete
Scandinavian find, from Gjermundbu. **Lamellar** at Birka: thirty small iron plates laced or sewn
to fabric or leather. The Gjermundbu helmet is a rounded spangenhelm cap with a **spectacle guard
around the eyes and nose**. Spear heads 20–60 cm on 2–3 m ash shafts; bearded axes and the
two-handed Dane axe; double-bitted axes are a modern invention.

**Horned helmets are a myth** — 19th-century Romanticism, popularised by Wagner. Winged helmets
likewise. Do not draw either, in `costume` or in `headwear`.
([Viking Age arms and armour](https://en.wikipedia.org/wiki/Viking_Age_arms_and_armour))

**Valkyries.** Literary sources put them in **helmets and mail, carrying spears**, and in
*Völundarkviða* they own **swan garments** — feathered cloaks. The archaeology matches: the Hårby
figurine (c. 800 AD) shows a woman with **hair knotted into a ponytail**, in "a long dress which is
sleeveless and vest like at the top" with an embroidered apron, and — the detail that matters for
us — "her clothing keeps the woman's arms unobstructed so she can fight with the sword and shield
she is holding." Other silver amulets show gowned, ponytailed women with drinking horns.
([Valkyrie](https://en.wikipedia.org/wiki/Valkyrie))

**Berserkers.** "Someone who wears a coat made out of a bear's skin". The *úlfheðnar* "wore the
pelt of a wolf **over their chainmail**". The Torslunda plates (6th–7th c.) show a wolf-headed
warrior with spear and sword beside a one-eyed figure, and boar-crested helmets; the Golden Horns
of Gallehus show animal-headed men. Snorri's "bare-shirt / without armour" reading "has largely
been abandoned". So: **pelt over armour, not instead of it.**
([Berserker](https://en.wikipedia.org/wiki/Berserker))

**Völva / seeress.** The single richest costume description in the entire Norse corpus, from
*Eiríks saga rauða*: a **black mantle with a strap, adorned with precious stones right down to the
hem**; a string of glass beads at the neck; a hood of black lambskin lined with white catskin;
white catskin gloves lined with fur; furred calfskin boots with **long sturdy laces and large
pewter knobs on the ends**; a **linked charm belt with a large purse** of charms; and a staff with
a knob at the top, brass-set with stones. Everything but the hood is below the shoulder line, which
makes this the best-served family in the whole proposal.
([Völva](https://en.wikipedia.org/wiki/V%C3%B6lva))

**Odin.** His by-names are a costume brief: *Síðhǫttr* "broad-hat", *Grímnir* "hooded, masked one",
*Lǫndungr/Loðungr* "shaggy-cloak", *Hjálmberi* "helmet-bearer", *Hárbarðr* "grey-beard". One eye,
spear, ring, ravens and wolves. Note that **almost all of it is head-mounted or is facial hair** —
and this project has no facial-hair slot (`docs/ASSET_CONTRACT.md`, "Slots that do not exist yet").
([Odin](https://en.wikipedia.org/wiki/Odin) ·
[List of names of Odin](https://en.wikipedia.org/wiki/List_of_names_of_Odin))

**Jötnar.** Descriptions are **uncommon** and they are "not necessarily notably large" — Lindow
reads them as a kin group "separated by relation rather than physical appearance". Some are
beautiful (Gerðr), some many-headed. The *hrímþurs* "frost-þurs" compound carries the rime
association but detail is sparse. So a frost-giant costume is **our invention on a thin textual
peg**, and should be built and defended as a shape (jagged rime plates, icicle hem), not as a
reconstruction. ([Jötunn](https://en.wikipedia.org/wiki/J%C3%B6tunn))

### 1.3 The superhero costume as a genre

There is no scholarly consensus article on superhero costume grammar that I could reach, and the
Wikipedia [Superhero](https://en.wikipedia.org/wiki/Superhero) article covers the topic only
glancingly. What it does give is genuinely useful and is all sourced:

- The costume convention descends from **Spring-Heeled Jack** in penny dreadfuls — "dark costume
  ... complete with a domino mask and a cape" — and from **real circus and music-hall strongmen**
  (Breitbart, Greenstein, Sandow, Atlas). The strongman lineage is why the genre's baseline is a
  *singlet and trunks over a visible physique*, not armour.
- **The Scarlet Pimpernel (1903)** popularised the masked avenger with a secret identity, which is
  the reason masks are load-bearing in the genre at all — and therefore the reason our
  no-face-covering rule costs the superhero families more than it costs the mythological ones.
- **DC and Marvel jointly own the "World's Greatest Super Heroes" mark** (registered 1981) and
  "have become known for aggressively protecting their registered marks", including against book
  titles containing "superhero". A 2024 default judgement obtained by Superbabies Limited
  cancelled the "super heroes" marks as genericised — **but a default judgement is not a merits
  ruling and should not be relied on.** Avoid the word in `data-name` strings. Every display name
  proposed below uses "Hero", "Suit", "Runner", "Frame" or a role noun instead.

⚠ **The rest of the genre analysis below is my inference, not sourced**, and should not be cited as
research. It is nonetheless what the art agents need, so it is written down explicitly:

The genre reads at thumbnail size on **five** signals, in descending order of strength:
**(1) shoulder treatment** — bare, cape, mantle, pauldron, membrane; **(2) hem geometry** — full
bodysuit to the ankle, trunks over legs, tunic, split tails, ragged; **(3) the belt** — a wide
horizontal band at the waist is the genre's single most reliable tell and costs almost nothing to
draw; **(4) limb terminators** — gauntlet cuffs and boot cuffs in a contrasting value, which frame
the figure without adding an emblem; **(5) chest panelling** — a contrast yoke or a seamed panel
block, which is how you get "designed suit" without ever drawing a logo.

**A cape is not a silhouette.** It is one value on the shoulder axis, and `caped-hero` already
holds it. Anything else that wants a cape must pay for it on a second axis.

---

## 2. How this proposal is structured

Twenty-one new `costume` families in four groups, plus six companion `headwear` families in the
shared accessory pools.

Each family below gives:

- **name** — kebab-case, the filename, and the `data-family` string;
- **silhouette** — one binding sentence, no colour and no pattern in it, per §0.2 of
  `docs/FAMILIES.md`;
- **axes vs.** — its nearest sibling in the slot and the **two of four** it differs on
  (shoulder/sleeve · closure · hem · volume);
- **trademark** — what specifically must not be drawn;
- **face** — how it satisfies §0.3 above;
- **tier** — which bundles author it;
- **fallback** — a starting `--c1 / --c2 / --c3` triple from the house palette. These are
  suggestions, not canon; what *is* canon is that they must not land on any pairing in §0.2.

**Existing costume families you must differ from** (all 13 are in every toddler→elder bundle):
`web-runner`, `storm-herald`, `caped-hero`, `dino`, `astronaut`, `dragon`, `bee`, `mermaid`,
`knight`, `wizard`, `chef`, `medic`, `firefighter`. Their axis values, worked out from
`docs/FAMILIES.md` §2.8 and from the art in `src/assets/catalog/adult/female/costume/`:

| Existing | shoulder | closure | hem | volume |
|---|---|---|---|---|
| `web-runner` | long set-in | closed, raised collar | ankle | fitted |
| `storm-herald` | none + mantle | closed | thigh | straight |
| `caped-hero` | long set-in + cape | closed | ankle | fitted |
| `astronaut` | long, ribbed joints | full front placket | ankle | boxy/bulky |
| `dragon` | wing stubs | closed | ankle | bulky/angular |
| `dino` | long | closed | ankle | bulky/rounded |
| `bee` | rounded wings behind | closed | thigh | rounded/plush |
| `mermaid` | none | closed | ground (fluke) | fitted then flared |
| `knight` | pauldrons | closed tabard | thigh | straight |
| `wizard` | wide draped | closed | ankle | flared |
| `chef` | long | double-breasted | hip + apron to calf | straight |
| `medic` | short set-in | closed V | hip | straight |
| `firefighter` | long | full placket | thigh | boxy |

---

## 3. The proposed families

### 3.1 Original superhero archetypes — 6

The genre without the roster. Every one of these is a role, not a person.

---

**`speedster`** · *Sprint Suit* · P1 · **Growing** (toddler → elder, 10 bundles)

**Silhouette:** Skin-close sleeveless bodysuit with deep-scooped armholes and a high closed neck,
ankle hem, and a pair of swept fin-vanes standing off the outer calf of each leg.

**Axes vs.** `web-runner` (the nearest full bodysuit): **shoulder** — sleeveless with a deep
dropped armhole against `web-runner`'s long set-in sleeve — and **volume** — the calf vanes break
the leg column into a widening triangle from knee to ankle, where `web-runner` is a clean fitted
tube throughout. Also differs from `caped-hero` on the same two.

**Trademark:** **No lightning bolt anywhere, and especially not on the chest** — that mark is
claimed by at least three DC and Marvel characters and it is the first thing anybody would reach
for. The speed read comes from the *calf vanes* and one raked diagonal seam crossing the torso
from shoulder to opposite hip, which is panel blocking, not a graphic. No winged ear pieces (they
would be head-mounted anyway). No red-and-gold, no red-and-yellow.

**Face:** Nothing above the ceiling. The high neck stops at the jawline `y`.

**Fallback:** `--c1` mint `#6BBFAD` body · `--c2` ink `#3B2A22` seam and vanes · `--c3` butter
`#F7C873` belt and cuffs.

---

**`strongarm`** · *Powerhouse Rig* · P1 · **Growing** (10 bundles)

**Silhouette:** Heavy sleeveless harness-vest with a broad flat plate yoke across each shoulder,
open down both sides and cross-laced from armpit to waist, over a wide buckled belt and full-length
straight trousers with a turned cuff.

**Axes vs.** `storm-herald` (the nearest sleeveless armoured piece): **closure** — open sides with
a visible lace ladder against a closed tunic — and **hem** — full-length trousers to the ankle
against `storm-herald`'s thigh-length tunic. Volume differs too (slab-plate vs draped mantle),
which is a bonus, not the argument.

**Trademark:** No torn or ragged hem and **no purple-and-green default** — that is Hulk, and the
torn trouser is the specific tell. Nothing on the chest. The strongman lineage in §1.3 is the
reference: this is a circus-strongman harness, drawn as armour.

**Face:** Nothing above the ceiling; the yoke plates sit on top of the deltoid, not on the trapezius.

**Fallback:** `--c1` ink `#3B2A22` plates · `--c2` periwinkle `#7E90DC` under-layer · `--c3` butter
`#F7C873` lacing and buckle.

---

**`exo-frame`** · *Exo Frame* · P2 · **Older** (teen → elder, 8 bundles)

**Silhouette:** Segmented hard-shell exosuit — one moulded chest plate, ring-jointed shoulder caps,
forearm gauntlets and separate thigh and shin plates, each shell divided from the next by a
visible narrow band of dark under-layer at every joint.

**Axes vs.** `astronaut` (the nearest bulky suit): **closure** — a one-piece moulded chest shell
seamed at the side, against `astronaut`'s full front placket — and **volume** — plate-and-gap
segmentation that pinches at every joint, against `astronaut`'s uniform inflated bulk. Also differs
from `knight` on volume (curved shells vs flat tabard) and closure.

**Trademark:** **No circular glowing chest reactor and no red-and-gold default.** Both together are
Iron Man; either alone is close enough to avoid. The chest plate is a plain bevelled panel with a
gradient and a highlight arc, and nothing else on it. No faceplate, no jaw plate.

**Face:** Nothing above the ceiling. The shoulder caps are rings around the deltoid, not a gorget.

**Why Older:** the identity is the *repeated joint gap*, and a joint band needs at least 3 device
pixels at a 64px thumbnail to survive. The toddler torso is 96×104 against the adult's 120×160 —
roughly 16 device px of torso height at thumbnail size against 26 — so the segmentation collapses
into mush on toddler. Draw it where it can be seen.

**Fallback:** `--c1` periwinkle `#7E90DC` shells · `--c2` ink `#3B2A22` joints · `--c3` mint
`#6BBFAD` panel accent.

---

**`shadow-agent`** · *Nightwork Suit* · P1 · **Growing** (10 bundles)

**Silhouette:** Asymmetric wrap-front bodysuit crossing right over left to a low fastening at one
hip, one long sleeve and one bare arm with a wide wrist wrap, ankle hem, and a narrow half-cape
hanging from the single covered shoulder to the calf.

**Axes vs.** `caped-hero`: **closure** — a crossover wrap against a closed front — and
**shoulder** — one sleeve and one bare arm, and a half-cape from one point rather than a full cape
from both. That asymmetry is the whole family; hold it.

**Trademark:** **No scalloped or bat-winged cape hem, no pointed ear shapes, no black-and-yellow
oval anything.** The half-cape hem is a clean straight cut with one soft corner. Not black-and-grey
by default — that is the other half of the tell.

**Face:** No cowl, ever. If the concept feels like it needs a hood, it is `ranger`, not this one.

**Fallback:** `--c1` ink `#3B2A22` body · `--c2` periwinkle `#7E90DC` wrap panel and cape lining ·
`--c3` coral `#F4A79B` wrist wrap and hip fastening.

---

**`ranger`** · *Ranger's Kit* · P2 · **Growing** (10 bundles)

**Silhouette:** Sleeveless hooded jerkin worn open over a long-sleeved under-layer, the hood pooled
in a thick roll at the nape, a diagonal quiver strap across the chest, a wide bracer on one
forearm, and a hem split into two tails at mid-thigh over close trousers.

**Axes vs.** `shadow-agent`: **closure** — open-fronted jerkin against a crossover wrap — and
**hem** — split tails at mid-thigh against an ankle bodysuit. Against `firefighter` (also open-ish,
also thigh) it differs on **shoulder** (sleeveless over sleeves vs long coat sleeve) and **volume**
(close jerkin vs boxy turnout coat).

**Trademark:** **No all-green default with a hood** (Green Arrow) and **no purple-and-black
chevron** (Hawkeye). No bow drawn in the hand — there is no prop anchor and it will not line up.
The quiver is drawn as a strap and a shoulder-height cylinder edge only, never as a bundle of
arrows above the shoulder line.

**Face:** The hood is **worn down**, drawn as a fabric roll behind the neck exactly like the `top`
slot's `hoodie`. This is the sanctioned hood pattern for the whole catalogue.

**Fallback:** `--c1` mint `#6BBFAD` jerkin · `--c2` ink `#3B2A22` under-layer and strap · `--c3`
butter `#F7C873` bracer and lacing.

---

**`sky-glider`** · *Glider Suit* · P1 · **Growing** (10 bundles)

**Silhouette:** Fitted ankle-length bodysuit with a broad fabric membrane stretched from each wrist
to the hip and a third membrane spanning between the knees, so the standing figure reads as a
single wide triangle from shoulder to ankle; rib seams fan across each membrane.

**Axes vs.** `bee` (the nearest winged family): **shoulder** — a membrane attached along the entire
arm against `bee`'s two discrete rounded wings behind the shoulders — and **volume** — a flat
angular triangle against `bee`'s plush rounded body. Against `caped-hero` it differs on shoulder
and volume equally clearly.

**Trademark:** **No mechanical or metal feather wings, no red-and-white harness** (Falcon). The
membrane is plain cloth with drawn rib seams; it is a wingsuit, not a jetpack. No bird head, no
bird emblem.

**Face:** The membrane's top edge runs from the wrist to the hip and never rises above the
shoulder; nothing crosses the ceiling.

**Fallback:** `--c1` butter `#F7C873` membrane · `--c2` ink `#3B2A22` body · `--c3` mint `#6BBFAD`
rib seams and boot cuffs.

---

### 3.2 Greek mythology and dress — 7

Fully public domain. The Greek wardrobe is a small set of rectangles fastened in different places,
and the fastening point *is* the silhouette axis — which makes this the highest-yield group in the
proposal.

---

**`chiton`** · *Ionic Chiton* · P1 · **Growing** (10 bundles)

**Silhouette:** Ankle-length draped tube fastened along the top of both arms by a row of five or
six small round pins, so the cloth falls in a scalloped pseudo-sleeve to the elbow; belted twice,
once under the bust and once at the waist, with a bloused fold spilling over the upper belt.

**Axes vs.** `wizard` (the nearest full-length robe): **shoulder** — a row of pinned points down
the arm producing a scalloped edge, against `wizard`'s single wide draped sleeve — and **volume** —
a gathered vertical column against `wizard`'s A-line flare. The double belt is the third
difference and the strongest 64px signal after the arm scallops.

**Trademark:** none. This is documented Ionic dress
([Chiton](https://en.wikipedia.org/wiki/Chiton_(garment))). Draw fine vertical fold lines through
`--c2`; do not draw a key-meander border as the identity — that is surface, and it is also what
every cheap "Greek costume" does instead of getting the construction right.

**Face:** Nothing near the head; the neckline is a shallow scoop well below the ceiling.

**Fallback:** `--c1` `#F2EDE4` warm off-white body · `--c2` `#D8CDBC` fold shadow · `--c3` butter
`#F7C873` pins and belts. *(Off-white is the one place a near-neutral fallback is right — the
sources are explicit that these were undyed wool and linen — but keep `--c2` a real 20% value step
so it does not read as one flat blob.)*

---

**`peplos`** · *Peplos* · P2 · **Growing** (10 bundles)

**Silhouette:** Sleeveless rectangle pinned at each shoulder by one large pin, with a deep overfold
(*apoptygma*) hanging to the waist and reading as a second horizontal hem, belted over the fold,
and **open down one whole side** with a vertical slit from hem to hip; ankle hem, bare arms.

**Axes vs.** `chiton`: **shoulder** — two single point-pins and completely bare arms, against a row
of pins down the arm — and **closure** — an open side seam with a full-length slit, against a
closed tube. The apoptygma is a third, and it is what makes this read at thumbnail size: a strong
horizontal edge across the middle of the figure.

**Trademark:** none.

**Face:** Nothing near the head.

**Fallback:** `--c1` coral `#F4A79B` body · `--c2` `#D9847A` overfold shadow · `--c3` butter
`#F7C873` pins and belt.

---

**`winged-messenger`** · *Messenger's Chlamys* · P1 · **Growing** (10 bundles)

**Silhouette:** Short *exomis* chiton pinned at one shoulder only, leaving the other shoulder and
arm entirely bare, hem at mid-thigh; a rectangular chlamys pinned at the right shoulder with a
single round fibula and swinging back and out; winged cuffs at both ankles.

**Axes vs.** `chiton`: **shoulder** — a single pin with one shoulder bare, against pins down both
arms — and **hem** — mid-thigh against ankle. Against `peplos` the same two hold (one pin vs two;
thigh vs ankle).

**Trademark:** none. Hermes/Mercury are public domain. The winged ankle cuffs are drawn as two
short swept feather shapes at the ankle bone — early vase painting actually shows a boot pull-strap
rather than a wing, so either reading is defensible; the wing reads better at 64px.

**Face:** The *petasos* is head-mounted and is **not** drawn here. There is no petasos in the
companion headwear set either — `sun-hat` in the existing pool already covers a shallow-crowned
wide-brimmed traveller's hat, and adding a second would fail the headwear silhouette test.

**Fallback:** `--c1` `#F2EDE4` chiton · `--c2` periwinkle `#7E90DC` chlamys · `--c3` butter
`#F7C873` fibula and ankle wings.

---

**`hoplite`** · *Hoplite Panoply* · P1 · **Older** (teen → elder, 8 bundles)

**Silhouette:** Sleeveless moulded cuirass narrowing sharply at the waist, with two stiff shoulder
flaps folded forward from the back and laced down to the chest, a skirt of eight to ten separate
overlapping rectangular *pteruges* strips at the hip with visible gaps between them, and a hard
greave plate down each shin.

**Axes vs.** `knight`: **shoulder** — two flat rectangular flaps hinged forward from behind,
against `knight`'s rounded pauldrons — and **volume** — a moulded torso that pinches at the waist,
against `knight`'s straight boxy tabard. The strip skirt is the third and is the family's
thumbnail signature: a row of vertical gaps at the hip that nothing else in the slot has.

**Trademark:** none. ⚠ Watch the *adjacent* risk: a moulded cuirass plus a shoulder mantle plus a
short cape starts to become `storm-herald`, and `storm-herald` exists precisely because a
red-and-blue armoured tunic had to be defused. Keep the cape off this one entirely.

**Face:** **No Corinthian helmet** — it covers the face and cannot be drawn in either slot. The
sources are clear that the Corinthian was superseded by the lighter open Chalcidian and the open
Pilos, so the companion `attic-helm` headwear (§5) is both period-correct and legal.

**Why Older:** the pteruges strips are a repeated 8–10-element rhythm across the hip. On the
toddler body the hips block is 84×40 against the adult's 108×52; ten strips across it do not
resolve at thumbnail size and the family degrades into a plain skirt.

**Fallback:** `--c1` butter `#F7C873` cuirass · `--c2` `#C99B48` shadow and greaves · `--c3` coral
`#F4A79B` pteruges and lacing.

---

**`amazon`** · *Amazon Rider* · P2 · **Growing** (10 bundles)

**Silhouette:** Long-sleeved close tunic to mid-thigh worn over narrow full-length trousers tucked
into soft ankle boots, with a crescent *pelta* shield slung flat across the back so a curved
crescent edge shows past each hip, and a wide diagonal baldric.

**Axes vs.** `hoplite`: **shoulder** — long fitted sleeves against bare-armed plate — and **hem** —
trousers to the ankle against a strip skirt at the hip. Against every other Greek family here the
trousers alone are decisive: nothing else in the group has a divided leg.

**Trademark:** **This is the highest-residual-risk family in the proposal and it must be drawn to
the brief exactly.** Do not draw: a strapless bustier; a star motif anywhere; a tiara (head-mounted
and out of slot regardless); wide matching metal bracers on both wrists; a coiled rope at the hip;
or a red-plus-blue-plus-gold default. Any two of those together is Wonder Woman. The trousered,
long-sleeved, fully-covered rider silhouette proposed here is the opposite of that costume in every
axis, which is exactly why it was chosen — **keep the trousers and keep the sleeves.**

⚠ **Sourcing caveat:** see §1.1. The "eastern/Scythian" trousered Amazon is the design intent here
but I could not confirm it from the sources available in this session. Re-verify before authoring;
if it does not hold up, the fallback design is a short belted chiton with a pelta and a baldric,
which then needs re-checking against `chiton` and `winged-messenger` for the two-axis rule.

**Face:** The Phrygian cap is head-mounted and is **not** proposed — the existing `beanie` and
`bandana` families already occupy that region of headwear silhouette space.

**Fallback:** `--c1` periwinkle `#7E90DC` tunic · `--c2` ink `#3B2A22` trousers and boots · `--c3`
butter `#F7C873` baldric and pelta rim.

---

**`satyr`** · *Satyr* · P2 · **Growing** (10 bundles)

**Silhouette:** Bare-chested above a shaggy pelt that begins at the waist in a deeply lobed,
irregular horizontal edge and covers both legs to the ankle in a bumpy, uneven outline; a long
horse tail falling behind from the small of the back; a *nebris* animal skin knotted over one
shoulder and hanging to the opposite hip.

**Axes vs.** `dino` (the nearest tailed family): **volume** — an irregular lobed shag against
`dino`'s smooth rounded belly-panel body — and **closure** — an open, single-shoulder knotted skin
against `dino`'s closed suit. Against `berserker` (§3.3) it differs on **hem** (shaggy to the ankle
vs a thigh jerkin over trousers) and **shoulder** (one knotted skin vs a full sleeveless jerkin).

**How to draw the shag:** apply the contract's hair rule — **build the texture into the silhouette
path, not on top of it.** Small overlapping lobes of unequal size along the outer contour of each
leg and along the waist edge. A smooth leg with squiggles drawn inside it is a failed satyr, in
exactly the way a smooth-contoured coily bob is a failed bob.

**Trademark:** none. Note for correctness: **horse tail and horse ears, not goat** — goat legs and
horns are the Roman faun and a Hellenistic conflation with Pan
([Satyr](https://en.wikipedia.org/wiki/Satyr)). Also: classical satyrs are nude with exaggerated
genitalia and are associated with sexual pursuit. **We are drawing a children's dress-up satyr:**
pelt from the waist down, nebris over the shoulder, nothing else. Say so in the file comment so the
next agent does not "correct" it back toward the source.

**Face:** Ears go to the existing `animal-ears` headwear family, which `docs/FAMILIES.md` §4.2
already describes as pairing with the creature costumes. Nothing new is needed.

**Fallback:** `--c1` `#8E7355` pelt · `--c2` `#6B5540` lobe shadow · `--c3` coral `#F4A79B` nebris.

---

**`gorgon`** · *Gorgon* · P2 · **Older** (teen → elder, 8 bundles)

**Silhouette:** Sleeveless close column dress with a high plain neckline, whose hem breaks at
mid-calf into four thick tapering serpent coils that curl outward and rest splayed on the ground
line; a wide belt of interlaced snakes at the waist.

**Axes vs.** `mermaid`: **volume** — four splayed coils spreading wide at the ground against
`mermaid`'s single narrow tail and fluke — and **shoulder** — a high sleeveless neckline against
`mermaid`'s shell bodice. The splayed base is a genuinely distinct thumbnail outline: `mermaid`
tapers to a point and flares once; `gorgon` fans into four.

**Trademark:** none. Deliberately **no wings and no scale texture** — archaic gorgons do have wings
([Gorgon](https://en.wikipedia.org/wiki/Gorgon)), but wings plus scales would collide with `dragon`
on both shoulder and volume, and the axis rule outranks the iconography. The snake belt is
attested, the coiled hem is our extrapolation from the later serpent-bodied Medusa.

**Face:** **No gorgon face and no tusks — ever.** The snake hair is authored as the companion
`serpent-locks` headwear family (§5) with `data-hides="hair"`, which is the correct place for it
and leaves the character's own face readable. The costume half carries the belt and the coils.

**Why Older:** four interlaced snakes at the belt and four coils at the hem is a lot of fine
overlapping line-work in a small region, and it needs the taller adult torso to read. It is also
the family most likely to be scary to a very young player, which is a second reason to skip toddler.

**Fallback:** `--c1` mint `#6BBFAD` dress · `--c2` `#3F8C7C` coils and shadow · `--c3` butter
`#F7C873` snake belt.

---

### 3.3 Norse mythology and Viking-age dress — 6

Fully public domain, and better documented in dress terms than the Greek group because we have
grave finds. **The one thing that will sink this group is drawing Marvel's Asgard instead of
Scandinavia's archaeology.** No horns. No wings. No winged helms. Wagner is not a source.

---

**`apron-dress`** · *Apron Dress* · P1 · **Growing** (10 bundles)

**Silhouette:** Ankle-length long-sleeved underdress beneath a shorter sleeveless woollen overdress
hung from two short front straps that meet a pair of domed oval brooches at the collarbone, with a
swag of beads strung between the brooches and a small cluster of tools on a chain at one hip; the
overdress hem at mid-calf leaves a clear band of underdress showing beneath it.

**Axes vs.** `chiton` (the nearest long draped family): **shoulder** — two short straps ending in
hard round brooch discs against `chiton`'s pinned scalloped arm — and **hem** — a stacked double
hem (overdress at calf, underdress at ankle) against a single hem. That double hem is the
thumbnail signature and it must not be lost.

**Trademark:** none. This is straight archaeology
([Hurstwic](http://www.hurstwic.org/history/articles/daily_living/text/clothing.htm)). Trim
necklines, cuffs and hems with drawn tablet-woven bands through `--c3` — that is the period's own
surface treatment and it maps onto our "trim and edge treatment" tool exactly.

**Face:** Nothing near the head. The brooches sit at the collarbone, well below the ceiling.

**Fallback:** `--c1` periwinkle `#7E90DC` overdress · `--c2` `#F2EDE4` underdress · `--c3` butter
`#F7C873` brooches, beads and woven trim.

---

**`valkyrie`** · *Valkyrie* · P1 · **Older** (teen → elder, 8 bundles)

**Silhouette:** Knee-length sleeveless mail shirt split front and back for riding, over a
long-sleeved underdress to the ankle, with a short shoulder cape of overlapping leaf-shaped plumes
lying flat across the upper back and a broad belt with a round shield slung behind so a disc edge
shows past one hip.

**Axes vs.** `knight`: **shoulder** — a flat overlapping-plume cape against rounded pauldrons — and
**hem** — a knee-length riding-split mail shirt over a full-length underdress, giving a stacked
double hem, against `knight`'s single thigh tabard. Against `apron-dress` it differs on
**closure** (front-and-back riding split vs closed) and **volume** (armoured and straight vs soft
and belled).

**Trademark:** **No winged helmet and no horned helmet** — both are 19th-century Romantic
invention, and the winged version is also the tell for Marvel's Valkyrie. **No white-and-pale-blue
default.** No named sword. The feather cape comes from the swan garments of *Völundarkviða*, which
is a 13th-century manuscript and unambiguously public domain.

**Face:** The Gjermundbu helmet's spectacle guard covers the eyes and the nose and therefore
**cannot be drawn in either slot**. The companion `spangen-cap` headwear (§5) is the same helmet
with the guard omitted — a rounded four-panel iron cap with a plain brow band.

**Why Older:** overlapping mail and overlapping plumes are two repeated fine textures stacked on
one torso. On the toddler body they merge into a single grey field.

**Fallback:** `--c1` `#B9C0CC` mail · `--c2` periwinkle `#7E90DC` underdress · `--c3` mint
`#6BBFAD` plume cape. *(Explicitly not white-and-pale-blue; the plume cape carries a saturated hue
to break that read.)*

---

**`berserker`** · *Berserker* · P1 · **Growing** (10 bundles)

**Silhouette:** Sleeveless shaggy pelt jerkin worn open over a long-sleeved under-tunic, its hem
falling to mid-thigh in a deeply lobed irregular edge, cinched by a wide leather belt with a knife
and pouch hanging from it, over close trousers cross-bound from knee to ankle with leg wraps.

**Axes vs.** `strongarm`: **volume** — an irregular shaggy lobed mass against flat rigid slab
plates — and **closure** — an open pelt front against a cross-laced harness. Against `satyr`:
**hem** (thigh jerkin over trousers vs shag to the ankle) and **shoulder** (full sleeveless jerkin
vs one knotted skin).

**Trademark:** none. Correctness note from the sources: the *úlfheðnar* wore the pelt **over
chainmail**, and Snorri's "fought without armour" reading has largely been abandoned
([Berserker](https://en.wikipedia.org/wiki/Berserker)) — so draw the under-tunic, do not draw a
bare chest.

**How to draw the shag:** same rule as `satyr` — lobes in the outline, not squiggles inside it.
`berserker` and `satyr` are the two shaggy families in the slot and they are separated by hem and
shoulder; if yours are not obviously different at 64px, redraw the `satyr` legs longer and the
`berserker` jerkin shorter until they are.

**Face:** The bear's head goes to the companion `beast-hood` headwear (§5), drawn **pushed back**
with the snout sitting on the crown like a cap and the face fully clear — which is how the
Torslunda plates and the Herakles lionskin are drawn in the originals anyway. The `winingas` leg
wraps are drawn as four or five diagonal bands per calf and are a cheap, strong second identity
signal.

**Fallback:** `--c1` `#8E7355` pelt · `--c2` `#5C4632` lobe shadow · `--c3` coral `#F4A79B`
under-tunic and belt.

---

**`jarl`** · *Jarl* · P2 · **Growing** (10 bundles)

**Silhouette:** Knee-length fitted wool tunic with a keyhole neck and long sleeves rucked past the
wrist, deep woven trim bands at neck, cuff and hem, over narrow trousers; a rectangular cloak worn
**offset over the left shoulder only**, leaving the right arm entirely free, and pinned at the
right shoulder with a single ring brooch.

**Axes vs.** `berserker`: **closure** — a closed keyhole tunic against an open pelt jerkin — and
**shoulder** — an asymmetric cloak from one shoulder against a symmetric sleeveless jerkin. Against
`caped-hero`: **closure** (keyhole tunic vs closed bodysuit is weak, so lean on) **hem** (knee tunic
over trousers vs ankle bodysuit) and **volume** (soft wool with real drape vs skin-close).

**Trademark:** none. The offset cloak is documented and functional — the right arm is kept free for
weapons — and it makes this the only asymmetric-cloak family in the slot. Do not add a second
brooch; do not centre the cloak.

**Face:** Nothing near the head. The keyhole neck opens at the sternum.

**Fallback:** `--c1` mint `#6BBFAD` tunic · `--c2` ink `#3B2A22` cloak · `--c3` butter `#F7C873`
woven trim and ring brooch.

---

**`seeress`** · *Seeress* · P2 · **Older** (teen → elder, 8 bundles)

**Silhouette:** Full-length open-fronted mantle closed by a single strap across the chest, its hem
weighted by a band of small set stones, over a long straight underdress; a flat fur collar lying
across both shoulders, deep fur-turned cuffs, and a linked charm belt at the waist with one large
pouch hanging from it and tall laced boots ending in heavy round knobs.

**Axes vs.** `wizard`: **closure** — an open front held by one chest strap against a closed robe —
and **volume** — a heavy straight-hanging mantle against `wizard`'s A-line flare. The stone hem
band is a hard horizontal edge at the ankle that `wizard` does not have.

**Trademark:** none. This is the single best-documented costume in the Norse corpus and it comes
almost verbatim from *Eiríks saga rauða*
([Völva](https://en.wikipedia.org/wiki/V%C3%B6lva)) — black strapped mantle set with stones to the
hem, glass beads, catskin gloves, furred calfskin boots with long laces and large pewter knobs, a
linked charm belt with a large purse. Draw the list. It is free identity.

**Face:** The black lambskin hood lined with white catskin is head-mounted; the existing `bonnet`
headwear family already occupies a soft gathered cap covering the hair to the nape, and adding a
second would fail the headwear silhouette test. Skip it — the mantle collar and the stone hem carry
the family without it.

**Do not draw the staff.** There is no prop or hand anchor in this project and a staff authored
into a costume will not align with the hand on any bundle. `docs/ASSET_CONTRACT.md` is explicit
that scenery-instead-of-worn-item is the documented failure mode of this whole product category.

**Why Older:** the identity is a dense list of small elements — stone band, charm links, boot
knobs, fur turn-backs. That needs torso and leg room.

**Fallback:** `--c1` ink `#3B2A22` mantle · `--c2` `#F2EDE4` fur and underdress · `--c3`
periwinkle `#7E90DC` set stones and charm links.

---

**`frost-giant`** · *Frost Giant* · P2 · **Growing** (10 bundles)

**Silhouette:** Bulky closed knee-length overcoat with a thick shaggy shoulder collar, chest and
forearms crusted with angular rime plates that jut outward from the outline in irregular spikes,
and a hem cut into uneven downward-pointing icicle teeth over thickly wrapped legs.

**Axes vs.** `berserker`: **volume** — hard angular spiked bulk against soft shaggy lobes — and
**hem** — a jagged icicle-tooth edge at the knee against a lobed jerkin edge at the thigh; also
**closure** (closed overcoat vs open jerkin). Against `dragon`: **shoulder** (shaggy collar vs wing
stubs) and **hem** (spiked knee hem over wrapped legs vs full ankle suit).

**Trademark:** none, but ⚠ **do not default it to blue.** Blue is what makes a frost giant read as
Marvel's Jotunheim; the *shape* — outward-jutting angular plates and an icicle hem — is what should
carry it, and the colour must be free to be anything. This is the clearest case in the whole
proposal of the §0.2 rule: if it only works in blue, it is not a silhouette.

⚠ **Sourcing caveat:** Norse sources describe jötnar only sparsely, and they are "not necessarily
notably large" — Lindow reads them as a kin group separated by relation rather than appearance
([Jötunn](https://en.wikipedia.org/wiki/J%C3%B6tunn)). The rime plates and icicle hem are our
invention on the thin peg of *hrímþurs*, "frost-þurs". Defend this family as a shape, not as a
reconstruction, and do not cite it as research.

**Face:** Nothing above the ceiling. The shaggy collar lies flat on the shoulders.

**Fallback:** `--c1` mint `#6BBFAD` coat · `--c2` `#E4EAF0` rime plates · `--c3` `#8E7355` shaggy
collar. *(Mint, not blue. Deliberately.)*

---

### 3.4 Other public-domain traditions — 2

Egypt only. The other four traditions the brief asked me to consider are written up in §6 as
rejections, with reasons.

---

**`pharaonic`** · *Pharaonic Dress* · P1 · **Growing** (10 bundles)

**Silhouette:** Finely pleated linen kilt to the knee with a stiff triangular front apron standing
out flat from the body, bare torso, a broad flat semicircular collar covering both shoulders and
the upper chest, wide plain armlets above each elbow, and a narrow beaded belt.

**Axes vs.** `hoplite`: **volume** — flat drape-and-pleat with a hard triangular projection at the
front, against a moulded three-dimensional cuirass — and **shoulder** — a broad flat horizontal
disc collar against two forward-folded shoulder flaps. The semicircular collar is an outstanding
64px signal: it is the only wide flat horizontal shoulder mass in the entire slot.

**Trademark:** none. Sourced to
[Clothing in ancient Egypt](https://en.wikipedia.org/wiki/Clothing_in_ancient_Egypt): the *shendyt*
wrap kilt, the Middle Kingdom pleated kilt with a triangular apron, the *usekh* broad collar.

**Cultural note:** in scope because pharaonic Egypt is a historical period with no living
community whose religious identity is at stake, and because Egyptology is one of the largest
museum-education categories in the world. Two things to avoid nonetheless: **do not draw a specific
identifiable ruler** (no cartouche, no crook-and-flail, no uraeus), and **do not draw the
"glamour-Cleopatra" version** — this is a knee-length linen kilt and a collar, drawn with the same
matter-of-factness as the `chef`.

**Face:** The *nemes* headcloth is head-mounted and is proposed as a companion headwear family
(§5) with `data-hides="hair"`. It is the one companion I would drop first if the pool budget bites
— its lappets fall toward the shoulders and the headwear pool's 1.3-head-radii scaling limit
(`docs/FAMILIES.md` §4) makes long lappets risky on newborn and toddler. **Keep them short, ending
above the collarbone.** No false beard: it is facial hair, and there is no facial-hair slot.

**Fallback:** `--c1` `#F2EDE4` linen · `--c2` `#D8CDBC` pleat shadow · `--c3` butter `#F7C873`
collar, armlets and belt.

---

**`mummy`** · *Bandage Wrap* · P1 · **Growing** (10 bundles)

**Silhouette:** Whole body covered in overlapping wrapped bandage strips running in alternating
diagonals, arms and legs bound separately to the wrist and ankle, with four or five ragged loose
ends trailing free from the forearm, hip and calf; no closure and no fastening anywhere.

**Axes vs.** `astronaut` (the nearest all-over suit): **closure** — no closure at all, against a
full front placket — and **volume** — a close-wrapped body of uniform thickness with irregular
trailing tails breaking the outline, against `astronaut`'s smooth inflated bulk. Against
`web-runner`: **volume** and **closure** on the same argument.

**Trademark:** none. The wrapped mummy is a verified-generic standing retail Halloween category
(`docs/CATALOG-RESEARCH.md` §A.10 on stock themes) and is not tied to any living religious
practice.

**Cultural note:** ⚠ **flagged, not blocked.** Mummified people are human remains, and museum
practice has moved toward "mummified person" over "mummy". Recommendation: keep the family key
`mummy` (it is the retail category name and the picker needs to be findable) but set `data-name` to
**"Bandage Wrap"**, and draw cloth only — no exposed remains, no skull, no decay, no green pallor.
This is the least confident recommendation in the document and is a reasonable one to drop if
anybody objects.

**Face:** Nothing above the ceiling — and specifically **no wrapped head and no face bandages**,
which is the exact thing this slot cannot do. The neckline stops at the jawline `y` and the
character's face is fully visible above a wrapped collar. That is a better-looking costume anyway.

**Fallback:** `--c1` `#E8DFCE` bandage · `--c2` `#C4B698` overlap shadow · `--c3` `#A08F72` frayed
ends.

---

## 4. Summary table

`G` = **Growing** tier (toddler · teen · adult · midage · elder, both body types) = **10 bundles**.
`O` = **Older** tier (teen · adult · midage · elder, both body types) = **8 bundles**.
No new costume family is authored for **newborn** — see §7.1.

| # | Family | Theme | Tier | Bundles | Phase | Nearest sibling | Two axes |
|---|---|---|---|---|---|---|---|
| 1 | `speedster` | hero | G | 10 | P1 | `web-runner` | shoulder · volume |
| 2 | `strongarm` | hero | G | 10 | P1 | `storm-herald` | closure · hem |
| 3 | `exo-frame` | hero | O | 8 | P2 | `astronaut` | closure · volume |
| 4 | `shadow-agent` | hero | G | 10 | P1 | `caped-hero` | closure · shoulder |
| 5 | `ranger` | hero | G | 10 | P2 | `shadow-agent` | closure · hem |
| 6 | `sky-glider` | hero | G | 10 | P1 | `bee` | shoulder · volume |
| 7 | `chiton` | Greek | G | 10 | P1 | `wizard` | shoulder · volume |
| 8 | `peplos` | Greek | G | 10 | P2 | `chiton` | shoulder · closure |
| 9 | `winged-messenger` | Greek | G | 10 | P1 | `chiton` | shoulder · hem |
| 10 | `hoplite` | Greek | O | 8 | P1 | `knight` | shoulder · volume |
| 11 | `amazon` | Greek | G | 10 | P2 | `hoplite` | shoulder · hem |
| 12 | `satyr` | Greek | G | 10 | P2 | `dino` | volume · closure |
| 13 | `gorgon` | Greek | O | 8 | P2 | `mermaid` | volume · shoulder |
| 14 | `apron-dress` | Norse | G | 10 | P1 | `chiton` | shoulder · hem |
| 15 | `valkyrie` | Norse | O | 8 | P1 | `knight` | shoulder · hem |
| 16 | `berserker` | Norse | G | 10 | P1 | `strongarm` | volume · closure |
| 17 | `jarl` | Norse | G | 10 | P2 | `berserker` | closure · shoulder |
| 18 | `seeress` | Norse | O | 8 | P2 | `wizard` | closure · volume |
| 19 | `frost-giant` | Norse | G | 10 | P2 | `berserker` | volume · hem |
| 20 | `pharaonic` | Egyptian | G | 10 | P1 | `hoplite` | volume · shoulder |
| 21 | `mummy` | Egyptian | G | 10 | P1 | `astronaut` | closure · volume |

**16 Growing × 10 bundles = 160 files. 5 Older × 8 bundles = 40 files. Costume total: 200 files.**

---

## 5. Companion `headwear` families — 6

These are how the face rule is *paid for* rather than just obeyed. They live in the shared
accessory pools at `src/assets/accessories/<class>/headwear/<family>.svg`, authored once for each
of the three head-size classes (`toddler`, `teen`, `adult`) and mapped onto the target head by a
uniform circle-to-circle transform. Per `docs/FAMILIES.md` §4 the headwear pool is owned by the
**toddler/female, teen/female and adult/female** agents, two files each per family.

**Keep every one of these within about 1.3 head radii of the head centre** — the transform scales
by the head ratio, not the shoulder ratio, and anything that drapes toward the shoulders lands
wrong on newborn and toddler.

**`headwear` draws at z 100, above the face.** These must therefore be open-faced too. No nasal
bar, no cheek plate over the cheekbone, no visor, no beak, no muzzle.

| Family | Silhouette | Covers hair | Pairs with |
|---|---|---|---|
| `laurel-wreath` | Two sprays of paired pointed leaves sweeping back from the brow and meeting over each temple, open at the back of the crown. | no | `chiton` · `peplos` · `winged-messenger` |
| `attic-helm` | Open-faced rounded bronze cap with hinged cheek pieces swung **up** and back against the sides, and a transverse crest running ear to ear over the crown. | partial | `hoplite` · `amazon` |
| `spangen-cap` | Rounded iron cap of four riveted panels under a plain brow band, no nasal and no guard of any kind. | partial | `valkyrie` · `jarl` · `berserker` |
| `serpent-locks` | A dense mass of short thick snakes radiating outward from the crown in place of hair, heads at the tips, irregular lobed contour. | **yes** | `gorgon` |
| `beast-hood` | An animal skin pushed back off the face, the beast's upper snout and rounded ears sitting on the crown like a cap with the open jaw arching above the brow. | **yes** | `berserker` · `satyr` |
| `nemes` | Striped headcloth over the crown with two **short** lappets falling in front of the ears and a bound tail behind. | **yes** | `pharaonic` |

`serpent-locks`, `beast-hood` and `nemes` declare `data-hides="hair"`; the other three declare
`data-hides=""`. All three of the hiding families may declare `hair1`/`hair2` themselves and draw a
little escaping hair at the temples or nape, per `docs/FAMILIES.md` §4.2.

**Explicitly not proposed, and why:**

- **Corinthian helmet** — covers the face in both slots. `attic-helm` is the period-correct
  alternative, and the sources say the Corinthian was superseded by open types anyway.
- **Gjermundbu helmet with its spectacle guard** — covers eyes and nose. `spangen-cap` is the same
  helmet with the guard omitted.
- **Winged or horned helm** — 19th-century Romantic invention, and the winged version is a
  trademark tell besides.
- **Petasos** (Hermes' hat) — the existing `sun-hat` already occupies "wide soft brim, shallow
  crown" and a second one would fail the headwear silhouette test.
- **Phrygian cap** — too close to the existing `beanie` and `bandana` outlines.
- **Broad-brimmed wanderer's hat** (Odin's *Síðhǫttr*) — too close to `sun-hat` on brim, and it
  would differ only on crown height, which is one axis.
- **Völva's lambskin hood** — too close to the existing `bonnet`.

**6 families × 3 head-size classes = 18 files**, split 6 to each of the toddler/female,
teen/female and adult/female agents.

**Optional, not counted in the totals:** two `necklace` pool families would serve several of these
cheaply — `torc` (a rigid open neck ring with a gap at the front and shaped terminals, per
[Torc](https://en.wikipedia.org/wiki/Torc); serves `jarl`, `berserker`, and a future Celtic family)
and `broad-collar` (the Egyptian *usekh* as a standalone accessory, which would let any costume
borrow the pharaonic read). That would be 2 × 3 = 6 further files. Decide separately.

---

## 6. Rejected concepts

Recorded so nobody re-proposes them.

### Rejected on trademark grounds

| Concept | Why |
|---|---|
| Any chest **lightning bolt** speedster | Claimed by at least three DC and Marvel characters; it is the first mark anyone reaches for. `speedster` carries calf vanes and a raked seam instead. |
| **Arc-reactor** / glowing chest disc tech suit | Iron Man, unambiguously. `exo-frame` has a plain bevelled chest plate. |
| **Shield-bearing patriot** — round shield, star, blue/white/red | Captain America. There is no generic version of this; the shield *is* the character. Dropped entirely; not softened. |
| **Cowled night vigilante** with scalloped cape hem and pointed ears | Batman — and the cowl violates the face rule twice over. `shadow-agent` keeps the asymmetry and drops all of it. |
| **`deep-diver` / aquatic monarch** — scale-mail top, finned forearms, trident | Aquaman and Namor between them own this silhouette, and stripping it back to something safe left a costume that duplicated `mermaid` on hem and `dragon` on volume. Two problems, one deletion. |
| **`cosmic-sentinel`** — bodysuit under a rigid disc mantle, starfield chest | Green Lantern and Silver Surfer sit either side of it, its distinguishing element was a chest graphic, and it collided with `storm-herald` on the mantle. Cut. |
| **Norse `thunder-god`, in any form** | Already stripped from this catalogue once. Do not resurrect it under a new key. A hammer, a winged helm, a red cape or a row of circular chest discs are all disqualifying individually. |
| **Norse `trickster` / Loki** | The mythological Loki has no attested costume at all. The only version anyone would recognise is Marvel's horned green-and-gold, which is precisely what we cannot draw. Nothing left to build on. |
| **`allfather` / Odin the wanderer** | Almost his entire iconography is head-mounted (broad hat, hood, one eye) or facial hair, and this project has no facial-hair slot. What remains — a shaggy cloak — failed the two-axis test against both `seeress` and `jarl`. |

### Rejected on cultural-sensitivity grounds

| Concept | Why |
|---|---|
| **Japanese yōkai — `tengu`** | The tengu's entire visual identity below the head *is the yamabushi's vestments* — the *tokin* cap, the *yuigesa* pom-pom stole, the robe, the single-toothed geta ([Tengu](https://en.wikipedia.org/wiki/Tengu)). Yamabushi are living Shugendō practitioners, so that is religious vesture, not folklore dress. Strip it out and the tengu is a beak and wings, and the beak is a face covering we cannot draw. Both halves fail. |
| **Japanese yōkai — `kitsune` and others** | Same problem one step removed: the fox is Inari's messenger in a living Shinto tradition, and the crossed robe that would carry it is everyday Japanese dress, which `docs/FAMILIES.md` §0.3 puts in `top`/`onepiece` under its endonym, never in `costume`. If this is ever revisited it must be gated on the cultural-consultant review that `docs/CATALOG-RESEARCH.md` §A.11 requires. |
| **Mesoamerican — Aztec `eagle-warrior` / `jaguar-warrior`** | The sources are explicit that this regalia was religious: "the eagles were soldiers of the Sun, for the eagle was the symbol of the Sun", and the suit was a sacred vestment as much as armour ([Eagle warrior](https://en.wikipedia.org/wiki/Eagle_warrior)). Sacred military regalia of a colonised people with living descendant communities is the exact "war bonnet" failure mode named in §A.11. Out, and not to be softened into a "generic feathered warrior" either — that is the same costume with the honesty removed. |

### Rejected on silhouette or engineering grounds

| Concept | Why |
|---|---|
| **Slavic `rusalka`** | Public domain and not a living religion, but there is nothing here to draw. The attested depiction is a nude maiden with loose hair; the familiar white-shift-and-wreath version is 19th-century Romantic painting, and once you remove the hair (`hair` slot) and the wreath (`headwear`), what is left is a plain sleeveless shift that duplicates `chiton` on three axes. ([Rusalka](https://en.wikipedia.org/wiki/Rusalka)) |
| **Greek `centaur`** | Four legs. The bodies in `specs/bodies/*.json` are bipedal and there is no runtime fitting. Not possible in this slot at any effort level. |
| **Greek `minotaur`** | Classical depiction is a human body with a bull's head and tail ([Minotaur](https://en.wikipedia.org/wiki/Minotaur)) — so the entire identity is in the head, which we cannot draw, and the body is bare. `beast-hood` in the headwear pool plus any existing costume gets 80% of the read for zero new costume files. |
| **Greek `himation`** | A drape over a drape. It satisfies the letter of the two-axis rule against `chiton` but would have been the third long draped column in one slot, and three of them do not read apart at 64px. The single-shoulder drape idea survives inside `winged-messenger` instead. |
| **Greek `oracle` / Pythia** | The sourced description is "a short plain white dress" plus laurel and a tripod ([Pythia](https://en.wikipedia.org/wiki/Pythia)). The dress collides with `peplos`, the laurel is already a headwear companion, and the tripod is scenery. |
| **Norse `shieldmaiden`** as a separate family from `valkyrie` | They would be the same garment with and without mail. One axis. Merged into `valkyrie`. |
| **Celtic `celtic-warrior`** | ⚠ **Deferred, not rejected.** I could verify the torc ([Torc](https://en.wikipedia.org/wiki/Torc): rigid open neck ring, a warrior's attribute from the late 3rd century BC, worn by the Dying Gaul and by Cernunnos on the Gundestrup cauldron) but **could not verify the léine, the *brat* cloak, the penannular brooch or checked/plaid wool** from any source available in this session. Everything I would draw beyond the torc would be invention presented as reconstruction. Propose it again when it can be sourced properly; in the meantime the `torc` necklace family in §5 delivers most of the value for one-tenth the files. |

---

## 7. Counts

### 7.1 Why newborn authors none of this

`docs/FAMILIES.md` §1 is explicit that a newborn bundle is deliberately much smaller than an adult
one because a real newborn wardrobe is one-piece-dominated, and that "giving a newborn twenty-two
tops would rebuild the current problem in a new shape". The newborn costume roster is five Core
families and should stay that way.

There is a second, harder reason. The newborn torso is 88×86 against the adult's 120×160 — at a
64px thumbnail that is about **14 device pixels of torso height**. Pteruges strips, mail, lamellar,
plate segmentation, tablet-woven trim, bandage overlaps and snake belts all need more than that.
A newborn `hoplite` would be a rounded rectangle with a smear on it.

Newborn keeps `web-runner`, `storm-herald`, `caped-hero`, `dino`, `astronaut`. Costume roster
unchanged at 5.

### 7.2 Per bundle

| Bundle | Costume now | New costume | Costume after | Headwear pool | Total new for this agent |
|---|---|---|---|---|---|
| newborn/female | 5 | **0** | 5 | — | **0** |
| newborn/male | 5 | **0** | 5 | — | **0** |
| toddler/female | 13 | **16** | 29 | 6 | **22** |
| toddler/male | 13 | **16** | 29 | — | **16** |
| teen/female | 13 | **21** | 34 | 6 | **27** |
| teen/male | 13 | **21** | 34 | — | **21** |
| adult/female | 13 | **21** | 34 | 6 | **27** |
| adult/male | 13 | **21** | 34 | — | **21** |
| midage/female | 13 | **21** | 34 | — | **21** |
| midage/male | 13 | **21** | 34 | — | **21** |
| elder/female | 13 | **21** | 34 | — | **21** |
| elder/male | 13 | **21** | 34 | — | **21** |
| **Total** | | **200** | | **18** | **218** |

Toddler gets 16 because the five Older families (`exo-frame`, `hoplite`, `valkyrie`, `gorgon`,
`seeress`) skip it. Teen through elder get all 21.

### 7.3 Totals by theme

| Theme | Families | Growing (×10) | Older (×8) | Files |
|---|---|---|---|---|
| Original superhero archetypes | 6 | 5 | 1 | **58** |
| Greek mythology and dress | 7 | 5 | 2 | **66** |
| Norse mythology and dress | 6 | 4 | 2 | **56** |
| Egyptian | 2 | 2 | 0 | **20** |
| **Costume subtotal** | **21** | **16** | **5** | **200** |
| Companion headwear (×3 classes) | 6 | — | — | **18** |
| **Grand total** | **27** | | | **218** |

Optional `necklace` additions (`torc`, `broad-collar`) would add 6 more, to 224. Not counted above.

### 7.4 Phasing

If 218 is too much at once, this splits cleanly. Phase 1 is chosen so that every theme ships with
at least three families and the tray never looks lopsided.

**Phase 1 — 12 costume families + 5 headwear = 131 files**
`speedster` · `strongarm` · `shadow-agent` · `sky-glider` · `chiton` · `winged-messenger` ·
`hoplite` · `apron-dress` · `valkyrie` · `berserker` · `pharaonic` · `mummy`
plus `laurel-wreath` · `attic-helm` · `spangen-cap` · `beast-hood` · `nemes`.
(10 Growing × 10 = 100, 2 Older × 8 = 16, 5 headwear × 3 = 15.)

**Phase 2 — 9 costume families + 1 headwear = 87 files**
`exo-frame` · `ranger` · `peplos` · `amazon` · `satyr` · `gorgon` · `jarl` · `seeress` ·
`frost-giant` plus `serpent-locks`.
(6 Growing × 10 = 60, 3 Older × 8 = 24, 1 headwear × 3 = 3.)

Note that `serpent-locks` and `gorgon` must ship together — neither works without the other.
`beast-hood` in Phase 1 serves `berserker`; it also serves `satyr` when that lands in Phase 2.

---

## 8. Checklist for the authoring agent

Before you draw:

1. Read `docs/ASSET_CONTRACT.md` end to end. The gradient-inside-hair-part-groups trap does not
   apply to costumes, but everything else does.
2. Copy your bundle's ceiling `y` from the table in §0.3 into an XML comment at the top of your
   file. Nothing you draw goes above it.
3. Write your **two axes** in that same comment, per the contract's "Silhouette first" section.
   If you cannot name two against your nearest sibling in this bundle, you are about to draw a
   duplicate.
4. Check your fallback triple against the banned pairings in §0.2. **Do this before you pick
   colours, not after.**
5. Every costume declares `data-slot="costume"`, `data-layer="costume"`,
   `data-hides="top,bottom,shoes"`, and lists every variable it uses in `data-colors` with the
   dominant one first.
6. Use at least two of the five surface tools. On this expansion the highest-value ones are
   **trim and edge treatment** (tablet weaving, pteruges, pleat bands, bandage overlaps, laurel)
   and **panel blocking** (cuirass against pteruges, overdress against underdress, shell against
   joint). **Applied graphics are effectively banned in this slot** — a centred chest motif on a
   heroic costume is an emblem, and an emblem is the trademark problem.
7. Draw the file, then look at it at 64px next to every other costume in your bundle on
   `/?dev=sheet`. If any two read the same, redraw against two axes.

Before you commit:

```bash
npx vitest run src/catalog
npm run dev            # then open /?dev=sheet and select your bundle
```

---

## 9. Sources

Greek dress and iconography:
[Ancient Greek dress](https://en.wikipedia.org/wiki/Ancient_Greek_dress) ·
[Chiton](https://en.wikipedia.org/wiki/Chiton_(garment)) ·
[Himation](https://en.wikipedia.org/wiki/Himation) ·
[Chlamys](https://en.wikipedia.org/wiki/Chlamys) ·
[Hoplite](https://en.wikipedia.org/wiki/Hoplite) ·
[Aegis](https://en.wikipedia.org/wiki/Aegis) ·
[Gorgon](https://en.wikipedia.org/wiki/Gorgon) ·
[Satyr](https://en.wikipedia.org/wiki/Satyr) ·
[Talaria](https://en.wikipedia.org/wiki/Talaria) ·
[Laurel wreath](https://en.wikipedia.org/wiki/Laurel_wreath) ·
[Pythia](https://en.wikipedia.org/wiki/Pythia) ·
[Minotaur](https://en.wikipedia.org/wiki/Minotaur) ·
[Amazons](https://en.wikipedia.org/wiki/Amazons)

Norse dress, arms and figures:
[Hurstwic — Clothing in the Viking Age](http://www.hurstwic.org/history/articles/daily_living/text/clothing.htm) ·
[Viking Age arms and armour](https://en.wikipedia.org/wiki/Viking_Age_arms_and_armour) ·
[Valkyrie](https://en.wikipedia.org/wiki/Valkyrie) ·
[Berserker](https://en.wikipedia.org/wiki/Berserker) ·
[Völva](https://en.wikipedia.org/wiki/V%C3%B6lva) ·
[Odin](https://en.wikipedia.org/wiki/Odin) ·
[List of names of Odin](https://en.wikipedia.org/wiki/List_of_names_of_Odin) ·
[Jötunn](https://en.wikipedia.org/wiki/J%C3%B6tunn)

Superhero genre and IP:
[Superhero](https://en.wikipedia.org/wiki/Superhero)

Other traditions considered:
[Clothing in ancient Egypt](https://en.wikipedia.org/wiki/Clothing_in_ancient_Egypt) ·
[Tengu](https://en.wikipedia.org/wiki/Tengu) ·
[Eagle warrior](https://en.wikipedia.org/wiki/Eagle_warrior) ·
[Rusalka](https://en.wikipedia.org/wiki/Rusalka) ·
[Torc](https://en.wikipedia.org/wiki/Torc)

Project documents this proposal depends on: `docs/ASSET_CONTRACT.md`, `docs/FAMILIES.md` §0.2,
§0.3, §1, §2.8, §3 and §4, and `docs/CATALOG-RESEARCH.md` §A.10, §A.11, §B.6 and §B.7.

**⚠ Unverified in this session, flagged in place above:** the "Scythian" trousered Amazon (§1.1,
§3.2 `amazon`); the whole `frost-giant` rime-and-icicle design, which rests on the single word
*hrímþurs* (§3.3); Celtic dress beyond the torc (§6); and the five-signal genre analysis in §1.3,
which is my inference and not research. Do not cite any of those as sourced.
