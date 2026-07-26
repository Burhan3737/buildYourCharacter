import { useEffect } from 'react'
import { catalog } from '../catalog/loader'
import { ContactSheet } from '../dev/ContactSheet'
import { ShadowDefs } from '../render/ShadowDefs'
import { useAppStore } from '../state/appStore'

export function App() {
  const hydrate = useAppStore((s) => s.hydrate)

  useEffect(() => { hydrate(localStorage) }, [hydrate])

  if (new URLSearchParams(window.location.search).get('dev') === 'sheet') {
    return <><ShadowDefs /><ContactSheet /></>
  }

  return (
    <div className="p-8">
      <ShadowDefs />
      <h1 className="text-2xl font-bold">TocaCraft</h1>
      <p className="mt-2 text-sm opacity-70">
        {Object.keys(catalog.byId).length} assets loaded
      </p>
    </div>
  )
}
