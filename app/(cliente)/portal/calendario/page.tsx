import type { Metadata } from "next";
import { getClientProjects } from "@/app/actions/projects";
import { ProjectsCalendar } from "@/app/components/projetos/ProjectsCalendar";
import { HubEmptyState } from "@/app/components/ui/HubEmptyState";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Calendário" };

export default async function CalendarioPage() {
  const projects = await getClientProjects();

  return (
    <div style={{ padding: "24px 24px", maxWidth: 1020, margin: "0 auto" }}>

      <PageHeader
        title="Calendário"
        subtitle="Prazos e entregas dos seus projetos"
        action={
          <Link
            href="/portal/suporte/novo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "var(--grad-brand)",
              color: "#fff", borderRadius: 9, padding: "8px 16px",
              fontSize: "12.5px", fontWeight: 700, textDecoration: "none",
            }}
          >
            <MessageSquarePlus size={13} /> Solicitar projeto
          </Link>
        }
      />

      {projects.length === 0 ? (
        <div className="hub-card">
          <HubEmptyState variant="projetos" />
        </div>
      ) : (
        <ProjectsCalendar projects={projects} />
      )}
    </div>
  );
}
