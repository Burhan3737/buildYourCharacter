import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { buildCatalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'
import { StageScreen } from './StageScreen'

const svg = (name: string) => `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 600" data-name="${name}" data-family="${name}"
  data-slot="top" data-layer="top" data-colors="">
  <path d="M0 0h10v10z"/></svg>`

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('Body'),
  '/src/assets/props/beach-ball.svg': svg('Beach ball'),
  '/src/assets/backdrops/park.svg': svg('Park'),
})

const emptyCatalog = buildCatalog({})

/** 800px wide for a 1600-unit stage => 1 screen px is 2 stage units. Origin at (100, 50). */
const RECT = {
  x: 100, y: 50, left: 100, top: 50, width: 800, height: 500, right: 900, bottom: 550,
  toJSON: () => ({}),
} as DOMRect

/** jsdom has no PointerEvent; a MouseEvent carrying a pointerId drives React's handlers. */
function firePointer(
  el: Element,
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  clientX: number,
  clientY: number,
  pointerId = 1,
) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX, clientY })
  Object.defineProperty(event, 'pointerId', { value: pointerId })
  fireEvent(el, event)
}

const resetStore = () =>
  useAppStore.setState({ characters: [], scene: { backdropId: '', items: [] }, saveError: null })

const scene = () => useAppStore.getState().scene

/** Adds one prop at (100, 100) and returns its id. */
function addProp(): string {
  useAppStore.getState().addToScene('prop', 'props-beach-ball', 100, 100)
  return scene().items[scene().items.length - 1].id
}

const select = (id: string) => {
  firePointer(screen.getByTestId(`item-${id}`), 'pointerdown', 300, 200)
}

