/**
 * Asset ids are prefixed with the asset id, which makes them unique *across* assets
 * but not across multiple rendered *instances* of the same asset. Three adult-female
 * bodies on one page all define `bodies-adult-female-base__skin`, and every
 * `url(#bodies-adult-female-base__skin)` in the document resolves to the first one —
 * so all three inherit the first character's colours.
 *
 * This rewrites a single layer's markup so its ids, and every reference to them, are
 * suffixed with a token unique to the rendering instance.
 */

/**
 * Ids that are global by design and must survive untouched. `sp-drop` is the one
 * shared drop-shadow filter mounted by ShadowDefs and referenced from index.css via
 * `.quality-high .sp-shadow { filter: url(#sp-drop); }`. It lives outside any asset
 * markup, so it should never reach this function — but never rewriting it means a
 * stray reference can never break the shadow either.
 */
const GLOBAL_IDS = new Set(['sp-drop'])

/** `id="x"` / `id='x'`, but not `data-id=` or any other `*-id=` attribute. */
const ID_ATTR = /(?<![-\w:])id\s*=\s*(["'])([^"']*)\1/g

/** `url(#x)`, `url("#x")`, `url('#x')`, with optional surrounding whitespace. */
const URL_REF = /\burl\(\s*(["']?)#([^"')\s]+)\1\s*\)/g

/** `href="#x"` and `xlink:href="#x"` — fragment references only. */
const HREF_ATTR = /(?<![-\w:])((?:xlink:)?href)\s*=\s*(["'])#([^"']*)\2/g

export function namespaceIds(markup: string, token: string): string {
  if (!token) return markup

  const rename = (id: string) => (GLOBAL_IDS.has(id) ? id : `${id}-${token}`)

  return markup
    .replace(ID_ATTR, (m, q: string, id: string) =>
      id && !GLOBAL_IDS.has(id) ? `id=${q}${rename(id)}${q}` : m)
    .replace(URL_REF, (m, q: string, id: string) =>
      GLOBAL_IDS.has(id) ? m : `url(${q}#${rename(id)}${q})`)
    .replace(HREF_ATTR, (m, attr: string, q: string, id: string) =>
      id && !GLOBAL_IDS.has(id) ? `${attr}=${q}#${rename(id)}${q}` : m)
}

/** React's useId yields `:r0:`; `:` is not usable inside `url(#…)` or a selector. */
export const sanitizeToken = (raw: string): string => raw.replace(/[^A-Za-z0-9_-]/g, '')
