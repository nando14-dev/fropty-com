"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { signOut } from "../../actions/auth";
import { PortalThemeToggle } from "./PortalThemeToggle";
import type { ClientUser } from "../../lib/types/cliente";
import {
  LayoutDashboard, MessageCircle, CreditCard, UserCircle, BookOpen, Map,
  MessageSquarePlus, FolderKanban, FileSignature, LogOut, Loader2,
  Menu, X, ChevronLeft, ChevronRight, Coins,
} from "lucide-react";

interface NavItem {
  id:     string;
  href:   string;
  icon:   string;
  label:  string;
  badge?: number;
}

interface Props {
  user:          ClientUser;
  navItems?:     NavItem[];
  initialTheme?: "dark" | "light";
}

const DEFAULT_NAV: NavItem[] = [
  { id: "dashboard",         href: "/portal/dashboard",         icon: "LayoutDashboard",   label: "Painel" },
  { id: "suporte",           href: "/portal/suporte",           icon: "MessageCircle",     label: "Suporte" },
  { id: "projetos",          href: "/portal/projetos",          icon: "FolderKanban",      label: "Projetos" },
  { id: "contratos",         href: "/portal/contratos",         icon: "FileSignature",     label: "Contratos" },
  { id: "financeiro",        href: "/portal/financeiro",        icon: "CreditCard",        label: "Financeiro" },
  { id: "roadmap",           href: "/portal/roadmap",           icon: "Map",               label: "Roadmap" },
  { id: "feedback",          href: "/portal/feedback",          icon: "MessageSquarePlus", label: "Feedback" },
  { id: "base-conhecimento", href: "/portal/base-conhecimento", icon: "BookOpen",          label: "Base de Conhecimento" },
  { id: "perfil",            href: "/portal/perfil",            icon: "UserCircle",        label: "Meu Perfil" },
];

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  LayoutDashboard, MessageCircle, CreditCard, UserCircle, BookOpen, Map,
  MessageSquarePlus, FolderKanban, FileSignature,
};

function NavIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon size={size} /> : null;
}

const PLAN_LABEL: Record<string, string> = { basico: "Básico", pro: "Pro", sem_plano: "Sem plano" };

