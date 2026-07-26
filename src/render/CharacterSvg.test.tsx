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

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('eyes', 'body', 'base'),
  '/src/assets/catalog/adult/female/top/tee.svg': svg('top', 'top', 'tee'),
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
