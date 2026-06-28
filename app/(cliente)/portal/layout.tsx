import type { Metadata } from "next";
import { getProfile } from "@/app/lib/auth/session";
import { createClient } from "@/app/lib/supabase/server";
import { ClientSidebar } from "@/app/components/cliente/ClientSidebar";
import { AdminSidebar } from "@/app/components/admin/AdminSidebar";
import { UserAvatarMenu } from "@/app/components/auth/UserAvatarMenu";
import { PullToRefresh } from "@/app/components/PullToRefresh";
import { PortalFloatingControls } from "@/app/components/PortalFloatingControls";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Nav items são gerados dinamicamente com badge de tickets abertos

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // getProfile() é cacheado — não gera query extra (pai já chamou requireRole)
  const profile = await getProfile();

  // Busca e-mail do usuário Auth (não armazenado em profiles por design)
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) console.error("[portal/layout] getUser error:", userError.message);
  if (!user)     console.error("[portal/layout] getUser returned null user — profile:", profile?.id);

  const displayName   = profile?.name || user?.email?.split("@")[0] || "Cliente";
  const initials      = displayName.slice(0, 2).toUpperCase();
  const email         = user?.email ?? "";

  // Contagens para badges — todas em paralelo
  const [ticketsRes, projectsRes, contractsRes] = await Promise.all([
    user
      ? supabase.from("tickets").select("id", { count: "exact", head: true })
          .eq("client_id", user.id).in("status", ["aberto", "em_andamento"])
      : Promise.resolve({ count: 0, error: null }),
    user
      ? supabase.from("projects").select("id", { count: "exact", head: true })
          .eq("client_id", user.id).in("status", ["em_andamento", "planejamento"])
      : Promise.resolve({ count: 0, error: null }),
    user
      ? supabase.from("contracts").select("id", { count: "exact", head: true })
          .eq("client_id", user.id).eq("status", "pendente_assinatura")
      : Promise.resolve({ count: 0, error: null }),
  ]);

  if (ticketsRes.error)   console.error("[portal/layout] tickets error:",   ticketsRes.error.message);
  if (projectsRes.error)  console.error("[portal/layout] projects error:",  projectsRes.error.message);
  if (contractsRes.error) console.error("[portal/layout] contracts error:", contractsRes.error.message);

  const openTickets   = ticketsRes.count   ?? 0;
  const activeProjects = projectsRes.count  ?? 0;
  const pendingContracts = contractsRes.count ?? 0;

  const isAdmin = profile?.role === "admin";

  const portalNav = [
    { id: "dashboard",         href: "/portal/dashboard",         icon: "LayoutDashboard",   label: "Painel" },
    { id: "suporte",           href: "/portal/suporte",           icon: "MessageCircle",     label: "Suporte",             badge: openTickets },
    { id: "projetos",          href: "/portal/projetos",          icon: "FolderKanban",      label: "Projetos",            badge: activeProjects },
    { id: "contratos",         href: "/portal/contratos",         icon: "FileSignature",     label: "Contratos",           badge: pendingContracts },
    { id: "financeiro",        href: "/portal/financeiro",        icon: "CreditCard",        label: "Financeiro" },
    { id: "roadmap",           href: "/portal/roadmap",           icon: "Map",               label: "Roadmap" },
    { id: "feedback",          href: "/portal/feedback",          icon: "MessageSquarePlus", label: "Feedback" },
    { id: "base-conhecimento", href: "/portal/base-conhecimento", icon: "BookOpen",          label: "Base de Conhecimento" },
    { id: "perfil",            href: "/portal/perfil",            icon: "UserCircle",        label: "Meu Perfil" },
  ];

  // Objeto compatível com ClientUser (campos mínimos necessários)
  const sidebarUser = {
    id:             profile?.id ?? "",
    name:           displayName,
    email,
    avatarInitials: initials,
    role:           "cliente" as const,
    plan:           (profile?.plan ?? undefined) as "sem_plano" | "basico" | "pro" | undefined,
    planRenewal:    profile?.plan_renewal ?? undefined,
    tokenBalance:   profile?.token_balance ?? 0,
    tokenHistory:   [],
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      {/* Admin mantém a navegação completa do painel mesmo no suporte;
          cliente usa a sidebar do portal. */}
      {isAdmin ? (
        <AdminSidebar
          name={displayName}
          initials={initials}
          userId={profile?.id ?? ""}
          initialTheme={(profile?.theme ?? "dark") as "dark" | "light"}
        />
      ) : (
        <ClientSidebar
          user={sidebarUser}
          navItems={portalNav}
          initialTheme={(profile?.theme ?? "dark") as "dark" | "light"}
        />
      )}

      {/* Menu de usuário fora do sidebar — visível no mobile futuramente */}
      {/* UserAvatarMenu é usado aqui como overlay alternativo; no desktop
          o ClientSidebar já mostra o user. Em breakpoints menores (Sprint 2)
          o sidebar vira drawer e este menu aparece no topbar. */}
      <div style={{ display: "none" }} aria-hidden>
        <UserAvatarMenu
          name={displayName}
          email={email}
          initials={initials}
          role="cliente"
          plan={profile?.plan as "sem_plano" | "basico" | "pro" | undefined}
        />
      </div>

      <main className="portal-main-content" style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <PullToRefresh>{children}</PullToRefresh>
      </main>

      {/* Notificações + tema flutuantes no canto inferior direito */}
      <PortalFloatingControls userId={profile?.id ?? ""} initialTheme={(profile?.theme ?? "dark") as "dark" | "light"} />
    </div>
  );
}
