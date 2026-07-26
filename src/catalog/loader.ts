import { buildCatalog, type Catalog } from './build'
import type { BodySpec } from './types'

const files = import.meta.glob('/src/assets/**/*.svg', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

const specFiles = import.meta.glob('/specs/bodies/*.json', {
  import: 'default', eager: true,
}) as Record<string, BodySpec>

const specs = Object.fromEntries(
  Object.entries(specFiles).map(([path, spec]) => [
    path.replace(/^.*\/bodies\//, '').replace(/\.json$/, ''),
    spec,
  ]),
)

export const catalog: Catalog = buildCatalog(files, specs)
