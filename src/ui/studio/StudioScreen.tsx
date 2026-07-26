import { useState } from 'react'
import type { Catalog } from '../../catalog/build'
import type { AssetRecord } from '../../catalog/parse'
import type { Slot } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'
import { useAppStore } from '../../state/appStore'
import { randomCharacter } from '../../state/randomizer'
import { CategoryRail } from './CategoryRail'
import { CATEGORIES } from './categories'
import { OptionTray } from './OptionTray'
import { StageStrip } from './StageStrip'

export interface StudioScreenProps {
  catalog: Catalog
  characterId: string
  onDone: () => void
}

const ACTION = 'rounded-pill px-4 py-2 text-sm font-semibold transition'

export function StudioScreen({ catalog, characterId, onDone }: StudioScreenProps) {
  const character = useAppStore((s) => s.characters.find((c) => c.id === characterId))
  const equip = useAppStore((s) => s.equip)
  const unequip = useAppStore((s) => s.unequip)
  const setStage = useAppStore((s) => s.setStage)
  const setBodyType = useAppStore((s) => s.setBodyType)
  const updateCharacter = useAppStore((s) => s.updateCharacter)

  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0].key)

  if (!character) {
    return (
      <div data-testid="studio-screen" className="p-6 text-sm text-ink/60">
        That character no longer exists.
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.key === categoryKey) ?? CATEGORIES[0]

  /** Seed a new garment with the colours already chosen for that slot. */
  const onEquip = (slot: Slot, asset: AssetRecord) => {
    const carried = character.slots[slot]?.colors ?? {}
    const colors: Record<string, string> = {}
    for (const v of asset.colors) if (carried[v]) colors[v] = carried[v]
    equip(character.id, slot, asset.id, colors)
  }

  /** The swatch row drives the asset's primary colour variable. */
  const onRecolor = (slot: Slot, color: string) => {
    const equipped = character.slots[slot]
    const asset = equipped ? catalog.byId[equipped.assetId] : undefined
    const primary = asset?.colors[0]
    if (!equipped || !primary) return
    equip(character.id, slot, equipped.assetId, { ...equipped.colors, [primary]: color })
  }

  const onSurprise = () => {
    const rolled = randomCharacter(catalog, Math.random, {
      stage: character.stage, bodyType: character.bodyType,
    })
    updateCharacter(character.id, { slots: rolled.slots, skinToneId: rolled.skinToneId })
  }

  const tray = (
    <OptionTray
      category={category}
      character={character}
      catalog={catalog}
      onEquip={onEquip}
      onUnequip={(slot) => unequip(character.id, slot)}
      onRecolor={onRecolor}
      onSkinTone={(skinToneId) => updateCharacter(character.id, { skinToneId })}
    />
  )

  return (
    <div
      data-testid="studio-screen"
      className="grid h-full min-h-0 grid-cols-[70px_1fr_300px]"
    >
      <CategoryRail active={category.key} orientation="vertical" onSelect={setCategoryKey} />

      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto px-4 py-3">
        <StageStrip
          stage={character.stage}
          bodyType={character.bodyType}
          onStage={(stage) => setStage(character.id, stage, catalog)}
          onBodyType={(bodyType) => setBodyType(character.id, bodyType, catalog)}
        />

        <h1 data-testid="character-name" className="text-lg font-black tracking-tight">
          {character.name}
        </h1>

        <div
          data-testid="character-stage"
          className="flex min-h-0 w-full max-w-[320px] flex-1 items-center justify-center
                     rounded-[2rem] bg-gradient-to-b from-white to-page shadow-inner"
        >
          <CharacterSvg character={character} catalog={catalog} className="h-full w-full" />
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 pb-2">
          <button
            type="button"
            data-testid="reset"
            onClick={() => updateCharacter(character.id, { slots: {} })}
            className={`${ACTION} bg-white text-ink/70 hover:text-ink`}
          >
            Reset
          </button>
          <button
            type="button"
            data-testid="surprise"
            onClick={onSurprise}
            className={`${ACTION} bg-butter text-ink`}
          >
            Surprise me
          </button>
          <button
            type="button"
            data-testid="done"
            onClick={onDone}
            className={`${ACTION} bg-peri text-white shadow-sm`}
          >
            Done
          </button>
        </div>
      </div>

      <aside
        data-testid="tray"
        className="min-h-0 w-[300px] overflow-y-auto border-l border-ink/5 bg-white/70 px-3 py-3"
      >
        {tray}
      </aside>
    </div>
  )
}
