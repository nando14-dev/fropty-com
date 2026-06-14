import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import FaqAccordion from "./components/FaqAccordion";
import { QuoteButton } from "./components/QuoteModal";
import { ThemeToggle } from "./components/ThemeToggle";
import { MobileNav } from "./components/MobileNav";
import { Footer } from "./components/Footer";
import { plans, faqs, previewAddons } from "./lib/data/plans";

const AppDemos = dynamic(() => import("./components/AppDemos"), {
  loading: () => (
    <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-faint)" }}>
      <i className="ti ti-loader-2 text-3xl" style={{ animation: "spin 1s linear infinite" }} />
    </div>
  ),
});

const MARQUEE_ITEMS = [
  { icon: "ti-rocket",          label: "Prévia gratuita" },
  { icon: "ti-device-mobile",   label: "Apps sob medida" },
  { icon: "ti-bolt",            label: "Entrega em 3 dias" },
  { icon: "ti-tool",            label: "Manutenção mensal" },
  { icon: "ti-message-circle",  label: "Suporte com tokens" },
  { icon: "ti-circle-check",    label: "100% personalizado" },
  { icon: "ti-target",          label: "Sem taxa de entrada" },
  { icon: "ti-lock-open",       label: "Sem fidelidade inicial" },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="Fropty Apps" width={28} height={28} className="rounded-md" />
            <span className="text-base font-bold tracking-tight" style={{ color: "var(--text)" }}>
              Fropty<span style={{ color: "var(--primary)" }}>Apps</span>
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <a href="#planos"   className="nav-link transition">Planos</a>
            <a href="#exemplos" className="nav-link transition">Exemplos</a>
            <a href="#tokens"   className="nav-link transition">Tokens</a>
            <a href="#faq"      className="nav-link transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/configurador"
              className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-flex"
              style={{ background: "var(--primary)" }}
            >
              Orçamento grátis
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* ── Hero — full-bleed GIF ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "88vh", minHeight: 580 }}
      >
        {/* GIF de fundo, cobre toda a seção */}
        <Image
          src="/hero.gif"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center 10%" }}
          unoptimized
          priority
          aria-hidden
        />

        {/* Overlay tema-adaptável via CSS variable */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />

        {/* Conteúdo sobre o overlay */}
        <div
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-16 sm:py-20"
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "rgba(91,87,232,0.18)",
                color: "var(--primary)",
                border: "1px solid rgba(91,87,232,0.3)",
              }}
            >
              <i className="ti ti-gift" style={{ fontSize: 13 }} />
              Prévia 100% gratuita
            </span>

            <h1
              className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl"
              style={{ color: "var(--hero-text)", fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Seu app sob medida,{" "}
              <span style={{ color: "var(--primary)" }}>do jeito que você imaginou</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: "var(--hero-muted)" }}>
              Conte sua ideia e receba uma prévia real em forma de app, totalmente gratuita.
              Sem tecnicismo, sem complicação.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteButton
                className="rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:brightness-110"
                style={{ background: "var(--primary)", boxShadow: "0 8px 32px rgba(91,87,232,0.4)" }}
              >
                Pedir orçamento grátis
                <i className="ti ti-arrow-right ml-2" style={{ fontSize: 15 }} />
              </QuoteButton>
              <a
                href="#exemplos"
                className="rounded-full px-8 py-4 text-base font-semibold transition"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "var(--hero-text)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Ver exemplos
              </a>
            </div>

            {/* Mini stats */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              {[
                { val: "R$0",   sub: "para começar",       icon: "ti-gift" },
                { val: "3 dias", sub: "para ver a prévia", icon: "ti-clock" },
                { val: "100%",  sub: "personalizado",       icon: "ti-star" },
              ].map(({ val, sub, icon }) => (
                <div key={val} className="flex items-center gap-3">
                  <i className={`ti ${icon}`} style={{ fontSize: 20, color: "var(--primary)" }} />
                  <div>
                    <span className="block text-2xl font-bold" style={{ color: "var(--hero-text)", lineHeight: 1 }}>{val}</span>
                    <span className="block text-xs mt-0.5" style={{ color: "var(--hero-muted)" }}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee strip ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-y py-3.5"
        style={{ borderColor: "var(--border)", background: "var(--bg-alt)" }}
      >
        <div className="animate-marquee flex gap-10 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(({ icon, label }, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-faint)" }}>
              <i className={`ti ${icon}`} style={{ color: "var(--primary)", fontSize: 14 }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Como funciona ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="mb-3 flex justify-center">
          <span className="section-chip">
            <i className="ti ti-route" /> Como funciona
          </span>
        </div>
        <h2
          className="text-center font-bold tracking-tight"
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            lineHeight: 1.1,
            marginBottom: 56,
          }}
        >
          Do ideia ao app em 4 passos
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", icon: "ti-message-2",   title: "Conta sua ideia",  body: "Você preenche um formulário simples descrevendo o que o seu app precisa fazer. Sem necessidade de conhecimento técnico." },
            { step: "02", icon: "ti-eye",          title: "Recebe a prévia",  body: "Em até 3 dias úteis, você recebe um link com as telas principais do seu app funcionando no navegador. Totalmente gratuito." },
            { step: "03", icon: "ti-circle-check", title: "Aprova e paga",    body: "Gostou? O app completo sai a partir de R$ 499. Não gostou? Sem cobranças, sem burocracia." },
            { step: "04", icon: "ti-rocket",       title: "App no ar",        body: "Seu app é desenvolvido, testado e publicado. Você acompanha tudo e mantém com tokens de suporte." },
          ].map(({ step, icon, title, body }, i) => (
            <div key={step} className="relative flex flex-col gap-4">
              {i < 3 && (
                <div
                  className="absolute left-[calc(50%+24px)] top-[22px] hidden h-px lg:block"
                  style={{ width: "calc(100% - 0px)", background: "linear-gradient(to right, var(--border), transparent)" }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "rgba(91,87,232,0.12)",
                      border: "1px solid rgba(91,87,232,0.22)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <i className={`ti ${icon}`} style={{ fontSize: 22, color: "var(--primary)" }} />
                  </div>
                  <span
                    style={{
                      position: "absolute", top: -6, right: -6,
                      width: 20, height: 20, borderRadius: "50%",
                      background: "var(--primary)", color: "#fff",
                      fontSize: "9px", fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {step}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "var(--text)", marginBottom: 6 }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Planos ──────────────────────────────────────────────────── */}
      <section id="planos" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="mb-3 flex justify-center">
          <span className="section-chip">
            <i className="ti ti-layout-cards" /> Planos
          </span>
        </div>
        <h2
          className="text-center font-bold tracking-tight"
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            lineHeight: 1.1,
          }}
        >
          Planos que crescem com você
        </h2>
        <p className="mt-4 text-center" style={{ color: "var(--text-muted)" }}>
          Comece de graça e evolua quando fizer sentido.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl p-8 transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: plan.highlight ? "var(--primary)" : "var(--card-bg)",
                border: plan.highlight ? "1px solid var(--primary)" : "1px solid var(--card-border)",
                boxShadow: plan.highlight ? "0 20px 60px rgba(91,87,232,0.35)" : "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold tracking-wide"
                  style={{
                    background: plan.highlight ? "rgba(255,255,255,0.2)" : "rgba(91,87,232,0.15)",
                    color: plan.highlight ? "#fff" : "var(--primary)",
                    border: plan.highlight ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(91,87,232,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold" style={{ color: plan.highlight ? "#fff" : "var(--text)" }}>
                {plan.name}
              </h3>
              <p className="mt-4">
                <span className="text-2xl font-bold" style={{ color: plan.highlight ? "#fff" : "var(--primary)" }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="ml-1 text-sm" style={{ color: plan.highlight ? "rgba(255,255,255,0.65)" : "var(--text-faint)" }}>
                    {plan.period}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm" style={{ color: plan.highlight ? "rgba(255,255,255,0.82)" : "var(--text-muted)" }}>
                {plan.description}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm" style={{ color: plan.highlight ? "#fff" : "var(--text-muted)" }}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <i
                      className="ti ti-check mt-0.5 flex-shrink-0 text-base"
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.8)" : "var(--primary)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Economia — paleta azul/branca apenas */}
              {plan.savingsText && (
                <div
                  className="mt-4 rounded-xl px-3 py-2"
                  style={{
                    background: plan.highlight ? "rgba(255,255,255,0.12)" : "rgba(91,87,232,0.1)",
                    border: plan.highlight ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(91,87,232,0.18)",
                  }}
                >
                  <p className="text-xs font-bold" style={{ color: plan.highlight ? "#fff" : "var(--primary)" }}>
                    <i className="ti ti-piggy-bank mr-1.5" style={{ fontSize: 12 }} />
                    {plan.savingsText}
                  </p>
                </div>
              )}

              {plan.note && (
                <p className="mt-3 text-xs" style={{ color: plan.highlight ? "rgba(255,255,255,0.55)" : "var(--text-faint)" }}>
                  <i className="ti ti-info-circle mr-1" style={{ fontSize: 11 }} />
                  {plan.note}
                </p>
              )}

              {plan.href ? (
                <Link
                  href={plan.href}
                  className="mt-8 block rounded-xl px-4 py-3 text-center text-sm font-semibold transition hover:opacity-90"
                  style={plan.highlight
                    ? { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }
                    : { border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  Quero esse
                  <i className="ti ti-arrow-right ml-1.5" style={{ fontSize: 13 }} />
                </Link>
              ) : (
                <QuoteButton
                  className="mt-8 block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition hover:opacity-90"
                  style={plan.highlight
                    ? { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }
                    : { border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  Quero esse
                  <i className="ti ti-arrow-right ml-1.5" style={{ fontSize: 13 }} />
                </QuoteButton>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--text-faint)" }}>
          Valor de referência considerando token avulso de R$ 300,00 para não assinantes.
        </p>

        {/* Configurador card */}
        <Link href="/configurador" className="group mt-10 block">
          <div
            className="relative overflow-hidden rounded-2xl p-8 transition-all sm:p-10"
            style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "rgba(91,87,232,0.18)" }} />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full blur-3xl"
              style={{ background: "rgba(91,87,232,0.08)" }} />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="flex-1">
                <span
                  className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ background: "rgba(91,87,232,0.14)", color: "var(--primary)", border: "1px solid rgba(91,87,232,0.2)" }}
                >
                  <i className="ti ti-adjustments-horizontal" style={{ fontSize: 12 }} />
                  Personalizável
                </span>
                <h3
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--text)", fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  Monte o app perfeito para o seu negócio
                </h3>
                <p className="mt-2 max-w-lg" style={{ color: "var(--text-muted)" }}>
                  Login com Google, painel admin, WhatsApp, relatórios... escolha o que faz sentido.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {previewAddons.map(({ icon, label }) => (
                    <span
                      key={icon}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm"
                      style={{ border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-muted)" }}
                    >
                      <i className={`ti ti-${icon}`} style={{ color: "var(--primary)" }} />
                      {label}
                    </span>
                  ))}
                  <span
                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm"
                    style={{ border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-faint)" }}
                  >
                    +4 mais
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-6 sm:flex-col sm:items-end">
                <div className="sm:text-right">
                  <div className="text-sm" style={{ color: "var(--text-faint)" }}>a partir de</div>
                  <div className="text-4xl font-bold" style={{ color: "var(--text)" }}>R$499</div>
                  <div className="text-sm" style={{ color: "var(--text-faint)" }}>pagamento único</div>
                </div>
                <div
                  className="whitespace-nowrap rounded-full px-6 py-3 font-semibold text-white shadow-lg transition group-hover:brightness-110"
                  style={{ background: "var(--primary)", boxShadow: "0 8px 24px rgba(91,87,232,0.3)" }}
                >
                  Monte seu App
                  <i className="ti ti-arrow-right ml-2" style={{ fontSize: 14 }} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ── App Demos ───────────────────────────────────────────────── */}
      <AppDemos />

      {/* ── Tokens ──────────────────────────────────────────────────── */}
      <section
        id="tokens"
        className="scroll-mt-20 border-y py-20"
        style={{ background: "var(--bg-alt)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-3 flex justify-center">
            <span className="section-chip">
              <i className="ti ti-coins" /> Tokens
            </span>
          </div>
          <h2
            className="font-bold tracking-tight"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            Como funcionam os tokens?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            No plano de manutenção mensal, você recebe tokens mensais conforme
            sua assinatura —{" "}
            <strong style={{ color: "var(--primary)" }}>4 tokens no Básico</strong> e{" "}
            <strong style={{ color: "var(--primary)" }}>8 tokens no Pro</strong>. Cada
            token vale um pedido de suporte ou ajuste no seu app.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "ti-ticket",    title: "Básico: 4 · Pro: 8", body: "Todo mês você recebe tokens novos conforme seu plano." },
              { icon: "ti-hourglass", title: "Não acumulam",        body: "Tokens não usados expiram no fim do mês. Use sem medo." },
              { icon: "ti-tool",      title: "Suporte e ajustes",   body: "Cada token vale um ajuste ou atendimento de suporte." },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
              >
                <i className={`ti ${icon} text-3xl`} style={{ color: "var(--primary)" }} />
                <h3 className="mt-3 font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20">
        <div className="mb-3 flex justify-center">
          <span className="section-chip">
            <i className="ti ti-help" /> FAQ
          </span>
        </div>
        <h2
          className="text-center font-bold tracking-tight"
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            lineHeight: 1.1,
          }}
        >
          Dúvidas? A gente responde
        </h2>
        <FaqAccordion faqs={faqs} />
      </section>

      {/* ── Prova social ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-3 flex justify-center">
          <span className="section-chip">
            <i className="ti ti-chart-bar" /> Resultados
          </span>
        </div>
        <h2
          className="text-center font-bold tracking-tight"
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.1,
            marginBottom: 48,
          }}
        >
          Números que falam por si
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "R$ 0",   label: "para ver a prévia",        icon: "ti-gift" },
            { value: "3 dias", label: "para prévia ficar pronta", icon: "ti-clock" },
            { value: "R$ 499", label: "app completo a partir de", icon: "ti-rocket" },
            { value: "50%",    label: "de economia nos tokens",   icon: "ti-piggy-bank" },
          ].map(({ value, label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl p-8 text-center"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(91,87,232,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <i className={`ti ${icon}`} style={{ fontSize: 24, color: "var(--primary)" }} />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--text)", lineHeight: 1 }}>{value}</p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────── */}
      <section style={{ background: "var(--primary)" }}>
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Pronto para tirar sua ideia do papel?
          </h2>
          <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.72)" }}>
            Prévia gratuita. Sem compromisso. Do seu jeito.
          </p>
          <QuoteButton
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold transition hover:bg-[#E9E9FC]"
            style={{ color: "var(--primary)" }}
          >
            Pedir orçamento grátis
            <i className="ti ti-arrow-right" style={{ fontSize: 15 }} />
          </QuoteButton>
        </div>
      </section>

      <Footer />

    </main>
  );
}
