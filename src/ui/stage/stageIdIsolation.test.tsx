import { beforeEach, describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { buildCatalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { StageScreen } from './StageScreen'

/**
 * Regression guard for the duplicate-id class of bug.
 *
 * Assets embed gradients whose ids are unique per ASSET but not per INSTANCE. Injecting the
 * same markup twice into one document makes every url(#…) resolve to whichever copy came
 * first, so the second item silently inherits the first one's colours. CharacterSvg was fixed
 * for characters; props and backdrops inject markup at three further sites and needed the
 * same treatment.
 */

const gradientProp = (name: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"
     data-name="${name}" data-family="${name}" data-slot="top" data-layer="top"
     data-colors="c1">
     <defs>
       <linearGradient id="props-${name}__g">
         <stop offset="0" stop-color="var(--c1, #7E90DC)"/>
       </linearGradient>
     </defs>
     <rect x="0" y="0" width="10" height="10" fill="url(#props-${name}__g)"/>
   </svg>`

const backdrop = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"
   data-name="Park" data-family="park" data-slot="top" data-layer="top" data-colors="">
   <defs>
     <linearGradient id="backdrops-park__sky">
       <stop offset="0" stop-color="#CFE3F7"/>
     </linearGradient>
   </defs>
   <rect x="0" y="0" width="1600" height="1000" fill="url(#backdrops-park__sky)"/>
 </svg>`

const catalog = buildCatalog({
  '/src/assets/props/ball.svg': gradientProp('ball'),
  '/src/assets/backdrops/park.svg': backdrop,
})

const idsIn = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('[id]')).map((el) => el.getAttribute('id')!)

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({
    characters: [], scene: { backdropId: '', items: [] }, saveError: null,
  })
})

describe('stage id isolation', () => {
  it('gives two copies of the same prop distinct element ids', () => {
    const store = useAppStore.getState()
    store.addToScene('prop', 'props-ball', 300, 500)
    store.addToScene('prop', 'props-ball', 900, 500)

    const { container } = render(<StageScreen catalog={catalog} />)
    // three instances exist: two on the stage plus the drawer's props thumbnail
    const gradientIds = idsIn(container).filter((id) => id.startsWith('props-ball__g'))

    expect(gradientIds.length).toBeGreaterThanOrEqual(2)
    expect(new Set(gradientIds).size).toBe(gradientIds.length)
  })

  it('points each prop copy at its own gradient', () => {
    const store = useAppStore.getState()
    store.addToScene('prop', 'props-ball', 300, 500)
    store.addToScene('prop', 'props-ball', 900, 500)

    const { container } = render(<StageScreen catalog={catalog} />)
    const refs = Array.from(container.querySelectorAll('rect[fill^="url("]'))
      .map((el) => el.getAttribute('fill')!)
      .filter((f) => f.includes('props-ball__g'))

    expect(refs.length).toBeGreaterThanOrEqual(2)
    expect(new Set(refs).size).toBe(refs.length)

    // every reference must resolve to an element that actually exists in this document
    for (const ref of refs) {
      const id = ref.slice(ref.indexOf('#') + 1, ref.lastIndexOf(')'))
      expect(container.querySelector(`[id="${id}"]`), `${ref} is dangling`).not.toBeNull()
    }
  })

  it('keeps the staged backdrop distinct from its drawer thumbnail', () => {
    useAppStore.getState().setBackdrop('backdrops-park')

    const { container } = render(<StageScreen catalog={catalog} />)
    const skyIds = idsIn(container).filter((id) => id.startsWith('backdrops-park__sky'))

    // the stage renders one, the drawer's backdrop picker renders another
    expect(skyIds.length).toBeGreaterThan(1)
    expect(new Set(skyIds).size).toBe(skyIds.length)
  })
})
