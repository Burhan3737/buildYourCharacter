import { describe, expect, it } from 'vitest'
import { globSync, readFileSync } from 'node:fs'
import { join, sep } from 'node:path'

/**
 * Silhouette variety.
 *
 * `docs/CATALOG-RESEARCH.md` §B.1 measured the problem this file exists to stop: eight
 * `adult/female` tops resolved to three silhouettes because six of them drew the identical
 * torso path, and one of the "families" (`stripes`) was a surface treatment wearing a
 * garment's name.
 *
 * The rule the contract states (`docs/ASSET_CONTRACT.md`, "Silhouette first") is that two
 * families in the same slot must differ on at least two of four silhouette axes. That is a
 * judgement a human or a contact sheet makes. What *this* file enforces is the mechanical
 * floor underneath it: **no two assets in the same (bundle, slot) may be built from the same
 * geometry.** Copy-paste fails, and so does copy-paste-then-inflate-by-4px, which is how the
 * `sweater`/`tee` pair was produced.
 *
 * It compares major forms only — the shapes inside `class="sp-shadow"` groups, which the house
 * style reserves for a garment's major forms. Trim, pattern, pockets and highlights sit outside
 * those groups and therefore cannot rescue a duplicated silhouette. That is deliberate: being
 * able to launder a copied torso by adding a stripe is precisely the failure mode.
 */

const ASSETS = join(process.cwd(), 'src', 'assets')

/**
 * How far two coordinates may differ and still be the same coordinate: 4% of the form's own
 * size, never less than 2px and never more than 6px. Scale-relative because 4px is a nudge on
 * a 170px torso and a redesign on an 18px eye — the same tolerance has to read correctly for
 * both. The upper cap is what catches the `sweater` / `tee` "copy the torso, inflate it by
 * 4px" case that §B.1 of the research measured.
 */
const NUDGE_FRACTION = 0.04
const NUDGE_MIN_PX = 2
const NUDGE_MAX_PX = 6

const tolerance = (box: { x0: number; y0: number; x1: number; y1: number }) => {
  const diagonal = Math.hypot(box.x1 - box.x0, box.y1 - box.y0)
  return Math.min(NUDGE_MAX_PX, Math.max(NUDGE_MIN_PX, NUDGE_FRACTION * diagonal))
}

// ---------------------------------------------------------------------------------------------
// Known duplicates — the redraw backlog, NOT a licence to add more.
// ---------------------------------------------------------------------------------------------

/**
 * Every pair below is a PRE-EXISTING duplicate in the catalogue as authored before the
 * expansion. They are exempted so the suite stays green while the rule binds all new work.
 *
 * **These are defects, not exemptions.** Each pair must be redrawn during the art expansion so
 * that the two assets differ on at least two silhouette axes, and its entry deleted from this
 * list. Nothing may ever be *added* here: a new pair means new art repeated old art, and the
 * fix is to redraw the art, not to widen the allow-list.
 *
 * Keys are `<pathA>|<pathB>` relative to `src/assets/`, both sides sorted lexicographically.
 */
