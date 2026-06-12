# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

fropty.com — landing page e configurador de planos da Fropty Apps, serviço de desenvolvimento de apps sob medida (prévia gratuita, app completo a partir de R$499, planos de manutenção mensal com tokens de suporte). Todo o conteúdo é em português brasileiro (pt-BR).

## Commands

```bash
npm run dev      # dev server com Turbopack (localhost:3000)
npm run build    # build de produção (Turbopack)
npm run lint     # eslint
```

Não há testes configurados (`@playwright/test` está em devDependencies, mas sem config nem specs). Deploy é feito na Vercel.

## Architecture

Next.js 15 (App Router) + React 19 + Tailwind CSS 4. Três rotas:

- `app/page.tsx` — landing page (client component). Contém os dados dos planos exibidos nos cards (`plans`) e FAQs inline. Os cards de manutenção linkam para `/configurador`.
- `app/configurador/page.tsx` — página do configurador; envolve `PlanConfigurator` e converte o resumo do plano em um pedido enviado a `/api/quote`.
- `app/api/quote/route.ts` — única rota de API; envia o pedido de orçamento por email via Resend. Requer `RESEND_API_KEY` e `CONTACT_EMAIL` (definidos em `.env.local`, não commitado).

Componentes em `app/components/`:

- `PlanConfigurator.tsx` — coração do negócio. Define `BASE_PRICE` (R$499), a lista `ADDONS` (recursos extras com preço único ou mensal; campo opcional `unit` para preços por unidade, ex. "/membro") e `MAINTENANCE` (planos de manutenção com tokens). Calcula totais (único, mensal, primeiro mês) e expõe o resultado via `PlanSummary` no callback `onSubmit`.
- `QuoteForm.tsx` — formulário de orçamento da landing, posta direto em `/api/quote`.
- `AppDemos.tsx` — mockups interativos de apps dentro de molduras de celular (`PhoneFrame`), usados como vitrine na landing.

## Conventions

- **Preços e conteúdo de planos vivem em três lugares** que precisam ficar consistentes: `plans` em `app/page.tsx`, `ADDONS`/`MAINTENANCE` em `PlanConfigurator.tsx`, e os textos de economia de tokens (1 token = R$150 avulso, base dos "Você economiza"). Ao alterar preço ou conceito de um recurso, verifique os três.
- Estilo visual: tema escuro `#080e1c`, azul da marca `#185FA5`, laranja de destaque `#EF9F27`. Mistura de Tailwind classes com `style={{}}` inline — siga o padrão do arquivo que estiver editando.
- Ícones via Tabler Icons webfont (CDN no `layout.tsx`), usados como `<i className="ti ti-..." />`.
- Mensagens de commit em português, descrevendo a mudança do ponto de vista do produto.
