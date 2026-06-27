export type RiskLevel = 'saudavel' | 'atencao' | 'risco' | 'critico'

export interface HealthScore {
  id: string
  client_id: string
  score_uso: number
  score_tickets: number
  score_receita: number
  score_engajamento: number
  score_satisfacao: number
  score_total: number
  risk_level: RiskLevel
  cs_notes?: string
  last_interaction_at?: string
  created_at: string
  updated_at: string
}

export interface ClientWithHealth {
  id: string
  email: string
  full_name?: string
  company_name?: string
  plan: string
  token_balance: number
  health: HealthScore | null
}