const KNOWN_DUPLICATES: ReadonlySet<string> = new Set([
  // adult/female · bottom, costume and top: all 16 pairs redrawn during the art expansion.

  // adult/male · bottom, costume and top: all 14 pairs redrawn during the art expansion.

  // elder/female · bottom — 3 pair(s): nudged
  'catalog/elder/female/bottom/cargo.svg|catalog/elder/female/bottom/jeans.svg',
  'catalog/elder/female/bottom/cargo.svg|catalog/elder/female/bottom/leggings.svg',
  'catalog/elder/female/bottom/jeans.svg|catalog/elder/female/bottom/leggings.svg',

  // elder/female · costume — 2 pair(s): shared-primary
  'catalog/elder/female/costume/astronaut.svg|catalog/elder/female/costume/spider.svg',
  'catalog/elder/female/costume/astronaut.svg|catalog/elder/female/costume/web-runner.svg',

  // elder/female · top — 3 pair(s): identical, shared-primary
  'catalog/elder/female/top/jersey.svg|catalog/elder/female/top/stripes.svg',
  'catalog/elder/female/top/jersey.svg|catalog/elder/female/top/tee.svg',
  'catalog/elder/female/top/stripes.svg|catalog/elder/female/top/tee.svg',

  // elder/male · bottom — 4 pair(s): nudged
  'catalog/elder/male/bottom/cargo.svg|catalog/elder/male/bottom/leggings.svg',
  'catalog/elder/male/bottom/jeans.svg|catalog/elder/male/bottom/leggings.svg',
  'catalog/elder/male/bottom/jeans.svg|catalog/elder/male/bottom/pleated.svg',
  'catalog/elder/male/bottom/leggings.svg|catalog/elder/male/bottom/pleated.svg',

  // elder/male · costume — 2 pair(s): shared-primary
  'catalog/elder/male/costume/astronaut.svg|catalog/elder/male/costume/spider.svg',
  'catalog/elder/male/costume/astronaut.svg|catalog/elder/male/costume/web-runner.svg',

  // elder/male · top — 12 pair(s): identical, nudged, shared-primary
  'catalog/elder/male/top/button-up.svg|catalog/elder/male/top/hoodie.svg',
  'catalog/elder/male/top/button-up.svg|catalog/elder/male/top/jersey.svg',
  'catalog/elder/male/top/button-up.svg|catalog/elder/male/top/stripes.svg',
  'catalog/elder/male/top/button-up.svg|catalog/elder/male/top/sweater.svg',
  'catalog/elder/male/top/button-up.svg|catalog/elder/male/top/tee.svg',
  'catalog/elder/male/top/hoodie.svg|catalog/elder/male/top/jersey.svg',
  'catalog/elder/male/top/hoodie.svg|catalog/elder/male/top/stripes.svg',
  'catalog/elder/male/top/hoodie.svg|catalog/elder/male/top/tee.svg',
  'catalog/elder/male/top/jersey.svg|catalog/elder/male/top/stripes.svg',
  'catalog/elder/male/top/jersey.svg|catalog/elder/male/top/tee.svg',
  'catalog/elder/male/top/stripes.svg|catalog/elder/male/top/sweater.svg',
  'catalog/elder/male/top/stripes.svg|catalog/elder/male/top/tee.svg',

  // midage/female — RETIRED. All 19 pairs (6 bottom, 2 costume, 11 top) were redrawn
  // during the art expansion and no longer collide, so their entries are gone.

  // midage/male — RETIRED. All 22 pairs (10 bottom, 8 costume, 4 top) were redrawn
  // during the art expansion and no longer collide, so their entries are gone.

  // newborn/female · bottom — 7 pair(s): identical, nudged
  'catalog/newborn/female/bottom/cargo.svg|catalog/newborn/female/bottom/jeans.svg',
  'catalog/newborn/female/bottom/cargo.svg|catalog/newborn/female/bottom/shorts.svg',
  'catalog/newborn/female/bottom/dungarees.svg|catalog/newborn/female/bottom/joggers.svg',
  'catalog/newborn/female/bottom/dungarees.svg|catalog/newborn/female/bottom/leggings.svg',
  'catalog/newborn/female/bottom/jeans.svg|catalog/newborn/female/bottom/shorts.svg',
  'catalog/newborn/female/bottom/joggers.svg|catalog/newborn/female/bottom/leggings.svg',
  'catalog/newborn/female/bottom/pleated.svg|catalog/newborn/female/bottom/skirt.svg',

  // newborn/female · costume — 7 pair(s): identical
  'catalog/newborn/female/costume/astronaut.svg|catalog/newborn/female/costume/dino.svg',
  'catalog/newborn/female/costume/astronaut.svg|catalog/newborn/female/costume/spider.svg',
  'catalog/newborn/female/costume/astronaut.svg|catalog/newborn/female/costume/web-runner.svg',
  'catalog/newborn/female/costume/caped-hero.svg|catalog/newborn/female/costume/storm-herald.svg',
  'catalog/newborn/female/costume/caped-hero.svg|catalog/newborn/female/costume/thunder-god.svg',
  'catalog/newborn/female/costume/dino.svg|catalog/newborn/female/costume/spider.svg',
  'catalog/newborn/female/costume/dino.svg|catalog/newborn/female/costume/web-runner.svg',

  // newborn/female · onepiece — 2 pair(s): nudged, shared-primary
  'catalog/newborn/female/onepiece/jumpsuit.svg|catalog/newborn/female/onepiece/romper.svg',
  'catalog/newborn/female/onepiece/party-dress.svg|catalog/newborn/female/onepiece/sundress.svg',

  // newborn/female · shoes — 5 pair(s): identical, nudged
  'catalog/newborn/female/shoes/dress-shoes.svg|catalog/newborn/female/shoes/sandals.svg',
  'catalog/newborn/female/shoes/dress-shoes.svg|catalog/newborn/female/shoes/slippers.svg',
  'catalog/newborn/female/shoes/dress-shoes.svg|catalog/newborn/female/shoes/sneakers.svg',
  'catalog/newborn/female/shoes/sandals.svg|catalog/newborn/female/shoes/slippers.svg',
  'catalog/newborn/female/shoes/slippers.svg|catalog/newborn/female/shoes/sneakers.svg',

  // newborn/female · top — 17 pair(s): identical, nudged, shared-primary
  'catalog/newborn/female/top/button-up.svg|catalog/newborn/female/top/hoodie.svg',
  'catalog/newborn/female/top/button-up.svg|catalog/newborn/female/top/jersey.svg',
  'catalog/newborn/female/top/button-up.svg|catalog/newborn/female/top/overalls-top.svg',
  'catalog/newborn/female/top/button-up.svg|catalog/newborn/female/top/stripes.svg',
  'catalog/newborn/female/top/button-up.svg|catalog/newborn/female/top/tee.svg',
  'catalog/newborn/female/top/hoodie.svg|catalog/newborn/female/top/jersey.svg',
  'catalog/newborn/female/top/hoodie.svg|catalog/newborn/female/top/overalls-top.svg',
  'catalog/newborn/female/top/hoodie.svg|catalog/newborn/female/top/stripes.svg',
  'catalog/newborn/female/top/hoodie.svg|catalog/newborn/female/top/tee.svg',
  'catalog/newborn/female/top/jersey.svg|catalog/newborn/female/top/overalls-top.svg',
  'catalog/newborn/female/top/jersey.svg|catalog/newborn/female/top/stripes.svg',
  'catalog/newborn/female/top/jersey.svg|catalog/newborn/female/top/sweater.svg',
  'catalog/newborn/female/top/jersey.svg|catalog/newborn/female/top/tee.svg',
  'catalog/newborn/female/top/overalls-top.svg|catalog/newborn/female/top/stripes.svg',
  'catalog/newborn/female/top/overalls-top.svg|catalog/newborn/female/top/tee.svg',
  'catalog/newborn/female/top/stripes.svg|catalog/newborn/female/top/sweater.svg',
  'catalog/newborn/female/top/stripes.svg|catalog/newborn/female/top/tee.svg',

  // newborn/male · bottom — 1 pair(s): identical
  'catalog/newborn/male/bottom/cargo.svg|catalog/newborn/male/bottom/shorts.svg',

  // newborn/male · costume — 13 pair(s): identical, shared-primary
  'catalog/newborn/male/costume/astronaut.svg|catalog/newborn/male/costume/dino.svg',
  'catalog/newborn/male/costume/astronaut.svg|catalog/newborn/male/costume/spider.svg',
  'catalog/newborn/male/costume/astronaut.svg|catalog/newborn/male/costume/storm-herald.svg',
  'catalog/newborn/male/costume/astronaut.svg|catalog/newborn/male/costume/thunder-god.svg',
  'catalog/newborn/male/costume/astronaut.svg|catalog/newborn/male/costume/web-runner.svg',
  'catalog/newborn/male/costume/dino.svg|catalog/newborn/male/costume/spider.svg',
  'catalog/newborn/male/costume/dino.svg|catalog/newborn/male/costume/storm-herald.svg',
  'catalog/newborn/male/costume/dino.svg|catalog/newborn/male/costume/thunder-god.svg',
  'catalog/newborn/male/costume/dino.svg|catalog/newborn/male/costume/web-runner.svg',
  'catalog/newborn/male/costume/spider.svg|catalog/newborn/male/costume/storm-herald.svg',
  'catalog/newborn/male/costume/spider.svg|catalog/newborn/male/costume/thunder-god.svg',
  'catalog/newborn/male/costume/storm-herald.svg|catalog/newborn/male/costume/web-runner.svg',
  'catalog/newborn/male/costume/thunder-god.svg|catalog/newborn/male/costume/web-runner.svg',

  // newborn/male · shoes — 4 pair(s): nudged
  'catalog/newborn/male/shoes/dress-shoes.svg|catalog/newborn/male/shoes/sandals.svg',
  'catalog/newborn/male/shoes/dress-shoes.svg|catalog/newborn/male/shoes/slippers.svg',
  'catalog/newborn/male/shoes/dress-shoes.svg|catalog/newborn/male/shoes/sneakers.svg',
  'catalog/newborn/male/shoes/sandals.svg|catalog/newborn/male/shoes/slippers.svg',

  // newborn/male · top — 10 pair(s): identical, shared-primary
  'catalog/newborn/male/top/button-up.svg|catalog/newborn/male/top/hoodie.svg',
  'catalog/newborn/male/top/button-up.svg|catalog/newborn/male/top/jersey.svg',
  'catalog/newborn/male/top/button-up.svg|catalog/newborn/male/top/stripes.svg',
  'catalog/newborn/male/top/button-up.svg|catalog/newborn/male/top/tee.svg',
  'catalog/newborn/male/top/hoodie.svg|catalog/newborn/male/top/jersey.svg',
  'catalog/newborn/male/top/hoodie.svg|catalog/newborn/male/top/stripes.svg',
  'catalog/newborn/male/top/hoodie.svg|catalog/newborn/male/top/tee.svg',
  'catalog/newborn/male/top/jersey.svg|catalog/newborn/male/top/stripes.svg',
  'catalog/newborn/male/top/jersey.svg|catalog/newborn/male/top/tee.svg',
  'catalog/newborn/male/top/stripes.svg|catalog/newborn/male/top/tee.svg',

  // teen/female · bottom, costume, top — all 11 pairs redrawn during the art expansion:
  // cargo and leggings, dino and web-runner, button-up and stripes all have new major forms.

  // teen/male · bottom, costume, top — all 13 pairs redrawn during the art expansion.

  // toddler/female · bottom — 3 pair(s): nudged, shared-primary
  'catalog/toddler/female/bottom/cargo.svg|catalog/toddler/female/bottom/jeans.svg',
  'catalog/toddler/female/bottom/cargo.svg|catalog/toddler/female/bottom/leggings.svg',
  'catalog/toddler/female/bottom/jeans.svg|catalog/toddler/female/bottom/leggings.svg',

  // toddler/female · costume — 5 pair(s): shared-primary
  'catalog/toddler/female/costume/astronaut.svg|catalog/toddler/female/costume/dino.svg',
  'catalog/toddler/female/costume/astronaut.svg|catalog/toddler/female/costume/spider.svg',
  'catalog/toddler/female/costume/astronaut.svg|catalog/toddler/female/costume/web-runner.svg',
  'catalog/toddler/female/costume/dino.svg|catalog/toddler/female/costume/spider.svg',
  'catalog/toddler/female/costume/dino.svg|catalog/toddler/female/costume/web-runner.svg',

  // toddler/female · top — 15 pair(s): identical, shared-primary
  'catalog/toddler/female/top/button-up.svg|catalog/toddler/female/top/hoodie.svg',
  'catalog/toddler/female/top/button-up.svg|catalog/toddler/female/top/jersey.svg',
  'catalog/toddler/female/top/button-up.svg|catalog/toddler/female/top/overalls-top.svg',
  'catalog/toddler/female/top/button-up.svg|catalog/toddler/female/top/stripes.svg',
  'catalog/toddler/female/top/button-up.svg|catalog/toddler/female/top/tee.svg',
  'catalog/toddler/female/top/hoodie.svg|catalog/toddler/female/top/jersey.svg',
  'catalog/toddler/female/top/hoodie.svg|catalog/toddler/female/top/overalls-top.svg',
  'catalog/toddler/female/top/hoodie.svg|catalog/toddler/female/top/stripes.svg',
  'catalog/toddler/female/top/hoodie.svg|catalog/toddler/female/top/tee.svg',
  'catalog/toddler/female/top/jersey.svg|catalog/toddler/female/top/overalls-top.svg',
  'catalog/toddler/female/top/jersey.svg|catalog/toddler/female/top/stripes.svg',
  'catalog/toddler/female/top/jersey.svg|catalog/toddler/female/top/tee.svg',
  'catalog/toddler/female/top/overalls-top.svg|catalog/toddler/female/top/stripes.svg',
  'catalog/toddler/female/top/overalls-top.svg|catalog/toddler/female/top/tee.svg',
  'catalog/toddler/female/top/stripes.svg|catalog/toddler/female/top/tee.svg',

  // toddler/male · bottom — 6 pair(s): identical, shared-primary
  'catalog/toddler/male/bottom/cargo.svg|catalog/toddler/male/bottom/jeans.svg',
  'catalog/toddler/male/bottom/cargo.svg|catalog/toddler/male/bottom/joggers.svg',
  'catalog/toddler/male/bottom/cargo.svg|catalog/toddler/male/bottom/leggings.svg',
  'catalog/toddler/male/bottom/jeans.svg|catalog/toddler/male/bottom/joggers.svg',
  'catalog/toddler/male/bottom/jeans.svg|catalog/toddler/male/bottom/leggings.svg',
  'catalog/toddler/male/bottom/joggers.svg|catalog/toddler/male/bottom/leggings.svg',

  // toddler/male · costume — 7 pair(s): identical, nudged, shared-primary
  'catalog/toddler/male/costume/astronaut.svg|catalog/toddler/male/costume/dino.svg',
  'catalog/toddler/male/costume/astronaut.svg|catalog/toddler/male/costume/spider.svg',
  'catalog/toddler/male/costume/astronaut.svg|catalog/toddler/male/costume/web-runner.svg',
  'catalog/toddler/male/costume/caped-hero.svg|catalog/toddler/male/costume/storm-herald.svg',
  'catalog/toddler/male/costume/caped-hero.svg|catalog/toddler/male/costume/thunder-god.svg',
  'catalog/toddler/male/costume/dino.svg|catalog/toddler/male/costume/spider.svg',
  'catalog/toddler/male/costume/dino.svg|catalog/toddler/male/costume/web-runner.svg',

  // toddler/male · top — 7 pair(s): identical, shared-primary
  'catalog/toddler/male/top/button-up.svg|catalog/toddler/male/top/jersey.svg',
  'catalog/toddler/male/top/button-up.svg|catalog/toddler/male/top/stripes.svg',
  'catalog/toddler/male/top/button-up.svg|catalog/toddler/male/top/tee.svg',
  'catalog/toddler/male/top/hoodie.svg|catalog/toddler/male/top/sweater.svg',
  'catalog/toddler/male/top/jersey.svg|catalog/toddler/male/top/stripes.svg',
  'catalog/toddler/male/top/jersey.svg|catalog/toddler/male/top/tee.svg',
  'catalog/toddler/male/top/stripes.svg|catalog/toddler/male/top/tee.svg',
])

