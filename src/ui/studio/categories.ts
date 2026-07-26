import type { Slot } from '../../catalog/types'

export interface Category { key: string; label: string; icon: string; slots: Slot[] }

export const CATEGORIES: Category[] = [
  { key: 'face', label: 'Face', icon: '🙂', slots: ['eyes', 'brows', 'mouth'] },
  // Facial hair rides with the hair, as it does in Toca Boca World's own Face & hair cluster —
  // one rail button, two sections, so beard and hair colour sit side by side.
  { key: 'hair', label: 'Hair', icon: '💇', slots: ['hair', 'beard'] },
  { key: 'top', label: 'Tops', icon: '👕', slots: ['top'] },
  { key: 'bottom', label: 'Bottoms', icon: '👖', slots: ['bottom'] },
  { key: 'onepiece', label: 'Dresses', icon: '👗', slots: ['onepiece'] },
  { key: 'shoes', label: 'Shoes', icon: '👟', slots: ['shoes'] },
  { key: 'accessories', label: 'Extras', icon: '🕶️', slots: ['glasses', 'headwear', 'earrings', 'necklace'] },
  { key: 'costume', label: 'Costumes', icon: '🦸', slots: ['costume'] },
]
