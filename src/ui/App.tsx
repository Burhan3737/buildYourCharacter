import { catalog } from '../catalog/loader'

export function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">TocaCraft</h1>
      <p className="mt-2 text-sm opacity-70">
        {Object.keys(catalog.byId).length} assets loaded
      </p>
    </div>
  )
}
