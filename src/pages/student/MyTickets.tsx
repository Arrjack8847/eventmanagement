import { registrations, events } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MyTickets() {
  const myRegs = registrations.filter((r) => r.userId === "u1");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const selected = myRegs.find((r) => r.ticketId === selectedTicket);
  const selectedEvent = selected ? events.find((e) => e.id === selected.eventId) : null;

  const getTicketStatus = (r: typeof myRegs[0]) => {
    if (r.checkedIn) return "used";
    if (r.paymentStatus === "pending") return "pending";
    return "valid";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Tickets</h1>
        <p className="text-muted-foreground text-sm">Your event tickets with QR codes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myRegs.map((r) => {
          const event = events.find((e) => e.id === r.eventId);
          const status = getTicketStatus(r);
          return (
            <Card key={r.id} className={cn("overflow-hidden", status === "used" && "opacity-60")}>
              <CardContent className="p-0">
                <div className="flex">
                  <div className={cn("w-2 shrink-0", status === "valid" ? "bg-emerald-500" : status === "pending" ? "bg-amber-500" : "bg-muted-foreground/30")} />
                  <div className="p-4 flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-primary font-medium">{event?.clubName}</p>
                      <StatusBadge status={status === "valid" ? "confirmed" : status === "pending" ? "pending" : "draft"} />
                    </div>
                    <h3 className="font-semibold text-sm">{r.eventTitle}</h3>
                    {event && (
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{format(new Date(event.date), "MMM d, yyyy")}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono text-muted-foreground">{r.ticketId}</span>
                      <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => setSelectedTicket(r.ticketId)}>
                        <Ticket className="h-3 w-3" /> Show Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">{selected?.eventTitle}</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            {selectedEvent && (
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{format(new Date(selectedEvent.date), "EEEE, MMM d, yyyy")} · {selectedEvent.time}</p>
                <p>{selectedEvent.location}</p>
              </div>
            )}
            {selected && <QRPlaceholder ticketId={selected.ticketId} size={200} />}
            <p className="text-xs text-muted-foreground">Present this QR code at the event entrance</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
