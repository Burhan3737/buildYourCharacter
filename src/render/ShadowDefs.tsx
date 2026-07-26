export function ShadowDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <filter id="sp-drop" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3A4A66" floodOpacity="0.26" />
        </filter>
      </defs>
    </svg>
  )
}
