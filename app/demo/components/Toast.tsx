"use client";

import { useState, useEffect } from "react";
import type { Toast, ToastType } from "./data";

type Props = { toasts: Toast[]; onDismiss: (id: string) => void };

const TYPE_COLORS: Record<ToastType, string> = {
  success: "#22c55e",
  error: "#ef4444",
  warning: "#EF9F27",
  info: "#5B57E8",
};

const TYPE_ICONS: Record<ToastType, string> = {
  success: "ti-circle-check",
  error: "ti-circle-x",
  warning: "ti-alert-triangle",
  info: "ti-info-circle",
};

const TYPE_LABELS: Record<ToastType, string> = {
  success: "Sucesso",
  error: "Erro",
  warning: "Aviso",
  info: "Info",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const color = TYPE_COLORS[toast.type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        minWidth: 280,
        maxWidth: 360,
        padding: "12px 16px",
        background: "var(--card-bg, var(--surface))",
        border: "1px solid var(--card-border, var(--border))",
        borderLeft: `4px solid ${color}`,
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        animation: visible
          ? "toastSlideIn 0.3s ease forwards"
          : "toastFadeOut 0.3s ease forwards",
        pointerEvents: "all",
      }}
    >
      <i
        className={`ti ${TYPE_ICONS[toast.type]}`}
        style={{ color, fontSize: 20, marginTop: 1, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: "var(--text)",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: "1.3",
          }}
        >
          {TYPE_LABELS[toast.type]}
        </div>
        <div
          style={{
            color: "var(--text-muted)",
            fontSize: 13,
            marginTop: 2,
            lineHeight: "1.4",
          }}
        >
          {toast.message}
        </div>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-faint)",
          padding: 0,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <i className="ti ti-x" style={{ fontSize: 16 }} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }: Props) {
  const visible = toasts.slice(-3);

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toastFadeOut {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        {visible.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </div>
    </>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(type: ToastType, message: string) {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
  }

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return { toasts, addToast, dismissToast };
}
