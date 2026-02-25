import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "pending" | "confirmed" | "na" | "member" | "draft" | "published" | "checked-in" | "free" | "paid";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { label: "Confirmed", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  na: { label: "Free", className: "bg-sky-100 text-sky-800 border-sky-200" },
  member: { label: "Member", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  draft: { label: "Draft", className: "bg-slate-100 text-slate-600 border-slate-200" },
  published: { label: "Published", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  "checked-in": { label: "Checked In", className: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  free: { label: "Free", className: "bg-sky-100 text-sky-800 border-sky-200" },
  paid: { label: "Paid", className: "bg-amber-100 text-amber-800 border-amber-200" },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status] || { label: status, className: "" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border", config.className)}>
      {config.label}
    </Badge>
  );
}
