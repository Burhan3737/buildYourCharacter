import { useEffect, useState } from 'react'
import { catalog } from '../catalog/loader'
import { ContactSheet } from '../dev/ContactSheet'
import { ShadowDefs } from '../render/ShadowDefs'
import { useAppStore } from '../state/appStore'
import { Nav } from './Nav'
import { SaveErrorBanner } from './SaveErrorBanner'
import { RosterScreen } from './roster/RosterScreen'
import { StudioScreen } from './studio/StudioScreen'
import { StageScreen } from './stage/StageScreen'

export type Screen = 'roster' | 'studio' | 'stage'

export function App() {
  const [screen, setScreen] = useState<Screen>('roster')
  const [editingId, setEditingId] = useState<string | null>(null)
  const hydrate = useAppStore((s) => s.hydrate)

  useEffect(() => { hydrate(localStorage) }, [hydrate])

  if (new URLSearchParams(window.location.search).get('dev') === 'sheet') {
    return <><ShadowDefs /><ContactSheet /></>
  }

  const goStudio = (id: string) => { setEditingId(id); setScreen('studio') }

  return (
    <div className="flex h-full flex-col">
      <ShadowDefs />
      <SaveErrorBanner />
      <Nav screen={screen}
           onRoster={() => setScreen('roster')}
           onStage={() => setScreen('stage')} />
      <main className="min-h-0 flex-1">
        {screen === 'roster' && <RosterScreen catalog={catalog} onEdit={goStudio} />}
        {screen === 'studio' && editingId && (
          <StudioScreen catalog={catalog} characterId={editingId}
                        onDone={() => setScreen('roster')} />
        )}
        {screen === 'stage' && <StageScreen catalog={catalog} />}
      </main>
    </div>
  )
}
