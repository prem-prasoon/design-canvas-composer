import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2, Printer, CreditCard, Users } from "lucide-react";
import { MenuItemData } from "./MenuItem";
import { Guest } from "./GuestSelector";
import { useState } from "react";

export interface CartItem extends MenuItemData {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  guests: Guest[];
  activeGuestId: string;
  onGuestChange: (guestId: string) => void;
  onAddGuest: (guestName: string) => void;
}

export const Cart = ({ items, onUpdateQuantity, onRemoveItem, guests, activeGuestId, onGuestChange, onAddGuest }: CartProps) => {
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
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax1 = subtotal * 0.08; // 8% tax
  const tax2 = subtotal * 0.02; // 2% additional tax
  const serviceFee = 2.46;
  const grandTotal = subtotal + tax1 + tax2 + serviceFee;

  return (
    <div className="w-96 bg-cart-bg border-l border-border h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-success-green">
          {activeGuest ? `${activeGuest.name}'s Order` : 'Order Summary'}
        </CardTitle>
        
        {/* Guest Selection */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            Ordering for:
          </div>
          <div className="flex gap-2">
            <Select value={activeGuestId} onValueChange={onGuestChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select guest" />
              </SelectTrigger>
              <SelectContent>
                {guests.map((guest) => (
                  <SelectItem key={guest.id} value={guest.id}>
                    {guest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
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
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="bg-background shadow-custom-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate text-card-foreground">
                        {item.name}
                      </h4>
                      <p className="text-price-text font-semibold">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="quantity"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="quantity"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 space-y-3">
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Price:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax-1:</span>
                <span className="font-medium">${tax1.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax-2:</span>
                <span className="font-medium">${tax2.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee:</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total:</span>
                <span className="text-success-green">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline" size="sm" className="flex-1">
                <Printer className="h-4 w-4 mr-2" />
                Print Bill
              </Button>
              <Button variant="cart" size="sm" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
};