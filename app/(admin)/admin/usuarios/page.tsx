import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import { BulkUsuariosClient } from "@/app/components/admin/BulkUsuariosClient";
import { ChevronLeft, ChevronRight, UserPlus, Users, UserCheck, UserX, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Usuários — Admin" };

const PAGE_SIZE = 20;

interface Props {
  searchParams: Promise<{ page?: string; tab?: string; q?: string }>;
}

export default async function AdminUsuariosPage({ searchParams }: Props) {
  const { page: pageParam, tab = "todos", q = "" } = await searchParams;
  const page   = Math.max(1, parseInt(pageParam ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;
  const supabase = await createClient();

  // Stats em paralelo
  const [
    { count: total },
    { count: ativos },
    { count: inativos },
    { count: admins },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_active", false),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin"),
  ]);

  // Query filtrada
  let query = supabase
    .from("profiles")
    .select("id,name,email,role,plan,token_balance,is_active,phone_number,created_at")
    .order("created_at", { ascending: false });

  if (tab === "ativos")   query = query.eq("is_active", true);
  if (tab === "inativos") query = query.eq("is_active", false);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);

  const [{ data: usersFiltered }, { count: filteredTotal }] = await Promise.all([
    query.range(offset, offset + PAGE_SIZE - 1),
    (async () => {
      let cq = supabase.from("profiles").select("*", { count: "exact", head: true });
      if (tab === "ativos")   cq = cq.eq("is_active", true);
      if (tab === "inativos") cq = cq.eq("is_active", false);
      if (q) cq = cq.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
      return cq;
    })(),
  ]);

  const list       = usersFiltered ?? [];
  const totalPages = Math.ceil((filteredTotal ?? 0) / PAGE_SIZE);

  const stats = [
    { label: "Total de Usuários", value: total ?? 0,    icon: <Users size={18} />,      color: "#6366f1", bg: "rgba(99,102,241,0.10)" },
    { label: "Usuários Ativos",   value: ativos ?? 0,   icon: <UserCheck size={18} />,  color: "#22c55e", bg: "rgba(34,197,94,0.10)" },
    { label: "Bloqueados",        value: inativos ?? 0, icon: <UserX size={18} />,      color: "#ef4444", bg: "rgba(239,68,68,0.10)" },
    { label: "Administradores",   value: admins ?? 0,   icon: <ShieldCheck size={18} />,color: "#f97316", bg: "rgba(249,115,22,0.10)" },
  ];

  const TABS = [
    { id: "todos",    label: "Todos",      count: total ?? 0 },
    { id: "ativos",   label: "Ativos",     count: ativos ?? 0 },
    { id: "inativos", label: "Bloqueados", count: inativos ?? 0 },
  ];

  function tabHref(t: string) {
    const p = new URLSearchParams();
    if (t !== "todos") p.set("tab", t);
    if (q) p.set("q", q);
    const s = p.toString();
    return `/admin/usuarios${s ? `?${s}` : ""}`;
  }

  return (
    <div style={{ padding: "36px 32px", maxWidth: 1400, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 3px", color: "var(--text)", letterSpacing: "-0.02em" }}>Usuários</h1>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-faint)" }}>
            Gerencie contas, planos e acessos do ecossistema.
          </p>
        </div>
        <Link
          href="/admin/usuarios/novo"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, background: "var(--cta-bg)", color: "var(--cta-text)", fontSize: "13px", fontWeight: 700, textDecoration: "none", flexShrink: 0 }}
        >
          <UserPlus size={14} /> + Novo Usuário
        </Link>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.1 }}>{s.value.toLocaleString("pt-BR")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, overflow: "hidden" }}>

        {/* Tabs + Search */}
        <div style={{ padding: "16px 20px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 0 }}>
              {TABS.map(t => {
                const active = tab === t.id;
                return (
                  <Link
                    key={t.id}
                    href={tabHref(t.id)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "7px 14px", fontSize: "13px", fontWeight: active ? 700 : 500,
                      color: active ? "var(--text)" : "var(--text-muted)",
                      borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                      textDecoration: "none", transition: "color 0.15s", whiteSpace: "nowrap",
                    }}
                  >
                    {t.label}
                    <span style={{ fontSize: "11px", fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: active ? "rgba(99,102,241,0.12)" : "var(--surface-2)", color: active ? "var(--primary)" : "var(--text-faint)" }}>
                      {t.count}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Search */}
            <form method="GET" action="/admin/usuarios" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {tab !== "todos" && <input type="hidden" name="tab" value={tab} />}
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Buscar por nome ou e-mail…"
                  style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontSize: "13px", fontFamily: "inherit", outline: "none", width: 240 }}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <BulkUsuariosClient
            users={list.map(u => ({
              id:           u.id,
              name:         u.name ?? null,
              email:        u.email ?? null,
              role:         (u.role as "cliente" | "admin"),
              plan:         ((u.plan ?? "sem_plano") as "sem_plano" | "basico" | "pro"),
              token_balance: u.token_balance ?? 0,
              is_active:    u.is_active !== false,
              phone:        u.phone_number ?? null,
              created_at:   u.created_at ?? null,
            }))}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>
              Página {page} de {totalPages} · {filteredTotal ?? 0} resultado{(filteredTotal ?? 0) !== 1 ? "s" : ""}
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {page > 1 && (
                <Link href={`/admin/usuarios?page=${page - 1}${tab !== "todos" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`} style={paginBtn}>
                  <ChevronLeft size={13} /> Anterior
                </Link>
              )}
              {page < totalPages && (
                <Link href={`/admin/usuarios?page=${page + 1}${tab !== "todos" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`} style={paginBtn}>
                  Próxima <ChevronRight size={13} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const paginBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 5,
  padding: "7px 14px", borderRadius: 8, border: "1px solid var(--border)",
  background: "var(--surface)", color: "var(--text-muted)", fontSize: "12px",
  fontWeight: 600, textDecoration: "none",
};
