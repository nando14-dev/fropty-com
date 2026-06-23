import crypto from "crypto";

// Bloqueio local mínimo (independe de rede) para senhas/óbvias triviais.
const COMMON_PASSWORDS = new Set([
  "12345678", "123456789", "1234567890", "senha123", "password", "password1",
  "qwerty123", "12345678910", "fropty123", "admin123", "abc12345", "11111111",
  "123123123", "senhasenha", "mudar123", "trocar123",
]);

/**
 * Verifica se a senha é conhecida/vazada usando a API pública Pwned Passwords
 * (HaveIBeenPwned) por k-anonimato — só os 5 primeiros chars do hash SHA-1 são
 * enviados; a senha nunca sai daqui. Gratuita e sem chave.
 *
 * Fail-open: se a API estiver indisponível, não bloqueia o usuário (evita
 * travar o cadastro por instabilidade externa). O bloqueio local cobre o pior.
 */
export async function isPwnedPassword(password: string): Promise<boolean> {
  if (COMMON_PASSWORDS.has(password.toLowerCase())) return true;
  try {
    const sha1   = crypto.createHash("sha1").update(password).digest("hex").toUpperCase();
    const prefix = sha1.slice(0, 5);
    const suffix = sha1.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "Add-Padding": "true" },
      cache: "no-store",
    });
    if (!res.ok) return false;
    const text = await res.text();
    return text.split("\n").some((line) => line.split(":")[0]?.trim().toUpperCase() === suffix);
  } catch {
    return false;
  }
}
