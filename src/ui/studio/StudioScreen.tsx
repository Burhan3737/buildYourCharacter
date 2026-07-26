import type { Catalog } from '../../catalog/build'

export interface StudioScreenProps {
  catalog: Catalog
  characterId: string
  onDone: () => void
}

// Stub — the real studio screen (rail, stage strip, option tray, swatches, drawer)
// lands in a later task. This keeps App.tsx compiling against the final prop
// signature so the real implementation can drop in without touching App.tsx.
export function StudioScreen(_props: StudioScreenProps) {
  return <div data-testid="studio-screen" />
}
