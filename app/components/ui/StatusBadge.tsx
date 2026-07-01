import { TICKET_STATUS_MAP } from "@/app/lib/constants/status";
import { PROJECT_STATUSES, CONTRACT_STATUS_MAP } from "@/app/lib/constants/projects";

/**
 * Fonte única de renderização de status. Em vez de cada tela reimplementar
 * um mapa de status + estilo inline, use <StatusBadge kind="ticket" status={...} />.
 *
 * Os rótulos e cores vêm dos mapas canônicos:
 *  - ticket   → app/lib/constants/status.ts (TICKET_STATUS_MAP)
 *  - project  → app/lib/constants/projects.ts (PROJECT_STATUSES)
 *  - contract → app/lib/constants/projects.ts (CONTRACT_STATUS_MAP)
 */
type StatusKind = "ticket" | "project" | "contract";

const STATUS_MAPS: Record<StatusKind, Record<string, { label: string; color: string }>> = {
  ticket: TICKET_STATUS_MAP,
  project: PROJECT_STATUSES,
  contract: CONTRACT_STATUS_MAP,
};

interface StatusBadgeProps {
  kind: StatusKind;
  status: string;
  size?: "sm" | "md";
}

export function StatusBadge({ kind, status, size = "md" }: StatusBadgeProps) {
  const cfg = STATUS_MAPS[kind][status] ?? { label: status, color: "#94a3b8" };
  const fontSize = size === "sm" ? "10.5px" : "11.5px";
  const padding = size === "sm" ? "2px 8px" : "3px 10px";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: cfg.color,
        background: `${cfg.color}1a`,
        border: `1px solid ${cfg.color}33`,
        borderRadius: "var(--r-full)",
        padding,
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}
