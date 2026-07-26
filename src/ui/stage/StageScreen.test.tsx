import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { buildCatalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { STAGE_H, STAGE_W } from '../../state/sceneOps'
import { ART_H, ART_W } from './StageItem'
import { StageScreen } from './StageScreen'

const svg = (name: string) => `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 600" data-name="${name}" data-family="${name}"
  data-slot="top" data-layer="top" data-colors="">
  <path d="M0 0h10v10z"/></svg>`

/**
 * A prop whose art is a single column standing on the ground line: 180 units wide out of the
 * 400-unit canvas, so the art is much narrower than the canvas it is authored in.
 */
const columnSvg = (name: string) => `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 600" data-name="${name}" data-family="${name}"
  data-slot="top" data-layer="top" data-colors="">
  <rect x="110" y="330" width="180" height="240" fill="#7E90DC"/></svg>`

const catalog = buildCatalog({
  '/src/assets/bodies/adult/female/base.svg': svg('Body'),
  '/src/assets/props/beach-ball.svg': svg('Beach ball'),
  '/src/assets/props/column-a.svg': columnSvg('Column A'),
  '/src/assets/props/column-b.svg': columnSvg('Column B'),
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

/** Adds one prop of the given asset at (x, y) and returns its scene item id. */
function addPropAt(refId: string, x: number, y: number): string {
  useAppStore.getState().addToScene('prop', refId, x, y)
  return scene().items[scene().items.length - 1].id
}

const TRANSLATE = /translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/

/** Sum of the translate() components of an element and every ancestor up to the stage. */
function offsetOf(el: Element): { x: number; y: number } {
  let x = 0
  let y = 0
  for (let node: Element | null = el; node; node = node.parentElement) {
    if (node.getAttribute('data-testid') === 'stage-svg') break
    const m = TRANSLATE.exec(node.getAttribute('transform') ?? '')
    if (m) { x += Number(m[1]); y += Number(m[2]) }
  }
  return { x, y }
}

/**
 * jsdom does no layout, so this stands in for SVG's default `pointer-events: visiblePainted`
 * over the axis-aligned, unscaled shapes these fixtures use: every `<rect>` with a fill that
 * is not `none` is a hit region — `transparent` very much included, which is exactly why a
 * full-bleed transparent rect stole its neighbours' clicks — and the last one in document
 * order (the top of the paint stack) wins. Returns the element a browser would deliver the
 * pointerdown to.
 */
function elementAtStagePoint(x: number, y: number): Element | null {
  let hit: Element | null = null
  for (const el of Array.from(document.querySelectorAll('[data-item-id] rect'))) {
    const fill = el.getAttribute('fill')
    if (!fill || fill === 'none') continue
    if ((el.getAttribute('pointer-events') ?? '') === 'none') continue
    const o = offsetOf(el)
    const left = o.x + Number(el.getAttribute('x'))
    const top = o.y + Number(el.getAttribute('y'))
    const right = left + Number(el.getAttribute('width'))
    const bottom = top + Number(el.getAttribute('height'))
    if (x >= left && x <= right && y >= top && y <= bottom) hit = el
  }
  return hit
}

/** The test rect maps stage units to client px at 0.5, with the stage origin at (100, 50). */
const toClient = (x: number, y: number) => ({ x: 100 + x * 0.5, y: 50 + y * 0.5 })

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

  it('selects the item whose art was actually clicked, not the one on top', () => {
    // Two columns 160 units apart, so their art overlaps only at the seam. A click squarely
    // on the LEFT column's art used to land on the RIGHT column's full-bleed transparent hit
    // rect — which spans the whole 400x600 canvas — and selected, raised and removed the
    // wrong item.
    const left = addPropAt('props-column-a', 700, 800)
    const right = addPropAt('props-column-b', 860, 800)
    render(<StageScreen catalog={catalog} />)

    const target = elementAtStagePoint(700, 700)
    expect(target).not.toBeNull()
    expect(target!.closest('[data-item-id]')!.getAttribute('data-item-id')).toBe(left)

    const at = toClient(700, 700)
    firePointer(target!, 'pointerdown', at.x, at.y)

    expect(screen.getByRole('slider', { name: /size of column a/i })).toBeInTheDocument()
    const items = scene().items
    const a = items.find((i) => i.id === left)!
    const b = items.find((i) => i.id === right)!
    expect(a.z).toBeGreaterThan(b.z)
  })

  it('leaves the art itself as the hit area — no full-canvas hit rect', () => {
    const id = addPropAt('props-column-a', 700, 800)
    render(<StageScreen catalog={catalog} />)
    const group = screen.getByTestId(`item-${id}`)
    const fullBleed = Array.from(group.querySelectorAll('rect')).filter((r) =>
      Number(r.getAttribute('width')) >= ART_W && Number(r.getAttribute('height')) >= ART_H)
    expect(fullBleed).toEqual([])
  })

  it('renders the selected item controls outside the scaled stage svg', () => {
    // Inside the svg the whole toolbar shrinks with the stage: 17px tall on a tablet. The
    // controls have to live in screen space so they keep a usable size at any stage scale.
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    const stage = screen.getByTestId('stage-svg')
    const toolbar = screen.getByTestId('stage-toolbar')
    expect(stage.contains(toolbar)).toBe(false)
    expect(stage.querySelector('foreignObject')).toBeNull()
  })

  it('gives every stage control a 44px touch target', () => {
    const id = addProp()
    render(<StageScreen catalog={catalog} />)
    select(id)
    const toolbar = screen.getByTestId('stage-toolbar')
    const controls = Array.from(toolbar.querySelectorAll('button, input'))
    expect(controls.length).toBeGreaterThanOrEqual(4)
    for (const c of controls) {
      expect(c).toHaveStyle({ minWidth: '44px', minHeight: '44px' })
    }
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
