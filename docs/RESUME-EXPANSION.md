# Resume: art expansion wave 2

The expansion round that added beards, de-gendering, myth/hero costumes, comedy and
formalwear. Five bundles were finished in the first session; **toddler/male is now 90% done**
and four bundles are untouched. This note is the handoff — everything needed is on disk.

**Work in progress lives on the branch `art/expansion-wave2-remaining`, not on `main`.**
Seven commits, one per category. `main` is unchanged.

## State

`main` is green and so is the branch: 4258 tests pass, `npx tsc --noEmit` clean, working tree
clean apart from an unrelated one-line `package.json` change (`dev: vite --host`) that predates
this work and has deliberately not been committed.

Nothing is half-applied. Every unfinished bundle is complete and correct at the *previous*
roster, so the app works today; they are simply missing this round's families.

| Bundle | Files now | Target | Remaining |
|---|---|---|---|
| newborn/female | 73 | 73 | **0 — done by design** |
| newborn/male | 73 | 73 | **0 — done by design** |
| toddler/female | 192 | 192 | 0 ✅ |
| teen/female | 225 | 225 | 0 ✅ |
| teen/male | 225 | 225 | 0 ✅ |
| adult/female | 224 | 224 | 0 ✅ |
| adult/male | 224 | 224 | 0 ✅ |
| **toddler/male** | 173 | 192 | **19 — costume only** |
| **midage/female** | 120 | 224 | **104** |
| **midage/male** | 121 | 224 | **103** |
| **elder/female** | 122 | 226 | **104** |
| **elder/male** | 123 | 226 | **103** |

**433 files remain.** Newborn authors nothing this round on purpose — a real newborn wardrobe is
one-piece dominated, and giving it 22 tops would rebuild the blandness problem in a new shape.

### toddler/male — the 19 that remain

All `costume`. Done: `apron-dress` `chiton` `peplos` `satyr` `berserker` `jarl` `frost-giant`.

Left: `clown` `critter-onesie` `disguise-coat` `food-costume` `harlequin` `inflatable-suit`
`jester` `mime` `mummy` `oversized-suit` `pharaonic` `pierrot` `ranger` `shadow-agent`
`shield-warrior` `sky-glider` `speedster` `strongarm` `winged-messenger`.

## Three corrections to the previous version of this note

Read these before planning the next session; the old note was wrong on all three.

1. **`CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` is not a real Claude Code setting.**
   `.claude/settings.json` sets it to `2000` and two commits (`320999a`, `cfdf7b5`) exist only to
   raise it. No such environment variable exists — it does nothing. The old note's claim that
   "work stopped because the session hit the 200-subagent cap" and that a new session would now
   get further are both resting on a knob connected to nothing. **Do not plan around it, and
   consider deleting the setting.** Whatever ended the first session, this was not the cause and
   raising it is not the fix.

2. **Nothing enforces the bundle rosters.** The old note said `npx vitest run src/catalog` checks
   "per-bundle rosters". It does not. The suite passes green with all 433 files missing.
   `assets.test.ts:46` only asserts that a family which *exists* in two bundles has the same slot
   in both. `ASSET_CONTRACT.md` calls a missing family "a defect, in the same category as a wrong
   `viewBox`", but no test can see one. **Completeness is verifiable only by counting files.**
   A roster test asserting each bundle's directory against `FAMILIES.md` is the single highest
   value thing anyone could add here, and it is still not written.

3. **The `caped-hero` emblem bug is not ahead of us.** The old note warned it "keeps shipping a
   chest emblem in bundle after bundle". `caped-hero` is a Core family that already exists in all
   twelve bundles and appears in **none** of the remaining new-file lists. The costume families
   that do carry explicit do-not-draw lists are `shield-warrior`, `speedster`, `exo-frame`,
   `shadow-agent` and `sky-glider` — see `ASSET_CONTRACT.md`, "Trademark guardrails".

## How to resume

Each remaining bundle's instructions are derivable from three files already in the repo:

- `docs/FAMILIES.md` §3 — the per-bundle section lists that bundle's exact file roster.
- `docs/ASSET_CONTRACT.md` — every binding rule.
- `docs/RESEARCH-GARMENTS.md` §H — the prescribed redraws.

Pair each remaining bundle with its nearest finished sibling as a structural reference:

| Bundle to build | Reference it against |
|---|---|
| toddler/male | `src/assets/catalog/toddler/female/` |
| midage/female | `src/assets/catalog/adult/female/` |
| midage/male | `src/assets/catalog/adult/male/` |
| elder/female | `src/assets/catalog/adult/female/` |
| elder/male | `src/assets/catalog/adult/male/` |

Commit incrementally per category — agents killed mid-round have lost uncommitted work twice.

### The method that worked for toddler/male

Do this first for any bundle, before drawing anything. It is a 10-minute job that prevents
every misfit.

**Read `src/assets/bodies/<stage>/<bodyType>/base.svg` and write down its real drawn
coordinates**, not the JSON anchors. `specs/bodies/*.json` gives anchors; the drawn body differs
by a few pixels, and clarification 2 of the contract is binding — the drawn body is the truth.
For toddler/male the table came out as:

