-- Marcos para SLA dos chamados:
-- first_response_at: quando o chamado entrou em atendimento (em_andamento) a 1ª vez
-- resolved_at: quando o analista marcou como resolvido (aguardando validação)
ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS first_response_at timestamptz,
  ADD COLUMN IF NOT EXISTS resolved_at       timestamptz;
