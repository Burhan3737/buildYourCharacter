import type { Catalog } from '../../catalog/build'
import { useAppStore } from '../../state/appStore'
import { CharacterCard } from './CharacterCard'

export interface RosterScreenProps {
  catalog: Catalog
  onEdit: (id: string) => void
}

export function RosterScreen({ catalog, onEdit }: RosterScreenProps) {
  const characters = useAppStore((s) => s.characters)
  const create = useAppStore((s) => s.createCharacter)
  const addRandom = useAppStore((s) => s.addRandomCharacter)
  const duplicate = useAppStore((s) => s.duplicateCharacter)
  const remove = useAppStore((s) => s.deleteCharacter)

  return (
    <div className="h-full overflow-y-auto px-4 pb-10">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-black">Characters</h1>
        <div className="ml-auto flex gap-2">
          <button className="rounded-pill bg-white px-4 py-2 text-sm font-semibold"
                  onClick={() => addRandom(catalog)}>🎲 Surprise me</button>
          <button className="rounded-pill bg-coral px-4 py-2 text-sm font-bold text-white"
                  onClick={() => onEdit(create(catalog).id)}>New character</button>
        </div>
      </div>

      {characters.length === 0 ? (
        <p className="mt-16 text-center opacity-60">
          No characters yet — make your first one.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4">
          {characters.map((c) => (
            <CharacterCard key={c.id} character={c} catalog={catalog}
                           onEdit={onEdit} onDuplicate={duplicate} onDelete={remove} />
          ))}
        </div>
      )}
    </div>
  )
}
