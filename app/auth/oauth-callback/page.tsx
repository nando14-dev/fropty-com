"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/app/lib/supabase/browser";
import { Suspense } from "react";

function OAuthCallbackInner() {
  const searchParams = useSearchParams();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/portal/dashboard";

    if (!code) {
      window.location.href = "/area-cliente?error=interno";
      return;
    }

    const supabase = createClient();
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        console.error("[oauth-callback] exchangeCodeForSession error:", error.message);
        window.location.href = "/area-cliente?error=interno";
      } else {
        window.location.href = next;
      }
    });
  }, []);

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f0f0f",
      color: "#9a9a9a",
      fontSize: 14,
      fontFamily: "inherit",
      gap: 10,
    }}>
      <svg
        width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
      Autenticando…
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <OAuthCallbackInner />
    </Suspense>
  );
}