// ---------------------------------------------------------------------------------------------
// Geometry extraction
// ---------------------------------------------------------------------------------------------

interface Shape {
  /** `path`, `rect`, `circle`, `ellipse`, `polygon`, `polyline`, `line`. */
  kind: string
  /** Kind plus, for paths, the uppercased command-letter sequence. Structure without size. */
  sig: string
  /** Fully normalised geometry — this is what an exact-duplicate check compares. */
  norm: string
  /** Every coordinate in source order, for the "same path, nudged a few px" check. */
  nums: number[]
  box: { x0: number; y0: number; x1: number; y1: number }
  area: number
}

const NUMBER = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi
const round = (n: number) => Math.round(n * 10) / 10

/** Bounding box of a path, using control points — a superset of the true box, but consistent. */
function pathBox(d: string): Shape['box'] | null {
  const toks = d.match(/[a-df-zA-DF-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? []
  let x = 0, y = 0, sx = 0, sy = 0, cmd = ''
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  const hit = (px: number, py: number) => {
    x0 = Math.min(x0, px); y0 = Math.min(y0, py)
    x1 = Math.max(x1, px); y1 = Math.max(y1, py)
  }
  let i = 0
  const n = () => Number(toks[i++])
  while (i < toks.length) {
    if (/^[a-zA-Z]$/.test(toks[i])) { cmd = toks[i]; i++ } else if (!cmd) { i++; continue }
    if (i > toks.length) break
    const rel = cmd === cmd.toLowerCase()
    const c = cmd.toUpperCase()
    if (c === 'Z') { x = sx; y = sy; continue }
    if (c === 'M' || c === 'L' || c === 'T') {
      const a = n(), b = n()
      x = rel ? x + a : a; y = rel ? y + b : b
      if (c === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L' }
      hit(x, y)
    } else if (c === 'H') { const a = n(); x = rel ? x + a : a; hit(x, y) }
    else if (c === 'V') { const a = n(); y = rel ? y + a : a; hit(x, y) }
    else if (c === 'C' || c === 'S' || c === 'Q') {
      const len = c === 'C' ? 6 : 4
      const p: number[] = []
      for (let k = 0; k < len; k++) p.push(n())
      for (let k = 0; k < len; k += 2) hit(rel ? x + p[k] : p[k], rel ? y + p[k + 1] : p[k + 1])
      x = rel ? x + p[len - 2] : p[len - 2]
      y = rel ? y + p[len - 1] : p[len - 1]
    } else if (c === 'A') {
      n(); n(); n(); n(); n()
      const ex = n(), ey = n()
      x = rel ? x + ex : ex; y = rel ? y + ey : ey
      hit(x, y)
    } else { i++ }
  }
  return x0 === Infinity ? null : { x0, y0, x1, y1 }
}

function shapeFrom(el: Element): Shape | null {
  const kind = el.localName
  const num = (name: string, dflt = 0) => {
    const v = el.getAttribute(name)
    return v == null || v === '' ? dflt : Number(v)
  }
  let box: Shape['box'] | null = null
  let nums: number[] = []
  let sig = kind
  let norm = ''

  if (kind === 'path') {
    const d = el.getAttribute('d') ?? ''
    box = pathBox(d)
    sig = `path:${(d.match(/[a-zA-Z]/g) ?? []).join('').toUpperCase()}`
    nums = (d.match(NUMBER) ?? []).map(Number)
    norm = `path ${d.trim().replace(/\s+/g, ' ').replace(NUMBER, (s) => String(round(Number(s))))}`
  } else if (kind === 'rect') {
    const x = num('x'), y = num('y'), w = num('width'), h = num('height')
    box = { x0: x, y0: y, x1: x + w, y1: y + h }
    nums = [x, y, w, h, num('rx', num('ry'))]
    norm = `rect ${nums.map(round).join(' ')}`
  } else if (kind === 'circle') {
    const cx = num('cx'), cy = num('cy'), r = num('r')
    box = { x0: cx - r, y0: cy - r, x1: cx + r, y1: cy + r }
    nums = [cx, cy, r]
    norm = `circle ${nums.map(round).join(' ')}`
  } else if (kind === 'ellipse') {
    const cx = num('cx'), cy = num('cy'), rx = num('rx'), ry = num('ry')
    box = { x0: cx - rx, y0: cy - ry, x1: cx + rx, y1: cy + ry }
    nums = [cx, cy, rx, ry]
    norm = `ellipse ${nums.map(round).join(' ')}`
  } else if (kind === 'polygon' || kind === 'polyline') {
    nums = ((el.getAttribute('points') ?? '').match(NUMBER) ?? []).map(Number)
    if (nums.length < 4) return null
    const xs = nums.filter((_, k) => k % 2 === 0)
    const ys = nums.filter((_, k) => k % 2 === 1)
    box = { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) }
    norm = `${kind} ${nums.map(round).join(' ')}`
  } else if (kind === 'line') {
    nums = [num('x1'), num('y1'), num('x2'), num('y2')]
    box = {
      x0: Math.min(nums[0], nums[2]), y0: Math.min(nums[1], nums[3]),
      x1: Math.max(nums[0], nums[2]), y1: Math.max(nums[1], nums[3]),
    }
    norm = `line ${nums.map(round).join(' ')}`
  } else return null

  if (!box) return null
  const area = (box.x1 - box.x0) * (box.y1 - box.y0)
  if (!(area > 0)) return null
  return { kind, sig, norm, nums, box, area }
}

const SHAPE_TAGS = new Set(['path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line'])
const SKIP_SUBTREES = new Set(['defs', 'clipPath', 'mask', 'pattern', 'symbol', 'marker'])

/**
 * A garment's major forms: filled shapes inside a `class="sp-shadow"` group. The house style
 * puts exactly the major forms there, so this is the silhouette and nothing else.
 * Falls back to all filled shapes, then to all shapes, for assets drawn without a shadow group
 * (single-variable face art, some stroke-only glasses).
 */
function majorForms(raw: string): Shape[] {
  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml')
  if (doc.getElementsByTagName('parsererror').length > 0) return []

  const shadowed: Shape[] = []
  const filled: Shape[] = []
  const every: Shape[] = []

  const walk = (el: Element, inShadow: boolean) => {
    if (SKIP_SUBTREES.has(el.localName)) return
    const shadow = inShadow || (el.getAttribute('class') ?? '').split(/\s+/).includes('sp-shadow')
    if (SHAPE_TAGS.has(el.localName)) {
      const s = shapeFrom(el)
      if (s) {
        every.push(s)
        const fill = el.getAttribute('fill')
        if (fill !== null && fill !== 'none') {
          filled.push(s)
          if (shadow) shadowed.push(s)
        }
      }
    }
    for (const child of Array.from(el.children)) walk(child, shadow)
  }
  walk(doc.documentElement, false)

  const pool = shadowed.length ? shadowed : filled.length ? filled : every
  // Deterministic order: biggest first, ties broken by geometry so the pairing below is stable.
  return [...pool].sort((a, b) => b.area - a.area || a.norm.localeCompare(b.norm))
}

const outlineOf = (shapes: Shape[]) => ({
  x0: Math.min(...shapes.map((s) => s.box.x0)),
  y0: Math.min(...shapes.map((s) => s.box.y0)),
  x1: Math.max(...shapes.map((s) => s.box.x1)),
  y1: Math.max(...shapes.map((s) => s.box.y1)),
})

// ---------------------------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------------------------

/** Same primitive, same command structure, every coordinate inside the scale-aware tolerance. */
function nudgeDistance(a: Shape, b: Shape): number | null {
  if (a.sig !== b.sig || a.nums.length !== b.nums.length || a.nums.length === 0) return null
  let worst = 0
  for (let i = 0; i < a.nums.length; i++) worst = Math.max(worst, Math.abs(a.nums[i] - b.nums[i]))
  return worst <= Math.max(tolerance(a.box), tolerance(b.box)) ? worst : null
}

interface Collision { kind: 'identical' | 'nudged' | 'shared-primary'; detail: string }

function collide(a: Shape[], b: Shape[]): Collision | null {
  if (!a.length || !b.length) return null

  // (a) identical geometry.
  if (a.length === b.length && a.every((s, i) => s.norm === b[i].norm)) {
    return {
      kind: 'identical',
      detail: `every major form is byte-identical (${a.length} shape(s), starting ${a[0].norm})`,
    }
  }

  // (b) the same drawing, nudged — the "copy the torso and inflate it by 4px" case.
  if (a.length === b.length) {
    let worst = 0
    let allNudged = true
    for (let i = 0; i < a.length; i++) {
      const d = nudgeDistance(a[i], b[i])
      if (d === null) { allNudged = false; break }
      worst = Math.max(worst, d)
    }
    if (allNudged) {
      return {
        kind: 'nudged',
        detail: `same ${a.length} major form(s), every coordinate within ${worst}px — this is ` +
          `one drawing scaled/offset, not two garments (e.g. ${a[0].norm} vs ${b[0].norm})`,
      }
    }
  }

  // (c) the primary form is copied and the overall outline is unchanged.
  if (a[0].norm === b[0].norm) {
    const oa = outlineOf(a), ob = outlineOf(b)
    const drift = Math.max(
      Math.abs(oa.x0 - ob.x0), Math.abs(oa.y0 - ob.y0),
      Math.abs(oa.x1 - ob.x1), Math.abs(oa.y1 - ob.y1),
    )
    if (drift <= Math.max(tolerance(oa), tolerance(ob))) {
      return {
        kind: 'shared-primary',
        detail: `the largest major form is byte-identical (${a[0].norm}) and the overall ` +
          `outline agrees to within ${round(drift)}px — the differences are surface only`,
      }
    }
  }

  return null
}

// ---------------------------------------------------------------------------------------------
// The four silhouette axes, per slot (see docs/ASSET_CONTRACT.md, "Silhouette first")
// ---------------------------------------------------------------------------------------------

const AXES: Record<string, string> = {
  top: 'shoulder/sleeve · closure · hem · volume',
  onepiece: 'shoulder/sleeve · closure · hem · volume',
  costume: 'shoulder/sleeve · closure · hem · volume',
  bottom: 'rise · leg length · leg width · hem treatment',
  shoes: 'shaft height · toe shape · fastening · sole depth',
  hair: 'length · volume/texture of the outline · parting · gathering',
  headwear: 'crown shape · brim · coverage · fastening/drape',
  glasses: 'lens shape · lens size · bridge · temple/strap',
  earrings: 'drop length · body shape · scale · attachment',
  necklace: 'drop length · body shape · scale · attachment',
}
const axesFor = (slot: string) => AXES[slot] ?? 'outline · proportion · opening · volume'

/**
 * `eyes`, `brows` and `mouth` are out of scope, and this is a scoping decision rather than a
 * loophole. A garment has a silhouette: an outer boundary that decoration must not be allowed
 * to launder. A face feature does not — an eye's identity *is* its overlay (the lid on
 * `sleepy`, the crease on `hooded`), drawn outside the `sp-shadow` group over a sclera that is
 * deliberately shared with every other eye in the bundle. Comparing major forms would report
 * every well-drawn face set as duplicated. Faces are policed by the contact sheet and by the
 * thumbnail test in the contract instead.
 */
const SILHOUETTE_SLOTS: ReadonlySet<string> = new Set([
  'hair', 'top', 'bottom', 'onepiece', 'shoes', 'costume',
  'glasses', 'headwear', 'earrings', 'necklace',
])

// ---------------------------------------------------------------------------------------------
// Grouping
// ---------------------------------------------------------------------------------------------

interface Entry { path: string; file: string; group: string; slot: string; forms: Shape[] }

const files = globSync('**/*.svg', { cwd: ASSETS }).map((f) => f.split(sep).join('/'))

const entries: Entry[] = []
for (const path of files) {
  const seg = path.split('/')
  let group: string
  let slot: string
  if (seg[0] === 'catalog') {
    // catalog/<stage>/<bodyType>/<slot>/<family>.svg
    group = `${seg[1]}/${seg[2]}`
    slot = seg[3]
  } else if (seg[0] === 'accessories') {
    // accessories/<headSizeClass>/<slot>/<family>.svg
    group = `accessories/${seg[1]}`
    slot = seg[2]
  } else {
    continue // bodies, props and backdrops are not worn options in a slot
  }
  if (!SILHOUETTE_SLOTS.has(slot)) continue
  entries.push({
    path,
    file: seg[seg.length - 1],
    group,
    slot,
    forms: majorForms(readFileSync(join(ASSETS, path), 'utf8')),
  })
}

const byGroup = new Map<string, Entry[]>()
for (const e of entries) {
  const key = `${e.group} · ${e.slot}`
  const list = byGroup.get(key)
  if (list) list.push(e)
  else byGroup.set(key, [e])
}

const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)

// ---------------------------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------------------------

describe('silhouette variety', () => {
  it('found assets to check', () => {
    expect(entries.length).toBeGreaterThan(0)
    expect(entries.every((e) => e.forms.length > 0)).toBe(true)
  })

  it.each([...byGroup.keys()].sort())('%s — no two assets share a silhouette', (key) => {
    const items = byGroup.get(key)!
    const slot = items[0].slot
    const problems: string[] = []

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j]
        if (KNOWN_DUPLICATES.has(pairKey(a.path, b.path))) continue
        const hit = collide(a.forms, b.forms)
        if (!hit) continue
        problems.push(
          `\n  ${a.path}\n  ${b.path}\n` +
          `    ${hit.kind}: ${hit.detail}.\n` +
          `    These two read as one garment in the tray. Redraw one of them so the pair\n` +
          `    differs on AT LEAST TWO of the four silhouette axes for "${slot}":\n` +
          `      ${axesFor(slot)}\n` +
          `    Recolouring, a pattern, trim or an applied graphic does NOT count — those\n` +
          `    separate instances inside a silhouette, they do not create one.\n` +
          `    See docs/ASSET_CONTRACT.md, section "Silhouette first".`,
        )
      }
    }

    expect(problems.join('\n'), `${key}: ${problems.length} duplicated silhouette(s)`).toBe('')
  })

  /**
   * The allow-list must shrink, never linger. As soon as a listed pair is genuinely redrawn,
   * its entry has to go — otherwise the backlog stops being a measurement of the backlog.
   * (Entries naming a file that does not exist are skipped rather than failed, because the
   * `spider` → `web-runner` / `thunder-god` → `storm-herald` renames land separately and both
   * spellings are listed above.)
   */
  it('exempts nothing that is no longer a duplicate', () => {
    const byPath = new Map(entries.map((e) => [e.path, e]))
    const fixed = [...KNOWN_DUPLICATES].filter((k) => {
      const [pa, pb] = k.split('|')
      const a = byPath.get(pa), b = byPath.get(pb)
      return a && b && collide(a.forms, b.forms) === null
    })
    expect(fixed, 'redrawn — delete these entries from KNOWN_DUPLICATES').toEqual([])
  })
})
