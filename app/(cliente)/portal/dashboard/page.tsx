import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/lib/auth/session";
import { createClient } from "@/app/lib/supabase/server";
import {
  CalendarDays, LayoutGrid, Coins, MessageCircle,
  MessageSquarePlus, CreditCard, ArrowRight, Zap,
} from "lucide-react";
import { OnboardingBanner } from "@/app/components/cliente/OnboardingBanner";
import { OnboardingChecklist } from "@/app/components/cliente/OnboardingChecklist";
import { WHATSAPP_URL } from "@/app/lib/config";
import { getService } from "@/app/lib/constants/services";
import { PlanRenewalBanner } from "@/app/components/cliente/PlanRenewalBanner";
import { getOnboardingSteps } from "@/app/lib/onboarding";

export const metadata: Metadata = { title: "Meu Painel" };

export default async function PortalDashboardPage() {
  const profile = await getProfile();
  if (profile?.role === "admin") redirect("/admin/overview");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { count: openTickets } = user
    ? await supabase
        .from("tickets")
        .select("id", { count: "exact", head: true })
        .eq("client_id", user.id)
        .in("status", ["aberto", "em_andamento"])
    : { count: 0 };

  const firstName    = (profile?.name || user?.email?.split("@")[0] || "Cliente").split(" ")[0];
  const tokenBalance = profile?.token_balance ?? 0;
  const services     = profile?.services ?? [];
  const contractStart = profile?.contract_start ?? null;
  const hasServices  = services.length > 0;

  const showOnboarding     = profile && !profile.onboarding_completed;
  const onboardingSteps    = showOnboarding ? await getOnboardingSteps(profile, supabase) : null;
  const hasIncompleteSteps = onboardingSteps ? onboardingSteps.some((s) => !s.completed) : false;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div style={{ padding: "36px 32px", maxWidth: 960, margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p style={{ color: "var(--text-faint)", fontSize: "13px", margin: "0 0 3px", fontWeight: 500 }}>
            {greeting},
          </p>
          <h1 style={{ fontSize: "1.65rem", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-0.03em" }}>
            {firstName} 👋
          </h1>
          {contractStart && (
            <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 5 }}>
              <CalendarDays size={12} />
              Cliente desde {new Date(contractStart).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </p>
          )}
        </div>

        <Link
          href="/portal/suporte/novo"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "var(--primary)", color: "#fff",
            borderRadius: "var(--r-md)", padding: "9px 18px",
            fontSize: "13px", fontWeight: 700, textDecoration: "none",
            boxShadow: "var(--shadow-brand)", flexShrink: 0,
            transition: "opacity 0.15s",
          }}
        >
          <MessageSquarePlus size={14} /> Abrir chamado
        </Link>
      </div>

      {/* ── KPI cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: 14, marginBottom: 32,
      }}>
        {[
          { icon: <LayoutGrid size={18} />, label: "Serviços ativos",    value: services.length,  accent: "var(--primary)",      bg: "rgba(91,87,232,0.10)" },
          { icon: <Coins size={18} />,      label: "Tokens disponíveis", value: tokenBalance,     accent: "var(--brand-accent)", bg: "rgba(239,159,39,0.10)" },
          { icon: <MessageCircle size={18} />, label: "Chamados abertos", value: openTickets ?? 0, accent: "var(--c-success)",   bg: "var(--c-success-bg)" },
        ].map(({ icon, label, value, accent, bg }) => (
          <div key={label} className="hub-stat-card">
            <div style={{
              width: 38, height: 38, borderRadius: "var(--r-md)", background: bg,
              display: "flex", alignItems: "center", justifyContent: "center", color: accent,
            }}>
              {icon}
            </div>
            <p style={{ margin: "8px 0 0", fontSize: "26px", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {value}
            </p>
            <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-faint)", fontWeight: 500 }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Onboarding checklist ── */}
      {showOnboarding && onboardingSteps && hasIncompleteSteps && (
        <div style={{ marginBottom: 28 }}>
          <OnboardingChecklist steps={onboardingSteps} />
        </div>
      )}

      {/* ── Renovação de plano ── */}
      {profile?.plan && profile.plan !== "sem_plano" && profile.plan_renewal && (
        <div style={{ marginBottom: 28 }}>
          <PlanRenewalBanner
            plan={profile.plan as "basico" | "pro"}
            renewalDate={profile.plan_renewal}
          />
        </div>
      )}

      {/* ── Sem serviços: onboarding banner ── */}
      {!hasServices && (
        <div style={{ marginBottom: 28 }}>
          <OnboardingBanner name={firstName} tokenBalance={tokenBalance} />
        </div>
      )}

      {/* ── Serviços contratados ── */}
      {hasServices && (
        <div style={{ marginBottom: 32 }}>
          <div className="hub-section-header">
            <div>
              <p className="hub-section-title">Meus serviços</p>
              <p className="hub-section-sub">{services.length} ativo{services.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 12,
          }}>
            {services.map((id) => {
              const svc     = getService(id);
              const label   = svc?.label ?? id;
              const SvcIcon = svc?.Icon;
              const color   = svc?.color ?? "var(--primary)";
              return (
                <div key={id} className="hub-card-sm" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "var(--r-sm)", flexShrink: 0,
                    background: `${color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {SvcIcon && <SvcIcon size={17} style={{ color }} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {label}
                    </p>
                    <span className="hub-badge hub-badge-success" style={{ fontSize: "10px", padding: "1px 8px", marginTop: 3, display: "inline-flex" }}>
                      Ativo
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Ações rápidas ── */}
      <div>
        <div className="hub-section-header">
          <p className="hub-section-title" style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Zap size={15} style={{ color: "var(--brand-accent)" }} /> Ações rápidas
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {[
            {
              href:     "/portal/suporte/novo",
              icon:     <MessageSquarePlus size={18} />,
              accent:   "var(--primary)",
              bg:       "rgba(91,87,232,0.08)",
              label:    "Abrir chamado",
              desc:     "Solicitar suporte ou nova demanda",
            },
            {
              href:     "/portal/financeiro",
              icon:     <CreditCard size={18} />,
              accent:   "var(--brand-accent)",
              bg:       "rgba(239,159,39,0.08)",
              label:    "Financeiro",
              desc:     "Ver faturas e pagamentos",
            },
            {
              href:     WHATSAPP_URL,
              icon:     <MessageCircle size={18} />,
              accent:   "var(--c-success)",
              bg:       "var(--c-success-bg)",
              label:    "WhatsApp",
              desc:     "Falar com um consultor",
              external: true,
            },
          ].map(({ href, icon, accent, bg, label, desc, external }) => (
            <Link
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="hub-card-sm hub-card-hover"
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                textDecoration: "none",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "var(--r-md)", background: bg, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", color: accent,
              }}>
                {icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "var(--text)" }}>{label}</p>
                <p style={{ margin: "2px 0 0", fontSize: "11.5px", color: "var(--text-faint)", lineHeight: 1.4 }}>{desc}</p>
              </div>
              <ArrowRight size={14} style={{ color: "var(--text-faint)", flexShrink: 0, marginTop: 10 }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
