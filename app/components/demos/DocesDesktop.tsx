"use client";

import { useState, useEffect } from "react";
import { Toast, type ToastState } from "./Toast";

export function DocesDesktop() {
  const [cartItems, setCartItems] = useState<{ name: string; price: string; emoji: string; qty: number }[]>([]);
  const [screen, setScreen] = useState<"catalog" | "checkout">("catalog");
  const [cartBounce, setCartBounce] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false });
  const [animStep, setAnimStep] = useState(0);

  const products = [
    { name: "Brigadeiro", price: "R$ 3,50", emoji: "🍫", bg: "#3d1a00" },
    { name: "Coxinha",    price: "R$ 5,00", emoji: "🍗", bg: "#92400e" },
    { name: "Brownie",    price: "R$ 7,00", emoji: "🟫", bg: "#1c1917" },
    { name: "Pastel",     price: "R$ 4,00", emoji: "🥟", bg: "#713f12" },
  ];

  const addToCart = (name: string, price: string, emoji: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name, price, emoji, qty: 1 }];
    });
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 400);
    setToast({ visible: true, message: `${name} adicionado!`, color: "#ec4899" });
    setTimeout(() => setToast({ visible: false }), 1500);
  };

  useEffect(() => {
    setCartItems([]); setScreen("catalog");
    const p = products;
    const sequence: [number, () => void][] = [
      [900,  () => addToCart(p[0].name, p[0].price, p[0].emoji)],
      [2400, () => addToCart(p[1].name, p[1].price, p[1].emoji)],
      [3900, () => addToCart(p[2].name, p[2].price, p[2].emoji)],
      [5400, () => setScreen("checkout")],
      [7200, () => setToast({ visible: true, message: "✓ Pedido confirmado! 🎉", color: "#ec4899" })],
      [9200, () => { setToast({ visible: false }); setScreen("catalog"); setCartItems([]); }],
    ];
    const timers = sequence.map(([d, fn]) => setTimeout(fn, d));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animStep]);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(s => s + 1), 11000);
    return () => clearTimeout(t);
  }, [animStep]);

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace("R$ ", "").replace(",", ".")) * item.qty;
  }, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif", overflow: "hidden", background: "#fff9f0", position: "relative" }}>
      <div style={{ background: "#fff", padding: "7px 14px", borderBottom: "1px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#92400e" }}>🍬 Doces da Carol</div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["Cardápio", "Favoritos", "Pedidos"] as string[]).map((item, i) => (
            <div key={item} style={{ fontSize: 10, color: i === 0 ? "#ec4899" : "#94a3b8", fontWeight: i === 0 ? 600 : 400, cursor: "pointer", padding: "2px 6px", borderRadius: 4, background: i === 0 ? "#fdf2f8" : "transparent" }}>{item}</div>
          ))}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          transform: cartBounce ? "scale(1.25)" : "scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <span style={{ fontSize: 18 }}>🛒</span>
          {cartItems.length > 0 && (
            <span style={{ fontSize: 10, background: "#ec4899", color: "#fff", padding: "1px 6px", borderRadius: 20, fontWeight: 700 }}>
              {cartItems.reduce((s, i) => s + i.qty, 0)}
            </span>
          )}
        </div>
      </div>

      {screen === "catalog" && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {products.map((p, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #fde68a" }}>
                  <div style={{ height: 60, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{p.emoji}</div>
                  <div style={{ padding: "6px 8px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#1c1917" }}>{p.name}</div>
                    <div style={{ fontSize: 9, color: "#d97706", fontWeight: 600 }}>{p.price}</div>
                    <button onClick={() => addToCart(p.name, p.price, p.emoji)} style={{
                      width: "100%", marginTop: 5, background: "#fef3c7",
                      color: "#92400e", border: "1px solid #fde68a",
                      borderRadius: 6, padding: "4px", fontSize: 9, fontWeight: 700, cursor: "pointer",
                    }}>+ Adicionar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 136, background: "#fff", borderLeft: "1px solid #fde68a", display: "flex", flexDirection: "column", padding: "10px 8px", flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 8 }}>Carrinho</div>
            {cartItems.length === 0 ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 9, color: "#94a3b8", textAlign: "center" }}>Vazio</div>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {cartItems.map((item, i) => (
                    <div key={i} style={{ paddingBottom: 6, marginBottom: 6, borderBottom: "1px solid #fef3c7" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 14 }}>{item.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 9, fontWeight: 600, color: "#1c1917", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                          <div style={{ fontSize: 8, color: "#d97706" }}>{item.price} ×{item.qty}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: 8, borderTop: "1px solid #fde68a" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: "#78716c" }}>Total</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#92400e" }}>R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <button onClick={() => setScreen("checkout")} style={{
                    width: "100%", background: "#ec4899", color: "#fff",
                    border: "none", borderRadius: 8, padding: "6px",
                    fontSize: 9, fontWeight: 800, cursor: "pointer",
                  }}>Finalizar →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {screen === "checkout" && (
        <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#1c1917" }}>Forma de pagamento</div>
          {([
            { icon: "💳", label: "Cartão de crédito", sub: "Visa, Master, Elo",  highlight: false },
            { icon: "📱", label: "Pix",               sub: "Aprovação imediata", highlight: true  },
            { icon: "💵", label: "Dinheiro",          sub: "Troco disponível",   highlight: false },
          ]).map((m, i) => (
            <div key={i} style={{
              background: m.highlight ? "#fdf2f8" : "#fff",
              border: "1.5px solid " + (m.highlight ? "#ec4899" : "#fde68a"),
              borderRadius: 10, padding: "9px 12px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1c1917" }}>{m.label}</div>
                <div style={{ fontSize: 9, color: "#78716c" }}>{m.sub}</div>
              </div>
              {m.highlight && <div style={{ fontSize: 8, background: "#ec4899", color: "#fff", padding: "2px 6px", borderRadius: 20, fontWeight: 700 }}>Popular</div>}
            </div>
          ))}
          <button style={{
            marginTop: "auto", background: "#ec4899",
            color: "#fff", border: "none", borderRadius: 10,
            padding: "11px", fontSize: 12, fontWeight: 800, cursor: "pointer",
          }}>Confirmar pedido 🎉</button>
        </div>
      )}

      <Toast visible={toast.visible} message={toast.message} color="#ec4899" />
    </div>
  );
}
