"use client";

import { useEffect, useRef, useState } from "react";
import { FINANCE_MONTHS, FINANCE_VALUES } from "./data";

type Props = {
  addToast: (type: "success" | "error" | "warning" | "info", message: string) => void;
};

const shimmerKeyframes = `
@keyframes shimmer-fin {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
`;

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%)",
  backgroundSize: "800px 100%",
  animation: "shimmer-fin 1.4s infinite linear",
  borderRadius: 10,
};

const TRANSACTIONS = [
  { icon: "ti-arrow-up-right", iconColor: "#10B981", description: "Pedido #1048 — Camila Rocha", value: "+R$156,00", positive: true, status: "Recebido" },
  { icon: "ti-arrow-up-right", iconColor: "#10B981", description: "Pedido #1047 — Ana Paula", value: "+R$89,00", positive: true, status: "Recebido" },
  { icon: "ti-arrow-down-left", iconColor: "#EF4444", description: "Taxa Mercado Pago", value: "-R$4,50", positive: false, status: "Recebido" },
  { icon: "ti-arrow-up-right", iconColor: "#EF9F27", description: "Pedido #1046 — Pedro Gomes", value: "+R$42,00", positive: true, status: "Pendente" },
  { icon: "ti-arrow-up-right", iconColor: "#10B981", description: "Pedido #1045 — Natalia Campos", value: "+R$98,00", positive: true, status: "Recebido" },
  { icon: "ti-arrow-down-left", iconColor: "#EF4444", description: "Assinatura Fropty Pro", value: "-R$89,00", positive: false, status: "Recebido" },
  { icon: "ti-x", iconColor: "#EF4444", description: "Pedido #1044 cancelado — reembolso", value: "-R$38,00", positive: false, status: "Cancelado" },
  { icon: "ti-arrow-up-right", iconColor: "#10B981", description: "Pedido #1043 — Marcos Oliveira", value: "+R$63,00", positive: true, status: "Recebido" },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Recebido: { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
  Pendente: { bg: "rgba(239,159,39,0.15)", text: "#EF9F27" },
  Cancelado: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

export default function Financial({ addToast }: Props) {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;

    const createChart = () => {
      type ChartConstructor = new (ctx: CanvasRenderingContext2D, config: object) => { destroy: () => void };
      const ChartJS = (window as Window & { Chart?: ChartConstructor }).Chart;
      if (!canvasRef.current || !ChartJS) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      chartRef.current = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: FINANCE_MONTHS,
          datasets: [{
            data: FINANCE_VALUES,
            backgroundColor: "rgba(91,87,232,0.8)",
            borderRadius: 6,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.06)" },
              ticks: { color: "rgba(255,255,255,0.5)", font: { size: 12 } },
              border: { display: false },
            },
            y: {
              grid: { color: "rgba(255,255,255,0.06)" },
              ticks: { color: "rgba(255,255,255,0.5)", font: { size: 12 }, callback: (v: number) => `R$${v.toLocaleString("pt-BR")}` },
              border: { display: false },
            },
          },
        },
      });
    };

    if ((window as Window & { Chart?: unknown }).Chart) {
      createChart();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js";
      script.onload = createChart;
      document.head.appendChild(script);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [loading]);

  const metrics = [
    { label: "Receita do mês", value: "R$ 8.450", icon: "ti-trending-up", color: "#10B981" },
    { label: "A receber", value: "R$ 2.180", icon: "ti-clock", color: "#5B57E8" },
    { label: "Já recebido", value: "R$ 6.270", icon: "ti-check", color: "#8B5CF6" },
    { label: "Inadimplência", value: "R$ 0,00", icon: "ti-alert-circle", color: "#EF4444" },
  ];

  const cardStyle: React.CSSProperties = {
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: 14,
    padding: 20,
  };

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Metric cards */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ ...shimmerStyle, height: 110, borderRadius: 14 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `${m.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <i className={`ti ${m.icon}`} style={{ color: m.color, fontSize: 16 }} />
                  </div>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{m.label}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bar chart */}
        {loading ? (
          <div style={{ ...shimmerStyle, height: 260, borderRadius: 14 }} />
        ) : (
          <div style={cardStyle}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 12 }}>
              Comparativo — últimos 6 meses
            </div>
            <div style={{ height: 200, position: "relative" }}>
              <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
            </div>
          </div>
        )}

        {/* Transactions */}
        {loading ? (
          <div style={cardStyle}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 12 }}>Transações recentes</div>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <div style={{ ...shimmerStyle, width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ ...shimmerStyle, height: 13, marginBottom: 6, borderRadius: 6 }} />
                  <div style={{ ...shimmerStyle, height: 11, width: "30%", borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={cardStyle}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 12 }}>Transações recentes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TRANSACTIONS.map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                  borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `${t.iconColor}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <i className={`ti ${t.icon}`} style={{ color: t.iconColor, fontSize: 16 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.description}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.positive ? "#10B981" : "#EF4444", whiteSpace: "nowrap" }}>
                    {t.value}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                    background: STATUS_COLORS[t.status]?.bg,
                    color: STATUS_COLORS[t.status]?.text,
                    whiteSpace: "nowrap",
                  }}>
                    {t.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export button */}
        <button
          onClick={() => {
            if (exporting) return;
            setExporting(true);
            addToast("info", "Relatório gerado! Baixando...");
            setTimeout(() => setExporting(false), 2000);
          }}
          style={{
            width: "100%",
            padding: "14px 20px",
            background: exporting ? "var(--surface-2)" : "var(--primary, #5B57E8)",
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            cursor: exporting ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: exporting ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <i className={`ti ${exporting ? "ti-loader-2" : "ti-download"}`} style={{ fontSize: 18 }} />
          {exporting ? "Gerando relatório..." : "Exportar relatório"}
        </button>
      </div>
    </>
  );
}
