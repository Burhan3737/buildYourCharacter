import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { buildCatalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { RosterScreen } from './RosterScreen'

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg':
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" data-name="B"
      data-family="base" data-slot="eyes" data-layer="body" data-colors="">
      <path d="M0 0"/></svg>`,
})

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({ characters: [], scene: { backdropId: '', items: [] }, saveError: null })
})

describe('RosterScreen', () => {
  it('shows an empty state with a create action', async () => {
    const user = userEvent.setup()
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    expect(screen.getByText(/no characters yet/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /new character/i }))
    expect(useAppStore.getState().characters).toHaveLength(1)
  })

  it('opens the studio for a newly created character', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    render(<RosterScreen catalog={catalog} onEdit={onEdit} />)
    await user.click(screen.getByRole('button', { name: /new character/i }))
    expect(onEdit).toHaveBeenCalledWith(useAppStore.getState().characters[0].id)
  })

  it('renders one card per character with its name and stage', () => {
    useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().updateCharacter(useAppStore.getState().characters[0].id, { name: 'Mia' })
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    const card = screen.getByTestId(`card-${useAppStore.getState().characters[0].id}`)
    expect(within(card).getByText('Mia')).toBeInTheDocument()
    expect(within(card).getByText(/adult/i)).toBeInTheDocument()
  })

  it('duplicates a character', async () => {
    const user = userEvent.setup()
    useAppStore.getState().createCharacter(catalog)
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /duplicate/i }))
    expect(useAppStore.getState().characters).toHaveLength(2)
  })

  it('asks for confirmation before deleting', async () => {
    const user = userEvent.setup()
    useAppStore.getState().createCharacter(catalog)
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(useAppStore.getState().characters).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: /^confirm$/i }))
    expect(useAppStore.getState().characters).toHaveLength(0)
  })

  it('adds a random character', async () => {
    const user = userEvent.setup()
    render(<RosterScreen catalog={catalog} onEdit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /surprise me/i }))
    expect(useAppStore.getState().characters).toHaveLength(1)
  })
})
