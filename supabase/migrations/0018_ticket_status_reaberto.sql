-- Novo status intermediário "reaberto": usado quando o cliente NÃO aprova a
-- resolução de um chamado. Volta para a fila sem dar a impressão de que o
-- analista retomou o atendimento na hora (diferente de em_andamento).
ALTER TABLE public.tickets DROP CONSTRAINT IF EXISTS tickets_status_check;
ALTER TABLE public.tickets ADD CONSTRAINT tickets_status_check
  CHECK (status = ANY (ARRAY['aberto'::text, 'em_andamento'::text, 'resolvido'::text, 'fechado'::text, 'reaberto'::text]));
