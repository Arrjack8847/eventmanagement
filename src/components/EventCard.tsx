import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "@/data/mock";
import { format } from "date-fns";

export function EventCard({ event }: { event: Event }) {
  const spotsLeft = event.capacity - event.registeredCount;
  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 shadow-sm">
        <div className="relative h-44 overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 right-3">
            <StatusBadge status={event.type} />
          </div>
          {event.type === "paid" && (
            <div className="absolute bottom-3 left-3 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-semibold">
              RM {event.price}
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          <p className="text-xs font-medium text-primary">{event.clubName}</p>
          <h3 className="font-semibold text-base leading-tight line-clamp-2">{event.title}</h3>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{format(new Date(event.date), "MMM d, yyyy")} · {event.time}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
