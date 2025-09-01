import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface MenuItemProps {
  item: MenuItemData;
  onAddToCart: (item: MenuItemData) => void;
}

export const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-custom-lg hover:-translate-y-1 bg-card border-border overflow-hidden relative">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-30"
        />
        {/* Hover overlay with add icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <Button
            size="lg"
            onClick={() => onAddToCart(item)}
            className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-custom-lg transition-all duration-200 hover:scale-110 rounded-full p-4"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4 transition-opacity duration-300 group-hover:opacity-60">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-card-foreground text-sm leading-tight">
            {item.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-price-text font-bold text-lg">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};