export interface SkinTone {
  id: string
  name: string
  skin1: string
  skin2: string
  skin3: string
}

export const SKIN_TONES: SkinTone[] = [
  { id: 'porcelain', name: 'Porcelain', skin1: '#FBE3CE', skin2: '#EFCDB2', skin3: '#F0A79B' },
  { id: 'sand',      name: 'Sand',      skin1: '#F7D2B0', skin2: '#E7B892', skin3: '#EC9A8D' },
  { id: 'honey',     name: 'Honey',     skin1: '#EFB98C', skin2: '#DA9C6C', skin3: '#DE8878' },
  { id: 'amber',     name: 'Amber',     skin1: '#D79A6A', skin2: '#BE7F50', skin3: '#C4715F' },
  { id: 'clay',      name: 'Clay',      skin1: '#B87A4F', skin2: '#9C6039', skin3: '#A65B48' },
  { id: 'cocoa',     name: 'Cocoa',     skin1: '#8C5734', skin2: '#6F4124', skin3: '#7E4433' },
  { id: 'espresso',  name: 'Espresso',  skin1: '#603A22', skin2: '#472817', skin3: '#552F20' },
  { id: 'ebony',     name: 'Ebony',     skin1: '#412618', skin2: '#2C1810', skin3: '#3A1F16' },
]

export const DEFAULT_SKIN_ID = 'sand'

const BY_ID = new Map(SKIN_TONES.map((t) => [t.id, t]))
const DEFAULT = BY_ID.get(DEFAULT_SKIN_ID)!

export function skinVars(id: string): Record<string, string> {
  const t = BY_ID.get(id) ?? DEFAULT
  return { skin1: t.skin1, skin2: t.skin2, skin3: t.skin3 }
}
