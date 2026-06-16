"use client";

import { useState } from "react";

type Props = { onLogin: (role: "visitor" | "admin") => void };

export default function LoginScreen({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "fropty2025") {
      onLogin("visitor");
    } else if (password === "admin123") {
      onLogin("admin");
    } else {
      setError("Senha incorreta. Tente novamente.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot-grid background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(91,87,232,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        {/* Gradient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 400,
            background:
              "radial-gradient(ellipse at center, rgba(91,87,232,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#5B57E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              F
            </div>
            <span
              style={{
                color: "var(--text)",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.3px",
              }}
            >
              Fropty
            </span>
          </div>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Sistema de Gestão
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 32,
            width: "100%",
            maxWidth: 400,
            position: "relative",
            animation: shaking ? "shake 0.5s ease" : undefined,
          }}
        >
          <h1
            style={{
              color: "var(--text)",
              fontWeight: 700,
              fontSize: 20,
              margin: "0 0 6px",
              textAlign: "center",
            }}
          >
            Acesso à Demo
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 14,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Digite a senha para explorar o sistema
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                style={{
                  width: "100%",
                  background: "var(--input-bg)",
                  border: `1px solid ${error ? "#ef4444" : "var(--border)"}`,
                  borderRadius: 10,
                  padding: "12px 44px 12px 14px",
                  color: "var(--text)",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <i
                  className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`}
                  style={{ fontSize: 18 }}
                />
              </button>
            </div>

            {error && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: 13,
                  margin: "-6px 0 0",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#5B57E8",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "13px 0",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.88")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              Entrar
            </button>
          </form>
        </div>

        {/* Hint */}
        <p
          style={{
            color: "var(--text-faint)",
            fontSize: 12,
            marginTop: 20,
            textAlign: "center",
            position: "relative",
          }}
        >
          Senha de visitante: fropty2025
        </p>
      </div>
    </>
  );
}
