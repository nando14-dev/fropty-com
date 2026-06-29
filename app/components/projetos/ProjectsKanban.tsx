"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Project, ProjectStatus } from "@/app/lib/types/projects";
import { PROJECT_STATUSES, PROJECT_PRIORITY_MAP } from "@/app/lib/constants/projects";

interface Props {
  projects: Project[];
}

const KANBAN_COLUMNS: ProjectStatus[] = [
  "lead",
  "briefing",
  "escopo",
  "proposta",
  "contrato",
  "execucao",
  "entrega",
  "suporte",
  "encerrado",
];

function fDate(d?: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function ProjectsKanban({ projects }: Props) {
  const byStatus = KANBAN_COLUMNS.reduce<Record<string, Project[]>>((acc, s) => {
    acc[s] = projects.filter((p) => p.status === s);
    return acc;
  }, {});

  return (
    <div style={{
      overflowX: "auto",
      paddingBottom: 16,
    }}>
      <div style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        minWidth: "max-content",
        padding: "4px 2px",
      }}>
        {KANBAN_COLUMNS.map((statusKey) => {
          const st = PROJECT_STATUSES[statusKey];
          const cards = byStatus[statusKey];
          const StIcon = st.Icon;

          return (
            <div key={statusKey} style={{ width: 240, flexShrink: 0 }}>
              {/* Column header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md) var(--r-md) 0 0",
                borderBottom: `2px solid ${st.color}`,
              }}>
                <StIcon size={13} style={{ color: st.color, flexShrink: 0 }} />
                <span style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--text)",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {st.label}
                </span>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: st.color,
                  background: `${st.color}20`,
                  borderRadius: 99,
                  padding: "2px 7px",
                  flexShrink: 0,
                }}>
                  {cards.length}
                </span>
              </div>

              {/* Cards container */}
              <div style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderTop: "none",
                borderRadius: "0 0 var(--r-md) var(--r-md)",
                maxHeight: 480,
                overflowY: "auto",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}>
                {cards.length === 0 ? (
                  <div style={{
                    padding: "20px 0",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "var(--text-faint)",
                  }}>
                    Nenhum projeto
                  </div>
                ) : (
                  cards.map((project) => {
                    const pr = PROJECT_PRIORITY_MAP[project.priority] ?? { label: project.priority, color: "#94a3b8" };
                    const progress = (project as unknown as Record<string, unknown>).progress as number | null ?? null;

                    return (
                      <Link
                        key={project.id}
                        href={`/portal/projetos/${project.id}`}
                        style={{
                          display: "block",
                          background: "var(--card-bg)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--r-sm)",
                          padding: "12px",
                          textDecoration: "none",
                          color: "inherit",
                          transition: "box-shadow 0.15s, border-color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
                          (e.currentTarget as HTMLElement).style.borderColor = st.color + "60";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        }}
                      >
                        {/* Title */}
                        <p style={{
                          margin: "0 0 10px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--text)",
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {project.title}
                        </p>

                        {/* Priority + Date row */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: progress != null ? 10 : 0 }}>
                          <span style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: pr.color,
                            background: `${pr.color}18`,
                            border: `1px solid ${pr.color}28`,
                            borderRadius: 99,
                            padding: "2px 8px",
                          }}>
                            {pr.label}
                          </span>
                          {project.due_date && (
                            <span style={{
                              fontSize: "10px",
                              color: "var(--text-faint)",
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}>
                              <Calendar size={9} />
                              {fDate(project.due_date)}
                            </span>
                          )}
                        </div>

                        {/* Progress bar */}
                        {progress != null && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <span style={{ fontSize: "10px", color: "var(--text-faint)" }}>{progress}%</span>
                            </div>
                            <div style={{
                              height: 4,
                              background: "var(--surface-2)",
                              borderRadius: 99,
                              overflow: "hidden",
                            }}>
                              <div style={{
                                height: "100%",
                                borderRadius: 99,
                                background: progress >= 100 ? "#22c55e" : `linear-gradient(90deg, var(--primary), var(--brand-accent, var(--primary)))`,
                                width: `${Math.min(progress, 100)}%`,
                              }} />
                            </div>
                          </div>
                        )}
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
