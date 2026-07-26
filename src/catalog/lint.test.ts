import { describe, expect, it } from 'vitest'
import { lintAsset } from './lint'

const FILE = '/src/assets/catalog/adult/female/top/hoodie.svg'
const ID = 'adult-female-top-hoodie'

const good = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
  data-name="Hoodie" data-family="hoodie" data-slot="top"
  data-layer="top" data-colors="c1,c2">
  <defs><linearGradient id="${ID}__g1"><stop offset="0" stop-color="#fff"/></linearGradient></defs>
  <g class="sp-shadow">
    <rect x="1" y="2" width="3" height="4" fill="var(--c1, #7E90DC)"/>
    <path d="M0 0" fill="var(--c2, #6B7FD0)"/>
  </g>
</svg>`

const rules = (file: string, raw: string) => lintAsset(file, raw).map((i) => i.rule)

describe('lintAsset', () => {
  it('passes a conforming asset', () => {
    expect(lintAsset(FILE, good)).toEqual([])
  })

  it('rejects a wrong viewBox', () => {
    expect(rules(FILE, good.replace('0 0 400 600', '0 0 512 512'))).toContain('structure')
  })

  it('rejects missing required attributes', () => {
    expect(rules(FILE, good.replace('data-family="hoodie" ', ''))).toContain('structure')
  })

  it('rejects an unprefixed id', () => {
    expect(rules(FILE, good.replace(`${ID}__g1`, 'g1'))).toContain('id-prefix')
  })

  it('names the offending id in the message', () => {
    const issues = lintAsset(FILE, good.replace(`${ID}__g1`, 'g1'))
    expect(issues[0].message).toContain('g1')
  })

  it('rejects a locally defined filter', () => {
    const bad = good.replace('<defs>', '<defs><filter id="x"><feDropShadow/></filter>')
    expect(rules(FILE, bad)).toContain('no-local-filter')
  })

  it('rejects a filter attribute', () => {
    expect(rules(FILE, good.replace('<g class="sp-shadow">', '<g filter="url(#sp-drop)">')))
      .toContain('no-local-filter')
  })

  it('rejects external references', () => {
    const bad = good.replace('</g>', '<image href="https://x.test/a.png"/></g>')
    expect(rules(FILE, bad)).toContain('no-external')
  })

  it('rejects a declared colour that is never used', () => {
    expect(rules(FILE, good.replace('data-colors="c1,c2"', 'data-colors="c1,c2,c3"')))
      .toContain('colors')
  })

  it('rejects a used colour variable that is never declared', () => {
    expect(rules(FILE, good.replace('data-colors="c1,c2"', 'data-colors="c1"')))
      .toContain('colors')
  })

  it('allows skin variables without declaring them', () => {
    const body = good.replace('fill="var(--c2, #6B7FD0)"', 'fill="var(--skin2, #EDB490)"')
                     .replace('data-colors="c1,c2"', 'data-colors="c1"')
    expect(lintAsset(FILE, body)).toEqual([])
  })

  it('requires a fallback in every var() paint', () => {
    expect(rules(FILE, good.replace('var(--c1, #7E90DC)', 'var(--c1)'))).toContain('colors')
  })

  it('reports malformed XML as a single structure issue', () => {
    const issues = lintAsset(FILE, '<svg><path></svg>')
    expect(issues).toHaveLength(1)
    expect(issues[0].rule).toBe('structure')
  })
})
