import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { buildCatalog } from '../../catalog/build'
import type { Character } from '../../catalog/types'
import { SKIN_TONES } from '../../render/skinTones'
import { GARMENT_PALETTE, HAIR_PALETTE } from '../../state/palettes'
import { useAppStore } from '../../state/appStore'
import { StudioScreen } from './StudioScreen'
import { makeCatalog, makeCharacter } from './testCatalog'

const catalog = makeCatalog()

const current = (): Character => useAppStore.getState().characters[0]

const seed = (patch: Partial<Character> = {}) => {
  useAppStore.setState({
    characters: [{ ...makeCharacter(), ...patch }],
    scene: { backdropId: '', items: [] },
    saveError: null,
  })
}

const onDone = vi.fn()

const mount = () =>
  render(<StudioScreen catalog={catalog} characterId="c1" onDone={onDone} />)

beforeEach(() => {
  onDone.mockClear()
  localStorage.clear()
  seed()
})

describe('StudioScreen', () => {
  it('1. renders the character and its name', () => {
    const { container } = mount()
    expect(screen.getByRole('heading', { name: 'Mia' })).toBeInTheDocument()
    expect(container.querySelector('[data-testid="character-stage"] svg')).not.toBeNull()
  })

  it('2. clicking a rail category switches the tray contents', () => {
    mount()
    // Face is the opening category.
    expect(screen.getByTestId('section-eyes')).toBeInTheDocument()
    expect(screen.queryByTestId('section-top')).toBeNull()
    expect(screen.getByTestId('rail-face')).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByTestId('rail-top'))

    expect(screen.getByTestId('section-top')).toBeInTheDocument()
    expect(screen.queryByTestId('section-eyes')).toBeNull()
    expect(screen.getByTestId('rail-top')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByTestId('rail-face')).toHaveAttribute('aria-pressed', 'false')
  })

  it('3. clicking an option in the tray equips it on the character', () => {
    mount()
    fireEvent.click(screen.getByTestId('rail-top'))
    fireEvent.click(screen.getByTestId('option-adult-female-top-hoodie'))

    expect(current().slots.top?.assetId).toBe('adult-female-top-hoodie')
    expect(useAppStore.getState().characters).toHaveLength(1)
  })

  it('4. clicking the equipped option again unequips it', () => {
    mount()
    fireEvent.click(screen.getByTestId('rail-top'))
    expect(screen.getByTestId('option-adult-female-top-tee'))
      .toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByTestId('option-adult-female-top-tee'))

    expect(current().slots.top).toBeUndefined()
    expect(screen.getByTestId('option-adult-female-top-tee'))
      .toHaveAttribute('aria-pressed', 'false')
  })

  it('5. changing life stage retargets the character and keeps its family', () => {
    mount()
    fireEvent.click(screen.getByTestId('stage-teen'))

    const c = current()
    expect(c.stage).toBe('teen')
    expect(c.id).toBe('c1')
    // Same family ("tee"), new bundle.
    expect(c.slots.top?.assetId).toBe('teen-female-top-tee')
    expect(c.slots.eyes?.assetId).toBe('teen-female-eyes-round')
  })

  it('6. changing body type retargets the character', () => {
    mount()
    fireEvent.click(screen.getByTestId('body-male'))

    const c = current()
    expect(c.bodyType).toBe('male')
    expect(c.stage).toBe('adult')
    expect(c.slots.top?.assetId).toBe('adult-male-top-tee')
  })

  it('7. a skin swatch updates skinToneId', () => {
    mount()
    fireEvent.click(screen.getByTestId('swatch-skin-5'))
    expect(current().skinToneId).toBe(SKIN_TONES[5].id)
  })

  it('8. a colour swatch updates the equipped slot’s colors', () => {
    mount()
    fireEvent.click(screen.getByTestId('rail-top'))
    fireEvent.click(screen.getByTestId('swatch-top-c1-4'))

    expect(current().slots.top?.colors.c1).toBe(GARMENT_PALETTE[4])
    expect(current().slots.top?.assetId).toBe('adult-female-top-tee')
  })

  it('9. “Surprise me” replaces every slot on this character without creating a new one', () => {
    mount()
    const before = current()
    fireEvent.click(screen.getByTestId('surprise'))

    const after = current()
    expect(useAppStore.getState().characters).toHaveLength(1)
    expect(after.id).toBe(before.id)
    expect(after.name).toBe('Mia')
    expect(after.stage).toBe('adult')
    expect(after.bodyType).toBe('female')
    // The randomiser always fills the required face + hair slots.
    for (const slot of ['eyes', 'brows', 'mouth', 'hair'] as const) {
      expect(after.slots[slot]).toBeDefined()
    }
  })

  it('10. slots hidden by an equipped costume are disabled with a note', () => {
    seed({
      slots: {
        top: { assetId: 'adult-female-top-tee', colors: {} },
        costume: { assetId: 'adult-female-costume-hero', colors: {} },
      },
    })
    mount()
    fireEvent.click(screen.getByTestId('rail-top'))

    const section = screen.getByTestId('section-top')
    expect(within(section).getByText(/hidden by costume/i)).toBeInTheDocument()
    expect(screen.getByTestId('option-adult-female-top-tee')).toBeDisabled()
    expect(screen.getByTestId('option-adult-female-top-hoodie')).toBeDisabled()

    fireEvent.click(screen.getByTestId('option-adult-female-top-hoodie'))
    expect(current().slots.top?.assetId).toBe('adult-female-top-tee')
  })

  it('11. Done calls onDone', () => {
    mount()
    fireEvent.click(screen.getByTestId('done'))
    expect(onDone).toHaveBeenCalledTimes(1)
  })
})

