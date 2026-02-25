import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Ticket, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { registrations, memberships, events } from "@/data/mock";
import { EventCard } from "@/components/EventCard";

export default function StudentDashboard() {
  const upcomingEvents = events.filter((e) => e.status === "published").slice(0, 3);
  const activeTickets = registrations.filter((r) => r.userId === "u1" && !r.checkedIn).length;
  const clubCount = memberships.filter((m) => m.status === "member").length;

  const stats = [
    { label: "Upcoming Events", value: upcomingEvents.length, icon: CalendarDays, color: "bg-primary/10 text-primary" },
    { label: "Active Tickets", value: activeTickets, icon: Ticket, color: "bg-emerald-50 text-emerald-600" },
    { label: "Clubs Joined", value: clubCount, icon: Users, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Ahmad 👋</h1>
        <p className="text-muted-foreground text-sm">Here's what's happening with your campus life</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${s.color}`}>
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

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <Link to="/events" className="text-sm text-primary flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  );
}
