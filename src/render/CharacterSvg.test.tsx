import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { buildCatalog } from '../catalog/build'
import { CharacterSvg } from './CharacterSvg'
import type { Character } from '../catalog/types'

const svg = (slot: string, layer: string, family: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="${family}"
    data-family="${family}" data-slot="${slot}" data-layer="${layer}" data-colors="c1">
    <path class="mark-${family}" d="M0 0" fill="var(--c1, #111111)"/>
  </svg>`

/** A body whose skin is painted through a gradient, exactly like the real assets. */
const gradientBody = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
    data-name="base" data-family="base" data-slot="eyes" data-layer="body" data-colors="">
    <defs>
      <linearGradient id="bodies-adult-female-base__skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--skin1, #F7D2B0)"/>
        <stop offset="1" stop-color="var(--skin2, #E7B892)"/>
      </linearGradient>
    </defs>
    <g class="sp-shadow">
      <rect class="mark-base" x="0" y="0" width="10" height="10"
            fill="url(#bodies-adult-female-base__skin)"/>
    </g>
    <use href="#bodies-adult-female-base__skin"/>
  </svg>`

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
})

const gradientCatalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': gradientBody,
})

const character: Character = {
  id: 'c1', name: 'Mia', stage: 'adult', bodyType: 'female', skinToneId: 'sand',
  slots: { top: { assetId: 'adult-female-top-tee', colors: { c1: '#FF0000' } } },
  createdAt: 0, updatedAt: 0,
}

describe('CharacterSvg', () => {
  it('renders one root svg with the canonical viewBox', () => {
    const { container } = render(<CharacterSvg character={character} catalog={catalog} />)
    const root = container.querySelector('svg')!
    expect(root.getAttribute('viewBox')).toBe('0 0 400 600')
  })

  it('injects each layer’s markup', () => {
    const { container } = render(<CharacterSvg character={character} catalog={catalog} />)
    expect(container.querySelector('.mark-base')).not.toBeNull()
    expect(container.querySelector('.mark-tee')).not.toBeNull()
  })

  it('applies equipped colours as css variables on the layer group', () => {
    const { container } = render(<CharacterSvg character={character} catalog={catalog} />)
    const groups = Array.from(container.querySelectorAll('g'))
    const tee = groups.find((g) => g.querySelector('.mark-tee'))!
    expect(tee.style.getPropertyValue('--c1')).toBe('#FF0000')
    expect(tee.style.getPropertyValue('--skin1')).not.toBe('')
  })

  it('defaults to the high quality class and honours flat', () => {
    const a = render(<CharacterSvg character={character} catalog={catalog} />)
    expect(a.container.querySelector('svg')!.classList.contains('quality-high')).toBe(true)
    const b = render(<CharacterSvg character={character} catalog={catalog} quality="flat" />)
    expect(b.container.querySelector('svg')!.classList.contains('quality-flat')).toBe(true)
  })

  it('exposes an accessible title', () => {
    const { getByTitle } = render(<CharacterSvg character={character} catalog={catalog} />)
    expect(getByTitle('Mia')).toBeInTheDocument()
  })
})

describe('CharacterSvg id isolation between instances', () => {
  const bodyOnly = (id: string, skinToneId: string): Character => ({
    id, name: id, stage: 'adult', bodyType: 'female', skinToneId,
    slots: {}, createdAt: 0, updatedAt: 0,
  })

  const renderTwo = () =>
    render(
      <>
        <CharacterSvg character={bodyOnly('a', 'porcelain')} catalog={gradientCatalog} />
        <CharacterSvg character={bodyOnly('b', 'espresso')} catalog={gradientCatalog} />
      </>,
    )

  it('gives each rendered instance its own gradient ids', () => {
    const { container } = renderTwo()
    const ids = Array.from(container.querySelectorAll('linearGradient'))
      .map((g) => g.getAttribute('id'))
    expect(ids).toHaveLength(2)
    expect(ids[0]).not.toBe(ids[1])
    expect(new Set(ids).size).toBe(2)
  })

  it('resolves every url(#…) reference inside its own instance', () => {
    const { container } = renderTwo()
    const roots = Array.from(container.querySelectorAll('svg'))
    expect(roots).toHaveLength(2)

    for (const root of roots) {
      const rect = root.querySelector('.mark-base')!
      const ref = /url\(#([^)]+)\)/.exec(rect.getAttribute('fill') ?? '')
      expect(ref).not.toBeNull()
      // The referenced gradient must live in THIS instance, not a sibling's.
      expect(root.querySelector(`#${CSS.escape(ref![1])}`)).not.toBeNull()
      // …and it must be unique in the whole document.
      expect(container.querySelectorAll(`#${CSS.escape(ref![1])}`)).toHaveLength(1)
    }
  })

  it('rewrites href references so each instance points at its own defs', () => {
    const { container } = renderTwo()
    const uses = Array.from(container.querySelectorAll('use'))
    expect(uses).toHaveLength(2)
    const hrefs = uses.map((u) => u.getAttribute('href'))
    expect(hrefs[0]).not.toBe(hrefs[1])
    for (const root of Array.from(container.querySelectorAll('svg'))) {
      const href = root.querySelector('use')!.getAttribute('href')!
      expect(root.querySelector(`#${CSS.escape(href.slice(1))}`)).not.toBeNull()
    }
  })

  it('keeps the shared shadow class so the global filter still applies', () => {
    const { container } = renderTwo()
    expect(container.querySelectorAll('.sp-shadow')).toHaveLength(2)
    expect(container.innerHTML).not.toContain('sp-drop')
  })

  it('paints the two instances with different resolved skin gradients', () => {
    const { container } = renderTwo()
    const stops = Array.from(container.querySelectorAll('svg')).map((root) =>
      Array.from(root.querySelectorAll('linearGradient stop'))
        .map((s) => s.getAttribute('stop-color'))
        .join('|'),
    )
    // The declared stops are identical var() references; what must differ is the
    // custom property each instance's group carries, and which gradient each rect
    // actually resolves to.
    expect(stops[0]).toBe(stops[1])
    const groups = Array.from(container.querySelectorAll('svg')).map(
      (root) => root.querySelector('g[style]') as SVGGElement,
    )
    expect(groups[0].style.getPropertyValue('--skin1')).toBe('#FBE3CE')
    expect(groups[1].style.getPropertyValue('--skin1')).toBe('#603A22')

    const fills = Array.from(container.querySelectorAll('.mark-base')).map((r) =>
      r.getAttribute('fill'),
    )
    expect(fills[0]).not.toBe(fills[1])
  })
})
