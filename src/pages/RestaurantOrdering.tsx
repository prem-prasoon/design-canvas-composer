import { useState } from "react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuItem, MenuItemData } from "@/components/MenuItem";
import { Cart, CartItem } from "@/components/Cart";
import { GuestSelector, Guest } from "@/components/GuestSelector";
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
    category: "Hot subs",
    modifiers: [
      {
        id: "size",
        name: "Size",
        price: 0,
        required: true,
        options: ["Regular", "Large (+$2)", "Extra Large (+$4)"]
      },
      {
        id: "cheese",
        name: "Extra Cheese",
        price: 1.50
      },
      {
        id: "sauce",
        name: "Extra Sauce",
        price: 0.75
      }
    ]
  },
  {
    id: "2", 
    name: "Meatball Parmigiana",
    price: 12.00,
    image: meatballImage,
    category: "Hot subs",
    modifiers: [
      {
        id: "size",
        name: "Size",
        price: 0,
        required: true,
        options: ["Regular", "Large (+$2)", "Extra Large (+$4)"]
      },
      {
        id: "cheese",
        name: "Extra Cheese",
        price: 1.50
      },
      {
        id: "extra-meatballs",
        name: "Extra Meatballs",
        price: 2.00
      }
    ]
  },
  {
    id: "3",
    name: "Veal Parmigiana", 
    price: 13.00,
    image: vealImage,
    category: "Hot subs",
    modifiers: [
      {
        id: "size",
        name: "Size",
        price: 0,
        required: true,
        options: ["Regular", "Large (+$2)", "Extra Large (+$4)"]
      },
      {
        id: "cheese",
        name: "Extra Cheese",
        price: 1.50
      }
    ]
  },
  {
    id: "4",
    name: "Sausage Parmigiana",
    price: 12.00,
    image: sausageImage,
    category: "Hot subs",
    modifiers: [
      {
        id: "size",
        name: "Size",
        price: 0,
        required: true,
        options: ["Regular", "Large (+$2)", "Extra Large (+$4)"]
      },
      {
        id: "peppers",
        name: "Add Peppers",
        price: 1.00
      }
    ]
  },
  {
    id: "5",
    name: "Eggplant Parmigiana",
    price: 12.00,
    image: eggplantImage,
    category: "Hot subs",
    modifiers: [
      {
        id: "size",
        name: "Size",
        price: 0,
        required: true,
        options: ["Regular", "Large (+$2)", "Extra Large (+$4)"]
      },
      {
        id: "cheese",
        name: "Extra Cheese",
        price: 1.50
      }
    ]
  },
  {
    id: "6",
    name: "Shrimp Parmigiana",
    price: 12.00,
    image: shrimpImage,
    category: "Seafood",
    modifiers: [
      {
        id: "size",
        name: "Size",
        price: 0,
        required: true,
        options: ["Regular", "Large (+$2)", "Extra Large (+$4)"]
      },
      {
        id: "extra-shrimp",
        name: "Extra Shrimp",
        price: 3.00
      }
    ]
  }
];

export const RestaurantOrdering = () => {
  const [activeCategory, setActiveCategory] = useState("Hot subs");
  const [guests, setGuests] = useState<Guest[]>([
    { id: "guest-1", name: "Guest 1" }
  ]);
  const [activeGuestId, setActiveGuestId] = useState("guest-1");
  const [guestCarts, setGuestCarts] = useState<Record<string, CartItem[]>>({
    "guest-1": []
  });
  const { toast } = useToast();

  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  const currentGuestCart = guestCarts[activeGuestId] || [];
  const activeGuest = guests.find(g => g.id === activeGuestId);

  const addGuest = (guestName: string) => {
    const newGuestId = `guest-${Date.now()}`;
    const newGuest = { id: newGuestId, name: guestName };
    
    setGuests([...guests, newGuest]);
    setGuestCarts({ ...guestCarts, [newGuestId]: [] });
    setActiveGuestId(newGuestId);
    
    toast({
      title: "Guest added",
      description: `${guestName} has been added to the booking`,
      duration: 2000,
    });
  };

  const addToCart = (item: MenuItemData, modifiers: any[] = [], specialRequest: string = "", quantity: number = 1) => {
    const cartItem = { 
      ...item, 
      quantity,
      modifiers,
      specialRequest,
      id: `${item.id}-${Date.now()}` // Unique ID for customized items
    };
    
    setGuestCarts({
      ...guestCarts,
      [activeGuestId]: [...currentGuestCart, cartItem]
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to ${activeGuest?.name}'s order`,
      duration: 2000,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setGuestCarts({
      ...guestCarts,
      [activeGuestId]: currentGuestCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    });
  };

  const removeItem = (id: string) => {
    setGuestCarts({
      ...guestCarts,
      [activeGuestId]: currentGuestCart.filter(item => item.id !== id)
    });
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from the order",
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
          <GuestSelector
            guests={guests}
            activeGuestId={activeGuestId}
            onGuestChange={setActiveGuestId}
            onAddGuest={addGuest}
          />
          
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
        items={currentGuestCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        guestName={activeGuest?.name}
      />
    </div>
  );
};