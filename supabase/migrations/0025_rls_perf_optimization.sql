-- Otimização de RLS: (select auth.uid()) / (select auth_role()) evita
-- re-avaliação por linha; fusão de policies permissivas duplicadas (admin+self)
-- em uma por ação. Semântica preservada (e remove resíduos do role 'dev').

-- ===== profiles =====
DROP POLICY IF EXISTS "profiles: admin all"  ON public.profiles;
DROP POLICY IF EXISTS "profiles: self read"  ON public.profiles;
DROP POLICY IF EXISTS "profiles: self update" ON public.profiles;

CREATE POLICY "profiles_select" ON public.profiles FOR SELECT TO public
  USING (id = (select auth.uid()) OR (select auth_role()) = 'admin');
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE TO public
  USING (id = (select auth.uid()) OR (select auth_role()) = 'admin')
  WITH CHECK (id = (select auth.uid()) OR (select auth_role()) = 'admin');
CREATE POLICY "profiles_insert_admin" ON public.profiles FOR INSERT TO public
  WITH CHECK ((select auth_role()) = 'admin');
CREATE POLICY "profiles_delete_admin" ON public.profiles FOR DELETE TO public
  USING ((select auth_role()) = 'admin');

-- ===== token_transactions (ledger imutável) =====
DROP POLICY IF EXISTS "tokens: admin all"       ON public.token_transactions;
DROP POLICY IF EXISTS "tokens: client read own" ON public.token_transactions;

CREATE POLICY "tokens_select" ON public.token_transactions FOR SELECT TO public
  USING (client_id = (select auth.uid()) OR (select auth_role()) = 'admin');
CREATE POLICY "tokens_insert_admin" ON public.token_transactions FOR INSERT TO public
  WITH CHECK ((select auth_role()) = 'admin');

-- ===== tickets =====
DROP POLICY IF EXISTS "tickets_select_own"  ON public.tickets;
DROP POLICY IF EXISTS "tickets_insert_own"  ON public.tickets;
DROP POLICY IF EXISTS "tickets_update_admin" ON public.tickets;

CREATE POLICY "tickets_select_own" ON public.tickets FOR SELECT TO public
  USING (client_id = (select auth.uid()) OR (select auth_role()) = 'admin');
CREATE POLICY "tickets_insert_own" ON public.tickets FOR INSERT TO public
  WITH CHECK (client_id = (select auth.uid()));
CREATE POLICY "tickets_update_admin" ON public.tickets FOR UPDATE TO public
  USING ((select auth_role()) = 'admin')
  WITH CHECK ((select auth_role()) = 'admin');

-- ===== ticket_messages =====
DROP POLICY IF EXISTS "ticket_msgs_select" ON public.ticket_messages;
DROP POLICY IF EXISTS "ticket_msgs_insert" ON public.ticket_messages;

CREATE POLICY "ticket_msgs_select" ON public.ticket_messages FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM public.tickets t
    WHERE t.id = ticket_messages.ticket_id
      AND (t.client_id = (select auth.uid()) OR (select auth_role()) = 'admin')
  ));
CREATE POLICY "ticket_msgs_insert" ON public.ticket_messages FOR INSERT TO public
  WITH CHECK (
    sender_id = (select auth.uid())
    AND EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_messages.ticket_id
        AND (t.client_id = (select auth.uid()) OR (select auth_role()) = 'admin')
    )
  );

-- ===== notifications =====
DROP POLICY IF EXISTS "Usuário vê próprias notificações" ON public.notifications;
DROP POLICY IF EXISTS "Usuário pode marcar como lida"     ON public.notifications;

CREATE POLICY "Usuário vê próprias notificações" ON public.notifications FOR SELECT TO public
  USING ((select auth.uid()) = user_id);
CREATE POLICY "Usuário pode marcar como lida" ON public.notifications FOR UPDATE TO public
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);
