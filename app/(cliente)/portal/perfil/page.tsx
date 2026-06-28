import type { Metadata } from "next";
import { getProfile } from "@/app/lib/auth/session";
import { createClient } from "@/app/lib/supabase/server";
import ProfileForm from "@/app/components/cliente/ProfileForm";
import PasswordChangeForm from "@/app/components/cliente/PasswordChangeForm";

export const metadata: Metadata = { title: "Meu Perfil — Fropty" };

export default async function PerfilPage() {
  const profile  = await getProfile();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const name  = profile?.name || user?.email?.split("@")[0] || "Cliente";
  const email = user?.email ?? "";

  return (
    <div style={{ padding: "36px 32px", maxWidth: 860, margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>
          Meu Perfil
        </h1>
        <p style={{ margin: "5px 0 0", fontSize: "13px", color: "var(--text-faint)" }}>
          Gerencie seus dados pessoais e a segurança da conta.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <ProfileForm name={name} email={email} />
        <PasswordChangeForm />
      </div>
    </div>
  );
}
