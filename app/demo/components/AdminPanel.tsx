"use client";

import { useState } from "react";

type Props = {
  addToast: (type: "success" | "error" | "warning" | "info", message: string) => void;
};

type ConfirmModal = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel: string;
  confirmColor: string;
} | null;

type User = {
  id: number;
  name: string;
  email: string;
  role: "Proprietária" | "Funcionário" | "Visualizador" | "Admin";
  active: boolean;
  removable: boolean;
};

const INITIAL_USERS: User[] = [
  { id: 1, name: "Ana Paula", email: "ana@confeitaria.com", role: "Proprietária", active: true, removable: true },
  { id: 2, name: "Carlos Santos", email: "carlos@confeitaria.com", role: "Funcionário", active: true, removable: true },
  { id: 3, name: "Beatriz Lima", email: "bia@confeitaria.com", role: "Funcionário", active: false, removable: true },
  { id: 4, name: "Mariana Costa", email: "mari@confeitaria.com", role: "Visualizador", active: true, removable: true },
  { id: 5, name: "[Admin Demo]", email: "admin@fropty.com", role: "Admin", active: true, removable: false },
];

const ROLE_COLORS: Record<User["role"], { bg: string; color: string }> = {
  Proprietária: { bg: "rgba(239,159,39,0.15)", color: "#EF9F27" },
  Funcionário: { bg: "rgba(91,87,232,0.15)", color: "#5B57E8" },
  Visualizador: { bg: "rgba(150,150,150,0.15)", color: "#999" },
  Admin: { bg: "rgba(168,85,247,0.15)", color: "#a855f7" },
};

type ProductForm = {
  nome: string;
  categoria: string;
  preco: string;
  estoque: string;
  descricao: string;
};

type ProductTouched = {
  nome: boolean;
  preco: boolean;
  estoque: boolean;
};

const EMPTY_FORM: ProductForm = {
  nome: "",
  categoria: "Pães & Croissants",
  preco: "",
  estoque: "",
  descricao: "",
};

const EMPTY_TOUCHED: ProductTouched = { nome: false, preco: false, estoque: false };

function getProductErrors(form: ProductForm) {
  const errors: Partial<Record<keyof ProductForm, string>> = {};
  if (form.nome.trim().length < 3) errors.nome = "Nome deve ter pelo menos 3 caracteres.";
  if (!form.preco || Number(form.preco) <= 0) errors.preco = "Preço deve ser maior que zero.";
  if (form.estoque !== "" && Number(form.estoque) < 0) errors.estoque = "Estoque não pode ser negativo.";
  return errors;
}

const inputStyle = (hasError?: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "8px 12px",
  background: "var(--input-bg)",
  border: `1px solid ${hasError ? "#EF4444" : "var(--border)"}`,
  borderRadius: 8,
  color: "var(--text)",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
});

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  color: "var(--text-muted)",
  marginBottom: 4,
  fontWeight: 500,
};

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#EF4444",
  marginTop: 4,
};

const cardStyle: React.CSSProperties = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: 12,
  padding: "24px",
};

const sectionTitleStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 16,
  fontWeight: 700,
  color: "var(--text)",
  marginBottom: 20,
};

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid var(--border)",
  margin: "28px 0",
};

