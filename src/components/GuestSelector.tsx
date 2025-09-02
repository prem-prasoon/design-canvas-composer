import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Users } from "lucide-react";
import { useState } from "react";

export interface Guest {
  id: string;
  name: string;
}

interface GuestSelectorProps {
  guests: Guest[];
  activeGuestId: string;
  onGuestChange: (guestId: string) => void;
  onAddGuest: (guestName: string) => void;
}

export const GuestSelector = ({ guests, activeGuestId, onGuestChange, onAddGuest }: GuestSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState("");

  const handleAddGuest = () => {
    if (newGuestName.trim()) {
      onAddGuest(newGuestName.trim());
      setNewGuestName("");
      setIsDialogOpen(false);
    }
  };

  const activeGuest = guests.find(g => g.id === activeGuestId);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          Guest Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Label htmlFor="guest-select" className="text-sm font-medium">
              Currently ordering for:
            </Label>
            <Select value={activeGuestId} onValueChange={onGuestChange}>
              <SelectTrigger id="guest-select" className="mt-1">
                <SelectValue placeholder="Select a guest" />
              </SelectTrigger>
              <SelectContent>
                {guests.map((guest) => (
                  <SelectItem key={guest.id} value={guest.id}>
                    {guest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Guest
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Guest</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guest-name">Guest Name</Label>
                  <Input
                    id="guest-name"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Enter guest name"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddGuest()}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddGuest} disabled={!newGuestName.trim()}>
                    Add Guest
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {activeGuest && (
          <p className="text-sm text-muted-foreground mt-2">
            Adding items to <span className="font-medium text-foreground">{activeGuest.name}'s</span> order
          </p>
        )}
      </CardContent>
    </Card>
  );
};