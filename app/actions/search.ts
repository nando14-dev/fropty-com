"use server";

import { createClient } from "@/app/lib/supabase/server";
import { getProfile } from "@/app/lib/auth/session";

export type SearchResultType = "nav" | "ticket" | "project" | "contract" | "kb";

export interface SearchResult {
  id:       string;
  type:     SearchResultType;
  title:    string;
  subtitle?: string;
  href:     string;
}

const NAV_ITEMS: SearchResult[] = [
  { id: "nav-dashboard",  type: "nav", title: "Painel",             href: "/portal/dashboard" },
  { id: "nav-suporte",    type: "nav", title: "Suporte",            href: "/portal/suporte" },
  { id: "nav-novo",       type: "nav", title: "Abrir chamado",      href: "/portal/suporte/novo" },
  { id: "nav-projetos",   type: "nav", title: "Projetos",           href: "/portal/projetos" },
  { id: "nav-contratos",  type: "nav", title: "Contratos",          href: "/portal/contratos" },
  { id: "nav-financeiro", type: "nav", title: "Financeiro",         href: "/portal/financeiro" },
  { id: "nav-roadmap",    type: "nav", title: "Roadmap",            href: "/portal/roadmap" },
  { id: "nav-feedback",   type: "nav", title: "Feedback",           href: "/portal/feedback" },
  { id: "nav-kb",         type: "nav", title: "Base de Conhecimento", href: "/portal/base-conhecimento" },
  { id: "nav-perfil",     type: "nav", title: "Meu Perfil",         href: "/portal/perfil" },
];

export async function searchPortal(query: string): Promise<{
  nav:       SearchResult[];
  tickets:   SearchResult[];
  projects:  SearchResult[];
  contracts: SearchResult[];
  kb:        SearchResult[];
}> {
  const q = query.trim().toLowerCase();

  const navResults = q.length === 0
    ? NAV_ITEMS
    : NAV_ITEMS.filter(i => i.title.toLowerCase().includes(q));

  if (q.length < 2) {
    return { nav: navResults, tickets: [], projects: [], contracts: [], kb: [] };
  }

  const profile  = await getProfile();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !profile) {
    return { nav: navResults, tickets: [], projects: [], contracts: [], kb: [] };
  }

  const isAdmin = profile.role === "admin";

  const [ticketsRes, projectsRes, contractsRes, kbRes] = await Promise.all([
    // Tickets (campo: subject)
    isAdmin
      ? supabase.from("tickets").select("id, subject, status").ilike("subject", `%${q}%`).limit(5)
      : supabase.from("tickets").select("id, subject, status").eq("client_id", user.id).ilike("subject", `%${q}%`).limit(5),

    // Projects
    isAdmin
      ? supabase.from("projects").select("id, title, status").ilike("title", `%${q}%`).limit(5)
      : supabase.from("projects").select("id, title, status").eq("client_id", user.id).ilike("title", `%${q}%`).limit(5),

    // Contracts
    isAdmin
      ? supabase.from("contracts").select("id, title, status").ilike("title", `%${q}%`).limit(5)
      : supabase.from("contracts").select("id, title, status").eq("client_id", user.id).ilike("title", `%${q}%`).limit(5),

    // KB Articles
    supabase.from("knowledge_articles").select("id, title, slug, category")
      .eq("published", true).ilike("title", `%${q}%`).limit(5),
  ]);

  const tickets = (ticketsRes.data ?? []).map(t => ({
    id:       t.id,
    type:     "ticket" as const,
    title:    t.subject,
    subtitle: t.status,
    href:     isAdmin ? `/admin/usuarios` : `/portal/suporte/${t.id}`,
  }));

  const projects = (projectsRes.data ?? []).map(p => ({
    id:       p.id,
    type:     "project" as const,
    title:    p.title,
    subtitle: p.status,
    href:     isAdmin ? `/admin/projetos/${p.id}` : `/portal/projetos/${p.id}`,
  }));

  const contracts = (contractsRes.data ?? []).map(c => ({
    id:       c.id,
    type:     "contract" as const,
    title:    c.title,
    subtitle: c.status,
    href:     isAdmin ? `/admin/contratos/${c.id}` : `/portal/contratos/${c.id}`,
  }));

  const kb = (kbRes.data ?? []).map(a => ({
    id:       a.id,
    type:     "kb" as const,
    title:    a.title,
    subtitle: a.category,
    href:     `/portal/base-conhecimento/${a.slug}`,
  }));

  return { nav: navResults, tickets, projects, contracts, kb };
}
