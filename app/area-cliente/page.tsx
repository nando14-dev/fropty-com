"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/app/lib/supabase/browser";
import { Sun, Moon, ArrowLeft, AlertCircle, CheckCircle, Loader2, Lock, Mail } from "lucide-react";

type Mode = "login" | "reset";

const LOGIN_ERRORS: Record<string, string> = {
  credenciais:      "E-mail ou senha incorretos.",
  "acesso-revogado": "Seu acesso foi revogado. Entre em contato com o suporte.",
  interno:          "Erro interno. Tente novamente mais tarde.",
};

export default function AreaClientePage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const [mode, setMode]         = useState<Mode>("login");
  const [error, setError]       = useState<string | null>(() => {
    const code = searchParams.get("error");
    return code ? LOGIN_ERRORS[code] ?? null : null;
  });
  const [success, setSuccess]   = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [theme, setTheme]       = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("fropty-theme") ?? "dark") as "dark" | "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("fropty-theme", next);
  }

  function changeMode(m: Mode) { setMode(m); setError(null); setSuccess(null); }

  function handleResetSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const email = (formData.get("email") as string)?.trim().toLowerCase();
      if (!email) { setError("Informe seu e-mail."); return; }
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/area-cliente/nova-senha`,
      });
      setSuccess("Se esse e-mail estiver cadastrado, você receberá o link em breve.");
    });
  }

  const isLoading = mode === "login" ? loginSubmitting : isPending;

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ── Glow decorativo ── */}
      <div style={{
        position: "fixed", top: "10%", left: "50%",
        transform: "translateX(-50%)",
        width: 600, height: 300,
        background: "radial-gradient(ellipse, rgba(91,87,232,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Theme toggle ── */}
      <button
        onClick={toggleTheme}
        title={theme === "dark" ? "Modo claro" : "Modo escuro"}
        style={{
          position: "fixed", top: 16, right: 16,
          width: 36, height: 36, borderRadius: "var(--r-md)",
          border: "1px solid var(--border)", background: "var(--surface)",
          color: "var(--text-faint)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, transition: "color 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* ── Logo ── */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 32, textDecoration: "none", position: "relative", zIndex: 1 }}>
        <div style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-brand)" }}>
          <Image src="/hub-logo.png" alt="FroptyHub" width={22} height={22} style={{ borderRadius: 4 }} />
        </div>
        <span style={{ fontSize: 19, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
          Fropty<span style={{ color: "var(--primary)" }}>Hub</span>
        </span>
      </Link>

      {/* ── Card ── */}
      <div style={{
        width: "100%", maxWidth: 400,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "32px 28px",
        boxShadow: "var(--shadow-xl)",
        position: "relative", zIndex: 1,
      }}>

        {/* Header do card */}
        {mode === "login" ? (
          <div style={{ marginBottom: 26 }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", margin: "0 0 5px", letterSpacing: "-0.03em" }}>
              Entrar na conta
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-faint)", margin: 0 }}>
              Acesse seus serviços, chamados e tokens Fropty.
            </p>
          </div>
        ) : (
          <div style={{ marginBottom: 26 }}>
            <button
              onClick={() => changeMode("login")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0, display: "flex", alignItems: "center", gap: 5, fontSize: 12, marginBottom: 16, fontFamily: "inherit", fontWeight: 600 }}
            >
              <ArrowLeft size={13} /> Voltar ao login
            </button>
            <h1 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text)", margin: "0 0 5px", letterSpacing: "-0.03em" }}>
              Recuperar senha
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-faint)", margin: 0 }}>
              Enviaremos um link para criar uma nova senha.
            </p>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

        <form
          {...(mode === "login"
            ? { method: "post" as const, action: "/api/login", onSubmit: () => setLoginSubmitting(true) }
            : { onSubmit: handleResetSubmit })}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* E-mail */}
          <div>
            <label style={labelStyle}>E-mail</label>
            <div style={{ position: "relative" }}>
              <Mail size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none" }} />
              <input
                name="email" type="email" required
                autoComplete="email"
                placeholder="seu@email.com"
                style={{ ...inputStyle, paddingLeft: 38 }}
              />
            </div>
          </div>

          {/* Senha */}
          {mode === "login" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Senha</label>
                <button
                  type="button"
                  onClick={() => changeMode("reset")}
                  style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
                >
                  Esqueci a senha
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none" }} />
                <input
                  name="password" type="password" required
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  style={{ ...inputStyle, paddingLeft: 38 }}
                />
              </div>
            </div>
          )}

          {/* Erro */}
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", borderRadius: "var(--r-md)", background: "var(--c-danger-bg)", border: "1px solid rgba(220,38,38,0.22)", color: "var(--c-danger)", fontSize: 12.5 }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} /> {error}
            </div>
          )}

          {/* Sucesso */}
          {success && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", borderRadius: "var(--r-md)", background: "var(--c-success-bg)", border: "1px solid rgba(34,197,94,0.22)", color: "var(--c-success)", fontSize: 12.5 }}>
              <CheckCircle size={14} style={{ flexShrink: 0 }} /> {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: 4, padding: "12px 0", borderRadius: "var(--r-md)", border: "none",
              background: isLoading ? "var(--border)" : "var(--primary)",
              color: isLoading ? "var(--text-muted)" : "#fff",
              fontWeight: 700, fontSize: 14, cursor: isLoading ? "not-allowed" : "pointer",
              fontFamily: "inherit", transition: "background 0.15s, box-shadow 0.15s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: isLoading ? "none" : "var(--shadow-brand)",
            }}
          >
            {isLoading
              ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Aguarde…</>
              : mode === "login" ? "Entrar na conta" : "Enviar link de recuperação"
            }
          </button>
        </form>
      </div>

      {/* ── Footer ── */}
      <p style={{ marginTop: 24, fontSize: 11.5, color: "var(--text-faint)", textAlign: "center", position: "relative", zIndex: 1 }}>
        Ao continuar você concorda com os{" "}
        <Link href="/termos" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Termos de Uso</Link>
        {" "}e{" "}
        <Link href="/privacidade" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Privacidade</Link>.
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--text-faint); }
        input:focus { outline: none !important; border-color: var(--primary) !important; box-shadow: 0 0 0 3px rgba(91,87,232,0.14); }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  color: "var(--text-faint)", marginBottom: 7,
  textTransform: "uppercase", letterSpacing: "0.06em",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  borderRadius: "var(--r-md)",
  border: "1px solid var(--border)",
  background: "var(--surface-2)",
  color: "var(--text)", fontSize: 13.5,
  fontFamily: "inherit", boxSizing: "border-box",
  transition: "border-color 0.15s, box-shadow 0.15s",
};
