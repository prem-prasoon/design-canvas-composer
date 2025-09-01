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
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-custom-lg hover:-translate-y-1 bg-card border-border overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-card-foreground text-sm leading-tight">
            {item.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-price-text font-bold text-lg">
            ${item.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            onClick={() => onAddToCart(item)}
            className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-custom-sm transition-all duration-200 hover:scale-105 rounded-full px-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};