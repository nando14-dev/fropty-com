import type { ReactNode } from "react";

/**
 * Cabeçalho de página padrão do Hub. Usa as classes canônicas do design
 * system (hub-page-title / hub-page-sub) para padronizar o tamanho do título,
 * que hoje varia entre módulos. Em vez de reimplementar o header em cada
 * página com style inline, use:
 *
 *   <PageHeader title="Kanban" subtitle="…" badge={<Tag/>} action={<Link/>} />
 */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Renderizado ao lado do título (ex.: selo "Somente leitura"). */
  badge?: ReactNode;
  /** Renderizado à direita (botão/link de ação principal). */
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, badge, action }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 24,
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h1 className="hub-page-title">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="hub-page-sub">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
