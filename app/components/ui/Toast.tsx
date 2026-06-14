"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const icons: Record<ToastType, string> = {
  success: "ti-circle-check",
  error: "ti-circle-x",
  info: "ti-info-circle",
  warning: "ti-alert-triangle",
};

const colors: Record<ToastType, string> = {
  success: "#22c55e",
  error: "#ef4444",
  info: "var(--primary)",
  warning: "#EF9F27",
};

export function Toast({ message, type = "info", duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 18px",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        maxWidth: "360px",
        transform: visible ? "translateY(0)" : "translateY(16px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      <i
        className={`ti ${icons[type]}`}
        style={{ fontSize: "20px", color: colors[type], flexShrink: 0 }}
      />
      <p style={{ margin: 0, fontSize: "14px", color: "var(--text)", lineHeight: 1.4 }}>{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-faint)",
          padding: "2px",
          flexShrink: 0,
        }}
      >
        <i className="ti ti-x" style={{ fontSize: "16px" }} />
      </button>
    </div>
  );
}

// Minimal hook to manage toast state
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const show = (message: string, type: ToastType = "info") => setToast({ message, type });
  const dismiss = () => setToast(null);

  const ToastComponent = toast ? (
    <Toast message={toast.message} type={toast.type} onClose={dismiss} />
  ) : null;

  return { show, ToastComponent };
}
