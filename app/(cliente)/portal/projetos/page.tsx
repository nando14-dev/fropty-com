import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, Calendar, DollarSign, ChevronRight, MessageSquarePlus } from "lucide-react";
import { getClientProjects } from "@/app/actions/projects";
import { PROJECT_STATUSES, PROJECT_PRIORITY_MAP } from "@/app/lib/constants/projects";
import { HubEmptyState } from "@/app/components/ui/HubEmptyState";

export const metadata: Metadata = { title: "Projetos" };

function fDate(d?: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function fCurrency(v?: number | null) {
  if (v == null) return null;
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProjetosPage() {
  const projects = await getClientProjects();

  return (
    <div style={{ padding: "36px 32px", maxWidth: 1020, margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: 16, marginBottom: 28, flexWrap: "wrap",
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
            Projetos
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "13px", color: "var(--text-faint)" }}>
            Acompanhe o andamento e entregas dos seus projetos
          </p>
        </div>
        <Link
          href="/portal/suporte/novo"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "var(--primary)", color: "#fff",
            borderRadius: "var(--r-md)", padding: "9px 18px",
            fontSize: "13px", fontWeight: 700, textDecoration: "none",
            boxShadow: "var(--shadow-brand)",
          }}
        >
          <MessageSquarePlus size={14} /> Solicitar projeto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="hub-card">
          <HubEmptyState variant="projetos" />
        </div>
      ) : (
        <div className="hub-card" style={{ overflow: "hidden" }}>
          {/* Table toolbar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px", borderBottom: "1px solid var(--border)",
          }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)" }}>
              {projects.length} projeto{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 130px 110px 120px 110px 32px",
            padding: "9px 20px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--border)",
            fontSize: "11px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.07em",
            color: "var(--text-faint)",
          }}>
            <span>Projeto</span>
            <span>Status</span>
            <span>Prioridade</span>
            <span>Prazo</span>
            <span style={{ textAlign: "right" }}>Valor est.</span>
            <span />
          </div>

          {/* Rows */}
          {projects.map((project, i) => {
            const st     = PROJECT_STATUSES[project.status]       ?? { label: project.status,   color: "#94a3b8", Icon: FolderOpen };
            const pr     = PROJECT_PRIORITY_MAP[project.priority] ?? { label: project.priority, color: "#94a3b8" };
            const StIcon = st.Icon;

            return (
              <Link
                key={project.id}
                href={`/portal/projetos/${project.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 130px 110px 120px 110px 32px",
                  padding: "13px 20px",
                  alignItems: "center",
                  borderBottom: i < projects.length - 1 ? "1px solid var(--border)" : "none",
                  textDecoration: "none", color: "inherit",
                  transition: "background 0.1s",
                }}
                className="hub-row-link"
              >
                {/* Title */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "var(--r-sm)", flexShrink: 0,
                    background: `${st.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <StIcon size={15} style={{ color: st.color }} />
                  </div>
                  <span style={{
                    fontSize: "13.5px", fontWeight: 600, color: "var(--text)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {project.title}
                  </span>
                </div>

                {/* Status */}
                <span style={{
                  fontSize: "11px", fontWeight: 700, color: st.color,
                  background: `${st.color}15`, border: `1px solid ${st.color}28`,
                  borderRadius: "var(--r-full)", padding: "3px 10px",
                  whiteSpace: "nowrap", display: "inline-block",
                }}>
                  {st.label}
                </span>

                {/* Prioridade */}
                <span style={{
                  fontSize: "11px", fontWeight: 700, color: pr.color,
                  background: `${pr.color}15`, border: `1px solid ${pr.color}28`,
                  borderRadius: "var(--r-full)", padding: "3px 10px",
                  whiteSpace: "nowrap", display: "inline-block",
                }}>
                  {pr.label}
                </span>

                {/* Prazo */}
                <span style={{ fontSize: "12px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 5 }}>
                  <Calendar size={11} style={{ flexShrink: 0 }} />
                  {fDate(project.due_date)}
                </span>

                {/* Valor */}
                <span style={{ fontSize: "12px", color: "var(--text-faint)", textAlign: "right" }}>
                  {fCurrency(project.estimated_cost) ?? "—"}
                </span>

                <ChevronRight size={14} style={{ color: "var(--text-faint)" }} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
