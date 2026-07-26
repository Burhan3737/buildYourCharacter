import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { BODY_TYPES, HEAD_SIZE_CLASSES, LIFE_STAGES, bundleKey, type BodySpec } from './types'

const DIR = join(process.cwd(), 'specs', 'bodies')
const read = (f: string): BodySpec => JSON.parse(readFileSync(join(DIR, f), 'utf8'))

describe('body specs', () => {
  it('has exactly one file per bundle', () => {
    const files = readdirSync(DIR).filter((f) => f.endsWith('.json')).sort()
    const want = LIFE_STAGES.flatMap((s) => BODY_TYPES.map((b) => `${bundleKey(s, b)}.json`)).sort()
    expect(files).toEqual(want)
  })

  const files = readdirSync(DIR).filter((f) => f.endsWith('.json'))

  it.each(files)('%s uses the canonical canvas and ground line', (f) => {
    const s = read(f)
    expect(s.viewBox).toEqual([0, 0, 400, 600])
    expect(s.footLine).toBe(570)
  })

  it.each(files)('%s is anatomically ordered head -> shoulders -> torso -> hips -> feet', (f) => {
    const s = read(f)
    expect(s.head.cy).toBeLessThan(s.shoulders[0].y)
    expect(s.shoulders[0].y).toBeLessThanOrEqual(s.torso.y + 8)
    expect(s.torso.y).toBeLessThan(s.hips.y)
    expect(s.hips.y + s.hips.h).toBeLessThan(s.footLine)
  })

  it.each(files)('%s keeps the head inside the canvas', (f) => {
    const s = read(f)
    expect(s.head.cy - s.head.ry).toBeGreaterThanOrEqual(0)
    expect(s.head.cx - s.head.rx).toBeGreaterThanOrEqual(0)
    expect(s.head.cx + s.head.rx).toBeLessThanOrEqual(400)
  })

  it.each(files)('%s centres the figure and puts the eye line on the face', (f) => {
    const s = read(f)
    expect(s.head.cx).toBe(200)
    expect(s.torso.x + s.torso.w / 2).toBe(200)
    expect(s.eyeLine).toBeGreaterThan(s.head.cy - s.head.ry)
    expect(s.eyeLine).toBeLessThan(s.head.cy + s.head.ry)
  })

  it.each(files)('%s declares a known head size class and symmetric ears', (f) => {
    const s = read(f)
    expect(HEAD_SIZE_CLASSES).toContain(s.headSizeClass)
    expect(s.ears[0].x + s.ears[1].x).toBe(400)
    expect(s.ears[0].y).toBe(s.ears[1].y)
  })
})
