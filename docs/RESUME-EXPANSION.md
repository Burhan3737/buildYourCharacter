# Art expansion wave 2 — COMPLETE

All twelve bundles are at their `docs/FAMILIES.md` §3 target. There is no remaining art in this
round. This file is now a record of what was done and a backlog of defects found along the way.

Work lives on the branch `art/expansion-wave2-remaining` (16 commits). `main` is untouched.

## Final state

| Bundle | Files | Target |
|---|---|---|
| newborn/female · newborn/male | 73 · 73 | 73 — 0 new by design |
| toddler/female · toddler/male | 192 · 192 | 192 |
| teen/female · teen/male | 225 · 225 | 225 |
| adult/female · adult/male | 224 · 224 | 224 |
| midage/female · midage/male | 224 · 224 | 224 |
| elder/female · elder/male | 226 · 226 | 226 |

**2,328 catalog files; 2,518 assets in total.** 489 files were authored in this round.

Newborn authors nothing on purpose — a real newborn wardrobe is one-piece dominated, and giving
it 22 tops would rebuild the blandness problem in a new shape.

## Verification performed

```
npx vitest run src/catalog   →  5240 passed (was 4258 before this round)
npx tsc --noEmit             →  clean
npm run build                →  clean (the chunk-size warning is pre-existing)
/?dev=sheet                  →  rendered and inspected for elder/female and midage/female
```

The contact sheet was checked, not skipped. Every costume in `elder/female` renders with the
character's eyes and mouth visible, and `caped-hero` renders plain-chested in both midage
bundles. `single-braid` was confirmed rendering its plait forward over the shoulder — the family
whose `adult/male` counterpart draws it invisibly.

## Three things the previous version of this note got wrong

1. **`CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` is not a real Claude Code setting.**
   `.claude/settings.json` still sets it to `2000` and two commits exist only to raise it. No such
   environment variable exists. The claim that the first session stopped because of a subagent cap
   is unfounded. **Consider deleting the setting.**

2. **Nothing enforces the bundle rosters.** `npx vitest run src/catalog` does not check them. The
   suite was green with 489 files missing. `assets.test.ts:46` only asserts that a family which
   *exists* in two bundles has the same slot in both. Completeness is verifiable only by counting
   files. **A roster test is still the highest-value thing anyone could add here.**

3. **A correction in the last version was itself wrong, and this is the important one.** That
   version claimed the `caped-hero` chest-emblem bug was "behind us" because `caped-hero` is a
   Core family already present everywhere. That reasoning was checked against one bundle and
   generalised. It was false: `midage/female` was drawing a rounded diamond crossed by a bar and
   `midage/male` a four-point star, both in `--c3` dead-centre on the chest, in a family whose
   `adult/female` counterpart carries a comment ending "Do not put a motif back." Both are now
   replaced with the structural suit seams `adult/female` uses. A geometric scan of all nine
   heroic families across all twelve bundles found no others. **The original warning was right.**

## Defects fixed in passing (all pre-existing, none authored this round)

- **`midage/female` and `midage/male` `caped-hero` chest emblems** — see above.
- **`elder/female/costume` was authored to a y174 ceiling** instead of the contract's y182. All
  nine affected files (`astronaut` `bee` `chef` `dragon` `firefighter` `knight` `medic` `mermaid`
  `wizard`) sat 8u above the ceiling and 10u above the drawn jaw at y184, clipping the chin. Six
  stated the wrong constant in their own comments — `knight.svg` read "Nothing is drawn above
  y174" — which is how it would have propagated. Top edges redrawn, hems held in place, all
  comments corrected, all mirroring `clipPath` shapes moved in lockstep.
- **`midage/male/costume/dragon.svg`** had its topmost dorsal crest apex at y152, ten units above
  the ceiling, drawing over the chin. **`chef.svg`** had neckerchief corners at y158.

## Backlog — verified defects NOT fixed

These are outside the scope of this round. Each was found and confirmed while authoring.

**Rendering-correctness**

- **`adult/male/onepiece/sari.svg` draws the Nivi drape mirrored.** Its `data-name` says "Nivi
  Drape" and its comment says "over the left shoulder", but the geometry runs the pallu up to the
  viewer's left, i.e. the wearer's *right*. Verified directly. The midage and elder versions are
  drawn correctly and note the correction.
- **The z10 hair-occlusion bug is still live in the adult bundles.** `adult/male/hair/single-braid`
  draws nine plait lozenges y125–292 entirely in the back group against a shoulder at y156, so
  only the top ~20u ever renders. Same in `adult/male/fulani-braids`, and in `adult/female`'s
  `single-braid`, `fine-thinning` and `hime-cut`. The four families already listed under latent
  occlusion (`locs`, `box-braids`, `long-waves`, `ponytail`) are the same root cause.
