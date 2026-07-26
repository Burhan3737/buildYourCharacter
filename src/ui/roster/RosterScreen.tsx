import type { Catalog } from '../../catalog/build'

export interface RosterScreenProps {
  catalog: Catalog
  onEdit: (id: string) => void
}

// Stub — the real roster screen (grid of character cards, create/duplicate/delete,
// randomizer) lands in a later task. This keeps App.tsx compiling against the final
// prop signature so the real implementation can drop in without touching App.tsx.
export function RosterScreen(_props: RosterScreenProps) {
  return <div data-testid="roster-screen" />
}
