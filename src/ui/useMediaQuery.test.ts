import { afterEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useMediaQuery } from './useMediaQuery'

type Listener = (event: MediaQueryListEvent) => void

/** jsdom does not implement matchMedia, so the hook needs a stub to talk to. */
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
    get listenerCount() { return listeners.size },
    get media() { return mql.media },
    emit(matches: boolean) {
      mql.matches = matches
      for (const fn of [...listeners]) fn({ matches } as unknown as MediaQueryListEvent)
    },
  }
}

afterEach(() => { Reflect.deleteProperty(window, 'matchMedia') })

describe('useMediaQuery', () => {
  it('returns the initial matches value', () => {
    stubMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('(max-width: 899px)'))
    expect(result.current).toBe(true)
  })

  it('passes the query through to matchMedia', () => {
    const mm = stubMatchMedia(false)
    renderHook(() => useMediaQuery('(max-width: 899px)'))
    expect(mm.media).toBe('(max-width: 899px)')
  })

  it('updates when a change event fires', () => {
    const mm = stubMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(max-width: 899px)'))
    expect(result.current).toBe(false)

    act(() => { mm.emit(true) })
    expect(result.current).toBe(true)

    act(() => { mm.emit(false) })
    expect(result.current).toBe(false)
  })

  it('removes its listener on unmount', () => {
    const mm = stubMatchMedia(false)
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 899px)'))
    expect(mm.listenerCount).toBe(1)

    unmount()
    expect(mm.listenerCount).toBe(0)
  })

  it('returns false when matchMedia is unavailable', () => {
    Reflect.deleteProperty(window, 'matchMedia')
    const { result } = renderHook(() => useMediaQuery('(max-width: 899px)'))
    expect(result.current).toBe(false)
  })
})
