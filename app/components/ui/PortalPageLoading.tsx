import { Skeleton } from "@/app/components/ui/Skeleton";

/**
 * Skeleton genérico de página do portal — header + faixa de KPIs + bloco de
 * conteúdo. Usado pelos loading.tsx das rotas de `/portal/*` que não têm um
 * skeleton específico. Evita layout shift e a percepção de tela "travada".
 */
export function PortalPageLoading({ kpis = 4, rows = 5 }: { kpis?: number; rows?: number }) {
  return (
    <div style={{ padding: "24px 24px", maxWidth: 1060, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton width={180} height={26} />
          <Skeleton width={240} height={14} />
        </div>
        <Skeleton width={130} height={38} rounded />
      </div>

      {/* KPIs */}
      {kpis > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(160px, 1fr))`, gap: 14, marginBottom: 28 }}>
          {Array.from({ length: kpis }).map((_, k) => (
            <div key={k} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              <Skeleton width={38} height={38} rounded />
              <Skeleton width="50%" height={22} />
              <Skeleton width="70%" height={12} />
            </div>
          ))}
        </div>
      )}

      {/* Content block */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        {Array.from({ length: rows }).map((_, k) => (
          <div key={k} style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 6 }}>
              <Skeleton width="70%" height={14} />
              <Skeleton width="40%" height={11} />
            </div>
            <Skeleton width={70} height={22} rounded />
            <Skeleton width={60} height={12} />
          </div>
        ))}
      </div>
    </div>
  );
}
