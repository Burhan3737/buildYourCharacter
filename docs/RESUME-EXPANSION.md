# Resume: art expansion wave 2

The expansion round that added beards, de-gendering, myth/hero costumes, comedy and
formalwear is **half complete**. Five bundles are done; five are not. This note is the
handoff — everything needed is already on disk, so a fresh session loses nothing.

Work stopped because the session hit the 200-subagent cap, not because anything failed.
`.claude/settings.json` now sets `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION=600`, which takes
effect in a **new session**.

## State

`main` is green: 4258 tests pass, `npx tsc --noEmit` clean, `npm run build` clean, working
tree clean, everything pushed. Nothing is half-applied — the five unexpanded bundles are
complete and correct at the *previous* roster, so the app works today. They are simply
missing this round's families, which most visibly means **no beards on midage or elder
characters**.

| Bundle | Files now | Target | Remaining |
|---|---|---|---|
| newborn/female | 73 | 73 | **0 — done by design** |
| newborn/male | 73 | 73 | **0 — done by design** |
| toddler/female | 192 | 192 | 0 ✅ |
| teen/female | 225 | 225 | 0 ✅ |
| teen/male | 225 | 225 | 0 ✅ |
| adult/female | 224 | 224 | 0 ✅ |
| adult/male | 224 | 224 | 0 ✅ |
| **toddler/male** | 117 | 192 | **~77** |
| **midage/female** | 120 | 224 | **~104** |
| **midage/male** | 121 | 224 | **~103** |
| **elder/female** | 122 | 226 | **~104** |
| **elder/male** | 123 | 226 | **~103** |

**~491 files remain**, across five bundles.

Newborn authors nothing this round on purpose — a real newborn wardrobe is one-piece
dominated, and giving it 22 tops would rebuild the blandness problem in a new shape.

## How to resume

Start a new session and dispatch one agent per remaining bundle. Each agent's complete
instructions are derivable from three files already in the repo:

- `docs/FAMILIES.md` — the per-bundle section lists that bundle's exact file roster.
- `docs/ASSET_CONTRACT.md` — every binding rule.
- `docs/RESEARCH-GARMENTS.md` §H — the prescribed redraws.

Use the five completed bundles as the quality bar. Pair each remaining bundle with its
nearest finished sibling as a structural reference:

| Bundle to build | Reference it against |
|---|---|
| toddler/male | `src/assets/catalog/toddler/female/` |
| midage/female | `src/assets/catalog/adult/female/` |
| midage/male | `src/assets/catalog/adult/male/` |
| elder/female | `src/assets/catalog/adult/female/` |
| elder/male | `src/assets/catalog/adult/male/` |

Cap each bundle agent at 4 concurrent subagents, and tell them to **commit incrementally per
category** — agents killed mid-round have lost uncommitted work twice.

## Things every remaining agent must be told

These were each discovered the expensive way by an agent that already finished. They are in
the contract, but they are the ones that actually bite:

1. **`hair-back` is z 10, under the body at z 20.** A plait or ponytail drawn centre-back
   renders as literally nothing. Carry long hair forward over a shoulder. Several families
   were lost to this and had to be redrawn.
2. **`caped-hero` keeps shipping a chest emblem on a red-and-blue body**, in bundle after
   bundle, despite its own description saying "plain chest, no insignia of any kind". Four
   separate agents found and fixed it independently. Check it explicitly.
3. **`headwear` is z 100, above the face.** Any head covering must leave both eyes visible.
   A bonnet once covered them entirely.
4. **A literal `--` inside an XML comment is invalid XML** and breaks the parser. Never write
   `--c2` in a comment.
5. **`stripes` often still has its boat neck painted on as trim** rather than cut into the
   outline — the contract calls this "the whole bug in one asset".
6. Beards: **teen and up only**. The empty newborn/toddler pool is what makes a bearded
   infant structurally impossible; do not special-case it, just leave it empty.

## Known backlog, separate from wave 2

- **`randomizer.ts` does not roll beards.** One entry — `{ slot: 'beard', chance: 0.2 }` in
  the `OPTIONAL` list. Deliberately deferred until beard art existed; it now does, in five
  bundles.
- **15 pre-existing files in `src/assets/accessories/adult/headwear/` exceed the ~74-unit head
  transform budget** (`animal-ears` at 98.6 is the worst). All newly authored pool files are
  compliant. Needs a sweep.
- **Four hair families have latent occlusion** — `locs`, `box-braids`, `long-waves`,
  `ponytail` carry length below y≈208 that the torso and arms hide. Same root cause as item 1
  above; left alone rather than re-scoped unilaterally across twelve bundles.
- **The `overlayer` slot is deferred.** Without it no coat or cardigan can be worn *over* a
  dress and `apron` cannot exist. The exact five-step change is recorded in
  `docs/ASSET_CONTRACT.md`; `tabard` is the interim answer.

## Verification, every time

```bash
npx vitest run src/catalog     # lint, parse, silhouette, per-bundle rosters
npx tsc --noEmit
npm run dev                    # then /?dev=sheet&stage=<stage>&body=<body>
```

The contact sheet is not optional. Every significant defect in this project — duplicate ids
collapsing colours, cropped backdrops, clicks hitting the wrong character, a 17px toolbar,
misaligned elder hair, a bonnet over both eyes — passed a fully green test suite and was
caught only by looking at the rendered result.
