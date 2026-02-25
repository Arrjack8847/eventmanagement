import { useParams } from "react-router-dom";
import { registrations, events } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";

export default function EventRegistrations() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const regs = registrations.filter((r) => r.eventId === id);

  const filterRegs = (tab: string) => {
    if (tab === "all") return regs;
    if (tab === "pending") return regs.filter((r) => r.paymentStatus === "pending");
    if (tab === "paid") return regs.filter((r) => r.paymentStatus === "confirmed");
    if (tab === "checked-in") return regs.filter((r) => r.checkedIn);
    return regs;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Registrations</h1>
        <p className="text-muted-foreground text-sm">{event?.title || "Event"} · {regs.length} registrations</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({regs.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({regs.filter((r) => r.paymentStatus === "pending").length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({regs.filter((r) => r.paymentStatus === "confirmed").length})</TabsTrigger>
          <TabsTrigger value="checked-in">Checked In ({regs.filter((r) => r.checkedIn).length})</TabsTrigger>
        </TabsList>

        {["all", "pending", "paid", "checked-in"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="rounded-xl border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterRegs(tab).map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.userName}</TableCell>
                      <TableCell className="font-mono text-xs">{r.ticketId}</TableCell>
                      <TableCell><StatusBadge status={r.paymentStatus} /></TableCell>
                      <TableCell>{r.checkedIn ? <StatusBadge status="checked-in" /> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
                      <TableCell className="text-right">
                        {r.paymentStatus === "pending" && (
                          <Button size="sm" variant="outline" className="gap-1 text-xs"><CreditCard className="h-3 w-3" /> Mark as Paid</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filterRegs(tab).length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No registrations found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
