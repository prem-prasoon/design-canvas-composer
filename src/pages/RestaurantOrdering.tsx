import { useState } from "react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuItem, MenuItemData } from "@/components/MenuItem";
import { Cart, CartItem } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

// Import images
import chickenImage from "@/assets/chicken-parmigiana.jpg";
import meatballImage from "@/assets/meatball-parmigiana.jpg";
import vealImage from "@/assets/veal-parmigiana.jpg";
import shrimpImage from "@/assets/shrimp-parmigiana.jpg";
import eggplantImage from "@/assets/eggplant-parmigiana.jpg";
import sausageImage from "@/assets/sausage-parmigiana.jpg";

const categories = [
  "Hot subs",
  "Seafood", 
  "Wraps with fries",
  "Cold subs",
  "Appetizers",
  "Baked dishes",
  "Salads"
];

const menuItems: MenuItemData[] = [
  {
    id: "1",
    name: "Chicken Parmigiana",
    price: 12.00,
    image: chickenImage,
    category: "Hot subs"
  },
  {
    id: "2", 
    name: "Meatball Parmigiana",
    price: 12.00,
    image: meatballImage,
    category: "Hot subs"
  },
  {
    id: "3",
    name: "Veal Parmigiana", 
    price: 13.00,
    image: vealImage,
    category: "Hot subs"
  },
  {
    id: "4",
    name: "Sausage Parmigiana",
    price: 12.00,
    image: sausageImage,
    category: "Hot subs"
  },
  {
    id: "5",
    name: "Eggplant Parmigiana",
    price: 12.00,
    image: eggplantImage,
    category: "Hot subs"
  },
  {
    id: "6",
    name: "Shrimp Parmigiana",
    price: 12.00,
    image: shrimpImage,
    category: "Seafood"
  }
];

export const RestaurantOrdering = () => {
  const [activeCategory, setActiveCategory] = useState("Hot subs");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItemData) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order`,
      duration: 2000,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your order",
      duration: 2000,
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};