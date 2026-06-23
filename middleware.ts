import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PAGE = "/area-cliente";
const PROTECTED_PREFIXES = ["/admin", "/area-cliente/", "/portal/"];
// Área autenticada (cliente + admin) — quando o hub está configurado, vive só lá.
const HUB_PREFIXES = ["/area-cliente", "/portal", "/admin"];

// Middleware totalmente stateless: sem Supabase client, sem chamadas de rede.
// Verifica apenas a presença do cookie de sessão do Supabase (sb-*-auth-token).
// A validação real do JWT acontece nos layouts server-side (Node.js runtime).
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const path = request.nextUrl.pathname;

  // Subdomínio demo.fropty.com — serve /demo na raiz
  if (host === "demo.fropty.com" && path === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/demo";
    return NextResponse.rewrite(url);
  }

  // ── Roteamento do hub (ativa só quando NEXT_PUBLIC_HUB_HOST está definido) ──
  // Ex.: NEXT_PUBLIC_HUB_HOST = "hub.fropty.com"
  const HUB_HOST = process.env.NEXT_PUBLIC_HUB_HOST;
  const onHub = !!HUB_HOST && host === HUB_HOST;

  const hasSession = request.cookies.getAll().some(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  );

  if (HUB_HOST) {
    if (onHub) {
      // Raiz do hub = login (ou portal, se já logado)
      if (path === "/") {
        const url = request.nextUrl.clone();
        url.pathname = hasSession ? "/portal/dashboard" : LOGIN_PAGE;
        return hasSession ? NextResponse.redirect(url) : NextResponse.rewrite(url);
      }
    } else {
      // Domínio público: a área autenticada foi movida para o hub
      if (HUB_PREFIXES.some((p) => path === p || path.startsWith(p + "/"))) {
        return NextResponse.redirect(
          new URL(`https://${HUB_HOST}${path}${request.nextUrl.search}`),
          308,
        );
      }
    }
  }

  const isLoginPage = path === LOGIN_PAGE;
  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p));

  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PAGE;
    return NextResponse.redirect(url);
  }

  // Usuário já autenticado tenta acessar a página de login → manda para o portal
  if (isLoginPage && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/area-cliente",
    "/area-cliente/:path*",
    "/admin/:path*",
    "/portal/:path*",
  ],
};
