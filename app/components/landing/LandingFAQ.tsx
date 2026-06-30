'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'O acesso ao Hub tem algum custo?', a: 'Não. O Fropty Hub é incluído em todos os planos — produto, projeto ou segurança. Sem taxa de ativação, sem mensalidade separada, sem surpresa na fatura.' },
  { q: 'Já usamos Zendesk / Freshdesk. Vale migrar?', a: 'O Hub não é apenas um help desk. Ele une chamados, projetos, contratos, financeiro e Health Score no mesmo portal. Se você usa mais de uma ferramenta para gerenciar clientes hoje, o Hub substitui todas elas — sem custo adicional, incluído no plano Fropty.' },
  { q: 'Quanto tempo leva para ter acesso?', a: 'Em até 24h úteis após a contratação você recebe um e-mail com credenciais e guia de onboarding. O portal já vem configurado com os dados do seu contrato.' },
  { q: 'O que acontece com meu acesso se eu cancelar um produto Fropty?', a: 'O acesso ao Hub permanece ativo enquanto houver qualquer contrato ativo com a Fropty. O histórico de chamados, projetos e documentos fica disponível para consulta mesmo após o encerramento.' },
  { q: 'Posso adicionar outros usuários da minha empresa?', a: 'Sim. Dependendo do plano, você pode convidar usuários com perfis diferentes — gestor, financeiro, técnico e visualizador — cada um com acesso restrito ao que precisa.' },
  { q: 'O Hub funciona para todos os produtos da Fropty?', a: 'Sim. Um login acessa tudo: chamados do Boost, projetos do FroptyApps, alertas do Sentinel, financeiro de qualquer produto. Sem portais separados por produto.' },
  { q: 'Existe integração com Slack ou outras ferramentas?', a: 'Sim. O Hub envia notificações de chamado e status de projeto via Slack. Webhooks permitem conectar com ERPs, CRMs e sistemas internos. Novas integrações podem ser votadas no módulo Roadmap.' },
]

export function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>
            Dúvidas frequentes
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-1px', margin: 0 }}>
            Perguntas e respostas
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  all: 'unset', width: '100%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  padding: '16px 20px',
                  fontSize: 14, fontWeight: 600, color: 'var(--text)',
                }}
              >
                {faq.q}
                <ChevronDown size={16} style={{ flexShrink: 0, color: 'var(--text-muted)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <div style={{
                display: 'grid',
                gridTemplateRows: open === i ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.25s ease',
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, padding: '0 20px 16px', fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
