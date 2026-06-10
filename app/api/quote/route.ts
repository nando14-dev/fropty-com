import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const contactEmail = process.env.CONTACT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!contactEmail || !resendApiKey) {
    return NextResponse.json(
      { error: "Configuração de email ausente no servidor." },
      { status: 500 }
    );
  }

  let body: {
    nome?: string;
    email?: string;
    ideia?: string;
    temLogo?: string;
    cores?: string;
    prioridades?: string[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { nome, email, ideia, temLogo, cores, prioridades } = body;

  if (!nome || !email || !ideia) {
    return NextResponse.json(
      { error: "Nome, email e ideia são obrigatórios." },
      { status: 400 }
    );
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: "Fropty Apps <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `Novo pedido de orçamento — ${nome}`,
    text: [
      `Nome: ${nome}`,
      `Email: ${email}`,
      `Ideia do app: ${ideia}`,
      `Tem logo: ${temLogo || "não informado"}`,
      `Cores/tema: ${cores || "não informado"}`,
      `Prioridades: ${
        prioridades && prioridades.length > 0
          ? prioridades.join(", ")
          : "não informado"
      }`,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "Falha ao enviar o email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
