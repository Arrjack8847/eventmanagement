import { events, registrations } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Users, QrCode } from "lucide-react";

export default function OrganizerEvents() {
  const orgEvents = events.filter((e) => e.createdBy === "u2");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Events</h1>
          <p className="text-muted-foreground text-sm">All events you've created</p>
        </div>
        <Link to="/organizer/events/new"><Button className="gap-1.5">+ Create Event</Button></Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgEvents.map((e) => {
              const regCount = registrations.filter((r) => r.eventId === e.id).length;
              return (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell className="text-sm">{e.date}</TableCell>
                  <TableCell><StatusBadge status={e.type} /></TableCell>
                  <TableCell><StatusBadge status={e.status} /></TableCell>
                  <TableCell>{regCount}/{e.capacity}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link to={`/organizer/events/${e.id}/edit`}><Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button></Link>
                      <Link to={`/organizer/events/${e.id}/registrations`}><Button variant="ghost" size="icon" className="h-8 w-8"><Users className="h-3.5 w-3.5" /></Button></Link>
                      <Link to={`/organizer/events/${e.id}/checkin`}><Button variant="ghost" size="icon" className="h-8 w-8"><QrCode className="h-3.5 w-3.5" /></Button></Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
