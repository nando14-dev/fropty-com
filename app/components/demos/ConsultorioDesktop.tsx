"use client";

import { useState, useEffect } from "react";
import { Toast, type ToastState } from "./Toast";

export function ConsultorioDesktop() {
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

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
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