| Landmark | toddler/male | toddler/female (the reference) |
|---|---|---|
| head ellipse | cx200 cy268 rx82 ry78 — **identical** | cx200 cy268 rx82 ry78 |
| ears | (124,272) (276,272) — **identical** | (124,272) (276,272) |
| torso | x150–250, y346–450, corner r26 | x152–248, y346–450, corner r22 |
| arms | x118–150 / x250–282, y352–442 | x126–152 / x248–274, y350–442 |
| hands | r19 at (134,440) (266,440) | r15 at (139,442) (261,442) |
| hips | x162–238 (76u wide) | x158–242 (84u wide) |
| legs | x170–198 / x202–230, y482–544 | x169–197 / x203–231, y476–546 |
| feet | x166–200 / x200–234, y544–570 — **identical** | same |
| derived: knee | y513 | y511 |
| derived: mid-thigh | y502 | y504 |
| derived: mid-calf | y522 | y521 |
| costume face ceiling | y ≥ 344 | y ≥ 344 |

Garment fit then falls out of it: sleeves x114–156 and x244–286 (4u overlap on the arm each
side), tops x148–252, waistbands x156–244.

**Recompute the measured comments, never copy them.** Several files carry arithmetic in their
header comments that is load-bearing for the 40-unit floor argument, and the numbers change with
the body:

- `hoop-skirt` and `ball-gown` state the dome's clearance past the widest point of the body.
  On toddler/female that was 54u and 58u per side against 84u hips; on toddler/male it is 58u
  and 62u against 76u hips.
- `shalwar` states the thigh's clearance — 52u became 56u.
- `bridal-gown` pins its trumpet break to the knee anchor, which moved from y498 to y504.
- `chima` locks its chest band top edge at **y396** so the `jeogori` hem at y404–410 clears it.
  That pair must stay locked together in every bundle. Change one and the pair stops reading.

**Hair is a genuine redraw, not a transfer.** Even where the two head specs in a stage are
byte-identical — and for toddler and for every other stage they are — the finished bundles
redraw. `teen/female` and `teen/male` differ by 64–96 lines for the same family. Match that.

### The hair length trap, restated with the fix

`hair-back` is z10 and the body is z20, so **the back group draws underneath the torso**. Any
length drawn down the centre back renders as literally nothing. The fix the finished bundles use,
and which toddler/male now follows, is to carry the length **forward in the front group**, past
the shoulder line:

- `curtain-long`, `half-up`, `fulani-braids`, `mullet`, `senegalese-twists` — spill the mass past
  the jaw on each side in `data-part="front"`.
- `single-braid` — swings the rope diagonally out to x301, clear of the torso block entirely.

The back group still gets the mass; it just cannot be the thing carrying the read.

## Things every remaining agent must be told

Discovered the expensive way. They are in the contract, but they are the ones that bite:

1. **`hair-back` is z10, under the body at z20.** See above for the fix, not just the warning.
2. **`headwear` is z100, above the face.** Any head covering must leave both eyes visible. A
   bonnet once covered them entirely.
3. **A literal double hyphen inside an XML comment is invalid XML** and breaks the parser. Never
   write one — this includes writing a CSS variable name with its leading dashes in a comment.
4. **`stripes` often still has its boat neck painted on as trim** rather than cut into the
   outline — the contract calls this "the whole bug in one asset".
5. Beards: **teen and up only.** The empty newborn/toddler pool is what makes a bearded infant
   structurally impossible; do not special-case it, just leave it empty. This is why toddler/male
   has no `beard/` directory and must not gain one.
6. **Copy your bundle's costume face ceiling into a comment at the top of every costume file.**
   toddler 344 · teen 192 · adult 148 · midage 160 · elder 182.

## Known backlog, separate from wave 2

- **`randomizer.ts` does not roll beards.** One entry — `{ slot: 'beard', chance: 0.2 }` in the
  `OPTIONAL` list. Deferred until beard art existed; it now does in five bundles, and will be in
  ten once midage and elder land. Still not done.
- **No roster completeness test.** See correction 2 above. This is the big one.
- **15 pre-existing files in `src/assets/accessories/adult/headwear/` exceed the ~74-unit head
  transform budget** (`animal-ears` at 98.6 is the worst). All newly authored pool files are
  compliant. Needs a sweep.
- **Four hair families have latent occlusion** — `locs`, `box-braids`, `long-waves`, `ponytail`
  carry length below y≈208 that the torso and arms hide. Same root cause as item 1; left alone
  rather than re-scoped unilaterally across twelve bundles.
- **The `overlayer` slot is deferred.** Without it no coat or cardigan can be worn *over* a dress
  and `apron` cannot exist. The exact five-step change is in `docs/ASSET_CONTRACT.md`; `tabard`
  is the interim answer.
- **`.claude/settings.json` sets an environment variable that does not exist.** See correction 1.

## Verification, every time

```bash
npx vitest run src/catalog/lint.test.ts src/catalog/silhouette.test.ts src/catalog/parse.test.ts
```

That is the **fast** loop — about 15 seconds, and it caught everything during toddler/male. Run it
per category before committing.

```bash
npx vitest run src/catalog     # full suite, ~115s, almost all of it assets.test.ts
npx tsc --noEmit
npm run dev                    # then /?dev=sheet&stage=<stage>&body=<body>
```

Run the full suite before finishing a bundle, not after every file.

The contact sheet is not optional. Every significant defect in this project — duplicate ids
collapsing colours, cropped backdrops, clicks hitting the wrong character, a 17px toolbar,
misaligned elder hair, a bonnet over both eyes — passed a fully green test suite and was caught
only by looking at the rendered result. **Note that the contact sheet has not yet been run
against the new toddler/male art.**
