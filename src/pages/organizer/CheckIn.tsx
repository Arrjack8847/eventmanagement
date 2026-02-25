import { useParams } from "react-router-dom";
import { events } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Camera, Search, CheckCircle, AlertTriangle, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CheckIn() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [scanned, setScanned] = useState(false);
  const [alreadyChecked, setAlreadyChecked] = useState(false);
  const [manualId, setManualId] = useState("");

  const mockScan = () => {
    setScanned(true);
    setAlreadyChecked(false);
  };

  const mockDuplicate = () => {
    setScanned(true);
    setAlreadyChecked(true);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">QR Check-in</h1>
        <p className="text-muted-foreground text-sm">{event?.title || "Event"}</p>
      </div>

      {/* Scanner */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="aspect-video bg-muted rounded-xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border">
            <Camera className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Camera scanner placeholder</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={mockScan}>Simulate Scan</Button>
              <Button size="sm" variant="outline" onClick={mockDuplicate}>Simulate Duplicate</Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Or enter ticket ID manually..." value={manualId} onChange={(e) => setManualId(e.target.value)} />
            <Button variant="outline" className="gap-1.5" onClick={mockScan}><Search className="h-4 w-4" /> Lookup</Button>
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      {scanned && (
        <Card className={cn("border-2", alreadyChecked ? "border-amber-300" : "border-emerald-300")}>
          <CardContent className="p-6 space-y-4">
            {alreadyChecked && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">This attendee has already been checked in</span>
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Ahmad Razif</h3>
                <p className="text-sm text-muted-foreground">CS2024001 · ahmad.razif@campus.edu</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Event</p><p className="text-sm font-medium">{event?.title}</p></div>
              <div className="p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Ticket ID</p><p className="text-sm font-mono">TKT-2026-001</p></div>
              <div className="p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Payment</p><StatusBadge status="confirmed" /></div>
              <div className="p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Check-in</p>{alreadyChecked ? <StatusBadge status="checked-in" /> : <span className="text-xs">Not checked in</span>}</div>
            </div>
            {!alreadyChecked && (
              <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => setAlreadyChecked(true)}>
                <CheckCircle className="h-4 w-4" /> Confirm Check-in
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
