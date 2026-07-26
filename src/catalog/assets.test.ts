import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { join, sep } from 'node:path'
import { lintAsset } from './lint'
import { assetIdFromPath, parseAsset } from './parse'

const ROOT = join(process.cwd(), 'src', 'assets')
const files = globSync('**/*.svg', { cwd: ROOT })
  .map((f) => `/src/assets/${f.split(sep).join('/')}`)

const read = (webPath: string) =>
  readFileSync(join(process.cwd(), webPath.replace(/^\//, '')), 'utf8')

describe('asset catalog', () => {
  it('has at least one asset once Phase 3 begins', () => {
    // Passes trivially while the tree is empty; becomes meaningful as art lands.
    expect(Array.isArray(files)).toBe(true)
  })

  it.each(files)('%s passes lint', (f) => {
    expect(lintAsset(f, read(f))).toEqual([])
  })

  it.each(files)('%s parses', (f) => {
    expect(() => parseAsset(assetIdFromPath(f), read(f))).not.toThrow()
  })

  it('has unique asset ids across the whole tree', () => {
    const ids = files.map(assetIdFromPath)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
  })

  it('names every file after its own data-family', () => {
    const bad: string[] = []
    for (const f of files) {
      if (f.includes('/bodies/') || f.includes('/props/') || f.includes('/backdrops/')) continue
      const a = parseAsset(assetIdFromPath(f), read(f))
      const base = f.split('/').pop()!.replace(/\.svg$/, '')
      if (a.family !== base) bad.push(`${f}: data-family="${a.family}" but filename is "${base}"`)
    }
    expect(bad).toEqual([])
  })

  it('gives every wardrobe family the same slot in every bundle', () => {
    const slotByFamily = new Map<string, string>()
    const conflicts: string[] = []
    for (const f of files) {
      if (!f.includes('/catalog/')) continue
      const a = parseAsset(assetIdFromPath(f), read(f))
      const seen = slotByFamily.get(a.family)
      if (seen && seen !== a.slot) conflicts.push(`${a.family}: ${seen} vs ${a.slot} (${f})`)
      else slotByFamily.set(a.family, a.slot)
    }
    expect(conflicts).toEqual([])
  })
})
