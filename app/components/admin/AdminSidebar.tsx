"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { signOut } from "@/app/actions/auth";
import { PortalThemeToggle } from "@/app/components/cliente/PortalThemeToggle";
import {
  LayoutDashboard, Users, CreditCard, MessageCircle, BarChart2, ShieldCheck,
  UserCircle, BookOpen, Map, MessageSquarePlus, FolderKanban, FileSignature,
  HeartPulse, ChevronRight, ChevronLeft, X, Menu, LogOut, Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { id: string; href: string; Icon: LucideIcon; label: string; group?: string };

const NAV: NavItem[] = [
  { id: "overview",         href: "/admin/overview",         Icon: LayoutDashboard,   label: "Visão Geral",        group: "main" },
  { id: "usuarios",         href: "/admin/usuarios",         Icon: Users,             label: "Usuários",           group: "main" },
  { id: "customer-success", href: "/admin/customer-success", Icon: HeartPulse,        label: "Customer Success",   group: "main" },
  { id: "projetos",         href: "/admin/projetos",         Icon: FolderKanban,      label: "Projetos",           group: "ops" },
  { id: "contratos",        href: "/admin/contratos",        Icon: FileSignature,     label: "Contratos",          group: "ops" },
  { id: "financeiro",       href: "/admin/financeiro",       Icon: CreditCard,        label: "Financeiro",         group: "ops" },
  { id: "suporte",          href: "/portal/suporte",         Icon: MessageCircle,     label: "Suporte",            group: "ops" },
  { id: "roadmap",          href: "/admin/roadmap",          Icon: Map,               label: "Roadmap",            group: "produto" },
  { id: "feedback",         href: "/admin/feedback",         Icon: MessageSquarePlus, label: "Feedback",           group: "produto" },
  { id: "base-conhecimento",href: "/admin/base-conhecimento",Icon: BookOpen,          label: "Base de Conhecimento",group: "produto" },
  { id: "analytics",        href: "/admin/analytics",        Icon: BarChart2,         label: "Analytics",          group: "sistema" },
  { id: "audit",            href: "/admin/audit",            Icon: ShieldCheck,       label: "Auditoria",          group: "sistema" },
  { id: "perfil",           href: "/admin/perfil",           Icon: UserCircle,        label: "Meu Perfil",         group: "sistema" },
];

const GROUP_LABELS: Record<string, string> = {
  main:    "Principal",
  ops:     "Operações",
  produto: "Produto",
  sistema: "Sistema",
};

interface Props {
  name:          string;
  initials:      string;
  userId:        string;
  initialTheme?: "dark" | "light";
}

export function AdminSidebar({ name, initials, initialTheme = "dark" }: Props) {
  const pathname              = usePathname();
  const [pending, startTrans] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hub-admin-sidebar-collapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("hub-admin-sidebar-collapsed", next ? "1" : "0");
  }

  function handleSignOut() {
    startTrans(async () => {
      const result = await signOut();
      if (result?.redirectTo) window.location.href = result.redirectTo;
    });
  }

  const W = collapsed ? 60 : 224;

  /* Group nav items */
  const groups = NAV.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group ?? "main";
    (acc[g] ??= []).push(item);
    return acc;
  }, {});

  const sidebar = (
    <aside
      className={`portal-sidebar${mobileOpen ? " open" : ""}`}
      style={{ width: W, transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)" }}
    >
      {/* Collapse tab */}
      <button
        onClick={toggleCollapse}
        title={collapsed ? "Expandir" : "Recolher"}
        className="portal-sidebar-toggle"
        style={{
          position: "absolute", top: "50%", right: -13,
          transform: "translateY(-50%)",
          width: 13, height: 44,
          borderRadius: "0 var(--r-md) var(--r-md) 0",
          border: "1px solid var(--sidebar-border)", borderLeft: "none",
          background: "var(--sidebar-bg)", cursor: "pointer", color: "var(--text-faint)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, padding: 0,
          transition: "background 0.15s, color 0.15s", flexShrink: 0,
        }}
      >
        {collapsed ? <ChevronRight size={9} /> : <ChevronLeft size={9} />}
      </button>

      {/* Mobile close */}
      <button
        className="portal-sidebar-close"
        onClick={() => setMobileOpen(false)}
        aria-label="Fechar menu"
        style={{
          position: "absolute", top: 14, right: 14,
          width: 28, height: 28, borderRadius: "var(--r-sm)",
          border: "1px solid var(--border)", background: "var(--surface-2)",
          cursor: "pointer", color: "var(--text-faint)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <X size={13} />
      </button>

      <div style={{
        display: "flex", flexDirection: "column", flex: 1,
        padding: collapsed ? "20px 0" : "22px 14px",
        transition: "padding 0.22s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden", gap: 0,
      }}>

        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          marginBottom: 22, paddingLeft: collapsed ? 0 : 2,
        }}>
          <Link href="/admin/overview" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: "linear-gradient(135deg, var(--brand-accent), #c97a10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, color: "#fff",
            }}>A</div>
            {!collapsed && (
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                Fropty<span style={{ color: "var(--brand-accent)" }}>Admin</span>
              </span>
            )}
          </Link>
        </div>

        {/* User card */}
        {!collapsed ? (
          <div style={{
            background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "var(--r-md)", padding: "10px 12px",
            marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, var(--brand-accent), #c97a10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: 800, color: "#fff",
            }}>
              {initials}
            </div>
            <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: "12.5px", fontWeight: 700, color: "var(--text)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {name}
              </p>
              <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, color: "var(--brand-accent)", letterSpacing: "0.04em" }}>
                ADMINISTRADOR
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div title={name} style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--brand-accent), #c97a10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 800, color: "#fff",
            }}>
              {initials}
            </div>
          </div>
        )}

        {/* Nav groups */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1, overflow: "hidden" }}>
          {Object.entries(groups).map(([groupKey, items]) => (
            <div key={groupKey} style={{ marginBottom: collapsed ? 4 : 14 }}>
              {!collapsed && (
                <p style={{
                  fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.10em",
                  textTransform: "uppercase", color: "var(--text-faint)",
                  padding: "0 11px", margin: "0 0 4px 0",
                }}>
                  {GROUP_LABELS[groupKey] ?? groupKey}
                </p>
              )}
              {items.map(({ id, href, Icon, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                const accentActive = active ? "rgba(239,159,39,0.18)" : "transparent";
                const accentText   = active ? "var(--brand-accent)" : "var(--text-muted)";
                return (
                  <Link
                    key={id}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? label : undefined}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: collapsed ? "center" : "flex-start",
                      gap: collapsed ? 0 : 9,
                      padding: collapsed ? "9px 0" : "8px 11px",
                      borderRadius: "var(--r-md)",
                      fontSize: "13px", fontWeight: active ? 700 : 500,
                      textDecoration: "none",
                      color: accentText,
                      background: accentActive,
                      borderLeft: active && !collapsed ? "2px solid var(--brand-accent)" : "2px solid transparent",
                      paddingLeft: active && !collapsed ? 10 : 11,
                      transition: "background 0.12s, color 0.12s",
                      whiteSpace: "nowrap", overflow: "hidden", position: "relative",
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
                      <Icon size={16} />
                    </span>
                    {!collapsed && (
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />

        {/* Theme + Logout */}
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
              display: "flex", alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 9,
              padding: collapsed ? "9px 0" : "8px 11px",
              borderRadius: "var(--r-md)",
              fontSize: "13px", fontWeight: 500,
              color: "var(--text-faint)", background: "none", border: "none",
              cursor: pending ? "not-allowed" : "pointer",
              opacity: pending ? 0.5 : 1,
              fontFamily: "inherit", width: "100%",
              transition: "background 0.12s, color 0.12s",
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
      {/* Mobile topbar */}
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
        <Link href="/admin/overview" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flex: 1 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 7, flexShrink: 0,
            background: "linear-gradient(135deg, var(--brand-accent), #c97a10)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 800, color: "#fff",
          }}>A</div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>
            Fropty<span style={{ color: "var(--brand-accent)" }}>Admin</span>
          </span>
        </Link>
        <PortalThemeToggle initialTheme={initialTheme} />
      </div>

      {/* Overlay */}
      <div
        className={`portal-overlay${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {sidebar}
    </>
  );
}
