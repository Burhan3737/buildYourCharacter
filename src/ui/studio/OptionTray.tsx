import { useMemo } from 'react'
import type { Catalog, SlotPools } from '../../catalog/build'
import type { AssetRecord } from '../../catalog/parse'
import { ACCESSORY_SLOTS, bundleKey, type Character, type Slot } from '../../catalog/types'
import { CharacterSvg } from '../../render/CharacterSvg'
import { hiddenSlots } from '../../render/composition'
import { SKIN_TONES } from '../../render/skinTones'
import { GARMENT_PALETTE, HAIR_PALETTE } from '../../state/palettes'
import type { Category } from './categories'
import { SwatchRow } from './SwatchRow'

export const SLOT_LABELS: Record<Slot, string> = {
  eyes: 'Eyes', brows: 'Brows', mouth: 'Mouth',
  hair: 'Hair', top: 'Top', bottom: 'Bottom', onepiece: 'Dress', shoes: 'Shoes',
  glasses: 'Glasses', headwear: 'Headwear', earrings: 'Earrings', necklace: 'Necklace',
  costume: 'Costume',
}

export interface OptionTrayProps {
  category: Category
  character: Character
  catalog: Catalog
  onEquip: (slot: Slot, asset: AssetRecord) => void
  onUnequip: (slot: Slot) => void
  onRecolor: (slot: Slot, color: string) => void
  onSkinTone: (skinToneId: string) => void
}

export function OptionTray({
  category, character, catalog, onEquip, onUnequip, onRecolor, onSkinTone,
}: OptionTrayProps) {
  const hidden = useMemo(() => hiddenSlots(character, catalog), [character, catalog])

  const key = bundleKey(character.stage, character.bodyType)
  // Both maps are complete by construction, but a hand-built catalog need not be.
  const bundlePools: SlotPools | undefined = catalog.bundle[key]
  const headClass = catalog.specs[key]?.headSizeClass
  const accessoryPools: SlotPools | undefined =
    headClass ? catalog.accessories[headClass] : undefined

  const poolFor = (slot: Slot): AssetRecord[] =>
    (ACCESSORY_SLOTS.includes(slot) ? accessoryPools?.[slot] : bundlePools?.[slot]) ?? []

  const skinTone = SKIN_TONES.find((t) => t.id === character.skinToneId)

  return (
    <div data-testid="option-tray" className="flex flex-col gap-4">
      {category.key === 'face' && (
        <section className="flex flex-col gap-2" aria-label="Skin tone">
          <h3 className="text-xs font-bold uppercase tracking-wide text-ink/50">Skin tone</h3>
          <SwatchRow
            id="skin"
            label="Skin tone"
            colors={SKIN_TONES.map((t) => t.skin1)}
            value={skinTone?.skin1}
            onChange={(_color, i) => onSkinTone(SKIN_TONES[i].id)}
          />
        </section>
      )}

      {category.slots.map((slot) => {
        const pool = poolFor(slot)
        const isHidden = hidden.has(slot)
        const equipped = character.slots[slot]
        const asset = equipped ? catalog.byId[equipped.assetId] : undefined
        const ramp = slot === 'hair' ? HAIR_PALETTE : GARMENT_PALETTE
        const colorVar = asset?.colors[0]
        const value = colorVar ? equipped?.colors[colorVar] : undefined

        return (
          <section
            key={slot}
            data-testid={`section-${slot}`}
            aria-label={SLOT_LABELS[slot]}
            className={`flex flex-col gap-2 ${isHidden ? 'opacity-60' : ''}`}
          >
            <header className="flex items-baseline justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink/50">
                {SLOT_LABELS[slot]}
              </h3>
              {isHidden && (
                <p data-testid={`hidden-${slot}`} className="text-[11px] font-medium text-coral">
                  Hidden by costume
                </p>
              )}
            </header>

            {category.key !== 'face' && (
              <SwatchRow
                id={slot}
                label={`${SLOT_LABELS[slot]} colour`}
                colors={ramp}
                value={value}
                disabled={isHidden || !colorVar}
                onChange={(color) => onRecolor(slot, color)}
              />
            )}

            {pool.length === 0 ? (
              <p className="rounded-2xl bg-white/60 px-3 py-4 text-center text-xs text-ink/40">
                Nothing here yet
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {pool.map((option) => (
                  <OptionTile
                    key={option.id}
                    slot={slot}
                    option={option}
                    character={character}
                    catalog={catalog}
                    selected={equipped?.assetId === option.id}
                    disabled={isHidden}
                    onClick={() =>
                      equipped?.assetId === option.id ? onUnequip(slot) : onEquip(slot, option)}
                  />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

interface OptionTileProps {
  slot: Slot
  option: AssetRecord
  character: Character
  catalog: Catalog
  selected: boolean
  disabled: boolean
  onClick: () => void
}

function OptionTile({
  slot, option, character, catalog, selected, disabled, onClick,
}: OptionTileProps) {
  // A true preview: this character, with only this one slot swapped.
  const preview = useMemo<Character>(() => ({
    ...character,
    slots: {
      ...character.slots,
      [slot]: { assetId: option.id, colors: character.slots[slot]?.colors ?? {} },
    },
  }), [character, slot, option.id])

  return (
    <button
      type="button"
      data-testid={`option-${option.id}`}
      aria-label={option.name}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={[
        'aspect-square overflow-hidden rounded-2xl bg-white p-1 transition',
        'disabled:cursor-not-allowed disabled:opacity-40',
        selected ? 'ring-2 ring-peri' : 'ring-1 ring-ink/10 hover:ring-ink/30',
      ].join(' ')}
    >
      <CharacterSvg
        character={preview}
        catalog={catalog}
        quality="flat"
        title={option.name}
        className="h-full w-full"
      />
    </button>
  )
}
