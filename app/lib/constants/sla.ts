import type { TicketPriority } from "@/app/lib/constants/status";

// Metas de SLA por prioridade, em horas (tempo corrido).
// - resposta:  da abertura até o chamado entrar em atendimento (em_andamento)
// - resolucao: do início do atendimento até o analista marcar como resolvido
export const SLA_TARGETS: Record<TicketPriority, { response: number; resolution: number }> = {
  alta:  { response: 4,  resolution: 24 },
  media: { response: 8,  resolution: 48 },
  baixa: { response: 24, resolution: 72 },
};

export interface SlaState {
  /** horas decorridas */
  elapsedH: number;
  /** meta em horas */
  targetH: number;
  /** 0..1+ (pode passar de 1 quando estoura) */
  ratio: number;
  /** já concluído (resposta dada / resolução feita) */
  done: boolean;
  /** estourou a meta */
  breached: boolean;
  label: string; // ex: "3h 20min / 4h"
}

function fmtH(hours: number): string {
  const totalMin = Math.max(0, Math.round(hours * 60));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

function build(elapsedMs: number, targetH: number, done: boolean): SlaState {
  const elapsedH = elapsedMs / 3_600_000;
  const ratio = targetH > 0 ? elapsedH / targetH : 0;
  return {
    elapsedH,
    targetH,
    ratio,
    done,
    breached: ratio > 1,
    label: `${fmtH(elapsedH)} / ${fmtH(targetH)}`,
  };
}

interface SlaInput {
  priority: TicketPriority;
  createdAt: string;
  firstResponseAt: string | null;
  resolvedAt: string | null;
  status: string;
  now?: number;
}

/** Calcula o estado das duas barras de SLA (resposta e resolução). */
export function computeSla({ priority, createdAt, firstResponseAt, resolvedAt, status, now = Date.now() }: SlaInput) {
  const target = SLA_TARGETS[priority] ?? SLA_TARGETS.media;

  // Resposta: created_at → first_response_at (ou agora, se ainda não respondido)
  const created = new Date(createdAt).getTime();
  const responseEnd = firstResponseAt ? new Date(firstResponseAt).getTime() : now;
  const response = build(responseEnd - created, target.response, !!firstResponseAt);

  // Resolução: só começa quando há primeiro atendimento.
  let resolution: SlaState | null = null;
  if (firstResponseAt) {
    const start = new Date(firstResponseAt).getTime();
    // Em "reaberto"/"em_andamento" o relógio corre; resolvido/fechado congela em resolved_at
    const end = resolvedAt ? new Date(resolvedAt).getTime() : now;
    resolution = build(end - start, target.resolution, !!resolvedAt && (status === "resolvido" || status === "fechado"));
  }

  return { response, resolution };
}
