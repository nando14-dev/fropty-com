"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/app/lib/types/projects";
import { PROJECT_STATUSES } from "@/app/lib/constants/projects";

interface Props {
  projects: Project[];
}

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Returns 0=Mon..6=Sun
function getDayOfWeek(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay();
  return d === 0 ? 6 : d - 1;
}

export function ProjectsCalendar({ projects }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [tooltip, setTooltip] = useState<{ x: number; y: number; project: Project } | null>(null);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }
  function goToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getDayOfWeek(year, month, 1); // 0=Mon

  // Map due_date -> projects for this month
  const projectsByDay: Record<number, Project[]> = {};
  for (const p of projects) {
    const dateStr = p.due_date ?? p.start_date;
    if (!dateStr) continue;
    const d = new Date(dateStr);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!projectsByDay[day]) projectsByDay[day] = [];
      projectsByDay[day].push(p);
    }
  }

  // Build grid cells: leading empty + days
  const totalCells = firstDow + daysInMonth;
  const rows = Math.ceil(totalCells / 7);

  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>
          {MONTH_NAMES[month]} {year}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={goToday}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-muted)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
              padding: "5px 12px",
              cursor: "pointer",
            }}
          >
            Hoje
          </button>
          <button
            onClick={prevMonth}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30,
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
              cursor: "pointer",
              color: "var(--text)",
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={nextMonth}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30,
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
              cursor: "pointer",
              color: "var(--text)",
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Week day headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        borderBottom: "1px solid var(--border)",
      }}>
        {WEEK_DAYS.map((wd) => (
          <div key={wd} style={{
            padding: "8px 4px",
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--text-faint)",
          }}>
            {wd}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        position: "relative",
      }}>
        {Array.from({ length: rows * 7 }).map((_, idx) => {
          const day = idx - firstDow + 1;
          const isValid = day >= 1 && day <= daysInMonth;
          const isToday = isValid && `${year}-${month}-${day}` === todayStr;
          const dayProjects = isValid ? (projectsByDay[day] ?? []) : [];
          const col = idx % 7;
          const row = Math.floor(idx / 7);
          const isLastRow = row === rows - 1;
          const isLastCol = col === 6;

          return (
            <div
              key={idx}
              style={{
                minHeight: 80,
                padding: "6px 8px",
                borderRight: isLastCol ? "none" : "1px solid var(--border)",
                borderBottom: isLastRow ? "none" : "1px solid var(--border)",
                background: isToday ? "var(--primary)08" : "transparent",
                position: "relative",
              }}
            >
              {isValid && (
                <>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    fontSize: "12px",
                    fontWeight: isToday ? 800 : 500,
                    color: isToday ? "var(--primary)" : "var(--text-muted)",
                    background: isToday ? "var(--primary)18" : "transparent",
                    marginBottom: 4,
                  }}>
                    {day}
                  </span>

                  {/* Project dots */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {dayProjects.slice(0, 4).map((project) => {
                      const st = PROJECT_STATUSES[project.status] ?? { color: "#94a3b8", label: project.status };
                      return (
                        <div
                          key={project.id}
                          style={{ position: "relative" }}
                          onMouseEnter={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            setTooltip({ x: rect.left, y: rect.bottom + 4, project });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <Link
                            href={`/portal/projetos/${project.id}`}
                            style={{
                              display: "block",
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: st.color,
                              cursor: "pointer",
                            }}
                            title={project.title}
                          />
                        </div>
                      );
                    })}
                    {dayProjects.length > 4 && (
                      <span style={{ fontSize: "9px", color: "var(--text-faint)", lineHeight: "8px" }}>
                        +{dayProjects.length - 4}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Tooltip — fixed positioned */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y,
            left: tooltip.x,
            zIndex: 1000,
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            padding: "6px 10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            maxWidth: 200,
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "var(--text)" }}>
            {tooltip.project.title}
          </p>
          {tooltip.project.due_date && (
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--text-faint)" }}>
              Prazo: {new Date(tooltip.project.due_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          )}
          <p style={{ margin: "2px 0 0", fontSize: "11px", color: PROJECT_STATUSES[tooltip.project.status]?.color ?? "#94a3b8" }}>
            {PROJECT_STATUSES[tooltip.project.status]?.label ?? tooltip.project.status}
          </p>
        </div>
      )}
    </div>
  );
}
