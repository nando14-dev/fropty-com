"use client";

import { useState, useEffect } from "react";
import type { Customer } from "./data";
import { INITIAL_CUSTOMERS } from "./data";

type Props = {
  addToast: (type: "success" | "error" | "warning" | "info", message: string) => void;
};

const PAGE_SIZE = 8;

function StatusBadge({ status }: { status: Customer["status"] }) {
  const map = {
    active: { label: "Ativo", bg: "rgba(91,87,232,0.15)", color: "#5B57E8" },
    inactive: { label: "Inativo", bg: "rgba(107,114,128,0.15)", color: "#9ca3af" },
    vip: { label: "VIP 👑", bg: "rgba(239,159,39,0.15)", color: "#EF9F27" },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function avatarColor(status: Customer["status"]) {
  return status === "vip" ? "#EF9F27" : status === "active" ? "#5B57E8" : "#6b7280";
}

export default function Customers({ addToast }: Props) {
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Customer["status"]>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fmtBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const filterPills: { key: typeof statusFilter; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "active", label: "Ativo" },
    { key: "inactive", label: "Inativo" },
    { key: "vip", label: "VIP" },
  ];

  const pillStyle = (active: boolean) => ({
    padding: "6px 14px",
    borderRadius: 999,
    border: "1px solid",
    borderColor: active ? "#5B57E8" : "var(--border)",
    background: active ? "#5B57E8" : "transparent",
    color: active ? "#fff" : "var(--text-muted)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties);

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <style>{`@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}.sk{background:linear-gradient(90deg,var(--surface) 25%,var(--surface-2) 50%,var(--surface) 75%);background-size:800px 100%;animation:shimmer 1.4s infinite;border-radius:8px;}`}</style>
        <div className="sk" style={{ height: 32, width: 200, marginBottom: 20 }} />
        {[...Array(6)].map((_, i) => <div key={i} className="sk" style={{ height: 52, marginBottom: 8 }} />)}
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", margin: 0 }}>Clientes</h2>
        <span style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, padding: "2px 10px", fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>
          {filtered.length}
        </span>
        <button
          onClick={() => addToast("info", "Cadastro de clientes em breve!")}
          style={{ marginLeft: "auto", padding: "8px 14px", border: "1px solid var(--border)", borderRadius: 10, background: "transparent", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          <i className="ti ti-plus" style={{ fontSize: 15 }} /> Adicionar cliente
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "var(--text-faint)" }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por nome ou email..."
            style={{ width: "100%", padding: "9px 12px 9px 38px", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filterPills.map((p) => (
            <button key={p.key} style={pillStyle(statusFilter === p.key)} onClick={() => { setStatusFilter(p.key); setPage(1); }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {paged.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <i className="ti ti-users" style={{ fontSize: 48, color: "var(--text-faint)", display: "block", marginBottom: 12 }} />
          <p style={{ color: "var(--text-muted)", marginBottom: 12 }}>Nenhum cliente encontrado</p>
          <button onClick={() => { setSearch(""); setStatusFilter("all"); }} style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: 8, background: "transparent", color: "var(--text-muted)", cursor: "pointer", fontSize: 13 }}>
            Limpar filtros
          </button>
        </div>
      ) : (
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Cliente", "Cidade", "Pedidos", "Total gasto", "Último pedido", "Status", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-faint)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((c, i) => (
                  <tr key={c.id} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColor(c.status), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14, flexShrink: 0 }}>
                          {c.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{c.city}</td>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "var(--text)", textAlign: "center" }}>{c.orders}</td>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "var(--text)", fontWeight: 600 }}>{fmtBRL(c.totalSpent)}</td>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap" }}>{c.lastOrder}</td>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><StatusBadge status={c.status} /></td>
                    <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <button
                        onClick={() => setSelected(c)}
                        style={{ padding: "5px 12px", border: "1px solid var(--border)", borderRadius: 8, background: "transparent", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}
                      >
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--text-faint)" }}>
              Mostrando {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length} clientes
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 8, background: "transparent", color: page === 1 ? "var(--text-faint)" : "var(--text-muted)", cursor: page === 1 ? "not-allowed" : "pointer", fontSize: 13 }}
              >
                ← Anterior
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 8, background: "transparent", color: page === totalPages ? "var(--text-faint)" : "var(--text-muted)", cursor: page === totalPages ? "not-allowed" : "pointer", fontSize: 13 }}
              >
                Próxima →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: avatarColor(selected.status), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 22, flexShrink: 0 }}>
                {selected.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{selected.name}</div>
                <StatusBadge status={selected.status} />
              </div>
              <button onClick={() => setSelected(null)} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ti ti-x" style={{ fontSize: 16 }} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "E-mail", value: selected.email },
                { label: "Telefone", value: selected.phone },
                { label: "Cidade", value: selected.city },
                { label: "Total gasto", value: fmtBRL(selected.totalSpent) },
                { label: "Pedidos", value: String(selected.orders) },
                { label: "Último pedido", value: selected.lastOrder },
              ].map((item) => (
                <div key={item.label} style={{ background: "var(--surface-2)", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-faint)", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: "var(--text)" }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 10 }}>Histórico recente</div>
              {[
                { date: "10/06/2026", items: "Croissant + Sonho", total: fmtBRL(20), status: "Entregue", color: "#10B981" },
                { date: "02/06/2026", items: "Bolo de Cenoura", total: fmtBRL(45), status: "Entregue", color: "#10B981" },
              ].map((o, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ fontSize: 12, color: "var(--text-faint)", minWidth: 80 }}>{o.date}</span>
                  <span style={{ fontSize: 13, color: "var(--text)", flex: 1 }}>{o.items}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{o.total}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: o.color }}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
