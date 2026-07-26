import { useMemo, type CSSProperties } from 'react'
import type { Catalog } from '../catalog/build'
import type { Character } from '../catalog/types'
import { composeCharacter } from './composition'

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

  return (
    <svg
      viewBox="0 0 400 600"
      className={`${quality === 'high' ? 'quality-high' : 'quality-flat'} ${className ?? ''}`}
      role="img"
    >
      <title>{title ?? character.name}</title>
      {layers.map((l) => (
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
