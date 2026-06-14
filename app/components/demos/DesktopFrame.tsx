"use client";

import type { ReactNode } from "react";

export function DesktopFrame({
  children,
  label,
  tagline,
  accentColor,
}: {
  children: ReactNode;
  label: string;
  tagline: string;
  accentColor: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{
        width: 420,
        background: "#1a1f2e",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: `0 24px 60px ${accentColor}40, 0 8px 20px rgba(0,0,0,0.4)`,
        flexShrink: 0,
      }}>
        <div style={{
          height: 34,
          background: "#252d3d",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div style={{
            flex: 1, height: 20,
            background: "#1a2035",
            borderRadius: 4,
            display: "flex", alignItems: "center",
            paddingLeft: 8, gap: 4,
          }}>
            <span style={{ fontSize: 9, color: "#64748b" }}>🔒</span>
            <span style={{ fontSize: 9, color: "#64748b" }}>app.fropty.com</span>
          </div>
        </div>
        <div style={{ height: 340, background: "#f8fafc", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#e2e8f0" }}>{label}</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{tagline}</div>
      </div>
    </div>
  );
}
