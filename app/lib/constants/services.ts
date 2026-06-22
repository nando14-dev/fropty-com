// Catálogo de serviços/módulos do ecossistema Fropty que um cliente pode contratar.
// A Fropty (Intelligent Software Ecosystem) vende estes módulos; a FroptyApps é
// o catálogo de micro-SaaS, apps mobile e dashboards de onde os clientes escolhem.
// O `id` é o que fica gravado em profiles.services (text[]).

export interface FroptyService {
  id: string;
  label: string;
  icon: string;   // Tabler icon
  color: string;
}

export const SERVICES: FroptyService[] = [
  { id: "froptyai",       label: "Fropty AI",       icon: "ti-sparkles",         color: "#a855f7" },
  { id: "froptyapps",     label: "Fropty Apps",     icon: "ti-apps",             color: "#185FA5" },
  { id: "froptyinvest",   label: "Fropty Invest",   icon: "ti-chart-candle",     color: "#3b82f6" },
  { id: "froptycash",     label: "Fropty Cash",     icon: "ti-wallet",           color: "#22c55e" },
  { id: "froptyads",      label: "Fropty Ads",      icon: "ti-speakerphone",     color: "#EF9F27" },
  { id: "froptyboost",    label: "Fropty Boost",    icon: "ti-rocket",           color: "#f97316" },
  { id: "froptycrm",      label: "Fropty CRM",      icon: "ti-users-group",      color: "#ef4444" },
  { id: "froptysentinel", label: "Fropty Sentinel", icon: "ti-shield-lock",      color: "#0ea5e9" },
];

export const SERVICE_IDS = SERVICES.map((s) => s.id);

const SERVICE_MAP = new Map(SERVICES.map((s) => [s.id, s]));

export function getService(id: string): FroptyService | undefined {
  return SERVICE_MAP.get(id);
}

/** Filtra/normaliza uma lista de ids, mantendo apenas os válidos. */
export function sanitizeServiceIds(ids: string[]): string[] {
  return ids.filter((id) => SERVICE_MAP.has(id));
}
