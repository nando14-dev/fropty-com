-- Índices de cobertura para as foreign keys mais consultadas
CREATE INDEX IF NOT EXISTS idx_token_transactions_client_id ON public.token_transactions (client_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_sender_id     ON public.ticket_messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_id      ON public.admin_audit_log (admin_id);
CREATE INDEX IF NOT EXISTS idx_low_token_alerts_client_id    ON public.low_token_alerts (client_id);

-- Coluna morta: assigned_dev_id era do role "dev" (removido). Dropa a coluna
-- (e sua FK), eliminando também o aviso de FK sem índice.
ALTER TABLE public.tickets DROP COLUMN IF EXISTS assigned_dev_id;
