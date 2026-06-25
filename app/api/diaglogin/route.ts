import { NextResponse } from "next/server";

// DIAGNÓSTICO TEMPORÁRIO — remover após investigar o login do hub.
const DIAG_TOKEN = "fropty-diag-9f3a";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("t") !== DIAG_TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const email = url.searchParams.get("email") ?? "";
  const password = url.searchParams.get("password") ?? "";

  const out: Record<string, unknown> = {};

  // 1) POST REAL (form urlencoded) para /api/login — exatamente como o browser.
  //    Isola se o problema é a leitura do formData no /api/login.
  const body = new URLSearchParams({ email, password }).toString();
  out.sentBody = { raw: body, emailLen: email.length, passwordLen: password.length };

  const r = await fetch(new URL("/api/login", request.url), {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    redirect: "manual",
  });

  const setCookies = r.headers.getSetCookie?.() ?? [];
  out.postLogin = {
    status: r.status,
    location: r.headers.get("location"),
    setCookieNames: setCookies.map((c) => c.split("=")[0]),
  };

  // 2) Se o login devolveu cookie de sessão, carrega /portal/dashboard com ele.
  if (setCookies.length) {
    const cookieHeader = setCookies.map((c) => c.split(";")[0]).join("; ");
    const dash = await fetch(new URL("/portal/dashboard", request.url), {
      headers: { cookie: cookieHeader },
      redirect: "manual",
    });
    out.dashboard = {
      status: dash.status,
      location: dash.headers.get("location"),
      landedOnDashboard: dash.status === 200,
    };
  }

  return NextResponse.json(out);
}
