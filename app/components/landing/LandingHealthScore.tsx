import type React from 'react'

const METRICS = [
  { label: 'Satisfação', value: 92, color: 'var(--c-success)' },
  { label: 'Tickets', value: 88, color: 'var(--brand-500)' },
  { label: 'Uso', value: 74, color: 'var(--c-info)' },
  { label: 'Engajamento', value: 81, color: '#F97316' },
  { label: 'Receita', value: 95, color: 'var(--c-success)' },
]

const RISK_LEVELS = [
  { label: 'Saudável', score: '80–100', color: 'var(--c-success)', bg: 'rgba(34,197,94,.1)', border: 'rgba(34,197,94,.25)', desc: 'Cliente engajado. Momento ideal para upsell.' },
  { label: 'Atenção', score: '50–79', color: '#F97316', bg: 'rgba(249,115,22,.1)', border: 'rgba(249,115,22,.25)', desc: 'Sinais de redução de uso. Acionar CS preventivamente.' },
  { label: 'Em risco', score: '0–49', color: 'var(--c-danger)', bg: 'rgba(220,38,38,.1)', border: 'rgba(220,38,38,.25)', desc: 'Churn iminente. Intervenção imediata necessária.' },
]

export function LandingHealthScore() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="lp-hs-grid">

          {/* Left — copy */}
          <div className="sr">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 14 }}>
              Diferencial exclusivo
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 20px' }}>
              Você sabe quando um cliente está prestes a cancelar?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, margin: '0 0 28px' }}>
              O Health Score do Hub monitora satisfação, tickets, uso, engajamento e receita em tempo real. Você recebe um alerta antes de perder o contrato — não depois.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              Nenhum help desk tradicional faz isso. O Hub não é um help desk.
            </p>

            {/* Risk levels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
              {RISK_LEVELS.map((r, i) => (
                <div key={i} className="sr" style={{
                  '--sr-delay': `${i * 60}ms`,
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px', borderRadius: 10,
                  background: r.bg, border: `1px solid ${r.border}`,
                } as React.CSSProperties}>
                  <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 64 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: r.color }}>{r.label}</div>
                    <div style={{ fontSize: 10, color: r.color, opacity: 0.7 }}>{r.score}</div>
                  </div>
                  <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mockup */}
          <div className="sr" style={{ '--sr-delay': '100ms' } as React.CSSProperties}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '28px',
              boxShadow: '0 24px 64px rgba(0,0,0,.18)',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>Health Score</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>Empresa Exemplo Ltda.</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--c-success)', letterSpacing: '-2px', lineHeight: 1 }}>87</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-success)', marginTop: 2 }}>Saudável</div>
                </div>
              </div>

              {/* Score bar */}
              <div style={{ position: 'relative', marginBottom: 28 }}>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '87%', borderRadius: 99, background: 'linear-gradient(90deg, var(--c-danger) 0%, #F97316 35%, var(--c-success) 70%)' }} />
                </div>
                <div style={{ position: 'absolute', left: '87%', top: '50%', transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: 'var(--c-success)', border: '2px solid var(--bg)', boxShadow: '0 0 0 2px var(--c-success)' }} />
              </div>

              {/* Metric bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {METRICS.map((m, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{m.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.value}</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--border)', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${m.value}%`, background: m.color, borderRadius: 99, opacity: 0.85 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Alert chip */}
              <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 8, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-success)', flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: 'var(--c-success)' }}>Sem alertas. Cliente em expansão potencial.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
