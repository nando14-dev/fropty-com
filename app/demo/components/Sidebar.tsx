"use client";

import type { Role, Section } from "./data";

type Props = {
  activeSection: Section;
  role: Role;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: Section) => void;
};

type NavItem = {
  section: Section;
  icon: string;
  label: string;
  adminOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { section: "dashboard", icon: "ti-layout-dashboard", label: "Dashboard" },
  { section: "catalog", icon: "ti-package", label: "Catálogo" },
  { section: "orders", icon: "ti-shopping-bag", label: "Pedidos" },
  { section: "customers", icon: "ti-users", label: "Clientes" },
  { section: "financial", icon: "ti-chart-bar", label: "Financeiro" },
  { section: "notifications", icon: "ti-bell", label: "Notificações" },
  { section: "profile", icon: "ti-user-circle", label: "Perfil" },
  { section: "admin", icon: "ti-shield-lock", label: "Admin", adminOnly: true },
];

export default function Sidebar({ activeSection, role, isOpen, onClose, onNavigate }: Props) {
  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || role === "admin");

  return (
    <>
      {/* Overlay */}
      <div
        className={`portal-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <nav
        className={`portal-sidebar${isOpen ? " open" : ""}`}
        style={{
          width: 220,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRight: "1px solid var(--border)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            padding: "20px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#5B57E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "-0.5px",
              flexShrink: 0,
            }}
          >
            F
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "var(--text)",
              letterSpacing: "-0.3px",
              flex: 1,
            }}
          >
            Fropty
          </span>

          {/* Close button */}
          <button
            className="portal-sidebar-close"
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-label="Fechar menu"
          >
            <i className="ti ti-x" style={{ fontSize: 15 }} />
          </button>
        </div>

        {/* Nav items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {visibleItems.map((item) => {
            const isActive = activeSection === item.section;
            const isAdmin = item.adminOnly;

            return (
              <button
                key={item.section}
                onClick={() => {
                  onNavigate(item.section);
                  onClose();
                }}
                style={{
                  width: "100%",
                  height: 40,
                  padding: "0 12px",
                  borderRadius: 10,
                  border: "none",
                  background: isActive ? "rgba(91,87,232,0.15)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  textAlign: "left",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(var(--surface-rgb, 255,255,255), 0.5)";
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {/* Orange dot for admin */}
                {isAdmin && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#EF9F27",
                      flexShrink: 0,
                      marginRight: -4,
                    }}
                  />
                )}
                <i
                  className={`ti ${item.icon}`}
                  style={{
                    fontSize: 18,
                    color: isActive ? "var(--primary)" : "var(--text-muted)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom version info */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "var(--text-faint)",
              fontSize: 11,
              userSelect: "none",
            }}
          >
            Demo v1.0
          </span>
        </div>
      </nav>
    </>
  );
}