export function ClientSidebar({ user, navItems, initialTheme = "dark" }: Props) {
  const pathname              = usePathname();
  const nav                   = navItems ?? DEFAULT_NAV;
  const [pending, startTrans] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hub-sidebar-collapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("hub-sidebar-collapsed", next ? "1" : "0");
  }

  function handleSignOut() {
    startTrans(async () => {
      const result = await signOut();
      if (result?.redirectTo) window.location.href = result.redirectTo;
    });
  }

  const W = collapsed ? 60 : 224;

  const planKey   = (user.plan ?? "sem_plano") as string;
  const planLabel = PLAN_LABEL[planKey] ?? planKey;
  const hasPlan   = planKey !== "sem_plano";

  const sidebar = (
    <aside
      className={`portal-sidebar${mobileOpen ? " open" : ""}`}
      style={{ width: W, transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)" }}
    >
      {/* Collapse toggle — desktop only */}
      <button
        onClick={toggleCollapse}
        title={collapsed ? "Expandir" : "Recolher"}
        className="portal-sidebar-toggle"
        style={{
          position:    "absolute",
          top:         "50%",
          right:       -13,
          transform:   "translateY(-50%)",
          width:       13,
          height:      44,
          borderRadius: "0 var(--r-md) var(--r-md) 0",
          border:      "1px solid var(--sidebar-border)",
          borderLeft:  "none",
          background:  "var(--sidebar-bg)",
          cursor:      "pointer",
          color:       "var(--text-faint)",
          display:     "flex",
          alignItems:  "center",
          justifyContent: "center",
          zIndex:      10,
          padding:     0,
          transition:  "background 0.15s, color 0.15s",
          flexShrink:  0,
        }}
      >
        {collapsed ? <ChevronRight size={9} /> : <ChevronLeft size={9} />}
      </button>

      {/* Close button — mobile */}
      <button
        className="portal-sidebar-close"
        onClick={() => setMobileOpen(false)}
        aria-label="Fechar menu"
        style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28,
          borderRadius: "var(--r-sm)", border: "1px solid var(--border)",
          background: "var(--surface-2)", cursor: "pointer", color: "var(--text-faint)",
          display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <X size={13} />
      </button>

      {/* Inner padding */}
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        flex:           1,
        padding:        collapsed ? "20px 0" : "22px 14px",
        gap:            0,
        transition:     "padding 0.22s cubic-bezier(0.4,0,0.2,1)",
        overflow:       "hidden",
      }}>

        {/* ── Logo ── */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: collapsed ? "center" : "flex-start",
          marginBottom:   24,
          paddingLeft:    collapsed ? 0 : 2,
        }}>
          <Link href="/portal/dashboard" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            {/* Logo mark */}
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em",
            }}>
              F
            </div>
            {!collapsed && (
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                Fropty<span style={{ color: "var(--primary)" }}>Hub</span>
              </span>
            )}
          </Link>
        </div>

        {/* ── User card ── */}
        {!collapsed ? (
          <div style={{
            background:   "var(--surface-2)",
            border:       "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            padding:      "10px 12px",
            marginBottom: 20,
            display:      "flex",
            alignItems:   "center",
            gap:          10,
          }}>
            {/* Avatar */}
            <div className="hub-avatar hub-avatar-sm" style={{ flexShrink: 0 }}>
              {user.avatarInitials}
            </div>
            <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: "12.5px", fontWeight: 700, color: "var(--text)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.name}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{
                  fontSize: "10px", fontWeight: 700,
                  color: hasPlan ? "var(--brand-500)" : "var(--text-faint)",
                  background: hasPlan ? "rgba(91,87,232,0.10)" : "var(--surface-3)",
                  border: `1px solid ${hasPlan ? "rgba(91,87,232,0.20)" : "var(--border)"}`,
                  borderRadius: "var(--r-full)", padding: "1px 8px",
                }}>
                  {planLabel}
                </span>
                {user.tokenBalance != null && user.tokenBalance > 0 && (
                  <span style={{ fontSize: "10px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 3 }}>
                    <Coins size={10} />
                    {user.tokenBalance}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div className="hub-avatar hub-avatar-sm" title={user.name}>
              {user.avatarInitials}
            </div>
          </div>
        )}

        {/* ── Nav ── */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {nav.map(({ id, href, icon, label, badge }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={id}
                href={href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? label : undefined}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap:            collapsed ? 0 : 9,
                  padding:        collapsed ? "10px 0" : "8px 11px",
                  borderRadius:   "var(--r-md)",
                  fontSize:       "13px",
                  fontWeight:     active ? 700 : 500,
                  textDecoration: "none",
                  color:          active ? "var(--sidebar-item-active-text)" : "var(--text-muted)",
                  background:     active ? "var(--sidebar-item-active)" : "transparent",
                  borderLeft:     active && !collapsed ? "2px solid var(--primary)" : "2px solid transparent",
                  paddingLeft:    active && !collapsed ? 10 : 11,
                  transition:     "background 0.12s, color 0.12s, border-color 0.12s",
                  position:       "relative",
                  whiteSpace:     "nowrap",
                  overflow:       "hidden",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--sidebar-item-hover)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                  }
                }}
              >
                <span style={{ flexShrink: 0, display: "flex", opacity: active ? 1 : 0.7 }}>
                  <NavIcon name={icon} size={16} />
                </span>
                {!collapsed && (
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
                )}
                {!collapsed && badge != null && badge > 0 && (
                  <span style={{
                    minWidth: 18, height: 18, padding: "0 5px", borderRadius: "var(--r-full)",
                    background: "var(--primary)", color: "#fff",
                    fontSize: 10, fontWeight: 800, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
                {collapsed && badge != null && badge > 0 && (
                  <span style={{
                    position: "absolute", top: 7, right: 9,
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--primary)",
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />

        {/* ── Theme toggle + Logout ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!collapsed && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "6px 11px",
            }}>
              <span style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: 500 }}>Tema</span>
              <PortalThemeToggle initialTheme={initialTheme} />
            </div>
          )}

          <button
            onClick={handleSignOut}
            disabled={pending}
            title={collapsed ? "Sair" : undefined}
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap:            collapsed ? 0 : 9,
              padding:        collapsed ? "9px 0" : "8px 11px",
              borderRadius:   "var(--r-md)",
              fontSize:       "13px",
              fontWeight:     500,
              color:          "var(--text-faint)",
              background:     "none",
              border:         "none",
              cursor:         pending ? "not-allowed" : "pointer",
              opacity:        pending ? 0.5 : 1,
              fontFamily:     "inherit",
              width:          "100%",
              transition:     "background 0.12s, color 0.12s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--sidebar-item-hover)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--c-danger)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-faint)";
            }}
          >
            {pending
              ? <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
              : <LogOut size={16} />
            }
            {!collapsed && <span>{pending ? "Saindo…" : "Sair"}</span>}
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── Mobile topbar ── */}
      <div className="portal-topbar">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          style={{
            width: 36, height: 36, borderRadius: "var(--r-md)",
            background: "var(--surface)", border: "1px solid var(--border)",
            cursor: "pointer", color: "var(--text-muted)", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Menu size={17} />
        </button>

        <Link href="/portal/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flex: 1 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 7, flexShrink: 0,
            background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 800, color: "#fff",
          }}>F</div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>
            Fropty<span style={{ color: "var(--primary)" }}>Hub</span>
          </span>
        </Link>

        <PortalThemeToggle initialTheme={initialTheme} />
      </div>

      {/* ── Overlay mobile ── */}
      <div
        className={`portal-overlay${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {sidebar}
    </>
  );
}
