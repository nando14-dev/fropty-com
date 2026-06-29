"use client";

import { useTransition, useState } from "react";
import { requestPlanUpgrade } from "@/app/actions/profile";

interface Props {
  plan: string;
}

export function UpgradeButton({ plan }: Props) {
  const [pending, startTrans] = useTransition();
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleClick() {
    setMsg(null);
    startTrans(async () => {
      const result = await requestPlanUpgrade(plan);
      if (result.error) setMsg({ type: "error", text: result.error });
      else if (result.success) setMsg({ type: "success", text: result.success });
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button
        onClick={handleClick}
        disabled={pending}
        style={{
          width: "100%",
          padding: "11px 0",
          borderRadius: "var(--r-md)",
          background: "var(--primary)",
          color: "#fff",
          border: "none",
          fontSize: "14px",
          fontWeight: 600,
          cursor: pending ? "not-allowed" : "pointer",
          opacity: pending ? 0.7 : 1,
          transition: "opacity 0.15s, background 0.15s",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
        }}
      >
        {pending ? "Enviando…" : "Fazer upgrade"}
      </button>
      {msg && (
        <p style={{
          margin: 0,
          fontSize: "12px",
          color: msg.type === "success" ? "var(--c-success, #22c55e)" : "var(--c-danger, #ef4444)",
          textAlign: "center",
          lineHeight: 1.4,
        }}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
