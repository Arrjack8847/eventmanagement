import { memberships, clubs } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users } from "lucide-react";

export default function MyClubs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Clubs</h1>
        <p className="text-muted-foreground text-sm">Clubs you've joined or requested to join</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {memberships.map((m) => {
          const club = clubs.find((c) => c.id === m.clubId);
          if (!club) return null;
          return (
            <Card key={m.id} className="overflow-hidden">
              <div className="h-32 overflow-hidden">
                <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{club.name}</h3>
                  <StatusBadge status={m.status} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{club.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3.5 w-3.5" />{club.memberCount} members</span>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <MessageCircle className="h-3.5 w-3.5" /> Open WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
