"use client";

import { useEffect, useRef, useState } from "react";
import { DASHBOARD_ACTIVITIES, CHART_DAYS, CHART_VALUES } from "./data";

type Props = {
  storeOpen: boolean;
  onToggleStore: (v: boolean) => void;
  addToast: (type: "success" | "error" | "warning" | "info", message: string) => void;
};

const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
`;

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%)",
  backgroundSize: "800px 100%",
  animation: "shimmer 1.4s infinite linear",
  borderRadius: 10,
};

function AnimatedCounter({ target, prefix = "", suffix = "", decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target]);

  const formatted = decimals > 0
    ? value.toFixed(decimals).replace(".", ",")
    : Math.round(value).toLocaleString("pt-BR");

  return <>{prefix}{formatted}{suffix}</>;
}

export default function Dashboard({ storeOpen, onToggleStore, addToast }: Props) {
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setActivityLoading(false), 200);
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
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "rgba(91,87,232,0.4)");
      gradient.addColorStop(1, "rgba(91,87,232,0)");

      chartRef.current = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: CHART_DAYS,
          datasets: [{
            data: CHART_VALUES,
            borderColor: "#5B57E8",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#5B57E8",
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
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
              ticks: { color: "rgba(255,255,255,0.5)", font: { size: 12 }, callback: (v: number) => `R$${v}` },
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
    { label: "Vendas hoje", value: 1284, prefix: "R$ ", decimals: 0, icon: "ti-currency-real", color: "#10B981", delta: "+12% vs ontem" },
    { label: "Pedidos ativos", value: 23, prefix: "", decimals: 0, icon: "ti-clock", color: "#5B57E8", delta: "+3 vs ontem" },
    { label: "Clientes", value: 152, prefix: "", decimals: 0, icon: "ti-users", color: "#EF9F27", delta: "+5 vs ontem" },
    { label: "Ticket médio", value: 55.83, prefix: "R$ ", decimals: 2, icon: "ti-receipt", color: "#8B5CF6", delta: "+2% vs ontem" },
  ];

  const cardStyle: React.CSSProperties = {
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: 14,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div style={{ padding: 24 }}>
        {/* Banner */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderRadius: 12,
          marginBottom: 24,
          background: storeOpen ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
          border: `1px solid ${storeOpen ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
        }}>
          <span style={{ color: "var(--text)", fontWeight: 500, fontSize: 14 }}>
            {storeOpen ? "🟢 Loja aberta — aceitando pedidos" : "🔴 Loja fechada — pausada para novos pedidos"}
          </span>
          <button
            onClick={() => {
              const next = !storeOpen;
              onToggleStore(next);
              addToast(next ? "success" : "warning", next ? "Loja aberta com sucesso!" : "Loja fechada.");
            }}
            style={{
              background: storeOpen ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)",
              border: "none",
              borderRadius: 8,
              padding: "6px 14px",
              color: storeOpen ? "#10B981" : "#EF4444",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            {storeOpen ? "Fechar loja" : "Abrir loja"}
          </button>
        </div>

        {/* Metric cards */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ ...shimmerStyle, height: 110, borderRadius: 14 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
            {metrics.map((m) => (
              <div key={m.label} style={cardStyle}>
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
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>
                  <AnimatedCounter target={m.value} prefix={m.prefix} decimals={m.decimals} />
                </div>
                <div style={{ fontSize: 12, color: "#10B981", fontWeight: 500 }}>{m.delta}</div>
              </div>
            ))}
          </div>
        )}

        {/* Chart + Activity side by side on wide, stacked on narrow */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {/* Chart */}
          {loading ? (
            <div style={{ ...shimmerStyle, height: 260, borderRadius: 14 }} />
          ) : (
            <div style={cardStyle}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 4 }}>
                Faturamento — últimos 7 dias
              </div>
              <div style={{ height: 200, position: "relative" }}>
                <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
              </div>
            </div>
          )}

          {/* Activity */}
          {activityLoading ? (
            <div style={cardStyle}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 8 }}>Atividade recente</div>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ ...shimmerStyle, width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ ...shimmerStyle, height: 13, marginBottom: 6, borderRadius: 6 }} />
                    <div style={{ ...shimmerStyle, height: 11, width: "40%", borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={cardStyle}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 4 }}>Atividade recente</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {DASHBOARD_ACTIVITIES.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: a.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 14, color: "#fff",
                      flexShrink: 0,
                    }}>
                      {a.avatar}
                    </div>
                    <div style={{ flex: 1, fontSize: 13, color: "var(--text)" }}>{a.action}</div>
                    <div style={{ fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap" }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
