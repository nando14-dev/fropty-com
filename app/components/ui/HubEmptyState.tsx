import Link from "next/link";

type Variant =
  | "tickets"
  | "projetos"
  | "contratos"
  | "financeiro"
  | "roadmap"
  | "feedback"
  | "knowledge"
  | "default";

interface HubEmptyStateProps {
  variant?: Variant;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const VARIANTS: Record<
  Variant,
  { title: string; description: string; ctaLabel?: string; ctaHref?: string; svg: React.ReactNode }
> = {
  tickets: {
    title: "Nenhum chamado aberto",
    description: "Quando você abrir um chamado de suporte, ele aparecerá aqui com status e histórico.",
    ctaLabel: "Abrir chamado",
    ctaHref: "/portal/suporte/novo",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="8" y="14" width="48" height="36" rx="6" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="16" y="22" width="24" height="3" rx="1.5" fill="var(--border-2)"/>
        <rect x="16" y="29" width="32" height="2.5" rx="1.25" fill="var(--border)"/>
        <rect x="16" y="34.5" width="20" height="2.5" rx="1.25" fill="var(--border)"/>
        <circle cx="46" cy="42" r="10" fill="var(--primary)" opacity="0.15"/>
        <path d="M42 42h8M46 38v8" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  projetos: {
    title: "Nenhum projeto ainda",
    description: "Seus projetos em andamento e entregas aparecerão aqui com progresso e atualizações.",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="8" y="10" width="22" height="28" rx="5" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="34" y="10" width="22" height="14" rx="5" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="34" y="28" width="22" height="14" rx="5" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="12" y="42" width="44" height="12" rx="5" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="14" y="15" width="12" height="2" rx="1" fill="var(--border-2)"/>
        <rect x="14" y="20" width="16" height="2" rx="1" fill="var(--border)"/>
        <rect x="14" y="25" width="10" height="2" rx="1" fill="var(--border)"/>
        <rect x="38" y="15" width="10" height="2" rx="1" fill="var(--border-2)"/>
        <rect x="38" y="33" width="12" height="2" rx="1" fill="var(--border)"/>
      </svg>
    ),
  },
  contratos: {
    title: "Sem contratos no momento",
    description: "Contratos e propostas vinculados à sua conta aparecerão aqui para consulta.",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="12" y="8" width="40" height="50" rx="5" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="20" y="17" width="24" height="2.5" rx="1.25" fill="var(--border-2)"/>
        <rect x="20" y="23" width="24" height="2" rx="1" fill="var(--border)"/>
        <rect x="20" y="28" width="18" height="2" rx="1" fill="var(--border)"/>
        <rect x="20" y="33" width="22" height="2" rx="1" fill="var(--border)"/>
        <path d="M20 44l4 4 8-8" stroke="var(--c-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  financeiro: {
    title: "Sem faturas por aqui",
    description: "Seu histórico de cobranças e faturas aparecerá aqui quando houver movimentação.",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="10" y="16" width="44" height="30" rx="6" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="10" y="22" width="44" height="8" fill="var(--border)" opacity="0.4"/>
        <rect x="16" y="35" width="12" height="3" rx="1.5" fill="var(--border-2)"/>
        <rect x="16" y="40" width="8" height="2.5" rx="1.25" fill="var(--border)"/>
        <rect x="38" y="35" width="10" height="5" rx="2" fill="var(--brand-accent)" opacity="0.25"/>
        <path d="M40 37h6M43 35.5v4" stroke="var(--brand-accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  roadmap: {
    title: "Roadmap em construção",
    description: "As próximas funcionalidades e melhorias planejadas aparecerão aqui para votação.",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="16" cy="20" r="5" fill="var(--c-success)" opacity="0.2" stroke="var(--c-success)" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="5" fill="var(--primary)" opacity="0.2" stroke="var(--primary)" strokeWidth="1.5"/>
        <circle cx="48" cy="44" r="5" fill="var(--border)" stroke="var(--border-2)" strokeWidth="1.5"/>
        <path d="M21 23l6 6" stroke="var(--border-2)" strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M37 35l6 6" stroke="var(--border-2)" strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M13 20h6M29 32h6" stroke="var(--border-2)" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
  },
  feedback: {
    title: "Nenhum feedback ainda",
    description: "Compartilhe suas ideias e sugestões. Seu feedback ajuda a melhorar o ecossistema Fropty.",
    ctaLabel: "Enviar feedback",
    ctaHref: "/portal/feedback/novo",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M10 14h44a4 4 0 014 4v22a4 4 0 01-4 4H22l-8 8V44h-4a4 4 0 01-4-4V18a4 4 0 014-4z" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="18" y="23" width="16" height="2.5" rx="1.25" fill="var(--border-2)"/>
        <rect x="18" y="29" width="28" height="2" rx="1" fill="var(--border)"/>
        <rect x="18" y="34" width="20" height="2" rx="1" fill="var(--border)"/>
      </svg>
    ),
  },
  knowledge: {
    title: "Base de conhecimento vazia",
    description: "Artigos, tutoriais e guias da Fropty aparecerão aqui para consulta rápida.",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M14 10h24l12 12v32a4 4 0 01-4 4H14a4 4 0 01-4-4V14a4 4 0 014-4z" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <path d="M38 10v12h12" stroke="var(--border-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="18" y="28" width="22" height="2.5" rx="1.25" fill="var(--border-2)"/>
        <rect x="18" y="34" width="28" height="2" rx="1" fill="var(--border)"/>
        <rect x="18" y="39" width="18" height="2" rx="1" fill="var(--border)"/>
      </svg>
    ),
  },
  default: {
    title: "Nenhum item encontrado",
    description: "Quando houver conteúdo aqui, ele aparecerá nesta lista.",
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="32" cy="32" r="20" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5"/>
        <path d="M32 22v10M32 36v2" stroke="var(--border-2)" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
};

export function HubEmptyState({
  variant = "default",
  title,
  description,
  ctaLabel,
  ctaHref,
}: HubEmptyStateProps) {
  const v = VARIANTS[variant];
  const finalTitle = title ?? v.title;
  const finalDesc  = description ?? v.description;
  const finalCta   = ctaLabel ?? v.ctaLabel;
  const finalHref  = ctaHref ?? v.ctaHref;

  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "52px 24px",
        textAlign:      "center",
        gap:            0,
      }}
    >
      <div style={{ marginBottom: 20, opacity: 0.85 }}>{v.svg}</div>

      <p style={{
        margin:        0,
        fontSize:      "15px",
        fontWeight:    700,
        color:         "var(--text)",
        letterSpacing: "-0.01em",
        marginBottom:  6,
      }}>
        {finalTitle}
      </p>

      <p style={{
        margin:     0,
        fontSize:   "13px",
        color:      "var(--text-faint)",
        lineHeight: 1.6,
        maxWidth:   320,
        marginBottom: finalCta ? 20 : 0,
      }}>
        {finalDesc}
      </p>

      {finalCta && finalHref && (
        <Link
          href={finalHref}
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           6,
            background:    "var(--primary)",
            color:         "#fff",
            borderRadius:  "var(--r-md)",
            padding:       "8px 18px",
            fontSize:      "13px",
            fontWeight:    700,
            textDecoration: "none",
            boxShadow:     "var(--shadow-brand)",
            transition:    "opacity 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          {finalCta}
        </Link>
      )}
    </div>
  );
}
