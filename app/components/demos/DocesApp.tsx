"use client";

import { useState, useEffect } from "react";
import { Toast, type ToastState } from "./Toast";

export function DocesApp() {
  const [screen, setScreen] = useState<"catalog" | "product" | "cart" | "payment">("catalog");
  const [cartCount, setCartCount] = useState(0);
  const [cartBounce, setCartBounce] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });
  const [animStep, setAnimStep] = useState(0);

  const products = [
    { name: "Brigadeiro",    price: "R$ 3,50", emoji: "🍫", bg: "#3d1a00", count: 12 },
    { name: "Coxinha",       price: "R$ 5,00", emoji: "🍗", bg: "#92400e", count: 20 },
    { name: "Brownie",       price: "R$ 7,00", emoji: "🟫", bg: "#1c1917", count: 8  },
    { name: "Pastel Queijo", price: "R$ 4,00", emoji: "🥟", bg: "#713f12", count: 15 },
  ];

  const addToCart = (name: string) => {
    setCartCount(c => c + 1);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 400);
    setToast({ visible: true, message: `${name} adicionado! 🛒` });
    setTimeout(() => setToast({ visible: false }), 1800);
  };

  useEffect(() => {
    const sequence: [number, () => void][] = [
      [1000,  () => addToCart("Brigadeiro")],
      [2500,  () => addToCart("Coxinha")],
      [4000,  () => setScreen("product")],
      [5500,  () => addToCart("Brownie")],
      [7000,  () => setScreen("cart")],
      [8500,  () => setScreen("payment")],
      [10500, () => {
        setToast({ visible: true, message: "✓ Pedido confirmado! 🎉", color: "#ec4899" });
        setTimeout(() => setToast({ visible: false }), 2000);
      }],
      [13000, () => { setScreen("catalog"); setCartCount(0); }],
    ];
    const timers: ReturnType<typeof setTimeout>[] = sequence.map(([delay, fn]) => setTimeout(fn, delay));
    return () => timers.forEach(t => clearTimeout(t));
  }, [animStep]);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(s => s + 1), 14000);
    return () => clearTimeout(t);
  }, [animStep]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: "#fff9f0", fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: "#fff", padding: "8px 12px", borderBottom: "1px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e" }}>🍬 Doces da Carol</div>
          <div style={{ fontSize: 9, color: "#d97706" }}>Encomendas & Delivery</div>
        </div>
        <div onClick={() => setScreen("cart")} style={{
          position: "relative", cursor: "pointer",
          transform: cartBounce ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <span style={{ fontSize: 22 }}>🛒</span>
          {cartCount > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4,
              width: 16, height: 16, borderRadius: "50%",
              background: "#ec4899", color: "#fff",
              fontSize: 9, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cartCount}</div>
          )}
        </div>
      </div>

      {screen === "catalog" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
            {(["Todos","Doces","Salgados","Bebidas"] as string[]).map((c, i) => (
              <div key={c} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600,
                background: i === 0 ? "#ec4899" : "#fff",
                color: i === 0 ? "#fff" : "#92400e",
                border: "1px solid " + (i === 0 ? "#ec4899" : "#fde68a"),
                whiteSpace: "nowrap", flexShrink: 0,
              }}>{c}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {products.map((p, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #fde68a" }}>
                <div style={{ height: 72, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{p.emoji}</div>
                <div style={{ padding: "6px 8px 8px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1917" }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "#d97706", fontWeight: 600 }}>{p.price}</div>
                  <button onClick={() => setScreen("product")} style={{
                    width: "100%", marginTop: 6,
                    background: "#fef3c7", color: "#92400e",
                    border: "1px solid #fde68a", borderRadius: 8,
                    padding: "4px", fontSize: 10, fontWeight: 700, cursor: "pointer",
                  }}>Ver detalhes</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "product" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 140, background: "#1c1917", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>🟫</div>
          <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1c1917" }}>Brownie</div>
                <div style={{ fontSize: 11, color: "#78716c" }}>Chocolate belga · crocante por fora</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#92400e" }}>R$ 7,00</div>
            </div>
            <button onClick={() => addToCart("Brownie")} style={{
              background: "#ec4899", color: "#fff", border: "none",
              borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 800, cursor: "pointer", marginTop: "auto",
            }}>Adicionar ao carrinho</button>
          </div>
        </div>
      )}

      {screen === "cart" && (
        <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1c1917" }}>Meu carrinho</div>
          {(([["🍫","Brigadeiro","R$ 3,50","×2"],["🍗","Coxinha","R$ 5,00","×1"],["🟫","Brownie","R$ 7,00","×1"]] as [string,string,string,string][]).map(([e,n,p,q], i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, border: "1px solid #fde68a" }}>
              <span style={{ fontSize: 20 }}>{e}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1917" }}>{n}</div>
                <div style={{ fontSize: 10, color: "#d97706" }}>{p}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e" }}>{q}</div>
            </div>
          )))}
          <div style={{ background: "#fff", borderRadius: 10, padding: "10px", border: "1px solid #fde68a", marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "#78716c" }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#92400e" }}>R$ 19,00</span>
            </div>
            <button onClick={() => setScreen("payment")} style={{
              width: "100%", marginTop: 8, background: "#ec4899",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "10px", fontSize: 12, fontWeight: 800, cursor: "pointer",
            }}>Ir para pagamento →</button>
          </div>
        </div>
      )}

      {screen === "payment" && (
        <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1c1917" }}>Forma de pagamento</div>
          {([
            { icon: "💳", label: "Cartão de crédito", sub: "Visa, Master, Elo",     highlight: false },
            { icon: "📱", label: "Pix",               sub: "Aprovação imediata",    highlight: true  },
            { icon: "💵", label: "Dinheiro",          sub: "Troco se necessário",   highlight: false },
          ]).map((m, i) => (
            <div key={i} style={{
              background: m.highlight ? "#fdf2f8" : "#fff",
              border: "1.5px solid " + (m.highlight ? "#ec4899" : "#fde68a"),
              borderRadius: 12, padding: "10px 12px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1c1917" }}>{m.label}</div>
                <div style={{ fontSize: 10, color: "#78716c" }}>{m.sub}</div>
              </div>
              {m.highlight && <div style={{ fontSize: 9, background: "#ec4899", color: "#fff", padding: "2px 7px", borderRadius: 20, fontWeight: 700 }}>Popular</div>}
            </div>
          ))}
          <button style={{
            marginTop: "auto", background: "#ec4899",
            color: "#fff", border: "none", borderRadius: 12,
            padding: "11px", fontSize: 13, fontWeight: 800, cursor: "pointer",
          }}>Confirmar pedido 🎉</button>
        </div>
      )}

      <Toast visible={toast.visible} message={toast.message} color="#ec4899" />

      <div style={{ height: 50, background: "#fff", borderTop: "1px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0 }}>
        {(([["🍬","Cardápio"],["❤️","Favoritos"],["📦","Pedidos"],["👤","Perfil"]] as [string,string][]).map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ fontSize: 8, color: "#94a3b8" }}>{label}</span>
          </div>
        )))}
      </div>
    </div>
  );
}
