import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MenuItemData, Modifier } from "./MenuItem";
import { Plus, Minus } from "lucide-react";

interface SelectedModifier {
  id: string;
  name: string;
  price: number;
  option?: string;
}

interface MenuItemDialogProps {
  item: MenuItemData;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItemData, modifiers: SelectedModifier[], specialRequest: string, quantity: number) => void;
}

export const MenuItemDialog = ({ item, isOpen, onClose, onAddToCart }: MenuItemDialogProps) => {
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [specialRequest, setSpecialRequest] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleModifierChange = (modifier: Modifier, checked: boolean, option?: string) => {
    if (checked) {
      setSelectedModifiers([...selectedModifiers, {
        id: modifier.id,
        name: modifier.name,
        price: modifier.price,
        option
      }]);
    } else {
      setSelectedModifiers(selectedModifiers.filter(m => m.id !== modifier.id));
    }
  };

  const handleOptionChange = (modifier: Modifier, option: string) => {
    const existingModifier = selectedModifiers.find(m => m.id === modifier.id);
    if (existingModifier) {
      setSelectedModifiers(selectedModifiers.map(m => 
        m.id === modifier.id ? { ...m, option } : m
      ));
    } else {
      setSelectedModifiers([...selectedModifiers, {
        id: modifier.id,
        name: modifier.name,
        price: modifier.price,
        option
      }]);
    }
  };

  const getTotalPrice = () => {
    const modifiersPrice = selectedModifiers.reduce((sum, mod) => sum + mod.price, 0);
    return (item.price + modifiersPrice) * quantity;
  };

  const handleAddToCart = () => {
    onAddToCart(item, selectedModifiers, specialRequest, quantity);
    setSelectedModifiers([]);
    setSpecialRequest("");
    setQuantity(1);
    onClose();
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Item Image and Price */}
          <div className="text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
            />
            <p className="text-lg font-semibold text-price-text">${item.price.toFixed(2)}</p>
          </div>

          {/* Modifiers */}
          {item.modifiers && item.modifiers.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Customize Your Order</h3>
              {item.modifiers.map((modifier) => (
                <div key={modifier.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{modifier.name}</Label>
                    {modifier.price > 0 && (
                      <span className="text-sm text-price-text">+${modifier.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {modifier.options ? (
                    <RadioGroup
                      value={selectedModifiers.find(m => m.id === modifier.id)?.option || ""}
                      onValueChange={(value) => handleOptionChange(modifier, value)}
                    >
                      {modifier.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${modifier.id}-${option}`} />
                          <Label htmlFor={`${modifier.id}-${option}`} className="text-sm">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={modifier.id}
                        checked={selectedModifiers.some(m => m.id === modifier.id)}
                        onCheckedChange={(checked) => handleModifierChange(modifier, !!checked)}
                      />
                      <Label htmlFor={modifier.id} className="text-sm">
                        Add {modifier.name}
                      </Label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="special-request" className="font-medium">Special Requests</Label>
            <Textarea
              id="special-request"
              placeholder="Any special instructions for your order..."
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <Label className="font-medium">Quantity</Label>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium px-3">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddToCart} className="font-medium">
            Add to Cart - ${getTotalPrice().toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};