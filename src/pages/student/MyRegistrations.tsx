import { registrations } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export default function MyRegistrations() {
  const myRegs = registrations.filter((r) => r.userId === "u1");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Registrations</h1>
        <p className="text-muted-foreground text-sm">All your event registrations</p>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myRegs.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.eventTitle}</TableCell>
                <TableCell className="font-mono text-xs">{r.ticketId}</TableCell>
                <TableCell><StatusBadge status={r.paymentStatus} /></TableCell>
                <TableCell>{r.checkedIn ? <StatusBadge status="checked-in" /> : <span className="text-xs text-muted-foreground">Not checked in</span>}</TableCell>
                <TableCell className="text-right">
                  <Link to="/app/my-tickets">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs"><ExternalLink className="h-3.5 w-3.5" /> View Ticket</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
