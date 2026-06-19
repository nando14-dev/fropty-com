import type { Metadata } from "next";
import { createClient } from "@/app/lib/supabase/server";
import { queryAuditLogs } from "@/app/lib/db/audit";
import { AuditClient } from "@/app/components/admin/AuditClient";

export const metadata: Metadata = { title: "Auditoria — Admin" };

const PAGE_SIZE = 30;

interface Props {
  searchParams: Promise<{ action?: string; admin?: string; from?: string; to?: string; q?: string; page?: string }>;
}

export default async function AdminAuditPage({ searchParams }: Props) {
  const sp   = await searchParams;
  const page = Math.max(0, parseInt(sp.page ?? "0", 10) || 0);

  const filters = {
    action:  sp.action ?? "",
    adminId: sp.admin ?? "",
    from:    sp.from ?? "",
    to:      sp.to ?? "",
    q:       sp.q ?? "",
  };

  const supabase = await createClient();

  const [{ rows, total }, adminsRes] = await Promise.all([
    queryAuditLogs(
      {
        action:   filters.action || undefined,
        adminId:  filters.adminId || undefined,
        from:     filters.from || undefined,
        to:       filters.to || undefined,
        q:        filters.q || undefined,
        page,
        pageSize: PAGE_SIZE,
      },
      { paginate: true },
    ),
    supabase.from("profiles").select("id, name").eq("role", "admin").order("name"),
  ]);

  const admins = (adminsRes.data ?? []).map((a) => ({ id: a.id, name: a.name ?? a.id.slice(0, 8) }));

  return (
    <AuditClient
      rows={rows}
      total={total}
      page={page}
      pageSize={PAGE_SIZE}
      admins={admins}
      filters={filters}
    />
  );
}
