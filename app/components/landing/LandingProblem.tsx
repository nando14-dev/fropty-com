import type React from 'react'

const BEFORE = [
  'Suporte por WhatsApp, sem rastreabilidade',
  'Status do projeto via e-mail a cada semana',
  'Contrato em PDF perdido na caixa de entrada',
  'Cobrança explicada em reunião de 1h',
  'Cliente repete a mesma pergunta três vezes',
  'Churn descoberto depois do cancelamento',
]

const AFTER = [
  'Chamado aberto, rastreado e com SLA garantido',
  'Progresso do projeto em tempo real, sem perguntar',
  'Contrato assinado, acessível e versionado',
  'Financeiro transparente — fatura, NF e extrato em um clique',
  'Knowledge Base resolve antes de você precisar responder',
  'Health Score avisa quando o cliente está em risco',
]

export function LandingProblem() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>
            A mudança
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-1px', margin: 0 }}>
            Como era. Como fica.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="lp-problem-grid">
          {/* ANTES */}
          <div className="sr" style={{ '--sr-delay': '0ms', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 28px' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-danger)', boxShadow: '0 0 0 3px rgba(220,38,38,.18)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-danger)' }}>Antes do Hub</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {BEFORE.map((item, i) => (
                <div key={i} className="sr" style={{ '--sr-delay': `${i * 50}ms`, display: 'flex', alignItems: 'flex-start', gap: 12 } as React.CSSProperties}>
                  <span style={{ marginTop: 2, flexShrink: 0, fontSize: 14, color: 'var(--c-danger)', opacity: 0.7 }}>✕</span>
                  <span style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DEPOIS */}
          <div className="sr" style={{ '--sr-delay': '80ms', background: 'var(--surface)', border: '1px solid rgba(34,197,94,.2)', borderRadius: 16, padding: '32px 28px', position: 'relative', overflow: 'hidden' } as React.CSSProperties}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-success)', boxShadow: '0 0 0 3px rgba(34,197,94,.18)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-success)' }}>Com o Fropty Hub</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {AFTER.map((item, i) => (
                <div key={i} className="sr" style={{ '--sr-delay': `${i * 50 + 80}ms`, display: 'flex', alignItems: 'flex-start', gap: 12 } as React.CSSProperties}>
                  <span style={{ marginTop: 2, flexShrink: 0, fontSize: 14, color: 'var(--c-success)' }}>✓</span>
                  <span style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
