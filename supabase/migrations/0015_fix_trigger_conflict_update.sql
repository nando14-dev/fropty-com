-- Corrige o trigger fn_on_auth_user_created para atualizar plan e token_balance
-- no ON CONFLICT, não apenas o email. Isso garante que se um convite falhar e
-- o perfil já tiver sido inserido com valores zerados, o segundo convite/aceitação
-- corrija os valores corretamente.
CREATE OR REPLACE FUNCTION public.fn_on_auth_user_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  is_invited boolean := NEW.invited_at IS NOT NULL;
  v_role          text;
  v_token_balance int;
  v_plan          text;
BEGIN
  IF is_invited THEN
    v_role          := COALESCE(NEW.raw_user_meta_data->>'role', 'cliente');
    v_token_balance := COALESCE((NEW.raw_user_meta_data->>'token_balance')::int, 0);
    v_plan := CASE
      WHEN NEW.raw_user_meta_data->>'plan' IN ('sem_plano', 'basico', 'pro')
      THEN NEW.raw_user_meta_data->>'plan'
      ELSE 'sem_plano'
    END;
  ELSE
    v_role          := 'cliente';
    v_token_balance := 0;
    v_plan          := 'sem_plano';
  END IF;

  IF v_role NOT IN ('cliente', 'admin') THEN
    v_role := 'cliente';
  END IF;

  INSERT INTO public.profiles (id, name, role, email, token_balance, plan)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    v_role,
    NEW.email,
    v_token_balance,
    v_plan
  )
  ON CONFLICT (id) DO UPDATE SET
    email         = EXCLUDED.email,
    -- Para convites, garante que plan e token_balance reflitam o metadata do convite
    -- (corrige casos onde um convite anterior falhou e inseriu valores zerados)
    token_balance = CASE WHEN is_invited THEN EXCLUDED.token_balance ELSE profiles.token_balance END,
    plan          = CASE WHEN is_invited THEN EXCLUDED.plan          ELSE profiles.plan          END;
  RETURN NEW;
END;
$function$;
