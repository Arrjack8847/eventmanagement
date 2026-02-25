import { activityHistory } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CalendarDays, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = { users: Users, calendar: CalendarDays, check: CheckCircle };
const colorMap = {
  club_joined: "bg-primary/10 text-primary border-primary/20",
  event_registered: "bg-amber-50 text-amber-600 border-amber-200",
  event_attended: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function ActivityHistory() {
  const sorted = [...activityHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity History</h1>
        <p className="text-muted-foreground text-sm">Your campus activity timeline</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Clubs Joined", value: activityHistory.filter((a) => a.type === "club_joined").length, color: "text-primary" },
          { label: "Events Registered", value: activityHistory.filter((a) => a.type === "event_registered").length, color: "text-amber-600" },
          { label: "Events Attended", value: activityHistory.filter((a) => a.type === "event_attended").length, color: "text-emerald-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={cn("text-3xl font-bold", s.color)}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-4">
          {sorted.map((a) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap] || CalendarDays;
            return (
              <div key={a.id} className="flex items-start gap-4 relative">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center border shrink-0 z-10", colorMap[a.type])}>
                  <Icon className="h-4 w-4" />
                </div>
                <Card className="flex-1">
                  <CardContent className="p-3 flex items-center justify-between">
                    <p className="text-sm font-medium">{a.title}</p>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
