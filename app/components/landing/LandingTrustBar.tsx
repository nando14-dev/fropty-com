'use client'

const PROOF = [
  { value: '200+', label: 'clientes ativos' },
  { value: '98%', label: 'CSAT médio' },
  { value: '< 4h', label: 'tempo de resposta' },
  { value: '99.9%', label: 'uptime garantido' },
  { value: '13', label: 'módulos integrados' },
  { value: 'LGPD', label: 'em conformidade' },
  { value: '< 24h', label: 'ativação do portal' },
  { value: '7 produtos', label: 'do ecossistema Fropty' },
]

const base = [...PROOF, ...PROOF]
export function LandingTrustBar() {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '16px 0', background: 'var(--surface)' }}>
      <div className="marquee-outer marquee-outer--fullbleed">
        <div className="marquee-track marquee-track--products">
          {base.map((p, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '4px 14px', borderRadius: 100,
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                fontSize: 12.5,
                whiteSpace: 'nowrap',
              }}>
                <strong style={{ fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.3px' }}>{p.value}</strong>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{p.label}</span>
              </span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border)', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
