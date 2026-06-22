-- Blinda colunas sensíveis de profiles. A policy "profiles: self update" é
-- row-level (não restringe colunas), então um cliente poderia, via API pública,
-- dar UPDATE no próprio perfil setando role='admin' ou token_balance alto.
-- Este trigger impede que qualquer um que não seja admin (ou service_role)
-- altere campos protegidos — mesmo no próprio registro.
CREATE OR REPLACE FUNCTION public.fn_protect_profile_columns()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' THEN
    RETURN NEW;
  END IF;
  IF NEW.role           IS DISTINCT FROM OLD.role
     OR NEW.token_balance          IS DISTINCT FROM OLD.token_balance
     OR NEW.plan                   IS DISTINCT FROM OLD.plan
     OR NEW.plan_renewal           IS DISTINCT FROM OLD.plan_renewal
     OR NEW.services               IS DISTINCT FROM OLD.services
     OR NEW.contract_start         IS DISTINCT FROM OLD.contract_start
     OR NEW.is_active              IS DISTINCT FROM OLD.is_active
     OR NEW.stripe_customer_id     IS DISTINCT FROM OLD.stripe_customer_id
     OR NEW.stripe_subscription_id IS DISTINCT FROM OLD.stripe_subscription_id
  THEN
    RAISE EXCEPTION 'Alteração não permitida em campos protegidos do perfil';
  END IF;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_protect_profile_columns ON public.profiles;
CREATE TRIGGER trg_protect_profile_columns
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.fn_protect_profile_columns();
