import QuoteForm from "./components/QuoteForm";

const plans = [
  {
    name: "Prévia gratuita",
    price: "R$0",
    period: "",
    highlight: false,
    description:
      "Conte sua ideia e receba uma prévia visual do seu app, sem compromisso.",
    features: [
      "Mockup das telas principais",
      "Sem custo e sem compromisso",
      "Entrega em poucos dias",
    ],
  },
  {
    name: "App completo",
    price: "a partir de R$499",
    period: "pagamento único",
    highlight: true,
    description:
      "Seu app desenvolvido do início ao fim, pronto para usar e publicar.",
    features: [
      "Desenvolvimento completo",
      "Design personalizado com suas cores e logo",
      "Publicação e entrega do código",
      "Suporte na entrega",
    ],
  },
  {
    name: "Manutenção mensal",
    price: "R$49,90",
    period: "/mês",
    highlight: false,
    description:
      "Mantenha seu app sempre funcionando e evoluindo com suporte contínuo.",
    features: [
      "4 tokens por mês para ajustes e suporte",
      "Correções e pequenas melhorias",
      "Atendimento prioritário",
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#185FA5] to-[#134a82] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <span className="inline-block rounded-full bg-[#EF9F27] px-4 py-1 text-sm font-semibold text-white">
            🚀 Fropty Apps
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Seu app sob medida, do jeito que você imaginou
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Conte sua ideia e receba uma prévia gratuita. Sem complicação, sem
            jargão técnico — só o seu app saindo do papel.
          </p>
          <a
            href="#orcamento"
            className="mt-8 inline-block rounded-lg bg-[#EF9F27] px-8 py-3 font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            Pedir orçamento grátis
          </a>
        </div>
      </section>

      {/* Planos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">Planos</h2>
        <p className="mt-2 text-center text-neutral-600">
          Comece de graça e evolua quando fizer sentido.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "relative border-[#EF9F27] shadow-xl"
                  : "border-neutral-200 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#EF9F27] px-3 py-1 text-xs font-semibold text-white">
                  Mais popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-3">
                <span className="text-2xl font-bold text-[#185FA5]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="ml-1 text-sm text-neutral-500">
                    {plan.period}
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                {plan.description}
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#EF9F27]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#orcamento"
                className={`mt-8 rounded-lg px-4 py-2 text-center font-semibold transition ${
                  plan.highlight
                    ? "bg-[#185FA5] text-white hover:brightness-110"
                    : "border border-[#185FA5] text-[#185FA5] hover:bg-blue-50"
                }`}
              >
                Quero esse
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Tokens */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">Como funcionam os tokens?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            No plano de manutenção mensal, você recebe{" "}
            <strong className="text-[#185FA5]">4 tokens por mês</strong>. Cada
            token vale um pedido de suporte ou ajuste no seu app — como mudar
            um texto, ajustar uma cor ou corrigir algo que não está
            funcionando.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🎟️</div>
              <h3 className="mt-3 font-semibold">4 por mês</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Todo mês você começa com 4 tokens novinhos.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl">⏳</div>
              <h3 className="mt-3 font-semibold">Não acumulam</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Tokens não usados expiram no fim do mês — use sem medo.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🛠️</div>
              <h3 className="mt-3 font-semibold">Suporte e ajustes</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Cada token vale um ajuste ou atendimento de suporte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="orcamento" className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">Peça seu orçamento</h2>
        <p className="mt-2 text-center text-neutral-600">
          Conte sua ideia e a gente responde com uma prévia gratuita.
        </p>
        <QuoteForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        © 2025 Fropty Apps
      </footer>
    </main>
  );
}
