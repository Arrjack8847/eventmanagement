import { useState } from "react";
import { events } from "@/data/mock";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // March 2026

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let d = calStart;
  while (d <= calEnd) { days.push(d); d = addDays(d, 1); }

  const getEventsForDay = (day: Date) =>
    events.filter((e) => e.status === "published" && isSameDay(new Date(e.date), day));

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Campus Calendar</h1>
        <p className="text-muted-foreground">View all upcoming events at a glance</p>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-muted p-2 text-center text-xs font-semibold text-muted-foreground">{d}</div>
        ))}
        {days.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const inMonth = isSameMonth(day, currentMonth);
          return (
            <div key={i} className={cn("bg-card min-h-[80px] md:min-h-[100px] p-1.5", !inMonth && "opacity-40")}>
              <span className={cn("text-xs font-medium", isSameDay(day, new Date()) && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center")}>
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 2).map((ev) => (
                  <Link key={ev.id} to={`/events/${ev.id}`} className={cn("block text-[10px] md:text-xs px-1.5 py-0.5 rounded truncate font-medium", ev.type === "free" ? "bg-sky-100 text-sky-800" : "bg-amber-100 text-amber-800")}>
                    {ev.title}
                  </Link>
                ))}
                {dayEvents.length > 2 && <span className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 2} more</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
