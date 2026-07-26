export interface NavProps {
  screen: 'roster' | 'studio' | 'stage'
  onRoster: () => void
  onStage: () => void
}

export function Nav({ screen, onRoster, onStage }: NavProps) {
  const cls = (active: boolean) =>
    `rounded-pill px-4 py-2 text-sm font-semibold ${active ? 'bg-peri text-white' : 'bg-white'}`

  return (
    <nav className="flex items-center gap-2 px-4 py-3">
      <span className="mr-2 text-lg font-black tracking-tight">TocaCraft</span>
      <button className={cls(screen === 'roster')} onClick={onRoster}>Characters</button>
      <button className={cls(screen === 'stage')} onClick={onStage}>Stage</button>
    </nav>
  )
}