beforeEach(() => {
  localStorage.clear()
  resetStore()
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(RECT)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('StageScreen', () => {
  it('renders an empty stage for an empty catalog without crashing', () => {
    render(<StageScreen catalog={emptyCatalog} />)
    expect(screen.getByTestId('stage-screen')).toBeInTheDocument()
    expect(screen.getByTestId('backdrop-picker')).toBeInTheDocument()
  })

  it('renders the backdrop picker and sets the backdrop', () => {
    render(<StageScreen catalog={catalog} />)
    const picker = screen.getByTestId('backdrop-picker')
    fireEvent.click(within(picker).getByRole('button', { name: 'Park' }))
    expect(scene().backdropId).toBe('backdrops-park')
  })

  it('injects the backdrop markup as a group rather than an <image>', () => {
    useAppStore.getState().setBackdrop('backdrops-park')
    const { container } = render(<StageScreen catalog={catalog} />)
    const stage = screen.getByTestId('stage-svg')
    expect(within(stage).getByTestId('stage-backdrop')).toBeInTheDocument()
    expect(container.querySelector('image')).toBeNull()
  })

  it('ignores a backdrop id that is not in the catalog', () => {
    useAppStore.getState().setBackdrop('backdrops-missing')
    render(<StageScreen catalog={catalog} />)
    expect(screen.queryByTestId('stage-backdrop')).toBeNull()
  })

  it('drags an item by the pointer delta converted into stage space', () => {
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    const item = screen.getByTestId(`item-${id}`)
    firePointer(item, 'pointerdown', 300, 200)
    firePointer(item, 'pointermove', 340, 230)
    firePointer(item, 'pointerup', 340, 230)
    const moved = scene().items[0]
    expect(moved.x).toBe(180)
    expect(moved.y).toBe(160)
  })

  it('raises an item when it is tapped', () => {
    const first = addProp()
    addProp()
    render(<StageScreen catalog={catalog} />)
    select(first)
    const items = scene().items
    const raised = items.find((i) => i.id === first)
    const other = items.find((i) => i.id !== first)
    expect(raised && other && raised.z > other.z).toBe(true)
  })

  it('renders items sorted by z', () => {
    const first = addProp()
    const second = addProp()
    render(<StageScreen catalog={catalog} />)
    const stage = screen.getByTestId('stage-svg')
    const order = Array.from(stage.querySelectorAll('[data-testid^="item-"]'))
      .map((el) => el.getAttribute('data-testid'))
    expect(order).toEqual([`item-${first}`, `item-${second}`])
  })

  it('scales the selected item from the slider', () => {
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    fireEvent.change(screen.getByRole('slider', { name: /size/i }), { target: { value: '1.5' } })
    expect(scene().items[0].scale).toBe(1.5)
  })

  it('flips the selected item', () => {
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    fireEvent.click(screen.getByRole('button', { name: /flip/i }))
    expect(scene().items[0].flipX).toBe(true)
  })

  it('brings the selected item to the front', () => {
    const first = addProp()
    const second = addProp()
    render(<StageScreen catalog={catalog} />)
    select(first)
    fireEvent.click(screen.getByRole('button', { name: /front/i }))
    const items = scene().items
    const a = items.find((i) => i.id === first)
    const b = items.find((i) => i.id === second)
    expect(a && b && a.z > b.z).toBe(true)
  })

  it('removes the selected item', () => {
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    fireEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(scene().items).toHaveLength(0)
  })

  it('deselects when the stage background is tapped', () => {
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
    firePointer(screen.getByTestId('stage-svg'), 'pointerdown', 700, 400)
    expect(screen.queryByRole('button', { name: /remove/i })).toBeNull()
  })

  it('keeps the selection when the toolbar itself is pressed', () => {
    // The toolbar lives inside the stage svg, so its pointerdown must not reach the
    // background deselect handler — otherwise the controls unmount before the click.
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    firePointer(screen.getByRole('button', { name: /flip/i }), 'pointerdown', 300, 120)
    expect(screen.getByRole('button', { name: /flip/i })).toBeInTheDocument()
  })

  it('adds a prop at the stage centre when its drawer entry is tapped', () => {
    render(<StageScreen catalog={catalog} />)
    const entry = screen.getByTestId('drawer-entry-props-beach-ball')
    firePointer(entry, 'pointerdown', 300, 700)
    firePointer(entry, 'pointerup', 300, 700)
    expect(scene().items).toHaveLength(1)
    expect(scene().items[0]).toMatchObject({
      kind: 'prop', refId: 'props-beach-ball', x: STAGE_W / 2, y: STAGE_H / 2,
    })
  })

  it('adds a character at the drop point when dragged from the drawer', () => {
    const character = useAppStore.getState().createCharacter(catalog)
    render(<StageScreen catalog={catalog} />)
    fireEvent.click(screen.getByRole('tab', { name: /characters/i }))
    const entry = screen.getByTestId(`drawer-entry-${character.id}`)
    firePointer(entry, 'pointerdown', 200, 700)
    firePointer(entry, 'pointermove', 500, 300)
    firePointer(entry, 'pointerup', 500, 300)
    expect(scene().items).toHaveLength(1)
    expect(scene().items[0]).toMatchObject({
      kind: 'character', refId: character.id, x: 800, y: 500,
    })
  })

  it('renders scene characters flat, so no filters run on the stage', () => {
    const character = useAppStore.getState().createCharacter(catalog)
    useAppStore.getState().addToScene('character', character.id, 400, 400)
    render(<StageScreen catalog={catalog} />)
    const stage = screen.getByTestId('stage-svg')
    expect(stage.querySelector('.quality-flat')).not.toBeNull()
    expect(stage.querySelector('.quality-high')).toBeNull()
  })

  it('skips scene items whose character or prop has gone missing', () => {
    useAppStore.getState().addToScene('character', 'ghost', 400, 400)
    useAppStore.getState().addToScene('prop', 'props-missing', 400, 400)
    render(<StageScreen catalog={catalog} />)
    const stage = screen.getByTestId('stage-svg')
    expect(stage.querySelectorAll('[data-testid^="item-"]')).toHaveLength(0)
  })

  it('collapses and reopens the drawer', () => {
    render(<StageScreen catalog={catalog} />)
    const toggle = screen.getByRole('button', { name: /drawer/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByTestId('drawer-entry-props-beach-ball')).toBeNull()
  })
})
