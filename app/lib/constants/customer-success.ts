import { Heart, AlertTriangle, AlertCircle, XCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { RiskLevel } from "@/app/lib/types/customer-success"

export const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string; Icon: LucideIcon }> = {
  saudavel: { label: 'Saudável',  color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   Icon: Heart },
  atencao:  { label: 'Atenção',   color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  Icon: AlertTriangle },
  risco:    { label: 'Risco',     color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   Icon: AlertCircle },
  critico:  { label: 'Crítico',   color: '#dc2626', bg: 'rgba(220,38,38,0.15)',  Icon: XCircle },
}

export const SCORE_DIMENSIONS = [
  { key: 'score_uso',         label: 'Uso',        weight: '25%' },
  { key: 'score_tickets',     label: 'Suporte',    weight: '20%' },
  { key: 'score_receita',     label: 'Receita',    weight: '25%' },
  { key: 'score_engajamento', label: 'Engajamento',weight: '15%' },
  { key: 'score_satisfacao',  label: 'Satisfação', weight: '15%' },
] as const
