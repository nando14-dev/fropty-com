import type { Metadata } from "next";
import { getClientProjects } from "@/app/actions/projects";
import { ProjectsKanban } from "@/app/components/projetos/ProjectsKanban";
import { HubEmptyState } from "@/app/components/ui/HubEmptyState";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Kanban" };

export default async function KanbanPage() {
  const projects = await getClientProjects();

  return (
    <div style={{ padding: "24px 24px 24px", margin: "0 auto", maxWidth: "none" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
            Kanban
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "12.5px", color: "var(--text-faint)" }}>
            Visão por status de todos os projetos ativos
          </p>
        </div>
        <Link
          href="/portal/suporte/novo"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", borderRadius: 9, padding: "8px 16px",
            fontSize: "12.5px", fontWeight: 700, textDecoration: "none",
          }}
        >
          <MessageSquarePlus size={13} /> Solicitar projeto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="hub-card">
          <HubEmptyState variant="projetos" />
        </div>
      ) : (
        <ProjectsKanban projects={projects} />
      )}
    </div>
  );
}
