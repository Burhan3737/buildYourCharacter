import { assetIdFromPath } from './parse'
import { SLOTS } from './types'
import { isLayerName } from './layers'

export interface LintIssue {
  file: string
  rule: 'structure' | 'id-prefix' | 'no-local-filter' | 'no-external' | 'colors'
  message: string
}

/** Provided by the body, never declared by a garment. */
export const SKIN_VARS = ['skin1', 'skin2', 'skin3'] as const

const REQUIRED_ATTRS = ['data-name', 'data-family', 'data-slot', 'data-layer'] as const
const VAR_USE = /var\(\s*--([a-zA-Z0-9_-]+)\s*(,[^)]*)?\)/g

/** Every asset is drawn in this box, bottom-aligned on the ground line at y = 570. */
export const ASSET_VIEW_BOX = '0 0 400 600'
/**
 * Backdrops are the one exception: they are the stage itself, so they are authored at the
 * stage's own coordinate space (`STAGE_W` x `STAGE_H`) and render into it 1:1. Anything else
 * gets cover-cropped, which eats the drawn ground plane.
 */
export const BACKDROP_VIEW_BOX = '0 0 1600 1000'

const isBackdrop = (file: string): boolean => file.replace(/\\/g, '/').includes('/backdrops/')

export function lintAsset(file: string, raw: string): LintIssue[] {
  const issues: LintIssue[] = []
  const id = assetIdFromPath(file)
  const add = (rule: LintIssue['rule'], message: string) => issues.push({ file, rule, message })

  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml')
  if (doc.getElementsByTagName('parsererror').length > 0) {
    add('structure', 'not well-formed XML')
    return issues
  }
  const root = doc.documentElement
  if (root.localName !== 'svg') {
    add('structure', `root is <${root.localName}>, expected <svg>`)
    return issues
  }

  // --- structure -----------------------------------------------------------
  const wantViewBox = isBackdrop(file) ? BACKDROP_VIEW_BOX : ASSET_VIEW_BOX
  if (root.getAttribute('viewBox') !== wantViewBox) {
    add('structure', `viewBox is "${root.getAttribute('viewBox')}", expected "${wantViewBox}"`)
  }
  for (const a of REQUIRED_ATTRS) {
    if (!root.getAttribute(a)) add('structure', `missing required attribute ${a}`)
  }
  const slot = root.getAttribute('data-slot') ?? ''
  if (slot && !(SLOTS as readonly string[]).includes(slot)) {
    add('structure', `unknown data-slot "${slot}"`)
  }
  const layer = root.getAttribute('data-layer') ?? ''
  if (layer && layer !== 'hair' && !isLayerName(layer)) {
    add('structure', `unknown data-layer "${layer}"`)
  }
  if (layer === 'hair') {
    const parts = Array.from(root.children)
      .filter((el) => el.localName === 'g')
      .map((el) => el.getAttribute('data-part'))
    for (const p of ['back', 'front']) {
      if (!parts.includes(p)) add('structure', `hair asset missing <g data-part="${p}">`)
    }
  }

  const all = Array.from(root.querySelectorAll('*'))

  // --- id-prefix -----------------------------------------------------------
  for (const el of all) {
    const elId = el.getAttribute('id')
    if (elId && !elId.startsWith(`${id}__`)) {
      add('id-prefix', `id "${elId}" must start with "${id}__"`)
    }
  }

  // --- no-local-filter -----------------------------------------------------
  for (const el of all) {
    if (el.localName === 'filter') add('no-local-filter', 'assets may not define <filter>')
    if (el.hasAttribute('filter')) {
      add('no-local-filter', 'use class="sp-shadow" instead of a filter attribute')
    }
  }

  // --- no-external ---------------------------------------------------------
  for (const el of all) {
    if (el.localName === 'image') add('no-external', '<image> is not allowed')
    const href = el.getAttribute('href') ?? el.getAttribute('xlink:href') ?? ''
    if (/^(https?:)?\/\//.test(href)) add('no-external', `external reference "${href}"`)
  }

  // --- colors --------------------------------------------------------------
  const declared = new Set(
    (root.getAttribute('data-colors') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  )
  const used = new Set<string>()
  for (const m of raw.matchAll(VAR_USE)) {
    used.add(m[1])
    if (!m[2]) add('colors', `var(--${m[1]}) is missing its fallback value`)
  }
  for (const d of declared) {
    if (!used.has(d)) add('colors', `data-colors declares "${d}" but it is never used`)
  }
  for (const u of used) {
    if (!declared.has(u) && !(SKIN_VARS as readonly string[]).includes(u)) {
      add('colors', `var(--${u}) is used but not listed in data-colors`)
    }
  }

  return issues
}
