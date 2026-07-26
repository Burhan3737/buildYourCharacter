import { useId, useMemo, type CSSProperties } from 'react'
import type { Catalog } from '../catalog/build'
import type { Character } from '../catalog/types'
import { composeCharacter } from './composition'
import { namespaceIds, sanitizeToken } from './namespaceIds'

export interface CharacterSvgProps {
  character: Character
  catalog: Catalog
  quality?: 'high' | 'flat'
  className?: string
  title?: string
}

const toCssVars = (colors: Record<string, string>): CSSProperties =>
  Object.fromEntries(
    Object.entries(colors).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties

export function CharacterSvg({
  character, catalog, quality = 'high', className, title,
}: CharacterSvgProps) {
  const layers = useMemo(
    () => composeCharacter(character, catalog),
    [character, catalog],
  )

  // Asset ids are unique per asset, not per instance. Suffix them with a token unique
  // to this rendered instance so two characters wearing the same asset do not share
  // (and therefore steal) each other's gradients, clip paths and masks.
  const token = sanitizeToken(useId())
  const instanceLayers = useMemo(
    () => layers.map((l) => ({ ...l, markup: namespaceIds(l.markup, token) })),
    [layers, token],
  )

  return (
    <svg
      viewBox="0 0 400 600"
      className={`${quality === 'high' ? 'quality-high' : 'quality-flat'} ${className ?? ''}`}
      role="img"
    >
      <title>{title ?? character.name}</title>
      {instanceLayers.map((l) => (
        <g
          key={l.key}
          style={toCssVars(l.colors)}
          transform={l.transform}
          dangerouslySetInnerHTML={{ __html: l.markup }}
        />
      ))}
    </svg>
  )
}
