import { catalog } from '../catalog/loader'
import { ShadowDefs } from '../render/ShadowDefs'

export function App() {
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
