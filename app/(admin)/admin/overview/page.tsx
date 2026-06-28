import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import {
  Users, MessageCircle, DollarSign, ChevronRight,
  AlertTriangle, TrendingUp, CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = { title: "Visão Geral — Admin" };

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    { count: totalClients },
    { count: openTickets },
    { count: closedTickets },
    { data: mrrData },
    { data: urgentTickets },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "cliente"),
    supabase.from("tickets").select("*", { count: "exact", head: true }).in("status", ["aberto", "em_andamento", "reaberto"]),
    supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "fechado"),
    supabase.rpc("admin_mrr"),
    supabase
      .from("tickets")
      .select("id, subject, status, priority, ticket_number, profiles:client_id(name)")
      .eq("priority", "alta")
      .in("status", ["aberto", "em_andamento", "reaberto"])
      .order("created_at", { ascending: true })
      .limit(8),
  ]);

  const mrr = (mrrData as unknown as number) ?? 0;

  const kpis: { label: string; value: string | number; sub?: string; Icon: LucideIcon; accent: string; bg: string }[] = [
    {
      label:  "Clientes ativos",
      value:  totalClients ?? 0,
      Icon:   Users,
      accent: "var(--c-info)",
      bg:     "var(--c-info-bg)",
    },
    {
      label:  "Tickets abertos",
      value:  openTickets ?? 0,
      sub:    closedTickets ? `${closedTickets} resolvidos` : undefined,
      Icon:   MessageCircle,
      accent: "var(--brand-accent)",
      bg:     "rgba(239,159,39,0.10)",
    },
    {
      label:  "MRR",
      value:  `R$${mrr.toFixed(2).replace(".", ",")}`,
      Icon:   DollarSign,
      accent: "var(--c-success)",
      bg:     "var(--c-success-bg)",
    },
  ];

  return (
    <div style={{ padding: "36px 32px", maxWidth: 1040, margin: "0 auto" }}>

      {/* ── Header ── */}
      <div className="hub-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 className="hub-page-title">Visão Geral</h1>
          <p className="hub-page-sub">Resumo operacional do ecossistema Fropty</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TrendingUp size={14} style={{ color: "var(--text-faint)" }} />
          <span style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: 500 }}>
            Atualizado agora
          </span>
        </div>
      </div>

      {/* ── KPI cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: 14, marginBottom: 32,
      }}>
        {kpis.map(({ label, value, sub, Icon, accent, bg }) => (
          <div key={label} className="hub-stat-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "var(--r-md)",
                background: bg, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: accent,
              }}>
                <Icon size={18} />
              </div>
              <p className="hub-stat-label" style={{ margin: 0 }}>{label}</p>
            </div>
            <p className="hub-stat-value" style={{ marginTop: 12 }}>{value}</p>
            {sub && <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-faint)", fontWeight: 500 }}>{sub}</p>}
          </div>
        ))}
      </div>

      {/* ── Quick links ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 10, marginBottom: 32,
      }}>
        {[
          { href: "/admin/usuarios",         label: "Usuários",          color: "var(--c-info)" },
          { href: "/admin/customer-success",  label: "Customer Success",  color: "var(--c-success)" },
          { href: "/admin/projetos",          label: "Projetos",          color: "var(--primary)" },
          { href: "/admin/contratos",         label: "Contratos",         color: "var(--brand-accent)" },
          { href: "/admin/analytics",         label: "Analytics",         color: "var(--c-info)" },
          { href: "/admin/audit",             label: "Auditoria",         color: "var(--c-danger)" },
        ].map(({ href, label, color }) => (
          <Link
            key={href}
            href={href}
            className="hub-card-sm hub-card-hover"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{label}</span>
            <ChevronRight size={13} style={{ color, flexShrink: 0 }} />
          </Link>
        ))}
      </div>

      {/* ── Tickets urgentes ── */}
      <div className="hub-section-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle size={15} style={{ color: "var(--c-danger)" }} />
          <p className="hub-section-title">Tickets urgentes</p>
          {(urgentTickets?.length ?? 0) > 0 && (
            <span className="hub-badge hub-badge-danger">
              {urgentTickets!.length}
            </span>
          )}
        </div>
        <Link href="/portal/suporte" style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
          Ver todos →
        </Link>
      </div>

      <div className="hub-card" style={{ padding: 0, overflow: "hidden" }}>
        {(urgentTickets ?? []).length === 0 ? (
          <div className="hub-empty">
            <div className="hub-empty-icon">
              <CheckCircle size={22} style={{ color: "var(--c-success)" }} />
            </div>
            <p className="hub-empty-title" style={{ color: "var(--c-success)" }}>Tudo em dia</p>
            <p className="hub-empty-desc">Nenhum ticket de alta prioridade em aberto.</p>
          </div>
        ) : (
          (urgentTickets ?? []).map((t, i, arr) => {
            const ref = t.ticket_number ? `UFT${String(t.ticket_number).padStart(4, "0")}` : null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const clientName = (t.profiles as any)?.name;
            return (
              <Link
                key={t.id}
                href={`/portal/suporte/${t.id}`}
                style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "center",
                  gap:            12,
                  padding:        "14px 20px",
                  textDecoration: "none",
                  borderBottom:   i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  transition:     "background 0.12s",
                }}
                className="hub-row-link"
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    {ref && (
                      <span style={{
                        fontSize: "9.5px", fontWeight: 800, color: "var(--text-faint)",
                        fontFamily: "monospace", letterSpacing: "0.04em", flexShrink: 0,
                        background: "var(--surface-2)", padding: "1px 6px", borderRadius: "var(--r-sm)",
                        border: "1px solid var(--border)",
                      }}>
                        {ref}
                      </span>
                    )}
                    <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.subject}
                    </p>
                  </div>
                  {clientName && (
                    <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-faint)", fontWeight: 500 }}>
                      {clientName}
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span className="hub-badge hub-badge-danger">alta prioridade</span>
                  <ChevronRight size={13} style={{ color: "var(--text-faint)" }} />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
