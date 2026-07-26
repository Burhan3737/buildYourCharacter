import { describe, expect, it } from 'vitest'

describe('toolchain', () => {
  it('runs tests in a DOM environment', () => {
    const el = document.createElement('div')
    el.textContent = 'ok'
    expect(el.textContent).toBe('ok')
  })

  it('has DOMParser and XMLSerializer available for asset parsing', () => {
    expect(typeof DOMParser).toBe('function')
    expect(typeof XMLSerializer).toBe('function')
  })
})
