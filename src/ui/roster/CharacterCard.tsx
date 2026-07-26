import { useState } from 'react'
import type { Catalog } from '../../catalog/build'
import { STAGE_LABELS, type Character } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'

export interface CharacterCardProps {
  character: Character
  catalog: Catalog
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

export function CharacterCard({
  character, catalog, onEdit, onDuplicate, onDelete,
}: CharacterCardProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <figure data-testid={`card-${character.id}`}
            className="flex flex-col rounded-2xl bg-white p-3 shadow-sm">
      <button onClick={() => onEdit(character.id)}
              className="rounded-xl bg-page p-2"
              aria-label={`Edit ${character.name}`}>
        <CharacterSvg character={character} catalog={catalog} className="h-48 w-full"
                      title={`Preview of ${character.name}`} />
      </button>

      <figcaption className="mt-2">
        <div className="truncate font-semibold">{character.name}</div>
        <div className="text-xs opacity-60">
          {STAGE_LABELS[character.stage]} · {character.bodyType}
        </div>
      </figcaption>

      <div className="mt-3 flex gap-2 text-xs">
        <button className="rounded-pill bg-page px-3 py-1"
                onClick={() => onDuplicate(character.id)}>Duplicate</button>
        {confirming ? (
          <>
            <button className="rounded-pill bg-coral px-3 py-1 text-white"
                    onClick={() => onDelete(character.id)}>Confirm</button>
            <button className="rounded-pill bg-page px-3 py-1"
                    onClick={() => setConfirming(false)}>Cancel</button>
          </>
        ) : (
          <button className="rounded-pill bg-page px-3 py-1"
                  onClick={() => setConfirming(true)}>Delete</button>
        )}
      </div>
    </figure>
  )
}
