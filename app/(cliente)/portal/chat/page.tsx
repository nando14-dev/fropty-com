import type { Metadata } from "next";
import { createClient } from "@/app/lib/supabase/server";
import { getProfile } from "@/app/lib/auth/session";
import { MessageCircle, Send, Search } from "lucide-react";

export const metadata: Metadata = { title: "Chat" };

export default async function ChatPage() {
  const supabase = await createClient();
  const profile  = await getProfile();

  // Busca últimos tickets com mensagens como "conversas"
  const { data: tickets } = await supabase
    .from("tickets")
    .select("id, subject, status, priority, updated_at, created_at")
    .eq("client_id", profile?.id ?? "")
    .order("updated_at", { ascending: false })
    .limit(20);

  const statusColor: Record<string, string> = {
    aberto:      "#22c55e",
    em_andamento:"#f59e0b",
    aguardando:  "#6366f1",
    resolvido:   "#64748b",
    fechado:     "#64748b",
  };

  return (
    <div style={{ padding: "24px 24px", maxWidth: 1020, margin: "0 auto", height: "calc(100vh - 48px)", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
            Chat
          </h1>
          <p style={{ margin: "3px 0 0", fontSize: "12.5px", color: "var(--text-faint)" }}>
            Conversas com o time Fropty via chamados
          </p>
        </div>
        <a
          href="/portal/suporte/novo"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "8px 16px", borderRadius: 9, textDecoration: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", fontSize: "12.5px", fontWeight: 700,
          }}
        >
          <Send size={13} /> Nova mensagem
        </a>
      </div>

      {/* Layout 2 colunas */}
      <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>

        {/* Lista de conversas */}
        <div style={{
          width: 300, flexShrink: 0,
          background: "var(--card-bg)", border: "1px solid var(--card-border)",
          borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column",
        }}>
          {/* Search */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none" }} />
              <input
                placeholder="Buscar conversa…"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "7px 10px 7px 30px", borderRadius: 8,
                  border: "1px solid var(--border)", background: "var(--surface)",
                  color: "var(--text)", fontSize: "12px", fontFamily: "inherit", outline: "none",
                }}
              />
            </div>
          </div>

          {/* Lista */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {(!tickets || tickets.length === 0) ? (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <MessageCircle size={32} style={{ color: "var(--text-faint)", opacity: 0.4, marginBottom: 10 }} />
                <p style={{ margin: 0, fontSize: "12.5px", color: "var(--text-faint)" }}>
                  Nenhuma conversa ainda.<br />Abra um chamado para começar.
                </p>
              </div>
            ) : tickets.map((t, i) => {
              const dot = statusColor[t.status] ?? "#64748b";
              const date = t.updated_at
                ? new Date(t.updated_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
                : "";
              return (
                <a
                  key={t.id}
                  href={`/portal/suporte/${t.id}`}
                  style={{
                    display: "block", padding: "13px 14px",
                    borderBottom: i < tickets.length - 1 ? "1px solid var(--border)" : "none",
                    textDecoration: "none", color: "inherit",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    {/* Avatar Fropty */}
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 800, color: "#fff",
                    }}>
                      F
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          Fropty Hub
                        </span>
                        <span style={{ fontSize: "10.5px", color: "var(--text-faint)", flexShrink: 0 }}>{date}</span>
                      </div>
                      <p style={{
                        margin: 0, fontSize: "12px", color: "var(--text-faint)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {t.subject}
                      </p>
                      <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0, display: "inline-block" }} />
                        <span style={{ fontSize: "10.5px", color: dot, fontWeight: 700, textTransform: "capitalize" }}>
                          {t.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Painel direito — selecione uma conversa */}
        <div style={{
          flex: 1, background: "var(--card-bg)", border: "1px solid var(--card-border)",
          borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 12,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.10))",
            border: "1px solid rgba(99,102,241,0.20)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <MessageCircle size={24} style={{ color: "var(--primary)" }} />
          </div>
          <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "var(--text)" }}>
            Selecione uma conversa
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "var(--text-faint)", textAlign: "center", maxWidth: 260 }}>
            Escolha uma conversa à esquerda ou abra um novo chamado para conversar com a equipe Fropty.
          </p>
          <a
            href="/portal/suporte/novo"
            style={{
              marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 9, textDecoration: "none",
              border: "1.5px solid var(--primary)", color: "var(--primary)",
              fontSize: "12.5px", fontWeight: 700, background: "rgba(99,102,241,0.06)",
            }}
          >
            <Send size={13} /> Novo chamado
          </a>
        </div>
      </div>
    </div>
  );
}