describe('StudioScreen colour rows', () => {
  const openTop = () => {
    mount()
    fireEvent.click(screen.getByTestId('rail-top'))
  }

  it('renders one labelled swatch row per declared colour variable', () => {
    seed({ slots: { top: { assetId: 'adult-female-top-jersey', colors: {} } } })
    openTop()

    const section = screen.getByTestId('section-top')
    expect(within(section).getByTestId('swatches-top-c1')).toBeInTheDocument()
    expect(within(section).getByTestId('swatches-top-c2')).toBeInTheDocument()
    expect(within(section).getByTestId('swatches-top-c3')).toBeInTheDocument()

    // Human-readable labels, not raw variable names.
    expect(within(section).getByText('Main')).toBeInTheDocument()
    expect(within(section).getByText('Shade')).toBeInTheDocument()
    expect(within(section).getByText('Accent')).toBeInTheDocument()
    expect(within(section).queryByText('c2')).toBeNull()
  })

  it('renders a single row for a single-variable asset', () => {
    openTop()
    const rows = within(screen.getByTestId('section-top')).getAllByRole('group')
    expect(rows).toHaveLength(1)
    expect(rows[0]).toHaveAttribute('data-testid', 'swatches-top-c1')
  })

  it('each row edits only its own variable', () => {
    seed({ slots: { top: { assetId: 'adult-female-top-jersey', colors: { c1: '#123456' } } } })
    openTop()

    fireEvent.click(screen.getByTestId('swatch-top-c2-4'))
    expect(current().slots.top?.colors).toEqual({ c1: '#123456', c2: GARMENT_PALETTE[4] })

    fireEvent.click(screen.getByTestId('swatch-top-c3-2'))
    expect(current().slots.top?.colors).toEqual({
      c1: '#123456', c2: GARMENT_PALETTE[4], c3: GARMENT_PALETTE[2],
    })
  })

  it('marks the active swatch per row independently', () => {
    seed({
      slots: {
        top: {
          assetId: 'adult-female-top-jersey',
          colors: { c1: GARMENT_PALETTE[0], c2: GARMENT_PALETTE[5] },
        },
      },
    })
    openTop()

    expect(screen.getByTestId('swatch-top-c1-0')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByTestId('swatch-top-c2-0')).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByTestId('swatch-top-c2-5')).toHaveAttribute('aria-pressed', 'true')
  })

  it('an asset declaring no colours renders no rows', () => {
    seed({ slots: { shoes: { assetId: 'adult-female-shoes-clog', colors: {} } } })
    mount()
    fireEvent.click(screen.getByTestId('rail-shoes'))
    expect(within(screen.getByTestId('section-shoes')).queryAllByRole('group')).toHaveLength(0)
  })

  it('an empty slot renders no rows', () => {
    seed({ slots: {} })
    openTop()
    expect(within(screen.getByTestId('section-top')).queryAllByRole('group')).toHaveLength(0)
  })

  it('hair variables use the hair ramp, garment variables the garment ramp', () => {
    seed({ slots: { hair: { assetId: 'adult-female-hair-bob', colors: {} } } })
    mount()
    fireEvent.click(screen.getByTestId('rail-hair'))

    const section = screen.getByTestId('section-hair')
    expect(screen.getByTestId('swatch-label-hair-hair1')).toHaveTextContent('Hair')
    expect(screen.getByTestId('swatch-label-hair-hair2')).toHaveTextContent('Hair shade')
    expect(within(section).getAllByTestId(/^swatch-hair-hair1-/))
      .toHaveLength(HAIR_PALETTE.length)
    expect(screen.getByTestId('swatch-hair-hair1-0'))
      .toHaveStyle({ backgroundColor: HAIR_PALETTE[0] })

    fireEvent.click(screen.getByTestId('swatch-hair-hair2-3'))
    expect(current().slots.hair?.colors.hair2).toBe(HAIR_PALETTE[3])
  })

  it('gives face slots their own rows without duplicating the skin-tone control', () => {
    seed({
      slots: {
        eyes: { assetId: 'adult-female-eyes-round', colors: {} },
        brows: { assetId: 'adult-female-brows-soft', colors: {} },
        mouth: { assetId: 'adult-female-mouth-smile', colors: {} },
      },
    })
    mount() // Face is the opening category.

    expect(screen.getAllByTestId('swatches-skin')).toHaveLength(1)
    expect(screen.getByTestId('swatch-label-eyes-eye1')).toHaveTextContent('Eyes')
    expect(screen.getByTestId('swatch-label-mouth-lip1')).toHaveTextContent('Lips')
    // Brows are hair-coloured, so they take the hair ramp.
    expect(screen.getByTestId('swatch-brows-hair2-0'))
      .toHaveStyle({ backgroundColor: HAIR_PALETTE[0] })

    fireEvent.click(screen.getByTestId('swatch-eyes-eye1-3'))
    expect(current().slots.eyes?.colors.eye1).toBe(GARMENT_PALETTE[3])
  })

  it('disables every row of a slot hidden by a costume', () => {
    seed({
      slots: {
        top: { assetId: 'adult-female-top-jersey', colors: {} },
        costume: { assetId: 'adult-female-costume-hero', colors: {} },
      },
    })
    openTop()

    for (const v of ['c1', 'c2', 'c3']) {
      expect(screen.getByTestId(`swatch-top-${v}-0`)).toBeDisabled()
    }
  })

  it('falls back to the raw variable name when it has no friendly label', () => {
    seed({ slots: { top: { assetId: 'adult-female-top-zed', colors: {} } } })
    openTop()
    expect(within(screen.getByTestId('section-top')).getByText('zz9')).toBeInTheDocument()
  })
})

