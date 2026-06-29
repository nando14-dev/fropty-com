"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import PasswordChangeForm from "@/app/components/cliente/PasswordChangeForm";
import {
  User, Bell, Lock, Shield, AlertTriangle, Check, X, Loader2, Upload,
} from "lucide-react";

type Section = "info" | "notificacoes" | "senha";

interface Props {
  name:  string;
  email: string;
  role:  "admin" | "cliente";
}

export function ProfileSettings({ name: initialName, email, role }: Props) {
  const [section, setSection]         = useState<Section>("info");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue]     = useState(initialName);
  const [savedName, setSavedName]     = useState(initialName);
  const [nameMsg, setNameMsg]         = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition]    = useTransition();

  function saveName() {
    if (!nameValue.trim()) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.append("name", nameValue.trim());
      const res = await updateProfile(fd);
      if (res.success) {
        setSavedName(nameValue.trim());
        setEditingName(false);
        setNameMsg({ ok: true, text: res.success });
        setTimeout(() => setNameMsg(null), 3000);
      } else {
        setNameMsg({ ok: false, text: res.error ?? "Erro ao salvar." });
      }
    });
  }

  const initials = savedName.slice(0, 2).toUpperCase();

  return (
    <div style={{ display: "flex", minHeight: 500 }}>
      {/* ── Left nav ── */}
      <nav style={{ width: 196, flexShrink: 0, paddingRight: 20 }}>
        <SectionGroup label="Conta">
          <NavItem active={section === "info"} onClick={() => setSection("info")} icon={<User size={13} />}>
            Informações Pessoais
          </NavItem>
          <NavItem active={section === "notificacoes"} onClick={() => setSection("notificacoes")} icon={<Bell size={13} />}>
            Notificações
          </NavItem>
        </SectionGroup>

        <SectionGroup label="Segurança" style={{ marginTop: 20 }}>
          <NavItem active={section === "senha"} onClick={() => setSection("senha")} icon={<Lock size={13} />}>
            Senha
          </NavItem>
        </SectionGroup>
      </nav>

      {/* ── Divider ── */}
      <div style={{ width: 1, background: "var(--border)", flexShrink: 0 }} />

      {/* ── Content ── */}
      <div style={{ flex: 1, paddingLeft: 40, paddingTop: 0 }}>

        {/* === INFORMAÇÕES PESSOAIS === */}
        {section === "info" && (
          <div>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 28, borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--surface-2)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 800, color: "var(--text)", flexShrink: 0, letterSpacing: "-0.02em" }}>
                {initials}
              </div>
              <button
                type="button"
                title="Em breve"
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "12.5px", fontWeight: 500, cursor: "not-allowed", fontFamily: "inherit", opacity: 0.6 }}
              >
                <Upload size={12} /> Upload foto
              </button>
            </div>

            {/* Nome */}
            <FieldRow label="Nome">
              {editingName ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                  <input
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") { setNameValue(savedName); setEditingName(false); } }}
                    autoFocus
                    style={{ flex: 1, maxWidth: 280, padding: "7px 12px", borderRadius: 8, border: "1px solid var(--primary)", background: "var(--surface-2)", color: "var(--text)", fontSize: "14px", fontFamily: "inherit", outline: "none" }}
                  />
                  <button onClick={saveName} disabled={pending} style={iconBtn("#22c55e")}>
                    {pending ? <Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} /> : <Check size={13} />}
                  </button>
                  <button onClick={() => { setNameValue(savedName); setEditingName(false); }} style={iconBtn("var(--text-faint)")}>
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                  <span style={{ fontSize: "14px", color: "var(--primary-muted, #5B57E8)", fontWeight: 500 }}>{savedName}</span>
                  <button onClick={() => setEditingName(true)} style={editBtn}>Editar</button>
                </div>
              )}
              {nameMsg && (
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: nameMsg.ok ? "#22c55e" : "#ef4444" }}>{nameMsg.text}</p>
              )}
            </FieldRow>

            {/* Email */}
            <FieldRow label="E-mail">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                <span style={{ fontSize: "14px", color: "var(--primary-muted, #5B57E8)", fontWeight: 500 }}>{email}</span>
                <span style={{ fontSize: "12px", color: "var(--text-faint)", fontStyle: "italic" }}>Não editável</span>
              </div>
            </FieldRow>

            {/* Cargo / Papel */}
            <FieldRow label="Papel" noBorder>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, background: "var(--surface-2)", border: "1px solid var(--border)", fontSize: "12px", fontWeight: 700, color: "var(--text-faint)" }}>
                  <Shield size={9} style={{ color: "var(--primary)" }} />
                  {role === "admin" ? "Administrador" : "Cliente"}
                </span>
              </div>
            </FieldRow>
          </div>
        )}

        {/* === NOTIFICAÇÕES === */}
        {section === "notificacoes" && (
          <div>
            <p style={{ margin: "0 0 24px", fontSize: "14px", color: "var(--text-faint)" }}>
              Configure como deseja receber alertas e atualizações do Fropty Hub.
            </p>
            {[
              { id: "tickets",   label: "Atualizações de chamados", desc: "Notificações quando um chamado mudar de status." },
              { id: "projetos",  label: "Progresso de projetos",    desc: "Avisos sobre marcos e entregas dos seus projetos." },
              { id: "contratos", label: "Contratos pendentes",      desc: "Alertas de contratos aguardando sua assinatura." },
              { id: "financeiro",label: "Faturas e pagamentos",     desc: "Notificações de cobranças e confirmações de pagamento." },
            ].map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{item.label}</p>
                  <p style={{ margin: "3px 0 0", fontSize: "12.5px", color: "var(--text-faint)" }}>{item.desc}</p>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: 38, height: 22, flexShrink: 0, cursor: "not-allowed", opacity: 0.5 }}>
                  <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} disabled />
                  <span style={{ position: "absolute", inset: 0, background: "var(--primary)", borderRadius: 999 }} />
                  <span style={{ position: "absolute", left: 18, top: 3, width: 16, height: 16, background: "#fff", borderRadius: "50%", transition: "left 0.2s" }} />
                </label>
              </div>
            ))}
            <p style={{ marginTop: 16, fontSize: "12px", color: "var(--text-faint)" }}>Em breve: configuração granular por canal (e-mail, SMS, push).</p>
          </div>
        )}

        {/* === SENHA === */}
        {section === "senha" && (
          <div>
            <FieldRow label="Senha" noBorder={false}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "20px", letterSpacing: "0.12em", color: "var(--text-muted)" }}>••••••••••</span>
                <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>&nbsp;</span>
              </div>
            </FieldRow>

            <div style={{ marginTop: 24 }}>
              <PasswordChangeForm />
            </div>

            {/* 2FA */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "22px 0", borderTop: "1px solid var(--border)", marginTop: 28 }}>
              <div style={{ maxWidth: 400 }}>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Autenticação em dois fatores</p>
                <p style={{ margin: "5px 0 0", fontSize: "13px", color: "var(--text-faint)", lineHeight: 1.5 }}>
                  Adicione uma camada extra de segurança. Um código será exigido além da sua senha.
                </p>
              </div>
              <button style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text-muted)", fontSize: "12.5px", fontWeight: 600, cursor: "not-allowed", fontFamily: "inherit", flexShrink: 0, opacity: 0.6 }} title="Em breve">
                Ativar
              </button>
            </div>

            {/* Danger zone */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "22px 0", borderTop: "1px solid var(--border)" }}>
              <div style={{ maxWidth: 400 }}>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--c-danger)" }}>
                  <AlertTriangle size={13} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Desativar conta
                </p>
                <p style={{ margin: "5px 0 0", fontSize: "13px", color: "var(--text-faint)", lineHeight: 1.5 }}>
                  Esta ação irá remover imediatamente todos os seus dados. É irreversível — prossiga com cautela.
                </p>
              </div>
              <button style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid var(--c-danger)", background: "transparent", color: "var(--c-danger)", fontSize: "12.5px", fontWeight: 600, cursor: "not-allowed", fontFamily: "inherit", flexShrink: 0, opacity: 0.6 }} title="Entre em contato com o suporte">
                Desativar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Sub-components ── */

