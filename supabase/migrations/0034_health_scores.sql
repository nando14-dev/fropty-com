create table public.health_scores (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade unique,
  score_uso int not null default 0 check (score_uso between 0 and 100),
  score_tickets int not null default 0 check (score_tickets between 0 and 100),
  score_receita int not null default 0 check (score_receita between 0 and 100),
  score_engajamento int not null default 0 check (score_engajamento between 0 and 100),
  score_satisfacao int not null default 0 check (score_satisfacao between 0 and 100),
  score_total int not null default 0 check (score_total between 0 and 100),
  risk_level text not null default 'medio'
    check (risk_level in ('saudavel','atencao','risco','critico')),
  cs_notes text,
  last_interaction_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.health_scores enable row level security;

create policy "admins_all_health_scores" on public.health_scores
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "clients_own_health_score" on public.health_scores
  for select using (client_id = auth.uid());

create trigger health_scores_updated_at before update on public.health_scores
  for each row execute function public.set_updated_at();

create or replace function public.calculate_health_score(
  p_uso int, p_tickets int, p_receita int, p_engajamento int, p_satisfacao int
) returns int language sql immutable as $$
  select (
    p_uso          * 0.25 +
    p_tickets      * 0.20 +
    p_receita      * 0.25 +
    p_engajamento  * 0.15 +
    p_satisfacao   * 0.15
  )::int;
$$;

create or replace function public.get_risk_level(p_score int)
returns text language sql immutable as $$
  select case
    when p_score >= 75 then 'saudavel'
    when p_score >= 50 then 'atencao'
    when p_score >= 25 then 'risco'
    else 'critico'
  end;
$$;