- **Art below the ground line (y570):** `adult/male/costume/mummy.svg` trails to y578,
  `seeress.svg`'s boot knobs to y572, `elder/female/costume/mermaid.svg`'s fluke to y573.
- **`adult/male/onepiece/sleep-onesie.svg`'s rib detail is invisible** — it strokes `--c3` over a
  cuff already filled `--c3`, so it vanishes at any recolour. Same class in `sari.svg`'s choli
  gradient (both stops `--c2`).
- **`midage/female/shoes/boots.svg` shaft top is y460, above that body's knee at y461**, making it
  taller than `wellies` and leaving `tall-boots` no room for its own landmark.

**Measurement and spec drift**

- **Header arithmetic that does not match its own geometry:** `adult/male/costume/clown.svg` states
  45u where the drawn ruff gives 74u; `toddler/female/costume/clown.svg` states 53u where it gives
  51u. Copied numbers rot — always re-derive.
- **`adult/male/costume/chiton.svg` draws four pins per arm**; `FAMILIES.md` §2.9 calls for five or
  six, and pin count is the axis separating chiton from peplos.
- **`adult/male/top/tailcoat.svg`'s tail gap is 12u** (~1.3 screen px), below the 40-unit identity
  floor, yet that gap is what `FAMILIES.md` says separates it from `long-coat` at tray size.
- **Sliver-of-skin overlap violations:** `adult/male/top/puff-sleeve-blouse.svg` leaves 10–14u of
  bare torso down both sides; `adult/male/bottom/chima.svg` leaves 4u either side of its band.
- **Same-variable gradient ramps** (both stops `var(--cN, …)` with different hardcoded hexes, which
  go flat on recolour) appear in 128 of 530 `adult/male` gradients.

**Documentation defects**

- **`ASSET_CONTRACT.md` contradicts `silhouette.test.ts` on trim placement.** The contract says
  pattern and trim go *inside* the form's `sp-shadow` group; the test's own comments say trim sits
  *outside* and must not be able to rescue a duplicated silhouette. Both pass today. Pick one.
- **`ASSET_CONTRACT.md` says `top`/`bottom`/`onepiece` have "no face constraint at all."** True for
  face *features* (z60), but the head *shape* is part of the body at z20 and `onepiece` is z45, so
  onepiece art above the chin paints over the skull with eyes drawn on top of it. The adult
  `flare-jumpsuit` halter at y136 and `sleep-onesie` hood roll at y126 both do this.
- **`specs/bodies/*.json` disagrees with the drawn bodies.** The drawn shoulder on midage sits at
  y162, not the y168 the JSON implies. Clarification 2 is right: measure `base.svg`.

**Still open from before**

- `randomizer.ts` does not roll beards — one entry, `{ slot: 'beard', chance: 0.2 }`. Beard art now
  exists in all ten teen-and-up bundles, so the blocker is gone.
- 15 files in `src/assets/accessories/adult/headwear/` exceed the ~74-unit head transform budget
  (`animal-ears` at 98.6 is the worst).
- The `overlayer` slot is deferred; `tabard` is the interim answer.

## Method, for whoever expands this next

**Derive the drawn-coordinate table before drawing anything.** Read
`src/assets/bodies/<stage>/<bodyType>/base.svg` and write down the real shoulder line, torso box,
hip box and width, arm rects, leg rects, foot rects and ground line, then derive knee, mid-thigh
and mid-calf from the leg rect (knee = midpoint; mid-thigh = midpoint of hip-to-knee; mid-calf =
midpoint of knee-to-ankle). Diff it against the reference bundle's body so you know what changed.
This is a ten-minute job that prevents every misfit.

**Recompute measured comments, never copy them.** `hoop-skirt`, `ball-gown`, `shalwar` and
`bustle-gown` state clearances against hip width; `bridal-gown` pins its trumpet break to the knee;
`chima` and `jeogori` are a locked pair whose two y-values must move together. All change with the
body.

**The costume ceiling moves between stages and is the biggest single trap.** toddler 344 · teen 192
· adult 148 · midage 160 · elder 182. Refitting adult art to elder is a 34-unit tightening, and
every single adult reference breaches it. Rebuild the top edge and let depth run downward; do not
lower geometry mechanically.

**Hair is a genuine redraw, not a transfer**, even where head specs are byte-identical.
`teen/female` and `teen/male` differ by 64–96 lines per family.

**If you write a ceiling checker**, note two false-positive sources: `<pattern>` tile coordinates
live in pattern space, not canvas space, so strip `<defs>`; and Bézier control points bound the
curve conservatively but are not on it — `bee.svg` reports y178 against a true curve minimum of
y189. Solve the quadratic before believing a breach.

**If you dispatch agents**, forbid them from spawning their own sub-agents. Six elder agents that
each recursively dispatched children stalled the entire run; the two-agent no-sub-dispatch retry
finished cleanly. Files written before a stall survive, so verify and commit rather than re-run.
