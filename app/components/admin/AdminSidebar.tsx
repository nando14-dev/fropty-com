"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { signOut } from "@/app/actions/auth";
import { PortalThemeToggle } from "@/app/components/cliente/PortalThemeToggle";
import {
  LayoutDashboard, Users, CreditCard, MessageCircle, BarChart2, ShieldCheck,
  UserCircle, BookOpen, Map, MessageSquarePlus, FolderKanban, FileSignature,
  HeartPulse, X, Menu, LogOut, Loader2, PanelLeftClose, PanelLeftOpen, Shield,
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type NavItem = { id: string; href: string; Icon: LucideIcon; label: string; group?: string };

const NAV: NavItem[] = [
  { id: "overview",          href: "/admin/overview",          Icon: LayoutDashboard,   label: "Visão Geral",         group: "main" },
  { id: "usuarios",          href: "/admin/usuarios",          Icon: Users,             label: "Usuários",            group: "main" },
  { id: "customer-success",  href: "/admin/customer-success",  Icon: HeartPulse,        label: "Customer Success",    group: "main" },
  { id: "projetos",          href: "/admin/projetos",          Icon: FolderKanban,      label: "Projetos",            group: "ops" },
  { id: "contratos",         href: "/admin/contratos",         Icon: FileSignature,     label: "Contratos",           group: "ops" },
  { id: "financeiro",        href: "/admin/financeiro",        Icon: CreditCard,        label: "Financeiro",          group: "ops" },
  { id: "suporte",           href: "/portal/suporte",          Icon: MessageCircle,     label: "Suporte",             group: "ops" },
  { id: "roadmap",           href: "/admin/roadmap",           Icon: Map,               label: "Roadmap",             group: "produto" },
  { id: "feedback",          href: "/admin/feedback",          Icon: MessageSquarePlus, label: "Feedback",            group: "produto" },
  { id: "base-conhecimento", href: "/admin/base-conhecimento", Icon: BookOpen,          label: "Base de Conhecimento",group: "produto" },
  { id: "analytics",         href: "/admin/analytics",         Icon: BarChart2,         label: "Analytics",           group: "sistema" },
  { id: "audit",             href: "/admin/audit",             Icon: ShieldCheck,       label: "Auditoria",           group: "sistema" },
  { id: "perfil",            href: "/admin/perfil",            Icon: UserCircle,        label: "Meu Perfil",          group: "sistema" },
];

const GROUP_LABELS: Record<string, string> = {
  main: "Principal", ops: "Operações", produto: "Produto", sistema: "Sistema",
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

  const groups = NAV.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group ?? "main";
    (acc[g] ??= []).push(item);
    return acc;
  }, {});

  const sidebar = (
    <aside
      className={`portal-sidebar${mobileOpen ? " open" : ""}`}
      style={{ width: W, transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden" }}
    >
      {/* Close button — mobile only */}
      <button
        className="portal-sidebar-close"
        onClick={() => setMobileOpen(false)}
        aria-label="Fechar menu"
        style={{
          position: "absolute", top: 14, right: 14, width: 28, height: 28,
          borderRadius: "var(--r-sm)", border: "1px solid var(--border)",
          background: "var(--surface-2)", cursor: "pointer", color: "var(--text-faint)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <X size={13} />
      </button>

      <div style={{
        display: "flex", flexDirection: "column", height: "100%",
        padding: collapsed ? "16px 0" : "16px 12px",
        transition: "padding 0.22s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}>

        {/* ── Header: logo + collapse toggle ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          marginBottom: 20, paddingLeft: collapsed ? 0 : 2,
          flexShrink: 0,
        }}>
          <Link href="/admin/overview" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", overflow: "hidden" }}>
            <Image
              src="/logo-icon.png"
              alt="Fropty Hub"
              width={28}
              height={28}
              style={{ objectFit: "contain", flexShrink: 0, borderRadius: 6 }}
            />
            <span style={{
              fontSize: "14px", fontWeight: 700, color: "var(--text)",
              whiteSpace: "nowrap", letterSpacing: "-0.01em",
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? 0 : 160,
              transition: "opacity 0.18s, max-width 0.22s",
              overflow: "hidden",
            }}>
              Fropty<span style={{ color: "var(--primary)" }}>Hub</span>
            </span>
          </Link>

          {!collapsed && (
            <button
              onClick={toggleCollapse}
              title="Recolher menu"
              className="portal-sidebar-toggle"
              style={{
                width: 26, height: 26, borderRadius: "var(--r-sm)",
                border: "1px solid var(--border)", background: "var(--surface-2)",
                cursor: "pointer", color: "var(--text-faint)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <PanelLeftClose size={13} />
            </button>
          )}

          {collapsed && (
            <button
              onClick={toggleCollapse}
              title="Expandir menu"
              style={{
                width: 30, height: 30, borderRadius: "var(--r-sm)",
                border: "1px solid var(--border)", background: "var(--surface-2)",
                cursor: "pointer", color: "var(--text-faint)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <PanelLeftOpen size={13} />
            </button>
          )}
        </div>

        {/* ── Nav groups ── */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {Object.entries(groups).map(([groupKey, items]) => (
            <div key={groupKey} style={{ marginBottom: collapsed ? 2 : 12 }}>
              {!collapsed && (
                <p style={{
                  fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.10em",
                  textTransform: "uppercase", color: "var(--text-faint)",
                  padding: "0 10px", margin: "0 0 3px 0",
                }}>
                  {GROUP_LABELS[groupKey] ?? groupKey}
                </p>
              )}
              {items.map(({ id, href, Icon, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
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
                      padding: collapsed ? "9px 0" : "7px 10px",
                      borderRadius: "var(--r-md)",
                      fontSize: "13px", fontWeight: active ? 600 : 500,
                      textDecoration: "none",
                      color: active ? "var(--sidebar-item-active-text)" : "var(--text-muted)",
                      background: active ? "var(--sidebar-item-active)" : "transparent",
                      borderLeft: active && !collapsed ? "2px solid var(--primary)" : "2px solid transparent",
                      paddingLeft: active && !collapsed ? 9 : 10,
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
                    <span style={{ flexShrink: 0, display: "flex", opacity: active ? 1 : 0.65 }}>
                      <Icon size={16} />
                    </span>
                    {!collapsed && (
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── Footer: theme + user + logout ── */}
        <div style={{ flexShrink: 0, marginTop: 8 }}>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 8 }} />

          {/* Theme row */}
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 10px", marginBottom: 4 }}>
              <span style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: 500 }}>Tema</span>
              <PortalThemeToggle initialTheme={initialTheme} />
            </div>
          )}

          {/* User row — Aceternity pattern */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "6px 0" : "7px 10px",
            borderRadius: "var(--r-md)",
            gap: 8,
          }}>
            {/* Avatar — neutral, sem laranja */}
            <div
              title={collapsed ? name : undefined}
              style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "var(--surface-2)",
                border: "1.5px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700, color: "var(--text)",
                position: "relative",
              }}
            >
              {initials}
              {/* Detalhe sutil de admin: pequeno badge Shield */}
              <span style={{
                position: "absolute", bottom: -2, right: -2,
                width: 12, height: 12, borderRadius: "50%",
                background: "var(--sidebar-bg)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Shield size={7} style={{ color: "var(--primary)", opacity: 0.8 }} />
              </span>
            </div>

            {/* Name + admin label — expanded */}
            {!collapsed && (
              <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
                <p style={{
                  margin: 0, fontSize: "12.5px", fontWeight: 600, color: "var(--text)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {name}
                </p>
                <p style={{
                  margin: 0, fontSize: "10px", fontWeight: 600,
                  color: "var(--text-faint)", letterSpacing: "0.04em",
                  display: "flex", alignItems: "center", gap: 3,
                }}>
                  <Shield size={8} style={{ color: "var(--primary)", opacity: 0.7 }} />
                  Administrador
                </p>
              </div>
            )}

            {/* Logout — expanded */}
            {!collapsed && (
              <button
                onClick={handleSignOut}
                disabled={pending}
                title="Sair"
                style={{
                  width: 28, height: 28, borderRadius: "var(--r-sm)",
                  border: "1px solid var(--border)", background: "var(--surface-2)",
                  cursor: pending ? "not-allowed" : "pointer",
                  color: "var(--text-faint)", opacity: pending ? 0.5 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "color 0.12s, border-color 0.12s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--c-danger)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-danger)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-faint)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                }}
              >
                {pending
                  ? <Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} />
                  : <LogOut size={13} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="portal-topbar">
        <button onClick={() => setMobileOpen(true)} aria-label="Abrir menu" style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--surface)", border: "1px solid var(--border)", cursor: "pointer", color: "var(--text-muted)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Menu size={17} />
        </button>
        <Link href="/admin/overview" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flex: 1 }}>
          <Image src="/logo-icon.png" alt="Fropty Hub" width={22} height={22} style={{ objectFit: "contain", borderRadius: 5 }} />
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>
            Fropty<span style={{ color: "var(--primary)" }}>Hub</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-faint)", marginLeft: 5 }}>Admin</span>
          </span>
        </Link>
        <PortalThemeToggle initialTheme={initialTheme} />
      </div>

      {/* Overlay mobile */}
      <div className={`portal-overlay${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(false)} aria-hidden />

      {sidebar}
    </>
  );
}
