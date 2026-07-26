import { useState } from 'react'
import { catalog } from '../catalog/loader'
import { CharacterSvg } from '../render/CharacterSvg'
import {
  ACCESSORY_SLOTS, BODY_TYPES, LIFE_STAGES, SLOTS, STAGE_LABELS, bundleKey,
  type BodyType, type Character, type LifeStage, type Slot,
} from '../catalog/types'
import { DEFAULT_SKIN_ID } from '../render/skinTones'

const blank = (stage: LifeStage, bodyType: BodyType, slot?: Slot, assetId?: string): Character => ({
  id: 'sheet', name: assetId ?? 'base', stage, bodyType, skinToneId: DEFAULT_SKIN_ID,
  slots: slot && assetId ? { [slot]: { assetId, colors: {} } } : {},
  createdAt: 0, updatedAt: 0,
})

const initialStage = (): LifeStage => {
  const q = new URLSearchParams(window.location.search).get('stage')
  return (LIFE_STAGES as readonly string[]).includes(q ?? '') ? (q as LifeStage) : 'adult'
}

export function ContactSheet() {
  const [stage, setStage] = useState<LifeStage>(initialStage)
  const [bodyType, setBodyType] = useState<BodyType>('female')
  const key = bundleKey(stage, bodyType)
  const bundlePools = catalog.bundle[key]
  const headClass = catalog.specs[key]?.headSizeClass
  const accessoryPools = headClass ? catalog.accessories[headClass] : undefined
  const poolFor = (slot: Slot) =>
    (ACCESSORY_SLOTS.includes(slot) ? accessoryPools?.[slot] : bundlePools[slot]) ?? []

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap gap-2">
        {LIFE_STAGES.map((s) => (
          <button key={s} onClick={() => setStage(s)}
            className={`rounded-pill px-3 py-1 text-sm ${s === stage ? 'bg-peri text-white' : 'bg-white'}`}>
            {STAGE_LABELS[s]}
          </button>
        ))}
        {BODY_TYPES.map((b) => (
          <button key={b} onClick={() => setBodyType(b)}
            className={`rounded-pill px-3 py-1 text-sm ${b === bodyType ? 'bg-coral text-white' : 'bg-white'}`}>
            {b}
          </button>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide opacity-60">Base body</h2>
        <div className="w-40 rounded-xl bg-white p-2">
          <CharacterSvg character={blank(stage, bodyType)} catalog={catalog} />
        </div>
      </section>

      {SLOTS.map((slot) => (
        poolFor(slot).length > 0 && (
          <section key={slot} className="mb-8">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide opacity-60">
              {slot} · {poolFor(slot).length}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
              {poolFor(slot).map((a) => (
                <figure key={a.id} className="rounded-xl bg-white p-2">
                  <CharacterSvg character={blank(stage, bodyType, slot, a.id)} catalog={catalog} />
                  <figcaption className="mt-1 truncate text-center text-xs opacity-60">{a.name}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  )
}
