export type DietaryTag = 'Bestseller' | 'Vegan' | 'Organic' | 'Veg' | 'Gluten-Free';

export type MenuCategory =
  | 'All'
  | 'Espresso & Hot'
  | 'Cold Brews & Teas'
  | 'Breakfast Bowls'
  | 'Artisanal Bakery';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number; // in ₹ INR
  description: string;
  origin?: string;
  tags: DietaryTag[];
  rating: number; // e.g. 4.9
  reviewCount: number;
  emoji: string;
  ingredients: string[];
  allergens: string[];
  calories: string;
  prepTime: string;
  tastingNotes?: string[];
  imagePlaceholderColor?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Indoor Quiet Bar' | 'Garden Verandah' | 'Roastery Cupping Table' | 'Any Available';
  specialRequests?: string;
}