function SectionGroup({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <p style={{ margin: "0 0 4px 8px", fontSize: "10px", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</p>
      {children}
    </div>
  );
}

function NavItem({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 8,
        padding: "7px 10px", borderRadius: 8, textAlign: "left",
        background: active ? "var(--surface-2)" : "transparent",
        border: "none", cursor: "pointer", fontFamily: "inherit",
        fontSize: "13px", fontWeight: active ? 600 : 500,
        color: active ? "var(--text)" : "var(--text-muted)",
        transition: "background 0.1s",
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)"; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
    >
      <span style={{ opacity: active ? 1 : 0.6 }}>{icon}</span>
      {children}
    </button>
  );
}

function FieldRow({ label, children, noBorder }: { label: string; children: React.ReactNode; noBorder?: boolean }) {
  return (
    <div style={{ padding: "18px 0", borderBottom: noBorder ? "none" : "1px solid var(--border)" }}>
      <p style={{ margin: "0 0 5px", fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{label}</p>
      {children}
    </div>
  );
}

const editBtn: React.CSSProperties = {
  fontSize: "13px", fontWeight: 600, color: "var(--text)", background: "none",
  border: "none", cursor: "pointer", fontFamily: "inherit", padding: "2px 0",
  textDecoration: "underline", textUnderlineOffset: 3, flexShrink: 0,
};

function iconBtn(color: string): React.CSSProperties {
  return {
    width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface-2)",
    cursor: "pointer", color, flexShrink: 0,
  };
}
