"use client";

import { useState, useEffect } from "react";
import type { ProfileData } from "./data";

type Props = {
  profile: ProfileData;
  onSave: (profile: ProfileData) => void;
  addToast: (type: "success" | "error" | "warning" | "info", message: string) => void;
};

const TOKENS_TOTAL = 5;
const TOKENS_USED = 3;

export default function Profile({ profile, onSave, addToast }: Props) {
  const [form, setForm] = useState<ProfileData>(profile);
  const [notifs, setNotifs] = useState({ order: true, stock: true, goal: true });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fropty_demo_profile");
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  function handleSave() {
    try { localStorage.setItem("fropty_demo_profile", JSON.stringify(form)); } catch {}
    onSave(form);
    addToast("success", "Perfil atualizado com sucesso!");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    background: "var(--input-bg)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-muted)",
    marginBottom: 6,
  };

  return (
    <div style={{ padding: 24 }}>
      <style>{`
        @media (min-width: 768px) { .profile-layout { flex-direction: row !important; } .profile-left { width: 300px !important; flex-shrink: 0; } }
      `}</style>

      <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", margin: "0 0 24px" }}>Perfil e Configurações</h2>

      <div className="profile-layout" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Left column */}
        <div className="profile-left" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Profile card */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: 24, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #5B57E8, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontWeight: 800, fontSize: 32, color: "#fff" }}>
              {form.name[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{form.name}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>{form.email}</div>
            <div style={{ fontSize: 12, color: "var(--text-faint)" }}>Fropty Demo</div>
          </div>

          {/* Plan card */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Meu Plano</div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ background: "rgba(239,159,39,0.15)", color: "#EF9F27", borderRadius: 999, padding: "4px 12px", fontSize: 13, fontWeight: 700 }}>
                Profissional 🚀
              </span>
            </div>

            <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 14 }}>
              Renovação: <span style={{ color: "var(--text-muted)" }}>15/07/2026</span>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Tokens de suporte: <strong>{TOKENS_TOTAL - TOKENS_USED} de {TOKENS_TOTAL}</strong>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {Array.from({ length: TOKENS_TOTAL }).map((_, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: i < (TOKENS_TOTAL - TOKENS_USED) ? "#EF9F27" : "transparent", border: "2px solid", borderColor: i < (TOKENS_TOTAL - TOKENS_USED) ? "#EF9F27" : "var(--border)" }} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              {["Atualizações mensais", "Suporte via WhatsApp", "Relatórios automáticos"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <i className="ti ti-check" style={{ fontSize: 14, color: "#10B981" }} />
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{f}</span>
                </div>
              ))}
            </div>

            <a
              href="/configurador"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 14px", border: "1px solid #EF9F27", borderRadius: 10, color: "#EF9F27", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "background 0.15s" }}
            >
              <i className="ti ti-external-link" style={{ fontSize: 14 }} />
              Fazer upgrade
            </a>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Personal info form */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Informações pessoais</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Nome completo</label>
                <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>E-mail</label>
                <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Telefone</label>
                <input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>WhatsApp para notificações</label>
                <input style={inputStyle} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
              </div>
            </div>

            <button
              onClick={handleSave}
              style={{ padding: "10px 24px", background: "#5B57E8", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Salvar alterações
            </button>
          </div>

          {/* Notifications prefs */}
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Preferências de notificações</div>
            {[
              { key: "order" as const, label: "Novo pedido recebido", icon: "ti-shopping-bag" },
              { key: "stock" as const, label: "Estoque baixo", icon: "ti-alert-triangle" },
              { key: "goal" as const, label: "Meta diária atingida", icon: "ti-target" },
            ].map(({ key, label, icon }) => (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={notifs[key]}
                  onChange={(e) => setNotifs({ ...notifs, [key]: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: "#5B57E8" }}
                />
                <i className={`ti ${icon}`} style={{ fontSize: 16, color: "var(--text-faint)" }} />
                <span style={{ fontSize: 14, color: "var(--text)" }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
