export const BASE_PRICE = 499;

export type AddonType = "once" | "month";

export interface Addon {
  id: string;
  icon: string;
  label: string;
  desc: string;
  tech: string;
  price: number;
  type: AddonType;
  unit?: string;
  disclaimer?: string;
}

export interface MaintenancePlan {
  id: string;
  label: string;
  tokens: number;
  price: number;
  highlight: boolean;
  savingsStrike?: string;
  savingsText?: string;
}

export const ADDONS: Addon[] = [
  { id: "google_auth",  icon: "lock",           label: "Login com Google",               desc: "Seus usuários entram com um clique, sem criar senha.",                                                     tech: "Google OAuth 2.0",                                            price: 79,  type: "once" },
  { id: "admin",        icon: "tool",            label: "Painel administrativo",          desc: "Gerencie conteúdo, usuários e dados sem precisar de programador.",                                          tech: "Dashboard com controle de acesso",                            price: 149, type: "once" },
  { id: "push",         icon: "bell",            label: "Notificações push",              desc: "Avise seus clientes sobre novidades, pedidos ou lembretes direto no celular.",                              tech: "FCM / PWA Notifications",                                     price: 99,  type: "once" },
  { id: "multiuser",    icon: "users",           label: "Membro administrativo adicional",desc: "Cada novo membro do seu time que precisar de acesso ao painel administrativo é cobrado à parte.",          tech: "Role-based access control",                                   price: 129, type: "once", unit: "membro" },
  { id: "reports",      icon: "chart-bar",       label: "Relatórios e exportação",        desc: "Baixe seus dados em PDF ou Excel quando quiser.",                                                           tech: "Exportação estruturada de dados",                             price: 89,  type: "once" },
  { id: "whatsapp",     icon: "brand-whatsapp",  label: "Integração com WhatsApp",        desc: "Notificações e confirmações automáticas via WhatsApp para seus clientes.",                                  tech: "WhatsApp Business API",                                       price: 119, type: "once" },
  { id: "backup",       icon: "database",        label: "Backup automático diário",       desc: "Seus dados salvos todo dia, com restauração em caso de qualquer problema.",                                 tech: "Backup incremental · retenção 30 dias",                       price: 29,  type: "month", disclaimer: "* Sem esse recurso, a Fropty Apps não se responsabiliza por perda de dados." },
  { id: "domain",       icon: "world",           label: "Domínio próprio",                desc: "Seu app em seudominio.com.br em vez de seuapp.fropty.com. Setup incluso.",                                 tech: "DNS · SSL · configuração completa",                           price: 49,  type: "once",  disclaimer: "* Sujeito à disponibilidade do domínio. O registro (~R$40/ano) é por conta do cliente." },
  { id: "onboarding",   icon: "school",          label: "Treinamento e onboarding",       desc: "Videochamada de até 1h ensinando você e sua equipe a usar o app.",                                         tech: "Sessão gravada + material de apoio",                          price: 79,  type: "once" },
  { id: "sourcecode",   icon: "package",         label: "Licença do código-fonte",        desc: "Receba todos os arquivos do seu app. A partir daí, o código é seu.",                                       tech: "Repositório GitHub transferido · você gerencia hospedagem",   price: 299, type: "once",  disclaimer: "* Inclui o código, mas não a infraestrutura (banco de dados, hospedagem, domínio)." },
];

export const MAINTENANCE: MaintenancePlan[] = [
  { id: "m_basic", label: "Básico",    tokens: 4, price: 49.90, highlight: false, savingsStrike: "R$ 1.200,00 avulso", savingsText: "Você economiza R$ 1.150,10" },
  { id: "m_pro",   label: "Pro",       tokens: 8, price: 89.90, highlight: true,  savingsStrike: "R$ 2.400,00 avulso", savingsText: "Você economiza R$ 2.310,10" },
  { id: "m_none",  label: "Sem plano", tokens: 0, price: 0,     highlight: false },
];
