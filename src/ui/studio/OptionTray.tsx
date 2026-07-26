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

/**
 * Human-readable names for the colour variables an asset may declare. Anything
 * unmapped falls back to the raw variable name, so new variables still get a row.
 */
export const COLOR_VAR_LABELS: Record<string, string> = {
  c1: 'Main', c2: 'Shade', c3: 'Accent',
  hair1: 'Hair', hair2: 'Hair shade',
  eye1: 'Eyes', lip1: 'Lips',
}

export const colorVarLabel = (variable: string): string =>
  COLOR_VAR_LABELS[variable] ?? variable

/** Hair-coloured variables get the hair ramp wherever they are declared. */
export const paletteFor = (variable: string): string[] =>
  variable.startsWith('hair') ? HAIR_PALETTE : GARMENT_PALETTE

/** Screen-reader name for a row, without stuttering ("Eyes Eyes") on face slots. */
const rowLabel = (slot: Slot, variable: string): string => {
  const name = colorVarLabel(variable)
  return name === SLOT_LABELS[slot] ? `${name} colour` : `${SLOT_LABELS[slot]} ${name}`
}

export interface OptionTrayProps {
  category: Category
  character: Character
  catalog: Catalog
  onEquip: (slot: Slot, asset: AssetRecord) => void
  onUnequip: (slot: Slot) => void
  onRecolor: (slot: Slot, variable: string, color: string) => void
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

            {/* One row per variable the equipped asset declares; none if it declares none. */}
            {asset?.colors.map((variable) => (
              <div key={variable} className="flex items-center gap-2">
                <span
                  data-testid={`swatch-label-${slot}-${variable}`}
                  className="w-[68px] shrink-0 text-[11px] font-medium leading-tight text-ink/45"
                >
                  {colorVarLabel(variable)}
                </span>
                <SwatchRow
                  id={`${slot}-${variable}`}
                  label={rowLabel(slot, variable)}
                  colors={paletteFor(variable)}
                  value={equipped?.colors[variable]}
                  disabled={isHidden}
                  onChange={(color) => onRecolor(slot, variable, color)}
                />
              </div>
            ))}

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
