import type { ReactNode } from "react";

/* ── Shared sub-components ───────────────────────────────────── */

function StatusBar({ color = "#fff" }: { color?: string }) {
  return (
    <div className="relative z-10 flex h-7 items-center justify-between px-6 pt-1">
      <span className="text-[11px] font-bold" style={{ color }}>
        9:41
      </span>
      <div className="flex items-center gap-2">
        {/* WiFi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <circle cx="7" cy="9" r="1.1" fill={color} />
          <path
            d="M4.8 6.5C5.5 5.7 6.2 5.3 7 5.3s1.5.4 2.2 1.2"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M2.7 4.3C3.9 3 5.4 2.1 7 2.1s3.1.9 4.3 2.2"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
        {/* Battery */}
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <rect
            x="0.5" y="0.5" width="16" height="9" rx="2.5"
            stroke={color} strokeOpacity="0.5"
          />
          <rect
            x="17" y="3" width="2.5" height="4" rx="1.2"
            fill={color} fillOpacity="0.45"
          />
          <rect x="2" y="2" width="10" height="6" rx="1.8" fill={color} />
        </svg>
      </div>
    </div>
  );
}

function PhoneShell({
  children,
  glowColor,
}: {
  children: ReactNode;
  glowColor: string;
}) {
  return (
    <div
      className="relative w-[240px] shrink-0 rounded-[36px] bg-[#111]"
      style={{
        padding: "3px",
        boxShadow: `0 32px 64px -10px ${glowColor}60, 0 0 0 1px rgba(255,255,255,0.07), 0 10px 24px -6px rgba(0,0,0,0.7)`,
      }}
    >
      {/* Camera notch — sits inside the screen to clip with rounded corners */}
      <div className="relative overflow-hidden rounded-[34px]">
        <div className="absolute left-1/2 top-0 z-30 h-[20px] w-[66px] -translate-x-1/2 rounded-b-[14px] bg-[#111]" />
        {children}
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */

const orders = [
  { name: "Marcos Silva",   plate: "BRA-2A49", service: "Troca de óleo",      delay: "0s"  },
  { name: "Fernanda Costa", plate: "MG-3F78",  service: "Revisão geral",      delay: "-3s" },
  { name: "Carlos Mota",    plate: "SP-5J12",  service: "Freios dianteiros",  delay: "-6s" },
  { name: "Ricardo Gomes",  plate: "RJ-7K01",  service: "Suspensão traseira", delay: "-2s" },
];

const statusBadges = [
  {
    cls: "demo-status-1",
    style: "bg-orange-100 text-orange-700 border border-orange-200",
    label: "Em andamento",
  },
  {
    cls: "demo-status-2",
    style: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    label: "Concluído",
  },
  {
    cls: "demo-status-3",
    style: "bg-slate-100 text-slate-500 border border-slate-200",
    label: "Ag. peça",
  },
];

const appointments = [
  { day: "Seg 9h",  name: "Maria Santos", type: "Retorno",        label: "Confirmado", badgeCls: "bg-emerald-500", pulse: true,  delay: "0s"   },
  { day: "Ter 10h", name: "João Lima",    type: "Consulta geral", label: "Confirmado", badgeCls: "bg-emerald-500", pulse: true,  delay: "0.7s" },
  { day: "Qui 11h", name: "Ana Paula",    type: "Exame rotina",   label: "Confirmado", badgeCls: "bg-emerald-500", pulse: true,  delay: "1.4s" },
  { day: "Sex 14h", name: "Pedro Rocha",  type: "Psicologia",     label: "Aguardando", badgeCls: "bg-amber-400",   pulse: false, delay: ""     },
];

const products = [
  { name: "Brigadeiro", price: "R$ 3,50", bg: "linear-gradient(135deg,#5c2d0e,#9a5c2e)" },
  { name: "Coxinha",    price: "R$ 5,00", bg: "linear-gradient(135deg,#c2410c,#d97706)" },
  { name: "Brownie",    price: "R$ 7,00", bg: "linear-gradient(135deg,#1c0a00,#4a1c00)" },
  { name: "Pastel",     price: "R$ 4,00", bg: "linear-gradient(135deg,#854d0e,#ca8a04)" },
];

/* ── Main component ───────────────────────────────────────────── */

export default function AppDemos() {
  return (
    <section id="exemplos" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
            Veja o que é possível
          </h2>
          <p className="mt-3 text-neutral-400">Apps reais para negócios reais.</p>
        </div>

        {/* Phone cards */}
        <div className="mt-16 flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center">

          {/* ════════════ APP 1 — OFICINA DO ZÉ ════════════ */}
          <div className="flex flex-col items-center gap-5">
            <PhoneShell glowColor="#185FA5">

              {/* Header — dark industrial */}
              <div className="bg-[#1e2740]">
                <StatusBar color="#fff" />
                <div className="px-4 pb-3 pt-0.5">
                  <p className="text-[13px] font-bold text-white">🔧 Oficina do Zé</p>
                  <p className="text-[10px] text-slate-400">Ordens de Serviço</p>
                </div>
              </div>

              {/* Filter bar */}
              <div className="flex items-center justify-between bg-[#e8edf3] px-4 py-2">
                <span className="text-[9px] font-medium text-slate-500">Hoje · 4 abertas</span>
                <span className="rounded-full bg-[#185FA5] px-2 py-0.5 text-[8px] font-bold text-white">
                  + Nova OS
                </span>
              </div>

              {/* Order list */}
              <div className="divide-y divide-slate-100 bg-white">
                {orders.map((o) => (
                  <div key={o.name} className="flex items-center justify-between px-4 py-2.5">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800">{o.name}</p>
                      <p className="mt-0.5 text-[9px] text-slate-400">
                        {o.plate} · {o.service}
                      </p>
                    </div>
                    {/* Cycling status badge */}
                    <div className="relative ml-2 h-5 w-[84px] shrink-0">
                      {statusBadges.map((s) => (
                        <span
                          key={s.label}
                          className={`absolute inset-0 flex items-center justify-center rounded-full text-[8px] font-semibold leading-none ${s.cls} ${s.style}`}
                          style={{ animationDelay: o.delay }}
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2">
                <span className="text-[9px] text-slate-400">Atualizado agora</span>
                <span className="text-[9px] font-medium text-[#185FA5]">Ver histórico →</span>
              </div>

            </PhoneShell>

            <div className="text-center">
              <h3 className="font-semibold text-neutral-100">Oficina do Zé</h3>
              <p className="mt-0.5 text-sm text-neutral-500">Gestão de ordens de serviço</p>
            </div>
          </div>

          {/* ════════════ APP 2 — CONSULTÓRIO DRA. ANA ════════════ */}
          <div className="flex flex-col items-center gap-5">
            <PhoneShell glowColor="#00897b">

              {/* Header — clean teal */}
              <div className="bg-[#00897b]">
                <StatusBar color="#fff" />
                <div className="px-4 pb-3 pt-0.5">
                  <p className="text-[13px] font-bold text-white">🏥 Consultório Dra. Ana</p>
                  <p className="text-[10px] text-emerald-200">09/06 – 13/06</p>
                </div>
              </div>

              {/* Week nav */}
              <div className="flex items-center justify-between bg-emerald-50 px-4 py-2">
                <span className="text-[9px] text-emerald-700">‹ Anterior</span>
                <span className="text-[9px] font-semibold text-emerald-900">Semana atual</span>
                <span className="text-[9px] text-emerald-700">Próxima ›</span>
              </div>

              {/* Appointment list */}
              <div className="divide-y divide-slate-100 bg-white">
                {appointments.map((a) => (
                  <div key={a.name} className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-10 shrink-0 rounded-lg bg-emerald-50 py-0.5 text-center text-[9px] font-semibold text-emerald-700">
                        {a.day}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-slate-800">{a.name}</p>
                        <p className="text-[9px] text-slate-400">{a.type}</p>
                      </div>
                    </div>
                    <span
                      className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[8px] font-bold text-white ${a.badgeCls}${a.pulse ? " demo-badge-pulse" : ""}`}
                      style={a.pulse ? { animationDelay: a.delay } : undefined}
                    >
                      {a.label}
                    </span>
                  </div>
                ))}

                {/* Animated appointment slot */}
                <div className="relative h-[44px]">
                  {/* Empty state */}
                  <div
                    className="demo-appt-out absolute inset-0 flex items-center px-4"
                    style={{ animationDelay: "2s" }}
                  >
                    <span className="w-10 shrink-0 rounded-lg bg-slate-50 py-0.5 text-center text-[9px] text-slate-400">
                      Qua 15h
                    </span>
                    <p className="ml-2.5 text-[10px] text-slate-300">— Disponível —</p>
                  </div>
                  {/* Booked state */}
                  <div
                    className="demo-appt-in absolute inset-0 flex items-center justify-between px-4"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 shrink-0 rounded-lg bg-amber-50 py-0.5 text-center text-[9px] font-semibold text-amber-700">
                        Qua 15h
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-800">Lucas Ferreira</p>
                        <p className="text-[9px] text-slate-400">Primeira consulta</p>
                      </div>
                    </div>
                    <span className="ml-2 shrink-0 rounded-full bg-amber-400 px-2 py-0.5 text-[8px] font-bold text-white">
                      Pendente
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center border-t border-emerald-100 bg-emerald-50 px-4 py-2">
                <span className="text-[9px] font-medium text-emerald-700">
                  + Agendar nova consulta
                </span>
              </div>

            </PhoneShell>

            <div className="text-center">
              <h3 className="font-semibold text-neutral-100">Consultório Dra. Ana</h3>
              <p className="mt-0.5 text-sm text-neutral-500">Agendamento de consultas</p>
            </div>
          </div>

          {/* ════════════ APP 3 — DOCES DA CAROL ════════════ */}
          <div className="flex flex-col items-center gap-5">
            <PhoneShell glowColor="#f97316">

              {/* Header — warm gradient + animated cart */}
              <div style={{ background: "linear-gradient(135deg,#f97316 0%,#e11d48 100%)" }}>
                <StatusBar color="#fff" />
                <div className="flex items-center justify-between px-4 pb-3 pt-0.5">
                  <div>
                    <p className="text-[13px] font-bold text-white">🍬 Doces da Carol</p>
                    <p className="text-[10px] text-orange-200">Encomendas & Catálogo</p>
                  </div>
                  {/* Cart icon with popping counter */}
                  <div className="relative">
                    <span className="text-[24px] leading-none">🛒</span>
                    <div className="absolute -right-1.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                      <div className="relative h-4 w-4 overflow-hidden">
                        {["0", "1", "2", "3", "4"].map((n, i) => (
                          <span
                            key={n}
                            className="demo-cart-num absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-rose-600"
                            style={{ animationDelay: `${i * 2}s` }}
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category pills */}
              <div className="flex gap-2 bg-orange-50 px-3 py-2">
                <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[8px] font-bold text-white">
                  Doces
                </span>
                <span className="rounded-full border border-orange-200 px-2.5 py-0.5 text-[8px] text-orange-600">
                  Salgados
                </span>
                <span className="rounded-full border border-orange-200 px-2.5 py-0.5 text-[8px] text-orange-600">
                  Bebidas
                </span>
              </div>

              {/* Product 2×2 grid with shimmer */}
              <div className="grid grid-cols-2 gap-2 bg-orange-50 p-2.5">
                {products.map((p, i) => (
                  <div
                    key={p.name}
                    className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
                  >
                    <div className="relative h-[66px]" style={{ background: p.bg }}>
                      <div
                        className="demo-shimmer-pass pointer-events-none absolute inset-0"
                        style={{ animationDelay: `${i * 0.55}s` }}
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-[10px] font-semibold text-slate-800">{p.name}</p>
                      <p className="text-[10px] font-bold text-orange-600">{p.price}</p>
                      <button className="mt-1 w-full rounded-lg bg-orange-500 py-0.5 text-[8px] font-bold text-white">
                        + Carrinho
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center border-t border-orange-100 bg-orange-50 px-4 py-2">
                <span className="text-[9px] font-medium text-orange-600">Ver cardápio completo →</span>
              </div>

            </PhoneShell>

            <div className="text-center">
              <h3 className="font-semibold text-neutral-100">Doces da Carol</h3>
              <p className="mt-0.5 text-sm text-neutral-500">Catálogo e pedidos online</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
