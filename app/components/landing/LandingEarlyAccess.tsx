import type React from 'react'

const PERKS = [
  {
    icon: '⚡',
    title: 'Ativação prioritária',
    desc: 'Primeiros clientes têm acesso ativado em até 2h úteis — antes da fila padrão de 24h.',
  },
  {
    icon: '🎯',
    title: 'Onboarding dedicado',
    desc: 'Sessão ao vivo com nossa equipe para configurar o portal de acordo com o seu fluxo.',
  },
  {
    icon: '🗺️',
    title: 'Voto duplo no Roadmap',
    desc: 'Clientes fundadores têm peso dobrado nas votações de novas funcionalidades.',
  },
  {
    icon: '🔒',
    title: 'Preço travado',
    desc: 'Condições dos primeiros clientes não mudam com futuras atualizações de plano.',
  },
]

export function LandingEarlyAccess() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="lp-hs-grid">

          {/* Left — copy */}
          <div className="sr">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(91,87,232,.1)', border: '1px solid rgba(91,87,232,.25)', borderRadius: 8, padding: '5px 12px', marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-500)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-500)' }}>Acesso antecipado aberto</span>
            </div>

            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 20px' }}>
              Seja um dos primeiros clientes do Fropty Hub.
            </h2>

            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, margin: '0 0 12px' }}>
              O Hub está em lançamento. Estamos abrindo o acesso com acompanhamento próximo — cada cliente fundador ajuda a moldar o produto.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
              Em troca, oferecemos condições que não estarão disponíveis depois que escalarmos.
            </p>
          </div>

          {/* Right — perks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {PERKS.map((p, i) => (
              <div key={i} className="sr" style={{
                '--sr-delay': `${i * 60}ms`,
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '20px 18px',
              } as React.CSSProperties}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>{p.title}</div>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
