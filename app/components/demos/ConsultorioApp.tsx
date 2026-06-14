"use client";

import { useState, useEffect } from "react";
import { Toast, type ToastState } from "./Toast";

export function ConsultorioApp() {
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
