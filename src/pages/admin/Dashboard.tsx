import { Card, CardContent } from "@/components/ui/card";
import { users, clubs, events } from "@/data/mock";
import { Users, Building2, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Total Clubs", value: clubs.length, icon: Building2, color: "bg-emerald-50 text-emerald-600" },
    { label: "Total Events", value: events.length, icon: CalendarDays, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <Link to="/admin/users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div><h3 className="font-semibold">Manage Users</h3><p className="text-sm text-muted-foreground">View and assign roles</p></div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/clubs">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div><h3 className="font-semibold">Manage Clubs</h3><p className="text-sm text-muted-foreground">Create and edit clubs</p></div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
