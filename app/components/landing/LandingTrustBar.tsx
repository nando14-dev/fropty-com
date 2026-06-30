import type React from 'react'

const PRODUCTS = ['Fropty Boost', 'Fropty Cash', 'Fropty Invest', 'Fropty Apps', 'Fropty Sentinel', 'Fropty Hub']

const base = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS]
const track = [...base, ...base]

const pill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  padding: '5px 16px',
  border: '1px solid var(--bd)',
  background: 'var(--s)',
  borderRadius: 100,
  fontSize: 12.5,
  fontWeight: 600,
  color: 'var(--t2)',
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

export function LandingTrustBar() {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '16px 0', background: 'var(--bg-alt)' }}>
      <div className="marquee-outer marquee-outer--fullbleed">
        <div className="marquee-track marquee-track--products">
          {track.map((name, i) => (
            <span key={i} style={pill}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--t3)', flexShrink: 0 }} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
