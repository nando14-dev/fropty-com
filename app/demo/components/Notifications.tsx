"use client";

import { useState } from "react";
import type { Notification } from "./data";

type Props = {
  notifications: Notification[];
  onUpdate: (notifications: Notification[]) => void;
};

const typeIcon: Record<Notification["type"], { icon: string; color: string; bg: string }> = {
  order: { icon: "ti-shopping-bag", color: "#5B57E8", bg: "rgba(91,87,232,0.15)" },
  customer: { icon: "ti-user-plus", color: "#10B981", bg: "rgba(16,185,129,0.15)" },
  stock: { icon: "ti-alert-triangle", color: "#EF9F27", bg: "rgba(239,159,39,0.15)" },
  goal: { icon: "ti-target", color: "#8B5CF6", bg: "rgba(139,92,246,0.15)" },
};

export default function Notifications({ notifications, onUpdate }: Props) {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  function markRead(id: number) {
    onUpdate(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    onUpdate(notifications.map((n) => ({ ...n, read: true })));
  }

  const pillStyle = (active: boolean) => ({
    padding: "6px 16px",
    borderRadius: 999,
    border: "1px solid",
    borderColor: active ? "#5B57E8" : "var(--border)",
    background: active ? "#5B57E8" : "transparent",
    color: active ? "#fff" : "var(--text-muted)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties);

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", margin: 0 }}>Notificações</h2>
        {unreadCount > 0 && (
          <span style={{ background: "#ef4444", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>
            {unreadCount}
          </span>
        )}
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{ marginLeft: "auto", padding: "7px 14px", border: "1px solid var(--border)", borderRadius: 10, background: "transparent", color: "var(--text-muted)", fontSize: 13, cursor: "pointer" }}
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button style={pillStyle(filter === "all")} onClick={() => setFilter("all")}>Todas</button>
        <button style={pillStyle(filter === "unread")} onClick={() => setFilter("unread")}>
          Não lidas {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* List */}
      {displayed.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <i className="ti ti-bell-off" style={{ fontSize: 48, color: "var(--text-faint)", display: "block", marginBottom: 12 }} />
          <p style={{ color: "var(--text-muted)", fontSize: 15 }}>Tudo em dia! Sem notificações pendentes.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {displayed.map((n) => {
            const { icon, color, bg } = typeIcon[n.type];
            return (
              <div
                key={n.id}
                onClick={() => !n.read && markRead(n.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "14px 16px",
                  background: n.read ? "var(--card-bg)" : "rgba(91,87,232,0.06)",
                  border: "1px solid",
                  borderColor: n.read ? "var(--card-border)" : "rgba(91,87,232,0.2)",
                  borderRadius: 12,
                  cursor: n.read ? "default" : "pointer",
                  transition: "background 0.15s",
                }}
              >
                {/* Icon */}
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ti ${icon}`} style={{ fontSize: 18, color }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4, lineHeight: 1.4 }}>{n.message}</div>
                  <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{n.time}</div>
                </div>

                {/* Right */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  {!n.read && (
                    <>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5B57E8" }} />
                      <button
                        onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                        style={{ fontSize: 12, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        Lida
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