describe('StudioScreen extras', () => {
  it('Reset clears every slot but keeps stage, body type and skin', () => {
    seed({ skinToneId: 'cocoa' })
    mount()
    fireEvent.click(screen.getByTestId('reset'))

    const c = current()
    expect(Object.keys(c.slots)).toHaveLength(0)
    expect(c.stage).toBe('adult')
    expect(c.bodyType).toBe('female')
    expect(c.skinToneId).toBe('cocoa')
  })

  it('reads accessory slots from the shared head-size pool', () => {
    mount()
    fireEvent.click(screen.getByTestId('rail-accessories'))
    fireEvent.click(screen.getByTestId('option-accessories-adult-glasses-round'))
    expect(current().slots.glasses?.assetId).toBe('accessories-adult-glasses-round')
  })

  it('renders empty sections instead of crashing when the catalog is empty', () => {
    const empty = buildCatalog({})
    render(<StudioScreen catalog={empty} characterId="c1" onDone={onDone} />)
    expect(screen.getByTestId('section-eyes')).toBeInTheDocument()
    expect(screen.getAllByText(/nothing here yet/i).length).toBeGreaterThan(0)
  })

  it('survives a stage with no art at all', () => {
    mount()
    fireEvent.click(screen.getByTestId('stage-elder'))
    expect(current().stage).toBe('elder')
    expect(screen.getByTestId('section-eyes')).toBeInTheDocument()
  })
})
