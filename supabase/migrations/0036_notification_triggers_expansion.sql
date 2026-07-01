-- Amplia as notificações in-app para além de chamados (tickets).
-- Infra já existente: tabela public.notifications + realtime no NotificationBell.
-- Antes desta migration só tickets geravam notificação; projetos, feedback e
-- contratos ficavam mudos para o cliente.
--
-- Também corrige um bug pré-existente: as notificações de ticket para admin
-- apontavam para "/admin/suporte" (rota inexistente). O admin usa "/portal/suporte".

-- ── 1. Corrige o link admin nas funções de ticket existentes ──────────────
CREATE OR REPLACE FUNCTION public.fn_notify_new_ticket()
  RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT id FROM profiles WHERE role = 'admin' LOOP
    INSERT INTO notifications (user_id, type, title, body, link)
    VALUES (r.id, 'ticket_opened', 'Novo chamado aberto', NEW.subject, '/portal/suporte');
  END LOOP;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.fn_notify_ticket_message()
  RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_ticket   RECORD;
  v_notif_to UUID;
BEGIN
  SELECT client_id INTO v_ticket FROM tickets WHERE id = NEW.ticket_id;

  IF NEW.sender_role = 'cliente' THEN
    FOR v_notif_to IN SELECT id FROM profiles WHERE role = 'admin' LOOP
      INSERT INTO notifications (user_id, type, title, body, link)
      VALUES (v_notif_to, 'ticket_message', 'Nova mensagem em chamado', NEW.body, '/portal/suporte');
    END LOOP;
  ELSE
    INSERT INTO notifications (user_id, type, title, body, link)
    VALUES (v_ticket.client_id, 'ticket_message', 'Resposta no seu chamado', NEW.body, '/portal/suporte');
  END IF;

  RETURN NEW;
END;
$function$;

-- ── 2. Atualização de projeto → notifica o cliente do projeto ─────────────
-- Cobre tanto novas atualizações quanto mudanças de status (que gravam uma
-- linha em project_updates com status_from/status_to). Não notifica se o
-- autor da atualização for o próprio cliente.
CREATE OR REPLACE FUNCTION public.fn_notify_project_update()
  RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_proj  RECORD;
  v_title text;
BEGIN
  SELECT client_id, title INTO v_proj FROM projects WHERE id = NEW.project_id;
  IF v_proj.client_id IS NULL OR v_proj.client_id = NEW.author_id THEN
    RETURN NEW;
  END IF;

  IF NEW.status_to IS NOT NULL AND NEW.status_to IS DISTINCT FROM NEW.status_from THEN
    v_title := 'Status do projeto atualizado';
  ELSE
    v_title := 'Nova atualização no projeto';
  END IF;

  INSERT INTO notifications (user_id, type, title, body, link)
  VALUES (
    v_proj.client_id,
    'project_update',
    v_title,
    COALESCE(NULLIF(left(NEW.content, 200), ''), v_proj.title),
    '/portal/projetos/' || NEW.project_id
  );

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_notify_project_update ON public.project_updates;
CREATE TRIGGER trg_notify_project_update
  AFTER INSERT ON public.project_updates
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_project_update();

-- ── 3. Feedback respondido pelo admin → notifica o cliente ────────────────
CREATE OR REPLACE FUNCTION public.fn_notify_feedback_answered()
  RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  IF (OLD.admin_response IS NULL AND NEW.admin_response IS NOT NULL)
     OR (OLD.responded_at IS NULL AND NEW.responded_at IS NOT NULL) THEN
    INSERT INTO notifications (user_id, type, title, body, link)
    VALUES (NEW.client_id, 'feedback_answered', 'Resposta ao seu feedback', NEW.title, '/portal/feedback');
  END IF;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_notify_feedback_answered ON public.feedbacks;
CREATE TRIGGER trg_notify_feedback_answered
  AFTER UPDATE ON public.feedbacks
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_feedback_answered();

-- ── 4. Contrato enviado/assinado → notifica o cliente ─────────────────────
CREATE OR REPLACE FUNCTION public.fn_notify_contract_status()
  RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_title text;
BEGIN
  IF OLD.status IS NOT DISTINCT FROM NEW.status THEN RETURN NEW; END IF;

  v_title := CASE NEW.status
    WHEN 'enviado'  THEN 'Contrato aguardando assinatura'
    WHEN 'assinado' THEN 'Contrato assinado'
    ELSE NULL
  END;

  IF v_title IS NOT NULL THEN
    INSERT INTO notifications (user_id, type, title, body, link)
    VALUES (NEW.client_id, 'contract_status', v_title, NEW.title, '/portal/contratos/' || NEW.id);
  END IF;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_notify_contract_status ON public.contracts;
CREATE TRIGGER trg_notify_contract_status
  AFTER UPDATE ON public.contracts
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_contract_status();

-- ── 5. Hardening: trigger functions não devem ser chamáveis via RPC ───────
-- (alinha com a migration 0023; triggers as invocam internamente de qualquer forma)
REVOKE EXECUTE ON FUNCTION public.fn_notify_project_update()   FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.fn_notify_feedback_answered() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.fn_notify_contract_status()   FROM anon, authenticated, public;
