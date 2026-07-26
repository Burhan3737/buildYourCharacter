import { describe, expect, it } from 'vitest'
import { namespaceIds } from './namespaceIds'

describe('namespaceIds', () => {
  it('suffixes id attributes', () => {
    expect(namespaceIds('<linearGradient id="a__skin"/>', 'r1'))
      .toBe('<linearGradient id="a__skin-r1"/>')
  })

  it('suffixes url(#…) references so they still resolve', () => {
    expect(namespaceIds('<rect fill="url(#a__skin)"/>', 'r1'))
      .toBe('<rect fill="url(#a__skin-r1)"/>')
  })

  it('rewrites an id and every reference to it consistently', () => {
    const out = namespaceIds(
      '<defs><linearGradient id="g"/></defs><rect fill="url(#g)" stroke="url(#g)"/>',
      'xyz',
    )
    expect(out).toBe(
      '<defs><linearGradient id="g-xyz"/></defs><rect fill="url(#g-xyz)" stroke="url(#g-xyz)"/>',
    )
  })

  it('handles url(#…) with quotes and whitespace', () => {
    expect(namespaceIds('<rect fill="url( #g )"/>', 't')).toContain('#g-t')
    expect(namespaceIds("<rect fill=\"url('#g')\"/>", 't')).toContain('#g-t')
    expect(namespaceIds('<rect fill=\'url("#g")\'/>', 't')).toContain('#g-t')
  })

  it('rewrites href and xlink:href fragment references', () => {
    expect(namespaceIds('<use href="#g"/>', 't')).toBe('<use href="#g-t"/>')
    expect(namespaceIds('<use xlink:href="#g"/>', 't')).toBe('<use xlink:href="#g-t"/>')
  })

  it('leaves non-fragment hrefs alone', () => {
    const src = '<image href="data:image/png;base64,AAA"/>'
    expect(namespaceIds(src, 't')).toBe(src)
  })

  it('leaves classes, including sp-shadow, untouched', () => {
    const src = '<g class="sp-shadow"><rect class="mark-base"/></g>'
    expect(namespaceIds(src, 't')).toBe(src)
  })

  it('never rewrites the global sp-drop filter id', () => {
    // sp-drop is mounted once at document level by ShadowDefs and referenced from CSS.
    // Asset markup never contains it, but if it ever did it must stay global.
    const src = '<g filter="url(#sp-drop)" class="sp-shadow"><rect id="sp-drop"/></g>'
    const out = namespaceIds(src, 'inst1')
    expect(out).toContain('url(#sp-drop)')
    expect(out).toContain('id="sp-drop"')
    expect(out).not.toContain('sp-drop-inst1')
  })

  it('is idempotent per token in the sense that ids stay unique across tokens', () => {
    const src = '<linearGradient id="g"/><rect fill="url(#g)"/>'
    expect(namespaceIds(src, 'a')).not.toBe(namespaceIds(src, 'b'))
  })

  it('returns the markup unchanged when there is nothing to rewrite', () => {
    const src = '<path d="M0 0" fill="var(--c1, #111111)"/>'
    expect(namespaceIds(src, 't')).toBe(src)
  })

  it('does not touch colour literals that look like fragments', () => {
    const src = '<path fill="#111111" stroke="var(--c2, #ABCDEF)"/>'
    expect(namespaceIds(src, 't')).toBe(src)
  })

  it('is a no-op when the token is empty', () => {
    const src = '<linearGradient id="g"/><rect fill="url(#g)"/>'
    expect(namespaceIds(src, '')).toBe(src)
  })

  it('handles single-quoted attribute values', () => {
    expect(namespaceIds("<linearGradient id='g'/>", 't')).toBe("<linearGradient id='g-t'/>")
  })
})
