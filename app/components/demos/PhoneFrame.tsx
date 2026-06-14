"use client";

import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  bgColor = "#f8f9fa",
  label,
  tagline,
  accentColor,
}: {
  children: ReactNode;
  bgColor?: string;
  label: string;
  tagline: string;
  accentColor: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{
        width: 260, height: 520,
        background: "#111",
        borderRadius: 44,
        padding: "10px 8px 12px",
        boxShadow: `0 24px 60px ${accentColor}40, 0 8px 20px rgba(0,0,0,0.4)`,
        position: "relative",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
          width: 80, height: 20, background: "#111",
          borderRadius: 10, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#222" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#1a1a1a" }} />
        </div>
        <div style={{
          width: "100%", height: "100%",
          background: bgColor,
          borderRadius: 36,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            height: 32, background: bgColor,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 18px 0 12px", flexShrink: 0,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="14" height="10" viewBox="0 0 14 10">
                <rect x="0" y="3" width="3" height="7" rx="1" fill="#333"/>
                <rect x="4" y="2" width="3" height="8" rx="1" fill="#333"/>
                <rect x="8" y="0" width="3" height="10" rx="1" fill="#333"/>
                <rect x="12" y="1" width="2" height="8" rx="1" fill="#ddd"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12">
                <path d="M8 2.4C10.2 2.4 12.2 3.3 13.6 4.8L15 3.3C13.2 1.3 10.7 0 8 0C5.3 0 2.8 1.3 1 3.3L2.4 4.8C3.8 3.3 5.8 2.4 8 2.4Z" fill="#333"/>
                <path d="M8 5.6C9.4 5.6 10.6 6.1 11.6 7L13 5.5C11.6 4.2 9.9 3.4 8 3.4C6.1 3.4 4.4 4.2 3 5.5L4.4 7C5.4 6.1 6.6 5.6 8 5.6Z" fill="#333"/>
                <circle cx="8" cy="10" r="2" fill="#333"/>
              </svg>
              <div style={{ display: "flex", gap: 1, alignItems: "center" }}>
                <div style={{ width: 20, height: 10, border: "1.5px solid #333", borderRadius: 3, padding: "1.5px", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "75%", height: "100%", background: "#333", borderRadius: 1 }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#e2e8f0" }}>{label}</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{tagline}</div>
      </div>
    </div>
  );
}
