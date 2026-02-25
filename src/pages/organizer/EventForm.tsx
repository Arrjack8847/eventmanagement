import { useParams } from "react-router-dom";
import { events } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function EventForm() {
  const { id } = useParams();
  const event = id ? events.find((e) => e.id === id) : null;
  const isEdit = !!event;

  const [type, setType] = useState<string>(event?.type || "free");
  const [published, setPublished] = useState(event?.status === "published");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">{isEdit ? "Edit Event" : "Create Event"}</h1>
        <p className="text-muted-foreground text-sm">{isEdit ? `Editing: ${event?.title}` : "Fill in the details to create a new event"}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2"><Label>Event Title</Label><Input defaultValue={event?.title} placeholder="e.g. RoboHack 2026" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea defaultValue={event?.description} placeholder="Describe your event..." rows={4} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Date</Label><Input type="date" defaultValue={event?.date} /></div>
            <div className="space-y-2"><Label>Time</Label><Input type="time" defaultValue={event?.time} /></div>
          </div>
          <div className="space-y-2"><Label>Location</Label><Input defaultValue={event?.location} placeholder="e.g. Engineering Lab B3" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {type === "paid" && (
              <div className="space-y-2"><Label>Price (RM)</Label><Input type="number" defaultValue={event?.price} placeholder="25" /></div>
            )}
          </div>
          <div className="space-y-2"><Label>Capacity</Label><Input type="number" defaultValue={event?.capacity} placeholder="100" /></div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="text-sm font-medium">Publish Event</p>
              <p className="text-xs text-muted-foreground">Make this event visible to students</p>
            </div>
            <Switch checked={published} onCheckedChange={setPublished} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button className="flex-1">{isEdit ? "Save Changes" : "Create Event"}</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
