import type { Catalog } from '../../catalog/build'

export interface StageScreenProps {
  catalog: Catalog
}

// Stub — the real stage screen (drag-and-drop backdrop, characters, props) lands in
// a later task. This keeps App.tsx compiling against the final prop signature so the
// real implementation can drop in without touching App.tsx.
export function StageScreen(_props: StageScreenProps) {
  return <div data-testid="stage-screen" />
}
