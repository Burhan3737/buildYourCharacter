import { describe, expect, it } from 'vitest'
import { assetIdFromPath, parseAsset, AssetParseError } from './parse'

const top = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
  data-name="Hoodie" data-family="hoodie" data-slot="top"
  data-layer="top" data-colors="c1,c2" data-hides="">
  <g class="sp-shadow"><rect id="adult-female-top-hoodie__body" x="1" y="2" width="3" height="4" fill="var(--c1, #7E90DC)"/></g>
  <path d="M0 0" fill="var(--c2, #6B7FD0)"/>
</svg>`

const hair = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
  data-name="Long Waves" data-family="long-waves" data-slot="hair"
  data-layer="hair" data-colors="hair1">
  <g data-part="back"><path d="M1 1" fill="var(--hair1, #43291F)"/></g>
  <g data-part="front"><path d="M2 2" fill="var(--hair1, #43291F)"/></g>
</svg>`

describe('assetIdFromPath', () => {
  it('derives a dash-joined id and drops the catalog segment', () => {
    expect(assetIdFromPath('/src/assets/catalog/adult/female/hair/bob.svg'))
      .toBe('adult-female-hair-bob')
  })
  it('handles the shared accessory and prop pools', () => {
    expect(assetIdFromPath('/src/assets/accessories/adult/glasses/round.svg'))
      .toBe('accessories-adult-glasses-round')
    expect(assetIdFromPath('/src/assets/props/beach-ball.svg')).toBe('props-beach-ball')
  })
})

describe('parseAsset', () => {
  it('reads metadata off the root element', () => {
    const a = parseAsset('adult-female-top-hoodie', top)
    expect(a.name).toBe('Hoodie')
    expect(a.family).toBe('hoodie')
    expect(a.slot).toBe('top')
    expect(a.layer).toBe('top')
    expect(a.colors).toEqual(['c1', 'c2'])
    expect(a.hides).toEqual([])
  })

  it('captures the root children as markup and leaves the <svg> tag behind', () => {
    const a = parseAsset('adult-female-top-hoodie', top)
    expect(a.markup).toContain('sp-shadow')
    expect(a.markup).not.toContain('<svg')
    expect(a.backMarkup).toBe('')
  })

  it('splits hair into back and front markup', () => {
    const a = parseAsset('adult-female-hair-long', hair)
    expect(a.layer).toBe('hair')
    expect(a.backMarkup).toContain('M1 1')
    expect(a.backMarkup).not.toContain('M2 2')
    expect(a.markup).toContain('M2 2')
    expect(a.markup).not.toContain('M1 1')
  })

  it('accepts a hair asset with an empty back group', () => {
    const short = hair.replace('<path d="M1 1" fill="var(--hair1, #43291F)"/>', '')
    const a = parseAsset('adult-female-hair-crop', short)
    expect(a.backMarkup.trim()).toBe('')
    expect(a.markup).toContain('M2 2')
  })

  it('parses a multi-value data-hides list', () => {
    const costume = top
      .replace('data-slot="top"', 'data-slot="costume"')
      .replace('data-layer="top"', 'data-layer="costume"')
      .replace('data-hides=""', 'data-hides="top, bottom ,shoes"')
    expect(parseAsset('x', costume).hides).toEqual(['top', 'bottom', 'shoes'])
  })

  it('throws on malformed XML', () => {
    expect(() => parseAsset('x', '<svg><path></svg>')).toThrow(AssetParseError)
  })

  it('throws on an unknown slot', () => {
    expect(() => parseAsset('x', top.replace('data-slot="top"', 'data-slot="hat"')))
      .toThrow(/unknown data-slot/)
  })

  it('throws on an unknown layer', () => {
    expect(() => parseAsset('x', top.replace('data-layer="top"', 'data-layer="middle"')))
      .toThrow(/unknown data-layer/)
  })

  it('throws when a hair asset is missing its part groups', () => {
    const bad = hair.replace('data-part="front"', 'data-part="middle"')
    expect(() => parseAsset('x', bad)).toThrow(/data-part="front"/)
  })
})
