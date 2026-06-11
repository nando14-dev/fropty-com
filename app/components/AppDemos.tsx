"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";

type ToastState = { visible: boolean; message?: string; color?: string };

// ─── PHONE FRAME ──────────────────────────────────────────────────────────
function PhoneFrame({
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

// ─── DESKTOP FRAME ────────────────────────────────────────────────────────
function DesktopFrame({
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
        {/* Browser chrome */}
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
        {/* Screen */}
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

// ─── TOAST ────────────────────────────────────────────────────────────────
function Toast({ message, visible, color = "#22c55e" }: { message?: string; visible: boolean; color?: string }) {
  return (
    <div style={{
      position: "absolute", bottom: 20, left: 12, right: 12,
      background: "#1e293b", color: "#fff",
      borderRadius: 12, padding: "10px 14px",
      display: "flex", alignItems: "center", gap: 8,
      fontSize: 12, fontWeight: 500,
      transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
      opacity: visible ? 1 : 0,
      pointerEvents: "none",
      zIndex: 100,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {message}
    </div>
  );
}

// ─── APP 1 MOBILE: CONSULTÓRIO DRA. ANA ───────────────────────────────────
function ConsultorioApp() {
  const [screen, setScreen] = useState<"agenda" | "picker" | "confirm">("agenda");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const hours = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const appointments = [
    { name: "Maria Santos", time: "09:00", type: "Retorno", color: "#e0f2fe" },
    { name: "João Lima", time: "10:30", type: "Consulta geral", color: "#f0fdf4" },
    { name: "Ana Paula", time: "14:00", type: "Exame rotina", color: "#fef3c7" },
  ];

  const showToast = (msg: string, color?: string) => {
    setToast({ visible: true, message: msg, color });
    setTimeout(() => setToast({ visible: false, message: "" }), 2200);
  };

  useEffect(() => {
    if (screen === "agenda") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (screen === "picker") {
      timers.push(setTimeout(() => setSelectedDay("Ter"), 800));
      timers.push(setTimeout(() => setSelectedHour("10:00"), 1600));
      timers.push(setTimeout(() => setScreen("confirm"), 2400));
    }
    if (screen === "confirm") {
      timers.push(setTimeout(() => {
        showToast("✓ Consulta agendada!", "#22c55e");
        setTimeout(() => setScreen("agenda"), 2600);
      }, 1200));
    }
    return () => timers.forEach(t => clearTimeout(t));
  }, [screen]);

  useEffect(() => {
    const t = setTimeout(() => setScreen("picker"), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (screen === "agenda") {
      const t = setTimeout(() => setScreen("picker"), 3500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#fff", padding: "10px 14px 8px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Dra. Ana Oliveira</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Clínica Geral · CRM 12.345</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👩‍⚕️</div>
        </div>
      </div>

      {screen === "agenda" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Hoje, 10 Jun</div>
            <button onClick={() => setScreen("picker")} style={{
              background: "#0ea5e9", color: "#fff", border: "none",
              borderRadius: 8, padding: "5px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer",
            }}>+ Agendar</button>
          </div>
          {appointments.map((a, i) => (
            <div key={i} style={{
              background: a.color, borderRadius: 10, padding: "8px 10px",
              marginBottom: 8, display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#0369a1", minWidth: 36 }}>{a.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>{a.name}</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>{a.type}</div>
              </div>
              <div style={{ fontSize: 9, background: "#fff", padding: "2px 6px", borderRadius: 20, color: "#0369a1", fontWeight: 600 }}>Confirmado</div>
            </div>
          ))}
        </div>
      )}

      {screen === "picker" && (
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Nova consulta</div>
          <div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 6 }}>Escolha o dia</div>
            <div style={{ display: "flex", gap: 5 }}>
              {days.map(d => (
                <div key={d} onClick={() => setSelectedDay(d)} style={{
                  flex: 1, padding: "6px 2px", borderRadius: 8, textAlign: "center",
                  background: selectedDay === d ? "#0ea5e9" : "#f1f5f9",
                  color: selectedDay === d ? "#fff" : "#475569",
                  fontSize: 10, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s",
                }}>{d}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 6 }}>Horário disponível</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
              {hours.map(h => (
                <div key={h} onClick={() => setSelectedHour(h)} style={{
                  padding: "6px 4px", borderRadius: 8, textAlign: "center",
                  background: selectedHour === h ? "#0ea5e9" : "#f8fafc",
                  color: selectedHour === h ? "#fff" : "#475569",
                  border: "1px solid " + (selectedHour === h ? "#0ea5e9" : "#e2e8f0"),
                  fontSize: 11, fontWeight: 500, cursor: "pointer",
                  transition: "all 0.2s",
                }}>{h}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "confirm" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, gap: 10 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📅</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", textAlign: "center" }}>Confirmar agendamento</div>
          <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "10px 16px", textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>Terça-feira, 10:00</div>
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Consulta geral</div>
          </div>
          <button style={{
            width: "100%", background: "#22c55e", color: "#fff",
            border: "none", borderRadius: 10, padding: "10px",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>Confirmar consulta</button>
        </div>
      )}

      <Toast visible={toast.visible} message={toast.message} color={toast.color} />

      <div style={{
        height: 50, background: "#fff", borderTop: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0,
      }}>
        {(([["🗓️","Agenda"],["👥","Pacientes"],["📊","Relatórios"],["⚙️","Config"]] as [string,string][]).map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ fontSize: 8, color: "#94a3b8" }}>{label}</span>
          </div>
        )))}
      </div>
    </div>
  );
}

// ─── APP 2 MOBILE: OFICINA DO ZÉ ─────────────────────────────────────────
function OficinaApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screen, setScreen] = useState<"list" | "search" | "detail">("list");
  const [searchText, setSearchText] = useState("");
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });
  const [animStep, setAnimStep] = useState(0);

  const orders = [
    { id: "OS-047", car: "Fiat Uno · BRA-2A49",    service: "Troca de óleo",      status: "Em andamento", statusColor: "#f59e0b", bg: "#fffbeb" },
    { id: "OS-046", car: "Honda Civic · SP-5J12",  service: "Freios dianteiros",  status: "Ag. peça",     statusColor: "#ef4444", bg: "#fef2f2" },
    { id: "OS-045", car: "VW Gol · MG-3F78",       service: "Revisão geral",      status: "Concluído",    statusColor: "#22c55e", bg: "#f0fdf4" },
  ];
  const parts = ["Filtro de óleo", "Pastilha de freio", "Correia dentada", "Vela de ignição", "Amortecedor"];
  const filtered = parts.filter(p => p.toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    const sequence: [number, () => void][] = [
      [800,  () => setSidebarOpen(true)],
      [2000, () => { setSidebarOpen(false); setScreen("search"); }],
      [2600, () => setSearchText("f")],
      [3000, () => setSearchText("fr")],
      [3300, () => setSearchText("fre")],
      [3600, () => setSearchText("frei")],
      [4000, () => setSearchText("freid")],
      [4200, () => setSearchText("frei")],
      [4500, () => setScreen("detail")],
      [5500, () => {
        setToast({ visible: true, message: "✓ Peça adicionada à OS-046", color: "#f59e0b" });
        setTimeout(() => setToast({ visible: false }), 2000);
      }],
      [8000, () => { setScreen("list"); setSearchText(""); setSidebarOpen(false); }],
    ];
    const timers: ReturnType<typeof setTimeout>[] = sequence.map(([delay, fn]) => setTimeout(fn, delay));
    return () => timers.forEach(t => clearTimeout(t));
  }, [animStep]);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(s => s + 1), 9000);
    return () => clearTimeout(t);
  }, [animStep]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: "#f8fafc", fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
        zIndex: 20, opacity: sidebarOpen ? 1 : 0,
        transition: "opacity 0.3s", pointerEvents: sidebarOpen ? "auto" : "none",
      }} onClick={() => setSidebarOpen(false)} />
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 180, background: "#1e293b", zIndex: 30,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        padding: "16px 0",
      }}>
        <div style={{ padding: "0 16px 12px", borderBottom: "1px solid #334155" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>🔧 Oficina do Zé</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Sistema de OS</div>
        </div>
        {(([["📋","Ordens de Serviço"],["🔩","Estoque de Peças"],["👥","Clientes"],["📊","Relatórios"],["⚙️","Configurações"]] as [string,string][]).map(([icon, label]) => (
          <div key={label} style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onClick={() => { if (label === "Estoque de Peças") { setSidebarOpen(false); setScreen("search"); } }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <span style={{ fontSize: 11, color: label === "Ordens de Serviço" ? "#fff" : "#94a3b8", fontWeight: label === "Ordens de Serviço" ? 600 : 400 }}>{label}</span>
          </div>
        )))}
      </div>

      <div style={{ background: "#1e293b", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div onClick={() => setSidebarOpen(true)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 3, padding: 4 }}>
          {([0,1,2] as number[]).map(i => <div key={i} style={{ width: 16, height: 2, background: "#fff", borderRadius: 1 }} />)}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", flex: 1 }}>
          {screen === "list"   && "Ordens de Serviço"}
          {screen === "search" && "Estoque de Peças"}
          {screen === "detail" && "Resultado da busca"}
        </div>
        {screen === "list" && <div style={{ fontSize: 10, background: "#f59e0b", color: "#fff", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>3 abertas</div>}
      </div>

      {screen === "list" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
          {orders.map((o, i) => (
            <div key={i} style={{ background: o.bg, borderRadius: 10, padding: "8px 10px", marginBottom: 8, borderLeft: `3px solid ${o.statusColor}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b" }}>{o.id}</span>
                <span style={{ fontSize: 9, background: o.statusColor + "20", color: o.statusColor, padding: "2px 7px", borderRadius: 20, fontWeight: 700 }}>{o.status}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", marginTop: 3 }}>{o.car}</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>{o.service}</div>
            </div>
          ))}
        </div>
      )}

      {screen === "search" && (
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, color: "#64748b" }}>Buscar peça para OS-046</div>
          <div style={{ background: "#fff", borderRadius: 10, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6, border: "1.5px solid #0ea5e9" }}>
            <span style={{ fontSize: 12 }}>🔍</span>
            <span style={{ fontSize: 12, color: searchText ? "#0f172a" : "#94a3b8" }}>
              {searchText || "Buscar peça..."}
              <span style={{ borderRight: "2px solid #0ea5e9" }}>&nbsp;</span>
            </span>
          </div>
          <div style={{ flex: 1 }}>
            {(searchText ? filtered : parts).map((p, i) => (
              <div key={i} style={{ padding: "8px 10px", background: "#fff", borderRadius: 8, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#0f172a" }}>{p}</span>
                <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>Em estoque</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "detail" && (
        <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "12px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Pastilha de freio</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Ref: PF-2847 · Bosch</div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#16a34a" }}>12</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>Em estoque</div>
              </div>
              <div style={{ flex: 1, background: "#fffbeb", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b" }}>R$48</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>Custo unit.</div>
              </div>
            </div>
            <button style={{
              width: "100%", marginTop: 10, background: "#f59e0b",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "9px", fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>Adicionar à OS-046</button>
          </div>
        </div>
      )}

      <Toast visible={toast.visible} message={toast.message} color="#f59e0b" />

      <div style={{ height: 50, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0 }}>
        {(([["📋","OS"],["🔩","Peças"],["👥","Clientes"],["📊","Stats"]] as [string,string][]).map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ fontSize: 8, color: "#94a3b8" }}>{label}</span>
          </div>
        )))}
      </div>
    </div>
  );
}

// ─── APP 3 MOBILE: DOCES DA CAROL ────────────────────────────────────────
function DocesApp() {
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

// ─── APP 1 DESKTOP: CONSULTÓRIO ───────────────────────────────────────────
function ConsultorioDesktop() {
  const [panel, setPanel] = useState<"idle" | "picker" | "confirm">("idle");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ visible: false });
  const [animStep, setAnimStep] = useState(0);

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const hours = ["09:00", "10:00", "11:00", "14:00", "15:00"];
  const appointments = [
    { name: "Maria Santos", time: "09:00", type: "Retorno", color: "#e0f2fe" },
    { name: "João Lima", time: "10:30", type: "Consulta", color: "#f0fdf4" },
    { name: "Ana Paula", time: "14:00", type: "Exame", color: "#fef3c7" },
  ];

  useEffect(() => {
    setPanel("idle"); setSelectedDay(null); setSelectedHour(null);
    const sequence: [number, () => void][] = [
      [1500, () => setPanel("picker")],
      [2400, () => setSelectedDay("Ter")],
      [3200, () => setSelectedHour("10:00")],
      [4100, () => setPanel("confirm")],
      [5300, () => setToast({ visible: true, message: "✓ Consulta agendada!", color: "#22c55e" })],
      [7400, () => { setToast({ visible: false }); setPanel("idle"); setSelectedDay(null); setSelectedHour(null); }],
    ];
    const timers = sequence.map(([d, fn]) => setTimeout(fn, d));
    return () => timers.forEach(clearTimeout);
  }, [animStep]);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(s => s + 1), 10000);
    return () => clearTimeout(t);
  }, [animStep]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif", position: "relative" }}>
      {/* Top nav */}
      <div style={{ background: "#fff", padding: "7px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Dra. Ana Oliveira · CRM 12.345</div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["Agenda", "Pacientes", "Relatórios", "Config"] as string[]).map(item => (
            <div key={item} style={{
              fontSize: 10, cursor: "pointer", padding: "3px 8px", borderRadius: 6,
              color: item === "Agenda" ? "#0ea5e9" : "#94a3b8",
              fontWeight: item === "Agenda" ? 600 : 400,
              background: item === "Agenda" ? "#e0f2fe" : "transparent",
            }}>{item}</div>
          ))}
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: list */}
        <div style={{ width: 190, borderRight: "1px solid #f1f5f9", padding: "10px 8px", overflowY: "auto", background: "#fff", flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Hoje, 10 Jun</div>
          {appointments.map((a, i) => (
            <div key={i} style={{ background: a.color, borderRadius: 8, padding: "6px 8px", marginBottom: 6 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#0369a1" }}>{a.time}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#0f172a" }}>{a.name}</div>
              <div style={{ fontSize: 9, color: "#64748b" }}>{a.type}</div>
            </div>
          ))}
          <button style={{
            width: "100%", background: "#0ea5e9", color: "#fff",
            border: "none", borderRadius: 8, padding: "6px",
            fontSize: 10, fontWeight: 600, cursor: "pointer", marginTop: 4,
          }}>+ Nova consulta</button>
        </div>

        {/* Right: panel */}
        <div style={{ flex: 1, padding: "14px", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
          {panel === "idle" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ fontSize: 36 }}>📅</div>
              <div style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>Selecione um horário para agendar</div>
            </div>
          )}

          {panel === "picker" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Nova consulta</div>
              <div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 6 }}>Dia da semana</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {days.map(d => (
                    <div key={d} style={{
                      flex: 1, padding: "6px 2px", borderRadius: 8, textAlign: "center",
                      background: selectedDay === d ? "#0ea5e9" : "#fff",
                      color: selectedDay === d ? "#fff" : "#475569",
                      border: "1px solid " + (selectedDay === d ? "#0ea5e9" : "#e2e8f0"),
                      fontSize: 10, fontWeight: 600, cursor: "pointer",
                      transition: "all 0.2s",
                    }}>{d}</div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 6 }}>Horário</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
                  {hours.map(h => (
                    <div key={h} style={{
                      padding: "6px 4px", borderRadius: 8, textAlign: "center",
                      background: selectedHour === h ? "#0ea5e9" : "#fff",
                      color: selectedHour === h ? "#fff" : "#475569",
                      border: "1px solid " + (selectedHour === h ? "#0ea5e9" : "#e2e8f0"),
                      fontSize: 10, fontWeight: 500, cursor: "pointer",
                      transition: "all 0.2s",
                    }}>{h}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {panel === "confirm" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Confirmar agendamento</div>
              <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>Terça-feira, 10:00</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Consulta geral · 50 min</div>
              </div>
              <button style={{
                background: "#22c55e", color: "#fff", border: "none",
                borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>Confirmar consulta</button>
            </div>
          )}
        </div>
      </div>
      <Toast visible={toast.visible} message={toast.message} color={toast.color} />
    </div>
  );
}

// ─── APP 2 DESKTOP: OFICINA ───────────────────────────────────────────────
function OficinaDesktop() {
  const [activeNav, setActiveNav] = useState<"os" | "pecas" | "clientes">("os");
  const [screen, setScreen] = useState<"list" | "search" | "detail">("list");
  const [searchText, setSearchText] = useState("");
  const [toast, setToast] = useState<ToastState>({ visible: false });
  const [animStep, setAnimStep] = useState(0);

  const orders = [
    { id: "OS-047", car: "Fiat Uno · BRA-2A49",   service: "Troca de óleo",     status: "Em andamento", statusColor: "#f59e0b", bg: "#fffbeb" },
    { id: "OS-046", car: "Honda Civic · SP-5J12", service: "Freios dianteiros", status: "Ag. peça",     statusColor: "#ef4444", bg: "#fef2f2" },
    { id: "OS-045", car: "VW Gol · MG-3F78",      service: "Revisão geral",     status: "Concluído",   statusColor: "#22c55e", bg: "#f0fdf4" },
  ];
  const parts = ["Filtro de óleo", "Pastilha de freio", "Correia dentada", "Vela de ignição"];
  const filtered = parts.filter(p => p.toLowerCase().includes(searchText.toLowerCase()));

  const navItems: { id: "os" | "pecas" | "clientes"; icon: string; label: string }[] = [
    { id: "os",       icon: "📋", label: "OS" },
    { id: "pecas",    icon: "🔩", label: "Peças" },
    { id: "clientes", icon: "👥", label: "Clientes" },
  ];

  useEffect(() => {
    setActiveNav("os"); setScreen("list"); setSearchText("");
    const sequence: [number, () => void][] = [
      [1200, () => { setActiveNav("pecas"); setScreen("search"); }],
      [1900, () => setSearchText("f")],
      [2300, () => setSearchText("fr")],
      [2700, () => setSearchText("frei")],
      [3200, () => setScreen("detail")],
      [4600, () => setToast({ visible: true, message: "✓ Peça adicionada à OS-046", color: "#f59e0b" })],
      [6600, () => setToast({ visible: false })],
      [7500, () => { setActiveNav("os"); setScreen("list"); setSearchText(""); }],
    ];
    const timers = sequence.map(([d, fn]) => setTimeout(fn, d));
    return () => timers.forEach(clearTimeout);
  }, [animStep]);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(s => s + 1), 10000);
    return () => clearTimeout(t);
  }, [animStep]);

  return (
    <div style={{ flex: 1, display: "flex", fontFamily: "system-ui, sans-serif", overflow: "hidden", position: "relative" }}>
      {/* Left sidebar */}
      <div style={{ width: 96, background: "#1e293b", display: "flex", flexDirection: "column", padding: "10px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 10px 10px", borderBottom: "1px solid #334155", marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>🔧 Oficina</div>
          <div style={{ fontSize: 9, color: "#64748b" }}>do Zé</div>
        </div>
        {navItems.map(item => (
          <div key={item.id} style={{
            padding: "9px 10px",
            display: "flex", alignItems: "center", gap: 7,
            cursor: "pointer",
            background: activeNav === item.id ? "rgba(255,255,255,0.08)" : "transparent",
            borderLeft: activeNav === item.id ? "2px solid #f59e0b" : "2px solid transparent",
            transition: "all 0.2s",
          }} onClick={() => setActiveNav(item.id)}>
            <span style={{ fontSize: 13 }}>{item.icon}</span>
            <span style={{ fontSize: 10, color: activeNav === item.id ? "#fff" : "#64748b", fontWeight: activeNav === item.id ? 600 : 400 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "#1e293b", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
            {activeNav === "os" ? "Ordens de Serviço" : activeNav === "pecas" ? "Estoque de Peças" : "Clientes"}
          </div>
          {activeNav === "os" && <div style={{ fontSize: 9, background: "#f59e0b", color: "#fff", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>3 abertas</div>}
        </div>

        <div style={{ flex: 1, padding: "10px", overflowY: "auto", background: "#f8fafc" }}>
          {screen === "list" && orders.map((o, i) => (
            <div key={i} style={{ background: o.bg, borderRadius: 8, padding: "8px 10px", marginBottom: 8, borderLeft: `3px solid ${o.statusColor}` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b" }}>{o.id}</span>
                <span style={{ fontSize: 9, background: o.statusColor + "20", color: o.statusColor, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>{o.status}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", marginTop: 3 }}>{o.car}</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>{o.service}</div>
            </div>
          ))}

          {(screen === "search" || screen === "detail") && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: "#fff", borderRadius: 8, padding: "7px 10px", display: "flex", alignItems: "center", gap: 6, border: "1.5px solid #0ea5e9" }}>
                <span style={{ fontSize: 12 }}>🔍</span>
                <span style={{ fontSize: 12, color: searchText ? "#0f172a" : "#94a3b8" }}>
                  {searchText || "Buscar peça..."}
                  {screen === "search" && <span style={{ borderRight: "2px solid #0ea5e9" }}>&nbsp;</span>}
                </span>
              </div>
              {screen === "search" && (searchText ? filtered : parts).map((p, i) => (
                <div key={i} style={{ padding: "8px 10px", background: "#fff", borderRadius: 8, display: "flex", justifyContent: "space-between", border: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 11, color: "#0f172a" }}>{p}</span>
                  <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>Em estoque</span>
                </div>
              ))}
              {screen === "detail" && (
                <div style={{ background: "#fff", borderRadius: 10, padding: "12px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Pastilha de freio</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Ref: PF-2847 · Bosch</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#16a34a" }}>12</div>
                      <div style={{ fontSize: 9, color: "#64748b" }}>Em estoque</div>
                    </div>
                    <div style={{ flex: 1, background: "#fffbeb", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#f59e0b" }}>R$48</div>
                      <div style={{ fontSize: 9, color: "#64748b" }}>Custo unit.</div>
                    </div>
                  </div>
                  <button style={{
                    width: "100%", marginTop: 10, background: "#f59e0b",
                    color: "#fff", border: "none", borderRadius: 8,
                    padding: "9px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                  }}>Adicionar à OS-046</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Toast visible={toast.visible} message={toast.message} color="#f59e0b" />
    </div>
  );
}

// ─── APP 3 DESKTOP: DOCES DA CAROL ───────────────────────────────────────
function DocesDesktop() {
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
      {/* Header */}
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

      {/* Body */}
      {screen === "catalog" && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Products grid */}
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

          {/* Cart panel */}
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────
export default function AppDemos() {
  const [view, setView] = useState<"mobile" | "desktop">("mobile");

  return (
    <section
      id="exemplos"
      style={{
        padding: "56px 16px",
        scrollMarginTop: "80px",
        background: "#111c30",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#185FA5", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
          Exemplos reais
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
          Veja o que é possível
        </h2>
        <p style={{ fontSize: 15, color: "#64748b", maxWidth: 460, margin: "0 auto" }}>
          Apps reais para negócios reais — do seu jeito, com a sua cara.
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
        <div style={{ position: "relative", display: "inline-flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setView("mobile")}
            style={{
              padding: "8px 28px",
              background: "none", border: "none", cursor: "pointer",
              color: view === "mobile" ? "#fff" : "#64748b",
              fontWeight: view === "mobile" ? 500 : 400,
              fontSize: 14,
              transition: "color 0.2s",
            }}
          >
            Mobile
          </button>
          <button
            onClick={() => setView("desktop")}
            style={{
              padding: "8px 28px",
              background: "none", border: "none", cursor: "pointer",
              color: view === "desktop" ? "#fff" : "#64748b",
              fontWeight: view === "desktop" ? 500 : 400,
              fontSize: 14,
              transition: "color 0.2s",
            }}
          >
            Computador
          </button>
          {/* sliding underline */}
          <div style={{
            position: "absolute",
            bottom: -1,
            left: view === "mobile" ? 0 : "50%",
            width: "50%",
            height: 2,
            background: "#185FA5",
            borderRadius: 1,
            transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }} />
        </div>
      </div>

      {/* Demos */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
        {view === "mobile" ? (
          <>
            <PhoneFrame label="Consultório Dra. Ana" tagline="Agendamento de consultas online" accentColor="#0ea5e9">
              <ConsultorioApp />
            </PhoneFrame>
            <PhoneFrame label="Oficina do Zé" tagline="Gestão de ordens de serviço" accentColor="#f59e0b">
              <OficinaApp />
            </PhoneFrame>
            <PhoneFrame label="Doces da Carol" tagline="Catálogo, pedidos e pagamento" accentColor="#ec4899">
              <DocesApp />
            </PhoneFrame>
          </>
        ) : (
          <>
            <DesktopFrame label="Consultório Dra. Ana" tagline="Painel web de agendamentos" accentColor="#0ea5e9">
              <ConsultorioDesktop />
            </DesktopFrame>
            <DesktopFrame label="Oficina do Zé" tagline="Dashboard de ordens de serviço" accentColor="#f59e0b">
              <OficinaDesktop />
            </DesktopFrame>
            <DesktopFrame label="Doces da Carol" tagline="Loja online com catálogo e checkout" accentColor="#ec4899">
              <DocesDesktop />
            </DesktopFrame>
          </>
        )}
      </div>
    </section>
  );
}
