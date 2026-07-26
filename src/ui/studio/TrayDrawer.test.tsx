import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { useAppStore } from '../../state/appStore'
import { StudioScreen } from './StudioScreen'
import { TrayDrawer } from './TrayDrawer'
import { makeCatalog, makeCharacter } from './testCatalog'

type Listener = (event: MediaQueryListEvent) => void

/** jsdom has no matchMedia; this stub lets a test "rotate the iPad". */
function stubMatchMedia(initial: boolean) {
  const listeners = new Set<Listener>()
  const mql = {
    matches: initial,
    media: '',
    onchange: null,
    addEventListener: (_type: string, fn: Listener) => { listeners.add(fn) },
    removeEventListener: (_type: string, fn: Listener) => { listeners.delete(fn) },
    dispatchEvent: () => true,
  }
  window.matchMedia = ((query: string) => {
    mql.media = query
    return mql as unknown as MediaQueryList
  }) as typeof window.matchMedia

  return {
    emit(matches: boolean) {
      mql.matches = matches
      for (const fn of [...listeners]) fn({ matches } as unknown as MediaQueryListEvent)
    },
  }
}

const catalog = makeCatalog()
const onDone = vi.fn()

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({
    characters: [makeCharacter()],
    scene: { backdropId: '', items: [] },
    saveError: null,
  })
})

afterEach(() => { Reflect.deleteProperty(window, 'matchMedia') })

describe('TrayDrawer', () => {
  it('renders collapsed by default', () => {
    render(<TrayDrawer label="options"><p>tray contents</p></TrayDrawer>)
    expect(screen.getByTestId('tray-drawer')).toHaveAttribute('data-open', 'false')
    expect(screen.getByTestId('drawer-handle')).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByTestId('drawer-body')).not.toBeVisible()
  })

  it('the handle expands it', () => {
    render(<TrayDrawer label="options"><p>tray contents</p></TrayDrawer>)
    fireEvent.click(screen.getByTestId('drawer-handle'))

    expect(screen.getByTestId('tray-drawer')).toHaveAttribute('data-open', 'true')
    expect(screen.getByTestId('drawer-handle')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('drawer-body')).toBeVisible()

    fireEvent.click(screen.getByTestId('drawer-handle'))
    expect(screen.getByTestId('drawer-body')).not.toBeVisible()
  })
})

describe('StudioScreen on a narrow viewport', () => {
  it('collapses the tray into the bottom drawer and the rail into scrolling chips', () => {
    stubMatchMedia(true)
    render(<StudioScreen catalog={catalog} characterId="c1" onDone={onDone} />)

    expect(screen.getByTestId('tray-drawer')).toBeInTheDocument()
    const rail = screen.getByTestId('category-rail')
    expect(rail).toHaveAttribute('data-orientation', 'horizontal')
    expect(rail.className).toContain('overflow-x-auto')
    // Same categories, same buttons — one codebase, two arrangements.
    expect(screen.getByTestId('rail-face')).toBeInTheDocument()
    expect(screen.getByTestId('rail-costume')).toBeInTheDocument()
  })

  it('expanding the drawer does not unmount the character', () => {
    stubMatchMedia(true)
    const { container } = render(
      <StudioScreen catalog={catalog} characterId="c1" onDone={onDone} />,
    )
    const before = container.querySelector('[data-testid="character-stage"] svg')
    expect(before).not.toBeNull()

    fireEvent.click(screen.getByTestId('drawer-handle'))

    expect(container.querySelector('[data-testid="character-stage"] svg')).toBe(before)
  })

  it('keeps the same character subtree when the viewport crosses the breakpoint', () => {
    const mm = stubMatchMedia(false)
    const { container } = render(
      <StudioScreen catalog={catalog} characterId="c1" onDone={onDone} />,
    )
    expect(screen.queryByTestId('tray-drawer')).toBeNull()
    const before = container.querySelector('[data-testid="character-stage"] svg')

    act(() => { mm.emit(true) })   // rotate to portrait

    expect(screen.getByTestId('tray-drawer')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="character-stage"] svg')).toBe(before)

    act(() => { mm.emit(false) })  // and back to landscape

    expect(screen.queryByTestId('tray-drawer')).toBeNull()
    expect(container.querySelector('[data-testid="character-stage"] svg')).toBe(before)
  })

  it('still equips from the drawer tray', () => {
    stubMatchMedia(true)
    render(<StudioScreen catalog={catalog} characterId="c1" onDone={onDone} />)
    fireEvent.click(screen.getByTestId('drawer-handle'))
    fireEvent.click(screen.getByTestId('rail-top'))
    fireEvent.click(screen.getByTestId('option-adult-female-top-hoodie'))

    expect(useAppStore.getState().characters[0].slots.top?.assetId)
      .toBe('adult-female-top-hoodie')
  })
})
