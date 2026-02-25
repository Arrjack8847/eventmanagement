import { Card, CardContent } from "@/components/ui/card";
import { registrations, events } from "@/data/mock";
import { CalendarDays, Users, CreditCard, QrCode, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
  const orgEvents = events.filter((e) => e.createdBy === "u2");
  const allRegs = registrations.filter((r) => orgEvents.some((e) => e.id === r.eventId));
  const pendingPayments = allRegs.filter((r) => r.paymentStatus === "pending").length;
  const checkedInToday = allRegs.filter((r) => r.checkedIn).length;

  const stats = [
    { label: "Total Events", value: orgEvents.length, icon: CalendarDays, color: "bg-primary/10 text-primary" },
    { label: "Total Registrations", value: allRegs.length, icon: Users, color: "bg-sky-50 text-sky-600" },
    { label: "Pending Payments", value: pendingPayments, icon: CreditCard, color: "bg-amber-50 text-amber-600" },
    { label: "Checked In", value: checkedInToday, icon: QrCode, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
        <p className="text-muted-foreground text-sm">Manage your club events and registrations</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/organizer/events/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div><h3 className="font-semibold">Create New Event</h3><p className="text-sm text-muted-foreground">Set up a new event for your club</p></div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/organizer/events">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div><h3 className="font-semibold">Manage Events</h3><p className="text-sm text-muted-foreground">View and manage your events</p></div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
