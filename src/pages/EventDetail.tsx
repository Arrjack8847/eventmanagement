import { useParams, Link } from "react-router-dom";
import { events, clubs } from "@/data/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, ArrowLeft, MessageCircle, Ticket } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const club = event ? clubs.find((c) => c.id === event.clubId) : null;
  const [joinOpen, setJoinOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Event not found</p>
        <Link to="/events"><Button variant="link" className="mt-2">← Back to events</Button></Link>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.registeredCount;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to events</Link>

      <div className="rounded-2xl overflow-hidden h-64 md:h-80">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <StatusBadge status={event.type} />
            {event.type === "paid" && <span className="text-sm font-semibold">RM {event.price}</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{format(new Date(event.date), "EEEE, MMM d, yyyy")} · {event.time}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.location}</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{spotsLeft > 0 ? `${spotsLeft} of ${event.capacity} spots left` : "Event is full"}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>

          {event.type === "paid" && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4 flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-amber-900 text-sm">Payment via WhatsApp</p>
                  <p className="text-xs text-amber-700 mt-1">After registration, you'll send payment details via WhatsApp. The organizer will manually confirm your payment and activate your ticket.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-3">
          {club && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <img src={club.image} alt={club.name} className="w-full h-28 object-cover rounded-lg" />
                <div>
                  <p className="font-semibold text-sm">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.memberCount} members</p>
                </div>
                <Button variant="outline" className="w-full gap-1.5 text-sm" onClick={() => setJoinOpen(true)}>
                  <MessageCircle className="h-3.5 w-3.5" /> Join Club
                </Button>
              </CardContent>
            </Card>
          )}
          <Button className="w-full gap-1.5" onClick={() => setRegisterOpen(true)}>
            <Ticket className="h-4 w-4" /> Register for Event
          </Button>
        </div>
      </div>

      <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {club?.name}</DialogTitle>
            <DialogDescription>
              Clicking "Open WhatsApp" will send a pre-filled message to the club organizer requesting membership. Your request will be pending until approved.
            </DialogDescription>
          </DialogHeader>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => setJoinOpen(false)}>
            <MessageCircle className="h-4 w-4" /> Open WhatsApp
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {event.title}</DialogTitle>
            <DialogDescription>
              To register you must: 1) Be logged in, and 2) Be a member of {club?.name}. {event.type === "paid" && `This is a paid event (RM ${event.price}). Payment confirmation is done via WhatsApp.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Link to="/login" className="flex-1"><Button className="w-full">Login to Register</Button></Link>
            <Button variant="outline" onClick={() => setRegisterOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