const btnPrimary: React.CSSProperties = {
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const btnOutline = (color: string): React.CSSProperties => ({
  background: "transparent",
  color,
  border: `1px solid ${color}`,
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
});

export default function AdminPanel({ addToast }: Props) {
  // ── Product form
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<ProductTouched>(EMPTY_TOUCHED);
  const errors = getProductErrors(form);

  function handleBlur(field: keyof ProductTouched) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleFormChange(field: keyof ProductForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSaveProduct() {
    setTouched({ nome: true, preco: true, estoque: true });
    const errs = getProductErrors(form);
    if (Object.keys(errs).length > 0) {
      addToast("error", "Corrija os erros antes de salvar");
      return;
    }
    addToast("success", `Produto "${form.nome}" cadastrado com sucesso!`);
    setForm(EMPTY_FORM);
    setTouched(EMPTY_TOUCHED);
  }

  // ── Store settings
  const [storeName, setStoreName] = useState("Confeitaria da Ana");
  const [abertura, setAbertura] = useState("08:00");
  const [fechamento, setFechamento] = useState("20:00");
  const [payments, setPayments] = useState({
    pix: true,
    credito: true,
    debito: true,
    dinheiro: true,
    vale: false,
  });

  function togglePayment(key: keyof typeof payments) {
    setPayments((p) => ({ ...p, [key]: !p[key] }));
  }

  function handleSaveSettings() {
    addToast("success", "Configurações salvas!");
  }

  // ── Users
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  function toggleUserActive(id: number) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newActive = !u.active;
        addToast("info", `${u.name} ${newActive ? "ativado" : "desativado"}.`);
        return { ...u, active: newActive };
      })
    );
  }

  function removeUser(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast("success", "Usuário removido.");
  }

  // ── Confirm modal
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>(null);

  function openConfirm(opts: Omit<NonNullable<ConfirmModal>, "open">) {
    setConfirmModal({ open: true, ...opts });
  }

  function closeConfirm() {
    setConfirmModal(null);
  }

  function handleConfirm() {
    confirmModal?.onConfirm();
    closeConfirm();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* ── 1. Cadastro de produto ── */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>
          <i className="ti ti-plus" style={{ color: "var(--primary)", fontSize: 18 }} />
          Novo Produto
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Nome */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Nome do produto</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => handleFormChange("nome", e.target.value)}
              onBlur={() => handleBlur("nome")}
              style={inputStyle(touched.nome && !!errors.nome)}
              placeholder="Ex: Croissant de manteiga"
            />
            {touched.nome && errors.nome && <p style={errorStyle}>{errors.nome}</p>}
          </div>

          {/* Categoria */}
          <div>
            <label style={labelStyle}>Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => handleFormChange("categoria", e.target.value)}
              style={inputStyle()}
            >
              <option>Pães &amp; Croissants</option>
              <option>Salgados &amp; Doces</option>
              <option>Bolos &amp; Tortas</option>
              <option>Kits &amp; Combos</option>
              <option>Bebidas</option>
            </select>
          </div>

          {/* Preço */}
          <div>
            <label style={labelStyle}>Preço (R$)</label>
            <input
              type="number"
              min={0}
              value={form.preco}
              onChange={(e) => handleFormChange("preco", e.target.value)}
              onBlur={() => handleBlur("preco")}
              style={inputStyle(touched.preco && !!errors.preco)}
              placeholder="0,00"
            />
            {touched.preco && errors.preco && <p style={errorStyle}>{errors.preco}</p>}
          </div>

          {/* Estoque */}
          <div>
            <label style={labelStyle}>Estoque (unidades)</label>
            <input
              type="number"
              min={0}
              value={form.estoque}
              onChange={(e) => handleFormChange("estoque", e.target.value)}
              onBlur={() => handleBlur("estoque")}
              style={inputStyle(touched.estoque && !!errors.estoque)}
              placeholder="0"
            />
            {touched.estoque && errors.estoque && <p style={errorStyle}>{errors.estoque}</p>}
          </div>

          {/* Descrição */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Descrição</label>
            <textarea
              rows={3}
              value={form.descricao}
              onChange={(e) => handleFormChange("descricao", e.target.value)}
              style={{ ...inputStyle(), resize: "vertical" }}
              placeholder="Descreva o produto..."
            />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button style={btnPrimary} onClick={handleSaveProduct}>
            Salvar produto
          </button>
        </div>
      </div>

      <hr style={dividerStyle} />

      {/* ── 2. Configurações da loja ── */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>
          <i className="ti ti-settings" style={{ color: "var(--primary)", fontSize: 18 }} />
          Configurações da Loja
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Nome da loja</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              style={inputStyle()}
            />
          </div>

          <div>
            <label style={labelStyle}>Horário de abertura</label>
            <input
              type="time"
              value={abertura}
              onChange={(e) => setAbertura(e.target.value)}
              style={inputStyle()}
            />
          </div>

          <div>
            <label style={labelStyle}>Horário de fechamento</label>
            <input
              type="time"
              value={fechamento}
              onChange={(e) => setFechamento(e.target.value)}
              style={inputStyle()}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Formas de pagamento</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 6 }}>
              {(
                [
                  { key: "pix", label: "PIX" },
                  { key: "credito", label: "Cartão de crédito" },
                  { key: "debito", label: "Cartão de débito" },
                  { key: "dinheiro", label: "Dinheiro" },
                  { key: "vale", label: "Vale-refeição" },
                ] as { key: keyof typeof payments; label: string }[]
              ).map(({ key, label }) => (
                <label
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    fontSize: 14,
                    color: "var(--text-muted)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={payments[key]}
                    onChange={() => togglePayment(key)}
                    style={{ accentColor: "var(--primary)", width: 16, height: 16 }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button style={btnPrimary} onClick={handleSaveSettings}>
            Salvar configurações
          </button>
        </div>
      </div>

      <hr style={dividerStyle} />

      {/* ── 3. Gestão de usuários ── */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>
          <i className="ti ti-users" style={{ color: "var(--primary)", fontSize: 18 }} />
          Usuários
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Nome", "E-mail", "Perfil", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-faint)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const rc = ROLE_COLORS[user.role];
                return (
                  <tr key={user.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 12px", fontSize: 14, color: "var(--text)", fontWeight: 500 }}>
                      {user.name}
                    </td>
                    <td style={{ padding: "12px 12px", fontSize: 13, color: "var(--text-muted)" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "12px 12px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          background: rc.bg,
                          color: rc.color,
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px" }}>
                      {/* Pill toggle */}
                      <button
                        onClick={() => toggleUserActive(user.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          gap: 6,
                        }}
                        title={user.active ? "Desativar" : "Ativar"}
                      >
                        <span
                          style={{
                            position: "relative",
                            width: 36,
                            height: 20,
                            borderRadius: 10,
                            background: user.active ? "#22c55e" : "#555",
                            display: "inline-block",
                            transition: "background 0.2s",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: 3,
                              left: user.active ? 18 : 3,
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              background: "#fff",
                              transition: "left 0.2s",
                            }}
                          />
                        </span>
                        <span style={{ fontSize: 12, color: user.active ? "#22c55e" : "var(--text-faint)" }}>
                          {user.active ? "Ativo" : "Inativo"}
                        </span>
                      </button>
                    </td>
                    <td style={{ padding: "12px 12px" }}>
                      {user.removable && (
                        <button
                          onClick={() =>
                            openConfirm({
                              title: "Remover usuário",
                              message: `Tem certeza que deseja remover ${user.name}? Esta ação não pode ser desfeita.`,
                              onConfirm: () => removeUser(user.id),
                              confirmLabel: "Remover",
                              confirmColor: "#EF4444",
                            })
                          }
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "none",
                            borderRadius: 6,
                            color: "#EF4444",
                            cursor: "pointer",
                            padding: "6px 8px",
                            fontSize: 16,
                            display: "flex",
                            alignItems: "center",
                          }}
                          title="Remover usuário"
                        >
                          <i className="ti ti-trash" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <hr style={dividerStyle} />

      {/* ── 4. Zona de Perigo ── */}
      <div
        style={{
          ...cardStyle,
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        <div style={{ ...sectionTitleStyle, color: "#EF4444" }}>⚠️ Zona de Perigo</div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            style={btnOutline("#EF4444")}
            onClick={() =>
              openConfirm({
                title: "Limpar todos os pedidos",
                message: "Isso vai apagar TODOS os pedidos do histórico. Confirma?",
                onConfirm: () => addToast("warning", "Pedidos apagados. Esta ação é irreversível."),
                confirmLabel: "Limpar pedidos",
                confirmColor: "#EF4444",
              })
            }
          >
            <i className="ti ti-trash" />
            Limpar todos os pedidos
          </button>

          <button
            style={btnOutline("#EF9F27")}
            onClick={() =>
              openConfirm({
                title: "Resetar estoque",
                message: "Isso vai zerar o estoque de TODOS os produtos. Confirma?",
                onConfirm: () => addToast("warning", "Estoque resetado para zero."),
                confirmLabel: "Resetar estoque",
                confirmColor: "#EF9F27",
              })
            }
          >
            <i className="ti ti-refresh" />
            Resetar estoque
          </button>
        </div>

        <p style={{ marginTop: 16, fontSize: 12, color: "var(--text-faint)" }}>
          Estas ações são permanentes e não podem ser desfeitas.
        </p>
      </div>

      {/* ── Confirmation Modal ── */}
      {confirmModal?.open && (
        <div
          onClick={closeConfirm}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 28,
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
              {confirmModal.title}
            </h3>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>
              {confirmModal.message}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={closeConfirm}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  background: confirmModal.confirmColor,
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 14,
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
