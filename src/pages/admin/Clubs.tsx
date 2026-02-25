import { clubs } from "@/data/mock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Users } from "lucide-react";
import { useState } from "react";

export default function AdminClubs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editClub, setEditClub] = useState<string | null>(null);

  const openCreate = () => { setEditClub(null); setModalOpen(true); };
  const openEdit = (id: string) => { setEditClub(id); setModalOpen(true); };
  const club = editClub ? clubs.find((c) => c.id === editClub) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Clubs</h1>
          <p className="text-muted-foreground text-sm">Create and edit campus clubs</p>
        </div>
        <Button className="gap-1.5" onClick={openCreate}><Plus className="h-4 w-4" /> New Club</Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Club</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubs.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt={c.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{c.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="flex items-center gap-1 text-sm"><Users className="h-3.5 w-3.5" /> {c.memberCount}</span></TableCell>
                <TableCell className="text-xs font-mono">{c.whatsappNumber}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => openEdit(c.id)}><Edit className="h-3.5 w-3.5" /> Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editClub ? "Edit Club" : "Create Club"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Club Name</Label><Input defaultValue={club?.name} placeholder="e.g. Robotics Society" /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea defaultValue={club?.description} placeholder="Describe the club..." rows={3} /></div>
            <div className="space-y-2"><Label>WhatsApp Number</Label><Input defaultValue={club?.whatsappNumber} placeholder="+60123456789" /></div>
            <div className="space-y-2"><Label>Image URL</Label><Input defaultValue={club?.image} placeholder="https://..." /></div>
            <Button className="w-full" onClick={() => setModalOpen(false)}>{editClub ? "Save Changes" : "Create Club"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
